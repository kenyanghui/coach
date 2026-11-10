import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const tools = [
  {
    name: '诊断报告',
    desc: '导入学员现有材料与基本盘，AI 按系列条件逐项对照，输出一份短板定位报告：哪项符合、哪项存疑、哪项必须补。',
    items: ['条件逐项对照', '短板定位', '补强优先级排序'],
  },
  {
    name: '补强清单',
    desc: '把诊断结论翻译成可执行的补强清单：要补哪份材料、找哪类佐证、按什么顺序补，一次讲清，不靠口头交代。',
    items: ['材料级补强项', '佐证材料指引', '执行顺序建议'],
  },
  {
    name: '进度看板',
    desc: '每位学员一个看板：材料清单进度、版本记录、待办与卡点一目了然，同时带十几个学员也带得动。',
    items: ['清单进度', '版本记录', '卡点提示'],
  },
  {
    name: '跟进提醒',
    desc: '按申报节点自动生成跟进提醒：材料该交了、退回要处理了、答辩要准备了，不再依赖老师的记性。',
    items: ['节点化提醒', '退回处理跟进', '答辩准备提醒'],
  },
]

const how = [
  { k: '导入', v: '学员完成条件自检并提交现有材料底稿，辅导端自动建立学员档案。' },
  { k: '诊断', v: 'AI 生成诊断报告与补强清单，辅导老师复核后一键发给学员。' },
  { k: '推进', v: '学员按清单逐份产出初稿，AI 撰写与查重降险在申报人端完成，进度自动回流看板。' },
  { k: '收口', v: '临近提交自动进入提交核对，退回整改与答辩准备走跟进提醒闭环。' },
]

export default function Coach() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">辅导端 · 辅导利器</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">4 件利器，带得动更多学员</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-2xl">
          辅导老师最贵的成本是时间：逐个诊断、口头交代、手动追进度。
          辅导端把诊断报告、补强清单、进度看板与跟进提醒四件事交给 AI，老师只做判断与把关。
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {tools.map((t, i) => (
          <motion.div key={t.name} {...fade(i)} className="apple-card p-7">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 text-white text-[12px] font-semibold mb-4">
              {String(i + 1).padStart(2, '0')} / 04
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">{t.name}</h2>
            <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-4">{t.desc}</p>
            <ul className="space-y-1.5">
              {t.items.map((it) => (
                <li key={it} className="text-[13.5px] text-[#0f9d8f] font-medium">· {it}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(4)} className="mt-8 apple-card p-7">
        <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-4">四步闭环，怎么跑起来</h2>
        <div className="space-y-3">
          {how.map((h) => (
            <div key={h.k} className="flex gap-4 items-start">
              <span className="shrink-0 mt-0.5 inline-flex px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[12.5px] font-semibold text-[#1d1d1f]">{h.k}</span>
              <p className="text-[14px] text-[#6e6e73] leading-relaxed">{h.v}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fade(5)} className="mt-8 apple-card p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-1">老师把关，AI 干活</h2>
          <p className="text-[13.5px] text-[#6e6e73]">学员端产出的每一份初稿，都可以回流辅导端复核留痕。</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/review" className="btn-secondary">看审核端</Link>
          <Link to="/applicant" className="btn-primary">进入申报人端</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
