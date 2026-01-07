# PostgreSQL MCP Server (Read-Write)

这是一个支持 PostgreSQL 数据库增删改查和 DDL 操作的 Model Context Protocol (MCP) 服务器。

[![npm version](https://img.shields.io/npm/v/mcp-server-postgresql-rw.svg)](https://www.npmjs.com/package/mcp-server-postgresql-rw)
[![npm downloads](https://img.shields.io/npm/dm/mcp-server-postgresql-rw.svg)](https://www.npmjs.com/package/mcp-server-postgresql-rw)

📦 **npm 包**: [https://www.npmjs.com/package/mcp-server-postgresql-rw](https://www.npmjs.com/package/mcp-server-postgresql-rw)  
🐙 **GitHub**: [https://github.com/yanxxcloud/mcp-server-postgresql-rw](https://github.com/yanxxcloud/mcp-server-postgresql-rw)

## 功能特性

- ✅ **查询（SELECT）**: 执行 SELECT 查询语句，返回查询结果
- ✅ **插入（INSERT）**: 向表中插入新数据
- ✅ **更新（UPDATE）**: 更新表中的数据
- ✅ **删除（DELETE）**: 从表中删除数据
- ✅ **DDL 操作**: 执行数据定义语言操作（CREATE、ALTER、DROP 等）
- ✅ **通用执行**: 执行任意 SQL 语句

## 快速开始

### 方式 1: 通过 npm 安装（⭐ 推荐）

最简单的方式，直接从 npm 安装：

```bash
npm install -g mcp-server-postgresql-rw
```

然后在 `mcp.json` 中配置：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "mcp-server-postgresql-rw",
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

**或者使用 npx（无需全局安装，推荐）：**

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": ["-y", "mcp-server-postgresql-rw"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

### 方式 2: 从源码安装

如果你想从源码安装或进行开发：

```bash
# 克隆项目
git clone https://github.com/yanxxcloud/mcp-server-postgresql-rw.git
cd mcp-server-postgresql-rw

# 安装依赖
npm install

# 构建项目（可选，如果使用 npx tsx 方式则不需要）
npm run build
```

然后在 `mcp.json` 中配置（推荐使用 npx tsx 方式，无需构建）：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/path/to/mcp-server-postgresql-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

### 3. 重启 Cursor

配置完成后，**重启 Cursor** 即可使用！

> 💡 **提示**: 
> - ⭐ **推荐使用 npm 安装**：最简单快捷，包已构建好，开箱即用
> - 使用 `npx` 方式无需全局安装，每次自动下载最新版本
> - 从源码安装适合需要修改代码或参与开发的场景

---

## 安装

### 方式 1: 通过 npm 安装（⭐ 推荐）

最简单的方式，直接从 npm 安装：

```bash
npm install -g mcp-server-postgresql-rw
```

或使用 npx（无需全局安装）：

```bash
npx -y mcp-server-postgresql-rw
```

### 方式 2: 从源码安装

如果你想从源码安装或进行开发：

```bash
# 克隆项目
git clone https://github.com/yanxxcloud/mcp-server-postgresql-rw.git
cd mcp-server-postgresql-rw

# 安装依赖
npm install

# 构建项目（如果使用编译后的文件）
npm run build
```

## 配置

通过环境变量配置数据库连接：

### 方式 1: 使用连接字符串

```bash
export POSTGRES_CONNECTION_STRING="postgresql://user:password@localhost:5432/database"
```

### 方式 2: 使用单独的参数

```bash
export POSTGRES_HOST="localhost"
export POSTGRES_PORT="5432"
export POSTGRES_DATABASE="postgres"
export POSTGRES_USER="postgres"
export POSTGRES_PASSWORD="password"
export POSTGRES_SSL="false"
```

## 使用方法

### 作为 MCP 服务器运行

```bash
npm start
```

### 开发模式

```bash
npm run dev
```

## 可用工具

### 1. query

执行 SELECT 查询语句，返回查询结果。

**参数:**
- `sql` (string, 必需): SELECT SQL 查询语句

**示例:**
```json
{
  "sql": "SELECT * FROM users WHERE age > 18"
}
```

### 2. insert

执行 INSERT 语句，向表中插入新数据。

**参数:**
- `sql` (string, 必需): INSERT SQL 语句

**示例:**
```json
{
  "sql": "INSERT INTO users (name, email) VALUES ('John', 'john@example.com')"
}
```

### 3. update

执行 UPDATE 语句，更新表中的数据。

**参数:**
- `sql` (string, 必需): UPDATE SQL 语句

**示例:**
```json
{
  "sql": "UPDATE users SET email = 'newemail@example.com' WHERE id = 1"
}
```

### 4. delete

执行 DELETE 语句，从表中删除数据。

**参数:**
- `sql` (string, 必需): DELETE SQL 语句

**示例:**
```json
{
  "sql": "DELETE FROM users WHERE id = 1"
}
```

### 5. execute_ddl

执行 DDL（数据定义语言）语句，包括 CREATE、ALTER、DROP 等操作。

**参数:**
- `sql` (string, 必需): DDL SQL 语句

**示例:**
```json
{
  "sql": "CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100), price DECIMAL(10,2))"
}
```

### 6. execute

执行任意 SQL 语句（查询、DML 或 DDL）。这是一个通用工具。

**参数:**
- `sql` (string, 必需): SQL 语句

**示例:**
```json
{
  "sql": "SELECT COUNT(*) FROM users"
}
```

## 在 Cursor 中配置 MCP

### 步骤 1: 找到 mcp.json 配置文件

mcp.json 文件通常位于以下位置：

- **macOS/Linux**: `~/.config/cursor/mcp.json` 或 `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
- **Windows**: `%APPDATA%\Cursor\User\globalStorage\mcp.json`

如果文件不存在，请创建它。

### 步骤 2: 配置 mcp.json

打开或创建 `mcp.json` 文件，添加以下配置。有三种运行方式：

---

## 方式 A: 使用 npm 安装（⭐ 最简单，推荐）

直接从 npm 安装，无需构建，开箱即用。

#### 配置方式 A1: 全局安装后使用

```bash
npm install -g mcp-server-postgresql-rw
```

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "mcp-server-postgresql-rw",
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://用户名:密码@主机:端口/数据库名"
      }
    }
  }
}
```

#### 配置方式 A2: 使用 npx（无需全局安装，推荐）

无需全局安装，每次自动使用最新版本：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": ["-y", "mcp-server-postgresql-rw"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://用户名:密码@主机:端口/数据库名"
      }
    }
  }
}
```

**实际示例：**
```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": ["-y", "mcp-server-postgresql-rw"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:mypassword@localhost:5432/mydb"
      }
    }
  }
}
```

---

## 方式 B: 使用 npx tsx 直接运行（从源码，无需构建）

这种方式可以直接运行 TypeScript 源文件，无需先执行 `npm run build`。适合从源码安装的场景。

#### 配置方式 B1: 使用连接字符串

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/Users/yanxx/tools/mcp/postgresql-server-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://用户名:密码@主机:端口/数据库名"
      }
    }
  }
}
```

