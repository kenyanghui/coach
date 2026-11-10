import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import workshops from '../data/workshops'

const fade = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.08 },
  viewport: { once: true },
})

function statusOf(w) {
  if (!w.dateISO) return { label: '排期中', badge: 'bg-[#f5f5f7] text-[#6e6e73]' }
  if (w.dateEndISO) return { label: '已结课', badge: 'bg-[#0f9d8f]/10 text-[#0f9d8f]' }
  return { label: '报名中', badge: 'bg-[#ff5a1f]/10 text-[#e14e15]' }
}

export default function Workshops() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · WorkBuddy 证券版实训主线</div>
      <h1 className="headline text-[32px] md:text-[40px] mt-2 mb-4">四场工作坊</h1>
      <p className="text-[16px] text-[#6e6e73] leading-relaxed max-w-2xl mb-12">
        以 WorkBuddy 证券版为实训主线，四场走完「看数据—做研究—管组合—沉淀技能」完整链路；直播 + 录播，每场都配当堂可带走的产出。
      </p>
      <div className="grid gap-6">
        {workshops.map((w, i) => {
          const st = statusOf(w)
          return (
            <motion.div key={w.id} {...fade(i)} className="apple-card p-7 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="text-4xl md:text-5xl font-black gradient-text leading-none md:w-20 shrink-0">{w.no}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-[20px] font-bold">{w.title}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[12px] font-medium ${st.badge}`}>{st.label}</span>
                    <span className="text-sm text-[#0f9d8f]">{w.short}</span>
                  </div>
                  <p className="text-[13px] text-[#86868b] mb-4">📅 {w.date} · 📍 {w.location} · 💰 {w.fee}</p>
                  <p className="text-[14.5px] text-[#6e6e73] leading-relaxed mb-4">{w.summary}</p>
                  <ul className="flex flex-wrap gap-2 mb-4">
                    {w.tools.map((t) => (
                      <li key={t} className="px-3 py-1.5 rounded-full bg-[#f5f5f7] text-[12.5px] text-[#494949] font-medium">{t}</li>
                    ))}
                  </ul>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-wide mb-2">当堂产出</p>
                      <ul className="space-y-1.5">
                        {w.outcomes.map((o) => (
                          <li key={o} className="text-[13.5px] text-[#494949] leading-relaxed">✓ {o}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-[#0f9d8f] tracking-wide mb-2">适合谁</p>
                      <ul className="space-y-1.5">
                        {w.who.map((p) => (
                          <li key={p} className="text-[13.5px] text-[#494949] leading-relaxed">· {p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {st.label === '报名中' && w.signupUrl && (
                    <a href={w.signupUrl} className="btn-primary inline-block mt-5">报名本场</a>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <motion.div {...fade(0)} className="mt-12 apple-card p-7">
        <h2 className="text-[20px] font-bold mb-2">上课之前先做什么</h2>
        <p className="text-[14.5px] text-[#6e6e73] leading-relaxed mb-5">
          先把量成长的三级九维自评跑一遍，带着自己的位置和差距清单来，每一场的收获都会翻倍。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/growth" className="btn-primary">先做量成长自评</Link>
          <Link to="/tools" className="btn-secondary">看量工具图谱</Link>
        </div>
      </motion.div>
      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
