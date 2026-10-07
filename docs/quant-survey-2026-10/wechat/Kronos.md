# Kronos — 金融 K 线基座模型

> 抓取日期：2026-10-07。来源：`https://www.zdoc.app/zh/shiyu-coder/Kronos`（zdoc 翻译页）+ GitHub API `github.com/shiyu-coder/Kronos`（页面指向的项目实体）。
> 注意：zdoc.app 只是 README 的多语言翻译镜像，**项目实体 = GitHub 仓库 `shiyu-coder/Kronos`**。

## ① 一句话定位
首个开源的金融 K 线（OHLCV）序列**基座模型**，用「分层离散 token + 自回归 Transformer」把 K 线当作金融市场的语言来做统一预训练（预测、回测、微调）。

## ② Stars / 许可证 / 更新 / 活跃度
- Stars：**40,101**，Forks：6,671，Watchers 等 see API；Open issues：282（API，2026-10-07）
- 许可证：**MIT**
- 创建：2025-07-01；最后代码推送：**2026-04-13**（`pushed_at`；近期 commit 为 PR 合并）；仓库元数据 2026-10-07 仍有更新（star 计数）
- 活跃度：**高知名度、代码更新偏慢**（底座代码最近一次 main 推送约 6 个月前）。已发布论文与微调脚本；AAAI 2026 接收（[2025.11.10]）、arXiv 2025.08.02、微调脚本 2025.08.17（来自 zdoc 翻译的 README 新闻区）
- 语言构成（API）：Python 212KB / HTML 46KB / Shell 1KB

## ③ 技术栈
- Python 3.10+，PyTorch，Hugging Face Hub（模型 `NeoQuasar/Kronos-*`）
- 架构：专用 Tokenizer（连续多维 K 线 → 分层离散 token）+ 仅解码器自回归 Transformer
- 模型库（README）：Kronos-mini(4.1M, ctx 2048)、Kronos-small(24.7M, ctx 512)、Kronos-base(102.3M, ctx 512) 开源；Kronos-large(499.2M) **未开源**
- 微调链路依赖 `pyqlib`（Qlib），torchrun 多卡
- 在线 demo：`shiyu-coder.github.io/Kronos-demo`；论文 `arxiv.org/abs/2508.02739`

## ④ 数据面与 A 股适用性
- 训练/演示覆盖 **45+ 个全球交易所**的 K 线数据（README 自述）
- 输入：pandas DataFrame，列 `['open','high','low','close']`，`volume`/`amount` 可选；需提供历史/未来时间戳
- **A 股适配有官方示例**：仓库 `finetune/` 用 Qlib 准备中国 A 股数据、微调、跑 top-K 回测；示例数据 `XSHG_5min_600977.csv`
- 支持 `predict_batch` 多资产并行；预测输出 OHLCV 概率采样（T / top_p / sample_count）
- 局限：small/base 的 `max_context=512`，输入过长会自动截断

## ⑤ 核心能力
- 零样本/少样本 K 线预测（概率采样、可生成多路径并平均）
- 可微调 Tokenizer + Predictor 到自定义市场
- Qlib 数据管线 + 简单 top-K 回测示例（含累计收益曲线）
- README 明确声明：演示非生产级量化系统，稳健策略还需组合优化与风险因子中性化

## ⑥ 与「A 股投研 + 万丰 CIO」契合度：**4 / 5**
理由：A 股有官方微调+回测示范，模型小可本地/私有化部署，MIT 许可对商用友好，适合作为量化投研的「预测因子/信号生成器」原型。扣分：本质是研究型基座模型，不是完整策略系统；512 上下文与「原始信号非 pure alpha」的官方免责声明意味着需自行接组合优化与风控，短期难以直接支撑万丰 CIO 级别决策。

## ⑦ 集成难度与路径
- 难度：**中**。`pip install -r requirements.txt` → 从 HF 加载 tokenizer/model → `KronosPredictor.predict()`；生产化需 GPU
- 路径：
  1. 用 `Kronos-small` 做 POC 预测，验证与现有因子体系的信息增量
  2. 用 Qlib 示例把 A 股日线/分钟线接入 `finetune/`，微调私有模型
  3. 将预测信号接入投研流程，交给独立组合优化/风控模块（模型官方不负责 alpha 中性化）

## ⑧ 风险
- **未确认**：40k stars 的真实性只能以 GitHub API 为准（已实际抓取），但极可能包含大量「围观」；生产落地案例未在 README 中给出
- 模型预测不构成投资建议；README 自述非生产级
- large 模型未开源、上下文短（512）、HF 权重可用性/许可证需二次核对
- 依赖 Qlib 数据准备，A 股数据获取与清洗成本不低
- 代码最近推送较早，社区 issue 积压（282 open）可能影响问题响应
</content>
