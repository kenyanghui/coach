# 矩阵研究任务（量马/hermes 节点）
你是量化工具研究员。逐个调研以下 5 个开源项目，每个写一份 markdown（文件名用拼音/英文 slug，放 /tmp/res/）。
调研方法：用 curl 访问 GitHub API（https://api.github.com/repos/<owner>/<repo>）拿 stars/license/更新时间；用 https://raw.githubusercontent.com/<owner>/<repo>/HEAD/README.md（或 main 分支）读 README 全文；必要时看目录结构（/contents/ API）。**必须基于真实抓取，不确定就写"未确认"，禁止编造**。
每份报告包含：①项目一句话定位 ②stars/许可证/最近更新/活跃度 ③技术栈与架构 ④数据面（数据源/覆盖市场/A股适用性）⑤核心能力清单 ⑥与"A股投研+万丰CIO APP+玄龙堂周易量化"场景的契合度评分(1-5)+理由 ⑦集成难度(低中高)+路径建议 ⑧风险（许可证/维护/合规）。
项目清单：
1. TauricResearch/TradingAgents（多智能体交易研究框架）
2. firmai/financial-machine-learning（金融 ML 资源库）
3. QUANTAXIS/QUANTAXIS（11K star 量化框架）
4. sngyai/Sequoia-X（A股自动分析）
5. anthropics/financial-services（Anthropic 金融服务示例/方案仓）
最后写 INDEX.md：每项目一行（名称/评分/一句话结论）+ 一段"组合建议"。
