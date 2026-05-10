# OstensibleParadox Hugo Blog

这是一个使用 Hugo 和 PaperMod 主题搭建的双语个人博客，支持中文和英文内容。

## 项目结构

```
.
├── content/
│   ├── Chinese/          # 中文内容
│   │   ├── about.md      # 中文关于页面
│   │   ├── search.md     # 中文搜索页面
│   │   └── posts/        # 中文文章
│   │       ├── essay1.md
│   │       └── essay2.md
│   └── English/          # 英文内容
│       ├── about.md      # 英文关于页面
│       ├── search.md     # 英文搜索页面
│       └── posts/        # 英文文章
│           ├── essay1.md
│           └── essay2.md
├── static/
│   └── images/           # 静态图片资源
│       └── essay1/
│           └── sample-image.jpeg
├── hugo.toml             # Hugo 配置文件
└── README.md             # 本文件
```

## 如何新建一个 Markdown 文件

### 新建文章

1. 在对应的语言目录下创建新文件：
   - 中文文章：`content/Chinese/posts/your-article.md`
   - 英文文章：`content/English/posts/your-article.md`

2. 在文件开头添加 Front Matter（元数据）：

```markdown
+++
date = '2026-05-10T13:01:35+08:00'
draft = false
title = '文章标题'
+++
```

3. 在 Front Matter 下方添加文章内容：

```markdown
+++
date = '2026-05-10T13:01:35+08:00'
draft = false
title = '文章标题'
+++

这里是文章内容...

![图片说明](/images/your-folder/your-image.jpg)

更多内容...
```

### 新建页面

在对应的语言目录下直接创建 `.md` 文件，例如：
- `content/Chinese/about.md` - 中文关于页面
- `content/English/about.md` - 英文关于页面

## 如何引用图片

### 1. 准备图片

将图片文件放到 `static/images/` 目录下。建议按文章或主题组织：

```
static/
└── images/
    ├── essay1/
    │   ├── image1.jpg
    │   └── image2.png
    └── essay2/
        └── image1.jpg
```

### 2. 在 Markdown 中引用图片

使用标准的 Markdown 图片语法，路径从 `/images/` 开始：

```markdown
![图片描述](/images/essay1/image1.jpg)
```

可以添加可选的标题和尺寸：

```markdown
![图片描述](/images/essay1/image1.jpg "图片标题")
```

### 3. 图片路径说明

- 图片必须放在 `static/` 目录下
- 在 Markdown 中引用时，路径以 `/images/` 开头（`static/` 前缀会被 Hugo 自动处理）
- 推荐使用相对路径组织图片，便于管理

## 本地开发

### 安装 Hugo

```bash
# macOS
brew install hugo

# Linux
sudo apt-get install hugo

# Windows
# 从 https://gohugo.io/installation/ 下载安装
```

### 启动开发服务器

```bash
hugo server -D
```

访问 http://localhost:1313 查看网站。

### 构建静态网站

```bash
hugo
```

构建后的文件在 `public/` 目录中。

## 双语配置

本网站支持中文和英文双语切换：

- **默认语言**：中文
- **语言切换**：网站会自动根据 URL 路径显示对应语言版本
  - 中文版本：`/zh/...`
  - 英文版本：`/en/...`

### 添加新语言内容

1. 在 `hugo.toml` 的 `[languages]` 部分配置语言
2. 在对应的 `content/` 子目录中创建内容
3. 每个语言版本需要独立的菜单配置

## 搜索功能

网站使用 Fuse.js 实现客户端搜索：

- 中文搜索：访问 `/zh/search/`
- 英文搜索：访问 `/en/search/`
- 搜索功能使用 `index.json` 索引文件

## 主题配置

本网站使用 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 主题。

主要配置项在 `hugo.toml` 中：
- `params.fuseOpts` - 搜索配置
- `params.socialIcons` - 社交媒体图标
- `menu` - 导航菜单
- `languages` - 多语言配置

## 部署

### GitHub Pages 部署

使用 GitHub Actions 自动部署到 GitHub Pages，详见 `.github/workflows/hugo.yml`。

### 其他部署方式

可以将 `public/` 目录部署到任何静态网站托管服务：
- Netlify
- Vercel
- Cloudflare Pages
- 等等

## 常用命令

```bash
# 启动开发服务器（包含草稿）
hugo server -D

# 启动开发服务器（不包含草稿）
hugo server

# 构建网站
hugo

# 清理构建文件
hugo --cleanDestinationDir
```

## 注意事项

1. **图片路径**：确保图片放在 `static/` 目录下，引用时使用 `/images/` 开头的路径
2. **日期格式**：Front Matter 中的日期使用 ISO 8601 格式
3. **草稿状态**：设置 `draft = true` 可以在开发时预览，但不会在正式构建中发布
4. **语言文件**：确保每个语言版本都有对应的文件和菜单配置
5. **搜索索引**：修改内容后需要重新构建以更新搜索索引

## 相关链接

- [Hugo 官方文档](https://gohugo.io/documentation/)
- [PaperMod 主题文档](https://github.com/adityatelange/hugo-PaperMod)
- [Markdown 语法指南](https://www.markdownguide.org/)
