# Vue3 + Go 全栈基础框架

基于 Vue 3 + Vite + Pinia + Vue Router 的前端基础框架，配套 Go 1.24 标准库实现的认证后端。项目提供标准的目录结构、规范化的代码组织、登录/注册完整示例，并针对中国大陆网络环境进行了优化。

## 技术栈

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.x | 前端框架（Composition API / `<script setup>`） |
| Vite | 8.1.x | 构建工具 |
| Pinia | 2.3.x | 状态管理 |
| Vue Router | 4.4.x | 路由管理 |
| Axios | 1.7.x | HTTP 请求 |
| Sass | 1.80.x | CSS 预处理器 |
| ESLint | 9.x | 代码检查（Flat Config） |
| Prettier | 3.x | 代码格式化 |

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| Go | 1.24.x | 后端服务 |
| 标准库 `net/http` | - | HTTP 路由与服务 |
| 标准库 `crypto/rsa` | - | RSA 密码加密 |
| 标准库 `crypto/hmac` | - | JWT 签名与校验 |
| 本地 JSON 文件存储 | - | 用户、验证码数据持久化 |

## 环境要求

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **Go** >= 1.24（当前使用 `go1.24.13`）
- **Windows** 操作系统

## 快速开始

### 1. 启动后端

```powershell
cd backend
go run .
```

后端默认监听 `http://localhost:8080`。首次启动会自动生成 RSA 密钥对，用于登录/注册时的密码加密。

可通过环境变量调整：

| 变量 | 默认值 | 说明 |
|------|--------|------|
| `PORT` | `8080` | 服务端口 |
| `APP_MODE` | `development` | 运行模式，`development` 会在验证码接口返回测试码 |
| `JWT_SECRET` | `change-me-in-production` | JWT 签名密钥 |
| `CORS_ORIGIN` | `http://localhost:3000` | 允许的前端跨域地址 |
| `DB_PATH` | `data/app.json` | 本地数据文件路径 |

### 2. 启动前端

```powershell
cd frontend
npm install
npm run dev
```

浏览器会自动打开 `http://localhost:3000`。

前端已通过 Vite 代理将 `/api` 请求转发到 `http://localhost:8080`，开发时无需处理跨域。

## 项目结构

