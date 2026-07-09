# Vue3 前端基础框架

基于 Vue 3 + Vite + Pinia + Vue Router 的前端基础框架，提供标准的项目结构、规范化的代码组织和开箱即用的开发体验，特别针对中国大陆网络环境进行了优化。

## 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.x | 前端框架（Composition API） |
| Vite | 8.1.x | 构建工具 |
| Pinia | 2.3.x | 状态管理 |
| Vue Router | 4.4.x | 路由管理 |
| Axios | 1.7.x | HTTP 请求 |
| Sass | 1.80.x | CSS 预处理器 |
| ESLint | 9.x | 代码检查 |
| Prettier | 3.x | 代码格式化 |

## 环境要求

- **Node.js** >= 18.0.0（Vite 8 推荐 Node 18+）
- **npm** >= 9.0.0
- **Windows** 操作系统

## 使用步骤

### 第一步：进入项目目录

```powershell
cd frontend
```

### 第二步：安装依赖

```powershell
npm install
```

项目已预配置国内 npm 镜像源，国内环境无需额外设置即可快速安装。如遇依赖冲突，可使用：

```powershell
npm install --legacy-peer-deps
```

### 第三步：启动开发服务器

```powershell
npm run dev
```

启动后浏览器会自动打开 `http://localhost:3000`。

### 第四步：开始开发

根据业务需求修改以下文件：

- `src/router/routes.js` - 添加新路由
- `src/stores/modules/` - 添加新状态模块
- `src/api/modules/` - 添加新 API 接口
- `src/views/` - 添加新页面
- `src/components/` - 添加新组件
- `src/composables/` - 添加组合式函数
- `src/directives/` - 添加自定义指令
- `src/layouts/` - 添加布局组件

## 针对中国大陆网络环境的优化

### 1. npm 镜像源（.npmrc）

项目自动生成 `.npmrc` 文件，将 npm registry 切换为国内镜像：

```
registry=https://registry.npmmirror.com
```

同时配置了常用二进制包的国内镜像，避免原生模块下载超时：

| 配置项 | 说明 |
|--------|------|
| `sass_binary_site` | Sass 编译二进制文件 |
| `electron_mirror` | Electron 框架 |
| `chromedriver_cdnurl` | ChromeDriver |
| `phantomjs_cdnurl` | PhantomJS |
| `puppeteer_download_host` | Puppeteer |
| `sharp_binary_host` | Sharp 图像处理 |
| `python_mirror` | Node-Gyp 依赖的 Python |
| `disturl` | Node.js 头文件 |

### 2. Vite 开发服务器代理

`vite.config.js` 中预配置了 API 代理，将 `/api` 请求转发到后端服务：

