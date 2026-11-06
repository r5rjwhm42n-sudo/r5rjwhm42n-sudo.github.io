#!/usr/bin/env python3
"""Copy the Athletic Department's Smore newsletters onto the site.

    python3 tools/build-newsletter.py https://app.smore.com/n/<key>-<name>   add or refresh one issue
    python3 tools/build-newsletter.py --refresh                              refresh every issue already on the site

Reads the newsletter's content from the Smore page, saves its photos (resized)
in newsletter/images/<key>/, and writes newsletter/issues.js, newest issue first.
The newsletter page builds itself from issues.js, and the hub shows the newest one.
The page is fetched with ?nocount=1 so running this tool never adds a Smore view.
"""
import html
import json
import os
import re
import subprocess
import sys
import tempfile
import urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "newsletter")
ISSUES = os.path.join(OUT, "issues.js")
PREFIX = "window.NEWSLETTERS = "
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36"
MAX_PX = 1000


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def js_string(src, name):
    """The value of `name:"..."` in the page's inline data (a JS string literal)."""
    m = re.search(re.escape(name) + r':"', src)
    if not m:
        return None
    i = j = m.end()
    while src[j] != '"':
        j += 2 if src[j] == "\\" else 1
    return json.loads('"' + src[i:j] + '"')


# ---------- rich text: Smore's node tree -> clean HTML ----------
BLOCK = {"p", "div", "ul", "ol", "li", "h1", "h2", "h3", "h4", "blockquote"}


def safe_href(href):
    href = (href or "").strip()
    if re.match(r"(?i)^https?://(www\.)?danversfalconsathletics\.org", href):
        return re.sub(r"(?i)^http://", "https://", href)
    return href if re.match(r"(?i)^(https?:|mailto:|tel:)", href) else None


def has_block(node):
    return any(isinstance(c, dict) and (c.get("t") in BLOCK or has_block(c)) for c in node.get("c", []))


def inline(nodes):
    out = ""
    for n in nodes:
        if isinstance(n, str):
            out += html.escape(n, quote=False)
            continue
        t, kids = n.get("t"), n.get("c", [])
        if t == "br":
            out += "<br>"
        elif t in ("strong", "b"):
            inner = inline(kids)
            out += f"<strong>{inner}</strong>" if inner.strip() else inner
        elif t in ("em", "i"):
            inner = inline(kids)
            out += f"<em>{inner}</em>" if inner.strip() else inner
        elif t == "a":
            href, inner = safe_href(n.get("a", {}).get("href")), inline(kids)
            if href and inner.strip():
                ext = "" if href.startswith(("mailto:", "tel:")) else ' target="_blank" rel="noopener"'
                out += f'<a href="{html.escape(href)}"{ext}>{inner}</a>'
            else:
                out += inner
        elif t in BLOCK:
            out += inline(kids) + "<br>"
        else:                       # span, u and anything else: keep the text only
            out += inline(kids)
    return out


def tidy(s):
    s = re.sub(r"\s*(<br>\s*)+$", "", re.sub(r"^(\s*<br>)+\s*", "", s))
    s = re.sub(r"(<br>\s*){2,}", "<br>", s)
    return s.strip()


def paragraphs(nodes, top=True):
    """Flatten Smore's nested paragraphs into a list of <p>/<ul> strings."""
    out, buf = [], []

    def flush():
        s = tidy("".join(buf))
        if re.sub(r"<[^>]+>|\s", "", s):
            out.append(f"<p>{s}</p>")
        buf.clear()

    for n in nodes:
        if isinstance(n, str):
            buf.append(html.escape(n, quote=False))
            continue
        t = n.get("t")
        if t == "br":
            flush()
        elif t in ("ul", "ol"):
            flush()
            items = [tidy(inline(li.get("c", []))) for li in n.get("c", []) if isinstance(li, dict)]
            items = [i for i in items if i]
            if items:
                out.append(f"<{t}>" + "".join(f"<li>{i}</li>" for i in items) + f"</{t}>")
        elif t in BLOCK or has_block(n):
            flush()
            if has_block(n):
                out.extend(paragraphs(n.get("c", []), False))
            else:
                buf.append(inline(n.get("c", [])))
                flush()
        else:
            buf.append(inline([n]))
    flush()
    return shape(out) if top else out


