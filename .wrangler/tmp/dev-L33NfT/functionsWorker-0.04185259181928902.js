var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-jUwIbX/functionsWorker-0.04185259181928902.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var MAX_SHOUT_CHARS = 500;
var MAX_POST_BYTES = 100 * 1024;
var MAX_IMAGE_BYTES = 5 * 1024 * 1024;
var SHOUT_LIMIT = { windowSeconds: 10 * 60, count: 20 };
var POST_LIMIT = { windowSeconds: 60 * 60, count: 12 };
var IMAGE_LIMIT = { windowSeconds: 10 * 60, count: 10 };
var ALLOWED_IMAGE_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/gif", "image/webp", "image/svg+xml"]);
var jwksCache = null;
var schemaReady = null;
async function handleRoomApi(request, env) {
  const url = new URL(request.url);
  try {
    if (!url.pathname.startsWith("/us/api/")) {
      throw httpError(404, "Not found.");
    }
    const user = await requireAccessUser(request, env);
    await ensureDatabase(env);
    return await handleApi(request, env, user, url);
  } catch (error) {
    return jsonError(error);
  }
}
__name(handleRoomApi, "handleRoomApi");
__name2(handleRoomApi, "handleRoomApi");
async function handleApi(request, env, user, url) {
  const method = request.method.toUpperCase();
  const pathname = url.pathname.replace(/\/+$/, "");
  if (method === "GET" && pathname === "/us/api/me") {
    return json({
      user: publicUser(user, env),
      permissions: { can_delete_all: isAdmin(user, env) }
    });
  }
  if (method === "GET" && pathname === "/us/api/entries") {
    return listEntries(env, user, url);
  }
  if (method === "POST" && pathname === "/us/api/shouts") {
    return createShout(request, env, user);
  }
  if (method === "POST" && pathname === "/us/api/posts") {
    return createPost(request, env, user);
  }
  if (method === "POST" && pathname === "/us/api/images") {
    return uploadImage(request, env, user);
  }
  const postMatch = pathname.match(/^\/us\/api\/posts\/([^/]+)$/);
  if (method === "GET" && postMatch) {
    return getPost(env, user, decodeURIComponent(postMatch[1]));
  }
  const imageMatch = pathname.match(/^\/us\/api\/images\/([^/]+)$/);
  if (method === "GET" && imageMatch) {
    return serveImage(env, decodeURIComponent(imageMatch[1]));
  }
  const deleteMatch = pathname.match(/^\/us\/api\/entries\/([^/]+)$/);
  if (method === "DELETE" && deleteMatch) {
    return hideEntry(env, user, decodeURIComponent(deleteMatch[1]));
  }
  return json({ error: "Not found." }, { status: 404 });
}
__name(handleApi, "handleApi");
__name2(handleApi, "handleApi");
async function listEntries(env, user, url) {
  const kind = url.searchParams.get("kind");
  if (kind !== "shout" && kind !== "post") {
    throw httpError(400, "Expected kind=shout or kind=post.");
  }
  const limit = kind === "shout" ? 100 : 50;
  const result = await env.DB.prepare(
    `SELECT id, slug, kind, title, summary, body_text, tags_json, image_key,
            author_email, author_handle, created_at, updated_at
       FROM room_entries
      WHERE kind = ? AND deleted_at IS NULL
      ORDER BY created_at DESC
      LIMIT ?`
  ).bind(kind, limit).all();
  return json({
    entries: result.results.map((entry) => serializeEntry(entry, user, env))
  });
}
__name(listEntries, "listEntries");
__name2(listEntries, "listEntries");
async function createShout(request, env, user) {
  const input = await readJson(request);
  const body = normalizeText(input.body || input.body_text || "");
  const imageKey = normalizeText(input.image_key || "");
  if (!body) throw httpError(400, "Shout cannot be empty.");
  if (body.length > MAX_SHOUT_CHARS) {
    throw httpError(400, `Shouts are limited to ${MAX_SHOUT_CHARS} characters.`);
  }
  if (imageKey && env.ROOM_IMAGES) {
    const obj = await env.ROOM_IMAGES.head(imageKey);
    if (!obj) throw httpError(400, "Referenced image was not found. Please upload the image first.");
  }
  await checkRateLimit(env, `shout:${user.email}`, SHOUT_LIMIT);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO room_entries (
       id, slug, kind, title, summary, body_markdown, body_text, tags_json, image_key,
       author_email, author_handle, created_at, updated_at
     ) VALUES (?, NULL, 'shout', NULL, NULL, ?, ?, '[]', ?, ?, ?, ?, ?)`
  ).bind(id, body, body, imageKey || null, user.email, user.handle, now, now).run();
  return json({
    entry: {
      id,
      kind: "shout",
      body_text: body,
      image_url: imageKey ? `/us/api/images/${imageKey}` : null,
      author_handle: user.handle,
      created_at: now,
      updated_at: now,
      can_delete: true
    }
  }, { status: 201 });
}
__name(createShout, "createShout");
__name2(createShout, "createShout");
async function createPost(request, env, user) {
  const input = await readJson(request);
  const rawMarkdown = String(input.body_markdown || input.markdown || "");
  const size = new TextEncoder().encode(rawMarkdown).byteLength;
  if (!rawMarkdown.trim()) throw httpError(400, "Markdown post cannot be empty.");
  if (size > MAX_POST_BYTES) throw httpError(400, "Markdown posts are limited to 100 KB in v1.");
  await checkRateLimit(env, `post:${user.email}`, POST_LIMIT);
  const parsed = parseFrontMatter(rawMarkdown);
  const bodyMarkdown = parsed.body.trim();
  if (!bodyMarkdown) throw httpError(400, "Markdown body cannot be empty after front matter.");
  const id = crypto.randomUUID();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const title = coerceTitle(parsed.data.title) || firstMarkdownHeading(bodyMarkdown) || "Untitled note";
  const summary = coerceSummary(parsed.data.summary) || summarizeMarkdown(bodyMarkdown);
  const tags = coerceTags(parsed.data.tags);
  const slug = await uniqueSlug(env, slugify(title), id);
  const bodyText = markdownToPlainText(bodyMarkdown).slice(0, 1200);
  await env.DB.prepare(
    `INSERT INTO room_entries (
       id, slug, kind, title, summary, body_markdown, body_text, tags_json,
       author_email, author_handle, created_at, updated_at
     ) VALUES (?, ?, 'post', ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id,
    slug,
    title,
    summary,
    bodyMarkdown,
    bodyText,
    JSON.stringify(tags),
    user.email,
    user.handle,
    now,
    now
  ).run();
  return json({
    post: {
      id,
      slug,
      kind: "post",
      title,
      summary,
      tags,
      author_handle: user.handle,
      created_at: now,
      updated_at: now,
      can_delete: true
    }
  }, { status: 201 });
}
__name(createPost, "createPost");
__name2(createPost, "createPost");
async function uploadImage(request, env, user) {
  if (!env.ROOM_IMAGES) {
    throw httpError(503, "Image storage is not configured.");
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.startsWith("multipart/form-data")) {
    throw httpError(415, "Expected multipart/form-data.");
  }
  let formData;
  try {
    formData = await request.formData();
  } catch (_error) {
    throw httpError(400, "Invalid multipart form data.");
  }
  const file = formData.get("image");
  if (!file || typeof file.name !== "string") {
    throw httpError(400, "No image file provided in the 'image' field.");
  }
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw httpError(400, "Image type must be JPEG, PNG, GIF, WebP, or SVG.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw httpError(400, `Images are limited to ${Math.round(MAX_IMAGE_BYTES / 1024 / 1024)} MB.`);
  }
  await checkRateLimit(env, `image:${user.email}`, IMAGE_LIMIT);
  const ext = extensionForMime(file.type);
  const key = `${crypto.randomUUID()}.${ext}`;
  await env.ROOM_IMAGES.put(key, file.stream(), {
    httpMetadata: {
      contentType: file.type,
      cacheControl: "public, max-age=604800",
      contentDisposition: "inline"
    }
  });
  return json({
    key,
    url: `/us/api/images/${key}`
  }, { status: 201 });
}
__name(uploadImage, "uploadImage");
__name2(uploadImage, "uploadImage");
function extensionForMime(mime) {
  const map = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg"
  };
  return map[mime] || "bin";
}
__name(extensionForMime, "extensionForMime");
__name2(extensionForMime, "extensionForMime");
async function serveImage(env, key) {
  if (!env.ROOM_IMAGES) {
    throw httpError(503, "Image storage is not configured.");
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(key)) {
    throw httpError(400, "Invalid image key.");
  }
  const obj = await env.ROOM_IMAGES.get(key);
  if (!obj) throw httpError(404, "Image not found.");
  const headers = new Headers();
  const httpMetadata = obj.httpMetadata || {};
  if (httpMetadata.contentType) headers.set("content-type", httpMetadata.contentType);
  if (httpMetadata.cacheControl) headers.set("cache-control", httpMetadata.cacheControl);
  headers.set("referrer-policy", "no-referrer");
  headers.set("cross-origin-resource-policy", "same-origin");
  return new Response(obj.body, { headers });
}
__name(serveImage, "serveImage");
__name2(serveImage, "serveImage");
async function getPost(env, user, slugOrId) {
  const entry = await env.DB.prepare(
    `SELECT id, slug, kind, title, summary, body_markdown, body_text, tags_json, image_key,
            author_email, author_handle, created_at, updated_at
       FROM room_entries
      WHERE kind = 'post'
        AND deleted_at IS NULL
        AND (id = ? OR slug = ?)
      LIMIT 1`
  ).bind(slugOrId, slugOrId).first();
  if (!entry) throw httpError(404, "Markdown post not found.");
  const post = serializeEntry(entry, user, env);
  post.body_html = renderMarkdown(entry.body_markdown);
  return json({ post });
}
__name(getPost, "getPost");
__name2(getPost, "getPost");
async function hideEntry(env, user, id) {
  const entry = await env.DB.prepare(
    `SELECT id, author_email
       FROM room_entries
      WHERE id = ? AND deleted_at IS NULL
      LIMIT 1`
  ).bind(id).first();
  if (!entry) throw httpError(404, "Entry not found.");
  if (entry.author_email !== user.email && !isAdmin(user, env)) {
    throw httpError(403, "Only the author or room owner can hide this entry.");
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE room_entries
        SET deleted_at = ?, updated_at = ?
      WHERE id = ?`
  ).bind(now, now, id).run();
  return json({ ok: true });
}
__name(hideEntry, "hideEntry");
__name2(hideEntry, "hideEntry");
async function ensureDatabase(env) {
  if (!env.DB) {
    throw httpError(503, "D1 binding DB is not configured.");
  }
  if (!schemaReady) {
    schemaReady = createSchema(env.DB);
  }
  return schemaReady;
}
__name(ensureDatabase, "ensureDatabase");
__name2(ensureDatabase, "ensureDatabase");
async function createSchema(db) {
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS room_entries (
      id TEXT PRIMARY KEY,
      slug TEXT,
      kind TEXT NOT NULL CHECK (kind IN ('shout', 'post')),
      title TEXT,
      summary TEXT,
      body_markdown TEXT NOT NULL,
      body_text TEXT,
      tags_json TEXT NOT NULL DEFAULT '[]',
      author_email TEXT NOT NULL,
      author_handle TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      deleted_at TEXT
    )`
  ).run();
  await db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_room_entries_kind_created
       ON room_entries (kind, created_at DESC)`
  ).run();
  await db.prepare(
    `CREATE INDEX IF NOT EXISTS idx_room_entries_author_created
       ON room_entries (author_email, created_at DESC)`
  ).run();
  await db.prepare(
    `CREATE UNIQUE INDEX IF NOT EXISTS idx_room_entries_slug
       ON room_entries (slug)
      WHERE kind = 'post' AND slug IS NOT NULL AND deleted_at IS NULL`
  ).run();
  await db.prepare(
    `CREATE TABLE IF NOT EXISTS room_rate_limits (
      key TEXT PRIMARY KEY,
      window_start TEXT NOT NULL,
      count INTEGER NOT NULL
    )`
  ).run();
  try {
    await db.prepare(
      `ALTER TABLE room_entries ADD COLUMN image_key TEXT`
    ).run();
  } catch (_error) {
  }
}
__name(createSchema, "createSchema");
__name2(createSchema, "createSchema");
async function checkRateLimit(env, keyPrefix, rule) {
  const bucket = Math.floor(Date.now() / 1e3 / rule.windowSeconds);
  const key = `${keyPrefix}:${bucket}`;
  const windowStart = new Date(bucket * rule.windowSeconds * 1e3).toISOString();
  const row = await env.DB.prepare(
    `INSERT INTO room_rate_limits (key, window_start, count)
     VALUES (?, ?, 1)
     ON CONFLICT(key) DO UPDATE SET count = count + 1
     RETURNING count`
  ).bind(key, windowStart).first();
  if (row.count > rule.count) {
    throw httpError(429, "Rate limit reached. Try again later.");
  }
}
__name(checkRateLimit, "checkRateLimit");
__name2(checkRateLimit, "checkRateLimit");
async function uniqueSlug(env, base, id) {
  const cleanBase = base || "post";
  let slug = cleanBase;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const existing = await env.DB.prepare(
      `SELECT id FROM room_entries
        WHERE slug = ? AND kind = 'post' AND deleted_at IS NULL
        LIMIT 1`
    ).bind(slug).first();
    if (!existing) return slug;
    slug = `${cleanBase}-${id.slice(0, 8 + attempt)}`;
  }
  return `${cleanBase}-${crypto.randomUUID().slice(0, 8)}`;
}
__name(uniqueSlug, "uniqueSlug");
__name2(uniqueSlug, "uniqueSlug");
async function requireAccessUser(request, env) {
  const localUser = localDevelopmentUser(request, env);
  if (localUser) return localUser;
  const teamDomain = normalizeTeamDomain(env.ACCESS_TEAM_DOMAIN);
  const audience = String(env.ACCESS_AUD || "").trim();
  if (!teamDomain || !audience) {
    throw httpError(503, "Cloudflare Access team domain or audience is not configured.");
  }
  const token = request.headers.get("cf-access-jwt-assertion");
  if (!token) throw httpError(403, "Missing Cloudflare Access JWT.");
  const payload = await verifyAccessJwt(token, teamDomain, audience);
  const email = normalizeEmail(payload.email);
  if (!email) throw httpError(403, "Cloudflare Access JWT did not include an email.");
  return {
    email,
    handle: handleFromEmail(email),
    name: typeof payload.name === "string" ? payload.name : "",
    sub: typeof payload.sub === "string" ? payload.sub : ""
  };
}
__name(requireAccessUser, "requireAccessUser");
__name2(requireAccessUser, "requireAccessUser");
function localDevelopmentUser(request, env) {
  const email = normalizeEmail(env.DEV_ROOM_EMAIL);
  if (!email) return null;
  const hostname = new URL(request.url).hostname;
  if (hostname !== "localhost" && hostname !== "127.0.0.1") return null;
  return {
    email,
    handle: handleFromEmail(email),
    name: "Local Developer",
    sub: "local-development"
  };
}
__name(localDevelopmentUser, "localDevelopmentUser");
__name2(localDevelopmentUser, "localDevelopmentUser");
async function verifyAccessJwt(token, teamDomain, audience) {
  const parts = token.split(".");
  if (parts.length !== 3) throw httpError(403, "Invalid Cloudflare Access JWT.");
  const header = JSON.parse(base64UrlDecode(parts[0]));
  const payload = JSON.parse(base64UrlDecode(parts[1]));
  if (header.alg !== "RS256" || !header.kid) {
    throw httpError(403, "Unsupported Cloudflare Access JWT.");
  }
  const key = await importJwtKey(teamDomain, header.kid);
  const verified = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    base64UrlToBytes(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
  );
  if (!verified) throw httpError(403, "Invalid Cloudflare Access JWT signature.");
  const now = Math.floor(Date.now() / 1e3);
  if (payload.iss !== teamDomain) throw httpError(403, "Invalid Cloudflare Access JWT issuer.");
  if (typeof payload.exp === "number" && payload.exp < now - 60) {
    throw httpError(403, "Expired Cloudflare Access JWT.");
  }
  if (typeof payload.nbf === "number" && payload.nbf > now + 60) {
    throw httpError(403, "Cloudflare Access JWT is not valid yet.");
  }
  if (!audienceMatches(payload.aud, audience)) {
    throw httpError(403, "Cloudflare Access JWT audience mismatch.");
  }
  return payload;
}
__name(verifyAccessJwt, "verifyAccessJwt");
__name2(verifyAccessJwt, "verifyAccessJwt");
async function importJwtKey(teamDomain, kid) {
  const jwks = await getJwks(teamDomain);
  const jwk = jwks.keys.find((candidate) => candidate.kid === kid);
  if (!jwk) throw httpError(403, "Cloudflare Access signing key was not found.");
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
}
__name(importJwtKey, "importJwtKey");
__name2(importJwtKey, "importJwtKey");
async function getJwks(teamDomain) {
  const now = Date.now();
  if (jwksCache && jwksCache.teamDomain === teamDomain && jwksCache.expiresAt > now) {
    return jwksCache.value;
  }
  const response = await fetch(`${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) throw httpError(503, "Could not fetch Cloudflare Access signing keys.");
  const value = await response.json();
  jwksCache = {
    teamDomain,
    value,
    expiresAt: now + 60 * 60 * 1e3
  };
  return value;
}
__name(getJwks, "getJwks");
__name2(getJwks, "getJwks");
function audienceMatches(actual, expected) {
  if (Array.isArray(actual)) return actual.includes(expected);
  return actual === expected;
}
__name(audienceMatches, "audienceMatches");
__name2(audienceMatches, "audienceMatches");
function normalizeTeamDomain(value) {
  const trimmed = String(value || "").trim().replace(/\/+$/, "");
  if (!trimmed) return "";
  return trimmed.startsWith("https://") ? trimmed : `https://${trimmed}`;
}
__name(normalizeTeamDomain, "normalizeTeamDomain");
__name2(normalizeTeamDomain, "normalizeTeamDomain");
function base64UrlDecode(value) {
  const bytes = base64UrlToBytes(value);
  return new TextDecoder().decode(bytes);
}
__name(base64UrlDecode, "base64UrlDecode");
__name2(base64UrlDecode, "base64UrlDecode");
function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}
__name(base64UrlToBytes, "base64UrlToBytes");
__name2(base64UrlToBytes, "base64UrlToBytes");
async function readJson(request) {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw httpError(415, "Expected application/json.");
  }
  try {
    return await request.json();
  } catch (_error) {
    throw httpError(400, "Invalid JSON.");
  }
}
__name(readJson, "readJson");
__name2(readJson, "readJson");
function serializeEntry(entry, user, env) {
  return {
    id: entry.id,
    slug: entry.slug || null,
    kind: entry.kind,
    title: entry.title || null,
    summary: entry.summary || null,
    body_text: entry.body_text || null,
    image_url: entry.image_key ? `/us/api/images/${entry.image_key}` : null,
    tags: parseTagsJson(entry.tags_json),
    author_handle: entry.author_handle,
    created_at: entry.created_at,
    updated_at: entry.updated_at,
    can_delete: entry.author_email === user.email || isAdmin(user, env)
  };
}
__name(serializeEntry, "serializeEntry");
__name2(serializeEntry, "serializeEntry");
function publicUser(user, env) {
  return {
    email: user.email,
    handle: user.handle,
    name: user.name || "",
    is_admin: isAdmin(user, env)
  };
}
__name(publicUser, "publicUser");
__name2(publicUser, "publicUser");
function isAdmin(user, env) {
  const admins = String(env.ROOM_OWNER_EMAILS || "").split(",").map((email) => normalizeEmail(email)).filter(Boolean);
  return admins.includes(user.email);
}
__name(isAdmin, "isAdmin");
__name2(isAdmin, "isAdmin");
function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}
__name(normalizeEmail, "normalizeEmail");
__name2(normalizeEmail, "normalizeEmail");
function handleFromEmail(email) {
  return (email.split("@")[0] || "guest").replace(/[^a-zA-Z0-9_.-]/g, "").slice(0, 32) || "guest";
}
__name(handleFromEmail, "handleFromEmail");
__name2(handleFromEmail, "handleFromEmail");
function normalizeText(value) {
  return String(value || "").replace(/\r\n/g, "\n").trim();
}
__name(normalizeText, "normalizeText");
__name2(normalizeText, "normalizeText");
function parseTagsJson(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch (_error) {
    return [];
  }
}
__name(parseTagsJson, "parseTagsJson");
__name2(parseTagsJson, "parseTagsJson");
function parseFrontMatter(markdown) {
  const trimmedStart = markdown.replace(/^\uFEFF/, "");
  const firstLine = trimmedStart.match(/^([+-]{3})\r?\n/);
  if (!firstLine) return { data: {}, body: markdown };
  const delimiter = firstLine[1];
  const closing = new RegExp(`\\n${escapeRegExp(delimiter)}\\r?\\n`);
  const rest = trimmedStart.slice(firstLine[0].length);
  const match2 = rest.match(closing);
  if (!match2 || typeof match2.index !== "number") return { data: {}, body: markdown };
  const frontMatter = rest.slice(0, match2.index);
  const body = rest.slice(match2.index + match2[0].length);
  return { data: parseSafeFrontMatter(frontMatter), body };
}
__name(parseFrontMatter, "parseFrontMatter");
__name2(parseFrontMatter, "parseFrontMatter");
function parseSafeFrontMatter(source) {
  const data = {};
  source.split(/\r?\n/).forEach((line) => {
    const yaml = line.match(/^\s*([A-Za-z_][A-Za-z0-9_-]*)\s*:\s*(.+?)\s*$/);
    const toml = line.match(/^\s*([A-Za-z_][A-Za-z0-9_-]*)\s*=\s*(.+?)\s*$/);
    const match2 = yaml || toml;
    if (!match2) return;
    const key = match2[1].toLowerCase();
    if (key !== "title" && key !== "summary" && key !== "tags") return;
    data[key] = parseFrontMatterValue(match2[2]);
  });
  return data;
}
__name(parseSafeFrontMatter, "parseSafeFrontMatter");
__name2(parseSafeFrontMatter, "parseSafeFrontMatter");
function parseFrontMatterValue(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') || trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed.slice(1, -1).split(",").map((item) => parseFrontMatterValue(item));
  }
  return trimmed;
}
__name(parseFrontMatterValue, "parseFrontMatterValue");
__name2(parseFrontMatterValue, "parseFrontMatterValue");
function coerceTitle(value) {
  const title = normalizeText(Array.isArray(value) ? value[0] : value);
  return title ? title.slice(0, 120) : "";
}
__name(coerceTitle, "coerceTitle");
__name2(coerceTitle, "coerceTitle");
function coerceSummary(value) {
  const summary = normalizeText(Array.isArray(value) ? value[0] : value);
  return summary ? summary.slice(0, 280) : "";
}
__name(coerceSummary, "coerceSummary");
__name2(coerceSummary, "coerceSummary");
function coerceTags(value) {
  const rawTags = Array.isArray(value) ? value : String(value || "").split(",");
  return rawTags.map((tag) => normalizeText(tag).replace(/^["']|["']$/g, "").slice(0, 32)).filter(Boolean).filter((tag, index, tags) => tags.indexOf(tag) === index).slice(0, 12);
}
__name(coerceTags, "coerceTags");
__name2(coerceTags, "coerceTags");
function firstMarkdownHeading(markdown) {
  const line = markdown.split(/\r?\n/).find((candidate) => /^#{1,3}\s+\S/.test(candidate));
  return line ? line.replace(/^#{1,3}\s+/, "").trim().slice(0, 120) : "";
}
__name(firstMarkdownHeading, "firstMarkdownHeading");
__name2(firstMarkdownHeading, "firstMarkdownHeading");
function summarizeMarkdown(markdown) {
  return markdownToPlainText(markdown).slice(0, 220);
}
__name(summarizeMarkdown, "summarizeMarkdown");
__name2(summarizeMarkdown, "summarizeMarkdown");
function markdownToPlainText(markdown) {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/!\[[^\]]*]\([^)]+\)/g, " ").replace(/\[([^\]]+)]\([^)]+\)/g, "$1").replace(/[#>*_`~-]/g, " ").replace(/\s+/g, " ").trim();
}
__name(markdownToPlainText, "markdownToPlainText");
__name2(markdownToPlainText, "markdownToPlainText");
function slugify(value) {
  const slug = String(value || "").normalize("NFKD").toLowerCase().replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70);
  return slug || "post";
}
__name(slugify, "slugify");
__name2(slugify, "slugify");
function renderMarkdown(markdown) {
  const withSafeImages = markdown.replace(/!\[([^\]]*)]\(([^)]+)\)/g, (_match, alt, url) => {
    if (url.startsWith("/us/api/images/")) {
      const decoded = url.replace(/&amp;/g, "&");
      return `<img src="${escapeAttribute(decoded)}" alt="${escapeHtml(alt || "")}" loading="lazy" referrerpolicy="no-referrer">`;
    }
    return "[image omitted]";
  });
  const lines = withSafeImages.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let paragraph = [];
  let list = [];
  let quote = [];
  let inCode = false;
  let code = [];
  function flushParagraph() {
    if (!paragraph.length) return;
    blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    paragraph = [];
  }
  __name(flushParagraph, "flushParagraph");
  __name2(flushParagraph, "flushParagraph");
  function flushList() {
    if (!list.length) return;
    blocks.push(`<ul>${list.map((item) => `<li>${renderInline(item)}</li>`).join("")}</ul>`);
    list = [];
  }
  __name(flushList, "flushList");
  __name2(flushList, "flushList");
  function flushQuote() {
    if (!quote.length) return;
    blocks.push(`<blockquote>${quote.map((item) => `<p>${renderInline(item)}</p>`).join("")}</blockquote>`);
    quote = [];
  }
  __name(flushQuote, "flushQuote");
  __name2(flushQuote, "flushQuote");
  function flushCode() {
    if (!code.length) return;
    blocks.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`);
    code = [];
  }
  __name(flushCode, "flushCode");
  __name2(flushCode, "flushCode");
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      if (inCode) {
        inCode = false;
        flushCode();
      } else {
        flushParagraph();
        flushList();
        flushQuote();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      code.push(line);
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
      flushQuote();
      continue;
    }
    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      flushQuote();
      const level = heading[1].length + 1;
      blocks.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }
    const listItem = line.match(/^\s*[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();
      flushQuote();
      list.push(listItem[1]);
      continue;
    }
    const quoteLine = line.match(/^\s*>\s?(.+)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line.trim());
  }
  flushCode();
  flushParagraph();
  flushList();
  flushQuote();
  return blocks.join("\n");
}
__name(renderMarkdown, "renderMarkdown");
__name2(renderMarkdown, "renderMarkdown");
function renderInline(value) {
  const codeSegments = [];
  let escaped = escapeHtml(value).replace(/`([^`]+)`/g, (_match, code) => {
    const token = `\0CODE${codeSegments.length}\0`;
    codeSegments.push(`<code>${escapeHtml(code)}</code>`);
    return token;
  });
  escaped = escaped.replace(/\[([^\]]+)]\(([^)\s]+)\)/g, (_match, label, href) => {
    const decodedHref = href.replace(/&amp;/g, "&");
    if (!isSafeHref(decodedHref)) return label;
    return `<a href="${escapeAttribute(decodedHref)}" rel="nofollow noreferrer noopener" target="_blank">${label}</a>`;
  });
  escaped = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>").replace(/\*([^*]+)\*/g, "<em>$1</em>");
  codeSegments.forEach((html, index) => {
    escaped = escaped.replace(`\0CODE${index}\0`, html);
  });
  return escaped;
}
__name(renderInline, "renderInline");
__name2(renderInline, "renderInline");
function isSafeHref(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:";
  } catch (_error) {
    return false;
  }
}
__name(isSafeHref, "isSafeHref");
__name2(isSafeHref, "isSafeHref");
function escapeHtml(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
__name(escapeHtml, "escapeHtml");
__name2(escapeHtml, "escapeHtml");
function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#96;");
}
__name(escapeAttribute, "escapeAttribute");
__name2(escapeAttribute, "escapeAttribute");
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
__name(escapeRegExp, "escapeRegExp");
__name2(escapeRegExp, "escapeRegExp");
function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}
__name(httpError, "httpError");
__name2(httpError, "httpError");
function jsonError(error) {
  const status = Number(error.status || 500);
  const message = status >= 500 ? error.message || "Internal server error." : error.message;
  return json({ error: message }, { status });
}
__name(jsonError, "jsonError");
__name2(jsonError, "jsonError");
function json(payload, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("cache-control", "no-store");
  return new Response(JSON.stringify(payload), {
    ...init,
    headers
  });
}
__name(json, "json");
__name2(json, "json");
function onRequest(context) {
  return handleRoomApi(context.request, context.env);
}
__name(onRequest, "onRequest");
__name2(onRequest, "onRequest");
async function onRequest2(context) {
  const url = new URL(context.request.url);
  if (!url.pathname.includes("/private/")) {
    return context.next();
  }
  const { request, env } = context;
  const cookieString = request.headers.get("Cookie") || "";
  const isLoggedIn = cookieString.includes("cf_private_auth=true");
  if (isLoggedIn) {
    return context.next();
  }
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const password = formData.get("password");
      if (password === env.PRIVATE_POST_PASSWORD) {
        const response = new Response("Redirecting...", {
          status: 302,
          headers: {
            "Location": url.pathname,
            "Set-Cookie": "cf_private_auth=true; HttpOnly; Secure; Path=/; Max-Age=2592000"
            // 30 days
          }
        });
        return response;
      }
    } catch (e) {
    }
  }
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Private Content</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .login-box { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: center; }
        input[type="password"] { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; margin-bottom: 1rem; width: 100%; box-sizing: border-box; }
        button { padding: 0.5rem 1rem; background-color: #000; color: #fff; border: none; border-radius: 4px; cursor: pointer; width: 100%; }
        button:hover { background-color: #333; }
        .error { color: red; margin-bottom: 1rem; font-size: 0.875rem; }
      </style>
    </head>
    <body>
      <div class="login-box">
        <h2>Private Content</h2>
        ${request.method === "POST" ? '<p class="error">Incorrect password. Please try again.</p>' : "<p>Please enter the password to view this post.</p>"}
        <form method="POST">
          <input type="password" name="password" placeholder="Password" required autofocus>
          <button type="submit">Unlock</button>
        </form>
      </div>
    </body>
    </html>
  `;
  return new Response(html, {
    status: 401,
    headers: { "Content-Type": "text/html;charset=UTF-8" }
  });
}
__name(onRequest2, "onRequest2");
__name2(onRequest2, "onRequest");
var routes = [
  {
    routePath: "/us/api/:path*",
    mountPath: "/us/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/",
    mountPath: "/",
    method: "",
    middlewares: [onRequest2],
    modules: []
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError2 = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError2;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError3 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError3;

// .wrangler/tmp/bundle-zzGT3A/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-zzGT3A/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.04185259181928902.js.map
