export default {
  foundation: [
    { k: '万丰系统', d: '主动式 Agent 工作台 + 量化研究平台：行为诊断、策略压力测试、组合预检、审计留痕——家用主基地', tag: '自研基座' },
    { k: '27 个开源系统', d: 'vnpy、Qlib、FinRL、Backtrader、freqtrade、OpenBB、TradingAgents……逆向工程它们是最好的教材', tag: '开源基石' },
    { k: 'WorkBuddy 证券版', d: '从实践出发的第一站：从已有的优秀开源项目入手，AI 搭子随身带', tag: '实践入口' },
  ],
  reverse: [
    { t: '先用起来', d: '把工具装进自己的环境跑通一遍，先当用户，体验它解决什么问题、边界在哪里。' },
    { t: '拆开看结构', d: '用 Loong 拆解源码与架构：模块怎么分、数据怎么流、事件怎么传，画出骨架图。' },
    { t: '搬进自己的系统', d: '把值得借鉴的设计迁移到万丰系统或个人工作台里，改造成自己的组件。' },
    { t: '发布与复盘', d: '拆解结论整理成文章发布到公众号，形成公共知识，再按反馈复盘迭代。' },
  ],
  categories: [
    {
      name: '数据底座',
      icon: '🗄️',
      items: [
        { slug: 'pandadata', icon: '🐼', name: 'Pandadata × PandaAI', desc: '218 个金融数据接口 · 9 大数据域（A股/期货/期权/港美股/宏观/基金）。PandaAI 平台提供 Qube/Evo/OS 三层产品 + 多 Agent 协作，QuantSkills 140+ 量化技能生态。', meta: ['⭐ 数据底座', '📊 218 接口', '🤖 140+ Skills'], github: 'https://github.com/quantskills', why: '万丰课程的默认数据层，218 接口覆盖训练所需全数据域，先有数再谈量化。', fit: '数据' },
        { slug: 'openbb', icon: '📡', name: 'OpenBB', desc: '开源投资研究平台。Terminal 提供 600+ 命令（股票/期权/加密/外汇/宏观/固收），SDK 程序化访问，Platform 重构 + AI 金融分析师 Agent。', meta: ['📡 600+ 命令', '🔌 多数据源', '📊 AI Analyst'], github: 'https://github.com/OpenBB-finance/OpenBB', why: '600+ 命令的研究工作台范本，学开源项目怎么把多数据源组织成产品。', fit: '入门' },
        { slug: 'ccxt', icon: '🔗', name: 'ccxt', desc: '统一 API 库访问 100+ 加密货币交易所，多语言支持。freqtrade 的底层交易所对接层，REST + WebSocket。', meta: ['🔗 100+交易所', '🌐 7语言', '⭐ 43.6k'], github: 'https://github.com/ccxt/ccxt', why: '统一 API 抹平 100+ 交易所差异，是接口抽象设计的教科书案例。', fit: '数据' },
        { slug: 'dailystock', icon: '📈', name: 'Daily Stock Analysis', desc: '基于 Pandadata 数据的 A 股每日收盘深度分析报告，覆盖指数估值、市场宽度、行业热点、龙虎榜、资金流向等维度。', meta: ['📊 A 股', '🔍 深度分析'], github: '', why: '示范怎么把数据接口变成每日深度分析产出，数据到报告的完整小闭环。', fit: '数据' },
      ],
    },
    {
      name: '研究平台',
      icon: '🔬',
      items: [
        { slug: 'ricequant', icon: '📊', name: '米筐 RiceQuant', desc: '早期三大研究平台之一，数据质量最高，RQData 数据服务 + RQAlpha 回测引擎。未关停，战略转向机构服务，个人社区已收缩。', meta: ['📊 RQData', '⚙️ RQAlpha', '🏦 300+机构'], github: '', why: '数据质量标杆，RQData 与 RQAlpha 的分层设计值得借鉴其架构思想。', fit: '数据' },
        { slug: 'joinquant', icon: '🦐', name: '聚宽 JoinQuant', desc: '国内用户量最大、社区生态最好的量化研究/回测平台。在线 Jupyter + jqdatasdk，数据回溯 2005 年。实盘能力弱，需另接券商。', meta: ['📓 在线研究', '⚙️ 三档回测', '👥 社区最强'], github: '', why: '国内社区生态最好，从它的在线研究模式学「低门槛做研究」。', fit: '入门' },
        { slug: 'mindgo', icon: '🌸', name: '同花顺 SuperMind', desc: '同花顺旗下 AI 量化平台（2016 上线，2023 更名）。问财自然语言选股 + 秒级回测，数据回溯 2005 年，免费调用同花顺金融大数据。', meta: ['🧠 问财选股', '⚡ 0.29s 回测', '📊 2005 数据'], github: '', why: '自然语言选股加秒级回测，看 AI 如何降低量化上手门槛。', fit: '入门' },
        { slug: 'bigquant', icon: '🧠', name: 'BigQuant', desc: '成都宽邦科技的 AI 量化平台，拖拽式可视化 + 机器学习 + 自研 StockRanker 选股。免费社区版 + 付费会员，实盘间接对接券商。', meta: ['🧠 AI', '🖱️ 可视化', '🎯 StockRanker'], github: '', why: '拖拽式可视化加机器学习选股，是「无代码量化」路线的代表样本。', fit: '入门' },
        { slug: 'qlib', icon: '🧠', name: 'Qlib', desc: '微软亚洲研究院的 AI 量化投资平台，首个 AI 量化开源平台。Alpha158/360 因子库 + 20+ 论文模型，全链路一体化。', meta: ['🧠 47.4k★', '🔢 Alpha158/360', '🤖 20+模型'], github: 'https://github.com/microsoft/qlib', why: '微软AI量化全链路平台，Alpha158因子库是最佳拆解教材。', fit: 'Agent' },
      ],
    },
    {
      name: '回测框架',
      icon: '📐',
      items: [
        { slug: 'backtrader', icon: '📐', name: 'Backtrader', desc: '史上最流行的 Python 事件驱动回测框架，123 内置指标、17 分析器、多券商实盘。与 xtquant 组成「平民量化黄金搭档」。', meta: ['📐 123 指标', '⚙️ 事件驱动', '⭐ 22.8k'], github: 'https://github.com/mementum/backtrader', why: '事件驱动回测的事实标准，22.8k 星的架构值得逐行拆解。', fit: '回测' },
        { slug: 'vectorbt', icon: '🚀', name: 'Vectorbt', desc: 'NumPy/Numba/Rust 加速的向量化回测，把「数小时网格搜索」变成「几秒钟」。适合大规模参数寻优与快速验证。', meta: ['⚡ 100x+ 快', '🎯 参数扫描', '🚀 Rust'], github: 'https://github.com/polakowo/vectorbt', why: '向量化提速百倍以上，教你用工程手段把网格搜索变秒级。', fit: '回测' },
        { slug: 'zipline', icon: '📈', name: 'Zipline', desc: 'Quantopian 的美股事件驱动回测框架，标志性 Pipeline API 因子计算。原版停维，zipline-reloaded 续命。', meta: ['📐 Pipeline', '🇺🇸 美股', '⭐ 20k'], github: 'https://github.com/stefan-jansen/zipline-reloaded', why: 'Pipeline API 定义了因子计算范式，理解它是理解因子工程的前提。', fit: '回测' },
        { slug: 'alphalens', icon: '🎯', name: 'Alphalens', desc: 'Quantopian 的因子绩效分析工具，IC 信息系数、分层回测、换手率。alphalens-reloaded 续命，与 zipline/pyfolio 配套。', meta: ['🎯 IC', '📊 分层回测', '⭐ 4.4k'], github: 'https://github.com/stefan-jansen/alphalens-reloaded', why: 'IC 与分层回测是因子验证的标准动作，配 zipline 拆完即会评估因子。', fit: '回测' },
        { slug: 'simtradelab', icon: '🧪', name: 'SimTradeLab', desc: 'PTrade 事件驱动架构的本地回测框架，语法兼容，速度比 PTrade 平台快 100-160x。仅回测，不能实盘。', meta: ['🧪 327★', '⚡ 100-160x'], github: 'https://github.com/kay-ou/SimTradeLab', why: '与 PTrade 语法兼容的本地快回测，练策略不占券商资源。', fit: '回测' },
        { slug: 'hikyuu', icon: '🧩', name: 'Hikyuu', desc: '老牌 C++/Python 量化框架（2012 年起），系统化交易组件化设计（SYS/SG/MM/TM）。深度适配 A 股。', meta: ['🧩 3.4k★', '⚡ 秒级回测', '📊 A股'], github: 'https://github.com/fasiondog/hikyuu', why: '2012 年延续至今的组件化设计，A 股适配最深的老牌框架。', fit: '回测' },
      ],
    },
    {
      name: '实盘交易',
      icon: '🏎️',
      items: [
        { slug: 'vnpy', icon: '🐍', name: 'vnpy (VeighNa)', desc: '全球用户量最大的开源量化平台之一，国内实盘接口覆盖最全（CTP 等）。事件驱动 + Gateway/App 分离架构，4.0 起加入 AI 模块。', meta: ['🐍 44.4k★', '🔌 20+接口', '📦 15+模块'], github: 'https://github.com/vnpy/vnpy', why: '国内实盘接口覆盖最全，Gateway/App 分离架构是实盘系统设计必修课。', fit: '实盘' },
        { slug: 'wondertrader', icon: '🚀', name: 'WonderTrader', desc: 'C++ 核心的高性能量化框架，四引擎（CTA/SEL/HFT/UFT），UFT 纳秒级。M+1+N 多账户实盘架构，面向专业机构。', meta: ['⚡ <200ns', '🔧 四引擎', '🏢 机构级'], github: 'https://github.com/wondertrader/wondertrader', why: 'C++ 四引擎加纳秒级 UFT，看专业机构怎么压榨交易延迟。', fit: '实盘' },
        { slug: 'ptrade', icon: '🏦', name: '恒生 PTrade', desc: '恒生电子研发的券商级量化交易终端，云端托管 7×24 无人值守。Python 事件驱动 + 15+ 零代码工具，覆盖投研到实盘全流程，2025 年接入 DeepSeek。', meta: ['🏦 近40券商', '🐍 Python 3.11', '⚡ 毫秒级报单'], github: 'https://github.com/kay-ou/SimTradeLab', why: '券商级全流程终端接入 DeepSeek 生成策略，传统终端 AI 化的样本。', fit: '实盘' },
        { slug: 'qmt', icon: '🏎️', name: '迅投 QMT / MiniQMT', desc: '迅投的本地化极速交易终端，Python + VBA 双语言。MiniQMT 极简模式 + xtquant 库，可用任意 IDE 自由开发，唯一可做期货/期权的券商量化终端。', meta: ['🏎️ <1ms 报单', '🐍 xtquant', '📈 全品类'], github: 'https://github.com/quant-king299/EasyXT', why: 'MiniQMT 与 xtquant 打开本地自由开发之门，期货期权都能做。', fit: '实盘' },
        { slug: 'easyxt', icon: '🧩', name: 'EasyXT', desc: '基于 miniqmt/xtquant 的二次封装库，简化 QMT 量化开发。模块化设计，含回测框架与 101 因子平台。', meta: ['🧩 649★', '📐 回测框架'], github: 'https://github.com/quant-king299/EasyXT', why: 'xtquant 二次封装的社区样本，学怎么把难用的 API 变成顺手库。', fit: '实盘' },
        { slug: 'myquant', icon: '⛏️', name: '掘金 MyQuant', desc: '机构级 C++ 高性能回测，期货/CTA 能力四平台最强（CTP/OES 对接）。支持 Python/C++/C#/Matlab 四语言，本地运行代码保密。', meta: ['⛏️ 期货首选', '⚡ <1s 回测', '🌐 四语言'], github: '', why: '期货与 CTA 首选，C++ 高性能回测加四语言支持的机构级取舍。', fit: '实盘' },
      ],
    },
    {
      name: 'AI Agent',
      icon: '🤖',
      items: [
        { slug: 'finrobot', icon: '🤖', name: 'FinRobot', desc: '微软研究院支持的金融 AI Agent 平台。四层架构 + Financial CoT，三 Agent 研报流水线生成专业级研报。', meta: ['⭐ 7.7K+', '📊 4 层架构', '🤖 3 CoT Agent'], github: 'https://github.com/AI4Finance-Foundation/FinRobot', why: '三 Agent 研报流水线展示 CoT 在金融的落地，AI 研究员的活教材。', fit: 'Agent' },
        { slug: 'finrl', icon: '🎮', name: 'FinRL', desc: '哥伦比亚大学 AI4Finance 团队的深度强化学习量化框架。PPO/SAC/TD3 等 DRL 算法，三层架构，FinRL-X/DeepSeek 生态。', meta: ['🎮 16k★', '🤖 6+算法', '🏫 教学'], github: 'https://github.com/AI4Finance-Foundation/FinRL', why: '深度强化学习量化框架，DRL 自动交易的标准起点与教学范本。', fit: 'Agent' },
        { slug: 'tradingagents-cn', icon: '💹', name: 'TradingAgents-CN', desc: 'TradingAgents 中文增强版。模拟专业交易机构，7-8 个专业角色（分析师/研究员/交易员/风控/资金经理）协作决策，支持 A股/港股/美股 + 国产 LLM。', meta: ['👥 7-8 Agent', '🇨🇳 中文市场', '🐳 国产 LLM'], github: 'https://github.com/hsliuping/TradingAgents-CN', why: '七八个专业角色协作决策，国产 LLM 可跑，多智能体分工教材。', fit: 'Agent' },
        { slug: 'dojoagents', icon: '🥋', name: 'DojoAgents', desc: '深涌智能开源的主动式 AI Agent 框架。Loop-Driven 认知组合智能体，主动推进研究与决策而非被动问答，支持全市场扫描、持仓诊断。', meta: ['✅ v0.2.3 本机核验', '🥋 Agent 循环', '📊 四柱仪表盘'], github: 'https://github.com/Alpha-Dojo/DojoAgents', why: '主动式认知循环框架，与万丰自进化系统目标同向，重点拆解对象。', fit: 'Agent' },
      ],
    },
    {
      name: '一体化终端',
      icon: '🧰',
      items: [
        { slug: 'freqtrade', icon: '🪙', name: 'freqtrade', desc: '开源加密货币算法交易机器人，Python 策略 + 回测 + Hyperopt 优化 + 实盘全链路。底层依赖 CCXT 支持 100+ 交易所，内置 freqAI 机器学习。', meta: ['🪙 53.3k★', '⚙️ 100+交易所', '🧠 freqAI'], github: 'https://github.com/freqtrade/freqtrade', why: '回测优化实盘全链路自托管，53.3k 星的加密机器人标准品。', fit: '实盘' },
        { slug: 'quantdinger', icon: '🔔', name: 'QuantDinger AI', desc: '将 AI 投研、Python Strategy API V2、回测、模拟/实盘与监控统一到一套自托管系统。代码覆盖 IBKR、Alpaca 与六家加密交易所，可通过 Agent Gateway 和 MCP 接入 Cursor、Claude Code。', meta: ['✅ 11 服务本机核验', '🐳 Docker Compose', '🛡️ 默认模拟盘优先'], github: 'https://github.com/OpenByteInc/QuantDinger', why: '投研回测实盘监控一套打尽，还示范 MCP 接入编程 Agent。', fit: '实盘' },
      ],
    },
  ],
}
