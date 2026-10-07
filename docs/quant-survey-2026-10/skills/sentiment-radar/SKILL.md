---
name: sentiment-radar
description: >
  舆情雷达：对机构/公司名做全网舆情扫描（万丰舆情智察搜索轨），输出情感
  分类汇总与高危预警（高危舆情条目置顶）。注意搜索轨在机房 IP 下有效条数
  可能为 0——如实降级，不编造。
triggers:
  - 舆情雷达
  - 高危预警
  - sentiment radar
role: Analyst
---

# 舆情雷达（sentiment-radar）

## 输入
- `q`：机构/公司名；`days`：默认 7

## 步骤
1. 取数：`curl -s "http://127.0.0.1:9031/api/intel/sentiment?q=<名称>&days=<n>"`
   返回 `articles[]`（title/sentiment/severity/source/url）与 `stats`。
2. 分级输出：
   - 🔴 高危预警：severity 含「高危」的条目置顶（标题+来源+链接）
   - 🟡 中度关注：中度舆情/中度利好
   - 🟢 其他与统计：正/负/中性计数、被反爬源数（如实展示链路状态）
3. 若 articles 为空：输出「本窗口无有效条目（搜索轨受限）」+ stats，不编数据。

## 红线
- 不输出买卖建议；高危条目注明"信息提示，非投资建议"
