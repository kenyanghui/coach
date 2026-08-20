---
name: coach-site
description: 正行明熙（coach）网站维护技能 — 站点结构速查、编辑规范、链接检查与一键发布。当用户提到 coach 网站、正行明熙、训练营站点、改页面、发网站、更新 sitemap、检查坏链时使用。
---

# coach-site 网站维护

「正行明熙 · AI量化投资决策系统训练营」静态网站的维护流程与规范。

## 站点信息

| 项 | 值 |
|---|---|
| 线上地址 | https://kenyanghui.github.io/coach/ |
| 本地仓库 | `/Users/yanghui/OneDrive/website/coach/` |
| 发布根 | `content/`（GitHub Actions 直接上传该目录） |
| 部署触发 | `git push origin main` → `.github/workflows/deploy.yml` |
| 项目约定 | 先读仓库根 `CLAUDE.md`（品牌规则、编辑规范） |

## 核心页面

| 页面 | 说明 |
|---|---|
| `content/index.html` | 首页成交页（主导航基准：首页/训练营/学员案例/量化工具/资源中心/教练共创/申请） |
| `content/decision-system.html` | 训练营详情（6周决策系统） |
| `content/cases.html` | 学员案例 |
| `content/apply.html` | 申请表单 |
| `content/assessment.html` | 行为诊断 |
| `content/compliance.html` | 合规声明 |
| `content/coach-cocreate.html` | 教练共创 |
| `content/quant/index.html` | 量化工具中心 |
| `content/quant/education.html` | 资源中心 |

## 标准工作流

1. **改前**：`cd /Users/yanghui/OneDrive/website/coach && git status && git pull`
2. **编辑**：遵循 `CLAUDE.md`（品牌：正行明熙/金色系；邮箱 yanghuihotmail@hotmail.com；内联样式、移动优先；新增页面同步更新 `content/sitemap.xml`）
3. **链接检查**（只查站内相对链接，忽略 `#`/`http(s)`/`mailto`）：

```bash
cd /Users/yanghui/OneDrive/website/coach/content && python3 - <<'EOF'
import os, re
from urllib.parse import unquote
root = os.getcwd()
broken = []
for dp, _, fns in os.walk(root):
    for fn in fns:
        if not fn.endswith('.html'): continue
        p = os.path.join(dp, fn)
        html = open(p, encoding='utf-8', errors='ignore').read()
        for m in re.finditer(r'(?:href|src)="([^"]+)"', html):
            href = m.group(1)
            if href.startswith(('#','http://','https://','mailto:','tel:','data:','javascript:')): continue
            path = href.split('#')[0].split('?')[0]
            if not path: continue
            t = os.path.normpath(os.path.join(dp, unquote(path)))
            if not os.path.exists(t):
                broken.append((os.path.relpath(p, root), href))
print(f"broken: {len(broken)}")
for b in broken: print(' ', b)
EOF
```

4. **提交发布**：`git add -A && git commit -m "<说明>" && git push origin main`，然后访问线上 URL 确认。
5. **本地预览**：`python3 -m http.server 8080 -d content` 后打开 http://127.0.0.1:8080/

## 注意事项

- `content/` 会被整体公开，不要放草稿；仓库根的 `CLAUDE.md`、`DSH插件配置指南.md` 不会被发布。
- 大范围改品牌词时全局搜 `玄龙堂|玄` 确认清干净。
- 部署由 GitHub Actions 完成，本地无需构建。
