import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { modules, SITE, COMPLIANCE } from '../data/site'

const fade = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.08 },
  viewport: { once: true },
})

const pains = [
  { q: '政策太厚看不懂', a: '各系列评审条件动辄几十页，学历、年限、业绩、成果要求相互交织，自己抠条款常常抠错方向。' },
  { q: '材料不会写、反复被退', a: '工作总结写成流水账、业绩报告堆不出亮点，形式审查退回一次就耽误一整年。' },
  { q: '第一次申报没人带', a: '选系列、排材料、约答辩，每个环节都要自己摸索，错一步几乎就是重头再来。' },
  { q: '辅导老师带不动量', a: '一位辅导老师面对几十名学员，诊断、补强、跟进全靠手工，顾此失彼。' },
]

const cornerstones = [
  { k: '三端协同', d: '申报人、辅导老师、审核老师在同一条流程上工作，进度与问题互相可见，不再各自为战。', tag: '申报人端 / 辅导端 / 审核端' },
  { k: '政策条件结构化', d: '27 个系列的申报条件拆成可逐项对照的自检清单，正常晋升与破格路径一目了然。', tag: '政策库' },
  { k: 'AI 辅助留痕可查', d: '材料逐份成稿、逐份留痕，AI 只做辅助，内容责任始终在人。', tag: '材料工坊' },
]

export default function Home() {
  return (
    <>
      <section className="hero-wash pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5a1f]/[.08] text-[#e14e15] text-[12.5px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-pulse" />
              全流程 AI 工作台 · 三端协同
            </div>
            <h1 className="headline text-[40px] md:text-[56px] mb-6">
              职称评审，<br className="md:hidden" />
              <span className="gradient-text">从申报到过审</span>全程陪跑
            </h1>
            <p className="text-[17px] text-[#6e6e73] leading-relaxed mb-9 max-w-xl">
              {SITE.tagline}。申报人按五步走完全流程，辅导老师批量带学员，审核老师用清单把好形式关。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/applicant" className="btn-primary">开始五步申报</Link>
              <Link to="/policies" className="btn-secondary">政策条件速查</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">为什么需要职评AI</p>
          <h2 className="headline text-[30px] md:text-[38px] mb-4">评审路上的四道坎</h2>
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            {pains.map((p, i) => (
              <motion.div key={p.q} {...fade(i)} className="apple-card p-7">
                <h3 className="text-[18px] font-bold mb-2">{p.q}</h3>
                <p className="text-[14.5px] text-[#6e6e73] leading-relaxed">{p.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#f5f5f7]/70">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">工作台总览</p>
          <h2 className="headline text-[30px] md:text-[38px] mb-4">三端 + 三大公共模块</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {modules.map((m, i) => (
              <motion.div key={m.path} {...fade(i)} className="h-full">
                <Link to={m.path} className="apple-card block p-7 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[28px]">{m.emoji}</span>
                    <span className={`inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r ${m.num} text-white text-[12px] font-semibold`}>{m.stat}</span>
                  </div>
                  <h3 className="text-[19px] font-bold mb-1">{m.name}</h3>
                  <p className="text-[13.5px] font-semibold text-[#0f9d8f] mb-2">{m.statLabel}</p>
                  <p className="text-[14px] text-[#6e6e73] leading-relaxed">{m.tile}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">设计基石</p>
          <h2 className="headline text-[30px] md:text-[38px] mb-4">三件事决定能否过审</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {cornerstones.map((c, i) => (
              <motion.div key={c.k} {...fade(i)} className="apple-card p-6">
                <h3 className="text-[17px] font-bold mb-2">{c.k}</h3>
                <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-4">{c.d}</p>
                <span className="text-[12.5px] font-semibold text-[#86868b]">{c.tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[30px] md:text-[38px] mb-4">现在就开始</h2>
          <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-8">从五分钟的条件自检起步，看看你离过审还差哪几步。</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/applicant" className="btn-primary">进入申报人端</Link>
            <Link to="/workshops" className="btn-secondary">看评审训练营</Link>
          </div>
          <p className="mt-12 pt-8 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
        </div>
      </section>
    </>
  )
}
