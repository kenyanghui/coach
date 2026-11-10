import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import skillsData from '../data/skills'
import wbSkills from '../data/wbskills'

export default function Skills() {
  const [search, setSearch] = useState('')
  const [active, setActive] = useState(0)

  const total = useMemo(() => skillsData.reduce((s, c) => s + c.points.length, 0), [])

  const filteredClusters = useMemo(() => {
    return skillsData.map((c, i) => {
      const isActive = i === active
      if (!isActive) return { ...c, points: [] }
      const q = search.trim().toLowerCase()
      const points = q
        ? c.points.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.how.toLowerCase().includes(q) ||
            p.done.toLowerCase().includes(q) ||
            c.cluster.toLowerCase().includes(q))
        : c.points
      return { ...c, points }
    })
  }, [search, active])

  const current = filteredClusters[active]
  const empty = current && current.points.length === 0

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · 06 量技能</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">量技能</h1>

      <div className="apple-card p-6 mb-10 max-w-3xl">
        <p className="text-sm text-[#1d1d1f] leading-relaxed">
          技能不是清单，是课程单元。每个单元以 WorkBuddy 证券版的真实工具为载体，当堂跑通一个投研动作。
        </p>
        <p className="text-sm text-[#6e6e73] mt-2">
          共 <span className="gradient-text font-bold">{wbSkills.length}</span> 个课程单元，工具名即真实注册名，学完即可上岗。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {wbSkills.map((u, i) => (
          <motion.div
            key={u.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-6 flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="headline text-xl">
                <span className="text-[#ff5a1f] text-sm font-bold mr-2">{u.unit}</span>
                {u.name}
              </h2>
              <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#0f9d8f]/10 text-[#0f9d8f] font-semibold">
                {u.tools.length} 个载体工具
              </span>
            </div>
            <p className="text-sm text-[#6e6e73] mb-4">学习目标：{u.goal}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {u.tools.map(t => (
                <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-black/[.04] border border-black/10 text-[#1d1d1f]">{t}</span>
              ))}
            </div>
            {u.connectorGroups && (
              <div className="grid gap-3 mb-4">
                {u.connectorGroups.map(g => (
                  <div key={g.name} className="p-4 rounded-xl bg-black/[.03]">
                    <div className="text-xs font-semibold text-[#86868b] tracking-widest mb-2">{g.name}（{g.desc}）</div>
                    <div className="grid gap-1.5">
                      {g.items.map(it => (
                        <div key={it.name} className="text-sm text-[#1d1d1f]">
                          <span className="font-mono text-xs text-[#e14e15]">{it.name}</span>
                          <span className="text-[#6e6e73]"> · {it.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="text-sm p-3 rounded-xl bg-[#0f9d8f]/5 border border-[#0f9d8f]/20 text-[#1d1d1f] mb-4">{u.produce}</p>
            {u.note && <p className="text-xs text-[#86868b] mb-4">{u.note}</p>}
            <div className="flex flex-wrap gap-2 mt-auto">
              <Link to="/tools" className="btn-secondary text-sm">看工具全景 → /tools</Link>
              <Link to="/growth" className="btn-secondary text-sm">对照自评 → /growth</Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-6">
        <div className="eyebrow">技能图谱</div>
        <h2 className="headline text-2xl mt-2 mb-2">五簇技能点 · 自验证收</h2>
        <p className="text-[#6e6e73] max-w-2xl text-sm">
          课程单元之上，是完整的技能点验收体系。共 <span className="gradient-text font-bold">{skillsData.length}</span> 簇 · <span className="gradient-text font-bold">{total}</span> 个技能点。
        </p>
      </div>

      <div className="max-w-2xl mb-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="搜索技能点：如 回测、止损、提示词…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-black/10 text-[#1d1d1f] placeholder-[#86868b] focus:outline-none focus:border-[#ff5a1f]/50 focus:ring-1 focus:ring-[#ff5a1f]/20 transition-all text-sm"
          />
        </div>
        {search && (
          <p className="text-xs text-[#86868b] mt-2">当前簇匹配 {current ? current.points.length : 0} 个技能点</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {skillsData.map((c, i) => (
          <button
            key={c.cluster}
            type="button"
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${i === active ? 'bg-[#ff5a1f] text-white border-[#ff5a1f]' : 'bg-white text-[#6e6e73] border-black/10 hover:border-[#ff5a1f]/40 hover:text-[#e14e15]'}`}
          >
            {c.icon} {c.cluster} · {c.points.length}
          </button>
        ))}
      </div>

      {empty ? (
        <div className="text-center py-20 apple-card p-6">
          <div className="text-4xl mb-4 opacity-30">🔍</div>
          <p className="text-[#86868b] mb-4">这个簇里没有匹配的技能点，换个关键词或切到其他簇看看</p>
          <button type="button" onClick={() => setSearch('')} className="btn-secondary text-sm">清除搜索</button>
        </div>
      ) : (
        current && (
          <div>
            <motion.div
              key={current.cluster}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="apple-card p-6 mb-6"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="headline text-2xl mb-2">{current.icon} {current.cluster}</h3>
                  <p className="text-[#6e6e73] text-sm max-w-2xl">{current.intro}</p>
                </div>
                <span className="shrink-0 text-xs px-2.5 py-1 rounded-full bg-[#0f9d8f]/10 text-[#0f9d8f] font-semibold">
                  {current.points.length} 个技能点
                </span>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {current.points.map((p, j) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: j * 0.08 }}
                  className="apple-card p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-full bg-[#ff5a1f]/10 text-[#e14e15] text-xs font-bold flex items-center justify-center shrink-0">{j + 1}</span>
                    <h4 className="text-lg font-bold text-[#1d1d1f]">{p.name}</h4>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-black/[.03]">
                      <div className="text-xs font-semibold text-[#86868b] tracking-widest mb-1">怎么练</div>
                      <p className="text-sm text-[#1d1d1f]">{p.how}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#0f9d8f]/5 border border-[#0f9d8f]/20">
                      <div className="text-xs font-semibold text-[#0f9d8f] tracking-widest mb-1">点亮标准</div>
                      <p className="text-sm text-[#1d1d1f]">{p.done}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      )}

      <div className="apple-card p-6 mt-12 text-center">
        <p className="text-sm text-[#6e6e73] mb-4">对照自评缺口来点亮 →</p>
        <Link to="/growth" className="btn-primary text-sm">去量成长 · 三级九维自评</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
