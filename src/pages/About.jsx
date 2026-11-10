import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE, COMPLIANCE } from '../data/site'

const fade = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.08 },
  viewport: { once: true },
})

const methods = [
  { t: '从评审条件出发', d: '一切功能都从官方评审条件原文出发：先把条款拆成可对照的清单，再决定工具怎么做，而不是反过来。' },
  { t: '把流程拆成清单', d: '申报五步、辅导四件、审核三十六项——所有环节都变成看得见、可打勾的清单，进度不再靠记忆。' },
  { t: 'AI 只做辅助', d: 'AI 负责成稿、查重、提示风险，内容责任始终在申报人自己；每一步都有留痕，可回溯、可修改。' },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">关于 · {SITE.name}</p>
      <h1 className="headline text-[34px] md:text-[44px] mb-5">{SITE.fullName}</h1>
      <p className="text-[16.5px] text-[#6e6e73] leading-relaxed mb-4">
        {SITE.tagline}。我们把职称评审从「一个人对着几十页政策文件摸索」，变成「三端协同、逐项打勾的流程」：申报人端带申报人走完五步，辅导端帮老师批量诊断与跟进，审核端用三十六项清单把好形式关。
      </p>
      <p className="text-[16.5px] text-[#6e6e73] leading-relaxed mb-12">
        服务对象覆盖企业与高校、中小学、医院、工程与财经等不同背景的申报人，也覆盖第一次带学员的辅导老师与面对成堆材料的审核老师。
      </p>

      <h2 className="text-[22px] font-bold mb-5">工作方法</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {methods.map((m, i) => (
          <motion.div key={m.t} {...fade(i)} className="apple-card p-6">
            <h3 className="text-[16.5px] font-bold mb-2">{m.t}</h3>
            <p className="text-[13.5px] text-[#6e6e73] leading-relaxed">{m.d}</p>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(0)} className="apple-card p-7 mb-6">
        <h2 className="text-[20px] font-bold mb-3">服务基石</h2>
        <p className="text-[14.5px] text-[#6e6e73] leading-relaxed mb-5">
          政策库收录 27 个系列申报条件与破格条款速查；材料工坊覆盖 9 类高频材料的 AI 辅助撰写；工作坊提供 6 场评审训练营。三者构成申报流程之外的三块公共基石。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/policies" className="btn-secondary">政策库</Link>
          <Link to="/materials" className="btn-secondary">材料工坊</Link>
          <Link to="/workshops" className="btn-secondary">工作坊</Link>
        </div>
      </motion.div>

      <motion.div {...fade(1)} className="apple-card p-7">
        <h2 className="text-[20px] font-bold mb-2">联系我们</h2>
        <p className="text-[14.5px] text-[#6e6e73] leading-relaxed mb-4">
          对申报流程、辅导方式或审核清单有任何建议，欢迎来信交流。
        </p>
        <a href={`mailto:${SITE.email}`} className="btn-primary inline-block">写信给 {SITE.name}</a>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