def text_of(p):
    return html.unescape(re.sub(r"<[^>]+>", "", p)).strip()


def all_bold(p):
    return bool(re.fullmatch(r"<p>(<strong>.*</strong>|<em><strong>.*</strong></em>)</p>", p)) and "<a " not in p


def short_line(p):
    t = text_of(p)
    return p.startswith("<p>") and not all_bold(p) and 0 < len(t) <= 70 and not t.endswith((".", ":", "!", "?"))


def shape(ps):
    """Bold-only lines become subheads (back-to-back ones join up), and runs of three
    or more short lines (a list of sports, a column of links) become a list."""
    out, i = [], 0
    while i < len(ps):
        if all_bold(ps[i]):
            words = []
            while i < len(ps) and all_bold(ps[i]):
                words.append(re.sub(r"</?(strong|em)>", "", ps[i][3:-4]).strip())
                i += 1
            out.append("<h4>" + " ".join(words) + "</h4>")
            continue
        j = i
        while j < len(ps) and short_line(ps[j]):
            j += 1
        if j - i >= 3:
            out.append("<ul>" + "".join(f"<li>{p[3:-4]}</li>" for p in ps[i:j]) + "</ul>")
            i = j
        else:
            out.append(ps[i])
            i += 1
    return out


# ---------- photos ----------
def save_photo(key, pic, max_px=MAX_PX):
    src = (pic or {}).get("full") or (pic or {}).get("original_url")
    if not src:
        return None
    name = re.sub(r"[^a-z0-9-]", "", (pic.get("id") or os.path.basename(src)).lower())
    folder = os.path.join(OUT, "images", key)
    done = [f for f in (name + ".jpg", name + ".png") if os.path.exists(os.path.join(folder, f))]
    if done:
        path = os.path.join(folder, done[0])
    else:
        os.makedirs(folder, exist_ok=True)
        with tempfile.TemporaryDirectory() as tmp:
            raw = os.path.join(tmp, "photo" + os.path.splitext(src)[1].lower())
            with open(raw, "wb") as f:
                f.write(get(src))
            alpha = "hasAlpha: yes" in subprocess.run(["sips", "-g", "hasAlpha", raw], capture_output=True, text=True).stdout
            path = os.path.join(folder, name + (".png" if alpha else ".jpg"))
            fmt = ["-s", "format", "png"] if alpha else ["-s", "format", "jpeg", "-s", "formatOptions", "78"]
            subprocess.run(["sips", "-Z", str(max_px), *fmt, raw, "--out", path], check=True, capture_output=True)
    name = os.path.basename(path)
    dims = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", path], capture_output=True, text=True).stdout
    w, h = (int(x) for x in re.findall(r"pixel(?:Width|Height): (\d+)", dims))
    return {"src": f"images/{key}/{name}", "w": w, "h": h, "alt": (pic.get("alt_text") or "").strip()}


