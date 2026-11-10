import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const docs = [
  {
    n: '01',
    name: '工作总结',
    short: '任现职以来的专业技术工作总结',
    points: ['按年度与条线重组经历', '突出代表性工作', '字数与体例对齐要求'],
  },
  {
    n: '02',
    name: '业绩报告',
    short: '代表性业绩与成果报告',
    points: ['业绩链结构化呈现', '成果佐证一一对应', '量化表达改写'],
  },
  {
    n: '03',
    name: '论文润色',
    short: '学术论文语言与格式润色',
    points: ['学术表达规范化', '摘要与结论重写', '参考文献格式校对'],
  },
  {
    n: '04',
    name: '课题申报',
    short: '课题申报书与立项论证',
    points: ['选题论证打磨', '研究框架搭建', '预期成果对齐条件'],
  },
  {
    n: '05',
    name: '答辩自述',
    short: '答辩自述稿与问答预演',
    points: ['5-8 分钟自述稿', '高频问题预演', '表达节奏建议'],
  },
  {
    n: '06',
    name: '专业述职',
    short: '述职报告',
    points: ['职责与贡献对齐', '数据说话', '避免流水账'],
  },
  {
    n: '07',
    name: '专题报告',
    short: '技术专题 / 业务专题报告',
    points: ['专题结构化', '技术路线清晰化', '成果与效益量化'],
  },
  {
    n: '08',
    name: '代表作说明',
    short: '代表作内容简介与创新点提炼',
    points: ['创新点提炼', '与评审条件挂钩', '说明材料成稿'],
  },
  {
    n: '09',
    name: '申报表填报',
    short: '评审表逐栏填写与一致性核对',
    points: ['逐栏填写指引', '多表口径一致性', '常见填报错误拦截'],
  },
]

export default function Materials() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">材料工坊 · 材料AI撰写</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">9 类材料，逐份成稿</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-3xl">
          工作总结、业绩报告、论文润色、课题申报与答辩自述逐份成稿。
          你提供事实素材，AI 负责结构、语言与详略；每份初稿都经过查重降险，再进入提交核对。
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {docs.map((d, i) => (
          <motion.div key={d.n} {...fade(i)} className="apple-card p-7 h-full">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-rose-400 text-white text-[12px] font-semibold mb-4">
              {d.n} / 09
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-1">{d.name}</h2>
            <p className="text-[13.5px] text-[#0f9d8f] font-medium mb-3">{d.short}</p>
            <ul className="space-y-1.5">
              {d.points.map((p) => (
                <li key={p} className="text-[13.5px] text-[#6e6e73] leading-relaxed">· {p}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(9)} className="mt-8 apple-card p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-1">先有清单，再动笔</h2>
          <p className="text-[13.5px] text-[#6e6e73]">建议先在申报人端完成条件自检与材料清单，再回到工坊逐份成稿。</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/applicant" className="btn-primary">做条件自检</Link>
          <Link to="/review" className="btn-secondary">看形式审查清单</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
