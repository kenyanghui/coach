import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import tools from '../data/tools'

export default function Tools() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('全部')

  const cats = useMemo(() => ['全部', ...tools.categories.map(c => c.name)], [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return tools.categories
      .filter(c => cat === '全部' || c.name === cat)
      .map(c => {
        const items = c.items.filter(t => {
          if (!q) return true
          return (
            t.name.toLowerCase().includes(q) ||
            t.desc.toLowerCase().includes(q) ||
            t.why.toLowerCase().includes(q) ||
            t.fit.toLowerCase().includes(q)
          )
        })
        return { ...c, items }
      })
      .filter(c => c.items.length > 0)
  }, [search, cat])

  const total = useMemo(() => tools.categories.reduce((s, c) => s + c.items.length, 0), [])
  const shown = useMemo(() => filtered.reduce((s, c) => s + c.items.length, 0), [filtered])

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">量工具 <span className="gradient-text">AI量化软件</span></h1>
      <p className="text-[#6e6e73] max-w-3xl mb-10">
        培训基石全图谱：<b className="text-[#1d1d1f]">28 = 万丰系统 + 27 个开源系统</b>。
        万丰系统与 27 个优秀开源量化系统共同构成万丰培训的基石；我们的工作坊从实践出发，从 WorkBuddy 证券版、从这些已有的优秀开源项目入手，
        用逆向工程逼近一个目标——<span className="gradient-text font-bold">自进化的个人投资系统</span>。
        先做投资业务工具，前端找 GitHub 高星项目，用 Loong 拆解，拆解成果发布到公众号。
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {tools.foundation.map((f, i) => (
          <motion.div
            key={f.k}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-6"
          >
            <div className="text-[12px] font-semibold text-[#ff5a1f] tracking-widest mb-2">{f.tag}</div>
            <div className="text-lg font-bold text-[#1d1d1f] mb-2">{f.k}</div>
            <p className="text-sm text-[#6e6e73] leading-relaxed">{f.d}</p>
          </motion.div>
        ))}
      </div>

      <div className="eyebrow">逆向工程</div>
      <h2 className="headline text-2xl md:text-3xl mb-6">四步法：从用到拆，从拆到建</h2>
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        {tools.reverse.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-5 relative"
          >
            {i < tools.reverse.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-[#ff5a1f]/40" />
            )}
            <div className="w-8 h-8 rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f] font-bold flex items-center justify-center text-sm mb-3">{i + 1}</div>
            <div className="font-bold text-[#1d1d1f] mb-2">{s.t}</div>
            <p className="text-[13px] text-[#6e6e73] leading-relaxed">{s.d}</p>
          </motion.div>
        ))}
      </div>
      <p className="text-[13px] text-[#86868b] mb-14">工具链：用 Loong 拆解源码与架构 → 拆解成果发布到公众号，形成公共知识。</p>

      <div className="eyebrow">工具图谱</div>
      <h2 className="headline text-2xl md:text-3xl mb-6">27 个开源系统 · 六大类别册</h2>

      <div className="max-w-2xl mb-4">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索工具名称、用途、适合路线..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/60 border border-black/10 text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#ff5a1f]/50 focus:ring-1 focus:ring-[#ff5a1f]/20 transition-all text-sm"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map(c => {
          const n = c === '全部' ? total : tools.categories.find(x => x.name === c).items.length
          const active = cat === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={
                'px-4 py-2 rounded-full text-sm font-medium transition-all border ' +
                (active
                  ? 'bg-[#ff5a1f] text-white border-[#ff5a1f]'
                  : 'bg-white/60 text-[#6e6e73] border-black/10 hover:border-[#ff5a1f]/40 hover:text-[#1d1d1f]')
              }
            >
              {c} · {n}
            </button>
          )
        })}
      </div>
      <p className="text-xs text-[#86868b] mb-8">
        {search || cat !== '全部' ? `显示 ${shown} 个工具（共 ${total} 个开源系统）` : `共 ${total} 个开源系统 · 统计口径：28 = 万丰系统 + 27 开源`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3 opacity-30">🔍</div>
          <p className="text-[#86868b] mb-3">没有找到匹配的工具，试试其他关键词</p>
          <button
            type="button"
            onClick={() => { setSearch(''); setCat('全部') }}
            className="btn-secondary text-sm"
          >
            清除筛选
          </button>
        </div>
      ) : (
        filtered.map((c, ci) => (
          <div key={c.name} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{c.icon}</span>
              <h3 className="text-lg font-bold text-[#1d1d1f]">{c.name}</h3>
              <span className="text-xs text-[#86868b]">{c.items.length} 个</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {c.items.map((t, i) => (
                <motion.div
                  key={t.slug}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.4) }}
                  className="apple-card p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{t.icon}</span>
                      <h4 className="font-bold text-[#1d1d1f]">{t.name}</h4>
                    </div>
                    <span className="shrink-0 text-[11px] px-2.5 py-1 rounded-full bg-[#0f9d8f]/10 text-[#0f9d8f] font-semibold">
                      {t.fit}路线
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {t.meta.map((m, j) => (
                      <span key={j} className="text-[11px] px-2 py-0.5 rounded-full bg-black/[.04] text-[#86868b]">{m}</span>
                    ))}
                  </div>
                  <p className="text-[13px] text-[#6e6e73] leading-relaxed mb-3">{t.desc}</p>
                  <p className="text-[13px] text-[#1d1d1f] leading-relaxed mb-4">
                    <span className="font-semibold text-[#ff5a1f]">为什么拆它：</span>{t.why}
                  </p>
                  <div className="mt-auto flex items-center justify-between">
                    {t.github ? (
                      <a href={t.github} target="_blank" rel="noreferrer" className="text-[12px] font-semibold text-[#6e6e73] hover:text-[#ff5a1f] transition-colors">
                        GitHub ↗
                      </a>
                    ) : (
                      <span className="text-[12px] text-[#86868b]">商业平台 · 无开源仓</span>
                    )}
                    <span className="text-[10px] text-[#86868b]">{t.slug}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            {ci === filtered.length - 1 && (
              <p className="text-[12px] text-[#86868b] mt-6">统计口径：28 = 万丰系统 + 27 开源（本页别册收录全部 27 个开源系统）。</p>
            )}
          </div>
        ))
      )}

      <div className="apple-card p-6 md:p-8 mt-8">
        <div className="eyebrow">继续走</div>
        <div className="flex flex-wrap gap-3 mt-3">
          <Link to="/guide" className="btn-primary text-sm">按路线挑工具 → 量指南</Link>
          <Link to="/skills" className="btn-secondary text-sm">工具怎么拆 → 量技能</Link>
        </div>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
