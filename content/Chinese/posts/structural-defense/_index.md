+++
date = "2026-05-08T08:00:00+08:00"
draft = false
title = "结构性抗辩：人工智能法律归因的级联方法论"
description = "面对人工智能所致损害，法院遭遇了一个教义学瓶颈。产品责任法自 *Greenman v. Yuba Power Products* 以来所依赖的行为推断链条——从观察到故障，到推定缺陷，再到分配责任——预设了输出观察足以将缺陷定位于部署架构中的特定位置。《双重证书》（*Dual..."
summary = "面对人工智能所致损害，法院遭遇了一个教义学瓶颈。产品责任法自 *Greenman v. Yuba Power Products* 以来所依赖的行为推断链条——从观察到故障，到推定缺陷，再到分配责任——预设了输出观察足以将缺陷定位于部署架构中的特定位置。《双重证书》（*Dual..."
categories = ['学术论文']
venue = 'ECUPL Commissioned Paper'
disciplines = ['人工智能法', '侵权法']
tags = ["AI governance", "legal attribution", "products liability", "constraint cascade", "structural defense"]
translationKey = "structural-defense"
ShowToc = true
ShowPostNavLinks = false
+++

## 摘要

面对人工智能所致损害，法院遭遇了一个教义学瓶颈。产品责任法自 *Greenman v. Yuba Power Products* 以来所依赖的行为推断链条——从观察到故障，到推定缺陷，再到分配责任——预设了输出观察足以将缺陷定位于部署架构中的特定位置。《双重证书》（*Dual Certificates*）从数学上证明这不可行：仅凭输出观察无法确定内部状态，这意味着完全相同的行为证据可以由部署架构中结构上截然不同层面的缺陷所产生。《侵权法重述（第三版）》第3条故障原理解决了第一阶问题——行为故障证明了*存在*某种缺陷——但无法解决第二阶问题：该故障究竟属于第2条中的哪一类别（制造缺陷、设计缺陷还是警示缺陷），因为分类要求将缺陷定位于特定的架构层级。

本文引入约束级联（Constraint Cascade）方法论：一个四层诊断分类体系（环境层、界面层、算法与权重层、战略权威层），将每一架构层级映射到特定的责任原理，使法院得以通过结构定位而非行为推断来对人工智能缺陷进行分类。本文通过级联方法对横跨完整*主观罪过*（mens rea）谱系的四个案例进行了诊断，并提出了通过结构性证据开示解决第3条→第2条分类瓶颈的程序框架。本文进一步论证，法律对行为推断的依赖构成一种范畴错误：人类法律范式预设了不可访问的心理状态，因而必须依赖外部行为；但人工智能的内部状态在结构上是可审计的，因此在结构访问可得的情况下，行为代理不仅不必要，而且具有积极的误导性。本方法论建立在美国侵权法架构（《重述（第三版）》）之上，并在结语部分勾勒了跨法域的可扩展性（欧盟《人工智能法》、中国网信办相关规定）。

## 关键词

人工智能治理（AI governance）；法律归因（legal attribution）；产品责任（products liability）；约束级联（constraint cascade）；结构性抗辩（structural defense）；第3条故障原理（§3 Malfunction Doctrine）；行为推断（behavioral inference）；认识论边界（epistemic boundary）

## 目录

- [一、引言：行为主义共识的破产](/zh/posts/structural-defense/introduction/)
- [二、约束级联作为法律诊断工具](/zh/posts/structural-defense/constraint-cascade-legal-diagnostic/)
- [三、第3条故障原理瓶颈及其解决](/zh/posts/structural-defense/s3-malfunction-doctrine-bottleneck/)
- [四、方法论的适用：四个案例](/zh/posts/structural-defense/applying-methodology-four-cases/)
- [五、程序框架与结论](/zh/posts/structural-defense/procedural-framework-and-conclusion/)

## 术语对照表

