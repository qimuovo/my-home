# 个人主页

一个具有赛博朋克与极简主义融合风格的个人主页项目。

## ✨ 特性

- 🎨 独特的赛博朋克美学设计
- 🎵 集成音乐播放器（搜索+播放）
- 💬 一言语录展示（点击刷新）
- ⏰ 动态时钟和智能问候语
- 👤 个人信息卡片（头像+简介+联系方式）
- 📊 GitHub 贡献热力图
- 🔗 网站链接展示（图标化）
- 📱 完全响应式设计
- 🎭 流畅的动画效果
- 🌈 霓虹发光效果
- 🎲 随机背景图
- 📄 版权页脚

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

在项目根目录创建 `.env` 文件：

```env
# 必填
VITE_MUSIC_SERVE=http://47.113.117.43:3000
VITE_SITE_TITLE=个人主页
VITE_SITE_DESC=Welcome to my personal space
VITE_HITOKOTO_API=https://v1.hitokoto.cn/

# 选填（Footer 相关）
VITE_SITE_START=2024
VITE_SITE_AUTHOR=Your Name
VITE_SITE_URL=https://yourdomain.com
VITE_SITE_ICP=
```

### 配置个人信息

编辑以下 JSON 配置文件：

- `src/config/profile.json` - 个人信息
- `src/config/social-links.json` - 社交媒体链接
- `src/config/site-links.json` - 网站链接

### 字体配置

1. 从以下地址下载字体：
   - [Orbitron](https://fonts.google.com/specimen/Orbitron) - 用于标题
   - [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - 用于正文

2. 将字体文件放置到 `public/font/` 目录
   - Orbitron-Regular.ttf
   - Orbitron-Bold.ttf
   - JetBrainsMono-Regular.ttf

或者使用已有的字体文件（项目中的 UnidreamLED.ttf 或 Pacifico-Regular.ttf）

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 📁 项目结构

```
my-home/
├── public/              # 静态资源
│   ├── font/           # 字体文件
│   └── images/         # 图片资源
├── src/
│   ├── api/            # API 接口
│   ├── components/     # 组件
│   │   ├── Background.vue      # 动态背景+粒子
│   │   ├── Clock.vue           # 时钟+问候
│   │   ├── Footer.vue          # 页脚
│   │   ├── GithubHeatmap.vue   # GitHub热力图
│   │   ├── Hitokoto.vue        # 一言
│   │   ├── Loading.vue         # 加载动画
│   │   ├── MusicButton.vue     # 音乐按钮
│   │   ├── MusicPlayer.vue     # 音乐播放器
│   │   ├── ProfileCard.vue     # 个人卡片+联系方式
│   │   └── SiteLinks.vue       # 网站链接
│   ├── config/         # 配置文件
│   │   ├── profile.json
│   │   ├── site-links.json
│   │   └── social-links.json
│   ├── stores/         # Pinia 状态管理
│   │   ├── app.ts
│   │   └── music.ts
│   ├── styles/         # 全局样式
│   │   ├── global.scss
│   │   └── variables.scss
│   ├── utils/          # 工具函数
│   │   ├── request.ts
│   │   └── time.ts
│   ├── App.vue         # 根组件
│   └── main.ts         # 入口文件
├── .env.example        # 环境变量示例
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 设计理念

本项目采用**赛博朋克与极简主义融合**的设计风格：

- **色彩方案**：霓虹蓝、霓虹粉、霓虹紫等鲜明的赛博朋克配色
- **视觉效果**：玻璃态背景、霓虹发光、粒子动画
- **字体选择**：Orbitron（科技感标题）+ JetBrains Mono（编程字体）
- **交互体验**：流畅的过渡动画、悬停效果、响应式反馈

## 🛠️ 技术栈

- **框架**: Vue 3 (Composition API)
- **状态管理**: Pinia
- **路由**: Vue Router
- **样式**: SCSS
- **动画**: GSAP
- **UI 组件**: Element Plus
- **构建工具**: Vite
- **类型支持**: TypeScript

## 📝 配置说明

### 个人信息配置

编辑 `src/config/profile.json`：

```json
{
  "name": "你的名字",
  "title": "你的职位",
  "avatar": "/images/icon/logo.png",
  "bio": "个人简介",
  "location": "所在地",
  "email": "your@email.com",
  "description": [
    "标签1",
    "标签2"
  ]
}
```

### 社交链接配置

编辑 `src/config/social-links.json`

### 网站链接配置

编辑 `src/config/site-links.json`

## 📄 许可证

MIT License

## 🙏 致谢

- 设计灵感来自赛博朋克美学
- 一言 API: [hitokoto.cn](https://hitokoto.cn/)
- 音乐 API: 网易云音乐 NodeJS API
