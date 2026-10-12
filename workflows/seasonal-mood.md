# 四季与氛围图工作流

适用：同一景观四季对比、季节氛围及 mood board。默认搭配水彩或写实风格。

先固定边界、道路、水体、建筑、设施、树位与镜头，再分别生成四季提示词。只改变合理的物候、光照、天气和活动。地区未知时注明采用温带四季示意；不把常绿树画成落叶树，也不默认冬景积雪。

## 英文内容模板
```text
The same {site_type} in {season}, viewed from the identical {camera_position_and_direction}. Preserve {fixed_layout}, building geometry, paths, water features, seating and tree positions across all seasonal views. Show {seasonal_foliage_and_flowering}, {seasonal_light_and_weather}, and {appropriate_human_activity}. Maintain the same composition, scale and rendering style. {climate_assumption_if_needed}
```

技术约束：单张默认 16:9；四季拼图用等尺寸 2×2 布局并预留标题位置。参考图可用时统一采用同一图约束几何，生成一致性需人工检查。

负面词：`changing site layout, relocated buildings, inconsistent camera angle, contradictory plant phenology, identical foliage in all seasons, arbitrary snow`。

检查：空间与镜头一致、季相合理、光影与天气相容。mood board 可提取色彩、材质和植物氛围；四季空间对比须固定布局。
