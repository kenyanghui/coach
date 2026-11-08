import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import buddy from '../data/buddy'

export default function Buddy() {
  const lead = buddy.buddies.find(b => b.id === 'b1')
  const rest = buddy.buddies.filter(b => b.id !== 'b1')

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · 04 量搭子</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">AI 搭子邀约</h1>
      <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-10 max-w-2xl">
        一个人练不下去：AI 搭子 24 小时在，人搭子每期互验收。四类搭子已开放邀约——从 WorkBuddy 证券版打头阵。
      </p>

      {/* 主卡：AI 研究搭子（WorkBuddy 打头阵） */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="apple-card p-8 mb-6 border-[#ff5a1f]/40 relative overflow-hidden"
      >
        <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-[#ff5a1f] text-white text-[11.5px] font-bold">打头阵</span>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#ff5a1f]/[.1] flex items-center justify-center text-2xl">{lead.emoji}</div>
          <div>
            <div className="text-[20px] font-black text-[#1d1d1f]">{lead.name}</div>
            <div className="text-[12.5px] font-semibold text-[#e14e15]">{lead.lead}</div>
          </div>
        </div>
        <div className="space-y-2 mb-5">
          {lead.what.map((w, i) => (
            <div key={i} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-[#424245]">
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#ff5a1f] shrink-0" />
              {w}
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-black/[.03] px-4 py-3 text-[13px] leading-relaxed text-[#6e6e73] mb-2">{lead.how}</div>
        <div className="rounded-xl bg-[#0f9d8f]/[.06] border border-[#0f9d8f]/20 px-4 py-3">
          <div className="text-[11.5px] font-bold text-[#0f9d8f] tracking-wide mb-1">从实践出发的第一站</div>
          <div className="text-[12.5px] leading-relaxed text-[#424245]">
            课程的工作坊思路：从已有的优秀开源项目入手，不当场跑通不算学会。WorkBuddy 证券版是所有搭子的随身载体——研究、复盘、纪律执行装进日常。
          </div>
        </div>
      </motion.div>

      {/* 其余三卡 */}
      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {rest.map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-black/[.04] flex items-center justify-center text-xl">{b.emoji}</div>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${b.status === '邀约中' ? 'bg-[#0f9d8f]/10 text-[#0f9d8f]' : 'bg-black/[.05] text-[#86868b]'}`}>{b.status}</span>
            </div>
            <div className="text-[16.5px] font-bold text-[#1d1d1f] mb-0.5">{b.name}</div>
            <div className="text-[12px] text-[#86868b] mb-3">{b.lead}</div>
            <div className="space-y-1.5 mb-4">
              {b.what.map((w, j) => (
                <div key={j} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-[6px] w-1 h-1 rounded-full bg-[#c7c7cc] shrink-0" />
                  {w}
                </div>
              ))}
            </div>
            <div className="text-[12px] leading-relaxed text-[#86868b]">{b.how}</div>
          </motion.div>
        ))}
      </div>

      {/* 加入流程 */}
      <div className="eyebrow mb-3">怎么加入</div>
      <h2 className="headline text-[26px] mb-8">四步，从自评到小组互验收</h2>
      <div className="grid md:grid-cols-4 gap-3 mb-12">
        {buddy.joinSteps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative apple-card p-5"
          >
            <div className="w-8 h-8 rounded-full bg-[#ff5a1f]/[.1] text-[#e14e15] font-black text-[14px] flex items-center justify-center mb-3">{i + 1}</div>
            <div className="text-[14.5px] font-bold text-[#1d1d1f] mb-1.5">{s.t}</div>
            <div className="text-[12.5px] leading-relaxed text-[#6e6e73]">{s.d}</div>
            {i < 3 && <div className="hidden md:block absolute top-[38px] -right-[9px] w-[14px] h-[2px] bg-[#ff5a1f]/30" />}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/growth" className="btn-primary">开始自评 →</Link>
        <Link to="/tools" className="btn-secondary">看工具基石</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
