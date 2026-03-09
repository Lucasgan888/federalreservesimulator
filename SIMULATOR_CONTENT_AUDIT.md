# Federal Reserve Simulator - Content Audit

## 现有结构盘点

### 已有页面
- `/` - 首页（simulator 主体）
- `/about` - 关于页（sitemap 中声明但未实现）
- `/privacy` - 隐私政策（sitemap 中声明但未实现）
- `/terms` - 服务条款（sitemap 中声明但未实现）

### 核心功能模块
- `src/lib/economy.ts` - 经济模型引擎
  - 4 个历史场景：2008 金融危机、COVID-19、互联网泡沫、70年代滞胀
  - 完整的 IS-LM-PC 经济模型
  - 政策工具：利率调整、前瞻指引、量化宽松
  - 评分系统

- `src/app/page.tsx` - 主页面
  - 场景选择
  - 实时仪表盘（8个经济指标）
  - 政策决策面板
  - 事件横幅
  - 游戏结束总结
  - SEO 内容区（FAQ、玩法说明）

### 现有 SEO 内容
首页底部已有完整的 SEO 内容：
- What is the Federal Reserve Simulator?
- How to Play
- Understanding Monetary Policy
- FAQ（6个问题）

### 技术栈
- Next.js 16.1.6 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript

## 第一轮扩展计划

### 新增路由结构
```
src/app/
├── concepts/[slug]/page.tsx       # 概念解释页
├── guides/[slug]/page.tsx         # 指南页
├── calculators/[slug]/page.tsx    # 计算器页
```

### 首批 6 个页面
1. `/concepts/federal-funds-rate` - 联邦基金利率
2. `/concepts/quantitative-easing` - 量化宽松
3. `/concepts/soft-landing` - 软着陆
4. `/guides/how-the-fed-fights-inflation` - 美联储如何对抗通胀
5. `/guides/what-happens-when-interest-rates-go-up` - 加息的影响
6. `/calculators/rate-impact-calculator` - 利率影响计算器

### 内容模型设计

#### Concept 页面字段
- title: string
- slug: string
- description: string
- intro: string
- sections: { heading: string; content: string }[]
- faq: { q: string; a: string }[]
- relatedLinks: { title: string; href: string }[]
- updatedAt: string

#### Guide 页面字段
- title: string
- slug: string
- description: string
- intro: string
- steps: { title: string; content: string }[]
- faq: { q: string; a: string }[]
- relatedLinks: { title: string; href: string }[]
- updatedAt: string

#### Calculator 页面字段
- title: string
- slug: string
- description: string
- intro: string
- inputs: { label: string; type: string; min?: number; max?: number }[]
- formulaNote: string
- resultExplainer: string
- faq: { q: string; a: string }[]
- relatedLinks: { title: string; href: string }[]
- updatedAt: string

## 首页改动计划

### 保留不变
- H1: "Federal Reserve Simulator"
- 核心 simulator 区域（场景选择、仪表盘、决策面板）
- 现有 SEO 内容区

### 新增内容区（首屏下方）
在 simulator 和现有 SEO 内容之间插入 3 个新区块：
1. **Featured Concepts** - 3个核心概念卡片
2. **How Rate Changes Affect You** - 图解化说明
3. **Learn the Mechanics** - 引导到 guides 和 calculator

### 结果流改动
在游戏结束页面的 "Play Again" 按钮上方添加：
- "Learn more about [相关概念]"
- "Try the rate impact calculator"
- "Read how the Fed fights inflation"

## 风险评估

### 低风险
- 新增路由不影响现有页面
- 首页核心 SEO 文案保持不变
- simulator 功能完全不动

### 需注意
- 首页新增内容区不能把 simulator 挤到首屏以下
- 移动端布局需要特别测试
- 新页面的 metadata 需要避免与首页关键词冲突

## 下一步行动

1. ✅ 创建内容模型文件 `src/lib/content.ts`
2. ✅ 新增 3 个路由目录和模板
3. ✅ 编写首批 6 个页面的内容数据
4. ✅ 首页轻改（新增 3 个内容区）
5. ✅ 更新 sitemap.ts
6. ✅ 测试构建
