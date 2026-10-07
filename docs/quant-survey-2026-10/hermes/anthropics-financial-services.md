# financial-services（anthropics/financial-services）调研报告

> 抓取时间：2026-10-07（GitHub API + raw README + contents 实时抓取）

## ① 一句话定位
Anthropic 官方的 **"Claude for Financial Services" 参考方案仓**：面向投资银行、股票研究、私募股权、财富管理等 FSI 工作流的**参考智能体（agents）、技能（skills）与数据连接器（MCP）**集合，同一套内容既可以作为 Claude Cowork 插件安装，也可通过 Claude Managed Agents API 部署。

## ② Stars / 许可证 / 最近更新 / 活跃度
| 项 | 值 |
|---|---|
| Stars | **38,886** |
| Forks | 5,567 |
| Open issues | 231 |
| License | **Apache-2.0** |
| 最近 push | **2026-09-21** |
| 最近 API 更新 | 2026-10-07 |
| 创建时间 | 2026-02-23 |
| 语言/主题 | Python（实际内容以 Markdown/YAML 为主）；topics 为空 |
| archived | 否 |

活跃度：**高**。2026-02 创建、2026-09 仍在更新；231 open issues（多为功能请求/社区讨论）。由 Anthropic 官方背书。

## ③ 技术栈与架构
- 载体：**纯文件式（Markdown + JSON/YAML），无构建步骤**；`scripts/` 提供 `deploy-managed-agent.sh`、`check.py`、`validate.py`、`orchestrate.py`、`sync-agent-skills.py`。
- 目录（抓取）：
  - `plugins/agent-plugins/`：命名智能体（每个自包含，自带其使用的 skills）
  - `plugins/vertical-plugins/`：按垂直行业打包的 skills、slash 命令与 MCP 连接器
  - `plugins/partner-built/`：合作方插件（LSEG、S&P Global）
  - `managed-agent-cookbooks/`：Managed Agent 模板（`agent.yaml` + depth-1 子智能体 + steering 示例）
  - `claude-for-msft-365-install/`：在自有云（Vertex AI/Bedrock/内部网关）部署 Claude M365 加载项的管理工具
- 运行形态：Claude Cowork 插件市场 / Claude Code 插件（`claude plugin install ...`）/ Claude Managed Agents（`POST /v1/agents`，`callable_agents` 为预览能力）。
- 关键机制：**Skills**（领域方法学，自动触发）+ **Commands**（`/comps`、`/dcf`、`/earnings` 等显式动作）+ **Connectors（MCP servers）**。
- 垂直插件：`financial-analysis`（核心：comps/DCF/LBO/三表、Excel/deck QC、含全部 11 个连接器）、`investment-banking`、`equity-research`、`private-equity`、`fund-admin`、`operations`、`claude-for-financial-advisors`。
- 命名智能体：Pitch Agent、Meeting Prep、Market Researcher、Earnings Reviewer、Model Builder、Valuation Reviewer、GL Reconciler、Month-End Closer、Statement Auditor、KYC Screener。

## ④ 数据面（数据源/覆盖市场/A股适用性）
- 数据连接器（MCP，抓取自 `.mcp.json`）：**Daloopa、Morningstar、S&P Global(Kensho)、FactSet、Moody's、MT Newswires、Aiera、LSEG、PitchBook、Chronograph、Egnyte、Box**——几乎全是**西方/全球机构数据商，多需订阅或 API key**。
- 覆盖市场：**美股/全球发达市场**的投行、股票研究、PE、基金行政、财富管理流程。
- **A 股适用性：低**。无中国数据源（无 Wind/东财/巨潮/tushare/akshare），无 A 股工作流模板；数据连接器在中国大陆可用性与合规性均成问题。
- 另需 Microsoft 365 add-in 工具链，面向企业 IT。

## ⑤ 核心能力清单
- 投资研究/建模：`/comps`、`/dcf`、`/lbo`、`/3-statement-model`、`/debug-model`（Excel 模型审计：公式追踪、硬编码检测、勾稽检查）。
- 投行：CIM、teaser、buyer list、merger model、process letter、deal tracker、pitch deck。
- 股票研究：`/earnings`、`/earnings-preview`、`/initiate`、`/model-update`、`/morning-note`、`/sector`、`/thesis`、`/catalysts`、`/screen`。
- 私募：`/source`、`/screen-deal`、`/dd-checklist`、`/unit-economics`、`/returns`、`/ic-memo`、`/portfolio`、`/value-creation`。
- 基金行政/运营：GL 对账、break 追踪、accruals、roll-forward、NAV tie-out、KYC 文档解析与规则引擎。
- 交付物生成：headless 产出 `.pptx` / `.xlsx`；PPT 模板学习（`/ppt-template`）。
- 合规护栏：所有输出均为"草稿、待人工签署"，不自动执行交易/记账/绑定风险。

## ⑥ 与"A股投研 + 万丰CIO APP + 玄龙堂周易量化"契合度：**2 / 5**
理由：
- ➕ 作为 Anthropic 官方方案，其 **agent + skill + MCP 连接器**的架构范式，对"万丰CIO APP"如何组织 AI 助手/工具、如何把内部数据以 MCP 暴露，有**最佳实践参考**价值；Apache-2.0 商用友好。
- ➖ **完全不面向 A 股**：数据连接器为西方付费商、无中文市场与本土数据源、工作流是投行/PE/资产管理而非 A 股散户投研；依赖 Claude 生态（Cowork/Managed Agents/Claude Code），与国内私有化部署与合规要求冲突；对"玄龙堂周易量化"零关联。
- 结论：**可借鉴架构，不宜直接落地 A 股场景**。

## ⑦ 集成难度与路径建议
难度：**中-高**。
路径：
1. 不作为运行时依赖，而是**参考其 skill/command/agent 的目录与描述规范**，为万丰 CIO APP 设计"投研技能库 + 命令 + 工具连接器（MCP）"分层。
2. 仿照 `managed-agent-cookbooks/` 与 `orchestrate.py` 的事件路由（`handoff_request`），设计多智能体编排。
3. 将 `.mcp.json` 的西方数据商**替换为 A 股数据源**（自建 MCP server 包装 akshare/tushare/东财/巨潮）。
4. 若确需 Claude，可通过 Bedrock/Vertex/内部网关路由（仓内含 M365 自有云部署工具），但国内合规与网络是硬约束；更现实是用国产模型复刻该范式。
5. 用 `scripts/check.py` 思路建立内部技能清单的一致性校验。

## ⑧ 风险
- 许可证：Apache-2.0，商用友好，需保留声明与 NOTICE。
- 维护：官方维护、迭代快；但 `callable_agents`/subagent 委派为**预览能力**，API 可能变动；内容为"参考模板"，需自行调优。
- 合规：README 明确输出**非投资/法律/税务/会计建议**，仅为待专业审阅的草稿；数据连接器多需订阅，A 股/中国区使用存在数据出境与合规问题。
- 生态锁定：强绑定 Claude 产品线（Cowork、Managed Agents API、Claude Code、M365 add-in），迁移成本高。
- 数据：MCP 连接器在中国大陆的可达性、授权与商密合规需单独评估。
