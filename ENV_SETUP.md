# 环境变量配置说明

## 创建 .env 文件

在项目根目录（my-home 文件夹）下创建 `.env` 文件，内容如下：

```env
# 音乐服务器地址
VITE_MUSIC_SERVE=http://47.113.117.43:3000

# 网站标题
VITE_SITE_TITLE=个人主页

# 网站描述
VITE_SITE_DESC=Welcome to my personal space

# 一言API
VITE_HITOKOTO_API=https://v1.hitokoto.cn/

# 网站开始年份（用于Footer版权显示）
VITE_SITE_START=2024

# 网站作者
VITE_SITE_AUTHOR=Your Name

# 网站地址
VITE_SITE_URL=https://yourdomain.com

# 网站备案号（可选，不需要可以留空）
VITE_SITE_ICP=
```

## 说明

### 必填项
- `VITE_MUSIC_SERVE`: 网易云音乐 API 服务器地址（已配置好）
- `VITE_SITE_TITLE`: 网站标题，显示在页面和 Footer 中
- `VITE_SITE_DESC`: 网站描述
- `VITE_HITOKOTO_API`: 一言 API 地址

### Footer 相关（选填）
- `VITE_SITE_START`: 网站开始年份，如 `2024`，Footer 会显示 `© 2024 - 2026`
- `VITE_SITE_AUTHOR`: 网站作者名称，显示在 Footer 版权信息中
- `VITE_SITE_URL`: 网站地址，点击作者名称会跳转到此地址
- `VITE_SITE_ICP`: 网站备案号，如有备案填写，没有可留空

## 快速创建

**Windows PowerShell:**
```powershell
Copy-Item .env.example .env
```

**Linux/Mac:**
```bash
cp .env.example .env
```

或者直接手动创建 `.env` 文件并复制上述内容。

