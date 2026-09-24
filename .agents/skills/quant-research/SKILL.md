---
name: quant-research
description: 量化工具生态调研技能 — 按标准搜索词表抓取 GitHub 高星项目、与站点现有内容做差集分析、产出调研报告与新工具页建议。当用户提到找开源量化项目、扩大研究/交付范围、工具选型对比、生态调研时使用。
triggers:
  - 生态调研
  - 找开源项目
  - 工具选型
---

# quant-research 量化生态调研

参照 octopus-workflow 的 corpus 模式：**搜索词表（SSOT）→ 差集分析 → 报告落盘 → 工作流沉淀**。

## 标准搜索词表（GitHub Search API）

基础词（每次必跑，`sort=stars&per_page=10`）：

| 词 | 覆盖面 |
|---|---|
| `quantitative trading` | 综合盘 |
| `topic:trading-bot` | 交易机器人 |
| `algorithmic-trading language:python` | Python 框架 |
| `topic:quantitative-finance` | 金融工程 |
| `backtesting framework` | 回测 |
| `portfolio optimization python` | 组合优化 |
| `akshare` / `tushare` | A股数据源 |
| `technical analysis` | 技术指标 |
| `factor model chinese stock` | A股因子 |

注意：GitHub Search API 匿名限速 10 次/分钟，搜索间 `sleep 8`；必要时带 `-u user:token`。

## 差集分析流程

1. **盘点现状**：`ls content/quant/*.html | xargs -n1 basename`，从各页 `<title>` 提取已覆盖项目与星标。
2. **对表**：新搜索结果 vs 现有覆盖，输出三档：
   - P0：星标 >10k 且与训练营定位相关 → 建工具页 + 课程
   - P1：1k–10k 且填补能力空白 → 建工具页
   - P2：生态补全 → 提及/引用进 education.html
3. **结构性空白**：按「数据→研究→组合→执行→监控」五层检查缺哪层，比缺单个工具更要紧。

## 落盘规范

- 报告写 `docs/quant-ecosystem-research-YYYY-MM.md`（仓库根 docs/，**不进 content/**，避免发布）
- 站点公开页面只放结论性内容（工具页/对比课），原始调研留 docs/
- 新增工具页必须：同步 `content/sitemap.xml` + 跑 `python3 scripts/check_site.py`

## 现有五层覆盖基线（2026-09）

| 层 | 已覆盖 | 空白 |
|---|---|---|
| 数据 | openbb/bigquant/joinquant/ricequant/tdx | **akshare/tushare/Ashare 免费路线** |
| 研究 | qlib/alphalens/vectorbt/backtrader/zipline | backtesting.py、Lean |
| 组合 | 无 | **整层缺失：PyPortfolioOpt/Riskfolio-Lib/skfolio** |
| 执行 | vnpy/freqtrade/QMT(easyxt)/ptrade/ccxt | jesse、Hummingbot |
| 监控 | 无 | 自建 dashboard 方向 |

## 深挖建议模式（给客户建个人系统)

- 工具页加「何时选我」决策卡（场景+替代品+迁移成本）
- 以「端到端线路」串联工具，不以孤立工具页组织内容
- 每条线路终点交付可运行 repo 模板（数据+回测+组合+实盘开关）

详细结论见最新 `docs/quant-ecosystem-research-*.md`。
