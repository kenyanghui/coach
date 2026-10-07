# OpenMAIC — 开源多智能体互动课堂

> 抓取日期：2026-10-07。来源：GitHub API `github.com/THU-MAIC/OpenMAIC` 与其 README（v1.1.3）。
> 属主：THU-MAIC（清华大学，推测，**README 未逐字声明**，论文作者含清华团队）。Demo：`open.maic.chat`。

## ① 一句话定位
把任意主题或文档一键变成「AI 老师 + AI 同学」沉浸式互动课堂：多智能体编排自动生成幻灯片、测验、交互模拟与项目式学习活动，老师能说话、板书并与学习者实时讨论。

## ② Stars / 许可证 / 更新 / 活跃度
- Stars：**40,069**，Forks：6,204；Open issues：189
- 许可证：**MIT**（根仓库；注意 `packages/mathml2omml` 为 LGPL-3.0-or-later）
- 创建：2026-03-11；最后推送：**2026-10-07**；最新 release：**v1.1.3（2026-10-05）**，另有 v1.2.0-rc.1（2026-10-04 预发布）
- 活跃度：**极高**，多次安全更新；论文发表于 JCST（DOI 10.1007/s11390-025-6000-0）
- 语言：TypeScript 为主

## ③ 技术栈
- 前端/服务：**Next.js 16、React 19、TypeScript 5、Tailwind CSS 4**
- 编排：**LangGraph 1.1** 多智能体状态机（director graph）
- 运行：**Node.js ≥ 22.19、pnpm ≥ 10、PostgreSQL 16**（v1.2.0 起 server-first，课程存服务端）
- Provider 中立：OpenAI / Anthropic / Azure / Bedrock / Gemini / DeepSeek / Qwen / Kimi / MiniMax / Grok / GLM / Ollama / Lemonade / FunASR 等，任意 OpenAI 兼容 API
- 媒体：MinerU 文档解析、VoxCPM2 TTS 语音克隆、FunASR 本地 ASR、render-service（Chromium + FFmpeg）导出 MP4
- SDK：`@openmaic/dsl|renderer|editor|importer|generation|storage` 等 npm 包
- 部署：pnpm 本地、Docker、Vercel（≤1.1.x）

## ④ 数据面与 A 股适用性
- **无任何金融/行情数据接口**，数据面是用户上传的主题/文档（PDF、Word、PPT、表格、文本、图像、音频、视频）
- A 股适用性：**间接/弱**。可用于把 A 股投研材料、年报、策略文档转成面向团队或客户的**互动教学课程/路演演示**，或做投资者教育；但不产生投研数据、不辅助选股与交易

## ⑤ 核心能力
- 一键课堂生成（大纲 → 场景：幻灯片/测验/交互模块/PBL）
- 多智能体实时互动（AI 老师/同学讨论，白板 + TTS）
- Deep Interactive Mode：3D、模拟、游戏、思维导图、在线编程五类交互 UI
- Agent Workbench（Pro）：会话式建课 Agent，24 个内置技能，支持 PPTX 导入、素材解析、图像/视频/语音生成
- 导出：可编辑 `.pptx`、交互 `.html`、MP4
- OpenClaw/Codex/DeepSeek/WorkBuddy Skill 集成，可从飞书/Slack/Telegram 等 20+ IM 生成课堂

## ⑥ 与「A 股投研 + 万丰 CIO」契合度：**2 / 5**
理由：与 A 股投研几乎无直接交集，也不承担 CIO 的技术基础设施职能。唯一潜在价值是把研究成果/年报转成互动培训或客户路演材料，属边缘的「表达层」工具。扣分：部署重（PostgreSQL + 常驻服务 + 渲染容器）、与金融业务链不耦合，投入产出比低。

## ⑦ 集成难度与路径
- 难度：**中高**（前端/Node/PostgreSQL/，若用 v1.2+ 必须长驻服务与数据库）
- 路径（若确要做投教/路演内容）：
  1. `git clone` → `pnpm install` → 配 `.env.local` 与 `openmaic.yml`（模型 slots）→ `pnpm db:up` → `pnpm dev`
  2. 上传 A 股主题材料/研报，生成课堂并导出 PPTX/HTML
  3. 通过 OpenClaw Skill 从 IM 触发生成，降低使用门槛

## ⑧ 风险
- **业务相关性低**：对 A 股投研与 CIO 主业帮助有限
- 基础设施成本：PostgreSQL、长驻服务、渲染服务、媒体生成 token/算力开销大
- 安全：项目近期多次安全公告（SSRF、DNS rebinding、MinerU 解析、Next.js RCE），需及时跟进版本
- v1.2.0 为 server-first 破坏性升级（需 PostgreSQL，Vercel 仍停留在 1.1.x），升级需读 changelog
- 多模态生成质量与 AI 教学内容准确性需人工审核
</content>
