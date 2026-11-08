import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE, modules } from '../data/site'
import experts from '../data/experts'

export default function Experts() {
  const [tag, setTag] = useState('全部')

  const tags = useMemo(() => {
    const counts = new Map()
    for (const e of experts) counts.set(e.tag, (counts.get(e.tag) || 0) + 1)
    return [{ tag: '全部', count: experts.length }, ...Array.from(counts, ([t, c]) => ({ tag: t, count: c }))]
  }, [])

  const filtered = useMemo(() => (tag === '全部' ? experts : experts.filter(e => e.tag === tag)), [tag])

  const moduleOf = (k) => modules.find(m => m.href === '/' + k)

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">量专家 · AI量化思想</h1>
      <p className="text-[#6e6e73] max-w-3xl mb-8">
        不追星，是拆方法——每位大师只拆一条能搬走的<span className="gradient-text font-semibold">第一性原理</span>。12 位跨越价值、趋势、风控、心理与机器学习的大师，思想各不相同，终点只有一个：把方法装进你的系统。
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
        <h2 className="headline text-2xl mt-2 mb-3">把这些思想装进系统</h2>
        <p className="text-sm text-[#6e6e73] max-w-xl mx-auto mb-6">
          大师给原理，指南给路线——从数据到回测到风控，六条路线图把这些第一性原理落成你自己的系统。
        </p>
        <Link to="/guide" className="btn-primary inline-block">前往量指南 →</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
