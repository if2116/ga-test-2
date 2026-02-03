# test only

## 技术栈

- **框架**: Next.js 16+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **国际化**: next-intl
- **动画**: Framer Motion
- **图表**: Recharts
- **图标**: Lucide React

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

## 项目结构

```
├── app/
│   └── [locale]/          # 国际化路由
│       ├── layout.tsx     # 布局
│       ├── page.tsx       # 首页
│       └── arena/         # Arena页面
├── components/
│   ├── layout/           # 布局组件
│   └── ui/               # UI组件
├── lib/
│   ├── data.ts           # 核心数据
│   ├── types.ts          # 类型定义
│   └── utils.ts          # 工具函数
├── locales/
│   ├── en.json           # 英文翻译
│   └── zh.json           # 中文翻译
├── Content/              # 内容文件
└── PRD/                  # 设计文档
```

## 特性

- ✅ 双语支持（中英）
- ✅ 响应式设计
- ✅ 现代化UI
- ✅ 可访问性
- ✅ SEO友好
- ✅ 类型安全
