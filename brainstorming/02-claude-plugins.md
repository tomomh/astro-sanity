# Claude Plugins
## Mở rộng Claude Code với Skills, Agents & MCP

---

# Agenda

1. Claude Plugins là gì?
2. Các thành phần
3. Cấu trúc Plugin
4. Cách xây dựng
5. Điểm mạnh / Điểm yếu
6. Best Practices

---

# Claude Plugins là gì?

> "Bundle tools, skills, and integrations for one-click installation"

- Extensions cho **Claude Code** & **Claude Cowork**
- Cài đặt 1-click từ marketplace
- **10,000+ plugins** có sẵn
- Mở rộng khả năng AI

---

# Ecosystem

```
┌─────────────────────────────────────┐
│         Claude Plugins              │
├─────────────┬───────────┬───────────┤
│  Anthropic  │ Verified  │  Community│
│  Official   │ Partners  │  Third-party
└─────────────┴───────────┴───────────┘
```

**Ví dụ:** GitHub (141K), Playwright (118K), Context7 (189K)

---

# Các thành phần của Plugin

| Component | Mô tả | Trigger |
|-----------|-------|---------|
| **Skills** | Instructions tự động | Context-based |
| **Commands** | Slash commands | Manual `/cmd` |
| **Agents** | Custom sub-agents | Task-based |
| **Hooks** | Event handlers | Auto on events |
| **MCP** | External APIs | Tool calls |
| **LSP** | Code intelligence | Auto |

---

# Skills vs MCP Servers

| | Skills | MCP Servers |
|---|--------|-------------|
| **Dùng khi** | Knowledge, guidelines | External data, APIs |
| **Trigger** | Claude tự nhận biết | Gọi tools cụ thể |
| **Data** | Static instructions | Dynamic real-time |
| **Ví dụ** | Code review rules | Query database |

---

# Cấu trúc thư mục

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      # Manifest ⭐
├── skills/              # SKILL.md files
│   └── review/
│       └── SKILL.md
├── commands/            # Slash commands
├── agents/              # Custom agents
├── hooks/
│   └── hooks.json       # Event handlers
└── .mcp.json            # MCP servers
```

⚠️ Directories ở ROOT, không trong `.claude-plugin/`

---

# Plugin Manifest

```json
{
  "name": "my-plugin",
  "description": "Mô tả ngắn gọn",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

- `name` → Namespace: `/my-plugin:skill`
- `version` → Semantic versioning

---

# Viết Skill (SKILL.md)

```markdown
---
name: code-review
description: Review code for security issues.
  Use when checking PRs or reviewing code.
---

When reviewing, check for:
1. SQL injection
2. XSS vulnerabilities
3. Auth issues
4. Input validation
```

⚠️ **description** = trigger mechanism!

---

# Viết Hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{
          "type": "command",
          "command": "npm run lint:fix"
        }]
      }
    ]
  }
}
```

**Events:** PreToolUse, PostToolUse, Notification, Stop

---

# Cài đặt Plugin

```bash
# Từ marketplace
claude plugin add @anthropic/github

# Từ GitHub
claude plugin add github:user/repo

# Local (dev)
claude plugin add ./my-plugin

# Test
claude --plugin-dir ./my-plugin
```

---

# Workflow phát triển

```
1. Tạo thư mục + plugin.json

2. Thêm skills/, commands/, hooks/

3. Test: claude --plugin-dir ./my-plugin

4. Iterate: /reload-plugins

5. Publish: Push GitHub hoặc submit marketplace
```

---

# Điểm mạnh

| ✅ Điểm mạnh | Chi tiết |
|-------------|----------|
| One-click install | Không config phức tạp |
| Namespaced | Tránh conflict |
| Versioned | Easy updates |
| Hot reload | `/reload-plugins` |
| Shareable | Team/community |
| Ecosystem | 10,000+ plugins |

---

# Điểm yếu

| ⚠️ Điểm yếu | Mitigation |
|-------------|------------|
| Learning curve | Bắt đầu standalone trước |
| Namespace dài | `/plugin:skill` |
| Debugging | Dùng `--plugin-dir` |
| Dependencies | MCP cần external bins |
| Docs limited | Ecosystem còn mới |

---

# Standalone vs Plugin

| Approach | Skill name | Best for |
|----------|------------|----------|
| **Standalone** `.claude/` | `/hello` | Personal, experiments |
| **Plugin** | `/plugin:hello` | Share, versioned |

**Recommendation:**
1. Bắt đầu standalone
2. Test & iterate
3. Convert plugin khi ready

---

# Best Practices

**✅ DO:**
- Description rõ ràng, specific
- Test với `--plugin-dir`
- Semantic versioning
- Include README.md

**❌ DON'T:**
- Đặt dirs trong `.claude-plugin/`
- Description vague
- Hardcode secrets
- Skip testing

---

# Submit to Marketplace

**URLs:**
- claude.ai/settings/plugins/submit
- platform.claude.com/plugins/submit

**Requirements:**
- Documentation đầy đủ
- Clear use case
- Security review
- Following guidelines

---

# Popular Plugins

| Plugin | Installs | Chức năng |
|--------|----------|-----------|
| Frontend Design | 371K | Production UI |
| Superpowers | 233K | Brainstorming |
| Context7 | 189K | Live docs |
| GitHub | 141K | Repo management |
| Playwright | 118K | Browser automation |

---

# Demo

- Tạo plugin đơn giản
- Add skill với `$ARGUMENTS`
- Test với `--plugin-dir`
- `/reload-plugins`

---

# Q&A

**Resources:**
- claude.com/plugins
- code.claude.com/docs/en/plugins
- github.com/anthropics/claude-code

