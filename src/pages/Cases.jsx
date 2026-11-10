import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const cases = [
  {
    tag: '高校教师 · 副高申报',
    title: '「论文不够，用课题和专题报告补业绩链」',
    background: '工科青年教师，教学任务重，三年只有两篇论文，担心业绩厚度不够，一度想放弃当年度申报。',
    action: '条件自检发现该系列论文是「代表作制」而非数量制；按补强清单补了一项在研课题论证与一份技术专题报告，业绩报告围绕代表作重组。',
    result: '材料按代表作制逻辑成稿，顺利进入答辩并通过。',
  },
  {
    tag: '卫生健康 · 主管护师',
    title: '「日常业绩很散，按质量改善项目重新归堆」',
    background: '三甲医院护士长，日常工作琐碎，业绩材料东一份西一份，自己写了两版都被辅导老师退回。',
    action: '把散点业绩归拢到三个护理质量改善项目下，每个项目补齐数据与佐证，业绩报告按「问题—措施—成效」重写。',
    result: '第三版一次过审，答辩自述也直接复用了业绩链结构。',
  },
  {
    tag: '建设工程 · 高级工程师',
    title: '「内容没问题，形式被退了两次」',
    background: '项目工程师，业绩扎实，但材料形式细节频频踩坑：附件命名混乱、盖章页缺失、日期前后不一致，连续被退两次。',
    action: '对照审核端形式预审清单逐项重排附件，提交核对环节把命名规范、签章页、日期一致性全部过卡。',
    result: '第三次提交顺利受理，形式问题零退回。',
  },
  {
    tag: '中小学教师 · 正高级',
    title: '「政策看不懂，先把条件逐项拆完再动手」',
    background: '小学教师申报正高级，面对厚厚一沓政策文件不知道从哪里读起，也说不清自己到底差什么。',
    action: '用政策库把本系列条件逐项拆成人话清单，条件自检定位出「示范引领作用」佐证最薄弱，据此补齐公开课与送教下乡材料。',
    result: '按清单补强后申报，未再出现条件类疑问，进入评审环节。',
  },
]

export default function Cases() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">过审案例 · 学员匿名复盘</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">他们是怎么过审的</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-2xl">
          四个不同背景申报人的复盘案例：问题不同，方法相同——先懂条件、再清清单、逐份成稿、形式过卡。
          案例仅用于展示方法，不构成任何评审承诺。
        </p>
      </motion.div>

      <div className="mt-12 space-y-5">
        {cases.map((c, i) => (
          <motion.div key={c.tag} {...fade(i)} className="apple-card p-7">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[12.5px] font-semibold text-[#1d1d1f] mb-4">
              {c.tag}
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-4">{c.title}</h2>
            <div className="space-y-3">
              <p className="text-[14px] text-[#6e6e73] leading-relaxed"><span className="font-semibold text-[#1d1d1f]">困局：</span>{c.background}</p>
              <p className="text-[14px] text-[#6e6e73] leading-relaxed"><span className="font-semibold text-[#1d1d1f]">做法：</span>{c.action}</p>
              <p className="text-[14px] text-[#6e6e73] leading-relaxed"><span className="font-semibold text-[#1d1d1f]">结果：</span>{c.result}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(cases.length)} className="mt-8 apple-card p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-1">想按同样的路走一遍？</h2>
          <p className="text-[13.5px] text-[#6e6e73]">从条件自检开始，5 步流水线把你的申报走完。</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/applicant" className="btn-primary">进入申报人端</Link>
          <Link to="/workshops" className="btn-secondary">看评审训练营</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