```
.
├── backend/                         # Go 后端
│   ├── internal/
│   │   ├── config/                  # 配置加载
│   │   ├── handler/                 # HTTP 处理器
│   │   ├── middleware/              # 中间件（CORS、认证、错误恢复）
│   │   ├── model/                   # 数据模型
│   │   ├── router/                  # 路由注册
│   │   └── service/                 # 业务逻辑（认证、JWT、RSA、验证码、数据持久化）
│   ├── pkg/response/                # 统一响应封装
│   ├── data/                        # 本地数据文件（运行时自动生成）
│   ├── go.mod
│   └── main.go
├── frontend/                        # Vue3 前端
│   ├── public/
│   ├── src/
│   │   ├── api/                     # API 接口层
│   │   ├── assets/styles/           # SCSS 变量与全局样式
│   │   ├── components/              # 公共组件
│   │   ├── composables/             # 组合式函数
│   │   ├── directives/              # 自定义指令
│   │   ├── layouts/                 # 布局组件
│   │   ├── router/                  # 路由配置
│   │   ├── stores/                  # Pinia 状态管理
│   │   ├── utils/                   # 工具函数（请求、安全、验证、加密）
│   │   ├── views/                   # 页面组件
│   │   ├── App.vue
│   │   └── main.js
│   ├── .env / .env.development / .env.production
│   ├── .npmrc                       # 国内 npm 镜像
│   ├── eslint.config.js
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 登录与注册设计

### 登录页

- 顶部 Tab 切换：**密码登录 / 手机登录 / 邮箱登录**
- 密码登录：用户名 + 密码
- 手机/邮箱登录：账号输入框 + 验证码输入框 + 获取验证码按钮
- 密码框支持明文/密文切换
- 失焦实时校验，错误行红色提示
- 验证码按钮 60s 倒计时锁定
- 表单校验不通过时登录按钮禁用
- 底部跳转注册页

### 注册页

- 用户名、手机号、邮箱三项必填
- 密码、确认密码双输入框
- 实时校验格式、密码一致性
- 注册成功后自动跳转登录页

### 路由守卫

- 未登录访问需要认证的页面 → 重定向到登录页，并携带安全的回跳地址
- 已登录用户访问 `/login`、`/register` → 直接跳转首页

## API 契约

| 方法 | 路径 | 说明 | 请求体 | 响应 data |
|------|------|------|--------|-----------|
| GET | `/auth/public-key` | 获取 RSA 公钥 | - | `{ publicKey }` |
| POST | `/auth/register` | 用户注册 | `{ username, phone, email, password }` | `{ token, userInfo }` |
| POST | `/auth/login` | 用户登录 | `{ loginType, username?, account?, password?, code? }` | `{ token, userInfo }` |
| POST | `/auth/sms/code` | 发送手机验证码 | `{ phone }` | `{ message, code }`（开发模式返回 code） |
| POST | `/auth/email/code` | 发送邮箱验证码 | `{ email }` | `{ message, code }`（开发模式返回 code） |
| GET | `/auth/userinfo` | 获取当前用户信息 | - | `{ id, username, phone, email }` |
| POST | `/auth/logout` | 退出登录 | - | `{ message }` |

统一响应格式：

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

`code !== 0` 时表示业务错误，`message` 为错误提示。

## 测试账号

前端开发环境内置 Mock 登录，方便独立调试：

- **用户名**：`admin`
- **密码**：`123456`

手机/邮箱登录在开发模式下，验证码固定为 `123456`。

如需使用真实后端，请先通过注册接口创建账号，再使用对应方式登录。

## 数据存储

后端使用本地 JSON 文件作为轻量级持久化存储：

- 数据文件默认位于 `backend/data/app.json`
- 启动时自动加载，退出时自动保存
- 用户表、验证码表、发送限流表均保存在同一文件
- 所有写操作受读写锁保护，避免并发冲突
- 数据文件可迁移、可备份，服务重启后用户信息不会丢失

可通过环境变量 `DB_PATH` 修改存储路径：

```powershell
$env:DB_PATH="C:\vue3-framework\data.json"
go run .
```

> 提示：当前实现基于 Go 标准库，零第三方依赖。若后续需要更强的事务能力，可替换为 SQLite（需先 `go get modernc.org/sqlite`）。

## 安全机制

### 开放重定向防护

登录成功后的跳转地址会经过 `sanitizeRedirect` 校验：

- 仅允许相对路径（以 `/` 开头）
- 禁止 `//`、`javascript:`、`data:` 等危险协议
- 外部 URL 仅允许 `localhost`、`127.0.0.1`、`.local` 域名

### 密码传输加密

- 登录/注册时，前端通过 `Web Crypto API` 使用后端 RSA 公钥加密密码
- 后端使用私钥解密后再进行哈希存储
- 私钥仅存于后端内存，每次重启重新生成（生产环境建议从 KMS/环境变量加载）

### 验证码限流

- 同一手机号/邮箱 60 秒内只能发送一次验证码
- 验证码 5 分钟内有效，验证成功后立即失效

### 错误信息脱敏

- 生产环境下，前端统一展示通用错误提示，不暴露服务器内部信息
- 后端 `APP_MODE=production` 时，异常恢复中间件也仅返回“服务器内部错误”

### 原型污染防护

`storage.js` 封装了 LocalStorage 写入，自动过滤 `__proto__`、`constructor`、`prototype` 等危险属性。

### Mock 登录环境隔离

Mock 登录与开发模式验证码仅在 `import.meta.env.MODE === 'development'` / `APP_MODE=development` 时生效，生产环境自动关闭。

## 常用命令

### 前端

```powershell
cd frontend
npm run dev       # 启动开发服务器
npm run build     # 生产构建
npm run preview   # 预览生产构建
npm run lint      # ESLint 检查并自动修复
npm run format    # Prettier 格式化
```

### 后端

```powershell
cd backend
go run .              # 启动服务
go build -o app.exe   # 编译为可执行文件
go test ./...         # 运行测试
```

## 中国大陆网络适配

- `.npmrc` 已配置 `registry=https://registry.npmmirror.com` 及常见二进制包镜像
- 后端使用 Go 标准库实现，无需下载第三方依赖，避免 Go Module 代理不稳定导致的构建失败

## 开发规范

- 使用 Vue 3 Composition API + `<script setup>` 语法
- 组件名使用 PascalCase
- 组合式函数使用 `useXxx` 命名
- 状态模块使用 `useXxxStore` 命名
- 路径别名统一使用 `@/xxx`
- 后端采用标准 Go 项目分层：`handler -> service -> model`
