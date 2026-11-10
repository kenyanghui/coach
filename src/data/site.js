// 站点级常量（量系列八模块导航契约 —— 所有页面与派发块共用，勿改名）
export const SITE = {
  name: '万丰·量AI',
  fullName: '万丰AI量化课程',
  tagline: '量的是市场，立的是系统',
  desc: '以万丰系统与 27 个优秀开源量化系统为基石，从实践出发，逆向工程一套自进化的个人投资系统。',
  email: 'yanghuihotmail@hotmail.com',
  // 旧站（正行明熙教练站）在新部署中的归宿：/legacy/ 路径，保留 67 页量化工具详解与训练营长页
  legacyBase: '/legacy/',
}

export const navLinks = [
  { path: '/growth', label: '量成长' },
  { path: '/classics', label: '量经典' },
  { path: '/guide', label: '量指南' },
  { path: '/buddy', label: '量搭子' },
  { path: '/tools', label: '量工具' },
  { path: '/skills', label: '量技能' },
  { path: '/experts', label: '量专家' },
  { path: '/appstory', label: '量实证' },
  { path: '/workshops', label: '工作坊' },
  { path: '/coai', label: '共拆AI' },
  { path: '/about', label: '关于' },
]

// 八大模块卡（首页与关于页共用；stat 数字须与各页真实资产对齐）
export const modules = [
  { k: '量成长', en: 'Growth', emoji: '📈', d: 'AI量化自评：三级九维过级路线，先测出你在哪一层', stat: '3 级 × 9 维', statLabel: '自评量表 · 附一票否决项', href: '/growth', tile: 'bg-indigo-500/10', num: 'text-indigo-600' },
  { k: '量经典', en: 'Classics', emoji: '📖', d: 'AI量化书籍：精选量化书单，每本给出「读什么·悟什么·用什么」', stat: '24+ 本', statLabel: '七类书单 · RIA 拆读', href: '/classics', tile: 'bg-rose-500/10', num: 'text-rose-600' },
  { k: '量指南', en: 'Guide', emoji: '🧭', d: 'AI量化指南：从数据到实盘的六条路线图，步步带工具', stat: '6 条路线', statLabel: '入门·数据·回测·实盘·风控·Agent', href: '/guide', tile: 'bg-teal-500/10', num: 'text-teal-600' },
  { k: '量搭子', en: 'Buddy', emoji: '🤝', d: 'AI搭子邀约：WorkBuddy 证券版打头阵，人机共创小组', stat: '4 类搭子', statLabel: '邀约中 · 组队共拆', href: '/buddy', tile: 'bg-amber-500/10', num: 'text-amber-600' },
  { k: '量工具', en: 'Tools', emoji: '🛠️', d: 'AI量化软件：万丰系统 + 27 个开源系统，培训基石全图谱', stat: '28 系统', statLabel: '数据·研究·回测·实盘·Agent', href: '/tools', tile: 'bg-orange-500/10', num: 'text-orange-600' },
  { k: '量技能', en: 'Skills', emoji: '🎯', d: 'AI量化技能：数据、研究、工程、AI、心法五簇技能点逐项点亮', stat: '5 簇技能', statLabel: '40+ 技能点 · 逐项可练', href: '/skills', tile: 'bg-sky-500/10', num: 'text-sky-600' },
  { k: '量专家', en: 'Masters', emoji: '🧠', d: 'AI量化思想：量化大师的第一性原理，搬到你的系统里', stat: '12 位大师', statLabel: '思想·著作·启示', href: '/experts', tile: 'bg-violet-500/10', num: 'text-violet-600' },
  { k: '共拆AI', en: 'Co-AI', emoji: '☯️', d: 'AI量化悟道：投资的道 × AI 的道，万丰AI全家族入口', stat: '2 道 × 5 门', statLabel: '悟道篇 · 万丰AI入口', href: '/coai', tile: 'bg-emerald-500/10', num: 'text-emerald-600' },
]

// 合规红线（凡涉策略/实盘/收益的页面脚注必须带）
export const COMPLIANCE = '本站内容为课程教学与方法论分享，不构成任何投资建议；市场有风险，投资需谨慎。'
