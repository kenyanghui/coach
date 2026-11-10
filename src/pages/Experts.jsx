import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE, modules } from '../data/site'
import experts from '../data/experts'
import wbexperts from '../data/wbexperts'

export default function Experts() {
  const [tag, setTag] = useState('全部')

  const tags = useMemo(() => {
    const counts = new Map()
    for (const e of experts) counts.set(e.tag, (counts.get(e.tag) || 0) + 1)
    return [{ tag: '全部', count: experts.length }, ...Array.from(counts, ([t, c]) => ({ tag: t, count: c }))]
  }, [])

  const filtered = useMemo(() => (tag === '全部' ? experts : experts.filter(e => e.tag === tag)), [tag])

  const moduleOf = (k) => modules.find(m => m.href === '/' + k)

  const methodologyNotes = {
    因子研究: '课改：每个因子先写假设卡片，进课堂当堂过一遍有效性检验。',
    事件研究: '课改：用真实事件窗口算 1/5/10 日收益，作业就是复现这张表。',
    策略回测: '课改：回测必须带上手续费滑点涨跌停四项约束，裸回测不给过。',
    持仓复盘: '课改：每周交持仓复盘作业，换仓贡献暴露三项逐条对照。',
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · 07 量专家</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">量专家 · 方法论模块</h1>

      <div className="apple-card p-6 mb-10 border-l-4 border-l-[#ff5a1f]">
        <p className="text-sm text-[#1d1d1f] leading-relaxed max-w-3xl">
          专家不是名人榜，是方法论模块。WorkBuddy 证券版内置 <span className="gradient-text font-semibold">6 大策略域专家</span>与<span className="gradient-text font-semibold">四层研究方法论</span>，课程按模块拆给你。
        </p>
      </div>

      <div className="eyebrow">策略域专家</div>
      <h2 className="headline text-2xl md:text-3xl mt-2 mb-6">6 大策略域 · 每个专家一门模块课</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {wbexperts.domains.map((d, i) => (
          <motion.div
            key={d.key}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.6) }}
            className="apple-card p-6 flex flex-col gap-4 group hover:border-[#ff5a1f] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-[#1d1d1f]">{d.name}</div>
                <div className="text-xs text-[#86868b] font-mono">{d.key}</div>
              </div>
              <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#0f9d8f]/10 text-[#0f9d8f] font-medium">
                {d.focus}
              </span>
            </div>

            <p className="text-sm text-[#1d1d1f] leading-relaxed">{d.method}</p>

            <div className="flex flex-wrap gap-2">
              {d.templates.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-[#ff5a1f]/10 text-[#e14e15] font-medium">{t}</span>
              ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#86868b]">数据支撑</span>
              {d.connectors.map(c => (
                <span key={c} className="text-xs px-2 py-0.5 rounded bg-black/[.04] text-[#6e6e73]">{c}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="eyebrow">四层研究方法论</div>
      <h2 className="headline text-2xl md:text-3xl mt-2 mb-6">从想法到复盘 · 一条时间线走完</h2>

      <div className="grid md:grid-cols-4 gap-4 mb-16">
        {wbexperts.methodology.map((m, i) => (
          <motion.div
            key={m.step}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-7 h-7 rounded-full bg-[#ff5a1f] text-white text-xs font-bold flex items-center justify-center shrink-0">{m.step}</span>
              <div className="text-base font-bold text-[#1d1d1f]">{m.name}</div>
            </div>
            <p className="text-sm text-[#6e6e73] leading-relaxed mb-3">{m.note}</p>
            <p className="text-xs text-[#e14e15] leading-relaxed">{methodologyNotes[m.name]}</p>
            {i < wbexperts.methodology.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 text-[#86868b]">→</div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="apple-card p-6 md:p-8 mb-16">
        <div className="eyebrow">风控仪表盘</div>
        <h2 className="headline text-2xl mt-2 mb-4">持仓风险 · 每天自动体检两道</h2>
        <ul className="space-y-3">
          {wbexperts.risk_dashboard.map((r, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#ff5a1f] mt-2" />
              <p className="text-sm text-[#1d1d1f] leading-relaxed">{r}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="eyebrow">思想源流</div>
      <h2 className="headline text-2xl md:text-3xl mt-2 mb-4">12 位大师 · 模块背后的第一性原理</h2>
      <p className="text-sm text-[#6e6e73] max-w-3xl mb-6">
        策略域专家不是凭空来的——每个模块背后都站着一套被验证过的思想。这些大师的思想，是上面所有模块课的源头活水。
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        {tags.map(t => (
          <button
            key={t.tag}
            type="button"
            onClick={() => setTag(t.tag)}
            className={
              tag === t.tag
                ? 'px-4 py-1.5 rounded-full text-sm font-medium bg-[#ff5a1f] text-white transition-all'
                : 'px-4 py-1.5 rounded-full text-sm font-medium bg-black/[.04] text-[#6e6e73] hover:text-[#1d1d1f] transition-all'
            }
          >
            {t.tag} <span className="text-xs opacity-70">{t.count}</span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: Math.min(i * 0.08, 0.6) }}
            className="apple-card p-6 flex flex-col gap-4 group hover:border-[#ff5a1f] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-bold text-[#1d1d1f]">{e.name}</div>
                <div className="text-xs text-[#86868b]">{e.en}</div>
              </div>
              <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#0f9d8f]/10 text-[#0f9d8f] font-medium">{e.tag}</span>
            </div>

            <p className="text-sm text-[#1d1d1f] leading-relaxed">{e.thought}</p>

            <blockquote className="border-l-2 border-[#ff5a1f]/40 pl-3 text-sm text-[#6e6e73] italic">
              「{e.quote}」
            </blockquote>

            <div className="mt-auto rounded-xl bg-black/[.03] p-3 group-hover:bg-[#ff5a1f]/[.06] group-hover:border group-hover:border-[#ff5a1f] transition-all">
              <div className="text-xs font-semibold text-[#e14e15] mb-1">搬进你的系统</div>
              <p className="text-sm text-[#1d1d1f] leading-relaxed">{e.insight}</p>
            </div>

            <Link to={'/' + e.link} className="text-xs text-[#86868b] hover:text-[#ff5a1f] transition-colors">
              → 关联模块：{moduleOf(e.link)?.k || e.link}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 apple-card p-8 text-center">
        <div className="eyebrow">下一步</div>
        <h2 className="headline text-2xl mt-2 mb-3">把方法论装进系统</h2>
        <p className="text-sm text-[#6e6e73] max-w-xl mx-auto mb-6">
          专家给模块，指南给路线——从数据到回测到风控，把六个策略域落成你自己的系统。
        </p>
        <Link to="/guide" className="btn-primary inline-block">前往量指南 →</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
