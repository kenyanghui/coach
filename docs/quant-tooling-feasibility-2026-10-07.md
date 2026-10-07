# 量化工具领域研究可行性报告与实施建议

> 2026-10-07 · 调研方式：**算力矩阵四节点并行**（hermes/xuan/wechat/openclaw 各领 5-6 项，deepseek-flash 驱动 opencode，全部基于 GitHub API/raw README 真实抓取）+ Loong 主力亲核关键项 · 原始调研归档 `docs/quant-survey-2026-10/`
> 背景：万丰APP（wanfengapp）完成去 bug 进入种子用户服务期，能力边界收敛为 **DSA + 舆情智察（cn-financial-scraper），不接 QuantDinger**（owner 2026-10-07 拍板）；本报告为**下一阶段研究储备**，与 2026-09 生态报告（`docs/quant-ecosystem-research-2026-09.md`）互补——那篇看生态全景，本篇逐项吃透你点名的 20+ 项目并给落地切分。
> 评价口径：**A股投研 + 万丰CIO + 玄龙堂玄学量化**（aibay.asia，卦象因子可回测框架）三场景契合度。

---

## 一、结论摘要（TL;DR）

1. **值得立刻做的三件套**：`a-stock-data`（数据底座，10.6k⭐ Apache-2.0，15 层 87 端点 34 源）→ `Vibe-Research`（研究工作台范式，2631⭐ MIT，**今天还在更新**，与万丰/玄龙堂场景契合 5/5）→ `easy-tdx`（通达信免费实时行情，MIT）。这三件能以最低成本把「A股数据自主权」从 0 打到 80。
2. **战略级独占机会**：`Kronos`（清华 AAAI 2026，40k⭐ MIT，K线基座模型）的分词器把 OHLCV 量化为**分层离散标记**——与玄龙堂「把市场翻译成卦象」方法论同构。**Kronos 标记 ≈ 可学习的卦象编码**，这是全市场没人做过的「玄学量化 × 基座模型」结合点，建议立为旗舰研究课题。
3. **直接淘汰 3 项**：gainlab（黄金外汇信号售卖社群，非开源研究资产）、Male-CNS Connectome（果蝇大脑连接组，纯误入清单——数据工程实践可参考，与量化无关）、OpenMAIC（互动课堂，投教边缘价值）。
4. **实习生切分**：4 条工作流 × 2 周，数据组→因子组→Agent组→内容组流水线（§五），每条都配了明确交付物与验收口径，可直接发 offer。

## 二、背景盘点（aibay.asia = 玄龙堂 25 页项目）

站内 25 个页面项目分四类：**修行内容**（打坐/道诗/经典互参 10 页）、**玄学应用**（八字/奇门/梅花/数字能量 4 页）、**道商与传承**（四梁八柱/二代传承/family-office）、**量化线**（量化悟道 zhouyi-invest、周易规律 zhouyi-guilv、AI量化平台=coach）。量化线的独有资产是「玄学量化」框架：**卦=市场状态压缩编码**（八卦=八种市场状态、变爻=转折信号、泰否=量价配合）、回测=现代之「证」——**可证伪、可回测、可迭代**。报告的一切选型都为这个框架服务：让卦象因子能被真实数据检验。

## 三、全项目评估总表（22 项 + 补充）

### 梯队 P0 · 直接落地（本周可启动）

