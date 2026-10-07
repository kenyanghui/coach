# 06 · easy-tdx（通达信数据接口）

> 抓取时间：2026-10-07（GitHub API + raw README 真实抓取）
>
> ⚠️ **未找到唯一“主仓库”**。GitHub 上存在多个同名/近名实现，且 README 徽章指向的 `handsomejustin/easy-tdx` 与 `handsomejustin/easy_tdx` **无法解析（已删除或改名，未确认）**。PyPI 包 `easy-tdx` 返回 **404**（`https://pypi.org/pypi/easy-tdx/json`），即当前未公开发布。以下按“最主流的同名实现”如实呈现。

## ① 一句话定位

**通达信（TDX）TCP 行情协议客户端**：Python SDK + CLI，支持 A 股、港股、美股、期货全市场，K 线/报价/分时/逐笔/板块/资金流/F10/财务/离线本地数据读取；默认 JSON 输出，天然适配 Claude Code、OpenClaw、Hermes 等 AI Agent 工具链，免费、无需注册、无需 API Key。

## ② Stars / 许可证 / 更新 / 活跃度（按同名实现分别列）

| 仓库 | Stars | Forks | 语言 | 许可证 | 创建 | 最近推送 | 提交数 | 说明 |
|---|---|---|---|---|---|---|---|---|
| **clong365/easy_tdx** | **65** | **379** | Python（GitHub 标记 null） | README 标 **MIT**（API license=NOASSERTION） | 2026-05-23 | 2026-05-22 | 35 | 纯数据客户端 v1.1.0，最主流（fork 数异常高，疑似事实上的上游） |
| yanwei99521/easy-tdx | 21 | 46 | Python | README 标 MIT（API=NOASSERTION） | 2026-08-31 | 2026-09-01 | **307** | 大幅增强版 v1.17.x：34 指标 + 缠论 + 回测 + Web UI，徽章指向已消失的 `handsomejustin` |
| N2XK/easy-tdx-plus | 18 | 13 | Python | README 标 MIT（API=NOASSERTION） | 2026-09-15 | 2026-10-01 | 151 | 基于 clong 血统的增强分支（包名 `easy-tdx-plus`，导入名/CLI 仍为 `easy_tdx`/`easy-tdx`） |

**活跃度：分化。** clong 版质量高但 2026-05 后基本停更；yanwei 版提交最多但创建晚、含大量扩展；N2XK 版最新。生态处于“多分支碎片化”状态。

## ③ 技术栈

- **共同血统**：Python，同步 + asyncio 双接口；`click` CLI；`pandas` DataFrame；mypy strict；pytest 离线 fixture 覆盖编解码；架构分层（commands 层无 IO、可独立单测）。致谢 `pytdx`（离线读取借鉴）、`xmtdx`（初始原型）、`mootdx`（工程化参考）。
- **协议**：通达信 TCP 行情协议。`MacClient`/`AsyncMacClient`（7709，A 股，MAC 协议，推荐）、`MacExClient`/`AsyncMacExClient`（7727，港股/美股/期货）、`TdxClient`/`AsyncTdxClient`（7709，标准协议）、`UnifiedTdxClient`（自动路由）。
- **yanwei 增强版**：FastAPI + Uvicorn + WebSocket REST 服务；Vue3 + ECharts 单页 Web UI；SQLite 策略库；34 个技术指标（基于 MyTT，含 MACD/KDJ/RSI/BOLL 等）、缠论分析（分型→笔→中枢→线段→买卖点→背驰）、内置回测引擎（18 个经典策略、多因子组合、参数网格寻优、S/A/B/C/D 数据评级）；可打包 Windows 单文件 EXE。

## ④ 数据面与 A 股适用性

