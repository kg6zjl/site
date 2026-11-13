# The public site

Static HTML and CSS, published as it sits. **No framework, no build step, no dependencies** -- nothing
to install, nothing to pin, and nothing that breaks because an upstream theme moved.

Dark only, by request. One stylesheet, one accent, system fonts.

```
.
  index.html        why this exists, what the agent has done, what it costs, what's still broken
  guardrails.html   permissions, secrets, networking, admission, patching, disposable state
  1-why-guardrails.html  why guardrails matter
  2-five-controls.html   five controls
  3-rbac.html       permissions (RBAC)
  4-kyverno.html    kyverno identity policies
  5-secrets.html    secrets management
  6-network.html    network policies
  7-runtime.html    runtime behaviour
  8-change-flow.html    change flow
  9-kured-renovate.html  auto-updates (Kured/Renovate)
  10-disposable.html    disposable pod
  alerting.html     the pipeline, the receivers, the channels, and what's not an alert
  workflow.html     how a change actually reaches the cluster
  stack.html        every tool, and why that one rather than another
  about.html        about the author
  reviews.html      what major AI models said about this setup
  assets/style.css  one stylesheet, dark only
  assets/lightbox.js  one script: click a figure to open it full size, click away to close
  assets/img/*.svg  the diagrams, rendered and committed
  .nojekyll         serve the files as-is; no Jekyll processing
```

It was thirteen pages. It's eight, because the reader came for five things: what holds this together,
what it watches, how it tells you, how a change gets in, and what it's built from. Anything that
didn't serve one of those became a section on a page that did.

`assets/lightbox.js` is the only script, and it is the one concession to interactivity: a screenshot
you cannot read at 100% and cannot zoom without script is a screenshot nobody reads. It is native
`<dialog>` plus a delegated click handler, so there is nothing to install and nothing to pin, and
it is progressive -- the trigger is a plain link to the image, so with scripting off the click opens
the file. Everything else on the site works with no JavaScript at all.

## Deploying

Cloudflare **Workers Builds** deploys this repository to the `site` Worker on pushes to `main`.
A pull request gets a preview deployment via `wrangler preview` (configured in `wrangler.jsonc`).

The site answers on `stevearnett.com` (Cloudflare Workers, custom domain). There is no GitHub Pages
deployment and no `CNAME` in this repository.

## Editing

Edit a page in the private `kg6zjl/clusters` repo, where the site is authored, then run
`task site:sync` there to open a pull request here. Run the checks rather than trusting your eyes:

```bash
cd ../documentation/site-diagrams && task check
```

That verifies the nav is identical and in order, that every figure points at a file which exists and
declares its real dimensions, and that nothing here describes the network rather than the mechanism.
The public scan also runs on every pull request against this repository.

The voice is the point, and it's easy to lose: plain English, first person, short sentences, no hype.
If a sentence only warms up or hedges, cut it. Say what broke and what it cost.

## Diagrams

Every diagram is a Mermaid source file, rendered to an SVG that is **committed** here. Nothing is
rendered at publish time -- that is what keeps this a no-build directory -- and a diagram is text, so
it is reviewed as a diff and cannot quietly drift away from the paragraph beside it.

Sources, the renderer image, and the render task live in `documentation/site-diagrams/` of the private
`kg6zjl/clusters` repo. They are deliberately **kept out of this repository**, because Workers
Builds publishes every file here and the tooling is full of the registry hostname. After editing a
`.mmd`:

```bash
cd ../documentation/site-diagrams && task diagrams
```

Copy the rendered `width`/`height` into the page's `<img>` -- `task check:figures` will tell you if
they are missing or wrong. Adding a figure needs a real `alt` written as a description of the picture
that stands on its own, because a screen reader skips the figure and reads only that.

Screenshots are different: three of them are placeholders waiting to be captured, and
`documentation/site-diagrams/SHOTS.md` says exactly what to capture and what to redact.

## This repository is public -- sanitize before you push

The repository is public, so the site is public, and it's the one artifact written *for* strangers.
`task check:public` in the private repo runs the scan, and CI here runs it on every pull request; the
rule it enforces is that nothing here describes the network rather than the mechanism.

Addresses, hostnames, domains and email addresses stay out;
describe the category instead ("the API server is a host process", "a shared file share on a NAS",
"a machine called a think-centre"). **Product names are fine** -- public OSS and public services, and
naming them is most of what makes the site useful to somebody building the same thing.

A screenshot bypasses that grep entirely, because the values are pixels rather than text. Crop and
blur at capture time, and read `SHOTS.md` before you take one.

The same rule applies to the site's own history: a leak removed in a later commit is still public in
the earlier one, so treat a leak here as a credential-rotation event, not a typo.
