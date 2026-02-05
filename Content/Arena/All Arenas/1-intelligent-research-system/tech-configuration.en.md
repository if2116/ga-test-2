
# Technical Configuration

__Step Number__

1

__Step Name__

Resource Preparation and Environment Configuration

__Step Definition__

Check if Node, npm, and python are installed to prepare for the next step of installing Claude Code

__Participants__

- Role Name: Algorithm Engineer
- Skill Requirements:

1. Proficient in using various chain-of-thought strategies, familiar with cutting-edge and popular open/closed source LLM resources, with own usage experience, summaries, and insights
2. Proficient in NLP classic deep learning models (such as Transformer series, LLaMA series, GLM series, etc.) and related resources (websites, libraries, blogs, etc.); master at least one common deep learning development framework, such as PyTorch; maintain continuous attention and interest in the working principles and latest news of large-scale generative language models (LLMs) after GPT-3.5
3. Proficient in Python language, able to use basic regular expressions and command-line scripts; familiar with NLP basic concepts and classic tasks (classification, matching, sequence labeling, generation, etc.); able to skillfully use common NLP open-source libraries (HanLP, LTP, Jieba, etc.)

- Role Quantity: 1 person

__Step Input__

- Input Name: Install Node
- Input Introduction: Install Node, npm, python via command line.
- Input Example:

```text
node -v
Note: Output may be similar to "v22.21.1"

npm -v
Note: Output may be similar to "10.9.4"

python -V
Note: Output may be similar to "Python 3.11.13"
```

__Step Output__

- Output Name: Environment configuration resources ready
- Output Introduction: Server has configured Python environment and Node environment, meeting model deployment requirements

__Estimated Time__

1-2 days

__Step Number__

2

__Step Name__

Claude Code Installation and Configuration

__Step Definition__

Install and configure Claude Code through Node

__Participants__

- Role Name: Algorithm Engineer (Frontend Engineer/Backend Engineer)
- Skill Requirements: Familiar with node
- Role Quantity: 1 person

__Step Input__

- Input Name: Install and configure Claude Code
- Input Introduction: Install and configure Claude Code based on Node environment
- Input Example:

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Configure environment variables (using ~/.bashrc as an example)
echo 'export ANTHROPIC_BASE_URL="YOUR_BASE_URL"' >> ~/.bashrc
echo 'export ANTHROPIC_AUTH_TOKEN="YOUR_AUTH_TOKEN"' >> ~/.bashrc

# Configure models
vim ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "YOUR_HAIKU_MODEL",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "YOUR_SONNET_MODEL",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "YOUR_OPUS_MODEL"
  }
}

# Test Claude Code
claude
> your_input
```

- Resource Links:
  - Claude Code GitHub: https://github.com/anthropics/claude-code

__Step Output__

- Output Name: Available Claude Code service
- Output Introduction: Use Claude Code to generate research reports

__Estimated Time__

0.5-1 day

__Step Number__

3

__Step Name__

tavily-mcp Service Construction and Startup (Optional)

__Step Definition__

Build tavily-mcp service to support web search, content reading and intelligent Q&A capabilities

__Participants__

- Role Name: Algorithm/Backend Engineer
- Skill Requirements: Familiar with Linux common commands and python
- Role Quantity: 1 person

__Step Input__

- Input Name: tavily-mcp service construction and startup
- Input Introduction: Use remote MCP server URL to install and start related MCP services
- Input Example:

```text
https://mcp.tavily.com/mcp/?tavilyApiKey=<your-api-key>
```

Add the following content to .claude.json file:

```text
{
  "mcpServers": {
    "tavily-remote-mcp": {
      "command": "npx -y mcp-remote https://mcp.tavily.com/mcp/?tavilyApiKey=<your-api-key>",
      "env": {}
    }
  }
}
```

Run the following code to check if connection is successful:

```text
claude mcp list
# Note: Seeing "tavily-remote-mcp: https://mcp.tavily.com/mcp (HTTP) - ✓ Connected" indicates success
```

- Resource Links:
  - Claude Code GitHub: https://github.com/anthropics/claude-code

__Step Output__

- Output Name: Available tavily web search MCP service
- Output Introduction: Build and start tavily-mcp service

__Estimated Time__

0.5-1 day

__Step Number__

4

__Step Name__

metaso-mcp Service Construction and Startup

__Step Definition__

Build metaso-mcp service to support web search, content reading and intelligent Q&A capabilities

__Participants__

- Role Name: Algorithm/Backend Engineer
- Skill Requirements: Familiar with Linux common commands
- Role Quantity: 1 person

__Step Input__

- Input Name: metaso-mcp service construction and startup
- Input Introduction: Use remote MCP server URL to install and start related MCP services
- Input Example:

```text
claude mcp add -s user -t http search-metaso https://metaso.cn/api/mcp --header "Authorization: Bearer xxx"  # Replace xxx with API key
```

Run the following code to check if connection is successful:

```text
claude mcp list
# Note: Seeing "search-metaso: https://metaso.cn/api/mcp (HTTP) - ✓ Connected" indicates success
```

- Resource Links:
  - Claude Code GitHub: https://github.com/anthropics/claude-code

__Step Output__

- Output Name: Available metaso web search MCP service
- Output Introduction: Build and start metaso-mcp service

__Estimated Time__

0.5-1 day

__Step Number__

5

__Step Name__

github, huggingface, arxiv-mcp Service Construction and Startup (Optional)

__Step Definition__

Build github-mcp service to support GitHub website search and content reading capabilities
Build huggingface-mcp service to support HuggingFace website search and content reading capabilities
Build arxiv-mcp service to support arXiv website search and content reading capabilities

__Participants__

- Role Name: Algorithm/Backend Engineer
- Skill Requirements: Familiar with Linux common commands, python
- Role Quantity: 1 person

__Step Input__

- Input Name: github, huggingface, arxiv-mcp service construction and startup (optional)
- Input Introduction: Install and start related MCP services by installing related Python dependencies
- Input Example:

Create requirements.txt file:

```text
# Recommend python 3.10 and above, such as python 3.11

