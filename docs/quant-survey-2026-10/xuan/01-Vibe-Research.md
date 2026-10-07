# 01 · simonlin1212/Vibe-Research

> 抓取时间：2026-10-07（数据来自 GitHub API + raw README，均为真实抓取）

## ① 一句话定位

面向个人投资者的**本地 AI 投研工作台 / 金融研究 Agent**：A 股 / 美股 / 港股，由用户自己的 AI（Codex 订阅 / Claude Code / WorkBuddy-CodeBuddy 或自有模型 API）驱动，涵盖每日复盘、资讯雷达、产业信号、板块中心、个股六阶段研究、多空辩论、回测、自选股与持仓台账、研报库与研究记录；运行时基于开源的 Codex Harness。

## ② Stars / 许可证 / 更新 / 活跃度

| 指标 | 值 |
|---|---|
| Stars | **2631** |
| Forks | 539 |
| Watchers | 2631 |
| Open issues | 2 |
| 许可证 | **MIT**（仓库代码；OpenAI Codex 走 Apache-2.0，仓库不含 Codex 源码） |
| 语言 | TypeScript（前端/编排），Python（数据、计算、回测） |
| 创建 | 2026-07-05 |
| 最近推送 | **2026-10-07**（非常活跃） |
| 提交数 | 154（默认分支 main） |
| Release | v1.2.0（2026-09-09）、v1.1.0、v1.0.4；v1.1.0 的 Mac DMG 已于 2026-09-10 撤下 |
| 官网 | https://viberesearch.wiki |

## ③ 技术栈

- **UI**：React + Vite 本地浏览器工作台，默认 `http://127.0.0.1:5930`，本机 API 只绑定 `127.0.0.1`。
- **编排层**：Node/TypeScript `orchestrator/`（Agent 编排、validator、受控 MCP、API、资料库、报告归档）。
- **数据/计算/回测**：Python（`datasources/`、`calc/`、`backtest/`、`.agents/skills/data-access/scripts`）。
- **Agent 运行时**：Codex Harness（随依赖安装，开发分支锁定 0.153.4）/ Claude Code CLI / CodeBuddy Code CLI；用户不需要全局装 Codex。
- **环境要求**：Node ≥ 22.18（推荐 24 LTS，需启用 TS strip/transform）、Python ≥ 3.11（推荐 3.12）、Git；Windows/macOS/Linux 原生。

## ④ 数据面与 A 股适用性

- **端点注册表**：`datasources/registry.json` 实际抓取 **117 个端点 / 版本 1.0.0 / 38 个 source 字符串**，README 表述为“117 个端点、30 层”，`.agents/skills/README.md` 则写“115 端点 / 29 层”**（仓库内部存在口径不一致）**。
  - ⚠️ **任务清单里写的“47 端点工具箱”与实际不符**：当前仓库为 117 端点级别（应为早期版本口径），已按真实抓取更新。
- **数据类别**：行情、K 线、财务、一致预期、公告、研报、资金、筹码、期权、SEC/FINRA/CBOE、新闻、宏观、产业温度计、招聘、管制与数据日历。
- **source 模块**（真实文件）示例：`tencent`、`baostock_src`、`eastmoney`、`sina`、`ths`、`iwencai`、`cninfo`、`cls`、`sw`、`exchange`、`sec`、`finra`、`cboe`、`yahoo`、`exa`、`rss`、`macro`、`hiring` 等。
- **市场覆盖**：CN / US / HK 均支持自选股、持仓、资料归档与对话；**六阶段个股研究目前只支持 A 股**（港美不启动无完整数据链的空研究）。
- **A 股适用性：高**。数据以国内公开源为主，个股研究的 SOP 与证据链针对 A 股设计。

## ⑤ 核心能力