# ---------- one issue ----------
def build(url):
    m = re.search(r"smore\.com/n/([a-z0-9]+)", url)
    if not m:
        sys.exit(f"Not a Smore newsletter link: {url}")
    key = m.group(1)
    page = get(url.split("?")[0] + "?nocount=1").decode("utf-8")
    data = json.loads(js_string(page, "js_content"))
    desc = js_string(page, "pageDescription") or ""
    when = re.search(r"publishedAt:new Date\((\d+)\)", page)
    published = datetime.fromtimestamp(int(when.group(1)) / 1000, timezone.utc).astimezone().date().isoformat() if when else None
    by = re.search(r"\bby (.+)$", desc.strip())

    head = data.get("header", {})
    issue = {
        "key": key,
        "url": url.split("?")[0],
        "name": (head.get("title") or "").strip(),
        "subtitle": (head.get("subtitle") or "").strip(),
        "author": by.group(1).strip() if by else None,
        "published": published,
        "title": None,
        "cover": save_photo(key, (head.get("custom") or {}).get("photo"), 1800),
        "sections": [],
    }

    section = None

    def new_section(title=None, big=False):
        nonlocal section
        section = {"id": None, "title": title, "big": big, "blocks": []}
        issue["sections"].append(section)

    for b in data.get("blocks", []):
        t = b.get("_t")
        if t == "text.title":
            title = re.sub(r"\s+", " ", b.get("title") or "").strip()
            if not issue["title"] and not b.get("_toc") and not issue["sections"]:
                issue["title"] = title
            else:
                new_section(title, b.get("_l") == "md")
            continue
        if t == "misc.separator":
            if section and section["blocks"]:
                new_section()
            continue
        if section is None:
            new_section()
        if t == "text.paragraph":
            body = paragraphs(b.get("content") or [])
            pic = save_photo(key, b.get("picture")) if b.get("picture") else None
            heading = re.sub(r"\s+", " ", b.get("title") or "").strip()
            if body or pic or heading:
                section["blocks"].append({"type": "text", "heading": heading or None, "html": body, "image": pic})
        elif t == "button" and (b.get("cta") or {}).get("url"):
            section["blocks"].append({"type": "button", "text": (b.get("text") or "").strip(),
                                      "url": b["cta"]["url"], "details": (b.get("details") or "").strip() or None})
        elif t == "embed.file" and b.get("access_url"):
            section["blocks"].append({"type": "file", "name": (b.get("file_name") or "Download").strip(),
                                      "kind": (b.get("file_type") or "").upper() or None,
                                      "size": b.get("file_size_in_bytes"), "url": b["access_url"]})
        elif t in ("image", "picture", "gallery"):
            for pic in b.get("pictures") or [b.get("picture")]:
                img = save_photo(key, pic)
                if img:
                    section["blocks"].append({"type": "text", "heading": None, "html": [], "image": img})

    issue["sections"] = [s for s in issue["sections"] if s["blocks"] or s["title"]]
    used = set()
    for s in issue["sections"]:
        base = re.sub(r"[^a-z0-9]+", "-", (s["title"] or "more").lower()).strip("-")[:40] or "more"
        sid, n = base, 2
        while sid in used:
            sid, n = f"{base}-{n}", n + 1
        used.add(sid)
        s["id"] = sid
    issue["title"] = issue["title"] or issue["name"] or "Newsletter"
    return issue


def load():
    if not os.path.exists(ISSUES):
        return []
    src = open(ISSUES, encoding="utf-8").read()
    return json.loads(src[src.index(PREFIX) + len(PREFIX):].rstrip().rstrip(";"))


def main(args):
    issues = load()
    urls = [i["url"] for i in issues] if args == ["--refresh"] else args
    if not urls:
        sys.exit(__doc__)
    for url in urls:
        issue = build(url)
        issues = [i for i in issues if i["key"] != issue["key"]] + [issue]
        print(f"{issue['key']}: {issue['title']} ({issue['published']}), {len(issue['sections'])} sections")
    issues.sort(key=lambda i: i.get("published") or "", reverse=True)
    os.makedirs(OUT, exist_ok=True)
    with open(ISSUES, "w", encoding="utf-8") as f:
        f.write("/* The Athletic Department's Smore newsletters, newest first.\n"
                "   Made by tools/build-newsletter.py; rerun it instead of editing by hand. */\n")
        f.write(PREFIX + json.dumps(issues, indent=1, ensure_ascii=False) + ";\n")
    # link preview (1200×630) from the newest issue's cover photo
    cover = issues[0].get("cover")
    if cover:
        og = os.path.join(ROOT, "images", "og", "newsletter.jpg")
        subprocess.run(["sips", "--resampleWidth", "1200", os.path.join(OUT, cover["src"]), "--out", og], check=True, capture_output=True)
        subprocess.run(["sips", "--cropToHeightWidth", "630", "1200", "-s", "format", "jpeg", "-s", "formatOptions", "80", og, "--out", og],
                       check=True, capture_output=True)


if __name__ == "__main__":
    main(sys.argv[1:])
