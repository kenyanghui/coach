#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""coach 站 quant 新页批量生成器 v2（今天矩阵调研的项目全覆盖 + 技能仓库专页）"""
import re

TPL = open('content/quant/alphalens.html', encoding='utf-8').read()
SKELETON = TPL[:TPL.index('</nav>') + len('</nav>')]
FOOT_SCRIPT = TPL[TPL.index('<footer>'):]


def _nav(name):
    return (f'<nav class="top-nav">\n  <a href="index.html" class="nav-home"><span class="dot"></span> '
            f'量化工具总览 · {name}</a>\n  <div class="nav-links">\n'
            f'    <a href="#overview">总览</a><a href="#features">核心能力</a><a href="#usage">我们怎么用</a>'
            f'<a href="#limits">边界</a><a href="index.html">◂ 总览</a>\n  </div>\n</nav>')


def feature(label, text):
    return (f'<div class="feature-box"><div class="feature-box-label">{label}</div>'
            f'<p>{text}</p></div>')


def table(rows, header=None):
    header = header or ['属性', '详情']
    trs = ''.join('<tr>' + ''.join(f'<td>{c}</td>' for c in r) + '</tr>' for r in rows)
    ths = ''.join(f'<th>{h}</th>' for h in header)
    return f'<table class="data-table"><tr>{ths}</tr>{trs}</table>'


def grid(cards):
    inner = ''
    for icon, name, en, methods in cards:
        ms = ''.join(f'<span class="domain-method">{m}</span>' for m in methods)
        inner += (f'<div class="domain-card"><div class="domain-header"><span class="domain-icon">{icon}</span>'
                  f'<div><div class="domain-name">{name}</div><span class="domain-count">{en}</span></div></div>'
                  f'<div class="domain-methods">{ms}</div></div>')
    return f'<div class="domain-grid">{inner}</div>'


def build(name, hero, sections):
    stats = ''.join(f'<div class="hero-stat"><span class="num">{s[0]}</span><span class="label">{s[1]}</span></div>'
                    for s in hero['stats'])
    body = [f'''\n<section class="hero">
  <div class="hero-badge">{hero['badge']}</div>
  <h1>{hero['h1']}</h1>
  <div class="subtitle">{hero['sub']}</div>
  <p class="hero-desc">{hero['desc']}</p>
  <div class="hero-stats">{stats}</div>
  <div class="hero-scroll">向下探索</div>
</section>
<div class="section-divider"><hr></div>
''']
    for i, sec in enumerate(sections):
        alt = ' section-alt' if i % 2 else ''
        body.append(f'''\n<section class="section{alt}" id="{sec['id']}">
  <div class="section-label">{sec['label']}</div>
  <h2>{sec['h2']}</h2>
  <p class="section-sub">{sec['sub']}</p>
{sec['inner']}
</section>
<div class="section-divider"><hr></div>
''')
    html = SKELETON.replace(re.search(r'<nav class="top-nav">[\s\S]*?</nav>', SKELETON).group(0), _nav(name))
    return html + ''.join(body) + FOOT_SCRIPT


