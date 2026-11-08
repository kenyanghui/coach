import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import guide from '../data/guide'

export default function Guide() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · 03 量指南</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">AI 量化指南</h1>
      <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-4 max-w-2xl">
        从零到自进化个人投资系统的六条路线图。每条线步步带工具、带里程碑——走完一条线的标志不是「学完了」，是「做出来了」。
      </p>
      <div className="apple-card p-6 mb-12">
        <div className="text-[14px] font-bold text-[#1d1d1f] mb-2">总纲：三步走</div>
        <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">
          先<Link to="/growth" className="text-[#e14e15] font-semibold">自评</Link>定层 → 按缺口挑 1–2 条线 → 结课标准只有一条：你的系统通电了。不必按序走完六条，但风险控制线是所有层级的必修课。
        </div>
      </div>

      <div className="space-y-6">
        {guide.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="apple-card p-7"
          >
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#ff5a1f]/[.08] flex items-center justify-center text-2xl">{r.icon}</div>
                <div>
                  <div className="text-[19px] font-black text-[#1d1d1f]">{r.name}</div>
                  <div className="text-[12.5px] text-[#86868b]">{r.forWho} · {r.weeks}</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#c7c7cc] tracking-widest shrink-0 mt-1">0{i + 1}</span>
            </div>

            <div className="relative ml-5 mt-5 mb-6">
              <div className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-[#ff5a1f]/40 to-[#ff5a1f]/10" />
              <div className="space-y-5">
                {r.steps.map((s, j) => (
                  <div key={j} className="relative pl-6">
                    <div className="absolute left-[-4.5px] top-[7px] w-[10px] h-[10px] rounded-full bg-white border-2 border-[#ff5a1f]" />
                    <div className="text-[15px] font-bold text-[#1d1d1f] mb-1">{s.t}</div>
                    <div className="text-[13px] leading-relaxed text-[#6e6e73] mb-1.5">{s.d}</div>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tools.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded-md bg-black/[.04] text-[11px] font-medium text-[#6e6e73]">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#0f9d8f]/[.06] border border-[#0f9d8f]/20 px-4 py-3">
                <div className="text-[11.5px] font-bold text-[#0f9d8f] tracking-wide mb-1">🏁 里程碑</div>
                <div className="text-[12.5px] leading-relaxed text-[#424245]">{r.milestone}</div>
              </div>
              <div className="rounded-xl bg-[#a63a2e]/[.05] border border-[#a63a2e]/20 px-4 py-3">
                <div className="text-[11.5px] font-bold text-[#a63a2e] tracking-wide mb-1">⚠ 最常见的坑</div>
                <div className="text-[12.5px] leading-relaxed text-[#424245]">{r.pit}</div>
              </div>
            </div>

            <div className="mt-4 text-right">
              <Link to="/tools" className="text-[12.5px] font-semibold text-[#e14e15] hover:text-[#1d1d1f] transition-colors">这条线用到的工具 →</Link>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
      <p className="text-[13px] mt-4">工具详情看 <Link to="/tools" className="text-[#e14e15] font-semibold">量工具</Link> →</p>
    </div>
  )
}
