# 矩阵研究 INDEX · A 股投研 × Claude Code 技能生态

> 调研对象：6 个项目 | 抓取时间：2026-10-07 | 方法：GitHub API（api.github.com）+ raw.githubusercontent.com 读取 README/SKILL.md/catalog，全部真实抓取；不确定项标注“未确认”，无编造。

## 总览

| # | 项目 | 一句话定位 | Stars | 许可证 | 最近推送 | 语言 | A 股适用性 | 契合度 |
|---|---|---|---|---|---|---|---|---|
| 01 | [simonlin1212/Vibe-Research](./01-Vibe-Research.md) | 本地 A股/美股/港股 AI 投研工作台（六阶段个股研究+回测+研报库） | 2631 | MIT | 2026-10-07 | TS/Python | 高 | **5/5** |
| 02 | [quantskills/skill-daily-report](./02-skill-daily-report.md) | 跨市场每日复盘技能（A/港/美/日/韩/金/油） | 1 | GPL-3.0-only | 2026-08-06 | Python | 高（靠抓取） | **3/5** |
| 03 | [quantskills/quantskills](./03-quantskills.md) | QuantSkills 组织全景目录（214 资产/10 分类）；附：个股体检真身为 skill-a-share-stock-dossier | 2424 | 无声明 | 2026-10-07 | JS | 取决于资产 | **4/5** |
| 04 | [quantskills/skill-xingtai-catcher](./04-skill-xingtai-catcher.md) | 形态捕手 MCP/脚本：文字·截图·手绘图搜相似 A 股/期货形态 | 35 | GPL-3.0 | 2026-06-22 | Python | 高（依赖三方云） | **4/5** |
| 05 | [AlphaGBM/skills](./05-AlphaGBM-skills.md) | Claude Code/Cursor 技能包：美股/期权研究 workflow（27–29 Skills） | 5776 | MIT | 2026-10-06 | Python | 低–中 | **3/5** |
| 06 | [easy-tdx](./06-easy-tdx.md) | 通达信 TCP 行情协议 Python SDK/CLI（A股/港美/期货，免费） | 65（主实现） | MIT（README） | 2026-05~10 | Python | 很高 | **4/5** |

> 契合度 = 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”的综合评分（1–5）。

## 分层结论

**第一梯队（可直接投入 A 股投研）**
- **01 Vibe-Research（5/5）**：功能最完整、最活跃、证据链/合规最规范的本地投研工作台；原生把 Claude Code 当 Agent 引擎，最适合作为 CIO 层深研与留痕平台。
- **06 easy-tdx（4/5）**：免费 A 股全市场行情/资金/板块/财务/离线数据源，适合做自建数据底座并包成 Claude Code Skill；注意协议非官方与仓库碎片化。

**第二梯队（按需接入的能力/入口）**
- **04 xingtai-catcher（4/5）**：形态选股辅助，MCP 接入顺滑；但核心在第三方商业云，仅作客户端。
- **03 quantskills 目录（4/5）**：作为量化 Skill/Agent 选型地图；A 股“个股体检”应指向 `skill-a-share-stock-dossier`（需 Pandadata）。

**第三梯队（参考/生态示范）**
- **05 AlphaGBM（3/5）**：技能工程化标杆（MIT、`npx skills add`、5 workflow+22 工具），但以美股/期权为主且走付费账户，A 股价值有限。
- **02 skill-daily-report（3/5）**：轻量每日复盘技能，模板专业、接入简单，但单点维护、依赖网页抓取，需谨慎使用。

## 组合建议（给万丰 CIO / A 股投研）

1. **底座数据**：`easy-tdx`（免费实时+离线）承担 A 股行情/资金/板块/财务。
2. **研究工作台**：`Vibe-Research` 承担深研总成、六阶段个股研究、回测、证据链与归档。
3. **技能点缀**：`skill-xingtai-catcher` 做形态选股辅助；`skill-daily-report` 做盘后简报；从 `quantskills` 目录挑选 A 股因子/风险/回测类技能（如 `skill-a-share-stock-dossier`）。
4. **生态参考**：以 `AlphaGBM/skills` 为“技能包工程化”模板，规范自研 Skill 的目录、runner、安装与校验。

## 重要更正与未确认项（务必阅读）

- **01 Vibe-Research 的“47 端点”**：任务清单口径过时。仓库 `datasources/registry.json` 实测 **117 端点 / 38 个 source**；README 写“117 端点/30 层”，内部 skills README 又写“115 端点/29 层”，存在口径不一致。
- **03 quantskills/quantskills ≠ 个股体检**：该仓库是**组织目录/导航**；“个股体检”实为 `quantskills/skill-a-share-stock-dossier`（见 03 文末附节）。
- **06 easy-tdx 无唯一主仓库**：同名实现至少 3 个，README 徽章指向的 `handsomejustin/easy-tdx` 已不可解析（**未确认**其是否原主仓库）；PyPI `easy-tdx` 返回 **404**，README 的 `pip install easy-tdx` 当前不可用。
- **许可证口径**：`skill-daily-report`、`easy-tdx` 各仓库 README 标 GPL-3.0 / MIT，但 GitHub API 返回 `NOASSERTION`，使用前请以仓库 LICENSE 文件为准。
- **数据时效**：以上 stars/推送时间为 2026-10-07 快照，随时间变化。

## 各项目文件

- [01-Vibe-Research.md](./01-Vibe-Research.md)
- [02-skill-daily-report.md](./02-skill-daily-report.md)
- [03-quantskills.md](./03-quantskills.md)
- [04-skill-xingtai-catcher.md](./04-skill-xingtai-catcher.md)
- [05-AlphaGBM-skills.md](./05-AlphaGBM-skills.md)
- [06-easy-tdx.md](./06-easy-tdx.md)
