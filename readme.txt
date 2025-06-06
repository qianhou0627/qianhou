qianhou/
├── .vscode/                    # VSCode 编辑器配置文件夹
├── public/                     # 静态资源文件夹
│   └── favicon.ico            # 网站图标
├── src/                       # 源代码文件夹
│   ├── assets/               # 项目资源文件（图片、样式等）
│   ├── components/           # 可复用的 Vue 组件
│   ├── router/              # Vue Router 路由配置
│   │   └── index.ts         # 路由主配置文件
│   ├── stores/              # Pinia 状态管理
│   │   └── counter.ts       # 示例状态管理文件
│   ├── views/               # 页面级组件
│   │   ├── AboutView.vue    # 关于页面
│   │   └── HomeView.vue     # 首页
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口文件
├── tests/                    # 测试文件夹
│   ├── e2e/                 # 端到端测试
│   └── unit/                # 单元测试
├── .eslintrc.js             # ESLint 配置文件
├── .gitignore               # Git 忽略文件配置
├── .prettierrc.json         # Prettier 代码格式化配置
├── index.html               # HTML 模板文件
├── package.json             # 项目依赖和脚本配置
├── README.md                # 项目说明文档
├── tsconfig.json            # TypeScript 配置文件
└── vite.config.ts           # Vite 构建工具配置

src/ - 源代码目录
assets/: 存放静态资源，如图片、字体等
components/: 存放可复用的 Vue 组件
router/: 路由配置，管理页面跳转
stores/: Pinia 状态管理，管理全局状态
views/: 页面级组件，每个路由对应的页面
App.vue: 应用程序的根组件
main.ts: 应用程序的入口文件

public/ - 静态资源目录
存放不需要经过构建工具处理的静态文件

tests/ - 测试目录
e2e/: 端到端测试文件
unit/: 单元测试文件

配置文件
.eslintrc.js: ESLint 代码检查配置
.prettierrc.json: Prettier 代码格式化配置
tsconfig.json: TypeScript 配置
vite.config.ts: Vite 构建工具配置
package.json: 项目依赖和脚本配置

其他文件
index.html: 应用的 HTML 模板
README.md: 项目说明文档
.gitignore: Git 版本控制忽略文件配置



qianhou/
├── .editorconfig                 ✅ 上传 (编辑器配置)
├── .prettierrc.json             ✅ 上传 (代码格式化配置)
├── .vscode/                     ✅ 上传 (VS Code配置)
│   ├── extensions.json
│   └── settings.json
├── e2e/                         ✅ 上传 (端到端测试)
│   ├── tsconfig.json
│   └── vue.spec.ts
├── public/                      ✅ 上传 (静态资源)
│   ├── favicon.ico
│   ├── font/
│   ├── Picture/                 ⚠️ 选择性上传 (图片资源很多，可能导致仓库过大)
│   └── xiaoxin/                 ⚠️ 选择性上传 (图片资源很多，可能导致仓库过大)
├── src/                         ✅ 上传 (源代码，最重要的部分)
│   ├── App.vue
│   ├── assets/
│   ├── components/
│   ├── env.d.ts
│   ├── main.ts
│   ├── router/
│   ├── stores/
│   └── views/
├── workers-site/                ✅ 上传 (Cloudflare Workers配置)
│   └── index.js
├── auto-imports.d.ts            ✅ 上传 (自动导入类型声明)
├── components.d.ts              ✅ 上传 (组件类型声明)
├── env.d.ts                     ✅ 上传 (环境类型声明)
├── eslint.config.ts             ✅ 上传 (ESLint配置)
├── index.html                   ✅ 上传 (HTML入口)
├── package.json                 ✅ 上传 (项目依赖)
├── package-lock.json            ✅ 上传 (依赖锁定文件)
├── playwright.config.ts         ✅ 上传 (Playwright测试配置)
├── README.md                    ✅ 上传 (项目说明)
├── tsconfig.app.json            ✅ 上传 (TypeScript配置)
├── tsconfig.json                ✅ 上传 (TypeScript配置)
├── tsconfig.node.json           ✅ 上传 (TypeScript配置)
├── tsconfig.vitest.json         ✅ 上传 (Vitest配置)
├── vite.config.ts               ✅ 上传 (Vite配置)
├── vitest.config.ts             ✅ 上传 (Vitest配置)
└── wrangler.toml                ✅ 上传 (Cloudflare Wrangler配置)