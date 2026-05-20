# Claude Code MCP 设置指南

> **课程定位**：《企业智能体实战营》· 融龙虾篇
> **内容**：全面掌握 Claude Code 的 MCP 配置方法，理解协议原理，学会添加和管理各类 MCP Server
> **难度**：★★☆☆☆
> **耗时**：10-15 分钟

---

## 一、MCP 是什么

### 1.1 一句话理解

MCP（Model Context Protocol）是 Anthropic 推出的 **AI 工具的 USB-C 接口**：

```
没有 MCP 的时代                有 MCP 的时代
┌──────────────┐             ┌──────────────┐
│   AI 模型     │             │   AI 模型     │
│              │             │              │
│  需要为每个   │             │  一套 MCP     │
│  工具写定制   │   ❌        │  协议，连通   │  ✅
│  代码        │             │  所有工具     │
│              │             │              │
│  飞书 API    │             │  飞书 MCP ←──┤
│  数据库 API  │             │  数据库 MCP ←─┤
│  浏览器 API  │             │  浏览器 MCP ←─┤
└──────────────┘             └──────────────┘
```

### 1.2 MCP 的核心角色

| 角色 | 说明 | 类比 |
|------|------|------|
| **MCP 协议** | AI 与工具之间的通信标准 | USB-C 接口规范 |
| **MCP Client** | AI 模型端（Claude Code） | 电脑主机 |
| **MCP Server** | 每个工具的"驱动" | USB-C 转 HDMI 转接头 |
| **工具/资源** | 实际能力（文档操作、数据库查询） | HDMI 显示器 |

### 1.3 打通后 Claude 能做什么

| MCP Server | 示例指令 |
|------------|---------|
| 飞书 MCP | "创建一份文档，发给项目群" |
| 文件系统 MCP | "读取 `/data/report.pdf` 并总结" |
| 数据库 MCP | "查询上周的订单数据" |
| GitHub MCP | "查看 Issue #42 的状态" |
| 浏览器 MCP | "打开百度搜索'AI Agent 2026'" |

---

## 二、Claude Code 的 MCP 配置体系

### 2.1 配置文件的两种层级

#### 层级一：全局配置（所有项目生效）

| 操作系统 | 文件路径 |
|---------|---------|
| macOS/Linux | `~/.claude.json` |
| Windows | `%USERPROFILE%\.claude.json` |

**适用场景**：
- 个人常用的 MCP Server（如浏览器、GitHub、文件系统）
- 跨项目通用的工具

#### 层级二：项目配置（仅当前项目生效）

| 文件名 | 说明 |
|--------|------|
| `.claude/settings.json` | 推荐方式，项目根目录下 |
| `.mcp.json` | 备选，部分旧版本使用 |

**适用场景**：
- 项目专用的 MCP Server（如飞书 MCP、数据库 MCP）
- 需要分发到团队的项目配置

#### 优先级规则

```
项目配置 > 全局配置
```

同名 MCP Server 在项目配置中会覆盖全局配置。

### 2.2 MCP Server 的基本配置格式

```json
{
  "mcpServers": {
    "server-name": {
      "command": "运行命令",
      "args": ["参数1", "参数2"],
      "env": {
        "环境变量1": "值1",
        "环境变量2": "值2"
      }
    }
  }
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `command` | ✅ | 启动 MCP Server 的可执行文件 |
| `args` | ❌ | 命令行参数数组 |
| `env` | ❌ | 环境变量（如 API Key、Secret） |

### 2.3 配置生效流程

```
1. 编辑配置文件 (settings.json / .claude.json)
          ↓
2. 保存文件
          ↓
3. 重启 Claude Code（或刷新）
          ↓
4. Claude 自动检测并连接 MCP Server
          ↓
5. 在对话中使用对应工具
```

---

## 三、配置方式详解

### 方式一：手动编辑配置文件（推荐）

#### 步骤

**1. 打开配置文件**

```bash
# macOS/Linux - 全局配置
vim ~/.claude.json

# 或项目配置
vim .claude/settings.json   # 如果文件不存在，创建即可
```

**2. 写入 MCP Server 配置**

示例：添加飞书 MCP Server

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "cli_xxxxxxxxxxxxxxxxx",
        "-s", "your_app_secret_here"
      ]
    }
  }
}
```

示例：添加多个 MCP Server

```json
{
  "mcpServers": {
    "lark-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@larksuiteoapi/lark-mcp",
        "mcp",
        "-a", "cli_xxxxxxxxxxxxxxxxx",
        "-s", "your_app_secret"
      ]
    },
    "github-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-github"
      ],
      "env": {
        "GITHUB_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/projects",
        "/Users/yourname/data"
      ]
    }
  }
}
```

---

### 方式二：使用 CLI 命令添加

