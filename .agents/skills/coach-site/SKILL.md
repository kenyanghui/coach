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
3. **站点检查（drift guards，单一事实源 `scripts/check_site.py`）**：

```bash
cd /Users/yanghui/OneDrive/website/coach
python3 scripts/check_site.py            # 全部：坏链 + sitemap 对账 + 防泄漏 + 品牌违禁词
python3 scripts/check_site.py links      # 仅坏链（站内相对链接）
```

退出码非 0 即有问题，必须修复后才能提交；CI（`.github/workflows/deploy.yml` 的 check job）会在 push/PR 时跑同一脚本拦截。

4. **提交发布**：`git add -A && git commit -m "<说明>" && git push origin main`，然后访问线上 URL 确认。
5. **本地预览**：`python3 -m http.server 8080 -d content` 后打开 http://127.0.0.1:8080/

## 发布前清单（checklist）

- [ ] `python3 scripts/check_site.py` 全部通过（0 问题）
- [ ] 新增页面已收录进 `content/sitemap.xml`（含 lastmod、priority）
- [ ] `content/` 内无草稿/内部文件（守卫的 leak 检查会拦，但新增顶层目录需同步更新脚本白名单 `LEAK_NAME_WHITELIST`）
- [ ] 导航改动已同步所有页面（以首页 nav-shell 为基准）
- [ ] 品牌词干净：无「玄龙堂」；「玄」字仅限典籍合法用字（白名单见脚本 `BRAND_WHITELIST`）

## 注意事项

- `content/` 会被整体公开，不要放草稿；仓库根的 `CLAUDE.md`、`DSH插件配置指南.md` 不会被发布。
- 检查逻辑只在 `scripts/check_site.py` 一处维护，SKILL.md 与 CI 均引用它，不要复制粘贴脚本代码。
- 新增顶层内容目录时：更新 `scripts/check_site.py` 的 `LEAK_NAME_WHITELIST`，否则防泄漏检查会误报。
- 大范围改品牌词时先跑 `python3 scripts/check_site.py brand`。
- 部署由 GitHub Actions 完成（check → build → deploy），本地无需构建。
