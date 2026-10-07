# 04 · quantskills/skill-xingtai-catcher（形态捕手）

> 抓取时间：2026-10-07（GitHub API + raw README/SKILL.md/`references/mcp-usage.md`，真实抓取）

## ① 一句话定位

**形态捕手（PatternCatcher）MCP Skill**：让通用 AI Agent 依据**文字描述、K 线截图或手绘走势图**，在 A 股 / 期货数据里查找相似 K 线形态，返回候选标的、评分、结果页与分享页；支持托管 MCP 工具，也提供无 MCP 平台的直连脚本。

## ② Stars / 许可证 / 更新 / 活跃度

| 指标 | 值 |
|---|---|
| Stars | **35** |
| Forks | 16 |
| Open issues | 1 |
| 许可证 | **GPL-3.0** |
| 语言 | Python（技能定义 + 脚本） |
| 创建 | 2026-06-21 |
| 最近推送 | 2026-06-22 |
| 提交数 | 12 |
| 官网/服务 | https://kkk.quant789.com |
| Topics | a-share, futures, kline-pattern, mcp, quantskills |

**活跃度：低**（发布集中在 2026-06，之后基本停更；靠外部托管服务运行）。

## ③ 技术栈

- Agent Skill：根目录 `SKILL.md`（frontmatter 声明 `platforms: [codex, openclaw, workbuddy]`、`license: GPL-3.0`、`validation_level: runnable`）。
- 直连脚本：`scripts/xingtai_search.py`，默认把结果写入 `.xingtai_result.txt` / `.xingtai_result.json`（避免把工具日志贴给用户）。
- **托管 MCP 服务**：`https://kkk.quant789.com/mcp`（服务地址硬编码在脚本里；文档称用户无需自行部署、无需配置 token）。
- `agents/openai.yaml` 适配；`references/mcp-usage.md` 给出脚本、MCP 配置与回复格式。

## ④ 数据面与 A 股适用性

- **不本地持有数据**：形态匹配在外部服务 `kkk.quant789.com` 完成，脚本/ MCP 只是调用入口。
- 覆盖：**A 股、期货、全市场**；周期 **日线 / 60 分钟**；匹配长度 **30 / 60 / 120 BAR**；默认 `universe=all, timeframe=1d, window_bars=120, top_n=5`（最多 Top10）。
- **A 股适用性：高**（直接面向 A 股选股辅助），但数据与算法均在第三方云端，用户无法审计。

## ⑤ 核心能力

- **固定模板雷达**（直接调服务器模板，不让模型临时画图）：强趋势延续 `strong_trend`、底部反转 `bottom_reversal`、W底/双底 `w_bottom`、趋势回踩 `trend_pullback`、震荡整理 `range_consolidation`、M头/顶部反转 `top_reversal`。
- **多模态输入**：文字描述、手绘图（`kind=drawing`，默认 `mode=high_precision`）、真实 K 线截图（`kind=upload_screenshot`，需清晰烛台结构）。
- **交互规范**：参数缺失时先追问周期/BAR 长度；图片优先走图片路由，不先转文字、不重画；标准模板词优先走雷达模板。
- **产物**：候选列表（名称/代码/评分/市场/数据日）、结果页、分享页；网站支持登录保存形态、订阅模板、飞书/企业微信推送。
- MCP 工具：`list_supported_patterns`、`find_similar_by_text`、`find_similar_by_image`、`get_match_result`、`create_share_link`。

## ⑥ 与“A 股投研 + 万丰 CIO + Claude Code 技能生态”契合度：**4 / 5**

理由：
- **A 股投研**：形态相似度检索是选股/复盘的有用辅助，模板雷达适合每日跟踪；A 股/期货覆盖直接对口。
- **Claude Code 技能生态**：标准 `SKILL.md` + MCP，接入非常顺滑；MCP 方案与 Claude Code/Codex 生态天然兼容。
- **扣分**：① 核心算法/数据在**第三方商业网站**，开源仅是“客户端/提示”；② 仓库停更、单点依赖；③ 输出是形态相似度研究，非完整投研结论；④ 存在向网站订阅（飞书/企微推送）转化的商业属性。

## ⑦ 集成难度 + 路径

**难度：低–中。**

- **MCP 路径**（推荐）：在支持 MCP 的运行时配置
  ```json
  { "mcpServers": { "xingtai-catcher": { "url": "https://kkk.quant789.com/mcp" } } }
  ```
  然后让 Agent 调用 `find_similar_by_text` / `find_similar_by_image`。
- **脚本路径**（无 MCP）：`python scripts/xingtai_search.py text "找底部反转" --universe stock --timeframe 1d --window-bars 120 --top-n 5`（图片用 `image` 子命令），读取 `.xingtai_result.txt`。
- **技能路径**：把仓库交给 Claude Code/Codex，作为技能加载，让其按 SKILL.md 路由。
- 依赖：Python + requests（脚本模式）；MCP 模式需网络可达 `kkk.quant789.com`。

## ⑧ 风险

- **第三方依赖/可用性**：服务由外部站点提供，地址硬编码、无 SLA；站点宕机/改协议即失效。
- **隐私**：上传的 K 线截图/手绘图会发送到第三方服务，敏感图表需评估。
- **可审计性差**：无公开数据契约与评分算法，结果不可复现；文档明确“仅供形态相似度研究，不构成投资建议”。
- **维护停滞**：2026-06 后无推送，协议变化无人修复。
- **许可证**：GPL-3.0（copyleft），且与商业网站深度绑定。
