# bulk-annual-report-extractor — 年报 LLM 信息抽取 Skill

> 抓取日期：2026-10-07。来源：Gitee API `https://gitee.com/api/v5/repos/ceheps/bulk-annual-report-extractor` 及其 README；GitHub 镜像 `github.com/Ceheps/bulk-annual-report-extractor`（README 中自称仓库）。

## ① 一句话定位
面向经管类科研的 **Agent Skill**：自动爬取 A 股上市公司年报，用大语言模型（DeepSeek）从年报文本定向抽取任意字段，输出可溯源、可直接用于实证分析的 Excel 面板数据。

## ② Stars / 许可证 / 更新 / 活跃度
- Gitee：Stars **0**，Forks 0，Watchers 1；默认分支 `main`
- GitHub 镜像：Stars **5**，Forks 0
- 许可证：**MIT**
- 创建：2026-06-24（Gitee，+08:00）；最后推送：**2026-06-24**
- 提交仅两条：`Initial commit: bulk-annual-report-extractor skill`、`Add MIT LICENSE`
- 活跃度：**极低/新项目**，无后续迭代记录；README 提到费用基于 DeepSeek V4-flash
- 仓库结构：`assets/ references/ scripts/ LICENSE README.md README.en.md SKILL.md`

## ③ 技术栈
- 形态：**Agent Skill**（Markdown `SKILL.md` + `scripts/` Python），可装入 WorkBuddy / Codex / Claude Code 等 Agent
- 依赖 Python 环境；需 **DeepSeek API Key**（默认 DeepSeek V4-flash）
- 流程：年报下载 → PDF 转 Markdown → 章节目录结构化 → 智能定位目标章节 → LLM 定向抽取 → 导出 Excel
- 输出：`result.xlsx`（含章节/原文片段溯源）、`result_clean.xlsx`（纯面板数据）、`validation_sample.xlsx`（抽样校验）

## ④ 数据面与 A 股适用性
- 数据源：A 股上市公司年报（自动爬取，来源未在 README 明示，推测为巨潮/交易所，**未确认**）
- 实测支持 **3000+ 份**年报批量处理；实测成本约 **0.02 元/份**（DeepSeek V4-flash）
- 卖点：结构化切分 + 定向抽取（非全文盲喂 LLM）以降本；结果可溯源；断点续传；幻觉过滤（丢弃无法在原文定位的结果）
- A 股适用性：**强**，聚焦基本面/年报文本的科研面板构建

## ⑤ 核心能力
- 指定公司 + 年度范围批量下载年报
- 自定义抽取字段（如「创新目标」「信息冗余」等任意研究变量）
- 先抽样人工确认，再全量处理
- 导出带原文依据的结构化 Excel 面板

## ⑥ 与「A 股投研 + 万丰 CIO」契合度：**4 / 5**
理由：把年报文本变成结构化面板，正是 A 股基本面研究/量化另类数据的痛点环节，成本极低、可溯源、非编程用户可用；对 CIO 组织内的研究员效率提升直接。扣分：项目太新（0~5 stars、单次提交）、无实证案例与测试披露，短期只能当原型，难以直接纳入生产研究流水线。

## ⑦ 集成难度与路径
- 难度：**低**。作为 Skill 安装，输入 DeepSeek Key，按 Agent 引导操作
- 路径：
  1. 在 Claude Code/Codex 中导入 `SKILL.md` 与 `scripts/`，配置 DeepSeek Key
  2. 先对小样本（如 5 家公司）跑通抽取与抽检
  3. 固化目标字段模板，批量跑目标股票池，产出面板数据供内部研究/因子构建

## ⑧ 风险
- **成熟度风险**：创建仅一天、2 次提交、几乎无社区反馈；无版本发布、无测试
- 年报爬取来源与合规性 **未在 README 明确**，需自行核实（避免法律/风控问题）
- 强依赖 **DeepSeek API** 与 PDF 解析质量；扫描版/版式差的年报可能抽取失败
- 「幻觉过滤」效果与字段准确率无公开验证，必须保留人工抽检环节
- 单维护者项目，长期维护不可预期
</content>
