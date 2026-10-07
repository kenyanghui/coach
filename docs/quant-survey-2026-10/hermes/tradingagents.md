# TradingAgents（TauricResearch/TradingAgents）调研报告

> 抓取时间：2026-10-07（数据来自 GitHub API 与 raw.githubusercontent.com，均为实时抓取）

## ① 一句话定位
用多个 LLM 智能体模拟真实交易公司分工（基本面/情绪/新闻/技术分析师 + 多空研究员辩论 + 交易员 + 风控/组合经理）的**多智能体交易研究框架**，输出研究性买卖决策。

## ② Stars / 许可证 / 最近更新 / 活跃度
| 项 | 值 |
|---|---|
| Stars | **110,028** |
| Forks | 21,154 |
| Open issues | 91 |
| License | **Apache-2.0** |
| 最近 push | **2026-10-03** |
| 最近 API 更新 | 2026-10-07 |
| 创建时间 | 2024-12-28 |
| 语言/主题 | Python；agent, finance, llm, multiagent, trading |
| 官网/论文 | https://arxiv.org/abs/2412.20138 |
| archived | 否 |

活跃度：**极高**。README 显示 2026-10 刚发布 v0.6.0，2026 年内几乎每月一个版本（v0.2.x→v0.6.0），有 CI、Discord、多语言 README、Trendshift 榜首徽章。

## ③ 技术栈与架构
- 语言：Python ≥3.11（示例用 3.13）；打包 `pyproject.toml` + `requirements.txt`。
- 编排：**LangGraph**（支持节点级 checkpoint 断点续跑、状态图）。
- 目录（抓取自 `/contents/tradingagents`）：
  - `agents/`（analysts / researchers / managers / risk_mgmt / trader + schemas、rating）
  - `graph/`（TradingAgentsGraph 主图）
  - `dataflows/`（`router.py`、`symbols.py`、`date_window.py`、`vendors/` 多数据源路由）
  - `llm_clients/`、`memory/`、`portfolio.py`、`backtest.py`、`reporting.py`、`report_html.py`、`default_config.py`
- LLM 供应商：OpenAI、Google、Anthropic、xAI、DeepSeek、Qwen（DashScope 国际+中国双端）、GLM（Zhipu 国际+BigModel 国内）、MiniMax（全球+国内）、OpenRouter、Mistral、Moonshot/Kimi、Groq、NVIDIA NIM、Azure、AWS Bedrock、Ollama 本地、任意 OpenAI 兼容端点（vLLM/LM Studio/llama.cpp）。**分层模型**：quick 供分析师/交易员，deep 供研究与组合经理，可各自用不同供应商。
- 交付形态：交互式 CLI + Python 包 + Docker/Docker Compose。

## ④ 数据面（数据源/覆盖市场/A股适用性）
- 市场：**任何 Yahoo Finance 覆盖的市场**，用交易所后缀（US `AAPL`；HK `0700.HK`；东京 `.T`；伦敦 `.L`；印度 `.NS/.BO`；加 `.TO`；澳 `.AX`；**A 股上海 `.SS` / 深圳 `.SZ`**，如 `600519.SS`；加密 `BTC-USD`）。
- 基本面：**SEC EDGAR**（point-in-time，按 filing 日期，无需 key，机器可读数据 2009 年起）；非美国公司走 Yahoo Finance，但**历史回看时 Yahoo 基本面会被"withheld"**（无法确认当时是否已公开）。
- 其它源：FRED 宏观（免费 key，可选）、Alpha Vantage、StockTwits / Reddit 社交情绪、Polymarket、可选 TypeSafe "Jev" 帖子筛选。
- **A 股适用性：有限**。行情可用 Yahoo 的 `.SS/.SZ` 后缀，但（a）A 股基本面走 Yahoo 分支，历史时点完整性差；（b）情绪/新闻源以美股、英文社媒为主；（c）无 tushare/akshare/巨潮等本土数据源。需自行改造 `dataflows/vendors` 才能做严肃 A 股投研。

## ⑤ 核心能力清单
- 多智能体协作：并行分析师 → 多空研究员结构化辩论 → 交易员 → 风控团队 → 组合经理审批 → 模拟交易所执行。
- Memory log：每次决策落盘，到期后结算已实现收益与相对基准 alpha，生成反思并回喂组合经理（持续学习）。
- Checkpoint 断点续跑（LangGraph + 每标的 SQLite）；`--clear-checkpoints`。
- 回测网格：`run_backtest` / `tradingagents backtest TICKER --start --end --every N`，按 region benchmark 计算 alpha，按评级分组。
- Point-in-time 数据完整性、决策信号、价格快照接地（grounding）、组合上下文（`PortfolioContext`）。
- 输出：markdown 报告树 + 单页 `complete_report.html`；`save_reports()`。
- 可复现性控制（temperature、模型选择）与前瞻偏差修正说明。

## ⑥ 与"A股投研 + 万丰CIO APP + 玄龙堂周易量化"契合度：**3 / 5**
理由：
- ➕ 多智能体辩论、memory/reflection、回测 alpha 结算等设计，对"AI 投研"与 CIO 决策工作流是极佳的**架构参考**；支持 DeepSeek/Qwen/GLM 等国产模型与私有化本地模型。
- ➖ **不原生适配 A 股**：无本土数据源、基本面/情绪信号偏美股；直接产出 A 股结论可靠性低。玄龙堂"周易量化"属另类因子/择时体系，与本框架无交集，只能作为通用 agent 编排骨架。
- 结论：作为"研究脚手架/参考实现"契合度中上，作为"可直接上线的 A 股投研引擎"契合度中下。

## ⑦ 集成难度与路径建议
难度：**中**。
路径：
1. 用 `openai_compatible`/DeepSeek/Qwen 指向本地或国产模型，跑通 CLI 与 `TradingAgentsGraph.propagate()`。
2. 新增 A 股数据 vendor（akshare/tushare/baostock），在 `dataflows/router.py` + `vendors/` 注册，替换 Yahoo/SEC 分支，保证 point-in-time。
3. 情绪/新闻源中文化（财联社、东财股吧、雪球、微博）。
4. 复用其 report/backtest 产出接入万丰 CIO APP 的展示层；把"周易量化"信号作为一个自定义 analyst/vendor 注入。
5. 注意成本与延迟（多 agent + 多轮辩论调用量大）。

## ⑧ 风险
- 许可证：Apache-2.0，商用友好，需保留 NOTICE/版权声明。
- 维护：核心团队维护、社区大，但版本迭代快、import 路径多次变动（v0.5.1 有 breaking 重构），升级需回归测试。
- 合规：README 明示**仅供研究、非投资建议**；LLM 输出非确定性、可能幻觉；接入实盘/对外提供建议需自行承担投顾合规责任。
- 数据/成本：依赖多个第三方 API（部分需付费/需 key）；SEC 要求设置 `SEC_EDGAR_USER_AGENT` 联络邮箱。
- 供应链：LangGraph 等依赖较重；须锁定版本。