**实际示例：**
```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/Users/yanxx/tools/mcp/postgresql-server-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:mypassword@localhost:5432/mydb"
      }
    }
  }
}
```

#### 配置方式 B2: 使用单独参数

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/Users/yanxx/tools/mcp/postgresql-server-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_HOST": "localhost",
        "POSTGRES_PORT": "5432",
        "POSTGRES_DATABASE": "postgres",
        "POSTGRES_USER": "postgres",
        "POSTGRES_PASSWORD": "your_password",
        "POSTGRES_SSL": "false"
      }
    }
  }
}
```

---

## 方式 C: 使用编译后的文件（从源码，需要先构建）

如果你从源码安装并想使用编译后的 JavaScript 文件，需要先构建：

```bash
cd /path/to/mcp-server-postgresql-rw
npm install
npm run build
```

#### 配置方式 C1: 使用连接字符串

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "node",
      "args": ["/path/to/mcp-server-postgresql-rw/dist/index.js"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://用户名:密码@主机:端口/数据库名"
      }
    }
  }
}
```

**实际示例：**
```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "node",
      "args": ["/path/to/mcp-server-postgresql-rw/dist/index.js"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:mypassword@localhost:5432/mydb"
      }
    }
  }
}
```

#### 配置方式 C2: 使用单独参数

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "node",
      "args": ["/path/to/mcp-server-postgresql-rw/dist/index.js"],
      "env": {
        "POSTGRES_HOST": "localhost",
        "POSTGRES_PORT": "5432",
        "POSTGRES_DATABASE": "postgres",
        "POSTGRES_USER": "postgres",
        "POSTGRES_PASSWORD": "your_password",
        "POSTGRES_SSL": "false"
      }
    }
  }
}
```

---

### 三种方式对比

| 特性 | 方式 A (npm/npx) | 方式 B (npx tsx) | 方式 C (编译后) |
|------|------------------|------------------|-----------------|
| 安装方式 | `npm install -g` 或 `npx` | 从源码安装 | 从源码安装 |
| 需要构建 | ❌ 不需要 | ❌ 不需要 | ✅ 需要 `npm run build` |
| 启动速度 | ⚡ 最快 | 稍慢（首次需要下载 tsx） | 快 |
| 更新方式 | `npm update -g` 或自动 | 需要 git pull | 需要 git pull + build |
| 推荐场景 | ⭐ 生产环境、日常使用 | 开发环境、频繁修改 | 生产环境、稳定版本 |

**推荐**: 
- ⭐ **日常使用推荐方式 A (npm/npx)**：最简单快捷，自动更新
- 开发时使用**方式 B (npx tsx)**：修改代码后无需重新构建

---

### 步骤 4: 使用 SSL 连接（可选）

如果数据库需要 SSL 连接，使用 npx tsx 方式：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/Users/yanxx/tools/mcp/postgresql-server-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@host:5432/db?sslmode=require"
      }
    }
  }
}
```