| 项目 | ⭐/许可/活跃 | 契合 | 定位与理由 |
|---|---|---|---|
| **a-stock-data**(simonlin1212) | 10.6k / Apache-2.0 / 当日更新 | **5/5** | A股全栈取数 Skill：15 层 87 端点 34 数据源，Markdown+内嵌 Python。数据底座首选，替换/增强现有取数散件 |
| **Vibe-Research**(simonlin1212) | 2.6k / MIT / 当日更新 | **5/5** | 本地投研 Agent（A/港/美）：六阶段个股研究、资讯雷达、板块中心、回测、47 端点工具箱，Codex/Claude 接入。**研究工作台的现成范式**——重点学它的工作流设计而非整体搬运 |
| **easy-tdx** | 65(主实现) / MIT / 持续 | **4/5** | 通达信 TCP 协议 Python SDK：A股/港美/期货免费实时行情。零成本实时数据的正路（合规：仅作研究用途） |
| **Kronos**(shiyu-coder) | 40k / MIT / 2026-04 | **4/5** | K线基座模型（mini/small/base 开源，Qlib+A股示例）。预测因子 POC 可两周出；**分词器离散标记=卦象编码的同构体**（§四专项） |

### 梯队 P1 · 战略参考（吸收思想/局部复用）

| 项目 | ⭐/许可 | 契合 | 用法 |
|---|---|---|---|
| **TradingAgents**(TauricResearch) | 110k / Apache-2.0 | 3/5 | 多智能体交易研究框架（分析师/研究员/交易员/风控辩论结构）。**架构思想直接服务万丰"AI量化团队"人设**；A股数据面弱需自接 a-stock-data。注：coach 已有 TradingAgents-CN 复刻页，做深即可 |
| **QUANTAXIS** | 11.3k / MIT | 4/5 | A股全链路平台（数据/回测/分析/实盘，Rust 加速）。能力最全但重——**只拆模块用**（其数据抓取与回测引擎），不整栈部署 |
| **quantskills 生态**（org 2.4k⭐ + xingtai-catcher 35⭐） | GPL-3.0/无 | 4/5 | 个股体检（真身 skill-a-share-stock-dossier）+ **形态捕手（文字/截图/手绘图搜相似形态，MCP）**——后者与玄学量化「观象」直接对应，可做形态检索底座 |
| **AlphaGBM/skills** | 5.8k / MIT / 昨日更新 | 3/5 | 美股/期权 27-29 个 Claude 技能包。方法论可平移 A股（技能化投研工作流），数据面不适配 |
| **anthropics/financial-services** | 38.9k / Apache-2.0 | 2/5 | Anthropic 官方 FSI 智能体/MCP/技能参考。不面向A股，但**合规与技能工程范式值得抄**（我们做万丰内容网关时同款思路） |
| **bulk-annual-report-extractor**(gitee) | 5(GitHub)/0(Gitee) / MIT | 4/5 | 年报 LLM 抽取 Skill（DeepSeek）。低本构建基本面面板——**卦象「下卦为体=基本面」的数据供给**。太新需自测 |

### 梯队 P2 · 场景外围（按需取用）

| 项目 | ⭐/许可 | 契合 | 备注 |
|---|---|---|---|
| Sequoia-X | 7.9k / 无正式 LICENSE ⚠️ | 4/5 | 轻量A股形态选股+飞书推送，开箱即用；**缺 LICENSE 文件是商用隐患**，只借鉴实现 |
| DeepTutor(HKUDS) | 40.9k / Apache-2.0 | 3/5 | 文档学习 Agent（多引擎 RAG）。用途定位=投研知识库/研报问答，非行情工具 |
| Sightflow | V1.0 / 许可未标 ⚠️ | 2/5 | 视觉 RPA 桌面 Agent（零 API 场景自动化）。与万丰"进门财经"类无 API 站点采集痛点沾边，但许可未明+场景弱 |
| Auto-Company(MaxMiksa) | 3.1k / MIT | 2/5 | 14 角色 AI 公司自转框架（财务建模/深度研究技能可参考）。非金融工具，安全面（无沙箱）注意 |
| financial-machine-learning(firmai) | 8.8k / 无 | 2/5 | 金融 ML 精选清单。当选型雷达用，无可集成代码 |
| skill-daily-report(quantskills) | 1 / GPL-3.0 | 3/5 | 跨市场每日复盘技能。思路与 DSA 股评管线重叠，参考其市场宽度指标 |

