# financial-machine-learning（firmai/financial-machine-learning）调研报告

> 抓取时间：2026-10-07（GitHub API + raw README 实时抓取）

## ① 一句话定位
一份由 Sov.ai 维护、**按主题分类且每日自动更新状态的"金融机器学习工具/项目精选清单"（awesome list）**，本身不是可运行框架。

## ② Stars / 许可证 / 最近更新 / 活跃度
| 项 | 值 |
|---|---|
| Stars | **8,807** |
| Forks | 1,409 |
| Open issues | 15 |
| License | **无**（API `license = null`，`/license` 返回 404，仓库根目录**无 LICENSE 文件**） |
| 最近 push | **2025-01-03** |
| 最近 API 更新 | 2026-10-07（仓库元数据更新，非代码提交） |
| 创建时间 | 2019-03-21 |
| 语言/主题 | Python；algorithmic-trading, cryptocurrency, finance, investment, quant, quantitative-finance, stock-market, trading-strategies |
| 官网 | https://www.sov.ai/ |

活跃度：**维护偏停滞**。代码层面最后 push 为 2025-01-03；但 README 声称链接状态"每日更新"，仓库含 GitHub Actions（`repo_status.yml`、`wiki_gen.yml`、`repo_search.yml`）自动抓取各收录项目的信息并生成 wiki。

## ③ 技术栈与架构
- 本质是**文档/链接聚合仓**：`README.md` + `generated_wiki/`（自动生成 wiki）+ `raw_data/`。
- 自动化脚本：`git_search.py`、`git_status.py`、`git_util.py`、`wiki_gen.py`（抓取被收录 repo 的 star/最近提交等，回填 README 表格与 wiki）。
- README 用 `<!-- PLACEHOLDER_START/END -->` 标记区块，每个主题只展示评分最高的约 15 个项目，完整列表在 wiki。
- 内容分类：Trading、Portfolio Management、Data Processing、Deep Learning & RL、Other Models 等。
- 收录的代表性项目（README 表格抓取到）：FinRL-Library(9,697★)、PyPortfolioOpt(4,425★)、Riskfolio-Lib(2,985★)、mlfinlab(3,933★)、cvxportfolio、DeepDow、AlphaPy 等；并列出 created_at / last_commit / star_count / repo_status / rating。

## ④ 数据面（数据源/覆盖市场/A股适用性）
- 本身**不提供任何数据**，只做索引；被收录项目的覆盖范围全球、以美股/加密为多。
- A 股适用性：**间接、低**。清单中含少数中国市场相关项目（如 rqalpha 被提及为数据/回测来源），但没有 A 股专门板块，也无 tushare/akshare/baostock 系统梳理。
- 商业背景：由 Sov.ai（ML-Quant.com）运营，页面含招聘/商业推广内容。

## ⑤ 核心能力清单
- 按主题检索"金融 ML"开源项目与论文/课程/书籍资源。
- 自动更新每个收录项目的 star 数、最近提交时间、活跃状态与星级评分。
- 生成wiki 全量列表（README 仅 Top 15）。
- 提供研究选题方向参考（预测建模、卫星/另类数据、缺失值填补等）与 Sov.ai 研究合作入口。

## ⑥ 与"A股投研 + 万丰CIO APP + 玄龙堂周易量化"契合度：**2 / 5**
理由：
- ➕ 可作为**选型雷达**：快速找到金融 ML / 组合优化 / 另类数据方向的成熟库（如 PyPortfolioOpt、Riskfolio-Lib、mlfinlab），间接服务投研与 CIO 组合管理。
- ➖ 不是代码框架，无法直接集成；内容偏西方市场，A 股本土生态（数据源、因子库、合规交易接口）覆盖薄；对"周易量化"无关联。
- 定位：参考资料，不是技术组件。

## ⑦ 集成难度与路径建议
难度：**低**（若仅作参考清单）；若想复用其自动更新脚本另说，为**低-中**。
路径：
1. 把 README/wiki 作为团队选型知识库，筛出可落地的库（组合优化、因子、回测）。
2. 若需要"项目状态自动巡检"，可借鉴/复用其 `git_*` 与 `wiki_gen` 脚本做内部 awesome 清单。
3. 不建议把本仓当作任何生产依赖。

## ⑧ 风险
- 许可证：**无 LICENSE 文件**，默认"保留所有权利"，直接复制其文案/生成物存在版权风险（其内容主体是外部链接，通常引用尚可，但需谨慎）。
- 维护：代码最后更新 2025-01，原作者精力在商业产品 Sov.ai，自动化依赖 GitHub Actions 与外部 API，可能失效。
- 合规：清单中不少项目已停止维护或转商业订阅（如 mlfinlab），采用前须逐一核实其许可证与维护状态；含 Sov.ai 推广内容，注意利益相关。
- 时效：收录项目的 star/评分由脚本抓取，可能滞后。