```js
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### 3. 中文字体栈

全局样式中配置了适合中文显示的字体栈：

```css
font-family: 'Helvetica Neue', Helvetica, 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
```

### 4. HTML 语言标签

`index.html` 设置 `lang="zh-CN"`，确保浏览器正确识别中文内容。

## 项目结构

```
frontend/
├── public/                          # 静态资源（不经过构建）
│   └── vite.svg                     # 网站图标
├── src/
│   ├── api/                         # API 接口层
│   │   ├── index.js                 # API 统一导出
│   │   └── modules/
│   │       └── user.js              # 用户相关 API
│   ├── assets/                      # 静态资源（经过构建）
│   │   ├── images/                  # 图片资源
│   │   └── styles/
│   │       ├── global.scss          # 全局样式
│   │       └── variables.scss       # SCSS 变量
│   ├── components/                  # 公共组件
│   │   └── BaseButton.vue           # 基础按钮组件
│   ├── composables/                 # 组合式函数
│   │   └── useAuth.js               # 认证逻辑
│   ├── directives/                  # 自定义指令
│   │   └── permission.js            # 权限指令
│   ├── layouts/                     # 布局组件
│   │   └── DefaultLayout.vue        # 默认布局
│   ├── router/                      # 路由配置
│   │   ├── index.js                 # 路由实例 + 导航守卫
│   │   └── routes.js                # 路由表
│   ├── stores/                      # Pinia 状态管理
│   │   ├── index.js                 # Pinia 实例
│   │   └── modules/
│   │       └── user.js              # 用户状态
│   ├── utils/                       # 工具函数
│   │   ├── request.js               # Axios 封装（拦截器）
│   │   └── storage.js               # LocalStorage 封装
│   ├── views/                       # 页面组件
│   │   ├── HomeView.vue             # 首页
│   │   └── LoginView.vue            # 登录页
│   ├── App.vue                      # 根组件
│   └── main.js                      # 入口文件
├── .env                             # 通用环境变量
├── .env.development                 # 开发环境变量
├── .env.production                  # 生产环境变量
├── .gitignore                       # Git 忽略规则
├── .npmrc                           # npm 镜像源配置
├── .prettierrc                      # Prettier 配置
├── eslint.config.js                 # ESLint 配置（Flat Config）
├── index.html                       # HTML 入口
├── jsconfig.json                    # JS 路径别名配置
├── package.json                     # 项目依赖
└── vite.config.js                   # Vite 构建配置
```

## 常用命令

所有命令需在 `frontend` 目录下执行：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（端口 3000，自动打开浏览器） |
| `npm run build` | 构建生产版本，输出到 `dist/` 目录 |
| `npm run preview` | 本地预览生产构建结果 |
| `npm run lint` | 运行 ESLint 检查并自动修复 |
| `npm run format` | 运行 Prettier 格式化 `src/` 目录 |

## 核心功能说明

### 路由与导航守卫

- 基于 `createWebHistory` 的 HTML5 History 模式
- 全局前置守卫：未登录用户访问需要认证的页面时自动跳转到登录页
- 路由懒加载：所有页面组件使用动态 `import()` 按需加载
- 页面切换过渡动画（fade 效果）

### 状态管理

- 使用 Pinia Composition API 风格
- 用户状态模块（`useUserStore`）包含 token 管理和用户信息
- Token 自动持久化到 localStorage

### HTTP 请求封装

- 统一的 Axios 实例，基础超时 10 秒
- 请求拦截器：自动附加 Bearer Token
- 响应拦截器：统一错误处理，401 自动清除登录状态并跳转

### SCSS 全局变量

在 `variables.scss` 中定义了项目级颜色和文本变量，通过 Vite 配置全局注入，组件中可直接使用 `$primary-color` 等变量而无需手动 import。

### 自定义指令

`v-permission` 指令用于按钮级权限控制，传入权限标识或数组，无权限时自动移除元素。

```vue
<button v-permission="'user:create'">新增用户</button>
```

## 登录功能

项目包含完整的登录流程示例：

- 默认已集成 Mock 登录，方便前端独立开发
- **测试账号**：`admin`
- **测试密码**：`123456`
- 使用其他账号密码时会尝试调用真实后端 API `/api/auth/login`
- 登录成功后 token 会持久化到 localStorage，并自动跳转原目标页或首页

## 环境变量

| 文件 | 变量 | 说明 |
|------|------|------|
| `.env` | `VITE_APP_TITLE` | 应用标题 |
| `.env.development` | `VITE_API_BASE_URL` | 开发环境 API 地址（默认 `/api`） |
| `.env.production` | `VITE_API_BASE_URL` | 生产环境 API 地址 |

自定义环境变量必须以 `VITE_` 前缀开头才能在代码中通过 `import.meta.env` 访问。

## 开发规范

- 使用 Vue 3 Composition API + `<script setup>` 语法
- 组件名使用 PascalCase
- 组合式函数使用 `useXxx` 命名
- 状态模块使用 `useXxxStore` 命名
- 路径别名统一使用 `@/xxx`
