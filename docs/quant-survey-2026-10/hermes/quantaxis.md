# QUANTAXIS（原 QUANTAXIS/QUANTAXIS，现 yutiansut/QUANTAXIS）调研报告

> 抓取时间：2026-10-07（GitHub API + raw README 实时抓取）
> 注意：`github.com/QUANTAXIS/QUANTAXIS` 现返回 **301 重定向**到 `github.com/yutiansut/QUANTAXIS`，实际活跃仓库为后者。

## ① 一句话定位
中国本土的**纯本地股票/期货/期权一体化量化框架**：覆盖数据采集、因子、回测、模拟、实盘、多账户、可视化、任务调度与分布式部署（QUANTAXIS 2.1.0）。

## ② Stars / 许可证 / 最近更新 / 活跃度
| 项 | 值 |
|---|---|
| Stars | **11,257** |
| Forks | 3,478 |
| Open issues | 240 |
| License | **MIT** |
| 最近 push | **2026-09-18** |
| 最近 API 更新 | 2026-10-07 |
| 创建时间 | 2016-03-29 |
| 语言/主题 | Python；quant |
| 官网 | https://yutiansut.github.io/QUANTAXIS/ |
| archived | 否 |

活跃度：**中高但长期项目**。README 显示 v2.1.0-alpha2（更新日期标注 2025-10-25），2026-09 仍有提交；仓库根目录含 `Cargo.toml/Cargo.lock`（Rust 集成）、`qapro-rs`（Rust 版）、庞大 `doc/`、`qabook/`、QQ 群/Discord/论坛等活跃社区。但 240 个 open issues 说明历史包袱与维护压力较大。

## ③ 技术栈与架构
- 语言：Python **3.9–3.12**（推荐 3.11+）；核心用 pandas/numpy/scipy/matplotlib；新增 **Rust（PyO3/Polars/Arrow）** 加速层。
- 存储：**MongoDB**（默认）+ **ClickHouse**（可选）；缓存/队列用 Redis、RabbitMQ(pika)。
- Web/服务：Tornado、Flask；消息队列 QAPubSub。
- 核心模块（抓取自 `/contents/QUANTAXIS`）：
  - `QAFetch/QASU`：多市场数据获取与存储（tushare、pytdx 等，支持 Tick/L2 Order/Transaction）
  - `QAData`：多标的多市场内存数据库；`QADataBridge`：基于 QADataSwap 的零拷贝（Pandas↔Polars↔Arrow）与共享内存
  - `QARSBridge`：QARS2 Rust 核心桥接（高性能 QIFI 账户、Rust 回测引擎，宣称账户操作 100x、回测 10x、内存 -90%，未装自动回退 Python）
  - `QAAnalysis/QAFactor/QAIndicator`：分析、因子研究入库、自定义指标与因子表达式
  - `QAMarket/QIFI`：统一账户协议（qifiaccount/qifimanager/qaposition/marketpreset），跨 Python/Rust/C++ 一致，支持增量 Diff
  - `QAStrategy`：CTA/套利回测套件；`QAEngine`：异步/分布式计算；`QASchedule`：任务调度；`QAWebServer`：REST 微服务
- 交付：本地部署（含 docker/ 目录），支持 CTP（期货/期权）、QMT（股票）实盘对接、母子账户 OMS、OrderGateway 风控。

## ④ 数据面（数据源/覆盖市场/A股适用性）
- 市场：**A 股、期货、期权**（本土市场为核心），支持 Tick / L2 / 逐笔。
- 数据源：tushare、pytdx 等（README 技术栈致谢中列出）；支持 MongoDB / ClickHouse 存储、自动运维与数据更新。
- **A 股适用性：高**。这是其主战场：股票/期货/期权账户体系、QMT/CTP 实盘、本土数据源、A 股交易时间与市场预制（tick 大小/保证金/手续费）均内置。
- 注意：数据获取依赖第三方源（tushare 部分接口需积分/付费、pytdx 依赖通达信服务器稳定性），需自行保障数据质量与授权。

## ⑤ 核心能力清单
- 多市场统一数据层（Tick/L2/逐笔）+ 因子化数据结构。
- 回测（CTA/套利）、模拟盘、实盘（CTP/QMT）一体化。
- QIFI 统一账户协议：多市场、多语言、多账户、增量更新。
- 因子研究（单因子入库/测试/合并）、自定义指标批量全市场 apply。
- 任务调度、RabbitMQ 消息分发、分布式计算 agent、Tornado REST 微服务。
- Rust 加速桥接与零拷贝数据交换（可回退）。
- 丰富文档（doc/ 中心、PDF QABook、示例 examples/）。

## ⑥ 与"A股投研 + 万丰CIO APP + 玄龙堂周易量化"契合度：**4 / 5**
理由：
- ➕ **A 股原生**，数据/账户/回测/实盘全链路齐全，MIT 许可商用友好；对 A 股投研与"万丰CIO APP"（需要数据、回测、组合与实盘能力）是最完整的一站式候选。
- ➕ 因子/指标框架可承载"玄龙堂周易量化"的另类择时/命理因子（作为自定义因子或指标接入）。
- ➖ 架构**偏重**（MongoDB + ClickHouse + RabbitMQ + Rust 桥接 + 复杂账户体系），学习曲线陡、部署运维成本高；对只想"轻量选股/AI 投研"的场景偏重；240 open issues 与 alpha 版本需评估稳定性。
- 结论：契合度高，但属于"重型基础设施"，适合做底层平台而非快速原型。

## ⑦ 集成难度与路径建议
难度：**中-高**。
路径：
1. 先只取 `QAFetch/QAData` 做 A 股数据层（MongoDB 或 ClickHouse），最小化依赖跑通。
2. 用 `QAStrategy` + `QAIndicator/QAFactor` 搭回测与因子研究；把"周易量化"信号封装成自定义指标/因子。
3. 若需性能与实盘，再引入 `QARSBridge`（Rust）与 CTP/QMT 对接。
4. 对万丰 CIO APP：通过 `QAWebServer`（Tornado REST）或自建 API 暴露数据/回测/持仓，前端对接。
5. 建议锁定 v2.1.x、用 Docker 部署、只启用所需模块，避免全量依赖。

## ⑧ 风险
- 许可证：MIT，商用宽松，保留版权声明即可。
- 维护：项目 10 年、维护者高度集中（yutiansut），issue 积压多；存在从旧版（QAARP 等）迁移的兼容性断层；`QUANTAXIS/QUANTAXIS`→`yutiansut/QUANTAXIS` 的组织迁移需注意引用地址。
- 技术：Rust 桥接为 alpha、自动回退；ClickHouse/MongoDB/RabbitMQ 多组件使部署与排障复杂；Python 3.9–3.12 限制、依赖较重。
- 数据/合规：数据源（tushare/pytdx）授权与稳定性自担；实盘对接涉及券商/期货接口资质与合规，需符合交易所与投顾规定。
- 文档：部分模块标注"开发中"（如期权、优化器），不可尽信宣传的性能数字（需自测）。