PAGES = {}
PAGES['tradingagents'] = ('TradingAgents', dict(
    badge='TRADINGAGENTS · 多智能体交易研究框架', h1='TradingAgents', sub='多智能体 LLM 交易研究 · Apache-2.0',
    desc='110k Star · 分析师/研究员/交易员/风控 多角色辩论决策<br>范式参考价值极高 · A 股数据面需自接',
    stats=[('110k', 'GitHub Stars'), ('Apache', '2.0 许可'), ('多角色', '辩论式架构'), ('LLM', '多模型支持')]), [dict(id='overview', label='项目总览', h2='什么是 TradingAgents？',
          sub='把一家对冲基金的研究流程装进多智能体',
          inner=feature('核心定位',
              '<strong>TradingAgents</strong> 用多个 LLM 角色模拟交易机构：基本面/情绪/新闻/技术分析师收集情报，'
              '<strong> bull/bear 研究员辩论</strong>，交易员决策，风控终审——辩论式结构是它的灵魂。'
              '（注：coach 站已有 <a href="tradingagents-cn.html">TradingAgents-CN</a> 国产复刻页，本页为原版。）') +
          table([('仓库', '<a href="https://github.com/TauricResearch/TradingAgents" target="_blank">TauricResearch/TradingAgents</a> · 110k Star'),
                 ('许可证', '<code>Apache-2.0</code>'),
                 ('依赖', 'LLM API（OpenAI/Anthropic/Ollama）+ 数据 API（finnhub 等，西方源）')])), dict(id='features', label='核心能力', h2='辩论式多智能体',
        sub='决策质量来自观点冲突',
        inner=grid([
            ('🔍', '分析师团队', 'Analysts', ['基本面', '情绪', '新闻', '技术面']),
            ('⚖️', '研究员辩论', 'Bull vs Bear', ('多轮对抗', '共识形成')),
            ('💼', '交易员', 'Trader', ('仓位决策', '时点选择')),
            ('🛡️', '风控终审', 'Risk', ('组合视角', '一票否决')),
        ])), dict(id='usage', label='我们怎么用', h2='学架构，不直接用',
         sub='万丰「AI 量化团队」人设的工程蓝图',
         inner=feature('三个学习点（万丰视角）',
             '① <strong>辩论结构</strong>——舆情智察的机构分析可以引入 bull/bear 对抗减少单一视角偏见；'
             '② <strong>角色分工</strong>——万丰「教练/分析师/风控」的人设体系可对标其角色卡；'
             '③ <strong>A 股化路径</strong>——社区已有 TradingAgents-astock（3.6k⭐，同作者生态）与 TradingAgents-CN：'
             '数据面接 a-stock-data/龙虎榜即国产化。')), dict(id='limits', label='边界', h2='研究范式，非生产系统',
         sub='成本与数据面是两道坎',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">边界</span>', 'LLM 成本', '多角色多轮辩论，单次研究消耗可观的 token'),
                      ('<span class="tag tag-red">边界</span>', '西方数据源', 'A 股需自接数据（a-stock-data/akshare）'),
                      ('<span class="tag tag-green">价值</span>', '架构参考', '多智能体协作的教科书实现')]),
)])
PAGES['quantaxis'] = ('QUANTAXIS', dict(
    badge='QUANTAXIS · 全链路量化框架', h1='QUANTAXIS', sub='A 股/期货/期权全链路 · MIT · Rust 加速',
    desc='11.3k Star · 数据/回测/分析/实盘全覆盖 · 中文量化老牌重装',
    stats=[('11.3k', 'GitHub Stars'), ('MIT', '许可'), ('全市场', '股期期权'), ('Rust', '加速层')]), [dict(id='overview', label='项目总览', h2='什么是 QUANTAXIS？',
          sub='中文世界最完整的开源量化基建之一',
          inner=feature('核心定位',
              '<strong>QUANTAXIS</strong>：覆盖数据获取（股票/期货/期权/宏观）、存储（MongoDB）、回测、'
              '因子分析、实盘对接的全链路框架。社区版多年沉淀，A 股场景打磨充分。') +
          table([('仓库', '<a href="https://github.com/QUANTAXIS/QUANTAXIS" target="_blank">QUANTAXIS/QUANTAXIS</a> · 11.3k Star'),
                 ('许可证', '<code>MIT</code>'),
                 ('形态', 'Python 框架 + MongoDB 存储 + Rust 加速计算'),
                 ('注意', '架构偏重：整栈部署需 MongoDB 与较重运维')])), dict(id='features', label='核心能力', h2='模块化全链路',
        sub='只拆需要的模块，不必整栈',
        inner=grid([
            ('📥', '数据', 'Data', ('股票', '期货期权', '财务', '指数')),
            ('🧮', '回测', 'Backtest', ('日频', '分钟', '账户模拟')),
            ('📊', '分析', 'Analytics', ('因子', '绩效', '风险')),
            ('🔌', '实盘', 'Trade', ('QMT/掘金', '券商通道')),
        ])), dict(id='usage', label='我们怎么用', h2='拆件使用，不整栈部署',
         sub='万丰视角',
         inner=feature('取用建议',
             '矩阵算力充足但运维人手有限——<strong>建议只拆其数据抓取模块与回测引擎</strong>做交叉验证源'
             '（与 a-stock-data/akshare 三方互验），实盘与存储层不引入（MongoDB 运维成本与万丰 SQLite 轻量栈冲突）。')), dict(id='limits', label='边界', h2='重装框架的两面',
         sub='能力全 = 维护重',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-green">优点</span>', '能力全', '中文文档全，A 股场景打磨久'),
                      ('<span class="tag tag-red">边界</span>', '重', 'MongoDB 依赖、整栈学习曲线陡'),
                      ('<span class="tag tag-red">边界</span>', '版本碎片', '社区分支多，升级路径需自行评估')]),
)])
PAGES['sequoia-x'] = ('Sequoia-X', dict(
    badge='SEQUOIA-X · A股自动分析', h1='Sequoia-X', sub='轻量 A 股技术形态选股 · README 自称 MIT',
    desc='7.9k Star · 开箱即用 · 多形态扫描 + 推送',
    stats=[('7.9k', 'GitHub Stars'), ('多形态', '技术选股'), ('轻量', '开箱即用'), ('推送', '飞书通知')]), [dict(id='overview', label='项目总览', h2='什么是 Sequoia-X？',
          sub='轻量级 A 股技术形态自动分析',
          inner=feature('核心定位',
              '<strong>Sequoia-X</strong>：对全市场 A 股做技术形态扫描（突破/回踩/放量等预设形态），'
              '开箱即用出选股结果，支持推送通知。适合作为「形态监控」的参考实现。') +
          table([('仓库', '<a href="https://github.com/sngyai/Sequoia-X" target="_blank">sngyai/Sequoia-X</a> · 7.9k Star'),
                 ('许可证', '⚠️ README 自称 MIT 但<strong>仓库无 LICENSE 文件</strong>——商用前需联系作者'),
                 ('形态', 'Python，数据走 akshare/tushare 系')])), dict(id='features', label='核心能力', h2='形态扫描器',
        sub='小而美',
        inner=grid([
            ('📈', '形态库', 'Patterns', ('突破', '回踩', '放量', '缩量')),
            ('🗓️', '定时', 'Schedule', ('盘后扫描', '推送')),
            ('📲', '通知', 'Notify', ('飞书', '邮件')),
        ])), dict(id='usage', label='我们怎么用', h2='借鉴实现，勿直接并入',
         sub='万丰视角',
         inner=feature('取用建议',
             '形态定义逻辑可参考（与我们「卦象=状态编码」思路互补：形态是图形学编码，卦象是状态机编码）；'
             '推送链路可对照。因无 LICENSE 文件，<strong>只读实现思想，不复制代码</strong>进万丰。')), dict(id='limits', label='边界', h2='无许可证是硬伤',
         sub='学术参考友好，商用不友好',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">风险</span>', '无 LICENSE', '默认保留所有权利，商用需授权'),
                      ('<span class="tag tag-green">价值</span>', '轻量', '单机可跑，是学习形态扫描的最短路径')]),
)])
PAGES['alphagbm-skills'] = ('AlphaGBM Skills', dict(
    badge='ALPHAGBM/SKILLS · 投研技能包', h1='AlphaGBM Skills', sub='美股/期权研究工作流 · MIT · 活跃',
    desc='5.8k Star · 27+ Claude/Cursor 技能 · 方法论可平移 A 股',
    stats=[('5.8k', 'GitHub Stars'), ('27+', '技能数'), ('MIT', '许可'), ('昨日', '仍在更新')]), [dict(id='overview', label='项目总览', h2='什么是 AlphaGBM/skills？',
          sub='技能化投研工作流的头部样本',
          inner=feature('核心定位',
              '<strong>AlphaGBM/skills</strong>：面向 Claude Code/Cursor 的投研技能包（27–29 个），'
              '覆盖美股/期权的研究 workflow——从取数、分析到报告生成，每个技能一个目录 '
              '（SKILL.md 范式）。昨日在更新，是「技能化投研」赛道活跃度最高的仓库之一。') +
          table([('仓库', '<a href="https://github.com/AlphaGBM/skills" target="_blank">AlphaGBM/skills</a> · 5.8k Star'),
                 ('许可证', '<code>MIT</code>'),
                 ('适配', 'Claude Code / Cursor / 支持 SKILL.md 的 agent（zcode/opencode 可用）')])), dict(id='features', label='核心能力', h2='技能化工作流',
        sub='每个技能 = 独立可组合的研究步骤',
        inner=grid([
            ('🇺🇸', '美股研究', 'US Stocks', ('财报季', '个股深研')),
            ('📐', '期权', 'Options', ('策略分析', '定价')),
            ('📝', '报告', 'Reports', ('自动生成', '模板化')),
            ('🔗', '组合', 'Workflow', ('技能串联', '一句话调度')),
        ])), dict(id='usage', label='我们怎么用', h2='方法论平移 A 股',
         sub='万丰视角',
         inner=feature('取用建议',
             '数据面（美股/期权）不适配我们，但<strong>「把研究步骤拆成技能」的工程范式完全可平移</strong>——'
             'W3 实习生的三个舆情技能（体检/复盘/雷达）就是按此范式。建议精读其 2-3 个代表技能的 '
             'SKILL.md 写法（触发词设计/输出契约），升级我们自己的技能包。')), dict(id='limits', label='边界', h2='生态位',
         sub='与 quantskills 的区别',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">边界</span>', '市场', '美股/期权为主，A 股原生支持弱'),
                      ('<span class="tag tag-green">价值</span>', '范式样本', '技能化投研的活跃头部，工程质量高')]),
)])
PAGES['quantskills'] = ('QuantSkills', dict(
    badge='QUANTSKILLS · 技能组织', h1='QuantSkills', sub='214 资产 / 10 分类 · A 股技能生态',
    desc='org 2.4k Star · 个股体检/复盘/形态捕手 · GPL 系注意',
    stats=[('2.4k', 'org Stars'), ('214', '资产数'), ('A 股', '原生适配'), ('GPL', '部分许可')]), [dict(id='overview', label='项目总览', h2='什么是 QuantSkills？',
          sub='A 股投研技能的组织化容器',
          inner=feature('核心定位',
              '<strong>quantskills</strong> 组织（github.com/quantskills）把 A 股投研动作拆成技能：'
              '个股体检（真身 skill-a-share-stock-dossier）、市场复盘（skill-daily-report）、'
              '形态捕手（skill-xingtai-catcher，文字/截图/手绘图搜相似 K 线形态，MCP 形态）等，214 个资产分 10 类。') +
          table([('入口', '<a href="https://github.com/quantskills" target="_blank">github.com/quantskills</a> · org 2.4k Star'),
                 ('许可', '⚠️ 混合：多数 <code>GPL-3.0</code>（传染性），部分未声明——<strong>引用思想、不并代码</strong>'),
                 ('A 股', '原生：龙虎榜/涨停池/板块等语境齐全')])), dict(id='features', label='核心能力', h2='三个代表技能',
        sub='与万丰舆情智察直接对话',
        inner=grid([
            ('🩺', '个股体检', 'Dossier', ('基本面', '消息面', '风险扫描')),
            ('🗓️', '每日复盘', 'Daily Report', ('跨市场', '宽度指标')),
            ('形态特征', '形态捕手', 'Xingtai Catcher', ('图搜形态', 'MCP', '手绘匹配')),
        ])), dict(id='usage', label='我们怎么用', h2='竞品与灵感来源',
         sub='万丰视角',
         inner=feature('取用建议',
             '体检/复盘与 W3 技能高度同质——<strong>逐条对比他们的输出结构</strong>，取长补短后做出差异化'
             '（我们有舆情智察网关与矩阵跑批）；形态捕手的「图搜形态」与玄学量化「观象」直接对应，'
             'MCP 形态值得接入试用（GPL：单独进程调用，不并库）。')), dict(id='limits', label='边界', h2='许可与依赖',
         sub='引用规范',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">许可</span>', 'GPL-3.0', '代码传染——只独立进程调用/引用思想'),
                      ('<span class="tag tag-red">边界</span>', '抓取依赖', '部分技能依赖三方云服务，稳定性自评'),
                      ('<span class="tag tag-green">价值</span>', 'A 股语境', '技能设计的最佳参考库')]),
)])
PAGES['easy-tdx'] = ('easy-tdx', dict(
    badge='EASY-TDX · 通达信行情', h1='easy-tdx', sub='通达信 TCP 协议 Python SDK · MIT',
    desc='在线实时行情 + 离线本地数据 · A股/港美/期货 · 免费',
    stats=[('MIT', '许可'), ('TCP', '协议直连'), ('免费', '无 key'), ('全市场', 'A+港美+期货')]), [dict(id='overview', label='项目总览', h2='什么是 easy-tdx？',
          sub='免费实时行情的工程正路',
          inner=feature('核心定位',
              '<strong>easy-tdx</strong>（clong365/easy_tdx，另有 yanwei99521/easy-tdx 等分支）：'
              '通达信行情协议的 Python SDK——在线实时 K 线/盘口 + 通达信官网全市场盘后包离线读取，'
              '全面优化接口。免费、无需 key。') +
          table([('主实现', '<a href="https://github.com/clong365/easy_tdx" target="_blank">clong365/easy_tdx</a> · 65 Star'),
                 ('许可证', '<code>MIT</code>（README 声明）'),
                 ('部署', 'Loong /data/loong-apps/easy-tdx（已克隆，待盘中冒烟）'),
                 ('合规', '协议级接入，仅研究用途，不高频不商用分发')])), dict(id='features', label='核心能力', h2='实时 + 离线双通道',
        sub='与 a-stock-data 互补',
        inner=grid([
            ('⚡', '在线行情', 'Live', ('实时K线', '盘口', '分时')),
            ('📦', '离线包', 'Local', ('官网盘后包', '全市场')),
            ('🌍', '扩展市场', 'Markets', ('港股', '美股', '期货')),
        ])), dict(id='usage', label='我们怎么用', h2='W1 底座的实时通道',
         sub='万丰视角',
         inner=feature('取用建议',
             'a-stock-data 的腾讯源是日线级为主，<strong>盘中实时快照由 easy-tdx 补位</strong>——'
             '舆情智察未来加「盘中异动提示」时用它。通达信官方服务器，合规面比爬搜索页干净。')), dict(id='limits', label='边界', h2='协议级接入口径',
         sub='研究用途',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">合规</span>', '仅研究', '不商用分发数据，不高频打服务器'),
                      ('<span class="tag tag-red">边界</span>', '主实现star低', '65 Star（个人维护），关键路径做双源冗余')]),
)])
PAGES['anthropic-financial-services'] = ('Anthropic FS', dict(
    badge='ANTHROPIC/FINANCIAL-SERVICES · 官方 FSI 方案', h1='Financial Services', sub='Anthropic 官方金融服务参考 · Apache-2.0',
    desc='38.9k Star · 智能体/技能/MCP 参考 · 合规工程范式',
    stats=[('38.9k', 'GitHub Stars'), ('Apache', '2.0'), ('官方', 'Anthropic 出品'), ('FSI', '金融场景')]), [dict(id='overview', label='项目总览', h2='这是什么？',
          sub='不面向 A 股，但工程范式值得抄',
          inner=feature('核心定位',
              '<strong>anthropics/financial-services</strong>：Anthropic 官方的金融服务行业方案仓——'
              '智能体配置、Claude 技能、MCP 服务器参考实现。展示「金融场景 × Claude 生态」的合规工程化做法。') +
          table([('仓库', '<a href="https://github.com/anthropics/financial-services" target="_blank">anthropics/financial-services</a> · 38.9k Star'),
                 ('许可证', '<code>Apache-2.0</code>'),
                 ('定位', '参考方案（非产品）；西方市场与监管语境')])), dict(id='features', label='核心能力', h2='可抄的三层',
        sub='范式而非代码',
        inner=grid([
            ('🤖', '智能体配置', 'Agents', ('角色卡', '权限边界')),
            ('🧩', '技能工程', 'Skills', ('SKILL.md', '触发词', '输出契约')),
            ('🔌', 'MCP 接入', 'MCP', ('数据源网关', '审计')),
        ])), dict(id='usage', label='我们怎么用', h2='万丰内容网关的对标',
         sub='万丰视角',
         inner=feature('取用建议',
             '万丰舆情智察 + 内容网关的「数据源→技能→审计」链路与它同构。<strong>重点抄它的权限边界与审计设计</strong>——'
             '金融数据源的接入审计是种子用户会问的合规问题。A 股数据面零帮助。')), dict(id='limits', label='边界', h2='生态位',
         sub='参考不依赖',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">边界</span>', '语境', '美国市场与监管；无 A 股数据'),
                      ('<span class="tag tag-green">价值</span>', '官方背书', '技能/MCP 工程的最佳实践样本')]),
)])
PAGES['financial-machine-learning'] = ('Financial ML', dict(
    badge='FINANCIAL-MACHINE-LEARNING · 资源清单', h1='Financial ML', sub='金融机器学习资源精选 · 选型雷达',
    desc='8.8k Star · 论文/库/书籍/数据集 · 偏西方市场',
    stats=[('8.8k', 'GitHub Stars'), ('清单', '无可集成代码'), ('ML', '金融应用'), ('学术', '论文向')]), [dict(id='overview', label='项目总览', h2='这是什么？',
          sub='当选型雷达用',
          inner=feature('核心定位',
              '<strong>firmai/financial-machine-learning</strong>：金融机器学习资源精选清单（论文/库/课程/数据集）。'
              '无可集成代码，偏西方市场与学术前沿——当<strong>研究选型雷达</strong>用，不进工程。') +
          table([('仓库', '<a href="https://github.com/firmai/financial-machine-learning" target="_blank">firmai/financial-machine-learning</a> · 8.8k Star'),
                 ('许可证', '无'),
                 ('用法', '查文献/找库的入口页')])), dict(id='features', label='核心内容', h2='雷达价值',
        sub='按需检索',
        inner=grid([
            ('📚', '论文', 'Papers', ('因子挖掘', '组合优化', 'NLP 金融')),
            ('🧰', '库', 'Libraries', ('特征工程', '回测', '风险管理')),
            ('🎓', '课程', 'Courses', ('ML 金融', '时间序列')),
        ])), dict(id='usage', label='我们怎么用', h2='W2 的文献入口',
         sub='万丰视角',
         inner=feature('取用建议',
             'Kronos 卦象因子做完后要「防过拟合」——这份清单里的交叉验证/样本外检验文献正好是理论武器库。')), dict(id='limits', label='边界', h2='清单形态',
         sub='无工程价值',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">边界</span>', '无代码', '纯链接清单；西方语境重'),
                      ('<span class="tag tag-green">价值</span>', '广度', '金融 ML 全景一页看全')]),
)])
PAGES['deeptutor'] = ('DeepTutor', dict(
    badge='HKUDS/DEEPTUTOR · 文档学习 Agent', h1='DeepTutor', sub='港大 · 多引擎 RAG · Apache-2.0',
    desc='40.9k Star · 文档问答/知识库 · 投研知识管理候选',
    stats=[('40.9k', 'GitHub Stars'), ('Apache', '2.0'), ('RAG', '多引擎'), ('港大', 'HKUDS 出品')]), [dict(id='overview', label='项目总览', h2='什么是 DeepTutor？',
          sub='不是行情工具，是知识管理工具',
          inner=feature('核心定位',
              '<strong>DeepTutor</strong>（港大 HKUDS）：终身个性化学习 Agent——文档上传、多引擎 RAG 问答、'
              '知识要点提炼。与行情无关；<strong>投研知识库/研报问答</strong>是它的正确用法。') +
          table([('仓库', '<a href="https://github.com/HKUDS/DeepTutor" target="_blank">HKUDS/DeepTutor</a> · 40.9k Star'),
                 ('许可证', '<code>Apache-2.0</code>'),
                 ('栈', 'Python + Next.js + 多引擎 RAG + MCP')])), dict(id='features', label='核心能力', h2='文档智能',
        sub='研报库的另一种打开方式',
        inner=grid([
            ('📄', '文档上传', 'Ingest', ('PDF', '多格式')),
            ('🔍', 'RAG 问答', 'QA', ('多引擎', '引用溯源')),
            ('🧠', '要点提炼', 'Summary', ('学习卡', '知识图谱')),
        ])), dict(id='usage', label='我们怎么用', h2='与 WeKnora 的关系',
         sub='万丰视角',
         inner=feature('取用建议',
             '万丰已有 WeKnora（一租户一 KB）承担知识库。<strong>DeepTutor 当对照样本</strong>：'
             '其多引擎 RAG 的评测思路可借鉴；不重复建库。研报问答若 WeKnora 不够用再评估。')), dict(id='limits', label='边界', h2='生态位',
         sub='学习工具',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">边界</span>', '非行情', '无任何行情/交易能力'),
                      ('<span class="tag tag-green">价值</span>', '成熟', '40k 级活跃项目，RAG 工程参考')]),
)])
PAGES['annual-report-extractor'] = ('年报抽取', dict(
    badge='BULK-ANNUAL-REPORT-EXTRACTOR · 年报分析', h1='年报批量抽取', sub='公司年报 LLM 信息抽取 · MIT',
    desc='Agent Skill + DeepSeek · 基本面面板的低成本供给',
    stats=[('Gitee', '主仓库'), ('MIT', '许可'), ('DeepSeek', '驱动'), ('太新', '需自测')]), [dict(id='overview', label='项目总览', h2='这是什么？',
          sub='「下卦为体＝基本面」的数据供给',
          inner=feature('核心定位',
              '<strong>bulk-annual-report-extractor</strong>（gitee.com/ceheps）：批量对公司年报做 LLM 信息抽取'
              '（Agent Skill 形态，DeepSeek 驱动），产出结构化基本面要点。') +
          table([('仓库', '<a href="https://gitee.com/ceheps/bulk-annual-report-extractor" target="_blank">gitee.com/ceheps</a> · MIT'),
                 ('形态', 'Skill + Python'),
                 ('成熟度', '⚠️ 太新（2026-06 更新），需自测抽取质量')])), dict(id='features', label='核心能力', h2='年报 → 结构化',
        sub='财务摘要/经营讨论/风险因子',
        inner=grid([
            ('📚', '批量解析', 'Bulk', ('年报 PDF', '多公司')),
            ('🤖', 'LLM 抽取', 'Extract', ('DeepSeek', '要点结构化')),
            ('📊', '面板化', 'Panel', ('纵向对比', '横向对比')),
        ])), dict(id='usage', label='我们怎么用', h2='卦象「体」的基本面侧写',
         sub='万丰视角',
         inner=feature('取用建议',
             '玄学量化框架里「下卦为体＝基本面」——该项目可把年报批量变成面板数据，供卦象因子'
             '叠加基本面过滤（如：高危卦象 + 抽取出风险表述 → 降权）。先抽 10 家公司人工核对抽取质量再放量。')), dict(id='limits', label='边界', h2='自测先行',
         sub='新项目风险',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">风险</span>', '太新', '无大规模使用背书；LLM 幻觉需抽检'),
                      ('<span class="tag tag-green">价值</span>', '低成本', 'DeepSeek 驱动，抽一家年报成本极低')]),
)])
PAGES['cnfinancialscraper'] = ('cn-financial-scraper', dict(
    badge='CN-FINANCIAL-SCRAPER · 舆情智察引擎', h1='cn-financial-scraper', sub='中国大陆金融数据爬取分析 · MIT · 已接入万丰',
    desc='2334 机构 / 43 大类 / 68 媒体源 / 79 MCP 工具 · 已镜像',
    stats=[('v10.0', '技能版本'), ('2334', '机构库'), ('68', '媒体源'), ('79', 'MCP 工具')]), [dict(id='overview', label='项目总览', h2='这是什么？',
          sub='万丰舆情智察的数据引擎（已部署）',
          inner=feature('核心定位',
              '<strong>cn-financial-scraper</strong>（JinDaGe 平台分发，MIT）：中国大陆金融数据爬取与分析一体化'
              '技能包。三轨架构：爬取调度 / 网页操作（Shadow DOM/验证码 OCR）/ MCP 数据获取。') +
          table([('镜像', '<a href="http://39.108.95.179:3000/Loong/cnfinancialscraper" target="_blank">Loong/cnfinancialscraper</a>（git 快照对冲上游单点）'),
                 ('接入', '万丰网关第 4 能力后台「舆情智察」：<code>/api/intel/news</code> + <code>/api/intel/sentiment</code>'),
                 ('管理台', '<a href="http://39.108.95.179:9031/demo/intel" target="_blank">演示实例 :9031/demo/intel</a>（全量真数据+真配置）')])), dict(id='features', label='核心能力', h2='双轨实况',
        sub='如实标注（机房 IP 实测）',
        inner=grid([
            ('📰', '新闻轨', 'akshare', ('东财结构化', '机房IP可用', '生产就绪')),
            ('🌐', '搜索轨', '60+源', ('全网舆情', '反爬受限', '试点')),
            ('🔌', 'MCP 轨', '79 工具', ('Tushare等', '暂不接入网关')),
        ])), dict(id='usage', label='研究档案', h2='深度报告',
         sub='架构/风险/契合全分析',
         inner=feature('档案位',
             '研究报告 + 镜像说明见 Loong Gitea <code>Loong/cnfinancialscraper</code>（RESEARCH.md）。'
             '合规口径：公开数据接口轨 + 低频缓存；代理池/OCR 轨默认不启用。')), dict(id='limits', label='边界', h2='上游单点',
         sub='镜像即对冲',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">风险</span>', '平台分发', '无 git 上游，作者弃更即断供——镜像即保险'),
                      ('<span class="tag tag-red">风险</span>', '注入面', 'MCP 工具接入需评审（工具描述是 prompt 载体）')]),
)])
PAGES['tradingagents-astock'] = ('TradingAgents-astock', dict(
    badge='TRADINGAGENTS-ASTOCK · A股多Agent', h1='TradingAgents-astock', sub='A 股数据源适配 · 7 位分析师辩论',
    desc='3.6k Star · 龙虎榜/游资/解禁语境 · 同作者生态',
    stats=[('3.6k', 'GitHub Stars'), ('7', '分析师角色'), ('A 股', '原生语境'), ('同作者', 'a-stock-data')]), [dict(id='overview', label='项目总览', h2='这是什么？',
          sub='TradingAgents 的 A 股正确打开方式',
          inner=feature('核心定位',
              '<strong>TradingAgents-astock</strong>（simonlin1212，a-stock-data 同作者）：把 TradingAgents 的'
              '多智能体辩论架构适配 A 股规则——龙虎榜/游资/解禁等 7 位分析师基于 A 股语境辩论决策。') +
          table([('仓库', '<a href="https://github.com/simonlin1212/TradingAgents-astock" target="_blank">simonlin1212/TradingAgents-astock</a> · 3.6k Star'),
                 ('关系', 'TradingAgents 原版（110k）的 A 股特化；数据面走 a-stock-data')])), dict(id='features', label='核心能力', h2='A 股规则化',
        sub='西方框架的本土化改造样本',
        inner=grid([
            ('🐉', '龙虎榜', 'Dragon List', ('游资动向', '席位追踪')),
            ('🔒', '解禁', 'Unlock', ('限售解禁', '减持语境')),
            ('⚖️', '辩论', 'Debate', ('7 分析师', 'A股规则')),
        ])), dict(id='usage', label='我们怎么用', h2='多 Agent 对照实验',
         sub='万丰视角',
         inner=feature('取用建议',
             '与 Vibe-Research（单 Agent 工作流）组成对照组：万丰舆情智察未来的「深度研究」模式，'
             '先跑单 Agent 工作流，再评估是否引入多 Agent 辩论（成本换质量）。')), dict(id='limits', label='边界', h2='成本注意',
         sub='LLM 消耗大',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">成本</span>', '多 Agent', '7 角色 × 多轮 = token 消耗数倍'),
                      ('<span class="tag tag-green">价值</span>', '语境', 'A 股特有数据源的 agent 化样本')]),
)])
PAGES['skills-hub'] = ('投研技能仓库', dict(
    badge='SKILLS HUB · 投研技能生态', h1='投研技能仓库', sub='AI 投研正在「技能化」· 我们的全景与实践',
    desc='SKILL.md 范式 · 技能 = 独立可组合的研究步骤 · 一句话调度',
    stats=[('6+', '已研究技能仓'), ('3', '自研技能'), ('79', 'MCP 工具(已镜像)'), ('SKILL', 'md 范式')]), [dict(id='overview', label='为什么是技能', h2='投研正在技能化',
          sub='AI Agent 时代的投研工具形态',
          inner=feature('范式',
              '传统量化工具是「库」（import 后写代码）；技能是「动作」（一句话触发，agent 自己取数/分析/出报告）。'
              'SKILL.md 范式（Claude Code 发起，zcode/opencode 兼容）正在成为投研工具的新形态：'
              '<strong>quantskills（214 资产）、AlphaGBM（27+ 技能，5.8k⭐）、a-stock-data（10.6k⭐）</strong>'
              '都在这条线上。')), dict(id='features', label='生态全景', h2='今天研究过的技能资产',
         sub='全部经真实抓取评估（2026-10-07）',
         inner=table([('技能/技能包', '定位', '许可', '我们的动作'),
                      ('<code>a-stock-data</code>', 'A 股取数底座（87 端点）', 'Apache-2.0', '✅ 已部署 Loong（W1）'),
                      ('<code>cn-financial-scraper</code>', '舆情/机构/宏观一体化', 'MIT', '✅ 已接入万丰舆情智察'),
                      ('<code>quantskills/*</code>', '体检/复盘/形态捕手', 'GPL-3.0 系', '📖 对照学习（W3 参照）'),
                      ('<code>AlphaGBM/skills</code>', '美股/期权工作流 27+', 'MIT', '📖 精读 SKILL.md 写法'),
                      ('<code>bulk-annual-report-extractor</code>', '年报 LLM 抽取', 'MIT', '🧪 自测候选（W2 基本面侧写）'),
                      ('<code>TradingAgents-astock</code>', 'A 股多 Agent（含技能面）', '—', '📖 对照实验候选'),
                      ('自研 stock-checkup', '个股体检卡', '内部', '✅ 已交付（W3）'),
                      ('自研 daily-brief', '每日复盘简报', '内部', '✅ 已交付（W3）'),
                      ('自研 sentiment-radar', '舆情雷达高危预警', '内部', '✅ 已交付（W3）')]) ), dict(id='usage', label='我们的实践', h2='自研三技能 + 网关',
         sub='技能不是下载来的，是跑出来的',
         inner=feature('万丰实践',
             'W3 技能包（<a href="https://gitea.see" target="_blank">coach 仓 skills/ 目录</a>）按 '
             'SKILL.md 标准编写，数据走万丰舆情智察网关（<code>/api/intel/*</code>），矩阵节点 opencode '
             '可一句话调度。<strong>验收口径：真实数据、如实降级、绝不编造输出。</strong>')), dict(id='limits', label='接入规范', h2='技能准入四条',
         sub='合规与工程双门槛',
         inner=table([('类别', '事项', '说明'),
                      ('<span class="tag tag-red">许可</span>', 'GPL 隔离', '传染许可只独立进程调用'),
                      ('<span class="tag tag-red">安全</span>', '注入面', 'MCP/技能的工具描述是 prompt 载体，接入需评审'),
                      ('<span class="tag tag-green">工程</span>', '输出契约', '结构化输出 + demo 样例 + 真实验收'),
                      ('<span class="tag tag-green">合规</span>', 'TOS', '数据源低频+缓存，easy-tdx 类协议源仅研究用途')]),
)])

import re as _re
for slug, (name, hero, sections) in PAGES.items():
    html = build(name, hero, sections)
    html = _re.sub(r'<title>[^<]*</title>', f'<title>{name} | coach 量化工具</title>', html, count=1)
    open(f'content/quant/{slug}.html', 'w', encoding='utf-8').write(html)
    print('生成', slug, len(html), 'bytes')
print(f"共 {len(PAGES)} 页")