### 淘汰（不投入）

- **gainlab / gainlab-app**：黄金外汇**信号售卖社群**（商业服务），app 仓 0⭐ MIT 壳。非研究资产，且信号带单业务合规风险——不碰。
- **Male CNS Connectome**（Janelia 果蝇大脑连接组）：**清单误入**（疑视频来源混入）。与量化无关；仅当 PB 级数据工程案例参考。
- **OpenMAIC**（清华）：多智能体互动课堂。与投研弱相关，投教场景价值有限（万丰已有内容网关路线）。

### 补充建议（清单外，来自既有生态报告差集 + 本次观察）

1. **czsc（缠论，6.3k⭐）**——中文散户最大流量入口之一，「缠论结构」与卦象同为「市场结构语言」，引流+研究双价值；
2. **akshare-one-mcp / FinanceMCP（860⭐）**——A股 MCP 化浪潮正在起量，与我们 cn-financial-scraper 镜像策略同路，建议占位；
3. **PyPortfolioOpt/Riskfolio-Lib**——卦象因子出来后的**组合与风控层**（现有内容全缺，旧报告已识别）；
4. **TradingAgents-CN 深化**——coach 已有页，不如把 a-stock-data 数据面接进去做成可跑 demo，比新开坑性价比高。

## 四、专项：Kronos × 玄学量化（旗舰课题）

玄龙堂框架说「卦=市场状态的压缩编码」；Kronos 的两阶段架构恰是这句话的机器学习实现：**分词器把多维 OHLCV 量化为分层离散标记，自回归 Transformer 在标记上预训练**。二者同构性带来的三个可做方向：

1. **Kronos-卦象对齐研究**：把分词器离散标记聚类/映射到八卦状态（标记序列→卦象序列），用其概率预测（温度/top_p/多路径采样）输出「变爻概率」——传统玄学量化的卦象规则就有了可学习的载体。
2. **卦象因子库**：以 Kronos 标记统计量（标记分布熵=市场混沌度、转移矩阵=卦变频率）构造因子，进 alphalens/Qlib 回测——满足「可证伪」的修行纪律。
3. **风险提示**：Kronos 作者自述是演示级而非生产级；large 版未开源；预测信号必须过组合优化与风险中性化（正好接补充建议 3）。

## 五、实施建议与实习生切分（4 人 × 2 周，矩阵调度）

> 原则：每条工作流独立交付、可验收、互不阻塞；跑批任务挂矩阵节点（Loong 主力 + 4 worker），实习生本地只需浏览器+SSH。

**W1 数据底座组**（技能：Python/爬虫基础）
- 任务：部署 `a-stock-data` + `easy-tdx` 到 Loong（参考 cn-financial-scraper 的 /data/loong-apps 范式），打通「日频历史+实时快照」双通道，出统一数据字典
- 交付：`/data/loong-apps/` 两个可运行部署 + 数据字典 md + 三个样例调用脚本
- 验收：任意 A 股代码一次命令出日 K/分钟 K/财报三件套

**W2 因子研究组**（技能：Python/pandas，量稍高）
- 任务：Kronos POC——venv 部署 Kronos-base，跑通上交所样例预测；实现「标记→卦象」映射脚本 v1；产出 5 个卦象统计因子
- 交付：kronos-poc 目录 + 因子定义文档 + 一次 alphalens 简版回测报告
- 验收：600977 样例复现 + 因子 IC 表（哪怕全不显著，如实报告）

**W3 Agent 应用组**（技能：Prompt 工程/CLI）
- 任务：精读 `Vibe-Research` 六阶段工作流与 `quantskills` 技能设计，为万丰CIO 舆情智察模块写 3 个新技能（个股体检/形态捕手/每日复盘——数据走 W1 底座）
- 交付：技能包（SKILL.md 范式）+ bench 脚本 + 与 intel 管理台的对接说明
- 验收：技能在矩阵任一节点 opencode/zcode 下一次命令出结果