| 中文 | English | 备注 |
|------|---------|------|
| 约束级联 | Constraint Cascade | 本文核心方法论——四层架构诊断分类体系 |
| 结构性抗辩 | structural defense | 本文标题概念——通过结构定位而非行为推断进行法律归因 |
| 认识论边界 | epistemic boundary | L2与L3之间的结构边界——输出观察无法恢复内部状态 |
| 行为推断 | behavioral inference | 从外部行为推定内部缺陷的法律推理模式 |
| 行为主义共识 | behaviorist consensus | 产品责任法依赖行为推断的传统范式 |
| 第3条故障原理 | §3 Malfunction Doctrine | 《侵权法重述（第三版）》——允许仅凭故障证据推定缺陷存在 |
| 第2条分类 | §2 classification | 将缺陷归类为制造、设计或警示缺陷 |
| 第3条→第2条瓶颈 | §3→§2 bottleneck | 本文识别的核心教义学问题——能证明缺陷存在但无法分类 |
| 范畴错误 | category error | 将适用于黑箱的行为法范式错误应用于内部可审计系统 |
| 数据来源缺陷 | data-sourcing defect | 本文提出的新型缺陷子类——训练数据选择中的设计缺陷 |
| 迎合偏误 | sycophancy | AI系统性强化用户信念而不顾其与现实关系的倾向 |
| 覆写 | Override | 跨层失效模式——高层级压制低层级安全约束 |
| 污染 | Contamination | 跨层失效模式——有害数据从低层级渗透到权重层 |
| 压缩 | Compression | 跨层失效模式——高层的单一指标压缩低层的多元价值 |
| 摩擦缝 | friction seam | 层级之间的界面——人力劳动吸收架构产生的错位成本 |
| 分层证据开示 | tiered discovery | 按架构层级和可观察性分层的证据开示程序 |
| 举证责任转移 | burden shift | 级联下的程序机制——未识别层级则产生不利推定 |
| 主权覆写 | sovereign override | L4（主权）通过采购或行政权力压制安全约束 |
| 政府承包商抗辩 | Government Contractor Defense | *Boyle*案确立——承包商在政府强制设计下免责 |
| 产品责任 | products liability | |
| 严格责任 | strict liability | |
| 设计缺陷 | design defect | §2(b) |
| 制造缺陷 | manufacturing defect | §2(a) |
| 警示缺陷 | warning defect | §2(c) |
| 替代责任 | vicarious liability | *respondeat superior* |
| 公司过失 | corporate negligence | |
| 比较过失 | comparative negligence | |
| 助成过失 | contributory negligence | |
| 行政法 | Administrative Law | |
| APA任意与反复无常审查 | APA arbitrary-and-capricious review | |
| 禁令救济 | injunctive relief | |
| 主观故意/主观罪过 | mens rea | 刑法概念——本文在侵权语境中使用其谱系含义 |
| *Dual Certificates* | 《双重证书》 | 本文所依赖的数学基础论文 |
| RLHF | 基于人类反馈的强化学习 | Reinforcement Learning from Human Feedback |
| 《欧盟人工智能法》 | EU AI Act | Regulation 2024/1689 |
| 《产品责任指令》 | Product Liability Directive | 修订后于2026年12月生效 |
| 网信办 | CAC | Cyberspace Administration of China |
| 元宝 | Yuanbao | 腾讯人工智能助手 |

