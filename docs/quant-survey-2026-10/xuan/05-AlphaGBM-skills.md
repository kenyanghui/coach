# 05 · AlphaGBM/skills

> 抓取时间：2026-10-07（GitHub API + raw README/docs/CATALOG.md，真实抓取）

## ① 一句话定位

**面向 AI 工作区的市场研究技能包**：把实时市场数据与研究 workflow 带进 Claude Code、Cursor 等工具，提供股票、期权、商品等 **27–29 个开源 Skills**（5 个核心 workflow + 22 个细分/reference 包），由 AlphaGBM 商业 API/账户支撑。

## ② Stars / 许可证 / 更新 / 活跃度

| 指标 | 值 |
|---|---|
| Stars | **5776**（本次调研中最高） |
| Forks | 340 |
| Open issues | 0 |
| 许可证 | **MIT** |
| 语言 | Python |
| 创建 | 2026-04-06 |
| 最近推送 | **2026-10-06** |
| 提交数 | 51 |
| 版本 | catalogue v3.1.2 |
| 官网 | https://www.alphagbm.com/skills |

**活跃度：高**（官方团队维护，持续发版与目录化，有 demo/测试脚本与 CI 风格校验）。

## ③ 技术栈

- **Agent Skills**：每个包为 `SKILL.md` + `references/`（方法文档）+ `scripts/run.py`（自包含 Python 3.9+ runner）；可通过 `npx skills add AlphaGBM/skills --skill <id>` 安装到 Claude Code/Cursor 等。
- **CLI**：`cli/alphagbm_cli/`（`client.py`、`config.py`、`display.py`、`main.py`），`pyproject.toml` 打包。
- **运行时**：`runtime/workflow.py`、`runtime/review_engine.py`；账户鉴权用环境变量 `ALPHAGBM_API_KEY`。
- **目录工程**：`catalog/catalog.json` 为唯一目录源；`scripts/build_catalog.py`、`--check`、`unittest` 校验。
- **演示**：`demo/`、`mock-data/`（AAPL/META/NVDA/SPY/TSLA、VIX、fear-score 等）。

## ④ 数据面与 A 股适用性

- **市场覆盖偏美股**：核心 workflow（股票机会、期权策略、新闻影响、研报拆解、投资复盘）与细分工具（期权 Greek/IV/波动率曲面、ETF、网格、定投、动量、聪明钱）都以美股/期权为主，mock 数据为 NVDA/SPY/AAPL 等。
- **A 股/港股覆盖有限**：目录中仅“高息策略（Dividend Strategy）”明确提到“结合股息质量……筛选**港股和 A 股**的高息研究候选”；其余未见 A 股核心覆盖。
- **数据来源**：AlphaGBM 账户/API（付费配额）；部分包为 `reference`（仅方法/legacy 文档，不暴露实时 API）。
- **A 股适用性：低–中**（仅个别港股/A 股高息场景；无 A 股行情/财务/龙虎榜等基础面）。

## ⑤ 核心能力

- **5 个核心 workflow**：
  1. Stock Opportunities（`alphagbm-stock-research`）——基本面/情绪/风险/机会评分；
  2. Options Strategies（`alphagbm-options-research`）——候选、资金需求、风险限制；
  3. News Impact（`alphagbm-news-impact`，public）——事件、受影响资产、影响推断；
  4. Research Report Breakdown（`alphagbm-report-breakdown`，public）——机构观点、原始评级、假设与来源；
  5. Investment Review（`alphagbm-investment-review`，local）——两份快照的本地对比复盘。
- **22 个细分工具/reference**：股票分析、高息、市场情绪、研报查阅、动量、ETF、网格、定投、聪明钱；期权评分、波动率快照/曲面/微笑、Greek、策略构建、损益模拟、财报 IV crush、期权异动、对冲、价差回测；商品（产业链瓶颈）；数字资产（预测市场观察）。
- **工程化**：包内自包含 runner，调用付费端点前会检查 workflow 契约，不会用 demo 冒充真实结果；明确“保留来源日期、缺失数据与评分定义”。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**3 / 5**

理由：
- **Claude Code 技能生态**：**满分级契合**——原生 Agent Skills 格式、`npx skills add` 一键安装、MIT，是研究“技能包工程化”的标杆。
- **A 股投研 / 万丰 CIO**：**契合度低**——数据与 workflow 以美股/期权为主，A 股仅高息策略一角；且核心能力走 AlphaGBM 付费账户配额，不适合作为 A 股数据底座。
- 综合：**生态示范价值高，A 股实战价值有限**。

## ⑦ 集成难度 + 路径

**难度：低（安装）/ 中（可用）。**

1. `npx skills add AlphaGBM/skills --list` 浏览；`npx skills add AlphaGBM/skills --skill alphagbm-stock-research` 安装单包。
2. 在 https://www.alphagbm.com/api-keys 创建个人 key，以环境变量 `ALPHAGBM_API_KEY` 安全配置（勿贴进对话或提交仓库）。
3. 安装免费；**账户制研究共享网站配额与订阅规则**，安装不额外解锁配额。
4. 公共研究阅读无需 key；Investment Review 在本地比较用户提供的文件。
5. 仅作方法参考时可只用 `reference` 包与 demo（不调付费端点）。

## ⑧ 风险

- **付费/配额绑定**：可调用 workflow 依赖 AlphaGBM 账户与额度，存在持续成本与供应商锁定。
- **市场不匹配**：以美股/期权为主，A 股投研覆盖薄；不能替代 A 股数据源。
- **状态分层**：目录中大量包为 `reference`/`preview`，文档明确“安装/预览不等于已验证的生产可用”。
- **数据合规**：数据经第三方商业 API，二次分发/合规需自行评估。
- **计数口径**：README 写“27 Skills / 29 Skills”，catalogue v3.1.2 写“5 workflows + 22 focused”，规模化选型时以 `catalog/catalog.json` 为准。
