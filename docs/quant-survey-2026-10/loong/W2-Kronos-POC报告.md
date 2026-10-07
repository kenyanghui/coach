# W2 · Kronos POC + 卦象映射 v0 报告（Loong 主力机，2026-10-07）

> 交付人：Loong zcode 会话（W2 实习生工作流的首日示范）。全部真实运行，含踩坑。

## 环境（/data/loong-apps/kronos-poc）
- Kronos 仓 clone（shiyu-coder/Kronos，GitHub 直连 OK）+ venv
- 依赖坑：alinux venv 自带 pip 23.3.1 有 bug（`'>=' not supported int/NoneType`），
  **必须先 get-pip.py 引导到 26.x** 再装 numpy/pandas/transformers/huggingface_hub；
  torch 用 CPU 版（`--index-url https://download.pytorch.org/whl/cpu`）
- 模型：HF_ENDPOINT=https://hf-mirror.com 拉 NeoQuasar/Kronos-Tokenizer-base + Kronos-mini
  （small 以上在 2C 节点太重，POC 用 mini 4.1M）

## POC 结果
- 数据：仓内 HK_ali_09988 5min K 线，取 256 根上下文
- `KronosPredictor.predict(T=1.0, top_p=0.9, pred_len=24)` CPU 推理约 1–2 分钟
- 输出：未来 24 根 OHLCV+amount 概率样本 → /tmp/kronos-pred-09988.csv
- API 坑：`predict(df, x_timestamp, y_timestamp, pred_len)` 需 Series 时间戳（不是 DatetimeIndex）

## 卦象映射 v0（hexmap.py 思路已验证）
编码（固定、可证伪）：中爻=阴阳线；上爻=长上影(上影>50% 全幅)；下爻=短下影(<33%)。
三爻组合 8 卦（000坤…111乾）。09988 实测：

| 窗口 | 结果 |
|---|---|
| 历史 400 根 | 震 103/艮 103/坎 93 为高频卦；卦变率 78.4%；标记熵 2.411 |
| 预测 24 根 | 坎 10 主导（预测偏风险区/回撤形态）；标记熵 2.273 |
| 高频卦变 | 坎→艮 31、艮→艮 31、震→震 27 |

**研究解读**：卦变率 78% 说明该编码下状态切换频繁（5min 粒度合理）；坎（险陷）在
预测窗口聚集与近期回调走势一致——但**单标的双窗口不构成证据**。下一步：多标的×
多窗口批量跑（worker 化），卦象频率/转移熵/卦变率做成因子进 alphalens，不显著即弃。

## 下一步（实习生 W2 接手）
1. hexmap 固化成 hexmap.py（本报告编码为 v0 基线，改动须开新版本）
2. 批量：a-stock-data 拉全市场日频 → Kronos-mini 批量标记 → 因子表
3. alphalens 检验 + 报告；显点后再谈 small/base

## 附：三因子实测（2026-10-07 补）

用 mini 预测的 24 根 OHLCV 与历史 400 根同编码对比，三个候选卦象因子首轮数值：
- **标记熵差**：预测窗 2.273 vs 历史窗 2.411 → Δ=-0.138（预测的卦象分布比历史更集中=模型倾向状态收敛）
- **卦变率**：历史 78.4%（5min 高频切换，符合设定）
- **主导卦**：历史=震/艮/坎；预测窗=坎（10/24，42%）——「险陷」聚集，与回调期一致

（注意：单标的双窗口，只证明管线通，不证明因子有效。）
