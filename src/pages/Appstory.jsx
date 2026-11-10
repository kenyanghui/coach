import { motion } from 'framer-motion'
import { COMPLIANCE } from '../data/site'
import data from '../data/appstory'

export default function Appstory() {
  const fade = (i) => (
    { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45, delay: i * 0.08 } }
  )

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">
      <div className="eyebrow">{data.header.eyebrow}</div>
      <h1 className="headline text-4xl md:text-5xl mt-2 mb-4">{data.header.headline}</h1>
      <p className="text-[#6e6e73] max-w-2xl leading-relaxed">{data.header.sub}</p>

      <div className="flex flex-wrap gap-3 mt-8">
        {data.eras.map((e) => (
          <a key={e.tag} href={`#era-${e.tag}`} className="apple-card px-5 py-3 text-sm font-medium">
            <span className="gradient-text font-semibold">{e.tag}</span>
            <span className="text-[#6e6e73]"> · {e.title} · {e.period}</span>
          </a>
        ))}
        <a href="#rsi-lineage" className="apple-card px-5 py-3 text-sm font-medium text-[#6e6e73]">RSI 工作流族谱</a>
        <a href="#coach-topics" className="apple-card px-5 py-3 text-sm font-medium text-[#6e6e73]">coach 课题安排</a>
      </div>

      <section id="era-1.0" className="mt-16">
        <div className="eyebrow">1.0 时代 · 过去</div>
        <h2 className="headline text-2xl md:text-3xl mt-2 mb-4">{data.eras[0].title}</h2>
        <p className="text-[#6e6e73] mb-6">{data.eras[0].intro}</p>
        <div className="apple-card p-6 overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[#86868b] border-b border-black/5">
                <th className="py-2 pr-4 font-medium">底座</th>
                <th className="py-2 pr-4 font-medium">代号</th>
                <th className="py-2 font-medium">一句话定位</th>
              </tr>
            </thead>
            <tbody>
              {data.eras[0].bases.map((b, i) => (
                <motion.tr key={b.name} {...fade(i)} className="border-b border-black/5 last:border-0">
                  <td className="py-3 pr-4 font-semibold whitespace-nowrap">{b.name}</td>
                  <td className="py-3 pr-4 text-[#0f9d8f] font-medium whitespace-nowrap">{b.code}</td>
                  <td className="py-3 text-[#6e6e73]">{b.desc}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <div className="flex items-baseline gap-3 mb-4">
            <h3 className="headline text-xl">{data.experiences.title}</h3>
            <span className="text-[12px] text-[#86868b]">{data.experiences.note}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {data.experiences.items.map((t, i) => (
              <motion.blockquote key={t} {...fade(i)} className="apple-card p-5 border-l-4 border-l-[#ff5a1f]">
                <p className="text-[15px] text-[#1d1d1f] leading-relaxed">「{t}」</p>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="era-2.0" className="mt-16">
        <div className="eyebrow">2.0 时代 · 现状</div>
        <h2 className="headline text-2xl md:text-3xl mt-2 mb-4">{data.eras[1].title}</h2>
        <p className="text-[#6e6e73] mb-6">架构一句话：<span className="gradient-text font-semibold">{data.eras[1].intro}</span></p>

        <motion.div {...fade(0)} className="apple-card p-6">
          <div className="rounded-xl border border-[#ff5a1f]/30 bg-[#ff5a1f]/5 px-5 py-4 text-center font-semibold text-[#1d1d1f]">
            {data.eras[1].architecture.root}
          </div>
          <div className="w-px h-4 bg-[#ff5a1f]/30 mx-auto" />
          <div className="grid md:grid-cols-3 gap-4">
            {data.eras[1].architecture.blocks.map((b, i) => (
              <motion.div key={b.name} {...fade(i)} className="rounded-xl border border-black/5 bg-white/60 p-4">
                <div className="font-semibold text-[15px]">{b.name}</div>
                <div className="text-[12px] text-[#0f9d8f] font-medium mt-1">{b.role}</div>
                <p className="text-[13px] text-[#6e6e73] mt-2 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-[12px] text-[#86868b] mt-4 text-center">{data.eras[1].architecture.external}</p>
        </motion.div>

        <h3 className="headline text-xl mt-10 mb-4">{data.eras[1].capabilityIntro}</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {data.eras[1].capabilities.map((c, i) => (
            <motion.div key={c.name} {...fade(i)} className="apple-card p-5">
              <div className="font-semibold">{c.name}</div>
              <div className="text-[13px] text-[#6e6e73] mt-1">{c.conn}</div>
            </motion.div>
          ))}
        </div>
        <ul className="mt-4 space-y-2">
          {data.eras[1].extras.map((e, i) => (
            <motion.li key={e} {...fade(i)} className="text-[13px] text-[#6e6e73] flex gap-2">
              <span className="text-[#ff5a1f]">·</span>{e}
            </motion.li>
          ))}
        </ul>

        <motion.div {...fade(0)} className="mt-8 rounded-xl bg-[#0f9d8f]/10 border border-[#0f9d8f]/30 px-6 py-5">
          <div className="text-[12px] font-semibold text-[#0f9d8f] tracking-wide mb-2">边界一句话 · 工程纪律</div>
          <p className="text-[15px] text-[#1d1d1f] leading-relaxed">{data.eras[1].boundary}</p>
        </motion.div>
      </section>

      <section id="era-3.0" className="mt-16">
        <div className="eyebrow">3.0 时代 · Todo</div>
        <h2 className="headline text-2xl md:text-3xl mt-2 mb-4">{data.eras[2].title}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {data.eras[2].routes.map((r, i) => (
            <motion.div key={r.name} {...fade(i)} className="apple-card p-5">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5a1f]/10 text-[12px] font-bold text-[#ff5a1f]">{i + 1}</span>
                <div className="font-semibold">{r.name}</div>
              </div>
              <p className="text-[13px] text-[#6e6e73] mt-2 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div {...fade(0)} className="apple-card p-5 mt-4">
          <div className="text-[12px] font-semibold text-[#0f9d8f] tracking-wide mb-2">技术 tips · 课程素材</div>
          <p className="text-[13px] text-[#6e6e73] leading-relaxed">{data.eras[2].tips}</p>
        </motion.div>
      </section>

      <section id="rsi-lineage" className="mt-16">
        <div className="eyebrow">实习生培养线</div>
        <h2 className="headline text-2xl md:text-3xl mt-2 mb-6">{data.rsiLineage.title}</h2>
        <motion.div {...fade(0)} className="apple-card p-6 divide-y divide-black/5">
          {data.rsiLineage.items.map((it) => (
            <div key={it.name} className="py-3 first:pt-0 last:pb-0 grid md:grid-cols-[200px_1fr] gap-1 md:gap-4">
              <div className="text-[14px] font-semibold text-[#1d1d1f]">{it.name}</div>
              <div className="text-[13px] text-[#6e6e73] leading-relaxed">{it.desc}</div>
            </div>
          ))}
        </motion.div>
      </section>

      <section id="coach-topics" className="mt-16">
        <div className="eyebrow">万丰 coach 数据与接入 · 实习生进阶金融 RSI 系统</div>
        <h2 className="headline text-2xl md:text-3xl mt-2 mb-6">{data.coachTopics.title}</h2>

        <motion.div {...fade(0)} className="apple-card p-6 border-[#ff5a1f]/40 relative overflow-hidden">
          <div className="absolute top-4 right-4 rounded-full bg-[#ff5a1f] text-white text-[11px] font-bold px-3 py-1 tracking-wide">{data.coachTopics.flagship.badge}</div>
          <h3 className="headline text-xl pr-20">{data.coachTopics.flagship.name}</h3>
          <div className="text-[12px] text-[#0f9d8f] font-medium mt-1">{data.coachTopics.flagship.meta}</div>
          <p className="text-[14px] text-[#1d1d1f] leading-relaxed mt-3">{data.coachTopics.flagship.desc}</p>
        </motion.div>

        <div className="text-[13px] text-[#6e6e73] mt-4 leading-relaxed">{data.coachTopics.internPlan}</div>

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          {data.coachTopics.others.map((t, i) => (
            <motion.div key={t.name} {...fade(i)} className="apple-card p-5">
              <div className="font-semibold">{t.name}</div>
              <p className="text-[13px] text-[#6e6e73] mt-1 leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade(0)} className="apple-card p-5 mt-4">
          <div className="font-semibold text-[14px]">LBody 量化投资 Skill 技能和 MCP 封装</div>
          <p className="text-[13px] text-[#6e6e73] mt-1 leading-relaxed">{data.coachTopics.lbodySkill.replace('LBody 量化投资 Skill 技能和 MCP 封装：', '')}</p>
        </motion.div>
      </section>

      <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
    </div>
  )
}
