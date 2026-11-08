import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import books from '../data/classics'

const cats = ['全部', '入门思维', '技术与系统交易', '量化方法', '风险管理', '行为金融', '大师传记', 'AI 与机器学习']

const levelStyle = {
  L1: 'bg-teal-500/10 text-teal-700',
  L2: 'bg-amber-500/10 text-amber-700',
  L3: 'bg-rose-500/10 text-rose-700',
}

function BookCard({ b, i }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.6) }}
      className="apple-card p-6 flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-[#1d1d1f] leading-snug">{b.title}</h3>
        <span className={`shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full ${levelStyle[b.level]}`}>{b.level}</span>
      </div>
      <p className="text-sm text-[#6e6e73] mb-3">{b.author}</p>
      <span className="inline-block self-start text-[11px] px-2 py-0.5 rounded-full bg-black/[.04] text-[#86868b] mb-4">{b.cat}</span>
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-[#424245]"><span className="font-semibold text-[#e14e15]">读什么</span><span className="mx-1.5 text-[#86868b]">·</span>{b.read}</p>
        {open && (
          <>
            <p className="text-[#424245]"><span className="font-semibold text-[#0f9d8f]">悟什么</span><span className="mx-1.5 text-[#86868b]">·</span>{b.insight}</p>
            <p className="text-[#424245]"><span className="font-semibold text-[#1d1d1f]">用什么</span><span className="mx-1.5 text-[#86868b]">·</span>{b.apply}</p>
          </>
        )}
      </div>
      <button type="button" onClick={() => setOpen(!open)} className="mt-4 self-start text-[12px] font-semibold text-[#e14e15] hover:text-[#ff5a1f] transition-colors">
        {open ? '收起三问' : '展开三问'}
      </button>
    </motion.div>
  )
}

export default function Classics() {
  const [cat, setCat] = useState('全部')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return books.filter(b => {
      const catOk = cat === '全部' || b.cat === cat
      const qOk = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      return catOk && qOk
    })
  }, [cat, search])

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">量经典 · AI量化书籍</h1>
      <p className="text-[#6e6e73] max-w-2xl mb-2">不是读完就算，是每本都拆出你的下一步动作。</p>
      <p className="text-sm text-[#86868b] mb-8">{books.length} 本精选 · 七类书单 · 每本「读什么 / 悟什么 / 用什么」三问拆读</p>

      <div className="max-w-2xl mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索书名或作者..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/[.03] border border-black/10 text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#ff5a1f]/50 focus:ring-1 focus:ring-[#ff5a1f]/20 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium border transition-all ${cat === c ? 'bg-[#ff5a1f] text-white border-[#ff5a1f]' : 'bg-transparent text-[#6e6e73] border-black/10 hover:border-[#ff5a1f]/40 hover:text-[#e14e15]'}`}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="text-xs text-[#86868b] mb-8">{cat === '全部' && !search ? `共 ${books.length} 本` : `显示 ${filtered.length} 本（共 ${books.length} 本）`}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 opacity-30">🔍</div>
          <p className="text-[#86868b] mb-4">没有找到匹配的书，试试其他关键词</p>
          <button type="button" onClick={() => { setSearch(''); setCat('全部') }} className="btn-secondary">清除筛选</button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b, i) => <BookCard key={b.title} b={b} i={i} />)}
        </div>
      )}

      <div className="mt-14 apple-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">不知道从哪本读起？</h3>
          <p className="text-sm text-[#6e6e73]">按 level 对照你在 <span className="gradient-text font-semibold">量成长</span> 的评级来选书 →</p>
        </div>
        <Link to="/growth" className="btn-primary shrink-0">去量成长自评测级</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
