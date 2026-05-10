# Deployment

The site now uses Cloudflare Pages for the real Hugo deployment and GitHub Pages only as a redirect target for the old URL.

## Cloudflare Pages

1. Open Cloudflare Dashboard.
2. Go to **Workers & Pages**.
3. Choose **Create** → **Pages** → **Connect to Git**.
4. Select this repository.
5. Use these build settings:

```text
Framework preset: Hugo
Build command: hugo --minify
Build output directory: public
```

6. Deploy the site.
7. Confirm the Pages URL is:

```text
https://ostensibleparadox.pages.dev/
```

If Cloudflare assigns a different project URL, update these files before pushing:

```text
hugo.toml
.github/workflows/hugo.yml
README.md
DEPLOYMENT.md
```

## Cloudflare Access for `/us/`

For the default `ostensibleparadox.pages.dev` hostname, start from the Pages project:

1. Open **Workers & Pages**.
2. Select the Pages project.
3. Go to **Settings** → **General**.
4. Enable the Access policy.
5. Select **Manage** on the generated Access policy.
6. In **Access** → **Applications**, open the generated Pages application.
7. Configure the public hostname so production `/us/` is protected:

```text
Host: ostensibleparadox.pages.dev
Path: /us*
```

8. Add an allow policy using email OTP.
9. Add only the email addresses that should see `/us/`.
10. Save.

Cloudflare path matching treats `/us/*` as child paths only, so use `/us*` to cover both `/us/` and child posts.

If you later add a custom domain, create a separate Access self-hosted application for that custom domain with the same `/us*` path and email policy.

Verify in an incognito window:

```text
https://ostensibleparadox.pages.dev/us/
```

It should show the Cloudflare Access OTP screen before Hugo content is served.

## GitHub Pages Redirect

The workflow at `.github/workflows/hugo.yml` publishes a small redirect site to GitHub Pages. It does not build Hugo.

Expected behavior:

```text
https://ostensibleparadox.github.io/          -> https://ostensibleparadox.pages.dev/
https://ostensibleparadox.github.io/zh/posts/ -> https://ostensibleparadox.pages.dev/zh/posts/
```

## Privacy Boundary

Cloudflare Access protects only deployed HTTP access. It does not hide source files stored in GitHub. Make the repository private before adding private posts or personal media to `content/us/`.
