import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const groups = [
  {
    name: '高校教师系列',
    count: 6,
    series: ['高校教师（本专科）', '高校思政课教师', '高校辅导员', '党校教师', '成人高校教师', '高职院校教师'],
  },
  {
    name: '中小学教师系列',
    count: 4,
    series: ['中小学正高级教师', '中小学高级教师', '中小学一级教师', '幼儿园教师'],
  },
  {
    name: '卫生健康系列',
    count: 5,
    series: ['卫生高级（医疗）', '卫生高级（药学）', '卫生高级（护理）', '卫生高级（医技）', '中医药系列'],
  },
  {
    name: '工程技术系列',
    count: 6,
    series: ['建设工程', '交通工程', '水利工程', '机械工程', '电子信息工程', '化工工程'],
  },
  {
    name: '财经管理系列',
    count: 4,
    series: ['会计', '经济', '统计', '审计'],
  },
  {
    name: '其他系列',
    count: 2,
    series: ['农业技术', '新闻出版'],
  },
]

const total = groups.reduce((n, g) => n + g.count, 0)

export default function Policies() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">政策库 · 系列评审条件</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">{total} 个系列，条件先看懂再申报</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-3xl">
          高校、中小学、卫生、工程、财经等系列申报条件与破格条款速查。
          政策太厚看不懂？我们把每个系列的硬性条件拆成逐项清单，先对照再动手。
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <motion.div key={g.name} {...fade(i)} className="apple-card p-7 h-full">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-400 text-white text-[12px] font-semibold mb-4">
              {g.count} 个系列
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-4">{g.name}</h2>
            <div className="flex flex-wrap gap-2">
              {g.series.map((s) => (
                <span key={s} className="inline-block px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[13px] text-[#424245]">{s}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(6)} className="mt-8 apple-card p-7">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-2">破格条款</h2>
        <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-4">
          业绩特别突出的申报人，多数系列都有破格通道：学历年限不足、无现职聘任等情形，
          各系列的破格门槛与佐证要求不同。政策库按系列整理破格条款原文要点，
          申报人端做条件自检时会自动判断你是否走得上破格通道。
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/applicant" className="btn-primary">做条件自检</Link>
          <Link to="/materials" className="btn-secondary">看材料工坊</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
