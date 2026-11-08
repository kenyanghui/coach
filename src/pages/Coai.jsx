import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import coai from '../data/coai'

export default function Coai() {
  const invest = coai.dao.filter(d => d.dao === '投资的道')
  const ai = coai.dao.filter(d => d.dao === 'AI 的道')

  return (
    <div className="max-w-5xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">共拆AI · 悟道</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">投资的道 × AI 的道</h1>
      <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-12 max-w-2xl">
        术学完了，回到道。两边各三条——不是格言，是每天都能落在系统里的动作。
      </p>

      {/* 悟道篇：两列 */}
      <div className="relative grid md:grid-cols-2 gap-4 mb-4">
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center text-[13px] font-black text-[#ff5a1f]">×</div>
        {[
          { title: '投资的道', items: invest, tone: 'text-[#0f9d8f]' },
          { title: 'AI 的道', items: ai, tone: 'text-[#ff5a1f]' },
        ].map(col => (
          <div key={col.title} className="space-y-4">
            <div className={`text-center text-[15px] font-black tracking-widest ${col.tone}`}>{col.title}</div>
            {col.items.map((d, i) => (
              <motion.div
                key={d.num}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="apple-card p-6 relative overflow-hidden"
              >
                <div className="absolute -top-2 -right-1 text-[64px] font-black text-black/[.04] leading-none select-none">{d.num}</div>
                <div className="text-[17px] font-bold text-[#1d1d1f] mb-2">{d.title}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{d.body}</div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* 万丰AI 家族 */}
      <div className="mt-16">
        <div className="eyebrow mb-3">万丰AI · 全家族</div>
        <h2 className="headline text-[26px] mb-8">五门入口，都在这条路上</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {coai.wanfengAI.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <Link to={w.href} className="apple-card p-5 block h-full text-center">
                <div className="text-2xl mb-2">{w.emoji}</div>
                <div className="text-[14px] font-bold text-[#1d1d1f] mb-1.5">{w.name}</div>
                <div className="text-[11.5px] leading-relaxed text-[#86868b]">{w.desc}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 收束 */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-[17px] md:text-[19px] font-bold leading-relaxed">
          <span className="gradient-text">{coai.closing}</span>
        </p>
      </div>

      <div className="text-center">
        <Link to="/growth" className="btn-primary">回到起点，做一次自评 →</Link>
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
