import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { COMPLIANCE } from '../data/site'

const fade = (i) => ({ initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.45, delay: i * 0.08 }, viewport: { once: true } })

const blocks = [
  {
    name: '材料形式预审',
    count: 12,
    desc: '不看内容先看形式：绝大多数退回发生在形式层，而不是水平层。',
    items: ['字数区间', '字体字号', '页边距', '装订顺序', '签字盖章', '照片规格', '附件命名', 'PDF 清晰度', '表格版本', '日期一致性', '目录页码', '格式模板'],
  },
  {
    name: '要件齐套核对',
    count: 14,
    desc: '按系列条件把必备证明材料逐项核对，缺哪份、缺什么版本，一屏看清。',
    items: ['学历证书', '学位证书', '现任职称证书', '聘任文件', '继续教育学时', '年度考核', '业绩成果证明', '论文检索页', '课题立项与结题', '获奖证书', '社保或聘用证明', '破格审批材料', '代表作', '单位公示材料'],
  },
  {
    name: '一键退回',
    count: 6,
    desc: '发现问题的那一刻，退回单已经在路上：定位、描述、整改要求一次说清。',
    items: ['问题定位', '问题描述模板', '一键生成退回单', '学员端同步', '整改复核', '重提检查'],
  },
  {
    name: '全程留痕',
    count: 4,
    desc: '每一次预审、退回与复核都有据可查，责任清晰，复盘有底稿。',
    items: ['操作日志', '版本快照', '审核意见归档', '进度导出'],
  },
]

const total = blocks.reduce((n, b) => n + b.count, 0)

export default function Review() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <motion.div {...fade(0)}>
        <p className="text-[12.5px] font-semibold text-[#e14e15] tracking-widest mb-3">审核端 · 形式审查清单</p>
        <h1 className="headline text-[30px] md:text-[38px] mb-4">{total} 项清单，把退回压到最少</h1>
        <p className="text-[16px] text-[#424245] leading-relaxed max-w-2xl">
          材料形式预审、要件齐套核对、问题一键退回与全程留痕。
          审核老师从「逐份翻材料」变成「按清单过卡点」，形式问题在提交前就被拦住。
        </p>
      </motion.div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.div key={b.name} {...fade(i)} className="apple-card p-7">
            <div className="inline-flex px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-[12px] font-semibold mb-4">
              {b.count} 项
            </div>
            <h2 className="text-[19px] font-semibold text-[#1d1d1f] mb-2">{b.name}</h2>
            <p className="text-[14px] text-[#6e6e73] leading-relaxed mb-4">{b.desc}</p>
            <div className="flex flex-wrap gap-2">
              {b.items.map((it) => (
                <span key={it} className="inline-block px-2.5 py-1 rounded-full bg-[#f5f5f7] text-[13px] text-[#424245]">{it}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div {...fade(4)} className="mt-8 apple-card p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold text-[#1d1d1f] mb-1">形式问题，不用等到评审会</h2>
          <p className="text-[13.5px] text-[#6e6e73]">申报人在提交核对环节就对照同一套清单，审核端只是最后一道复核。</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link to="/policies" className="btn-secondary">查政策条件</Link>
          <Link to="/applicant" className="btn-primary">进入申报人端</Link>
        </div>
      </motion.div>

      <p className="mt-10 pt-6 border-t border-[#e8e8ed] text-[12.5px] text-[#86868b] leading-relaxed">{COMPLIANCE}</p>
    </div>
  )
}
