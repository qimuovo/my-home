# 更新日志

## 2026-01-15 - 最新更新

### ✨ 新增组件
- ✅ **Footer 页脚** - 添加底部版权信息
  - 高度 46px（与参考项目相同）
  - 显示版权信息和备案号
  - 支持年份范围显示
  - 响应式设计，移动端自适应

### 🎨 界面优化  
- ✅ **联系方式精简** - 只显示图标，参考原项目风格
  - 圆形图标按钮设计（40px）
  - 鼠标悬停显示提示文字
  - 悬停时整体背景模糊效果
  - 图标放大和发光效果

---

## 2026-01-15 - 功能优化

### ✨ 新增功能
- ✅ **GitHub 热力图** - 添加 GitHub 贡献活跃度展示
  - 使用第三方服务 `ghchart.rshah.org` 显示贡献图
  - 包含 GitHub 主页和仓库链接
  - 位于右侧面板下方

### 🎨 界面优化
- ✅ **联系方式整合** - 将社交链接合并到个人信息卡片中
  - 3列网格布局
  - 简洁的图标+文字展示
  - 悬停效果优化

- ✅ **网站链接优化** - 缩小卡片尺寸，使用图标文件
  - 卡片尺寸从 250px 缩小到 180px
  - 表情图标替换为 `/images/icon/` 下的 PNG 图标
  - 图标尺寸：48px（桌面）/ 40px（移动端）
  - 保持霓虹发光和悬停动画效果

- ✅ **随机背景** - 每次加载随机显示一张背景图
  - 从 10 张背景图中随机选择
  - 保持粒子效果和渐变遮罩

### 📐 布局调整
- 左侧：个人信息卡片（包含联系方式）
- 右侧：
  - 上方：一言语录
  - 下方：GitHub 热力图
- 底部：我的站点（缩小的卡片网格）

### 🔧 技术细节
- 移除独立的 `SocialLinks` 组件
- 新增 `GithubHeatmap` 组件
- 更新配置文件：
  - `site-links.json` - 图标路径改为图片文件
  - `social-links.json` - 继续使用但集成在 ProfileCard 中
- 优化响应式布局
  - 移动端：网站链接 2 列布局
  - 保持所有动画效果和交互体验

### 📝 配置说明
修改 `src/config/site-links.json` 中的图标：
```json
{
  "icon": "/images/icon/github.png"  // 使用图标文件路径
}
```

修改 GitHub 用户名：
在 `App.vue` 中修改：
```vue
<GithubHeatmap username="你的用户名" />
```

## 可用图标
位于 `/public/images/icon/`：
- github.png
- gitee.png
- bilibili.png
- music.png
- twitter.png
- telegram.png
- qq.png
- email.png
- cat.png
- logo.png

