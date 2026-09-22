#!/usr/bin/env python3
"""coach 站点一致性检查（drift guards）

用法：
    python3 scripts/check_site.py            # 全部检查
    python3 scripts/check_site.py links      # 仅坏链
    python3 scripts/check_site.py sitemap    # 仅 sitemap 对账
    python3 scripts/check_site.py leak       # 仅防泄漏
    python3 scripts/check_site.py brand      # 仅品牌违禁词

退出码：0 = 通过；1 = 有问题（CI 据此阻断部署）
"""
import os
import re
import sys
import json
import xml.etree.ElementTree as ET
from datetime import date
from urllib.parse import unquote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, "content")
SITE_BASE = "https://kenyanghui.github.io/coach/"
SITEMAP = os.path.join(CONTENT, "sitemap.xml")

EXTERNAL_PREFIXES = ("#", "http://", "https://", "mailto:", "tel:", "data:", "javascript:")

# 品牌违禁词：出现即报警（典籍合法用字白名单按文件豁免）
BRAND_FORBIDDEN = ["玄龙堂"]
BRAND_WHITELIST = {
    "courseware/cw-08-国学智慧与商业决策.html",   # 故弄玄虚
    "dao/cultivation/index.html",                 # 玄牝（道德经）
    "dao/index.html",                             # 玄肤论
    "research/国际易经智库会.html",                # 玄谈
}

# 防泄漏：content/ 内疑似内部/草稿文件的信号
LEAK_PATTERNS = [
    re.compile(r"(内部|宣讲|给老板|草稿|待删|DRAFT)", re.I),
    re.compile(r"^in/|/in/"),          # 旧 in/ 目录引用
]
# 这些目录/文件名模式视为公开内容白名单
LEAK_NAME_WHITELIST = re.compile(r"^(research|courseware|dao|cases|tools|skills|projects|courses|coach|quant|assets|compliance|about|apply|assessment|decision-system|index|logo|favicon|robots|sitemap|杨辉老师简介)")


def iter_html_files():
    for dp, _, fns in os.walk(CONTENT):
        for fn in fns:
            if fn.endswith(".html"):
                yield os.path.join(dp, fn)


def rel(p):
    return os.path.relpath(p, CONTENT)


def check_links():
    problems = []
    for p in iter_html_files():
        dp = os.path.dirname(p)
        html = open(p, encoding="utf-8", errors="ignore").read()
        for m in re.finditer(r'(?:href|src)="([^"]+)"', html):
            href = m.group(1)
            if href.startswith(EXTERNAL_PREFIXES):
                continue
            path = href.split("#")[0].split("?")[0]
            if not path:
                continue
            target = os.path.normpath(os.path.join(dp, unquote(path)))
            if not os.path.exists(target):
                problems.append(f"坏链 {rel(p)} -> {href}")
    return problems


def check_sitemap():
    problems = []
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    tree = ET.parse(SITEMAP)
    today = date.today()
    listed = set()
    for u in tree.getroot().findall("s:url", ns):
        loc = u.find("s:loc", ns).text
        lm = u.find("s:lastmod", ns)
        path = loc.replace(SITE_BASE, "") or "index.html"
        fp = os.path.join(CONTENT, path)
        # 1) sitemap 里的地址必须存在
        if not os.path.exists(fp):
            problems.append(f"sitemap 指向不存在的文件: {path}")
            continue
        listed.add(path)
        # 2) lastmod 不能晚于今天（写错日期）
        if lm is not None and str(today) < lm.text:
            problems.append(f"sitemap lastmod 晚于今天: {path} = {lm.text}")
    # 3) 主要页面必须被 sitemap 收录（仅检查根目录与 quant/ 一级）
    for p in iter_html_files():
        r = rel(p).replace(os.sep, "/")
        depth = r.count("/")
        if depth > 1 or r in listed:
            continue
        if LEAK_NAME_WHITELIST.match(r):
            if r not in listed:
                problems.append(f"页面未被 sitemap 收录: {r}")
    return problems


def check_leak():
    problems = []
    # 目录级：非白名单顶层条目
    for name in sorted(os.listdir(CONTENT)):
        if not LEAK_NAME_WHITELIST.match(name):
            problems.append(f"疑似非公开内容混入 content/: {name}")
    # 文件级：内容含内部信号词且被站内引用指向站外相对路径 ../
    for p in iter_html_files():
        html = open(p, encoding="utf-8", errors="ignore").read()
        for pat in LEAK_PATTERNS:
            if len(pat.findall(html)) > 20:  # 大量命中视为内部文档
                problems.append(f"疑似内部文档: {rel(p)}（命中信号词过多）")
                break
    return problems


def check_brand():
    problems = []
    for p in iter_html_files():
        r = rel(p).replace(os.sep, "/")
        html = open(p, encoding="utf-8", errors="ignore").read()
        for w in BRAND_FORBIDDEN:
            if w in html:
                problems.append(f"品牌违禁词「{w}」: {r}")
    return problems


CHECKS = {
    "links": ("坏链", check_links),
    "sitemap": ("sitemap 对账", check_sitemap),
    "leak": ("防泄漏", check_leak),
    "brand": ("品牌违禁词", check_brand),
}


def main():
    keys = sys.argv[1:] or list(CHECKS)
    all_problems = []
    for k in keys:
        name, fn = CHECKS[k]
        problems = fn()
        print(f"[{'FAIL' if problems else ' OK '}] {name}: {len(problems)} 个问题")
        for p in problems:
            print(f"    - {p}")
        all_problems += problems
    if all_problems:
        print(f"\n共 {len(all_problems)} 个问题，请修复后再发布。")
        sys.exit(1)
    print("\n全部通过。")


if __name__ == "__main__":
    main()
