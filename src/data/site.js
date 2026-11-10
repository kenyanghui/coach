// 职评AI工作台 站点与导航契约，所有页面与派发块共用，勿改名
export const SITE = {
  name: '职评AI',
  fullName: '职称评审全流程AI工作台',
  tagline: '从申报到过审，全程AI陪跑',
  desc: '申报人、辅导老师、审核老师三端协同的职称评审AI工作台：政策条件自检、申报材料工坊、全流程AI陪伴与形式预审，一站完成。',
  email: 'yanghuihotmail@hotmail.com',
  legacyBase: '/legacy/'
};

export const navLinks = [
  { path: '/applicant', label: '申报人端' },
  { path: '/coach', label: '辅导端' },
  { path: '/review', label: '审核端' },
  { path: '/policies', label: '政策库' },
  { path: '/materials', label: '材料工坊' },
  { path: '/workshops', label: '工作坊' },
  { path: '/cases', label: '过审案例' },
  { path: '/about', label: '关于' }
];

// 首页六张能力卡：三端 + 三大公共模块；stat 须与各页真实资产对齐
export const modules = [
  { emoji: '📝', name: '申报人端', path: '/applicant', stat: '5步', statLabel: '全流程AI陪伴', tile: '条件自检 → 材料清单 → AI撰写 → 查重降险 → 提交核对', num: 'from-indigo-500 to-sky-400' },
  { emoji: '🧭', name: '辅导端', path: '/coach', stat: '4件', statLabel: '辅导利器', tile: '为每位学员生成诊断报告、补强清单、进度看板与跟进提醒', num: 'from-orange-500 to-amber-400' },
  { emoji: '✅', name: '审核端', path: '/review', stat: '36项', statLabel: '形式审查清单', tile: '材料形式预审、要件齐套核对、问题一键退回与全程留痕', num: 'from-emerald-500 to-teal-400' },
  { emoji: '📚', name: '政策库', path: '/policies', stat: '27个', statLabel: '系列评审条件', tile: '高校、中小学、卫生、工程、财经等系列申报条件与破格条款速查', num: 'from-rose-500 to-pink-400' },
  { emoji: '🛠️', name: '材料工坊', path: '/materials', stat: '9类', statLabel: '材料AI撰写', tile: '工作总结、业绩报告、论文润色、课题申报与答辩自述逐份成稿', num: 'from-orange-500 to-rose-400' },
  { emoji: '🎓', name: '工作坊', path: '/workshops', stat: '6场', statLabel: '评审训练营', tile: '从政策解读到答辩演练的系列直播与录播训练营', num: 'from-violet-500 to-fuchsia-400' }
];

export const COMPLIANCE =
  '本站内容为职称评审流程辅导与工具分享，不承诺评审结果；各系列申报条件与最终认定以相应评审委员会官方文件为准。';