或使用单独参数：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "/Users/yanxx/tools/mcp/postgresql-server-rw/src/index.ts"
      ],
      "env": {
        "POSTGRES_HOST": "your-host.com",
        "POSTGRES_PORT": "5432",
        "POSTGRES_DATABASE": "mydb",
        "POSTGRES_USER": "myuser",
        "POSTGRES_PASSWORD": "mypassword",
        "POSTGRES_SSL": "true"
      }
    }
  }
}
```

### 步骤 5: 如果已有其他 MCP 服务器配置

如果你的 `mcp.json` 中已经有其他服务器配置，只需在 `mcpServers` 对象中添加新的配置：

```json
{
  "mcpServers": {
    "existing-server": {
      "command": "node",
      "args": ["/path/to/existing/server.js"]
    },
    "postgresql-rw": {
      "command": "node",
      "args": ["/Users/yanxx/tools/mcp/postgresql-server-rw/dist/index.js"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

### 步骤 6: 重启 Cursor

配置完成后，**重启 Cursor** 以使配置生效。

### 步骤 7: 验证配置

重启后，在 Cursor 中：

1. 打开命令面板（`Cmd+Shift+P` 或 `Ctrl+Shift+P`）
2. 输入 "MCP" 查看可用的 MCP 相关命令
3. 尝试使用 AI 助手，询问它是否可以访问 PostgreSQL 工具

你也可以直接询问 AI：
- "列出可用的 PostgreSQL 工具"
- "查询数据库中的表"
- "执行一个简单的 SELECT 查询"

### 故障排除

#### 问题 1: 找不到 node 命令

如果系统找不到 `node` 命令，可以使用完整路径：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "/usr/local/bin/node",
      "args": ["/Users/yanxx/tools/mcp/postgresql-server-rw/dist/index.js"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

查找 node 路径：
```bash
which node
```

#### 问题 2: 连接失败

检查：
- 数据库服务是否运行
- 连接字符串或参数是否正确
- 防火墙是否允许连接
- 数据库用户是否有足够权限

#### 问题 3: 权限错误

如果使用编译后的文件，确保 `dist/index.js` 文件有执行权限：
```bash
chmod +x /path/to/mcp-server-postgresql-rw/dist/index.js
```

如果使用 npm 安装，通常不会有权限问题。

#### 问题 4: 查看日志

如果遇到问题，可以查看 Cursor 的日志文件来诊断问题。

## 发布到 npm

✅ **已发布**: 此包已发布到 npm，可以直接使用 `npm install -g mcp-server-postgresql-rw` 安装。

📦 **npm 包地址**: [https://www.npmjs.com/package/mcp-server-postgresql-rw](https://www.npmjs.com/package/mcp-server-postgresql-rw)

如果你想更新版本或重新发布，请按照以下步骤操作：

### 1. 准备发布

#### 1.1 更新 package.json

确保 `package.json` 中的信息正确：
- `name`: 包名（必须是唯一的，检查 npm 上是否已存在）
- `version`: 版本号
- `author`: 作者信息
- `repository`: Git 仓库地址（如果有）
- `description`: 包描述

#### 1.2 创建 npm 账号

如果还没有 npm 账号，请访问 [npmjs.com](https://www.npmjs.com/) 注册。

#### 1.3 登录 npm

```bash
npm login
```

输入你的用户名、密码和邮箱。

### 2. 检查包名是否可用

```bash
npm search mcp-server-postgresql-rw
```

如果包名已被占用，需要在 `package.json` 中修改 `name` 字段。

### 3. 构建项目

```bash
npm run build
```

### 4. 测试本地安装

在发布前，可以先测试本地安装：

```bash
npm pack
```

这会生成一个 `.tgz` 文件，你可以本地安装测试：

```bash
npm install -g ./mcp-server-postgresql-rw-1.0.0.tgz
```

### 5. 发布到 npm

#### 5.1 发布公开包（推荐）

```bash
npm publish --access public
```

#### 5.2 发布私有包（需要付费账号）

```bash
npm publish
```

### 6. 验证发布

发布成功后，可以在 npm 上搜索你的包：

```bash
npm search mcp-server-postgresql-rw
```

或者访问：`https://www.npmjs.com/package/mcp-server-postgresql-rw`

### 7. 更新版本

发布新版本时：

```bash
# 更新版本号（会自动更新 package.json）
npm version patch  # 1.0.0 -> 1.0.1 (补丁版本)
npm version minor  # 1.0.0 -> 1.1.0 (小版本)
npm version major  # 1.0.0 -> 2.0.0 (大版本)

# 然后发布
npm publish --access public
```

### 8. 撤销发布（如果需要）

如果发布有误，可以在 72 小时内撤销：

```bash
npm unpublish mcp-server-postgresql-rw@1.0.0
```

⚠️ **注意**: 撤销后 24 小时内不能发布相同版本。

### 发布检查清单

- [ ] 更新 `package.json` 中的版本号
- [ ] 更新 `README.md` 中的使用说明
- [ ] 确保代码已构建（`npm run build`）
- [ ] 测试本地安装（`npm pack` 和 `npm install -g`）
- [ ] 确保 `.npmignore` 配置正确
- [ ] 登录 npm (`npm login`)
- [ ] 检查包名是否可用
- [ ] 发布 (`npm publish --access public`)

### 发布后的使用方式

发布后，其他人可以通过以下方式使用：

#### 全局安装

```bash
npm install -g mcp-server-postgresql-rw
```

然后在 `mcp.json` 中配置：

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "mcp-server-postgresql-rw",
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

#### 使用 npx（无需全局安装）

```json
{
  "mcpServers": {
    "postgresql-rw": {
      "command": "npx",
      "args": ["-y", "mcp-server-postgresql-rw"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://user:password@localhost:5432/database"
      }
    }
  }
}
```

## 安全注意事项

⚠️ **警告**: 此服务器允许执行任意 SQL 语句，包括 DDL 和 DML 操作。请确保：

1. 只连接到受信任的数据库
2. 使用具有适当权限的数据库用户
3. 在生产环境中谨慎使用
4. 考虑添加 SQL 注入防护机制

## 许可证

MIT

