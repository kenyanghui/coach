import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE, COMPLIANCE } from '../data/site'

const methods = [
  { k: '从实践出发', d: 'WorkBuddy 证券版与优秀开源项目入手，不当场做出不算学会。' },
  { k: '逆向工程', d: '用好系统是最好的教材：拆开、搬走、长进自己的系统。' },
  { k: '公共知识', d: '用 Loong 拆解，成果发布到公众号，拆一次大家都受益。' },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">关于 · {SITE.name}</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-6">量的是市场，立的是系统</h1>

      <p className="text-[15px] leading-relaxed text-[#424245] mb-12 max-w-2xl">
        {SITE.fullName}：以万丰系统与 27 个优秀开源量化系统为基石，从实践出发，逆向工程一套自进化的个人投资系统。我们教的不是「别人怎么赚钱」，是怎么把你的数据、你的纪律、你的复盘，装进一套你自己的系统里。
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-12">
        {methods.map((m, i) => (
          <motion.div
            key={m.k}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="apple-card p-6"
          >
            <div className="text-[16.5px] font-bold text-[#1d1d1f] mb-2">{m.k}</div>
            <div className="text-[13px] leading-relaxed text-[#6e6e73]">{m.d}</div>
          </motion.div>
        ))}
      </div>

      <div className="apple-card p-7 mb-12">
        <div className="eyebrow mb-2">课程基石</div>
        <div className="text-[26px] font-black text-[#1d1d1f] mb-2">
          1 <span className="text-[#86868b] font-normal text-[18px]">个自研基座</span> + 27 <span className="text-[#86868b] font-normal text-[18px]">个开源基石</span>
        </div>
        <p className="text-[13.5px] text-[#6e6e73] mb-3">
          万丰系统是家用主基地：行为诊断、策略压力测试、组合预检、审计留痕。27 个开源量化系统——vnpy、Qlib、FinRL、Backtrader、freqtrade、OpenBB、TradingAgents……是逆向工程的教材库。
        </p>
        <Link to="/tools" className="text-[13px] font-semibold text-[#e14e15] hover:text-[#1d1d1f] transition-colors">看 28 系统基石图谱 →</Link>
      </div>

      <div className="apple-card p-7">
        <div className="eyebrow mb-2">联系</div>
        <a href={`mailto:${SITE.email}`} className="text-[15px] font-semibold text-[#e14e15] hover:text-[#1d1d1f] transition-colors">{SITE.email}</a>
        <p className="text-[12px] text-[#86868b] mt-6">{COMPLIANCE}</p>
      </div>
    </div>
  )
}
