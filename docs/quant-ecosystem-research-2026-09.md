# 开源量化工具生态调研报告

> 2026-09-24 · 基于 GitHub 星标排名与 coach 站点现有 51 页 quant 内容的差集分析
> 用途：扩大训练营研究与交付范围；为客户「个人量化投资系统」选型提供依据

## 一、现有覆盖矩阵（content/quant/ 51 页）

| 类别 | 已覆盖 | 深度 |
|---|---|---|
| AI 量化平台 | qlib (47.4k)、finrl、finrobot、dojoagents、tradingagents-cn | 深（含课程） |
| 回测框架 | backtrader (22.8k)、zipline、vectorbt、wondertrader、simtradelab | 中 |
| 交易框架 | vnpy (44.4k)、freqtrade (53.3k)、ccxt、easyxt/QMT、ptrade | 深（含实盘三阶段） |
| 数据平台 | openbb (71.8k)、bigquant、joinquant、ricequant、myquant、mindgo | 中 |
| 因子分析 | alphalens (4.4k) | 浅（单页） |
| A股数据 | tdx 系列（通达信知识/对比/精英版）、pandata | 中 |
| 国内券商通道 | qmt、ptrade、easyxt | 深 |

## 二、高星差集：值得新增覆盖的项目

### 优先级 P0（星标 >10k 且与训练营定位强相关）

| 项目 | 星标 | 价值 | 建议动作 |
|---|---|---|---|
| QuantConnect/Lean | 21.8k | C#/Python 多资产回测引擎，业界标准之一，与 backtrader/zipline 形成完整光谱 | 新增工具页 + 对比课 |
| HKUDS/Vibe-Trading | 34k | 「个人交易 Agent」新范式，港大出品，AI Agent 交易方向最热项目 | 新增工具页（蹭 AI Agent 趋势） |
| wilsonfreitas/awesome-quant | 29.7k | 量化资源总目录，可做「资源中心」内容源 | 引用进 education.html |
| paperswithbacktest/awesome-systematic-trading | 14.4k | 系统化交易资源（论文+库+策略） | 同上 |
| je-suis-tm/quant-trading | 10.8k | 实战策略集（VIX/HMM/配对等），适合做策略案例课 | 拆解为策略系列内容 |
| StockSharp/StockSharp | 10.8k | .NET 生态最完整的交易所接入框架 | 低优先，提及即可 |
| abu (bbfamily) | 18.7k | 中文量化全栈（股票/期权/期货/比特币/机器学习），非凸出品，中文文档全 | 新增工具页（中文受众友好） |

### 优先级 P1（1k–10k，填补能力空白）

| 项目 | 星标 | 填补空白 |
|---|---|---|
| PyPortfolioOpt | 6.1k | **组合优化**（现站点完全没有：均值方差/BL/风险平价） |
| Riskfolio-Lib | 4.5k | 组合优化+风险度量，与上互补 |
| skfolio | 2.4k | scikit-learn 风格组合优化，ML 结合 |
| czsc (waditu) | 6.3k | **缠论技术分析**（A股散户认知度极高，引流利器） |
| akshare | ~10k | **免费A股全数据源**（现站点数据源偏商业平台） |
| tushare | 15.4k | A股数据事实标准之一，需补工具页 |
| Ashare (mpquant) | 3.9k | 最简 A股实时行情接口，小白友好 |
| backtesting.py | 9.0k | 轻量回测（vectorbt 之外的单标的轻方案） |
| jesse-ai | 8.6k | 加密交易 bot（freqtrade 之外的简洁选择） |
| Lean 之外的 Hummingbot | 8k+ | 做市策略（现站点空白方向） |

### 优先级 P2（生态补全）

- ta (bukosabino/ta) 5.2k — 技术指标库，配合 alphalens 做因子课
- RustQuant 1.8k — Rust 量化（前沿方向，研究向内容）
- FinHackCN/finhack 1.2k — 国产轻量量化框架
- charliedream1/ai_quant_trade 6.6k — 中文 AI 量化教程资源（内容竞争者兼参考）
- TradingAgents-CN 复刻与 MCP 化项目（akshare-one-mcp 230★、FinanceMCP 860★）— AI+A股 MCP 方向正在起量

## 三、结构性空白（比缺工具页更要紧）

1. **组合构建与风控层完全缺失** — 现有内容从「回测」直接跳到「实盘」，没有仓位管理/组合优化/风险预算。个人投资者最需要的恰是这层。建议新增「组合与风控」板块：PyPortfolioOpt + Riskfolio-Lib + 风险平价实战课。
2. **免费数据源路线弱** — akshare/tushare/Ashare 是个人用户零成本起步的关键，比 BigQuant/JoinQuant 平台路线更适合训练营「建立自己的系统」主张。
3. **AI Agent × A股的 MCP 化浪潮** — FinanceMCP、akshare-one-mcp 等正在起量，与 dojoagents/tradingagents-cn 课程可形成「课程+工具」闭环，建议占位。
4. **缠论/czsc 引流** — 中文散户流量入口，可作为行为诊断页之外的第二个引流钩子。

## 四、深挖已有开源项目的建议（帮客户建个人系统）

从「工具目录页」升级为「个人系统搭建路线图」：

1. **分层重构导航**：数据层（akshare/tushare/openbb）→ 研究层（qlib/alphalens/vectorbt）→ 组合层（PyPortfolioOpt/Riskfolio）→ 执行层（vnpy/QMT/easyxt）→ 监控层（自建 dashboard）。现有工具页按此归位。
2. **每工具页加「何时选我」决策卡**：一句话场景 + 替代品对比 + 迁移成本。现有页面偏介绍，缺选型视角。
3. **做 2–3 条端到端参考线路**（教程串联，而非孤立工具页）：
   - 线路 A 零成本入门：Ashare/akshare + backtesting.py + Jupyter
   - 线路 B A股实战：tushare + qlib(Alpha158) + PyPortfolioOpt + QMT 实盘
   - 线路 C AI Agent：akshare-one-mcp + TradingAgents-CN + 风控模块
4. **以「交付物」组织课程**：每条线路终点是一个客户可运行的 repo 模板（数据脚本+回测+组合+实盘开关），训练营交付物从「知识」变「系统」。

## 五、工作流沉淀（本次调研的方法论）

本次调研流程已固化为项目技能 `.agents/skills/quant-research/SKILL.md`（搜索词表 + 差集分析 + 星标阈值 + 落盘规范），下次执行「找新工具/扩大范围」类需求时直接走该技能。
