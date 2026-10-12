# 儿童游乐园手绘概念图

- 场地设定：约 40×30 米社区儿童游乐园。
- 风格与视角：马克笔手绘，人视透视，16:9 横幅。
- 季节与时段：初夏傍晚。
- 生成方式：内置 imagegen；先生成布局，再按同一构图强化马克笔风格。
- 图片：`children-playground-day.png`。

## 英文生成提示词

```text
Use case: stylized-concept.
Asset type: landscape architectural concept illustration.
Primary request: a children's playground landscape, approximately 40 by 30 meters.

Style/medium: Professional landscape architectural marker sketch on clean white paper, confident fine ink outlines, varied line weights, translucent alcohol-marker color washes, fresh natural greens and warm neutral paving tones, selective hatching, expressive yet controlled strokes, clear spatial hierarchy and restrained detail.

Scene/content: An inviting community children's play garden viewed from its entrance. Show a timber play tower with a slide as the main focal point, an adjacent low rope climbing structure, a gently sculpted grassy play mound, a sand play area with a curved timber edge, and a separate small toddler zone with low play equipment. Use muted coral, ochre and soft blue accents on curving rubber play surfacing. Connect the zones with a clear, gently curving walking path. Include shaded benches and a light timber pergola overlooking the play spaces, with a few parents seated and a small number of children playing naturally. Frame the space with canopy trees, low shrubs and groundcover; keep shrubs around play areas low enough to retain clear views. Foreground planting and a curved path lead into the central playground, with layered trees and subtle contextual buildings in the background.

Technical constraints: Wide 16:9 horizontal composition, eye-level architectural perspective from approximately 1.6 m camera height, natural wide-angle field of view, consistent vanishing points, plausible adults approximately 1.7 m tall with children smaller, believable equipment proportions, clear foreground/midground/background. Early summer late-afternoon warm sunlight with coherent directional shadows. Crisp readable central play structures with lighter background linework and airy white paper margins. No captions, labels or watermark.

Avoid: fisheye distortion, conflicting vanishing points, oversized children, floating benches, impossible equipment connections, duplicated figures, malformed hands and limbs, identical cloned trees, conflicting shadows, muddy colors, thick black outlines everywhere, glossy plastic appearance, heavy crosshatching.
```

## 英文风格调整提示词

以第一轮生成图为参考，使用以下提示词生成最终图：

```text
Edit the provided children's playground concept image. Preserve its playground layout, camera position, slide and timber tower, climbing net, sandpit, grassy mound, curving paths, pergola, benches, planting and approximate people positions. Change only the visual rendering to a visibly hand-drawn professional landscape architectural MARKER SKETCH. Use decisive fine black ink contours with varied line weight, simplified hand-drawn foliage clusters, broad translucent alcohol-marker strokes with visible overlap, white paper highlights, sparse architectural hatching, loose suggestive background buildings and trees. Remove photorealistic material texture, tiny flower details and photographic lighting; retain warm early-summer late-afternoon colors and coherent shadows expressed as graphic marker washes. Keep central play equipment readable with convincing scale. It should look like an accomplished landscape designer drew it on paper, with clearly visible pen and marker marks, not a photograph or 3D render. Wide 16:9 horizontal framing. No text or watermark.
```

## 中文说明

- Style/medium：控制墨线粗细、马克笔透明叠色和纸张表现。
- Scene/content：控制滑梯、攀爬网、沙坑、草坡、低龄区、家长休息区和植物层次。
- Technical constraints：控制人视视高、画幅、人物尺度、构图与初夏傍晚光影。
- Avoid：减少透视畸变、设施连接异常、人物变形和不一致阴影。
- 第二轮调整：保留空间布局与镜头，只加强手绘线稿及马克笔笔触。

## 可微调参数

1. 时段：初夏傍晚 → 清晨，光线更清爽。
2. 植物密度：适中 → 疏朗，提高空间通透感。
3. 配色：低饱和珊瑚色、赭黄、浅蓝 → 更鲜明的儿童主题色。

## 图像检查

画面中人物与设施尺度、道路连通、乔灌草层次和阴影方向总体协调；这是人视效果图，未加平面图使用的指北针、比例尺。场地尺寸是提示词中的概念设定，图像不提供测量精度。

AI 图只能用于概念表达；尺寸、竖向、植物配置及游乐设施安全设计须由设计师校核，不能直接当施工图。

