import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const steps = [
  {
    n: '01',
    name: '条件自检',
    desc: '按你的申报系列与层次，把学历、年限、业绩、论文等硬性条件逐项对照，几分钟内给出三档结论与补强方向。',
    items: ['系列条件逐项对照', '符合 / 存疑 / 不符合三档结论', '缺项补强建议'],
  },
  {
    n: '02',
    name: '材料清单',
    desc: '根据申报系列自动生成专属材料清单，标注每一份材料的形式要求、字数区间与常见退回点。',
    items: ['专属材料清单', '形式要求标注', '常见退回点提示'],
  },
  {
    n: '03',
    name: 'AI 撰写',
    desc: '你提供事实素材，AI 负责结构、语言与详略：工作总结、业绩报告、答辩自述逐份成稿，产出可直接修改的初稿。',
    items: ['素材驱动撰写', '逐份成稿', '可编辑初稿'],
  },
  {
    n: '04',
    name: '查重降险',
    desc: '对初稿做表述重复与套话密度检查，改写高风险段落，让材料既符合规范，又有个人辨识度。',
    items: ['重复表述检测', '套话密度分析', '高风险段落改写'],
  },
  {
    n: '05',
    name: '提交核对',
    desc: '按申报表单逐栏核对信息一致性，确认附件命名、格式与顺序，把最后一道退回风险降到最低。',
    items: ['逐栏一致性核对', '附件命名与格式规范', '提交前终检'],
  },
]

export default function Applicant() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">申报人端 · 全流程AI陪伴</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">5 步，从第一次申报到提交</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-2xl">
          条件自检 → 材料清单 → AI 撰写 → 查重降险 → 提交核对。不管你是企业技术骨干还是高校青年教师，
          都能按同一条流水线走完申报全流程，每一步都有 AI 陪跑。
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {steps.map((s, i) => (
          <motion.div key={s.n} {...fade(i)} className="apple-card p-7">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 text-white text-[12px] font-semibold mb-4">
              第 {s.n} 步
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">{s.name}</h2>
            <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-4">{s.desc}</p>
            <ul className="space-y-1.5">
              {s.items.map((it) => (
                <li key={it} className="text-[13.5px] text-[#0f9d8f] font-medium">· {it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(steps.length)} className="mt-8 apple-card p-7">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">第一次申报，没人带怎么办？</h2>
        <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-5">
          这正是申报人端最常被问到的问题。我们把流程拆成清单，AI 把每一份材料的要求翻译成人话；
          如果仍想有人答疑，可以预约评审训练营的直播场。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/workshops" className="btn-primary">看评审训练营</Link>
          <Link to="/coach" className="btn-secondary">了解辅导端</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
