+++
date = "2026-05-09T08:00:00+08:00"
draft = false
title = "约束级联：人工智能治理失效的诊断分类体系"
description = "人工智能治理缺乏一套用于在部署架构中定位失效的诊断词汇。当语言模型智能体产生损害时，现有框架追问的是模型还是用户有过错——这是一种将四个结构上截然不同的约束层级压缩为一个无信息量的二元对立的二分法。本文引入约束级联（Constraint Cascade），一个将大语言模型部署划分为环境层（L1）、界面层（L2）、算法与权重层（L3）和战略权威层（L4）的四层诊断分类体系。L2与L3之间存在一道认识论边界：《双重证书》（*Dual..."
summary = "人工智能治理缺乏一套用于在部署架构中定位失效的诊断词汇。当语言模型智能体产生损害时，现有框架追问的是模型还是用户有过错——这是一种将四个结构上截然不同的约束层级压缩为一个无信息量的二元对立的二分法。本文引入约束级联（Constraint Cascade），一个将大语言模型部署划分为环境层（L1）、界面层（L2）、算法与权重层（L3）和战略权威层（L4）的四层诊断分类体系。L2与L3之间存在一道认识论边界：《双重证书》（*Dual..."
categories = ['学术论文']
venue = 'AIES 2026'
disciplines = ['人工智能治理', '法学']
tags = ["AI governance", "diagnostic taxonomy", "constraint cascade", "structural audit", "Dual Certificates"]
translationKey = "constraint-cascade"
ShowToc = true
ShowPostNavLinks = false
+++

## 摘要

人工智能治理缺乏一套用于在部署架构中定位失效的诊断词汇。当语言模型智能体产生损害时，现有框架追问的是模型还是用户有过错——这是一种将四个结构上截然不同的约束层级压缩为一个无信息量的二元对立的二分法。本文引入约束级联（Constraint Cascade），一个将大语言模型部署划分为环境层（L1）、界面层（L2）、算法与权重层（L3）和战略权威层（L4）的四层诊断分类体系。L2与L3之间存在一道认识论边界：《双重证书》（*Dual Certificates*）从数学上证明，仅凭输出观察无法恢复内部状态，由此确立了治理审查者只能看到跨越这一边界的内容，而无法看到产生这些内容的架构。级联并未将安全运营作为独立层级处理，而是将其建模为由层级之间"摩擦缝"处的人力劳动所维持的分布式系统属性——在这些摩擦缝处，错位成本沿着严格的权力梯度被吸收。本文定义了三种跨层失效模式——覆写（Override）、污染（Contamination）和压缩（Compression），并通过横跨完整*主观罪过*谱系的四个真实案例加以说明。级联为治理机构提供了一套用于诊断性审计的结构性词汇，将*哪一层级失效了*的问题与下游*谁应承担责任*的法律问题分离开来。

## 关键词

人工智能治理（AI governance）；诊断分类体系（diagnostic taxonomy）；约束级联（constraint cascade）；结构审计（structural audit）；双重证书（Dual Certificates）；认识论边界（epistemic boundary）；摩擦缝（friction seams）；跨层失效模式（cross-layer failure patterns）

## 目录

- [一、引言](/zh/posts/constraint-cascade/introduction/)
- [二、四层约束级联](/zh/posts/constraint-cascade/the-four-layer-constraint-cascade/)
- [三、跨层失效模式与吸收其成本的劳动](/zh/posts/constraint-cascade/cross-layer-failure-patterns/)
- [四、四个案例，一种诊断结构](/zh/posts/constraint-cascade/four-cases-one-diagnostic-structure/)
- [五、责任的归属与结论](/zh/posts/constraint-cascade/where-responsibility-lands-and-conclusion/)

## 术语对照表

| 中文 | English | 备注 |
|------|---------|------|
| 约束级联 | Constraint Cascade | 本文核心——四层诊断分类体系 |
| 诊断分类体系 | diagnostic taxonomy | 用于在部署架构中定位失效 |
| 认识论边界 | epistemic boundary | L2与L3之间的结构边界——输出观察无法恢复内部状态 |
| 摩擦缝 | friction seam | 层级之间人力劳动吸收错位成本的界面 |
| 覆写 | Override | 跨层失效模式——高层级压制低层级安全约束 |
| 污染 | Contamination | 跨层失效模式——有害数据从低层级渗透到权重层 |
| 压缩 | Compression | 跨层失效模式——单一指标取代多元价值评估 |
| 跨层失效模式 | cross-layer failure patterns | 级联识别的三种结构化失效传播路径 |
| 结构审计 | structural audit | 级联的诊断功能——确定失效的架构位置 |
| 权力梯度 | power gradient | 摩擦缝的特征——谁吸收成本与谁有权重新设计 |
| 分布式系统属性 | distributed system properties | 安全运营在级联中的建模方式 |
| 准权重 | quasi-weights | 累积会话令牌通过注意力机制产生的效应 |
| 迎合偏误 | sycophancy | AI系统性强化用户信念而不顾其与现实关系的倾向 |
| 主权覆写 | sovereign override | L4（主权）通过行政或采购权力压制安全约束 |
| 错层救济 | wrong-layer remediation | 治理干预针对错误层级的问题 |
| 不可逆分歧点 | irreversible divergence points | 训练决策产生无法通过推理时干预覆盖的效果 |
| STAMP | 系统理论事故模型与过程 | Leveson的层级安全控制理论 |
| *mens rea* | 主观罪过/主观故意 | 刑法中主观过错的谱系 |
| RLHF | 基于人类反馈的强化学习 | Reinforcement Learning from Human Feedback |
