# 飞书 MCP Server 接入指南

> **课程定位**：《企业智能体实战营》· 融龙虾篇
> **内容**：把 Claude Code 和飞书通过 MCP Server 打通，实现 AI 直接读写飞书文档、发消息、管理数据
> **难度**：★★☆☆☆（需基本命令行操作能力）
> **耗时**：15-20 分钟

---

## 一、什么是 MCP Server

### 1.1 MCP 的概念

MCP（Model Context Protocol）是 Anthropic 推出的**开放协议**，相当于 AI 界的 USB-C 接口：
- 标准化的协议，让 AI 模型连接外部工具和数据源
- 一个 MCP Server = 一个工具的"驱动程序"
- AI 通过 MCP 协议调用工具，不需要每次都写定制代码

```
┌─────────────────┐      MCP 协议       ┌─────────────────┐
│   Claude Code   │ ◄────────────────►   │  飞书 MCP Server│
│   (AI 引擎)      │                     │   (飞书 API 网关) │
└─────────────────┘                     └────────┬────────┘
                                                 │
                                        ┌────────▼────────┐
                                        │   飞书开放平台    │
                                        │  文档/消息/表格   │
                                        └─────────────────┘
```

### 1.2 打通后的能力

| 能力 | 示例指令 |
|------|---------|
| **创建文档** | "帮我创建一份课程大纲飞书文档" |
| **读文档内容** | "读取上周的客户提案文档" |
| **搜索文档** | "找一下关于智能体的所有文档" |
| **发消息** | "给企业智能体实战营群发课程提醒" |
| **多维表格** | "在课程管理表中新增一名学员记录" |
| **Bitable** | "创建学员信息数据库" |

---

## 二、前置准备

### 2.1 你需要的东西

| 项目 | 说明 |
|------|------|
| ✅ Claude Code | 已安装并可用（终端输入 `claude` 验证） |
| ✅ 飞书企业账号 | 有管理员权限，或能申请应用审批 |
| ✅ 飞书开放平台账号 | 访问 [open.feishu.cn](https://open.feishu.cn) |
| ✅ Node.js | 确保已安装（`node -v` 验证，需 v18+） |
| ✅ npx | 确保已安装（`npx -v` 验证，npm 自带） |

### 2.2 确认 Claude Code 版本

```bash
claude --version
# 建议 0.3.0 以上版本
```

### 2.3 确认 Node.js 版本

```bash
node -v
# 建议 v18 以上
npx -v
```

---

## 三、步骤详解

### Step 1：创建飞书应用

1. 打开 [飞书开放平台](https://open.feishu.cn)
2. 点击右上角 **"开发者后台"**
3. 点击 **"创建应用"**
4. 选择 **"企业自建应用"**
5. 填写应用信息：
   - **应用名称**：建议写 "Claude Code MCP"（或你喜欢的名字）
   - **应用描述**：用于 Claude Code 与飞书集成
   - **头像**：可自定义

![创建应用](./images/feishu-create-app.png)

> 如果创建时提示需要管理员权限，联系企业飞书管理员协助。

---

### Step 2：配置应用权限

在应用管理页面的左侧菜单，找到 **"权限管理"**。

需要开启以下权限（点击"开启"按钮）：

#### 2.1 文档权限

| 权限 | 说明 | 必选 |
|------|------|------|
| `docx:document` | 创建和管理文档 | ✅ |
| `docx:document:readonly` | 读取文档内容 | ✅ |
| `drive:drive` | 访问云盘文件 | ✅ |

#### 2.2 消息权限

| 权限 | 说明 | 必选 |
|------|------|------|
| `im:message` | 发送和接收消息 | ✅ |
| `im:message:readonly` | 读取消息 | ✅ |
| `im:chat` | 管理群组 | ✅ |
| `im:chat:readonly` | 查看群组信息 | ✅ |

#### 2.3 多维表格权限

| 权限 | 说明 | 必选 |
|------|------|------|
| `bitable:app` | 管理多维表格 | 按需 |
| `sheets:sheet` | 管理电子表格 | 按需 |

#### 2.4 日历与任务（可选）

| 权限 | 说明 |
|------|------|
| `calendar:event` | 管理日历事件 |
| `task:task` | 管理任务 |

> **关键提醒**：每次修改权限后，**必须重新发布应用**才能生效。

---

### Step 3：获取凭证（App ID & App Secret）

1. 在左侧菜单找到 **"凭证与基础信息"**
2. 你会看到两个关键值：

```
App ID:     cli_xxxxxxxxxxxxxxxxx
App Secret: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. **复制并安全保存**这两个值（后面配置要用）

> ⚠️ **安全提醒**：App Secret 相当于密码，不要分享到公开代码仓库。
> 建议在 `.env` 文件中管理，或直接配置到 `.claude/settings.json` 中（本机专用）。

---

### Step 4：发布应用

1. 左侧菜单点击 **"版本管理与发布"**
2. 点击 **"创建版本"**
3. 填写版本信息：
   - **版本号**：如 `1.0.0`
   - **更新说明**：如 "首次发布，用于 Claude Code 集成"
4. 点击 **"保存"**
5. 点击 **"申请发布"**
6. 等待企业管理员审批

> 发布后应用即刻生效。如果后续修改了权限，需要创建新版本并重新发布。

---

### Step 5：配置 Claude Code MCP Server

#### 方式一：项目级配置（推荐）

在项目根目录的 `.claude/settings.json` 中添加：

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
        "-s", "你的_App_Secret"
      ]
    }
  }
}
```

将 `cli_xxxxxxxxxxxxxxxxx` 替换为你的 **App ID**，`你的_App_Secret` 替换为 **App Secret**。

#### 方式二：全局配置（所有项目可用）

编辑 `~/.claude.json`（macOS/Linux）或 `%USERPROFILE%\.claude.json`（Windows）：

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
        "-s", "你的_App_Secret"
      ]
    }
  }
}
```

#### 方式三：通过 CLI 命令添加

```bash
claude mcp add-json --scope=user lark-mcp '{
  "command": "npx",
  "args": ["-y", "@larksuiteoapi/lark-mcp", "mcp",
    "-a", "cli_xxxxxxxxxxxxxxxxx",
    "-s", "你的_App_Secret"
  ]
}'
```

> `--scope=user` = 全局配置，`--scope=project` = 项目配置。

---

### Step 6：重启 Claude Code 并测试

1. **退出并重新启动** Claude Code

2. 在 Claude Code 中输入测试指令：

```
帮我创建一个飞书文档，标题叫"Hello MCP"，内容写"飞书已经成功打通！"
```

如果配置正确，你会看到：
- Claude 调用 `docx.v1.document.create` 工具
- 返回成功，包含文档链接
- 打开链接确认文档已创建

3. 更多测试：

```
把我当前目录的 README.md 内容发送到我的飞书
```

```
读取我刚才创建的那个文档内容
```

---

## 四、进阶配置

### 4.1 国际版 Lark

如果你使用 Lark（国际版飞书），添加 `--domain` 参数：

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
        "-s", "你的_App_Secret",
        "--domain", "https://open.larksuite.com"
      ]
    }
  }
}
```

