
#### English

__PHASE 1 Requirements Identification and Team Building__

__Team Composition__

- __Business Liaison (×1)__: Familiar with the organization, processes, and decision-making pathways of the corresponding business work for this case; skilled in communication; familiar with basic project management operations
- __Business Technical Liaison (×1)__: Familiar with the technical functions and processes, construction and planning actually in use/expected to be involved in the corresponding business work of this case; assists the business liaison in technical-level communication; preferably an architect or technical project manager, secondarily specific technical execution personnel (such as backend engineers, etc.)
- __Algorithm Liaison (×1)__: Familiar with the industry-standard technical architecture and processes, construction and planning of the corresponding business work of this case; skilled in communication; familiar with basic project management operations

__Implementation Content__

1. Business liaison and algorithm liaison conduct initial requirement contact and brainstorming exchanges to identify the core requirements of this case
2. Business liaison and algorithm liaison establish a working group and contact group, clarifying the liaisons and contact methods
3. Business liaison (representing the requesting team) fills out the project cooperation requirement inquiry form provided by the algorithm liaison (representing the implementing team); if there is a clear concept and can decompose into multiple subtasks, can further fill out the subtask algorithm requirement template
4. Both parties communicate to supplement other materials needed for requirement confirmation, such as sample data, professional knowledge reference materials, etc.
5. Algorithm liaison coordinates their team to conduct requirement assessment based on the content of both parties' meetings and the feedback documents and materials

__Related Resources__

