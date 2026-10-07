# Sequoia-X（sngyai/Sequoia-X）调研报告

> 抓取时间：2026-10-07（GitHub API + raw README + commits 实时抓取）

## ① 一句话定位
面向 A 股的**轻量级自动选股系统 V2（The King Returns）**：收盘后自动跑多种技术形态策略，把选股结果推送到飞书群。

## ② Stars / 许可证 / 最近更新 / 活跃度
| 项 | 值 |
|---|---|
| Stars | **7,910** |
| Forks | 1,601 |
| Open issues | 43 |
| License | **无文件**（API `license = null`；`/license` 返回 404；根目录无 LICENSE；但 README 末尾自述 "MIT"） |
| 最近 push | **2026-07-10** |
| 最近 commit（抓取） | 2026-05-09 `fix(backfill): 增加重试和自动重连…` |
| 最近 API 更新 | 2026-10-07 |
| 创建时间 | 2018-07-20 |
| 语言/主题 | Python；a-shares, akshare, baostock, pandas, stock-screening, ta-lib, trading, turtle-trade |

活跃度：**中**。2018 年建仓，2026 年仍有提交（含海龟策略、定增公告监控等新功能），43 个 open issues，社区较活跃但非高频迭代。

## ③ 技术栈与架构
- 语言：Python **≥3.10**；包管理推荐 **uv**（`uv sync`），也有 `pyproject.toml`（含 ruff/pytest 配置）+ `uv.lock`。
- 设计原则：**OOP 架构、向量化计算、增量数据更新**（README 自述"基于现代 Python 工程化标准从零重构"）。
- 目录（抓取自 `/contents/sequoia_x` 与 README）：
  - `main.py`：入口，argparse 分发"日常 / 回填"两模式
  - `sequoia_x/core/`：`config.py`（Pydantic-settings）、`logger.py`（rich 结构化日志）
  - `sequoia_x/data/engine.py`：数据引擎（baostock 回填 + 增量同步 + SQLite）
  - `sequoia_x/strategy/`：`base.py` 抽象基类 + 各策略
  - `sequoia_x/notify/feishu.py`：飞书 Webhook 推送
  - `tests/`：属性测试（hypothesis）

## ④ 数据面（数据源/覆盖市场/A股适用性）
- 数据源：**[baostock](http://baostock.com)**（免费、无需注册、无限流）+ 东方财富（规避反爬）+ akshare/baostock 主题标签；飞书推送股票名称也经 baostock 查询（见 commit）。
- 复权：**后复权（hfq）**——历史价格不变，适合增量存储，避免除权导致数据错乱。
- 存储：本地 **SQLite**（`data/sequoia_v2.db`），可直接拷贝迁移。
- 覆盖市场：**A 股全市场约 5,200 只**；回填约 12 分钟，日常 8 进程并行增量 2–3 分钟。
- **A 股适用性：很高**，完全为 A 股打造。
- 说明：仓库主题栏同时含 akshare，但 README 明确主数据源为 baostock（"彻底规避东方财富反爬问题"）。

## ⑤ 核心能力清单
- 两种运行模式：日常（8 进程增量补数 + 跑策略 + 飞书推送，2–3 分钟）与回填（全市场历史 K 线，约 12 分钟）。
- 内置策略：
  | 策略 | 说明 |
  |---|---|
  | TurtleTrade | 海龟突破：20 日新高 + 成交额过亿 + 阳线防诱多，按涨幅排序 |
  | MaVolume | 均线 + 放量突破 |
  | HighTightFlag | 高而窄的旗形整理突破 |
  | LimitUpShakeout | 涨停洗盘回踩确认 |
  | UptrendLimitDown | 上升趋势中的跌停反包 |
  | RpsBreakout | 欧奈尔 RPS 相对强度突破 |
  （commit 显示后续还增加了"定增公告监控策略"、海龟按流通市值排序等）
- 飞书群推送；建议 crontab 每交易日收盘后自动执行。
- 本地 SQLite + 增量更新，部署极简。

## ⑥ 与"A股投研 + 万丰CIO APP + 玄龙堂周易量化"契合度：**4 / 5**
理由：
- ➕ **纯 A 股、开箱即用、极轻量**；技术形态选股 + 自动推送，能直接服务"A 股投研"的日常选股与盘后复盘；SQLite + baostock 让集成几乎零成本。
- ➕ 可作为"万丰CIO APP"的信号源/策略模块，或作为玄龙堂周易量化的**技术面基线/信号叠加**对照。
- ➖ 功能相对单一（选股/推送，无组合优化、无实盘下单、无 AI 投研、基本面弱）；策略偏经典技术形态；无正式 LICENSE 文件是企业采用的合规障碍。
- 结论：作为"轻量 A 股选股引擎"契合度高；作为完整投研/CIO 平台则需大量扩展。

## ⑦ 集成难度与路径建议
难度：**低**。
路径：
1. `uv sync` → `python main.py --backfill` 回填历史 → `python main.py` 跑日常；可先用 SQLite 数据在本地验证。
2. 抽取 `sequoia_x/data/engine.py` 作为万丰 CIO APP 的 A 股日 K 数据层（baostock + SQLite）。
3. 以 `strategy/base.py` 为接口新增自定义策略，把"周易量化"信号作为选股/择时规则挂入。
4. 将 `notify/feishu.py` 换成 APP 推送/API 回调。
5. 建议加基本面/财务数据与组合管理以补足纯技术面短板。

## ⑧ 风险
- 许可证：**仓库无 LICENSE 文件**，尽管 README 自称 MIT，法律上默认保留所有权利，**企业商用前务必与作者确认或取得授权**（与 QUANTAXIS 等有正规 LICENSE 的项目不同）。
- 维护：个人主导（sngyai），更新频率中等（最近 commit 2026-05），长期可用性依赖单人。
- 数据：baostock 免费且稳定但功能有限（无实时、无 Tick）；免费源存在断流/变更风险（commit 已见"长连接超时重试"修复）。
- 合规：技术形态选股不构成投资建议；用于对外荐股/资管需投顾合规；无回测统计说明，策略有效性未经独立验证。
- 工程：默认单机 SQLite，多用户/高并发需改造。