### 4.2 启用更多工具预设

飞书 MCP Server 按功能分组为 preset，可以根据需要组合：

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
        "-s", "你的_App_Secret",
        "-t", "preset.doc.default,preset.im.default,preset.base.default"
      ]
    }
  }
}
```

#### Preset 速查表

| Preset | 包含能力 |
|--------|---------|
| `preset.doc.default` | 文档创建、读取、搜索 |
| `preset.im.default` | 消息发送、群管理 |
| `preset.base.default` | Bitable 多维表格基础操作 |
| `preset.base.batch` | Bitable 批量操作 |
| `preset.calendar.default` | 日历事件管理 |
| `preset.task.default` | 任务管理 |

### 4.3 使用 OAuth（可选）

如果需要以个人身份（而非应用身份）访问文档，增加 `--oauth` 参数：

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
        "-s", "你的_App_Secret",
        "--oauth"
      ]
    }
  }
}
```

首次使用会弹出浏览器要求飞书扫码授权。

---

## 五、实用案例：课程内容全流程

### 案例 1：自动生成课程文档

发给 Claude：

```
请帮我生成《企业智能体实战营》第一天的课程大纲，按以下结构写成一个飞书文档：
1. 上午：装龙虾 —— 智能体概念+环境搭建
2. 下午：养龙虾 —— RAG接入+Prompt调教
要求：每节包含学习目标、实操环节、交付物
```

### 案例 2：群发课程提醒

```
给"企业智能体实战营"群组发送一条消息：
"明天开营啦！请准备好笔记本电脑，提前安装好 Node.js。上课链接：xxxx"
```

### 案例 3：管理学员信息

```
在"课程管理"多维表格中新增一行学员记录：
姓名：张三
公司：XX科技
手机：13800138000
报名课程：企业智能体实战营
```

---

## 六、常见问题

### Q1：启动时提示 "unauthorized"

```
错误信息：{"code": 10001, "msg": "unauthorized"}
```

**原因**：App ID 或 App Secret 不正确，或者应用未发布。

**解决**：
1. 检查 `settings.json` 中的 App ID 和 Secret 是否与开放平台一致
2. 确认应用已经发布（"版本管理与发布" → 查看是否有已发布的版本）
3. 如果修改了权限，重新发布新版本

### Q2：调用时报 "permission denied"

```
错误信息：{"code": 20003, "msg": "permission denied"}
```

**原因**：未开启对应权限，或权限修改后未重新发布。

**解决**：
1. 回到开放平台 → 权限管理 → 确认所需权限已开启
2. 创建新版本 → 重新发布

### Q3：npx 安装卡住或超时

**原因**：网络问题，首次需要下载包。

**解决**：
```bash
# 手动安装
npm install -g @larksuiteoapi/lark-mcp

# 如果在大陆，可能需要配置 npm 镜像
npm config set registry https://registry.npmmirror.com
```

### Q4：如何验证 MCP Server 是否正常运行？

在 Claude Code 中输入：

```
/list 飞书文档
```

或者直接问：

```
你现在能调用飞书的工具吗？帮我列出可用的工具列表。
```

### Q5：App Secret 泄露了怎么办？

立即回到飞书开放平台 → 凭证与基础信息 → **重置 App Secret**。

---

## 七、融龙虾小结

打通飞书 MCP Server 的本质是 **"让 AI 拥有企业协作能力"**——

```
装龙虾（单体 Agent）
  ↓
养龙虾（喂知识 + 调行为）
  ↓
融龙虾（接入飞书/企微 → 企业级落地）← 你在这里 ✅
```

下一站：**从单课打通到多课复用，从飞书文档到完整的数字员工体系。**

---

> **参考资源**
> - 飞书开放平台：https://open.feishu.cn
> - MCP Server 包：https://www.npmjs.com/package/@larksuiteoapi/lark-mcp
> - GitHub 仓库：https://github.com/larksuite/lark-openapi-mcp
> - MCP 官方文档：https://modelcontextprotocol.io