**W4 内容与测评组**（技能：写作/运营）
- 任务：22 项测评整理成 coach 站点内容（P0/P1 各出深度页，P2 出合集页）；起草「玄学量化 × 基座模型」选题文章一篇（蹭 Kronos AAAI 热度）
- 交付：content/quant/ 新页面 6-8 篇 + 选题文案
- 验收：过 coach 站 drift guards（scripts/check_site.py）

**协同节奏**：W1 是 W2/W3 的上游，第一周前半集中攻 W1；每日站会同步到禅道/paperclip（沿用 Loong 工作流纪律）；全部产物推 Gitea 对应仓。

## 六、风险与合规

1. **数据合规**：easy-tdx/通达信协议属灰色地带，仅研究用途不商用分发；a-stock-data 各源遵守其 TOS，低频+缓存（沿用舆情智慰合规口径）
2. **许可证**：Sequoia-X 无 LICENSE（只借鉴）、quantskills 系 GPL-3.0（传染性，技能文档引用而非代码并入）、Sightflow 未标（观望）
3. **模型风险**：Kronos 演示级定位，任何预测信号不得直连实盘建议；gainlab 类信号带单业务**明确不做**（合规红线）
4. **人力**：W2 需要真正懂量化的人把关（建议 owner 或教练亲自Review 因子定义）

## 七、附录

- 矩阵派发记录：4 节点 × 5-6 项，deepseek-flash，平均 ~25 分钟/节点；openclaw 节点因补充搜索任务超时（35 分钟无产出被终止），其 4 项由 Loong 亲核补齐——**矩阵分工注意：2C2G 节点别派开放式搜索任务，清单式任务表现良好**
- 原始调研：`docs/quant-survey-2026-10/{hermes,xuan,wechat}/`（18 份项目报告 + 3 份 INDEX）
- 上篇报告：`docs/quant-ecosystem-research-2026-09.md`（生态全景与结构性空白）

---

## 八、执行结果补记（2026-10-07 当日矩阵实跑）

| 工作流 | 派发 | 实际 | 结果 |
|---|---|---|---|
| W1 数据底座 | Loong 本机 | ✅ 完成 | a-stock-data 冒烟（600519 日K+分钟K）；easy-tdx 已 clone 待盘中冒烟；/data/loong-apps/W1-DATA-README.md |
| W2 Kronos POC | Xuan 节点 | ❌ 权限墙×2 → **Loong 接管 ✅** | 管线跑通，三因子候选实测（见 quant-survey-2026-10/loong/W2 报告） |
| W3 三技能 | openclaw 节点 | ❌ 停滞 → **Loong 接管 ✅** | stock-checkup/daily-brief/sentiment-radar 三技能包（SKILL.md 范式，quant-survey-2026-10/skills/） |
| W4 内容 | 心马节点 | ❌ deepseek 服务端错误 ×2 → Loong 完成 | coach 站三页上线（kronos/a-stock-data/vibe-research，drift guards 全绿）+ 万丰视角意见书 |
| gainlab 立项 | hermes 节点 | ✅ 完成 | 商业模式研究报告（SPA 解包+API 侦察+合规红线，quant-survey-2026-10/hermes/） |

**矩阵调度经验（重要）**：①opencode 非交互默认权限墙会拒 git/pip 类操作——派发前设
`permission: {bash: allow}` 或改派清单型任务；②五节点共用一把 DEEPSEEK_API_KEY 有并发
限制（2C 节点两次撞服务端错误）——后续按节点配独立 key 或错峰派发；③2C2G 节点适合
清单型任务，开放式探索任务（openclaw 两轮均超时）留给 16C 节点或主力机。

**补充发现**：simonlin1212 生态还有 TradingAgents-astock（3.6k⭐ A股多Agent辩论）与
vibe-astock（658⭐ 短线复盘看板）——建议纳入 W4 内容页候补。
