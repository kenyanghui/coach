# DeepSeek Harness（DSH）插件配置指南

> 针对你的 coach 项目（https://kenyanghui.github.io/coach/）与本地环境（macOS）整理。
> 本文件放在仓库根目录，不会被发布（只有 `content/` 会被部署）。

## 0. DSH 的插件体系：先建立心智模型

DSH 里的「插件」分四类，配置位置各不相同：

| 类别 | 是什么 | 配在哪 |
|---|---|---|
| **Skills 技能** | 可复用的任务指令包（`SKILL.md`），AI 按需加载 | 项目 `.dsh/skills` / `.agents/skills`，用户 `~/.dsh/skills` / `~/.agents/skills` |
| **MCP 服务器** | 外部工具/数据服务（图像生成、飞书、搜索…） | 项目 `.mcp.json`（或 DSH 配置层） |
| **客户端插件** | Web 界面（GUI）的 UI 组件/能力 | profile 的 `cordis.patch.yml`（`dsh.client` 行） |
| **工作区指令** | 常驻项目约定，每次会话自动注入 | 项目 `AGENTS.md` / `CLAUDE.md`，用户 `~/.dsh/AGENTS.md` |

另外还有：**能力插件**（tools/storage 等，由 bundle 内置，一般不用动）、**Agent preset**（预设模式）、**模型设置**（`~/.dsh/settings.yaml`，Web 设置页可改）。

## 1. 已为本项目配置好的部分

本次已完成：

- `CLAUDE.md`（项目根）— 品牌规则、目录结构、编辑规范、部署方式，每次会话自动加载。
- `.agents/skills/coach-site/SKILL.md` — 站点维护技能（结构速查、链接检查脚本、发布流程）。
- `.mcp.json` — mxai（MX 绘画中文站图像生成）MCP，密钥走环境变量 `MXAI_API_KEY`。

验证方法：在 `/Users/yanghui/OneDrive/website/coach/` 下新开 DSH 会话，技能目录里应出现 `coach-site`。

## 2. Skills：怎么加一个「技能」

**发现顺序**（从高到低）：项目 `<repo>/.dsh/skills` → `<repo>/.agents/skills` → 配置的 custom 目录 → `~/.dsh/skills` → `~/.agents/skills`。

**两种格式**：

```
<name>/SKILL.md          # 目录式（推荐，可带 references/、scripts/ 等资源）
<name>.md                # 扁平式
```

**SKILL.md 必需 frontmatter**：

```markdown
---
name: my-skill            # 小写 kebab-case
description: 一句话说明何时用（触发词写清楚）
---
正文：给 AI 的操作步骤、命令、规范。
```

> 注意：当前会话的技能目录来自 `~/.agents/skills`（约 90 个，如 lark-*、baoyu-*、git-website、decision-coach）。项目级技能放仓库里，只对该项目生效，跟仓库一起走。

## 3. MCP：怎么加一个服务器

项目根 `.mcp.json`：

```json
{
  "mcpServers": {
    "mxai": {
      "type": "http",
      "url": "https://mcp.mxai.cn/sse",
      "headers": { "Authorization": "Bearer ${MXAI_API_KEY}" }
    },
    "example": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "some-mcp-server"],
      "env": { "KEY": "${SOME_KEY}" }
    }
  }
}
```

- `http`/`sse` 型走 URL；`stdio` 型走本地命令。
- `${VAR}` 从环境变量取值，密钥别写死在文件里。
- 改完重启 DSH 会话生效（MCP 在会话启动时连接）。

## 4. 客户端插件（Web 界面）：怎么开/加

Web 界面的插件行在 `~/.dsh/profiles/web/cordis.patch.yml`（用户覆盖层，boot 时叠加在 `@deepseek-ai/dsh-base` + `dsh-web-app` bundle 之上）。当前该文件是空的 `[]`，即全部用默认。

**查看当前已启用的客户端插件**（浏览器 UI 插件，`dsh.client` 行）：

```bash
grep -n "dsh-client" ~/.npm-global/lib/node_modules/@deepseek-ai/dsh/node_modules/@deepseek-ai/dsh-web-app/cordis.patch.yml
```

默认已含：主题、语言、侧栏、设置、会话、工具视图、Cordis 检查器、交付物、工作流运行等。

**示例：修改某插件配置**（如给设置页加插件清单面板已有默认；想开「会话全文搜索」可加）：

```yaml
# ~/.dsh/profiles/web/cordis.patch.yml
- id: session-query-sqlite
  config:
    path: ':memory:'
    openAt: first-search   # 默认 never；改成 first-search 启用会话搜索
```

**安装第三方插件包**：

```bash
dsh plugin --profile web add <包名>          # 装进 profile 的 node_modules
# 然后在 cordis.patch.yml 里 insert 一行：
# - id: my-plugin
#   name: '<包名>'
#   config: {...}
```

改完 `cordis.patch.yml` 需重启 `dsh web` 生效。改 `apps/web` 或 client-plugin 源码则需 `pnpm run dev:web` 重建（见会话说明）。

## 5. 模型与通用设置

- 模型选择：Web 界面「设置 → Models」，或手改 `~/.dsh/settings.yaml` 的 `llm-deepseek:` 段（热重载，无需重启）。
- 默认模型在 `dsh-base` bundle：`provider: deepseek-official, model: deepseek-v4-flash`，可被设置覆盖。
- 全局指令：`~/.dsh/AGENTS.md`（所有项目生效）。

## 6. 常用命令速查

```bash
dsh web                                  # 启动 Web（本机默认 127.0.0.1:3080）
dsh --profile web --dump-config          # 打印合并后的完整配置树（不改动任何东西）
dsh --profile web --dump-default-config  # 只打印 bundle 默认
dsh plugin --profile web <pnpm args>     # 管理 profile 的插件依赖
dsh --profile headless "任务描述"         # 无界面跑一次任务
```

## 7. 推荐：本项目常用技能组合

| 场景 | 用哪个 |
|---|---|
| 改网站页面、发布 | 项目 `coach-site`（自动加载）+ 全局 `git-website` |
| 生成配图 | `baoyu-cover-image` / `baoyu-image-gen` + MCP `mxai` |
| 发公众号/小红书 | `baoyu-post-to-wechat`、`baoyu-xhs-images` |
| 飞书文档/表格/多维表格 | `lark-doc` / `lark-sheets` / `lark-base` |
| 拆书/知识蒸馏 | `book2skill`、`zhaozhou-chaishu-perspective` |
| 决策/投资分析 | `decision-coach`、`analyze-xuanlong-futures-ice-poison` |

## 8. 常见问题

- **新技能没出现在目录里**：检查 frontmatter 的 `name`（必须 kebab-case）与 `description` 是否齐全；项目根必须含 `.git` 才能被识别为项目根；改完等 watcher 或重开会话。
- **MCP 连不上**：确认环境变量已 export、重启会话；stdio 型先手动跑一遍命令看报错。
- **改 patch 不生效**：`cordis.patch.yml` 在 boot 时加载，需重启 `dsh web`；`settings.yaml` 热重载。
- **不想让某个 skill 被 AI 自动调用**：frontmatter 加 `disable-model-invocation: true`；不想要在用户命令里出现则 `user-invocable: false`。