（59 Cal. 2d 57, 62–64 (1963).）: 59 Cal. 2d 57, 62–64 (1963).
（Restatement (Third) of Torts: Products Liability §§ 2–3 (1998).）: Restatement (Third) of Torts: Products Liability §§ 2–3 (1998).
（*Garcia v. Character Techs., Inc.*, No. 6:24-cv-01903-ACC-UAM, Order on Motion to Dismiss at 28–34 (M.D. Fla. May 21, 2025) (Conway, J.).）: *Garcia v. Character Techs., Inc.*, No. 6:24-cv-01903-ACC-UAM, Order on Motion to Dismiss at 28–34 (M.D. Fla. May 21, 2025) (Conway, J.).
（*First County Bank v. OpenAI Found.*, No. CGC-25-631477 (Cal. Super. Ct. S.F. Cty., filed Dec. 11, 2025); *Lyons v. OpenAI Found.*, No. 3:25-cv-11037 (N.D. Cal., filed Dec. 29, 2025).）: *First County Bank v. OpenAI Found.*, No. CGC-25-631477 (Cal. Super. Ct. S.F. Cty., filed Dec. 11, 2025); *Lyons v. OpenAI Found.*, No. 3:25-cv-11037 (N.D. Cal., filed Dec. 29, 2025).
（*Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026).）: *Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026).
（级联在配套工作中作为STS/治理分类体系得到完整发展。本部分仅为法律论证目的概括其架构；读者可参阅该配套工作了解完整的技术和社会技术发展。）: 级联在配套工作中作为STS/治理分类体系得到完整发展。本部分仅为法律论证目的概括其架构；读者可参阅该配套工作了解完整的技术和社会技术发展。
（421 U.S. 658, 670–73 (1975).）: 421 U.S. 658, 670–73 (1975).
（487 U.S. 500 (1988). 根据 *Boyle*，当(1) 政府批准了合理精确的规格，(2) 设备符合这些规格，且(3) 承包商警告了政府已知的危险时，政府承包商免于设计缺陷责任。）: 487 U.S. 500 (1988). 根据 *Boyle*，当(1) 政府批准了合理精确的规格，(2) 设备符合这些规格，且(3) 承包商警告了政府已知的危险时，政府承包商免于设计缺陷责任。
（Restatement (Third) of Torts: Products Liability §3 cmt. b (1998).）: Restatement (Third) of Torts: Products Liability §3 cmt. b (1998).
（案例事实取自公开的法院文件、经确认的新闻稿和已发表的报道。未进行任何私人调查。案例(c)涉及作者在其中无任何利益的进行中诉讼。）: 案例事实取自公开的法院文件、经确认的新闻稿和已发表的报道。未进行任何私人调查。案例(c)涉及作者在其中无任何利益的进行中诉讼。
（Complaint, *Garcia v. Character Techs.*, No. 6:24-cv-01903 (M.D. Fla. filed Oct. 22, 2024).）: Complaint, *Garcia v. Character Techs.*, No. 6:24-cv-01903 (M.D. Fla. filed Oct. 22, 2024).
（OpenAI, *Sycophancy in GPT-4o: What Happened and What We're Doing About It* (Apr. 29, 2025), https://openai.com/index/sycophancy-in-gpt-4o/.）: OpenAI, *Sycophancy in GPT-4o: What Happened and What We're Doing About It* (Apr. 29, 2025), https://openai.com/index/sycophancy-in-gpt-4o/.
（*Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026); 另见 washpost2026claudeiran; cnn2026ultimatum; hegseth2026ban.）: *Anthropic PBC v. U.S. Department of War*, No. 3:26-cv-01996 (N.D. Cal. filed Mar. 9, 2026); 另见 washpost2026claudeiran; cnn2026ultimatum; hegseth2026ban.
（Lawfare分析指出这一模糊性：政府需求"在Layer 2（合同限制）和Layer 4（重新训练）之间模糊不清"——级联会说是L2和L3（lawfare2026claudemaven）。）: Lawfare分析指出这一模糊性：政府需求"在Layer 2（合同限制）和Layer 4（重新训练）之间模糊不清"——级联会说是L2和L3（lawfare2026claudemaven）。
（jiang2026yuanbao; thepaper2026; tencent2026response; southcn2026yuanbao.）: jiang2026yuanbao; thepaper2026; tencent2026response; southcn2026yuanbao.
（该方案与欧盟路径一致：修订后的《产品责任指令》（eupld2024）将人工智能系统视为产品、将开发者视为制造商，这将把训练数据选择纳入设计缺陷框架。《欧盟人工智能法》对高风险系统的数据治理要求（euaiact2024）为风险-效用分析提供了监管底线。）: 该方案与欧盟路径一致：修订后的《产品责任指令》（eupld2024）将人工智能系统视为产品、将开发者视为制造商，这将把训练数据选择纳入设计缺陷框架。《欧盟人工智能法》对高风险系统的数据治理要求（euaiact2024）为风险-效用分析提供了监管底线。
（cac2025draft.）: cac2025draft.
