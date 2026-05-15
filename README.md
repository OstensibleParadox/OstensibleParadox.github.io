# ostensible-paradox

A bilingual Hugo blog with a Cloudflare Access-gated private room and a password-protected content area. Static public content, dynamic private content — separate places, separate rules.

## About

My personal bilingual site (Chinese/English): essays on AI governance and a private discussion room for invited readers, built as a retro-styled single-page app. The repo is public so the architecture is visible; private user-generated content lives in D1 and R2, not in git.

## Architecture

```
                   Cloudflare Pages
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    Hugo static     Pages Functions   D1 (SQLite)
    public site     /us/api/*          room_entries
    (/zh/, /en/)    │                 room_rate_limits
                    │
         ┌──────────┴──────────┐
         ▼                     ▼
    Access JWT verification   R2 (images)
    (identity layer)
```

**Four layers, two content domains:**

| Layer | Public | Private (`/us/`) |
|---|---|---|
| **Edge** | Cloudflare Pages serves static HTML | Cloudflare Access gates all `/us/*` routes |
| **Static shell** | Hugo builds blog from `content/` | Hugo builds room UI shell from `layouts/us/` |
| **API** | None needed | Pages Functions validate Access JWT, serve dynamic data |
| **Persistence** | Git-tracked Markdown files | D1 (SQLite at edge) — never committed to the public repo |

A separate password-protection layer (`functions/_middleware.js`) guards `/private/` content paths with cookie-based auth. This is distinct from the Cloudflare Access JWT gate used by `/us/`.

The public blog is pure Hugo. Markdown in `content/Chinese/` and `content/English/`, built to static HTML. No dynamic server needed.

The private room at `/us/` is a Windows 98-styled single-page app: a Hugo-built static shell that hydrates by calling `/us/api/*` endpoints. All user-generated content (shouts, Markdown posts, images) lives in D1 and R2. Together, the room UI (388 lines of vanilla JS, 413 lines of CSS), API (897 lines), and database form a self-contained dynamic application inside the static site.

## Why it works this way

### Pages Functions + D1 instead of pure static

The `/us/` room needs multi-user, persistent, user-generated content. Hugo has no runtime — it can't accept POST requests, store data, or authenticate users. Adding a database to a static site changes what kind of thing it is.

D1 was chosen over an external database because it runs at the edge — same Cloudflare network, no cross-datacenter latency, no separate connection pool to manage. It's SQLite, which is more than enough for a small private room and avoids operational complexity.

### JWT verification at edge and Pages Function level

Belt and suspenders. Cloudflare Access validates the JWT at the network edge (before the request reaches the Pages Function), but the Function re-validates it independently before any data read or write. This means:

- A misconfigured Access policy doesn't silently expose data — the Function is a second gate.
- The Function derives user identity from the verified JWT claims (email → handle), never from client-submitted fields.
- Local development can bypass Access entirely (using `DEV_ROOM_EMAIL`) without changing the verification code path — same function, different credential source.

JWT verification uses `RS256` with JWKS fetched from Cloudflare's certificate endpoint, cached for one hour, verified via Web Crypto (`crypto.subtle.verify`). No external auth library.

### Private content never enters the public repo

The repository is public, the room is private. The straightforward solution is to never store private content in git. User submissions go directly to D1. The room's Hugo template is committed (it's structural, not content), but the data it displays never touches the filesystem.

This also means no Hugo rebuild is needed when someone posts. The static shell stays static; content is fetched client-side from the API.

### Server-side Markdown rendering with constrained output

User-submitted Markdown is untrusted input. The server renders it to HTML with a custom zero-dependency renderer that:
- Disallows raw HTML entirely
- Only allows `http:`, `https:`, and `mailto:` link protocols
- Strips image syntax in rendered output unless the URL points to `/us/api/images/`
- Only accepts `title`, `summary`, and `tags` from user front matter — author, dates, and visibility are server-assigned

This prevents XSS, IP/referrer leaks to third parties, and author spoofing in one pass.

### Identity from verified email, not user input

The author of every entry is derived from the Cloudflare Access JWT's `email` claim. The client cannot override it. No user profiles, no display name settings, no impersonation surface. The handle is the email local-part, computed server-side.

### Rate limiting in D1, not a separate cache

The app already has a D1 binding. Adding Redis or another KV store for rate limiting would introduce a second stateful dependency for a single feature. Instead, rate limits use D1's `INSERT ... ON CONFLICT DO UPDATE` with sliding windows keyed by `action:email:time_bucket`. One database, one operational surface.

### Soft delete over hard delete

