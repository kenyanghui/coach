import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import growth from '../data/growth'

const OPTIONS = [
  { v: 0, label: '未达' },
  { v: 1, label: '部分' },
  { v: 2, label: '达标' },
]

export default function Growth() {
  const [scores, setScores] = useState({})
  const [vetoes, setVetoes] = useState({})
  const [result, setResult] = useState(null)

  const answered = Object.keys(scores).length
  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  const vetoHit = Object.values(vetoes).filter(Boolean).length

  const evaluate = () => {
    let level = 'L1'
    if (total >= 15 && vetoHit === 0) level = 'L3'
    else if (total >= 10) level = 'L2'
    const gaps = growth.dims.filter(d => (scores[d.id] ?? 0) <= 1)
    setResult({ level, gaps, forced: vetoHit > 0 && total >= 10 })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">量系列 · 01 量成长</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">AI 量化自评</h1>
      <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-2">
        三级九维，五分钟测出你的投资系统在哪一层。每维三档：未达 / 部分 / 达标，对照描述选最接近的一档。
      </p>
      <p className="text-[13px] text-[#86868b] mb-10">满分 18 分 · 已答 {answered}/9 维{result ? ` · 总分 ${total}` : ''}</p>

      {/* 九维自评 */}
      <div className="space-y-4 mb-10">
        {growth.dims.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            className="apple-card p-6"
          >
            <div className="flex items-baseline justify-between mb-2">
              <div className="text-[17px] font-bold text-[#1d1d1f]">{d.name}</div>
              <div className="text-[12.5px] text-[#86868b]">{d.ask}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-2 mb-4">
              {[d.l1, d.l2, d.l3].map((desc, idx) => (
                <div key={idx} className={`text-[12px] leading-relaxed px-3 py-2 rounded-xl border transition-colors ${scores[d.id] === idx ? 'border-[#ff5a1f]/50 bg-[#ff5a1f]/[.06] text-[#1d1d1f]' : 'border-black/[.06] text-[#6e6e73]'}`}>{desc}</div>
              ))}
            </div>
            <div className="flex gap-2">
              {OPTIONS.map(o => (
                <button
                  key={o.v}
                  onClick={() => setScores(s => ({ ...s, [d.id]: o.v }))}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ${scores[d.id] === o.v ? 'bg-[#ff5a1f] text-white' : 'bg-black/[.04] text-[#6e6e73] hover:bg-black/[.08]'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 一票否决 */}
      <div className="apple-card p-6 mb-10 border-[#a63a2e]/30">
        <div className="text-[17px] font-bold text-[#a63a2e] mb-2">一票否决项</div>
        <p className="text-[13px] text-[#6e6e73] mb-4">诚实作答。任何一项命中，系统等级直接判 L1——地基不稳，上层不建。</p>
        <div className="space-y-2">
          {growth.veto.map(v => (
            <label key={v.id} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black/[.02] cursor-pointer hover:bg-black/[.04] transition-colors">
              <input
                type="checkbox"
                checked={!!vetoes[v.id]}
                onChange={e => setVetoes(s => ({ ...s, [v.id]: e.target.checked }))}
                className="w-4 h-4 accent-[#a63a2e]"
              />
              <span className={`text-[14px] ${vetoes[v.id] ? 'text-[#a63a2e] font-semibold' : 'text-[#1d1d1f]'}`}>{v.text}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="text-center mb-10">
        <button
          onClick={evaluate}
          disabled={answered < 9}
          className={`btn-primary ${answered < 9 ? 'opacity-40 pointer-events-none' : ''}`}
        >
          {answered < 9 ? `还剩 ${9 - answered} 维未答` : '生成我的评级 →'}
        </button>
      </div>

      {/* 结果 */}
      {result && (
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="space-y-6">
          {result.forced && (
            <div className="rounded-2xl border border-[#a63a2e]/40 bg-[#a63a2e]/[.05] px-6 py-4 text-[14px] font-semibold text-[#a63a2e]">
              ⚠ 一票否决生效：存在地基性风险行为，无论得分多少，当前等级 L1。先修地基，再谈系统。
            </div>
          )}
          <div className="apple-card p-8">
            <div className="eyebrow mb-2">你的评级</div>
            <div className="text-[30px] font-black gradient-text mb-3">
              {growth.levels.find(l => l.id === result.level).name}
            </div>
            <p className="text-[14px] leading-relaxed text-[#424245] mb-3">{growth.levels.find(l => l.id === result.level).desc}</p>
            <p className="text-[13.5px] leading-relaxed text-[#e14e15] font-medium">{growth.levels.find(l => l.id === result.level).upgrade}</p>
          </div>

          {/* 九维进度条 */}
          <div className="apple-card p-8">
            <div className="eyebrow mb-4">九维画像</div>
            <div className="space-y-3">
              {growth.dims.map(d => {
                const s = scores[d.id] ?? 0
                return (
                  <div key={d.id} className="flex items-center gap-4">
                    <div className="w-12 text-[13px] font-semibold text-[#1d1d1f] shrink-0">{d.name}</div>
                    <div className="flex-1 h-2 rounded-full bg-black/[.06] overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-700 ${s === 0 ? 'bg-[#c7c7cc]' : s === 1 ? 'bg-[#f59e0b]' : 'bg-[#ff5a1f]'}`} style={{ width: `${(s / 2) * 100}%` }} />
                    </div>
                    <div className="w-8 text-right text-[12px] text-[#86868b]">{s}/2</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 缺口与建议 */}
          <div className="apple-card p-8">
            <div className="eyebrow mb-4">缺口与下一步</div>
            {result.gaps.length === 0 ? (
              <p className="text-[14px] text-[#424245]">九维全绿——保持进化节奏，去 <Link to="/coai" className="text-[#e14e15] font-semibold">共拆AI·悟道</Link> 看下一步。</p>
            ) : (
              <>
                <p className="text-[13.5px] text-[#6e6e73] mb-4">以下 {result.gaps.length} 维是你的缺口，按 <Link to="/guide" className="text-[#e14e15] font-semibold">量指南</Link> 的路线补：</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {result.gaps.map(g => (
                    <span key={g.id} className="px-3 py-1 rounded-full bg-[#f59e0b]/10 text-[#b45309] text-[13px] font-semibold">{g.name}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/guide" className="btn-primary">看对应路线图</Link>
                  <Link to="/tools" className="btn-secondary">挑工具补缺口</Link>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
      <p className="text-[13px] mt-4">测完去 <Link to="/guide" className="text-[#e14e15] font-semibold">量指南</Link> 看路线 →</p>
    </div>
  )
}