Claude Code 提供了 `claude mcp` 命令行工具辅助管理。

#### 添加 MCP Server

```bash
# 全局添加
claude mcp add-json --scope=user server-name '{
  "command": "npx",
  "args": ["-y", "package-name", "arg1", "arg2"],
  "env": {"KEY": "value"}
}'

# 项目添加
claude mcp add-json --scope=project server-name '{
  "command": "npx",
  "args": ["-y", "package-name", "arg1", "arg2"]
}'
```

#### 列出已配置的 MCP Server

```bash
claude mcp list
```

#### 查看某个 Server 详情

```bash
claude mcp get server-name
```

#### 删除 MCP Server

```bash
claude mcp remove server-name
```

---

### 方式三：通过 Claude Code 对话配置（推荐给新手）

在 Claude Code 中直接说：

```
帮我添加一个飞书 MCP Server，App ID 是 cli_xxx，App Secret 是 xxx
```

Claude 会自动帮你完成配置文件的更新。

---

## 四、MCP Server 的类型

### 4.1 Stdio 类型（最常用）

Server 作为子进程运行，通过标准输入/输出通信。

```json
{
  "mcpServers": {
    "example": {
      "command": "npx",
      "args": ["-y", "@some/server"]
    }
  }
}
```

**特点**：
- 启动快，无需网络
- 适合本地工具
- 设置最简单

### 4.2 SSE 类型（远程 Server）

Server 运行在远程服务器上，通过 HTTP 长连接通信。

```json
{
  "mcpServers": {
    "remote-server": {
      "command": "npx",
      "args": ["-y", "mcp-remote-client"],
      "env": {
        "MCP_URL": "https://example.com/mcp"
      }
    }
  }
}
```

**特点**：
- 可以部署在远程服务器
- 团队共享同一个 Server
- 需要网络连接

---

## 五、MCP Server 资源速查

### 5.1 官方 MCP Server

| Server | 用途 | 安装命令（args） |
|--------|------|-----------------|
| **filesystem** | 本地文件读写 | `@modelcontextprotocol/server-filesystem /path/to/dir` |
| **github** | GitHub API | `@modelcontextprotocol/server-github` + `GITHUB_TOKEN` 环境变量 |
| **git** | Git 操作 | `@modelcontextprotocol/server-git` |
| **postgres** | PostgreSQL 数据库 | `@modelcontextprotocol/server-postgres` + 连接串 |
| **sqlite** | SQLite 数据库 | `@modelcontextprotocol/server-sqlite` + 数据库路径 |
| **puppeteer** | 浏览器自动化 | `@modelcontextprotocol/server-puppeteer` |
| **slack** | Slack 集成 | `@modelcontextprotocol/server-slack` + Token |
| **google-calendar** | Google 日历 | `@modelcontextprotocol/server-google-calendar` |
| **google-drive** | Google 云盘 | `@modelcontextprotocol/server-google-drive` |

### 5.2 常用第三方 MCP Server

| Server | 用途 | 安装命令 |
|--------|------|---------|
| **lark-mcp** | 飞书集成 | `@larksuiteoapi/lark-mcp` |
| **server-baidu** | 百度搜索 | `@anthropic/server-baidu` |
| **sequential-thinking** | 思维链推理 | `@anthropic/server-sequential-thinking` |
| **memory** | 持久化记忆 | `@anthropic/server-memory` |

### 5.3 查找更多 MCP Server

- **官方仓库**：[github.com/modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers)
- **社区市场**：[smithery.ai](https://smithery.ai) — 浏览和发现 MCP Server
- **NPM 搜索**：`npm search @modelcontextprotocol/server-`

---

## 六、MCP 与 Skills 的区别

这是学员经常会问的问题：

| 维度 | MCP Server | Claude Skills |
|------|-----------|---------------|
| **本质** | 连接外部工具 | 注入系统提示词 |
| **能力来源** | 可执行程序（调 API、操作文件） | 文本指令（知识 + 行为规则） |
| **示例** | 飞书 MCP → 操作飞书文档 | 拆书 Skill → 框架化输出 |
| **开发难度** | 需要编程 | 只需写 Markdown |
| **适合场景** | 工具集成、数据读写 | 知识注入、行为规范、思维框架 |

**两者互补**：Skill 告诉 Claude"怎么思考"，MCP 告诉 Claude"能做什么"。

```
Skill（思维框架）                MCP（工具能力）
─────────────────              ─────────────────
"按三步法分析问题"               "读取数据库"
"用教练式话术回答"               "创建飞书文档"
"遵循课程方法论"                 "搜索网页"
```

---

## 七、排错指南

### 7.1 MCP Server 没有启动

**现象**：Claude 说"我没有相关工具"

**排查步骤**：

```bash
# 1. 检查配置是否正确
cat ~/.claude.json

# 2. 手动尝试启动 Server（验证命令本身可用）
npx -y @larksuiteoapi/lark-mcp mcp -a cli_xxx -s xxx

# 3. 查看 Claude Code 启动日志（是否有报错）
claude log
```

### 7.2 命令找不到

**现象**：启动报错 `command not found`

**解决**：

```bash
# 确保 npx/npm 已安装
which npx

# 如果 npx 不可用，先安装 Node.js
# https://nodejs.org (下载 LTS 版本)
```

### 7.3 环境变量问题

**现象**：Server 启动但报认证错误

**解决**：检查 `env` 字段中的环境变量是否正确

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "在这里写入正确的 Token"
      }
    }
  }
}
```

### 7.4 配置文件 JSON 格式错误

**现象**：Claude Code 启动时报 JSON 解析错误

**解决**：使用 JSON 校验工具

```bash
# 用 python 检查 JSON 格式
python3 -c "import json; json.load(open('$HOME/.claude.json'))"

