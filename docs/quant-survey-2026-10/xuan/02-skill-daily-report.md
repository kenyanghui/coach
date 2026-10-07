# 02 · quantskills/skill-daily-report

> 抓取时间：2026-10-07（GitHub API + raw README/SKILL.md/脚本，真实抓取）

## ① 一句话定位

**跨市场每日复盘 Skill**：汇总 A 股、港股、美股、日经、韩国市场以及黄金、原油等公开行情，结合板块表现、资金流向和重要新闻，生成结构化 Markdown 市场复盘报告与次日情景分析。

## ② Stars / 许可证 / 更新 / 活跃度

| 指标 | 值 |
|---|---|
| Stars | **1** |
| Forks | 0 |
| Open issues | 0 |
| 许可证 | README 与 `SKILL.md` 标注 **GPL-3.0-only**；GitHub API 返回 `NOASSERTION`（LICENSE 文件存在但 SPDX 未识别） |
| 语言 | Python |
| 创建 | 2026-08-05 |
| 最近推送 | 2026-08-06 |
| 提交数 | **3**（默认分支 main，近似“一次性发布”） |
| 组织 | quantskills（PandaAI 发起） |

**活跃度：低。** 发布即基本停更，个人/社区一次性贡献，尚无社区验证。

## ③ 技术栈

- Python 3.9+，仅依赖 `requests`。
- `SKILL.md` 为根目录技能定义，声明支持运行时 `codex, claude-code, cursor, hermes, openclaw`，`allowed-tools: Bash/Read/Write/WebSearch/WebFetch`。
- `scripts/fetch_market_data.py`（v3.0）用新浪财经 `hq.sinajs.cn` 抓取结构化行情，输出 `/tmp/daily_report_data.json`。
- `agents/` 提供 Cursor（`cursor-rule.mdc`）、Hermes/OpenClaw（`openai.yaml`、`portable-loader.md`）适配入口。

## ④ 数据面与 A 股适用性

- **脚本层**：新浪财经公开接口，覆盖上证指数、深证成指、创业板指、科创50 + 道琼斯/纳指/恒指期货/日经期货/黄金/原油期货。
- **补充层**：板块、概念、资金流向、重要新闻优先同花顺公开页面，备用东方财富、财联社、金十、雪球、同花顺；通过 WebSearch/WebFetch 人工抓取并交叉核对。
- **实时性**：A 股来自新浪、交易时段实时；美股延迟约 15–20 分钟；期货实时。
- **A 股适用性：高（但依赖网页抓取）**。A 股盘面/板块/资金/新闻是报告核心；无本地数据仓库、无数据契约，完全依赖公开页面可用性。

## ⑤ 核心能力

- **固定复盘报告模板**：今日盘面总览 → 资金面 → 板块热点 → 消息面 → 跨市场关联 → 明日方向预测 → 附录/免责声明。
- **数据完整性门槛**：生成前逐项检查，缺失项必须标注“数据状态：暂缺 + 原因”，**不得用推测值替代缺失数据**。
- **来源标注**：每个数据块记录来源与获取时间。
- **异常处理**：脚本失败不终止，转 WebSearch 手动补数；非交易日生成简版。
- **次日情景**：给出相对强势/承压板块及情景置信度（避免表述为确定性预测）。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**3 / 5**

理由：
- **A 股投研**：每日复盘是 CIO/投研的日常刚需，模板较专业，可直接产出盘后简报。
- **Claude Code 技能生态**：`SKILL.md` 天然适配 Claude Code / Codex，安装成本极低，属于“拿来即用”的纯技能。
- **扣分**：① 体量极小（1 star、3 commits、发布即停更），无社区维护与实测背书；② 依赖网页抓取与搜索工具，稳定性/可复现性弱，无数据契约；③ 次日预测部分需人工审慎，不能作为交易依据；④ 许可证口径不一致（GPL-3.0 与 NOASSERTION）。

## ⑦ 集成难度 + 路径

**难度：低。**

1. 将仓库 `SKILL.md` 放入 Claude Code 技能目录（如 `~/.claude/skills/skill-daily-report/`）或 Codex 的 `.agents/skills/`。
2. 安装依赖：`python3 -m pip install requests`。
3. 运行采集：`python3 scripts/fetch_market_data.py` → 读取 `/tmp/daily_report_data.json`。
4. 在支持 WebSearch/WebFetch 的运行时里，让它按 SKILL.md 补齐板块/资金/新闻并生成报告（默认保存到 `~/Desktop/每日复盘_YYYY-MM-DD.md`）。
5. 若运行时无网络工具，脚本只能给出行情骨架，需自行补数据。

## ⑧ 风险

- **维护风险高**：单点贡献、3 次提交，接口/页面变化后无人更新。
- **抓取风险**：同花顺/新浪等公开页面可能改版、限流或反爬（SKILL 明确要求不得绕过登录/验证码/反爬）。
- **数据质量**：搜索来源时间不一，存在延迟与冲突；“暂缺”机制虽好，但报告价值受数据完整度制约。
- **合规**：仅信息整理，不构成投资建议；次日情景置信度易被误用为交易信号。
- **许可**：GPL-3.0-only（若与自研闭源系统组合需注意 copyleft 边界），且 API 未正确识别许可证。
