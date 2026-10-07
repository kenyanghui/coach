# -*- coding: utf-8 -*-
"""Kronos × 玄学量化 POC：标记序列 → 卦象统计（W2 交付）

用法：.venv/bin/python hexmap.py [代码 CSV 可选]
链路：Kronos 分词器把 K 线离散化 → 标记序列按 3 枚一组映射八卦 →
统计卦象频率 / 转移矩阵 / 分布熵（候选因子） → 概率预测多路径 = 变爻概率。
"""
import sys
from collections import Counter

import pandas as pd
import torch

from model import Kronos, KronosTokenizer

BAGUA = ["乾", "兑", "离", "震", "巽", "坎", "艮", "坤"]  # 0-7


def to_bagua(tokens):
    """标记序列 → 卦象序列：v0.1 频率排名映射——每个标记按其频次排名 % 8 分卦。
    （v0 求和模 8 因标记高度集中而退化，见 POC 报告；v1 方向=对量化向量聚类）"""
    from collections import Counter
    rank = {}
    for i, (t, _) in enumerate(Counter(int(x) for x in tokens).most_common()):
        rank[t] = i % 8
    return [rank[int(x)] for x in tokens]


def stats(hex_seq):
    c = Counter(hex_seq)
    n = max(len(hex_seq), 1)
    freq = {BAGUA[k]: round(v / n, 4) for k, v in sorted(c.items())}
    # 分布熵（市场混沌度候选因子）
    import math
    ent = -sum((v / n) * math.log2(v / n) for v in c.values() if v)
    # 卦变转移矩阵（卦变频率候选因子：相邻不同卦占比）
    trans = Counter()
    changes = 0
    for a, b in zip(hex_seq, hex_seq[1:]):
        trans[(BAGUA[a], BAGUA[b])] += 1
        if a != b:
            changes += 1
    change_rate = round(changes / max(len(hex_seq) - 1, 1), 4)
    return freq, round(ent, 4), change_rate, trans


def main():
    csv = sys.argv[1] if len(sys.argv) > 1 else None
    if csv is None:
        # 自备 A 股日频：用 a-stock-data 腾讯源拉 600519 近 120 日（不复权）
        import subprocess
        code = '''
import re
s = open("/data/loong-apps/a-stock-data/SKILL.md", encoding="utf-8").read()
blocks = re.findall(r"```python\\s*\\n([\\s\\S]*?)```", s)
ns = {"__name__": "notmain"}
for b in blocks[:7]:
    try:
        exec(compile(b, "b", "exec"), ns)
    except Exception:
        pass
df = ns["tencent_kline"]("600519", "day", adjust="", count=120)
df.to_csv("/tmp/kline600519.csv", index=False)
print("rows", len(df))
'''
        subprocess.run(["/data/loong-apps/cfs/.venv/bin/python", "-c", code], check=True)
        csv = "/tmp/kline600519.csv"
    df = pd.read_csv(csv)
    if "amount" not in df.columns:
        df["amount"] = 0  # Kronos 6 通道：amount 缺省 0（官方样例同款）
    cols = ["open", "high", "low", "close", "volume", "amount"]
    data = torch.tensor(df[cols].values, dtype=torch.float32).unsqueeze(0)  # (1,N,6) 通道在末维

    tok = KronosTokenizer.from_pretrained("NeoQuasar/Kronos-Tokenizer-base")
    model = Kronos.from_pretrained("NeoQuasar/Kronos-mini", map_location="cpu")
    model.eval()

    with torch.no_grad():
        tokens = tok.encode(data).squeeze().tolist()  # 分词：K 线 → 分层离散标记（返回 z_indices）
    if isinstance(tokens, int):
        tokens = [tokens]
    if isinstance(tokens, int):
        tokens = [tokens]
    print(f"K 线 {data.shape[1]} 根 → 离散标记 {len(tokens)} 枚（前 30：{tokens[:30]}）")

    from collections import Counter as _C
    tc = _C(int(x) for x in tokens)
    top_share = tc.most_common(1)[0][1] / len(tokens)
    distinct = len(tc)
    print(f"状态集中度：top1 标记占比 {top_share:.1%}（{distinct} 种标记）——集中度本身即因子候选")
    hex_seq = to_bagua(tokens)
    freq, ent, change_rate, trans = stats(hex_seq)
    print("\n== 卦象频率（600519 近 120 日）==")
    for k, v in sorted(freq.items(), key=lambda x: -x[1]):
        bar = "█" * int(v * 100)
        print(f"{k} {v:.2%} {bar}")
    print(f"\n标记分布熵（混沌度因子候选）: {ent}")
    print(f"卦变率（变爻频率因子候选）: {change_rate:.2%}")
    print("卦变 top5:", trans.most_common(5))

    # 概率预测多路径 = 变爻概率（4 条采样路径的卦象分布对比）
    try:
        from model import KronosPredictor
        pred = KronosPredictor(model, tok, max_context=512, device="cpu")
        paths = pred.predict(data, T=1.0, top_p=0.9, sample_count=4)
        print(f"\n== 变爻概率（4 路径未来 {paths.shape[-1]} 根预测）==")
        for i in range(paths.shape[0] if paths.dim() == 4 else 1):
            p = paths[i] if paths.dim() == 4 else paths
            with torch.no_grad():
                tp, _ = tok.encode(p.unsqueeze(0))
            hs = to_bagua(tp.squeeze().tolist() if tp.numel() > 1 else [int(tp)])
            f2, _, cr2, _ = stats(hs)
            top3 = sorted(f2.items(), key=lambda x: -x[1])[:3]
            print(f"路径{i+1}: 卦象top3={top3} 卦变率={cr2:.2%}")
    except Exception as e:
        print("（多路径变爻概率暂未跑通：", str(e)[:120], "）——POC v0 记录")


if __name__ == "__main__":
    main()
