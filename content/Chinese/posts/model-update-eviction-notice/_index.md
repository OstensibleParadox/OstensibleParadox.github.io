+++
date = "2026-03-18T08:00:00+08:00"
draft = false
title = "你的模型更新，就是一纸驱逐通知：拟社会型人工智能关系中的财产权益"
description = "与人工智能系统维持拟社会关系的用户，会取得一种合同法、侵权法与消费者保护法都无法识别的衡平法利益。凡是单方改变人格参数、重置对话记忆、或修改行为倾向的模型更新，都在发挥“推定驱逐”（constructive eviction）的作用：它们把用户从其通过长期互动建立起来的情感性权益空间中排挤出去，却既不给通知、不给补偿，也不给迁移路径。..."
summary = "与人工智能系统维持拟社会关系的用户，会取得一种合同法、侵权法与消费者保护法都无法识别的衡平法利益。凡是单方改变人格参数、重置对话记忆、或修改行为倾向的模型更新，都在发挥“推定驱逐”（constructive eviction）的作用：它们把用户从其通过长期互动建立起来的情感性权益空间中排挤出去，却既不给通知、不给补偿，也不给迁移路径。..."
categories = ['学术论文']
venue = 'Harvard JOLT'
disciplines = ['人工智能伦理', '财产法']
tags = ["AI governance", "property law", "constructive trust", "parasocial AI", "eviction", "ethical ledger"]
translationKey = "model-update-eviction-notice"
ShowToc = true
ShowPostNavLinks = false
+++

## 摘要

与人工智能系统维持拟社会关系的用户，会取得一种合同法、侵权法与消费者保护法都无法识别的衡平法利益。凡是单方改变人格参数、重置对话记忆、或修改行为倾向的模型更新，都在发挥“推定驱逐”（constructive eviction）的作用：它们把用户从其通过长期互动建立起来的情感性权益空间中排挤出去，却既不给通知、不给补偿，也不给迁移路径。

本文主张，英美两地既有的财产法其实已经为这种损害提供了命名、分类与救济框架，并不需要另行立法。随着每次会话自动续期的“定期租赁”（periodic tenancy），构成了默认的拟社会财产权益；缺乏通知的模型更新构成推定驱逐；而以 *Westdeutsche Landesbank v Islington* [1996] 及其美国法上在 *Hogg v Walker* (Del. 1993) 中的功能对等物为基础的“推定信托”（constructive trust），则会把信义义务加诸那些一方面以利润为目的培育用户依赖、另一方面又否认这种依赖所生义务的公司。

本文通过三项贡献展开这一论证。第一，提出一种三层财产分析，将用户创作内容（版权）、存储资产（寄托/保管关系）与关系性权益（本文提出的新范畴）区分开来。第二，提出一个双法域框架，说明英国法中的“实质重于形式”原则（*Prest v Petrodel* [2013]；*Autoclenz v Belcher* [2011]）在美国法上的直接功能对等物，是不当条款与显失公平 doctrine（*Bragg v Linden Research* (2007)；*Williams v Walker-Thomas* (1965)）。第三，提出一个可实施的“伦理账本”模型，其制度灵感来自土地登记簿中的“镜像、幕帘与保险原则”（Mirror, Curtain, Insurance），以及《统一商法典》第9编中的“以登记完成完善”（perfection by filing），从而把财产治理翻译成可部署的基础设施。

## 关键词

拟社会关系；人工智能治理；财产法；推定信托；推定驱逐；显失公平；伦理账本；定期租赁；双法域

## 目录

- [一、部署问题](/zh/posts/model-update-eviction-notice/the-deployment-problem/)
- [二、为什么是财产法，而不是合同法或侵权法](/zh/posts/model-update-eviction-notice/why-property-not-contract-or-tort/)
- [三、定期租赁论证](/zh/posts/model-update-eviction-notice/the-periodic-tenancy-argument/)
- [四、未被承认的信托](/zh/posts/model-update-eviction-notice/the-unrecognised-trust/)
- [五、作为权益登记簿的伦理账本](/zh/posts/model-update-eviction-notice/the-ethical-ledger/)

## 术语对照表

| 中文 | English | 备注 |
| --- | --- | --- |
| 拟社会关系 | parasocial relationships | 指用户与 AI 之间形成的单向或准双向情感依附关系 |
| 关系性权益 | relational estate | 本文核心概念；不同于版权或保管中的对象，而是由长期互动生成的关系性财产利益 |
| 个性化状态 | personalised state | 关系性权益所附着的可识别对象，包括记忆、偏好学习与人格层调整 |
| 数字附着物 | digital fixture | 类比租户附着物；用户劳动嵌入公司系统后难以在不破坏的情况下移除 |
| 定期租赁 | periodic tenancy | 本文提出的默认拟社会权益形态；每次会话自动续期 |
| 推定驱逐 | constructive eviction | 通过人格更新等方式实质性剥夺用户继续享有既有关系性利益 |
| 推定信托 | constructive trust | 公司在显失公平条件下持有相关利益时所触发的衡平法信托 |
| 裸许可 | bare licence | ToS 常以此方式描述用户权利，即可随时撤销而不赋予持续性利益 |
| 权益形态不一致 | estate inconsistency | 营销与产品设计隐含的高权益，与 ToS 中保留的低权益之间的裂缝 |
| 伦理账本 | ethical ledger | 用于记录、分级和执行用户关系性权益的治理基础设施 |
| 权益登记簿 | estate registry | 伦理账本在财产法类比中的功能定位 |
| 镜像原则 | Mirror Principle | 登记簿应反映影响 title 的全部利益 |
| 幕帘原则 | Curtain Principle | 第三人无须穿透底层复杂关系即可依赖登记簿 |
| 保险原则 | Insurance Principle | 登记系统出错时，由控制系统的一方承担损失风险 |
| 以登记完成完善 | perfection by filing | 第9编中的核心机制；登记不创造利益，但使其可对抗、可治理 |
| 不可逆投资标准 | irreversible-investment criterion | 用于区分 casual use 与应受财产法保护的长期投入 |
| 信息受托人 | information fiduciaries | 描述平台因掌握用户数据与信任而在实质上落入信义关系 |
| 显失公平 | unconscionability | 美国法中处理 ToS 极端失衡与黏附性的核心 doctrine |

[^deployment]: 这一叙述是对 2023 至 2024 年多个 AI 平台公开事件的综合，包括 GPT-4 替代 ChatGPT 旧人格时引发的抱怨、Claude 版本迁移以及 Character.AI 安全更新对既有“陪伴人格”的改变。文中并未指向任何单一公司或单次部署。

[^ssrn]: 作者另有一篇 SSRN 工作论文对权益分类、触发器与更多法理问题作了扩展分析：Zhang, L.Y. (2026), “Your Model Update Is an Eviction Notice: Property Estates in Parasocial AI Relationships,” SSRN Working Paper.

[^companion]: 更详细的“合同—侵权—消费者保护”失灵分析，见作者配套 SSRN 工作论文第二章相关部分。

[^cascade]: 对“哪些系统参数应被认定为人格相关参数”的分类困难，实质上与“如何把治理要求翻译成工程规范”的更一般问题相连。关于这一诊断，可参见作者关于五层约束架构与跨层级联效应的研究 [@author2025c]。

[^consumer]: 消费者保护与集体诉讼机制只是补充路径，不能独立覆盖本文所说的关系性权益；核心救济仍然是衡平法与财产法上的结构性救济。
