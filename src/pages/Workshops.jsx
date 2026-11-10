import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SITE, COMPLIANCE } from '../data/site'

const fade = (i) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay: i * 0.08 },
  viewport: { once: true },
})

const camps = [
  { no: 'W1', title: '评审条件拆解', short: '政策解读 · 申报策略', desc: '把申报条件原文拆成学历、年限、业绩、成果四张对照表，判断走正常晋升还是破格，选定适合自己的系列。', items: ['条件原文逐条对照', '正常晋升 vs 破格判定', '系列选择与跨度评估'] },
  { no: 'W2', title: '工作总结与业绩报告实战', short: '材料工坊 · 成稿演练', desc: '现场用材料工坊把一份流水账工作总结改出亮点，业绩报告按「成果—支撑—影响」三段式重写。', items: ['流水账改亮点实例', '业绩三段式结构', '学员材料现场点评'] },
  { no: 'W3', title: 'AI 辅助撰写与查重降险', short: '合规边界 · 风险扫描', desc: 'AI 能帮到哪、不能帮到哪：表述查重、敏感点扫描与合规提示怎么用，留痕怎么做才站得住。', items: ['AI 辅助的合规边界', '查重与敏感点扫描', '全过程留痕要点'] },
  { no: 'W4', title: '课题与论文：选题到润色', short: '成果准备 · 申报书打磨', desc: '课题申报从选题、论证到申报书成稿；论文从结构、表达到投稿前润色与查重预检。', items: ['选题与论证框架', '申报书逐节打磨', '润色与查重预检'] },
  { no: 'W5', title: '答辩演练', short: '自述稿 · 问答推演', desc: '答辩自述稿十分钟定稿，按评审专家常见提问做问答推演，练到不慌。', items: ['自述稿结构化定稿', '高频问题清单', '模拟问答与复盘'] },
  { no: 'W6', title: '提交冲刺与退回复盘', short: '要件核对 · 常见退回点', desc: '对照审核端三十六项清单逐项核对，复盘历年常见退回点，把问题消灭在提交之前。', items: ['三十六项清单核对', '常见退回点复盘', '提交前终检动作'] },
]

export default function Workshops() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">{SITE.name} · 评审训练营</p>
      <h1 className="headline text-[32px] md:text-[40px] mb-4">六场评审训练营</h1>
      <p className="text-[16px] text-[#6e6e73] leading-relaxed max-w-2xl mb-12">
        从政策解读到答辩演练，六场训练营覆盖申报全流程；直播 + 录播，每场都配可带走的清单与模板。
      </p>
      <div className="grid gap-6">
        {camps.map((w, i) => (
          <motion.div key={w.no} {...fade(i)} className="apple-card p-7 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <div className="text-4xl md:text-5xl font-black gradient-text leading-none md:w-20 shrink-0">{w.no}</div>
              <div>
                <h3 className="text-[20px] font-bold mb-1">{w.title}</h3>
                <p className="text-sm text-[#0f9d8f] mt-1 mb-3">{w.short}</p>
                <p className="text-[14.5px] text-[#6e6e73] leading-relaxed mb-4">{w.desc}</p>
                <ul className="flex flex-wrap gap-2">
                  {w.items.map((it) => (
                    <li key={it} className="px-3 py-1.5 rounded-full bg-[#f5f5f7] text-[12.5px] text-[#494949] font-medium">{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
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
