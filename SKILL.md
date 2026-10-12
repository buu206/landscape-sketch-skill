---
name: landscape-sketch
license: MIT
description: 景观手绘与效果图助手。把景观设计想法转成可直接投喂任意图像模型（GPT-image / Midjourney / Gemini / SD）的专业提示词，覆盖彩色平面图、手绘透视、剖立面、分析图和四季氛围图。Use when the user wants landscape plans, perspective sketches, sections, concept diagrams or seasonal mood images for parks, plazas, waterfronts, courtyards or streets.
---

# Landscape Sketch 景观手绘技能

## 触发方式

显式调用：`$landscape-sketch`，并说明景观设计需求。

以下表达可用于自然语言匹配；实际自动选择依据上方 `description`：
  - 景观手绘 / 景观效果图 / 彩平 / 彩色平面图
  - 透视图 / 鸟瞰 / 人视点
  - 剖面 / 立面 / 剖立面
  - 分析图 / 流线 / 功能分区 / 日照分析
  - 四季 / 氛围图 / mood board
  - landscape sketch, site plan render, section elevation
## 它能做什么
1. 用 5 个问题把模糊想法变成清晰的设计条件。
2. 按图纸类型路由到对应工作流，生成"风格前缀 + 内容描述 + 技术约束"三段式英文提示词。
3. 出图后用检查清单自查（比例人、乔灌草层次、铺装、水体、阴影、指北针与比例尺）。

## 第一步：需求问诊（一次最多问 2 个，缺省可用默认值）
| # | 问题 | 选项示例 | 默认 |
|---|------|---------|------|
| 1 | 场地类型 | 口袋公园 / 滨水步道 / 庭院 / 广场 / 街道 / 校园 | 口袋公园 |
| 2 | 规模 | 小(<0.5ha) / 中(0.5–5ha) / 大(>5ha) 或长宽米数 | 约 40×30 m |
| 3 | 季节与时段 | 春夏秋冬 × 清晨/正午/黄昏/夜景 | 初夏傍晚 |
| 4 | 表现风格 | 马克笔 / 水彩淡彩 / 写实渲染 | 马克笔 |
| 5 | 视图类型 | 平面 / 透视 / 剖立面 / 分析图 / 四季氛围 | 透视 |

## 第二步：路由
| 用户想要 | 工作流 | 推荐风格 |
|---------|--------|---------|
| 彩平、总平面、方案平面 | `workflows/plan-view.md` | 马克笔 / 水彩 |
| 人视点、鸟瞰、手绘效果图 | `workflows/perspective-sketch.md` | 任意 |
| 剖面、立面、竖向关系 | `workflows/section-elevation.md` | 马克笔 |
| 流线、分区、日照、视线 | `workflows/concept-diagram.md` | 扁平/马克笔 |
| 同一场景四季对比 | `workflows/seasonal-mood.md` | 水彩 / 写实 |

风格文件：`aesthetics/marker-sketch.md`、`aesthetics/watercolor.md`、`aesthetics/realistic-render.md`。

## 第三步：组装提示词
```
[风格前缀 from aesthetics/*] + [工作流模板, 填入场地信息] + [技术约束: 视角/比例/构图/画幅] + [负面词]
```

## 第四步：交付
- 给出最终英文提示词 + 中文说明（每段控制什么）。
- 附 2–3 个可微调参数（如时段、植物密度、色温）。
- 提醒：AI 图只能做概念表达，尺寸、竖向和植物配置须由设计师校核，不能直接当施工图。

## 通用景观常识（所有工作流都要遵守）
- **比例人**：人高约 1.7 m，用于暗示尺度；透视中人头基本落在视平线上（人视点）。
- **乔灌草**：上层乔木（6–15 m）、中层灌木（0.5–2 m）、下层地被/草坪，前中后景分层。
- **铺装**：主路 2–4 m、园路 1.2–2 m，材质变化标示空间转换。
- **水体**：倒影垂直、驳岸清晰，水色比天空略深。
- **阴影**：同一光源方向统一；平面图阴影一般投向右下（假定光源左上）。
- **平面图必备**：指北针、比例尺、图例。
