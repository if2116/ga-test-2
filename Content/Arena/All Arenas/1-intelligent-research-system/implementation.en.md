
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
