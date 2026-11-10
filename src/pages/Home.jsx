import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { modules, SITE, COMPLIANCE } from '../data/site'

const pains = [
  { q: '看了一堆量化课程，还是搭不起自己的系统', a: '课里教的是别人的策略。这里从你的账户、你的数据、你的纪律出发，逆向工程一套属于你的投资系统。' },
  { q: 'Python 也学了，回测也跑了，实盘就翻车', a: '因为缺的不是代码，是「数据→研究→回测→风控→实盘」的完整链路。课程按链路走，每环都有工具。' },
  { q: 'AI 工具收藏了一排，一个都没进投资流程', a: '工具不在多，在拆。万丰系统 + 27 个开源系统，挑对你有用的，拆开、接上、跑起来。' },
  { q: '一个人练不下去，缺反馈也缺同伴', a: '量搭子机制：AI 搭子 24 小时在，人搭子小组共拆，每期互验收。' },
]

const cornerstones = [
  { k: '万丰系统', d: '主动式 Agent 工作台 + 量化研究平台：行为诊断、策略压力测试、组合预检、审计留痕——课程的家用主基地。', tag: '自研基座' },
  { k: '27 个开源系统', d: 'vnpy、Qlib、FinRL、Backtrader、freqtrade、OpenBB、TradingAgents……每个都站在巨人肩上，逆向工程它们是最好的教材。', tag: '开源基石' },
  { k: 'WorkBuddy 证券版', d: '从实践出发的第一站：已有优秀开源项目入手，AI 搭子随身带，把研究、复盘、纪律执行装进日常。', tag: '实践入口' },
]

const takes = [
  ['测得清', 'AI量化自评量表先定位：3 级 9 维，你在哪一层、缺哪一环，课程表跟着你的缺口走。'],
  ['搭得起', '从数据源到实盘网关，六个环节各带一个能跑的工具。结课时你的系统骨架已经通电。'],
  ['进化得动', '逆向工程的终点是自进化：策略会迭代，纪律会加固，AI 搭子陪你复盘每一笔交易。'],
]

export default function Home() {
  return (
    <div>
      {/* ==================== Hero ==================== */}
      <section className="hero-wash pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff5a1f]/[.08] text-[#e14e15] text-[12.5px] font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-pulse" />
              万丰AI量化课程 · 官方阵地
            </div>
            <h1 className="headline text-[40px] md:text-[56px] mb-6">
              量的是市场，<br />立的是<span className="gradient-text">自己的投资系统</span>
            </h1>
            <p className="text-[#6e6e73] text-[17px] leading-relaxed mb-8 max-w-2xl">
              {SITE.desc}从 WorkBuddy 证券版与优秀开源项目入手，先做投资业务工具，用 Loong 拆解，发布到公众号——每一步都当堂做出来。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/growth" className="btn-primary">先做 AI 量化自评 →</Link>
              <Link to="/tools" className="btn-secondary">看 28 系统基石图谱</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 痛点 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-3">先说痛点</div>
          <h2 className="headline text-[30px] md:text-[38px] mb-12">这些弯路，我们都替你走过</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {pains.map((p, i) => (
              <motion.div
                key={p.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="apple-card p-7"
              >
                <div className="text-[16.5px] font-bold text-[#1d1d1f] mb-3">「{p.q}」</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{p.a}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 八大模块 ==================== */}
      <section className="py-24 px-4 bg-[#f5f5f7] border-y border-black/[.05]">
        <div className="max-w-6xl mx-auto">
          <div className="eyebrow mb-3 text-center">站点全景 · 一图看懂</div>
          <h2 className="headline text-[30px] md:text-[40px] text-center mb-4">
            八个模块，一条<span className="gradient-text">「量」的进阶线</span>
          </h2>
          <p className="text-center text-[#6e6e73] text-[15px] mb-14 max-w-2xl mx-auto">
            从自评定层，到读书补根、按路线搭系统、找搭子共练、拆开真工具、长出技能、吸收大师思想——最后悟自己的道。每一站都有真实资产在跑，不摆概念。
          </p>
          <div className="relative">
            <div className="hidden lg:block absolute top-[46px] left-[12%] right-[12%] h-[2px] rounded-full bg-gradient-to-r from-indigo-400/50 via-orange-400/50 to-emerald-400/50" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {modules.map((m, i) => (
                <motion.div
                  key={m.k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.09 }}
                >
                  <Link to={m.href} className="group block h-full apple-card p-5 !shadow-sm">
                    <div className="flex lg:justify-center mb-4">
                      <div className={`relative w-12 h-12 rounded-2xl ${m.tile} flex items-center justify-center text-2xl`}>
                        {m.emoji}
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-white border border-black/10 text-[9px] font-bold text-[#86868b] flex items-center justify-center shadow-sm">{i + 1}</span>
                      </div>
                    </div>
                    <div className="text-[17px] font-black text-[#1d1d1f] mb-1 lg:text-center">{m.k}</div>
                    <div className="text-[11.5px] leading-snug text-[#6e6e73] mb-4 lg:text-center">{m.d}</div>
                    <div className="lg:text-center">
                      <div className={`text-[22px] font-black leading-none ${m.num}`}>{m.stat}</div>
                      <div className="text-[10px] text-[#86868b] mt-1.5 tracking-wide">{m.statLabel}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link to="/coai" className="text-[13px] font-semibold text-[#e14e15] hover:text-[#1d1d1f] transition-colors">
              投资的道 × AI 的道 → 看共拆AI 悟道专页
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 基石 ==================== */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3">培训基石</div>
          <h2 className="headline text-[30px] md:text-[38px] mb-4">不从零造轮子：站在万丰与 27 个开源系统上</h2>
          <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-10 max-w-3xl">
            GitHub 上的 coach 课程体系，把万丰系统和 27 个优秀开源量化系统作为培训基石。从实践出发的工作坊思路：从 WorkBuddy 证券版入手，从已有的优秀开源项目入手，逆向工程——目标是自进化的个人投资系统。
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {cornerstones.map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="apple-card p-7"
              >
                <div className="inline-flex px-2.5 py-0.5 rounded-full bg-[#ff5a1f]/10 text-[#e14e15] text-[11.5px] font-semibold mb-3">{c.tag}</div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2.5">{c.k}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 三个带走 ==================== */}
      <section className="py-20 px-4 bg-white border-t border-black/[.05]">
        <div className="max-w-5xl mx-auto">
          <div className="eyebrow mb-3 text-center">验收标准</div>
          <h2 className="headline text-[30px] md:text-[38px] text-center mb-12">每期只认一个标准：你的系统长出了什么</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {takes.map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className="text-[34px] font-bold gradient-text mb-3">0{i + 1}</div>
                <div className="text-[18px] font-bold text-[#1d1d1f] mb-2">{t}</div>
                <div className="text-[13.5px] leading-relaxed text-[#6e6e73]">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="py-20 px-4 bg-[#f5f5f7] border-t border-black/[.05]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="headline text-[28px] md:text-[36px] mb-4">先测一测：你的量化系统在第几层？</h2>
          <p className="text-[#6e6e73] text-[15px] leading-relaxed mb-8">
            三级九维 AI 量化自评，五分钟出结果。测完你会拿到一张自己的缺口图，和对应的课程路线。
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/growth" className="btn-primary">开始自评 →</Link>
            <Link to="/guide" className="btn-secondary">先看六条路线图</Link>
          </div>
          <p className="text-[12px] text-[#86868b] mt-10">{COMPLIANCE}</p>
        </div>
      </section>
    </div>
  )
}
