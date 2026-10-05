# This is the public site — keep it public

**Every change here lands on the internet the moment it merges.** `clusters` is private; this repo is
not, and that is deliberate. The site is the one artifact written *for* strangers.

## The gate that has to pass

`task check:public` in the private `kg6zjl/clusters` repo scans this content for real addresses,
hostnames, domains and email addresses. A port on its own says nothing without a host, so the gate
does not try to catch bare port numbers. Describe the category instead — "the API
server is a host process", "a shared file share on a NAS", "a machine called a think-centre".

**Product names are fine.** Public OSS and public services; naming them is most of what makes the
site useful to somebody building the same thing.

CI runs the same scan on every pull request here, so a hostname cannot reach the public repo even if
the local run is skipped. A failing check is the whole point — do not widen the pattern to make it
pass. Add the redaction at the source.

## What a grep cannot see

Screenshots are pixels, not text, and they bypass the scan entirely. Redact at capture time: crop or
blur the values, then check the file before committing. Discord screenshots are where a webhook URL
or channel name is most likely to appear, so those get looked at twice.

**The history is public too.** A value removed in a later commit is still public in the earlier one.
Treat a leak as a credential rotation, not a typo.

## Where this came from

Content is authored in the private `kg6zjl/clusters` repo under `site/`, along with the Mermaid
sources and the diagram renderer in `documentation/site-diagrams/`. The rendered SVGs in
`assets/img/` are committed here because they ARE the site; their sources and tooling deliberately
stay private, because that tooling is full of internal hostnames.

To change the site, edit it in `clusters` and run `task site:sync` from there. Do not edit here.

## Deploying

`.github/workflows/pages.yaml` uploads the repo as a Pages artifact and deploys it **on pushes to
main only**. A pull request cannot trigger a publish.

The site answers on `kg6zjl.github.io/site`. `stevearnett.com` is a Cloudflare redirect rule pointing
here, not a custom domain - there is deliberately no `CNAME` in this repository, because claiming a
custom domain would take the hostname over from that redirect and stop `kg6zjl.github.io/site`
serving.

This workflow runs on GitHub-hosted runners, deliberately. Nothing here needs the cluster.