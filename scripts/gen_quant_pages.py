#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""coach 站 content/quant 新页面生成器（复用 alphalens.html 的样式骨架）"""
import re

TPL = open('content/quant/alphalens.html', encoding='utf-8').read()
# 骨架 = 到 </nav> 为止的 head+css+nav
SKELETON = TPL[:TPL.index('</nav>') + len('</nav>')]
FOOT_SCRIPT = TPL[TPL.index('<footer>'):]


def build(slug: str, navname: str, hero: dict, sections: list) -> str:
    nav = f'''<nav class="top-nav">
  <a href="index.html" class="nav-home"><span class="dot"></span> 量化工具总览 · {navname}</a>
  <div class="nav-links">
    <a href="#overview">总览</a><a href="#features">核心能力</a><a href="#usage">我们怎么用</a><a href="#limits">边界</a><a href="index.html">◂ 总览</a>
  </div>
</nav>'''
    stats = ''.join(
        f'<div class="hero-stat"><span class="num">{s[0]}</span><span class="label">{s[1]}</span></div>'
        for s in hero['stats'])
    body = [f'''
<section class="hero">
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
        body.append(f'''
<section class="section{alt}" id="{sec['id']}">
  <div class="section-label">{sec['label']}</div>
  <h2>{sec['h2']}</h2>
  <p class="section-sub">{sec['sub']}</p>
{sec['inner']}
</section>
<div class="section-divider"><hr></div>
''')
    return SKELETON.replace(
        re.search(r'<nav class="top-nav">[\s\S]*?</nav>', SKELETON).group(0), nav
    ) + ''.join(body) + FOOT_SCRIPT


def feature(label, text):
    return (f'<div class="feature-box"><div class="feature-box-label">{label}</div>'
            f'<p>{text}</p></div>')


def table(rows, header=('属性', '详情')):
    trs = ''.join(
        '<tr>' + ''.join(f'<td>{c}</td>' for c in (r if isinstance(r, tuple) else (r,))) + '</tr>'
        for r in rows)
    ths = ''.join(f'<th>{h}</th>' for h in (header if isinstance(header, tuple) else (header,)))
    return f'<table class="data-table"><tr>{ths}</tr>{trs}</table>'


def grid(cards):
    inner = ''
    for icon, name, en, methods in cards:
        ms = ''.join(f'<span class="domain-method">{m}</span>' for m in methods)
        inner += (f'<div class="domain-card"><div class="domain-header"><span class="domain-icon">{icon}</span>'
                  f'<div><div class="domain-name">{name}</div><span class="domain-count">{en}</span></div></div>'
                  f'<div class="domain-methods">{ms}</div></div>')
    return f'<div class="domain-grid">{inner}</div>'


# ── Kronos ─────────────────────────────────────────
kronos_sections = [
    dict(id='overview', label='项目总览', h2='什么是 Kronos？',
         sub='把 K 线当作一门「语言」来学习的基座模型',
         inner=feature('核心定位',
             '<strong>Kronos</strong> 是首个开源金融 K 线基座模型（清华团队，AAAI 2026）：先用专门分词器把多维 '
             'OHLCV 连续数据量化为<strong>分层离散标记</strong>，再用大型自回归 Transformer 在标记上预训练。'
             '一个模型服务多样化量化任务（预测/分类/生成）。') +
         table([
             ('仓库', '<a href="https://github.com/shiyu-coder/Kronos" target="_blank">shiyu-coder/Kronos</a> · 40.1k Star'),
             ('许可证', '<code>MIT</code>'),
             ('开源规格', 'mini 4.1M / small 24.7M / base 102.3M 参数（large 未开源）'),
             ('论文', 'arXiv:2508.02739 · AAAI 2026'),
             ('A 股支持', '原生：示例即上交所 600977，配 Qlib 数据准备与回测演示'),
         ])),
    dict(id='features', label='核心能力', h2='预测 · 微调 · 离散化',
         sub='不只是涨跌预测，而是未来 K 线分布的生成',
         inner=grid([
             ('🎲', '概率预测', 'Predict', ['温度采样', 'top_p', '多路径', 'OHLCV 输出']),
             ('🔤', '分层分词器', 'Tokenizer', ['OHLCV→离散标记', '两级量化', '可学习']),
             ('🧠', '自回归基座', 'Foundation', ['多任务迁移', '预训练+微调']),
             ('🇨🇳', 'A 股原生', 'XSHG 示例', ['Qlib 管线', '日频回测演示']),
         ]) +
         '<div class="install-block"><div class="install-header"><span class="step-num">1</span> 快速上手</div>'
         '<div class="install-body"><pre>git clone https://github.com/shiyu-coder/Kronos\n'
         'python -m venv .venv && .venv/bin/pip install -r requirements.txt\n'
         '<span class="cm"># 国内模型下载：export HF_ENDPOINT=https://hf-mirror.com</span>\n'
         'KronosPredictor.predict(...)   <span class="cm"># 返回含 open/high/low/close 的 DataFrame</span></pre></div></div>'),
    dict(id='usage', label='我们怎么用', h2='Kronos 标记 ≈ 可学习的卦象',
         sub='与「卦＝市场状态压缩编码」的量化方法论（aibay.asia 玄学量化框架）同构',
         inner=feature('旗舰课题：Kronos × 玄学量化',
             '分词器把 K 线量化为离散标记——这正是「把市场翻译成卦象」的机器学习实现。'
             '① <strong>标记→卦象映射</strong>：标记序列三枚一组映射八卦（乾兑离震巽坎艮坤），统计卦象频率与转移矩阵；'
             '② <strong>变爻概率</strong>：概率预测的多路径采样输出「变爻」分布；'
             '③ <strong>卦象因子</strong>：标记分布熵（市场混沌度）、卦变频率等构造因子进 alphalens 回测——'
             '满足「可证伪、可回测、可迭代」的修行纪律。') +
         table([
             ('万丰视角', '舆情智察模块远期加「卦象视图」，数据面走 Kronos 推理服务（矩阵 Xuan 节点 POC）'),
             ('研究入口', 'coach 仓 docs/quant-survey-2026-10/xuan/（W2 实习生工作流交付位）'),
         ])),
    dict(id='limits', label='优缺点与边界', h2='演示级模型，不是印钞机',
         sub='作者自述 + 我们的纪律',
         inner=table([
             ('<span class="tag tag-green">优点</span>', '范式独占', 'K 线基座模型开源首发，A 股示例齐全，微调管线完整'),
             ('<span class="tag tag-green">优点</span>', '轻量可跑', 'mini/small 可 CPU 推理，POC 成本低'),
             ('<span class="tag tag-red">边界</span>', '演示级', '作者自述非生产级；预测信号必须过组合优化与风险中性化'),
             ('<span class="tag tag-red">边界</span>', 'large 未开源', '上限受限；市场结构变化快，微调数据要新'),
         ], ('类别', '事项', '说明'))),
]

# ── a-stock-data ───────────────────────────────────
asd_sections = [
    dict(id='overview', label='项目总览', h2='什么是 a-stock-data？',
         sub='A 股数据自主权一步到位',
         inner=feature('核心定位',
             '<strong>a-stock-data</strong>（Simon Lin）是 A 股全栈取数 Skill：<strong>15 层架构 · 87 能力端点 · '
             '34 数据源</strong>，自包含 markdown 内嵌全部可运行代码。行情（腾讯日周月分钟+逐笔/通达信盘后包）、'
             '研报、信号（热点/北向/龙虎榜/解禁）、资金面、财务三表、公告、打板、ETF 期权、舆情互动、'
             '期货大宗、事件驱动、可转债。') +
         table([
             ('仓库', '<a href="https://github.com/simonlin1212/a-stock-data" target="_blank">simonlin1212/a-stock-data</a> · 10.6k Star'),
             ('许可证', '<code>Apache-2.0</code>'),
             ('形态', 'Skill（markdown 内嵌可运行 Python，零外部文件，Python ≥3.9）'),
             ('防封设计', '优先不封 IP 源（腾讯/交易所官方）；东财内置限流；5 个备胎端点降级'),
         ])),
    dict(id='features', label='核心能力', h2='十五层数据架构',
         sub='口径坑全部标注的工程级文档',
         inner=grid([
             ('📈', '行情层', 'Layer 1', ['日周月复权', '1~60分钟', '当日逐笔', '盘后包']),
             ('📑', '研报/新闻', 'Layer 2/5', ['东财+新浪+同花顺', '财联社', '华尔街见闻']),
             ('🚥', '信号层', 'Layer 3', ['热点', '北向', '龙虎榜', '解禁', '板块资金']),
             ('💰', '资金/筹码', 'Layer 4', ['融资融券', '大宗', '股东户数', '筹码分布']),
             ('🏗️', '基础数据', 'Layer 6', ['财务三表', 'F10', '估值历史', 'ST 名单']),
             ('🗓️', '事件/期货', 'Layer 13-15', ['业绩预告', '机构调研', '五所期货', '可转债']),
         ]) +
         feature('工程细节（为什么可信）',
             '科创板 volume 是「股」不是「手」、腾讯前复权是等差口径、分钟线回填时点、深市分钟边界——'
             '这些口径坑全部实测标注在文档里。这是踩过坑的数据工程，不是玩具。')),
    dict(id='usage', label='我们怎么用', h2='已部署 Loong（W1 数据底座）',
         sub='2026-10-07 冒烟通过',
         inner=table([
             ('部署位', '<code>/data/loong-apps/a-stock-data</code>（Loong 主力机，冒烟：600519 日K+分钟K 真数据）'),
             ('万丰视角①', '舆情智察模块的数据备源（与 cn-financial-scraper 互补）'),
             ('万丰视角②', 'Kronos 卦象因子的行情输入——Kronos 吃 K 线，它喂 K 线'),
             ('实习生 W1', '数据底座工作流的地基（配套 easy-tdx 通达信实时行情）'),
         ]) +
         feature('同作者生态（一鱼多吃）',
             'Vibe-Research（研究工作台）· TradingAgents-astock（3.6k⭐ A 股多 Agent 辩论）· '
             'vibe-astock（658⭐ 短线复盘看板）——同一数据哲学的四个产品面。')),
    dict(id='limits', label='边界', h2='Skill 形态，不是 pip 库',
         sub='给 agent 用最顺',
         inner=table([
             ('<span class="tag tag-red">边界</span>', 'Skill 形态', '按章节取代码块消费，非 import 库；依赖块需按序 exec'),
             ('<span class="tag tag-red">边界</span>', '覆盖面', '北交所部分端点不覆盖；数据口径以文档标注为准'),
             ('<span class="tag tag-green">合规</span>', '低频+缓存', '遵守各源 TOS，东财限流防封已内置'),
         ], ('类别', '说明'))),
]

# ── Vibe-Research ──────────────────────────────────
vr_sections = [
    dict(id='overview', label='项目总览', h2='什么是 Vibe-Research？',
         sub='本地金融研究 Agent 的工作台范式',
         inner=feature('核心定位',
             '<strong>Vibe-Research</strong>：A 股/美股/港股全覆盖的本地金融研究 Agent——六阶段个股研究工作流、'
             '资讯雷达、板块中心、回测、研报库，自带 47 端点 A 股数据工具箱，'
             'Claude Code / Codex 一句话接入。数据全本地、研报只存本机。') +
         table([
             ('仓库', '<a href="https://github.com/simonlin1212/Vibe-Research" target="_blank">simonlin1212/Vibe-Research</a> · 2.6k Star'),
             ('许可证', '<code>MIT</code>'),
             ('活跃度', '当日仍在更新（2026-10-07 抓取）'),
             ('栈', 'TypeScript + Python · Codex Harness'),
         ])),
    dict(id='features', label='核心能力', h2='六阶段研究工作流',
         sub='把一次个股研究拆成可复用管线',
         inner=grid([
             ('1️⃣', '数据', 'Data', ['47端点工具箱', 'A/港/美']),
             ('2️⃣', '分析', 'Analyze', ['指标', '形态', '对比']),
             ('3️⃣', '观点', 'Thesis', ['多空论证', '证据链']),
             ('4️⃣', '回测', 'Backtest', ['策略验证']),
             ('5️⃣', '报告', 'Report', ['结构化研报']),
             ('6️⃣', '沉淀', 'Archive', ['本地研报库']),
         ])),
    dict(id='usage', label='我们怎么用', h2='学范式，不搬整机',
         sub='万丰 CIO「AI 量化团队」人设的工程化参照',
         inner=feature('三个学习点（万丰视角）',
             '① <strong>工作流分阶段设计</strong>——W3 实习生为舆情智察写技能时对齐它的阶段划分；'
             '② <strong>研报沉淀结构</strong>——借鉴进万丰内容网关的研报库设计；'
             '③ <strong>工具箱契约</strong>——其 47 端点与 a-stock-data 互补交叉验证。') +
         table([
             ('路线对照', 'TradingAgents-astock（多 Agent 辩论）vs Vibe-Research（单 Agent 工作流）——两条路线可对照实验'),
         ])),
    dict(id='limits', label='边界', h2='单机研究者视角',
         sub='不是多租户服务',
         inner=table([
             ('<span class="tag tag-red">边界</span>', '单机形态', '面向个人研究者，非多租户服务化'),
             ('<span class="tag tag-red">边界</span>', 'A 股深度', '深度数据仍需自己的数据底座（a-stock-data）补'),
             ('<span class="tag tag-green">价值</span>', '范式', '研究工作流的阶段化设计值得整体借鉴'),
         ], ('类别', '说明'))),
]

pages = {
    'kronos': ('Kronos', dict(
        badge='KRONOS · K线基座模型', h1='Kronos', sub='金融 K 线基座模型 · AAAI 2026 · MIT',
        desc='40.1k Star · 清华团队 · 分层离散标记 × 自回归 Transformer<br>标记序列 → 卦象序列 → 变爻概率 → 可回测因子',
        stats=[('40k', 'GitHub Stars'), ('4.1M-102M', '开源参数'), ('AAAI', '2026 论文'), ('XSHG', 'A 股原生示例')]),
        kronos_sections),
    'a-stock-data': ('a-stock-data', dict(
        badge='A-STOCK-DATA · A股全栈数据', h1='a-stock-data', sub='A 股数据自主权一步到位 · Apache-2.0',
        desc='10.6k Star · 15 层架构 · 87 端点 · 34 数据源 · 当日更新<br>行情/研报/信号/资金/财务/公告/打板/期货/可转债',
        stats=[('10.6k', 'GitHub Stars'), ('87', '能力端点'), ('34', '数据源'), ('0', '外部依赖文件')]),
        asd_sections),
    'vibe-research': ('Vibe-Research', dict(
        badge='VIBE-RESEARCH · 本地研究 Agent', h1='Vibe-Research', sub='金融研究工作台范式 · MIT',
        desc='2.6k Star · A 股/美股/港股 · 六阶段工作流 · 47 端点工具箱<br>数据全本地 · 研报只存本机',
        stats=[('2.6k', 'GitHub Stars'), ('6', '研究阶段'), ('47', '工具端点'), ('3', '市场覆盖')]),
        vr_sections),
}

for slug, (navname, hero, sections) in pages.items():
    html = build(slug, navname, hero, sections)
    html = re.sub(r'<title>[^<]*</title>',
                  f'<title>{navname} | coach 量化工具</title>', html, count=1)
    open(f'content/quant/{slug}.html', 'w', encoding='utf-8').write(html)
    print('生成', slug, len(html), 'bytes')
