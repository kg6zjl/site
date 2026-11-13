#!/usr/bin/env python3
"""Render check for the static site.

Serves the repo root and verifies every page actually renders: HTTP 200, a
stylesheet that resolves, non-trivial body content, and every local href/src
reachable. Catches the bug where a page is served but unstyled or empty --
which a link checker alone does not see.

Run from the repo root:  python3 scripts/check_render.py
"""
import http.server
import os
import re
import socketserver
import sys
import threading
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIN_BODY_BYTES = 1500
MIN_CSS_BYTES = 3000

LINK_RE = re.compile(r'(?:href|src)="([^"]+)"')
STYLE_RE = re.compile(r'<link[^>]+rel=["\']?stylesheet["\']?[^>]*>', re.I)
STYLE_HREF_RE = re.compile(r'href="([^"]+)"')


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    handler = lambda *a, **k: QuietHandler(*a, directory=ROOT, **k)
    httpd = socketserver.TCPServer(("localhost", 0), handler)
    port = httpd.server_address[1]
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, port


def fetch(base, path):
    url = base + urllib.parse.quote(path)
    req = urllib.request.Request(url, headers={"User-Agent": "render-check"})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            return r.status, r.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()
    except Exception as e:
        return 0, str(e).encode()


def main():
    httpd, port = serve()
    base = f"http://localhost:{port}/"
    failures = []

    pages = sorted(f for f in os.listdir(ROOT) if f.endswith(".html"))
    if not pages:
        print("FAIL: no .html pages found at repo root")
        return 1

    print(f"checking {len(pages)} pages on port {port}\n")

    for page in pages:
        status, body = fetch(base, page)
        label = f"{page:<26}"
        if status != 200:
            failures.append(f"{page}: HTTP {status}")
            print(f"  FAIL {label} HTTP {status}")
            continue
        if len(body) < MIN_BODY_BYTES:
            failures.append(f"{page}: body only {len(body)} bytes")
            print(f"  FAIL {label} body={len(body)}B too small")
            continue

        html = body.decode("utf-8", "replace")

        css_ok = 0
        for tag in STYLE_RE.findall(html):
            m = STYLE_HREF_RE.search(tag)
            if not m:
                continue
            href = m.group(1)
            if href.startswith(("http://", "https://", "//")):
                continue
            cs, cbody = fetch(base, href)
            if cs != 200 or len(cbody) < MIN_CSS_BYTES:
                failures.append(f"{page}: stylesheet {href} -> HTTP {cs}, {len(cbody)}B")
                print(f"  FAIL {label} css {href} HTTP {cs} {len(cbody)}B")
            else:
                css_ok += 1

        broken = []
        for href in sorted(set(LINK_RE.findall(html))):
            if href.startswith(("http://", "https://", "//", "#", "mailto:", "data:")):
                continue
            target = href.split("#")[0].split("?")[0]
            if not target:
                continue
            ls, _ = fetch(base, target)
            if ls != 200:
                broken.append(f"{target} ({ls})")
        if broken:
            failures.append(f"{page}: broken refs {broken[:4]}")
            print(f"  FAIL {label} broken: {', '.join(broken[:4])}")

        if css_ok == 0:
            failures.append(f"{page}: no stylesheet at all")
            print(f"  FAIL {label} no stylesheet link")
            continue

        if not broken:
            print(f"  ok   {label} {len(body)//1024}KB  css={css_ok}")

    httpd.shutdown()
    print()
    if failures:
        print(f"FAIL: {len(failures)} problem(s)")
        for f in failures:
            print(f"  - {f}")
        return 1

    print(f"render ok: {len(pages)} pages, all stylesheets and refs resolve")
    return 0


if __name__ == "__main__":
    sys.exit(main())
