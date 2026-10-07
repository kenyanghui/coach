# 矩阵研究 INDEX — A股投研 / 万丰CIO APP / 玄龙堂周易量化

> 抓取时间：2026-10-07。评分 1–5，针对"A股投研 + 万丰CIO APP + 玄龙堂周易量化"场景的契合度。
> 所有数据均来自 GitHub API / raw README 实时抓取；未确认项已在各报告标注。

| 项目 | 仓库 | Stars | 许可 | 评分 | 一句话结论 |
|---|---|---|---|---|---|
| TradingAgents | TauricResearch/TradingAgents | 110,028 | Apache-2.0 | **3/5** | 多智能体 LLM 交易研究框架，架构参考价值极高，但 A 股数据面薄弱、需自行改造。 |
| financial-machine-learning | firmai/financial-machine-learning | 8,807 | 无 | **2/5** | 金融 ML 资源精选清单，仅作选型雷达，无代码可集成、偏西方市场。 |
| QUANTAXIS | yutiansut/QUANTAXIS（原 QUANTAXIS/QUANTAXIS） | 11,257 | MIT | **4/5** | A 股/期货/期权全链路本土量化平台，能力最全但架构偏重、运维成本高。 |
| Sequoia-X | sngyai/Sequoia-X | 7,910 | 无（README 自称 MIT） | **4/5** | 轻量 A 股技术形态自动选股+飞书推送，开箱即用、易集成，但无正式 LICENSE。 |
| financial-services | anthropics/financial-services | 38,886 | Apache-2.0 | **2/5** | Anthropic 官方 FSI 智能体/技能/MCP 参考方案，架构值得借鉴但不面向 A 股。 |

## 组合建议

建议采用**"底层数据平台 + 信号引擎 + AI 编排层 + 架构范式"**的分工组合，而非单点选型：

1. **底层基础设施：QUANTAXIS（主，4/5）**。用其 `QAFetch/QAData` 搭建 A 股/期货数据层与账户体系，用 `QAStrategy/QAFactor/QAIndicator` 承载回测与因子研究。凭 MIT 许可与本土市场原生支持，它是万丰 CIO APP 最完整的地基；但因其依赖 MongoDB/ClickHouse/RabbitMQ 且版本为 alpha，建议 **Docker 化、按需裁剪模块、锁定 v2.1.x**，只取所需而非全量部署。

2. **轻量信号引擎：Sequoia-X（辅，4/5）**。以 `data/engine.py`（baostock + SQLite）做快速选股与日 K 增量，把 `strategy/base.py` 作为自定义策略接口，低成本产出盘后选股信号接入 APP。它可作为 QUANTAXIS 重型方案的"轻量旁路"与快速原型；**采用前必须解决无 LICENSE 的授权问题**（联系作者或替换实现）。

3. **AI 编排层：TradingAgents（参考实现，3/5）**。借其多智能体辩论、memory/reflection、回测 alpha 结算的成熟设计，作为"AI 投研"骨架；接 DeepSeek/Qwen/GLM 等国产模型实现私有化。关键是新增 A 股数据 vendor（akshare/tushare/baostock）并把情绪/新闻源中文化——不建议直接采信其美股导向输出。

4. **玄龙堂周易量化**：以自定义**因子/指标**形式接入 QUANTAXIS（`QAFactor/QAIndicator`）或 Sequoia-X（策略基类），与经典技术面因子做叠加/对照，实现"另类择时 + 技术面"融合。

5. **架构范式参考：anthropics/financial-services（2/5，仅借鉴）**。照搬其 **agent + skill + MCP 连接器**分层与 `orchestrate.py` 的 `handoff_request` 事件路由，为万丰 CIO APP 设计内部技能库与工具网关；把其西方数据连接器替换为自建 A 股 MCP server。因依赖 Claude 生态、无中国市场支持，**不落地、只取方法论**。

6. **选型雷达：financial-machine-learning（2/5）**。仅作团队内部知识库，筛选组合优化/因子/回测类成熟库（如 PyPortfolioOpt、Riskfolio-Lib）补强 QUANTAXIS 生态。

**优先级建议**：先落地 Sequoia-X（快速见效、低风险）→ 引入 QUANTAXIS 建数据/回测底座 → 以 TradingAgents 范式叠加 AI 投研 → 参照 anthropics 范式做 APP 的 agent/MCP 架构。**合规红线**：所有项目均为研究性质、不构成投资建议；涉及对外荐股/资管须满足投顾合规；注意 Sequoia-X 与 financial-machine-learning 无正式许可证的授权风险，以及数据源（baostock/tushare/pytdx）的授权与稳定性。