Moderation actions are reversible. Entries get a `deleted_at` timestamp; listing queries filter `WHERE deleted_at IS NULL`. Accidental deletions can be undone by clearing the timestamp. This costs almost nothing at this scale and means you can't permanently lose data through a misclick.

### SPA without a framework

The room UI (`assets/js/us-room.js`, 388 lines) uses zero dependencies — no React, no jQuery, no build step. The DOM surface is small enough that vanilla JS with `fetch`, `addEventListener`, and `innerHTML` is less code than the boilerplate of any framework. The Hugo asset pipeline handles minification and fingerprinting with SRI hashes.

### Password middleware for private content

Some content (e.g., informal guides under `content/Chinese/posts/private/`) should be readable without requiring Cloudflare Access, which demands a specific identity provider. A separate cookie-based password gate (`functions/_middleware.js`) protects these paths with a shared password — simpler, lower-friction access for content that doesn't need the full JWT identity layer.

## Project Structure

```text
.
├── content/
│   ├── Chinese/          # Chinese public content (posts, about, search)
│   ├── English/          # English public content (posts, about, search)
│   └── us/               # Static entry point for the protected area
├── layouts/              # Hugo template overrides (header, post meta, /us/ shell)
├── assets/
│   ├── css/extended/     # custom.css (theme), us.css (Win98 room UI)
│   └── js/us-room.js     # Zero-dependency SPA client for the private room
├── static/               # Static files: _headers, _redirects, images/
├── scripts/              # paper-to-blog.sh — academic paper → Hugo branch bundles
├── functions/            # Pages Functions route handlers → delegates to src/
├── migrations/           # Cloudflare D1 SQL migrations
├── src/                  # Shared API implementation (JWT verification, CRUD, markdown, rate limiting)
├── hugo.toml             # Hugo configuration (bilingual, search, PaperMod params)
├── wrangler.jsonc        # Cloudflare Pages Functions, D1, and R2 bindings
└── themes/PaperMod/      # PaperMod theme (git submodule)
```

## Quick Start

- Site: <https://ostensibleparadox-github-io.pages.dev/>
- Chinese home: <https://ostensibleparadox-github-io.pages.dev/zh/>
- English home: <https://ostensibleparadox-github-io.pages.dev/en/>
- Legacy redirect: <https://ostensibleparadox.github.io/>

```bash
hugo server -D                # local preview at http://localhost:1313
hugo --minify                 # production build
npx wrangler pages dev public # full-stack local dev with Pages Functions + D1
```

## Usage

**Adding public posts:** Create Markdown under `content/Chinese/posts/` or `content/English/posts/` with TOML front matter (`date`, `draft`, `title`). Images go in `static/images/` and are referenced from Markdown with root-relative paths (`![alt](/images/essay1/img.jpg)`).

**Academic papers:** Use `scripts/paper-to-blog.sh` to convert `.tex` or `.md` papers into PaperMod-compatible Hugo branch bundles with numbered chapters, cross-references, and bilingual navigation. See [scripts/paper-to-blog-README.md](scripts/paper-to-blog-README.md).

**Search:** Client-side Fuse.js search is available at `/zh/search/` (Chinese) and `/en/search/` (English). The search index is generated by Hugo at build time.

## Stack

- **Static site:** Hugo + PaperMod theme
- **Theme:** "Envying Baby" custom CSS (warm café palette, light/dark modes)
- **Hosting:** Cloudflare Pages
- **Dynamic API:** Cloudflare Pages Functions (JavaScript, Web Crypto, zero npm dependencies)
- **Database:** Cloudflare D1 (SQLite at edge)
- **Image storage:** Cloudflare R2
- **Authentication:** Cloudflare Access (JWT via `Cf-Access-Jwt-Assertion`) + cookie-based password middleware
- **Search:** Fuse.js client-side, index generated at Hugo build time
- **CI/CD:** Cloudflare Pages auto-deploy from `main` branch; GitHub Actions for legacy Pages redirect

## Boundaries

The API source code (`src/index.js`, `functions/`) and room UI (`assets/js/us-room.js`, `layouts/us/`) are fully public — the architecture is transparent. What stays out of this repository:

- **D1-stored content:** All room entries (shouts, posts) and rate-limit state live in Cloudflare D1, never in git.
- **R2-stored images:** User-uploaded images go to the `lucia-room-images` bucket.
- **Password-protected posts:** Content under `content/Chinese/posts/private/` is excluded from the public repo.
- **Build artifacts:** `public/` (Hugo output) and `.wrangler/` (local Wrangler state) are gitignored.
