# 万丰·量AI（coach）项目说明

## 项目定位

「万丰·量AI — AI量化课程阵地」：万丰AI量化课程官网，React 19 + Vite + Tailwind v4 SPA，部署于 GitHub Pages：
https://coach.aibay.asia/（= https://kenyanghui.github.io/coach/）

八模块（量系列）：量成长(AI量化自评) / 量经典(AI量化书籍) / 量指南(AI量化指南) / 量搭子(AI搭子邀约) / 量工具(AI量化软件) / 量技能(AI量化技能) / 量专家(AI量化思想) / 共拆AI(AI量化悟道+万丰AI入口)。

## 目录结构

- `src/` — 源码
  - `src/pages/` — 十页：Home + 八模块 + About
  - `src/data/` — 页面数据（site.js 站点常量：导航/模块/合规红线）
  - `src/components/` — Navbar / Footer
- `public/` — favicon.svg / robots.txt / sitemap.xml
- `legacy/` — 旧版「正行明熙」静态站全量归档（随部署发布到 /legacy/，43MB，内含 67 页 quant 工具详解）
- `index.html` — Vite 入口
- `.github/workflows/deploy.yml` — push main 自动发布（lint + build + SPA 与 legacy 组装同部署）

## 品牌规则（重要）

- 品牌名：**万丰·量AI**（课程全称：万丰AI量化课程）。不要出现「小蛮腰」「拆AI」「chai」等旧品牌字样。
- 主视觉：浅色底 + 万丰橙（`#ff5a1f`，深橙 `#e14e15`）+ 辅青 `#0f9d8f`，Apple 风设计系统（apple-card / btn-primary / eyebrow / headline 类已全局定义）。
- 联系邮箱：`yanghuihotmail@hotmail.com`。
- 课程基石口径：**1 个自研基座（万丰系统）+ 27 个开源基石**，共 28 系统；工具名称与星级以 `src/data/tools.js` 为准。
- 合规红线：凡涉策略/收益/实盘的页面脚注必须带 `COMPLIANCE`（site.js 导出）；禁「保证收益」「稳赚」等违规词。

## 编辑规范

- React 19 + Vite 8 + Tailwind v4（`@theme` token 在 `src/index.css`），无 UI 库，framer-motion 做入场动画。
- 代码零注释；数据文件（src/data/*.js）零 import、`export default`。
- 移动优先；改导航时同步 `src/data/site.js` 的 navLinks（所有页面与页脚共用）。
- 新页面三同步：App.jsx 路由 + site.js navLinks/modules + public/sitemap.xml。

## 常用命令

```bash
npm ci
npm run lint
npm run build        # vite build + 404.html
npm run preview      # 本地预览 dist
# 发布：提交并推送 main，GitHub Actions 自动部署
```
