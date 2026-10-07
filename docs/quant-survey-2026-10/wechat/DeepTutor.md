# DeepTutor — 终身个性化私教 / 文档学习 Agent

> 抓取日期：2026-10-07。来源：GitHub API `github.com/HKUDS/DeepTutor` 与其 README（主 README，v1.6.13）。
> 属主：HKUDS（香港大学数据智能实验室，推测，**未在 README 明确**）。官网 `deeptutor.info`。

## ① 一句话定位
Agent-native 的**终身个性化学习工作区**：把答疑、解题、出题、深度研究、可视化与掌握度练习统一在一个可扩展系统里，围绕用户自有知识库/文档做长期个性化辅导。

## ② Stars / 许可证 / 更新 / 活跃度
- Stars：**40,862**，Forks：5,163；Open issues：222
- 许可证：**Apache-2.0**
- 创建：2025-12-28；最后推送：**2026-10-04**；最新 release：**v1.6.13（2026-10-04）**
- 活跃度：**极高**，几乎每 1~3 天一个版本；README 记录「20k stars / 111 天」「10k stars / 39 天」等增长
- 论文：arXiv 2604.26962（homepage 指向）；Topics：ai-agents、ai-tutor、deepresearch、rag、multi-agent-systems 等

## ③ 技术栈
- 后端 Python **3.11–3.14**；前端 **Next.js 16 / React 19**
- 多引擎 RAG：**LlamaIndex、PageIndex、GraphRAG、LightRAG、远程 LightRAG Server、WeKnora、腾讯 IMA、MarginNote 4、Kiwix ZIM、Obsidian**
- 文档解析：MinerU、Apache Tika、LiteParse、PyMuPDF4LLM、Docling 等可插拔
- 工具生态：内置工具 + **MCP** + CLI apps + 社区 Skills（EduHub/ClawHub）+ 图像/视频/语音生成模型
- 子代理/Partners：可接 Claude Code、Codex、Grok CLI、Antigravity、Kimi、opencode、DeepSeek 等；IM 渠道 15 个（含飞书/Discord/微信等）
- 部署：Docker 一键、PyPI `pip install -U deeptutor`、源码安装、CLI 包

## ④ 数据面与 A 股适用性
- **本身不是金融/行情工具**，无 A 股数据源连接器，无财务/交易数据接口
- 数据面：**用户自有文档/知识库**（PDF、DOCX、XLSX、PPTX、EPUB、GitHub 仓库、网页、YouTube 视频等）
- A 股适用性：**间接**。可把 A 股研报、年报、招股书、内部研究笔记灌入知识库做 RAG 问答、Deep Research、报告撰写与学习；但不能取行情/因子/交易数据

## ⑤ 核心能力
- 统一运行时支撑 Chat、提问、出题、Research、Visualize、Solve、课程学习、Mastery Path、沉浸式阅读/观看
- 三层可检查记忆（L1 traces / L2 summaries / L3 synthesis）+ 知识图谱
- 多格式文档解析与多引擎 RAG，带可溯源引用
- 可接外部 Agent harness / IM 作为「伙伴」常驻咨询
- 学习任务板、错题本、Co-Writer 协同写作、Book 生成器

## ⑥ 与「A 股投研 + 万丰 CIO」契合度：**3 / 5**
理由：作为「投研知识管理与文档问答中枢」有价值——能把万丰 CIO 条线的研报/年报/内部资料变成可问答、可训练、可出题的知识库，并支持报告协同撰写。但它是通用学习 Agent，**不接市场数据、不做选股/回测**，对交易决策不产生直接价值；部署与维护成本高、版本迭代快（频繁 breaking refactor），短期投入产出比一般。

## ⑦ 集成难度与路径
- 难度：**中高**。Docker 一键可跑，但要发挥价值需接入 LLM/embedding/search provider，并准备高质量知识库
- 路径：
  1. Docker 试跑（`ghcr.io/hkuds/deeptutor:latest`，端口 3782），配置模型 Provider
  2. 建 A 股投研知识库（研报/年报/内部纪要），选解析引擎与 RAG 后端
  3. 用 Deep Research / Co-Writer 做专题研究与报告初稿，接入团队 IM

## ⑧ 风险
- **非金融专用**：无行情/财务数据，需与 a-stock-data 等取数工具配合使用
- 迭代极快，README 明确有「Breaking front/back-end refactor」，升级可能破坏配置
- 资源与成本较高（多引擎 RAG、多模态生成、常驻服务 + PostgreSQL 等）
- 数据私密性：需确认知识库/凭据隔离与部署边界（README 有沙箱与工作区隔离机制）
- 项目体量巨大（README 提到约 20 万行重写），自研二次开发门槛高
</content>
