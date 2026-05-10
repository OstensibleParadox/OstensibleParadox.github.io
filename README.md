# OstensibleParadox Hugo Blog

Bilingual Hugo + PaperMod blog. The public site is intended to be hosted on Cloudflare Pages at:

```text
https://ostensibleparadox.pages.dev/
```

GitHub Pages is retained only as a redirect from the old `ostensibleparadox.github.io` address.

## Structure

```text
content/
  Chinese/       # Chinese public content
  English/       # English public content
  us/            # Shared private section rendered at /us/
layouts/us/      # Private-section list and single-page templates
archetypes/us.md # Front matter template for /us/ posts
static/images/   # Static images
hugo.toml        # Hugo configuration
```

## Public Content

Create public posts in the language-specific content directories:

```text
content/Chinese/posts/your-post.md
content/English/posts/your-post.md
```

Front matter example:

```toml
+++
date = '2026-05-10T13:01:35+08:00'
draft = false
title = '文章标题'
+++
```

Images belong under `static/images/` and are referenced from Markdown as:

```markdown
![Description](/images/folder/image.jpg)
```

## Private `/us/` Section

The `/us/` section is source-managed in `content/us/` and rendered once at the root URL:

```text
https://ostensibleparadox.pages.dev/us/
```

New private posts should be created with the `us` archetype:

```bash
hugo new content content/us/my-note.md --kind us
```

The private section is configured to avoid public Hugo collections where possible:

- no section RSS output
- hidden from PaperMod search JSON
- hidden from RSS feeds
- hidden from home lists
- `noindex, nofollow` robots meta
- no sitemap entry

Important: Cloudflare Access protects the deployed `/us/` URL. It does not protect source files in GitHub. Keep the repository private before adding real private writing to `content/us/`.

## Local Development

```bash
hugo server -D
```

Open:

```text
http://localhost:1313/
```

Build locally:

```bash
hugo --minify
```

## Deployment

Cloudflare Pages should build the Hugo site directly from the repo:

```text
Framework preset: Hugo
Build command: hugo --minify
Build output directory: public
```

Then configure Cloudflare Access for the private section on the Pages project:

```text
Workers & Pages -> project -> Settings -> General -> Enable access policy
Manage the generated Access app
Public hostname: ostensibleparadox.pages.dev
Path: /us*
Policy: Allow selected email addresses by OTP
```

The GitHub Actions workflow in `.github/workflows/hugo.yml` deploys only a redirect page to GitHub Pages, preserving old deep-link paths through its `404.html` redirect.
