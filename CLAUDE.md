# 正行明熙（coach）项目说明

## 项目定位

「正行明熙 · AI量化投资决策系统训练营」成交网站，纯静态 HTML 站点，部署于 GitHub Pages：
https://kenyanghui.github.io/coach/

## 目录结构

- `content/` — **站点根目录**。GitHub Actions 直接把该目录上传发布，里面的一切都会被公开。
  - `index.html` 首页（训练营成交页）
  - `decision-system.html` 训练营详情（6周决策系统）
  - `cases.html` 学员案例
  - `apply.html` 申请表单
  - `assessment.html` 行为诊断
  - `compliance.html` 合规声明
  - `about.html`、`杨辉老师简介.html`
  - `coach-cocreate.html` 教练共创
  - `quant/` 量化工具与课程（含 `quant/index.html` 工具中心、`quant/education.html` 资源中心）
  - `research/` 研究内容
  - `tools/` AI 工具指南
  - `courses/` `courseware/` `projects/` `skills/` `dao/` `enjoy/` 其他内容
- `index.html` — 站点跳转页（meta refresh 到 `content/index.html`），不参与导航
- `.github/workflows/deploy.yml` — push main 自动发布
- `.mcp.json` — MCP 服务器配置（当前：mxai 图像生成，密钥走环境变量 `MXAI_API_KEY`）
- `.agents/skills/coach-site/` — 本项目维护技能

## 品牌规则（重要）

- 品牌名：**正行明熙**。不要使用旧名「玄龙堂」「玄」字标；字标已改为「正」。
- 主视觉：深色底 + 金色（CSS 变量 `--gold: #d5ad52` 系），字体见首页 `<style>` 顶部。
- 联系邮箱：`yanghuihotmail@hotmail.com`（不要改回其他邮箱）。
- 学员案例按真实首批案例口径写（正仁量化创始团队为「首批案例 + 技术支持」表述），不要虚构占位案例。

## 编辑规范

- 纯静态 HTML，样式内联在各自页面的 `<style>`，**无构建步骤**。
- 移动优先，沿用现有设计语言与 CSS 变量，不要另起一套风格。
- 改导航时保持所有页面一致（首页 `nav-shell` 为基准）。
- **新增页面必须同步更新 `content/sitemap.xml`**（含 lastmod、priority）。
- 不要往 `content/` 放草稿、非发布文件——整个目录会被公开。
- 页面间用相对链接，目标文件不存在即为坏链，改完跑链接检查（见技能）。

## 常用命令

```bash
cd /Users/yanghui/OneDrive/website/coach
# 本地预览
python3 -m http.server 8080 -d content
# 链接检查（脚本见 .agents/skills/coach-site/SKILL.md）
# 发布：提交并推送 main，GitHub Actions 自动部署
git add -A && git commit -m "..." && git push origin main
```
