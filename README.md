# The public site

Static HTML and CSS. No framework, no build step, no dependencies.

Dark only. One stylesheet. System fonts. A font CDN would fail the public scan.

```
index.html                         redirect to the featured project
projects/index.html                project index
projects/k8s-and-hermes/index.html the essay Home shows
about/index.html
github/index.html
_redirects                         same redirect, for the Worker
assets/style.css
```

Home is a redirect. A new landing page is a change to that redirect and to `index.html`. The essay stays at its URL.

## Deploying

`.github/workflows/pages.yaml` publishes this repository on pushes to `main`. A pull request does not publish.

The site is a GitHub Pages project site, so links are relative. A root path would miss the `/site/` prefix.

`stevearnett.com` is a redirect to that Pages site, not a custom domain on this repository. There is no `CNAME` here.

## This repository is public

No addresses, hostnames, or email, other than this site's own domain. Product names are fine. The scan in `.github/workflows/check-public.yaml` runs on every pull request.