- 13 个一级栏目：每日复盘 / 资讯雷达 / 产业信号 / 板块中心 / 个股研究 / 多空辩论 / 回测 / 自选股 / 我的持仓 / 我的研报 / 研究记录 / 接入 AI / 首页。
- **个股六阶段研究 SOP**：公司画像 → 财务 → 盈利预期 → 估值 → 风险 → 报告；每阶段独立会话，只能调用受控 MCP。
- **可追溯证据链**：产出 `report.md`、`evidence.json`（来源+资料期+原文引用）、`calculations.json`（计算 DAG）、`conflicts.json`（跨来源冲突）、`manifest.json`、`viewer.html`；引用格式 `[资料:<id> p.<页码>]`，机器校验漏引/错引。
- **三级约束**：提示层（AGENTS.md + `.agents/skills/`）＋ 执行层（sandbox/hooks/受控 MCP）＋ 编排层（orchestrator+validator+calc+gate）。
- 内置金融 SOP skills：`data-access`、`company-research`、`valuation`、`earnings-analysis`、`industry-chain`、`catalyst-risk`（真实 `SKILL.md` 路径为 `.agents/skills/<name>/SKILL.md`）。
- 确定性回测引擎；本机隐私优先（研报本机保存，API key 存浏览器 localStorage）。
- 明确的合规边界：只产出研究框架/情景概率/裁决点，**不提供建仓、加减仓、目标价、止损位**。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**5 / 5**

理由：
- **A 股投研**：最完整的一站式本地投研工作台，个股研究、估值、财报拆解、产业链、催化剂/风险 SOP 直接对口投研团队；证据链与冲突记录符合合规/可复核要求。
- **万丰 CIO**：本地部署、数据不外传、报告归档、持仓台账、六阶段研究，适合 CIO 层做深研与留痕。
- **Claude Code 技能生态**：原生支持把 **Claude Code 当作 Agent 引擎**（README 明确“Claude 订阅 → Claude Code Agent，可运行完整 A 股六阶段研究”），`.agents/skills/` 为 SKILL.md 格式，天然融入 Claude Code/Codex 技能体系；亦可作为技能/数据后端被外部调用。
- 唯一扣分项：项目整体较重（Node+Python+Agent 引擎），是“工作台”而非“纯技能包”。

## ⑦ 集成难度 + 路径

**难度：中**（一次性环境 + 运行时接入）。

1. `git clone https://github.com/simonlin1212/Vibe-Research.git vibe-research-agent`
2. macOS/Linux：`scripts/setup` → `scripts/start`；Windows：`scripts\setup-windows.cmd` → `scripts\start.cmd`（自动创建 `.venv`、装依赖、体检、起本地 API + UI）。
3. 接入 AI：用已登录的 Claude Code 订阅直接接入（设置页自动检测，无需填 key），或填自有模型 API（OpenAI/DeepSeek/Qwen/GLM/Kimi/MiMo 模板）。
4. 若做外部编排：调用 `orchestrator/src/run.ts --symbol ... --market SZ`，退出码 0/2/3；研究产物落 `.local/runs/<run-id>/`。
5. 局域网共享可选：`VRA_LAN=1 bash scripts/start`（仅受信任局域网，明文 HTTP，不建议公网）。

## ⑧ 风险

- **数据合规**：`registry` 自述 `compliance: cn-public` 为“仅限研究，许可待审”；第三方公开接口可能随时改动或限流。
- **可用性**：端点“登记在册”不保证第三方服务可用；六阶段研究耗时可能数十分钟以上，不承诺固定时长。
- **模型依赖**：研究质量强依赖所选模型与 Agent 引擎；MiMo 仅完成端到端验证，其他第三方模型未跑兼容矩阵。
- **隐私**：开启 Agent 后公开网页读取可能经第三方 Jina Reader 转发；浏览器 localStorage 中的 API key 不加密，共享电脑需清理。
- **平台**：Mac 客户端暂撤、只提供源码+本地浏览器 UI；Windows 11 原生支持未实机验收，Windows 10 仅尽力兼容。
- **仓库内口径不一致**（117 vs 115 端点、30 vs 29 层），规模化使用前应以 `registry.json` 为准核对。
