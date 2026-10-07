# 矩阵研究汇总 — INDEX

> 研究日期：2026-10-07。方法：GitHub API / raw / Gitee API / zdoc.app 实际抓取；不确定处标注「未确认」，未编造。
> 评价口径：「A 股投研 + 万丰 CIO」契合度（1–5，5 最高）。

## 结论速览

| # | 项目 | 定位 | Stars | 许可证 | 最近代码更新 | 技术栈 | A股契合度 | 一句话建议 |
|---|------|------|-------|--------|--------------|--------|:--:|------|
| 1 | [Kronos](./Kronos.md) | 金融 K 线基座模型 | 40,101 | MIT | 2026-04-13 | Python / PyTorch / HF / Qlib | **4** | 可做 A 股预测因子 POC，需自建组合与风控 |
| 2 | [bulk-annual-report-extractor](./bulk-annual-report-extractor.md) | 年报 LLM 信息抽取 Skill | 0(Gitee)/5(GitHub) | MIT | 2026-06-24 | Agent Skill + DeepSeek | **4** | 低本构建基本面面板，但太新需自测 |
| 3 | [a-stock-data](./a-stock-data.md) | A 股全栈取数 Skill | 10,627 | Apache-2.0 | 2026-10-07 | Markdown + 内嵌 Python，15 层/87 端点/34 源 | **5** | 最优先落地，A 股投研数据底座 |
| 4 | [DeepTutor](./DeepTutor.md) | 终身个性化学习 Agent | 40,862 | Apache-2.0 | 2026-10-04 | Python + Next.js + 多引擎 RAG + MCP | **3** | 做投研知识库/文档问答，非行情工具 |
| 5 | [OpenMAIC](./OpenMAIC.md) | 多智能体互动课堂 | 40,069 | MIT | 2026-10-07 | Next.js/React/LangGraph/PostgreSQL | **2** | 与投研弱相关，仅投教/路演边缘用途 |

## 分层建议

- **第一梯队（直接落地）**：`a-stock-data`。A 股投研取数刚需、零鉴权、覆盖最广、维护活跃；建议作为数据层首选，接入团队因子/回测/聚宽流程。
- **第二梯队（研究增强）**：
  - `Kronos`：把 K 线基座模型作为预测信号来源，先用 small 模型做 POC，再按官方 Qlib 示例微调 A 股模型。
  - `bulk-annual-report-extractor`：把年报文本转结构化面板，成本极低；但项目极新，须小样本验证并加人工抽检。
- **第三梯队（辅助/边缘）**：
  - `DeepTutor`：作为投研文档知识管理与报告协同平台，需与取数工具配合。
  - `OpenMAIC`：与 A 股投研几乎无交集，仅在做投教/路演内容时考虑。

## 组合思路（A 股投研 + 万丰 CIO）
1. **数据层**：`a-stock-data` 负责行情/研报/资金/财务/公告/事件等全量取数。
2. **非结构化层**：`bulk-annual-report-extractor` 抽取年报字段，形成文本面板数据。
3. **模型层**：`Kronos` 在 A 股数据上生成预测信号，交独立组合优化与风控模块。
4. **知识层**：`DeepTutor` 承载研报/内部纪要的 RAG 问答与报告协同。
5. **表达层（可选）**：`OpenMAIC` 把研究成果转成互动培训/路演。

## 共性与风险提示
- 1/4/5 均为高 star 项目，但 star 不等于生产成熟度：Kronos 代码更新偏慢，DeepTutor/OpenMAIC 迭代极快且含 breaking 变更。
- A 股数据类项目（2/3）依赖非官方接口或第三方 LLM，**合规性与上游稳定性需自行评估**；本项目不构成投资建议。
- 所有项目均**不直接给出交易策略**，需自建回测/组合/风控与人工审核闭环。

## 附：抓取证据
- Kronos：`api.github.com/repos/shiyu-coder/Kronos`；zdoc 页 `https://www.zdoc.app/zh/shiyu-coder/Kronos`
- bulk-annual-report-extractor：`gitee.com/api/v5/repos/ceheps/bulk-annual-report-extractor`（+ `github.com/Ceheps/...` 镜像）
- a-stock-data：`api.github.com/repos/simonlin1212/a-stock-data`（主页 API 确认具体仓）
- DeepTutor：`api.github.com/repos/HKUDS/DeepTutor`
- OpenMAIC：`api.github.com/repos/THU-MAIC/OpenMAIC`
</content>
