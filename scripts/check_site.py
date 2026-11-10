#!/usr/bin/env python3
"""coach 站点一致性检查（SPA drift guards）

用法：
    python3 scripts/check_site.py            # 全部检查
    python3 scripts/check_site.py routes     # 仅页面/路由/导航对账
    python3 scripts/check_site.py sitemap    # 仅 sitemap 对账
    python3 scripts/check_site.py links      # 仅站内链接
    python3 scripts/check_site.py leak       # 仅防泄漏红线
    python3 scripts/check_site.py brand      # 仅品牌/合规违禁词

退出码：0 = 通过；1 = 有问题（CI 据此阻断合并）
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src")
SITE_BASE = "https://coach.aibay.asia"

ROUTE_RE = re.compile(r'<Route\s+path="([^"]+)"')
NAV_RE = re.compile(r"path:\s*'([^']+)'")
SITEMAP_RE = re.compile(r"<loc>" + re.escape(SITE_BASE) + r"(/[^<]*)</loc>")
LINK_RE = re.compile(r'(?:to|href)="/([^"]*)"')
LEAK_RE = re.compile(
    r"39\.108|139\.196|39\.96|43\.159|81\.71"
    r"|[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}"
    r"|AIBay|tvly-|token[=:]\s*['\"]?[A-Za-z0-9_\-]{8,}|(ghp|gho|github_pat)_[A-Za-z0-9_\-]{20,}|密码|secret|apikey"
)
BRAND_FORBIDDEN = ["职称评审", "职评", "玄龙堂", "保证收益", "稳赚"]


def read(path):
    with open(path, encoding="utf-8") as f:
        return f.read()


def js_files():
    out = []
    for dp, _, fns in os.walk(SRC):
        for fn in fns:
            if fn.endswith((".js", ".jsx")):
                out.append(os.path.join(dp, fn))
    return sorted(out)


def app_routes():
    text = read(os.path.join(SRC, "App.jsx"))
    return {p for p in ROUTE_RE.findall(text) if p != "*"}


def nav_paths():
    text = read(os.path.join(SRC, "data", "site.js"))
    return NAV_RE.findall(text)


def page_expected_paths():
    pages_dir = os.path.join(SRC, "pages")
    out = set()
    for fn in os.listdir(pages_dir):
        if fn.endswith(".jsx"):
            slug = "/" + fn.split(".")[0].lower()
            out.add("/" if slug == "/home" else slug)
    return out


def sitemap_paths():
    text = read(os.path.join(ROOT, "public", "sitemap.xml"))
    paths = set()
    for m in SITEMAP_RE.findall(text):
        paths.add(m if len(m) > 1 else "/")
    return paths


def internal_links():
    bad = []
    for p in js_files():
        rel = os.path.relpath(p, ROOT)
        for ln, line in enumerate(read(p).splitlines(), 1):
            for path in LINK_RE.findall(line):
                if path != "/" and ("/" + path) not in app_routes() and path not in app_routes():
                    bad.append(f"{rel}:{ln} -> /{path}")
    return bad


def leak_hits():
    bad = []
    for p in js_files():
        rel = os.path.relpath(p, ROOT)
        for ln, line in enumerate(read(p).splitlines(), 1):
            m = LEAK_RE.search(line)
            if m:
                bad.append(f"{rel}:{ln} -> {m.group(0)}")
    return bad


def brand_hits():
    bad = []
    targets = js_files() + [os.path.join(ROOT, "index.html")]
    for p in targets:
        rel = os.path.relpath(p, ROOT)
        text = read(p)
        for word in BRAND_FORBIDDEN:
            if word in text:
                bad.append(f"{rel} -> {word}")
    return bad


def check_routes(problems):
    routes = app_routes()
    pages = page_expected_paths()
    for p in sorted(pages - routes):
        problems.append(f"routes: 孤儿页面 {p}（src/pages 有页但 App.jsx 无路由）")
    for p in sorted(set(routes) - pages - {"/"}):
        problems.append(f"routes: 空路由 {p}（App.jsx 有路由但 src/pages 无对应页）")
    nav = nav_paths()
    for p in sorted(set(nav) - routes):
        problems.append(f"routes: 导航悬空 {p}（navLinks 指向不存在的路由）")
    print(f"[routes] pages={len(pages)} routes={len(routes)} nav={len(nav)}")


def check_sitemap(problems):
    routes = app_routes()
    sm = sitemap_paths()
    for p in sorted(routes - sm):
        problems.append(f"sitemap: 路由缺录 {p}")
    for p in sorted(sm - routes):
        problems.append(f"sitemap: 死链 {p}（sitemap 有但无路由）")
    if not os.path.isdir(os.path.join(ROOT, "legacy")):
        problems.append("sitemap: legacy/ 目录缺失（SEO 资产未随仓）")
    print(f"[sitemap] routes={len(routes)} sitemap={len(sm)}")


def check_links(problems):
    bad = internal_links()
    problems.extend(f"links: {b}" for b in bad)
    print(f"[links] scanned={len(js_files())} bad={len(bad)}")


def check_leak(problems):
    bad = leak_hits()
    problems.extend(f"leak: {b}" for b in bad)
    print(f"[leak] scanned={len(js_files())} bad={len(bad)}")


def check_brand(problems):
    bad = brand_hits()
    problems.extend(f"brand: {b}" for b in bad)
    print(f"[brand] scanned={len(js_files()) + 1} bad={len(bad)}")


CHECKS = {
    "routes": check_routes,
    "sitemap": check_sitemap,
    "links": check_links,
    "leak": check_leak,
    "brand": check_brand,
}


def main():
    selected = sys.argv[1:] or list(CHECKS)
    unknown = [a for a in selected if a not in CHECKS]
    if unknown:
        print(f"未知检查项: {unknown}（可选: {list(CHECKS)}）")
        return 1
    problems = []
    for name in selected:
        CHECKS[name](problems)
    if problems:
        print(f"\nFAIL（{len(problems)} 项）")
        for p in problems:
            print("  -", p)
        return 1
    print("\nPASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