# 或安装 jsonlint
npm install -g jsonlint
jsonlint ~/.claude.json
```

常见 JSON 错误：
- ❌ 末尾多逗号：`"key": "value",`
- ✅ 正确：`"key": "value"`
- ❌ 注释存在：`// 这是注释`
- ✅ JSON 不支持注释，需删除

---

## 八、最佳实践

### 8.1 安全管理凭证

**不要**把 API Key 直接写进配置上传到 Git：

```json
// ❌ 错误做法
{
  "mcpServers": {
    "db": {
      "command": "...",
      "args": [],
      "env": {
        "DB_PASSWORD": "123456"
      }
    }
  }
}
```

**推荐做法**：在终端设置环境变量，配置中引用：

```bash
# .zshrc / .bashrc 中设置
export DB_PASSWORD="your_actual_password"
```

```json
{
  "mcpServers": {
    "db": {
      "command": "...",
      "args": [],
      "env": {
        "DB_PASSWORD": "$DB_PASSWORD"
      }
    }
  }
}
```

> **注意**：Claude Code 的 `env` 字段支持 `${ENV_VAR}` 语法读取本机环境变量（从 Claude Code v0.3+ 开始）。

或者将 `.claude/settings.json` 加入 `.gitignore`。

### 8.2 按场景启用 Server

不要一次性加太多 MCP Server——会冲淡 Claude 的注意力。

**推荐**：
- 日常开发：文件系统 + GitHub
- 企业课程交付：飞书 MCP + 文件系统
- 数据工作：数据库 MCP + 文件系统

### 8.3 版本兼容

定期更新 MCP Server 包：

```bash
# 更新全局包
npm update -g @larksuiteoapi/lark-mcp

# 或清除 npx 缓存（强制重新下载）
npx clear-cache
```

---

## 九、融龙虾：从单体到生态

MCP 是你"融龙虾"的核心基础设施：

```
┌─────────────────────────────────────────────────────┐
│                   融龙虾完成态                        │
├─────────────────────────────────────────────────────┤
│                                                      │
│    Claude Code                                       │
│    ┌─────────────────────────────────────┐           │
│    │                                     │           │
│    │  MCP 协议层                          │           │
│    │  ┌──────┐ ┌──────┐ ┌──────┐ ┌────┐ │           │
│    │  │飞书   │ │GitHub│ │数据库│ │更多 │ │           │
│    │  │MCP   │ │MCP   │ │MCP  │ │MCP │ │           │
│    │  └──┬───┘ └──┬───┘ └──┬───┘ └──┬─┘ │           │
│    └─────┼─────────┼────────┼────────┼──┘           │
│          │         │        │        │               │
│    ┌─────▼──┐ ┌───▼──┐ ┌──▼───┐ ┌──▼────┐          │
│    │ 飞书    │ │GitHub│ │数据库│ │浏览器  │          │
│    │文档/消息│ │代码  │ │查询  │ │抓取   │          │
│    └────────┘ └──────┘ └──────┘ └───────┘          │
│                                                      │
└─────────────────────────────────────────────────────┘
```

每个 MCP Server 就是你 AI 智能体的一个**器官**：
- **飞书 MCP** = 手（写文档、发消息）
- **GitHub MCP** = 工具库（写代码、管理项目）
- **数据库 MCP** = 外脑（查数据、做分析）
- **浏览器 MCP** = 眼睛（看网页、抓信息）

---

> **参考资源**
> - MCP 官方文档：https://modelcontextprotocol.io
> - MCP Server 官方仓库：https://github.com/modelcontextprotocol/servers
> - Claude Code MCP 配置文档：https://docs.anthropic.com/en/docs/claude-code/overview
> - 社区 MCP 市场：https://smithery.ai