loguru>=0.7.0
python-dotenv>=1.0.0
mcp>=1.0.0
```

Create related service Python files:

```text
__github_server.py__
__hf_server.py__
__arxiv_server.py__
```

Install dependencies and start:

```text
pip install -r requirements.txt
python github_server.py
python hf_server.py
python arxiv_server.py

# Note: Seeing "Uvicorn running on http://0.0.0.0:PORT (Press CTRL+C to quit)" indicates successful startup
```

Register MCP services:

```text
# arxiv
claude mcp add -s user -t sse paper-arxiv http://127.0.0.1:4002/sse
# github
claude mcp add -s user -t sse code-github http://127.0.0.1:4001/sse
# huggingface
claude mcp add -s user -t sse model-huggingface http://127.0.0.1:4003/sse
```

- Resource Links:
  - mcp-python-sdk GitHub: https://github.com/modelcontextprotocol/python-sdk

__Step Output__

- Output Name: Available MCP services for GitHub, HuggingFace, arXiv websites
- Output Introduction: Build and start github, huggingface, arxiv-mcp services

__Estimated Time__

0.5-1 day

__Step Number__

6

__Step Name__

Use Claude Code to Generate Research Reports

__Step Definition__

Use Claude Code to automatically call the previous MCP services to generate research reports

__Participants__

- Role Name: Algorithm Engineer
- Skill Requirements:

1. Proficient in using various chain-of-thought strategies, familiar with cutting-edge and popular open/closed source LLM resources, with own usage experience, summaries, and insights
2. Proficient in NLP classic deep learning models (such as Transformer series, LLaMA series, GLM series, etc.) and related resources (websites, libraries, blogs, etc.); master at least one common deep learning development framework, such as PyTorch; maintain continuous attention and interest in the working principles and latest news of large-scale generative language models (LLMs) after GPT-3.5
3. Proficient in Python language, able to use basic regular expressions and command-line scripts; familiar with NLP basic concepts and classic tasks (classification, matching, sequence labeling, generation, etc.); able to skillfully use common NLP open-source libraries (HanLP, LTP, Jieba, etc.)

- Role Quantity: 1 person

__Step Input__

- Input Name: Use Claude Code to generate research reports
- Input Introduction: Interact with Claude Code to confirm input information to generate research reports
- Input Example:

Pass in existing research report template.md, research report generation process document skill.md and flowchart.md

```text
Project root directory/
├── files/                          # Original material folder
│   └── Research Report Template.md               # Research report template (required)
├── skill.md                        # Research report generation process document (required)
└── Deep Research Report Generation Full Process.md                        # Flowchart for generating research documents (required)
```

Deep Research Report Generation Full Process.md file content:

```text
__Deep Research Report Generation Full Process.md__
```

skill.md file content:

```text
__SKILL.md__
```

Start Claude Code in the project root directory to generate research reports:

```text
# Start claude, please ensure there are no other files in the project root directory except *files, skill.md, flowchart
claude
> Generate research report based on skill.md

# Note: There will be options requiring user confirmation during the process, and the final research report will be automatically generated later
```

__Step Output__

- Output Name: Research report
- Output Introduction: Claude Code automatically generates the final research report

__Estimated Time__

0.5-1 day