- **行情**：K 线（1/5/15/30/60 分钟、日/周/月/季/年，支持 `Adjust.QFQ/HFQ` 前/后复权）、实时报价（A 股批量最多 80 只/次）、市场分类排序报价（A/SH/SZ/KCB/CYB）、分时（单日/多日）、逐笔成交（当日/历史）。
- **衍生数据**：板块（行业/概念/风格/地区）列表与成分、个股所属板块、资金流向（主力/小/中/大单）、集合竞价、市场异动、全市场涨跌统计、服务器交易时段、个股特征快照、F10 公司信息、历史资金流。
- **扩展市场**：港股主板/创业板、美股、郑商所/大商所/上期所/中金所期货。
- **离线数据**：无需网络，直接从本地通达信安装目录读取 `vipdoc` 的日线/分钟线/扩展市场日线/板块/股本变迁/历史财务；yanwei 版支持离线选股扫描与回写同步。
- **独立数据源**：巨潮资讯网（公告检索/PDF）、新浪财经（三表）。
- **A 股适用性：很高**。免费的 A 股全市场行情/资金/板块/财务/离线数据，是自建 A 股数据底座的高性价比方案；JSON CLI 直接对接 AI Agent。

## ⑤ 核心能力

- 统一客户端 + 同步/异步双接口；`from_best_host()` 自动选最低延迟服务器。
- 丰富 CLI（JSON/表格/CSV 三态）：`kline`、`quote`、`quote-list`、`tick`、`transaction`、`board-list`、`board-members`、`belong-board`、`capital-flow`、`auction`、`unusual`、`market-stat`、`f10`、`fund-flow`、`ex ...` 等。
- 离线读取模块 `easy_tdx.offline`（`detect_tdx_home`、`read_daily_bars`、`find_daily_bar_file`）。
- yanwei 版额外：技术指标、缠论、回测引擎与 Web UI、策略选股扫描（`screen`，读本地 `.day`）、强势股排名、REST/WebSocket 服务。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**4 / 5**

理由：
- **A 股投研**：直击“A 股原始数据 + 资金/板块/财务 + 离线回测”刚需，免费且覆盖广，可作为 Vibe-Research 等工具的底层行情/资金源。
- **Claude Code 技能生态**：CLI 默认 JSON、零注册零 key，非常适合包装成一个 Claude Code Skill（`easy-tdx` 命令直接喂给 Agent）。
- **扣分**：① **没有官方技能封装**，需要自己包 `SKILL.md`；② 通达信协议**非官方**，存在被服务端变更打破的风险；③ 生态碎片化、无唯一权威仓库、PyPI 包 404，长期维护不确定。

## ⑦ 集成难度 + 路径

**难度：低–中。**

1. 选定分支并本地安装（推荐以 `clong365/easy_tdx` 为基线，如需指标/回测/Web 选 `yanwei99521/easy-tdx` 或 `N2XK/easy-tdx-plus`）：`git clone` 后 `pip install -e ".[dev]"`；README 中的 `pip install easy-tdx` 目前**从 PyPI 不可得（404）**。
2. 连通性自检：`easy-tdx ping`；取数：`easy-tdx kline SZ 000001 --count 30 --table`。
3. 接入 Claude Code：自建一个 skill 目录，`SKILL.md` 里说明可用 CLI 子命令与 JSON 输出，让 Agent 通过 Bash 调 `easy-tdx ...`。
4. 离线模式：`easy-tdx` 直接读本地通达信 `vipdoc`（无需服务器），适合内网/无外网环境。
5. 若需服务化：yanwei 版 `easy-tdx serve` 起 REST API + 交互式文档。

## ⑧ 风险

- **协议风险**：通达信 TCP 协议非官方公开协议，服务端升级/封禁可能导致接口失效；需持续跟进社区修复。
- **碎片化/权威缺失**：同名仓库至少 3 个且互相 fork/衍生，README 指向的原作者仓库已不存在；选择与升级需自行评估。
- **发布与许可不清**：PyPI `easy-tdx` 404；GitHub API 对 LICENSE 返回 `NOASSERTION`（README 声称 MIT，需以仓库 LICENSE 文件为准）。
- **数据合规**：行情数据来自通达信服务器/公开网页，二次使用/分发/商用的授权**未确认**，仅建议研究用途。
- **质量参差**：增强分支（yanwei）功能多但体量大、改动激进；简单分支（clong）稳定但停更。使用前应跑其离线单元测试。
- **离线数据陈旧**：依赖本地通达信客户端下载的数据，盘后及时性取决于本地更新。
