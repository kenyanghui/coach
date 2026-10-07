# 03 · quantskills/quantskills（QuantSkills 全景目录）

> 抓取时间：2026-10-07（GitHub API + raw README + catalog.json，真实抓取）
>
> ⚠️ **重要更正**：任务清单把该仓库标注为“个股体检”。**实际 `quantskills/quantskills` 是 QuantSkills 组织的“全景导航目录”**，本身不是个股体检工具。真正的“A 股个股体检”技能是 `quantskills/skill-a-share-stock-dossier`（见文末附节，一并调研以避免歧义）。

## ① 一句话定位

可发现、可安装、可验证、可分享的**量化 Skill 与 Agent 社区目录**：由 PandaAI 发起的开源量化社区，汇集数据、因子研究、回测验证、风险监控到交易自动化的能力资产，供人与 AI Agent 发现/安装/组合。截至抓取快照共 **214 项资产、10 个分类、1 个已发布端点**（快照 2026-10-07）。

## ② Stars / 许可证 / 更新 / 活跃度

| 指标 | 值 |
|---|---|
| Stars | **2424** |
| Forks | 142 |
| Open issues | 0 |
| 许可证 | **无 LICENSE / 无声明**（GitHub API license = none；README 称“目录内容以各资产仓库许可证为准”） |
| 语言 | JavaScript（Node 脚本 + 静态站点） |
| 创建 | 2026-06-25 |
| 最近推送 | **2026-10-07**（非常活跃，有 `daily-build.yml` 每日构建） |
| 提交数 | 192 |
| 站点 | https://www.quantskills.ai/ 、 https://quantskills.github.io/quantskills/ |

**活跃度：高**（组织级自动化维护，目录每日快照）。

## ③ 技术栈

- 仓库为**目录/导航工程**：`scripts/*.mjs`（`build.mjs`、`catalog-model.mjs`、`render-readme.mjs`、`render-site-data.mjs`、`snapshot-contract.mjs`、`verify-build.mjs`）生成 README 与站点数据。
- `site/` 静态站点（`index.html`、`app.mjs`、`styles.css`）＋ GitHub Pages 部署；`data/curation.json`、`site/catalog.json`（抓取约 529 KB）为目录数据。
- GitHub Actions：`daily-build.yml`（每日更新目录快照）、`deploy-pages.yml`。
- 生态入口：`quantskills/registry`（元数据注册表）、`skill-template`、`agent-template`、`join`（社区规则）。

## ④ 数据面与 A 股适用性

- **本仓库自身不含行情数据**——它是元数据目录（资产名、双语摘要、主阶段、输入/输出、接口状态、截图）。
- 目录覆盖的资产面向 **A 股、港股/美股、ETF/基金/指数、期货/商品、期权/可转债、宏观**，其中大量 A 股资产（如 `skill-a-share-stock-dossier`、`skill-a-share-pit-fundamental-vintage-builder`、`skill-a1-lhb-tracking`、`skill-b7-lhb-monitor`、`skill-a-share-market-risk-radar` 等）。
- **A 股适用性：取决于所选资产**。目录本身是“选型地图”，A 股相关资产丰富；但绝大多数标注“待维护者审核 / 无公开端点”，**质量与可用性未经统一验证**。

## ⑤ 核心能力（作为目录）

- 10 大分类：数据接口/仓库、因子研发（44）、市场与标的分析（44）、风险监控（22）、策略回测与交易（25）、投研模型与研究复现（30）、研究验证与质量（12）、资讯搜索与知识分析（10）、量化智能体与自动化（14）、基础设施与模板（6）。
- 工作流地图：数据基础 → 研究信号 → 组合验证 → 监控交易 → 编排。
- 每个资产提供稳定 ID、分类、双语摘要、主阶段、接口状态与截图；社区通过 registry/PR 提交与改进。
- 相关重点条目：`skill-market-daily-review`（53★，另一个每日复盘技能）、`agent-quantspace`（61★）、`skill-quant-factor-skill-factory`（66★）等。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**4 / 5**（作为选型/发现入口）

理由：
- **Claude Code 技能生态**：这是最直接的“技能市场/目录”，用于给团队挑选可复用 Skill/Agent，价值高。
- **A 股投研 / 万丰 CIO**：可作为 A 股量化能力选型的起点，快速定位个股体检、龙虎榜、因子、回测等资产。
- **扣分**：目录 ≠ 工具，本身不产出行情/研究结论；资产接口状态多为“无公开端点”，需逐个尽调；无统一许可证与质量背书。

## ⑦ 集成难度 + 路径

**难度：低（浏览/引用）。**

1. 直接浏览 https://www.quantskills.ai/ 或仓库 README 的目录；按分类/工作流筛选。
2. 选中资产后进入其仓库，按各自 `SKILL.md`/README 安装（多数复制到 `~/.claude/skills` 或 `.agents/skills`）。
3. 若追求可编程：读取 `site/catalog.json` / `data/curation.json` 做内部索引与自动选型。
4. 贡献/定制：用 `skill-template`、`agent-template`，按社区规则提交。

## ⑧ 风险

- **无许可证声明**：本目录仓库无 LICENSE，复用需谨慎；各资产许可证不一（多为 GPL-3.0）。
- **质量参差**：214 项中仅 1 项“已发布端点”，绝大多数“待维护者审核/无公开端点”，不能默认生产可用。
- **社区背书弱**：README 明示“目录快照不代表质量背书、收益承诺或生产可用性保证”。
- **依赖 PandaAI/Pandadata**：部分高价值技能依赖商业数据（见附节）。

---

## 附节：任务所称“个股体检”的真实仓库 `quantskills/skill-a-share-stock-dossier`

| 指标 | 值 |
|---|---|
| 定位 | 输入一个 A 股代码，输出可溯源的中文个股尽调报告（基本面、分红资本运作、股东行为、质押解禁减持风险、资金面） |
| Stars / Forks | 39 / —（组织内热度靠前） |
| 许可证 | GPL-3.0 |
| 语言 | Python（Agent Skill） |
| 创建 / 最近推送 | 2026-06-11 / 2026-07-16 |
| 提交数 | 9 |
| 依赖 | 需配套 `skill-pandadata-api` 与 **Pandadata（PandaAI）数据接口**（25+ 接口） |

**核心能力**：5 个数据阶段（公司画像→财务→分红资本运作→股东与事件风险→资金面）＋ **10 条分级风险规则**（高/中/低）＋ 固定 9 章报告，每个结论标注来源接口、报告期/数据日与查询窗口；特色是**组合风险信号**（如“质押率高 + 解禁临近”“减持计划 + 业绩预告下修”）。

**契合度：4/5**（A 股个股尽调/体检高度对口 CIO 需求；扣分于 Pandadata 数据依赖与仅 9 次提交的维护度）。

**集成**：把 `skill-pandadata-api` 与 `skill-a-share-stock-dossier` 一并复制到 `~/.claude/skills/`（或 `~/.agents/skills/`），配置 Pandadata 访问后，用自然语言“给 000001.SZ 做一份个股体检报告”触发。

**风险**：数据强依赖 Pandadata（是否有公开/免费额度**未确认**）；GPL-3.0；维护活跃度一般。