- Template: [Preliminary Verification Requirement Document Template](https://gvxnc4ekbvn.feishu.cn/wiki/PC8FwObgwiMwVPkM0i4cYkr2nYf?from=from_copylink)

__Deliverables__

1. Establish working group, clarify liaisons and contact methods
2. Begin filling out the preliminary verification requirement document, survey and organize relevant information

__Implementation Cycle__

1-3 days

__PHASE 2 Value Confirmation and Requirement Refinement__

__Team Composition__

- __Business Liaison (×1)__: Same as PHASE 1
- __Business Technical Liaison (×1)__: Same as PHASE 1
- __Business Expert (×1)__: Leader, executor, or expert involved in the core business modules of the corresponding business work of this case; assists the business liaison in clarifying business pain points and value
- __Product Manager (×1)__: Familiar with the organization, processes, and decision-making pathways of the corresponding business work of this case; skilled in communication; assists the business liaison in refining requirements and designing prototypes; this position can be provided by the implementing party or can be served by the business liaison
- __Algorithm Liaison (×1)__: Same as PHASE 1
- __Algorithm Expert (×1)__: Familiar with the industry's current cutting-edge and general technical solutions and selections for various scenarios and applications; assists the algorithm liaison in assessing requirements, coordinating the team to conduct research, design solutions and architecture, and assists in assessing scheduling; can be served by the algorithm liaison

__Implementation Content__

1. Business liaison communicates with their business experts and related teams to confirm the expected goals and business value of the solution implementation. Business value should be quantified as much as possible, with comparative data (such as current numbers, expected achievement goals, expected degree of improvement compared to current status, etc.)
2. Algorithm liaison communicates with their algorithm experts and related teams to list items to be confirmed, while conducting preliminary research, assessment, and design of the solution
3. Product manager communicates with business liaison and algorithm liaison to sort out and clarify requirements, then organizes relevant personnel from both parties to write the preliminary verification requirement document
4. Both parties confirm requirements based on the preliminary verification requirement document, and plan scheduling, budget, and resources based on the confirmed requirements. Scheduling recommendation: First, the implementing party completes preliminary verification, selection, produces a Demo, and passes PoC as the first milestone; thereafter, both parties further negotiate formal project implementation
5. Repeat the above steps until the preliminary verification requirement document is finalized

__Related Resources__

- Template: [Preliminary Verification Requirement Document Template](https://gvxnc4ekbvn.feishu.cn/wiki/PC8FwObgwiMwVPkM0i4cYkr2nYf?from=from_copylink)

__Deliverables__

1. Preliminary verification requirement document: [Preliminary Verification Requirement Document](https://gvxnc4ekbvn.feishu.cn/wiki/UK3nwnHFuiZtxzkhAhvczfDDn5g?from=from_copylink)
2. Confirmation of PoC-related matters, such as start time, acceptance time, acceptance plan, etc.

__Implementation Cycle__

1-2 weeks

__PHASE 3 Preliminary Verification and Project Initiation__

__Team Composition__

- __Business Liaison (×1)__: Same as PHASE 1
- __Algorithm Liaison (×1)__: Same as PHASE 1
- __Product Manager (×1)__: Same as PHASE 2, additionally needs to be proficient in using common no-code/low-code ("drag-and-drop") agent workflow platforms (such as Bisheng, Dify, etc.)
- __Algorithm Engineer (×1)__: Masters at least one backend programming language (such as Python); familiar with Docker; masters private deployment and LLM configuration of common agent platforms (such as Dify, etc.); can be served by the algorithm liaison

__Implementation Content__

1. Resource preparation and environment configuration
2. Claude Code installation and configuration
3. tavily-mcp service construction and startup
4. metaso-mcp service construction and startup
5. github, huggingface, arxiv-mcp service construction and startup (optional)
6. Use Claude Code to generate research reports
7. Algorithm team writes preliminary verification report
8. Complete PoC
9. Close communication between both parties to confirm whether to formally initiate the project
10. If formal project initiation is determined, both parties adjust the plan based on the Demo effect, finalize the project initiation report, and prepare the project initiation agreement and launch matters

__Related Resources__

- Claude Code GitHub: https://github.com/anthropics/claude-code
- Tavily Installation Documentation: https://docs.tavily.com/documentation/mcp
- Metaso Installation Documentation: https://www.modelscope.cn/mcp/servers/metasota/metaso-search
- mcp-python-sdk GitHub: https://github.com/modelcontextprotocol/python-sdk
- Template: [Preliminary Verification Report Template](https://gvxnc4ekbvn.feishu.cn/wiki/HKZGwXetBije9HklRQmcAe94nZE?from=from_copylink)
- Template: [Project Initiation Report Template](https://gvxnc4ekbvn.feishu.cn/wiki/R0jrwxeDfiBpsEkqZdYcZtgJncd?from=from_copylink)

__Deliverables__

1. Finalize and deliver preliminary verification report: [Preliminary Verification Report](https://gvxnc4ekbvn.feishu.cn/wiki/EpdnwqYsri1TZDkRYNVcgE1TnYe?from=from_copylink)
2. Complete Demo construction, prepare and ultimately pass PoC
3. Write and deliver project initiation report: [Project Initiation Report](https://gvxnc4ekbvn.feishu.cn/wiki/EioZwicWhiWcfek81q9cCl7bnGb?from=from_copylink)
4. Project initiation agreement (attachments should include delivery, acceptance, scheduling, resources, etc. for the formal launch version)

__Implementation Cycle__

3.5-7 days

__PHASE 4 Formal Launch and Optimization Iteration__

__Team Composition__

Determined by the project initiation report

__Implementation Content__

1. Complete formal project initiation, determine launch time
2. Implement and deliver according to the project initiation report content and schedule plan
3. Review and accept according to the project initiation report goals and processes
4. Operate and iterate according to the project initiation report plan
5. Complete project closure according to the project initiation report plan and agreement

__Related Resources__

/

__Deliverables__

1. All materials agreed upon by both parties throughout the project cycle
2. Officially launched product

__Implementation Cycle__

3-6 months (varies by specific situation)


#### 中文


__PHASE 1 需求识别与团队构建__

__团队构成__

- __业务对接人（×1）__：熟悉该案例对应业务工作的组织、流程、决策链路，擅长沟通，熟悉项目管理基本操作
- __业务侧技术对接人（×1）__：熟悉该案例对应业务工作实际在用/预期涉及的技术功能与流程、建设与规划，辅助业务对接人在技术层面的沟通，建议首选架构师或技术型项目经理，其次为具体技术执行人员（如后端工程师等）
- __算法对接人（×1）__：熟悉该案例对应业务工作的业界通行技术架构与流程、建设与规划，擅长沟通，熟悉项目管理基本操作

__实施内容__

1. 业务对接人与算法对接人进行初次需求接触与头脑风暴交流，梳理该案例的核心需求
2. 业务对接人与算法对接人组建工作组及联络群，明确明确对接人与联络方式
3. 业务对接人（代表需求方团队）填写算法对接人（代表承做方团队）提供的项目合作需求问询书；如果已有较明确的构想、能拆解出多个子任务，可进一步填写子任务算法需求模板
4. 双方沟通补充需求确认所需的其他材料，如样例数据、专业知识参考资料等
5. 算法对接人协调自己团队，根据双方会议内容及反馈的文档和材料，展开需求评估

__相关资源__

- 模板：[初步验证需求文档模板](https://gvxnc4ekbvn.feishu.cn/wiki/PC8FwObgwiMwVPkM0i4cYkr2nYf?from=from_copylink)

__结果产出__

1. 成立工作组，明确对接人与联络方式
2. 开始填写初步验证需求文档，对相关信息进行调研与梳理

__实施周期__

1-3日

__PHASE 2 价值确认与需求细化__

__团队构成__

- __业务对接人（×1）__：同PHASE 1
- __业务侧技术对接人（×1）__：同PHASE 1
- __业务专家（×1）__：该案例对应业务工作中涉及核心业务模块的领导者、执行者或专家，协助业务对接人明确业务痛点与价值
- __产品经理（×1）__：熟悉该案例对应业务工作的组织、流程、决策链路，擅长沟通，协助业务对接人细化需求，并设计原型，该职位可由承做方提供，可由业务对接人担任
- __算法对接人（×1）__：同PHASE 1
- __算法专家（×1）__：熟悉各场景与应用中业界目前的前沿与通用技术方案及选型，协助算法对接人评估需求，协调团队进行调研、设计方案与架构，协助评估排期，可由算法对接人担任

__实施内容__

1. 业务对接人与己方业务专家及相关团队沟通，确认该方案实施的预期目标及业务价值，业务价值需要尽可能量化，并有对比数据（如现状数字、预期达成目标、预期相比现状改善的程度等）
2. 算法对接人与己方算法专家及相关团队沟通，罗列待确认事项，同时对方案进行初步调研、评估、设计
3. 产品经理与业务对接人和算法对接人沟通、梳理并明确需求，之后组织双方相关人员撰写初步验证需求文档
4. 双方根据初步验证需求文档进行需求确认，根据确认的需求规划排期、预算和资源。排期建议：首先以承接方完成初步验证、选型、产出Demo，并通过PoC为首个里程碑；之后双方进一步协商正式立项实施
5. 重复以上步骤直至初步验证需求文档定稿

__相关资源__

- 模板：[初步验证需求文档模板](https://gvxnc4ekbvn.feishu.cn/wiki/PC8FwObgwiMwVPkM0i4cYkr2nYf?from=from_copylink)

__结果产出__

1. 初步验证需求文档：[初步验证需求文档](https://gvxnc4ekbvn.feishu.cn/wiki/UK3nwnHFuiZtxzkhAhvczfDDn5g?from=from_copylink)
2. PoC相关事项确认，如启动时间、验收时间、验收方案等

__实施周期__

1-2周

__PHASE 3 初步验证与立项__

__团队构成__

- __业务对接人（×1）__：同PHASE 1
- __算法对接人（×1）__：同PHASE 1
- __产品经理（×1）__：同PHASE 2，另需能熟练使用常见的无/低代码（"拖拉拽"方式）构建智能体工作流平台（如毕昇、Dify等）
- __算法工程师（×1）__：掌握至少一门后端编程语言（如Python等）；熟悉 Docker；掌握常见智能体平台（如Dify 等）的私有化部署、大模型配置，可由算法对接人担任

__实施内容__

1. 资源准备与环境配置
2. Claude Code 安装和配置
3. tavily\-mcp 服务构建、启动
4. metaso\-mcp 服务构建、启动
5. github、huggingface、arxiv\-mcp 服务构建、启动（可选）
6. 使⽤ Claude Code ⽣成调研报告
7. 算法团队撰写初步验证报告
8. 完成PoC
9. 双方密切沟通，确认是否正式立项
10. 若确定正式立项，双方就Demo效果调整方案，定稿立项报告，准备立项协议及启动事宜

__相关资源__

- Claude Code GitHub：https://github\.com/anthropics/claude\-code
- Tavily安装文档：https://docs\.tavily\.com/documentation/mcp
- Metaso安装文档：https://www\.modelscope\.cn/mcp/servers/metasota/metaso\-search
- mcp\-python\-sdk GitHub：https://github\.com/modelcontextprotocol/python\-sdk
- 模板：[初步验证报告模板](https://gvxnc4ekbvn.feishu.cn/wiki/HKZGwXetBije9HklRQmcAe94nZE?from=from_copylink)
- 模板：[立项报告模板](https://gvxnc4ekbvn.feishu.cn/wiki/R0jrwxeDfiBpsEkqZdYcZtgJncd?from=from_copylink)

__结果产出__

1. 定稿并交付初步验证报告：[初步验证报告](https://gvxnc4ekbvn.feishu.cn/wiki/EpdnwqYsri1TZDkRYNVcgE1TnYe?from=from_copylink)
2. 完成Demo构建，准备并最终通过PoC
3. 撰写并交付立项报告：[立项报告](https://gvxnc4ekbvn.feishu.cn/wiki/EioZwicWhiWcfek81q9cCl7bnGb?from=from_copylink)
4. 立项协议（附件应包含正式上线版本的交付、验收、排期、资源等内容）

__实施周期__

3\.5\-7日

__PHASE 4 正式上线与优化迭代__

__团队构成__

按立项报告确定

__实施内容__

1. 完成正式立项，确定启动时间
2. 按立项报告内容与排期计划来实施与交付
3. 按立项报告目标与流程来评审与验收
4. 按立项报告规划来进行运营与迭代
5. 按立项报告规划及协议约定，完成结项

__相关资源__

/

__结果产出__

1. 项目全周期所有双方协商达成一致的材料
2. 正式上线的产品

__实施周期__

3\-6月（因具体情况而异）

