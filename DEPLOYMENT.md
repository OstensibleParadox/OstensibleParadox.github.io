# GitHub Actions 部署教程

## 当前部署状态

当前主站由 Cloudflare Pages 构建并托管，GitHub Pages 仅保留为旧链接跳转入口。

Cloudflare Pages 推荐设置：

```bash
hugo --minify
```

构建输出目录：

```text
public
```

当前 `.github/workflows/hugo.yml` 不再构建 Hugo 站点，而是发布一个重定向页面到 GitHub Pages。旧的 GitHub Pages Hugo 构建流程仍保留在下方作为恢复或参考说明。

本教程将指导你如何使用 GitHub Actions 自动将 Hugo 博客部署到 GitHub Pages。

## 前提条件

1. **GitHub 账户**：确保你有一个 GitHub 账户
2. **GitHub 仓库**：将你的 Hugo 项目推送到 GitHub 仓库
3. **Hugo 项目**：你的 Hugo 项目已经配置完成

## 第一步：配置 GitHub Pages

### 1.1 启用 GitHub Pages

1. 进入你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages** 选项
4. 在 **Build and deployment** 部分：
   - **Source** 选择 **GitHub Actions**
   - 如果之前选择了其他选项（如 Deploy from a branch），请先禁用再重新选择

### 1.2 配置仓库设置

1. 在仓库的 **Settings** → **Pages** 中，确保：
   - **Source** 已设置为 **GitHub Actions**
   - 这样 GitHub 就会使用我们创建的 workflow 文件来部署

## 第二步：理解 GitHub Actions Workflow

我们已经为你创建了 `.github/workflows/hugo.yml` 文件，这个文件定义了自动部署的流程。

### Workflow 文件说明

```yaml
name: Deploy Hugo site to GitHub Pages  # Workflow 名称

on:
  push:
    branches:
      - main  # 当推送到 main 分支时触发
  workflow_dispatch:  # 允许手动触发

permissions:
  contents: read
  pages: write
  id-token: write  # 必需的权限配置

jobs:
  build:          # 构建任务
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive  # 递归检出子模块（主题）
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true

      - name: Build
        run: hugo --minify

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:         # 部署任务
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Workflow 工作流程

1. **触发条件**：
   - 当代码推送到 `main` 分支时自动触发
   - 也可以在 GitHub Actions 页面手动触发

2. **构建阶段 (build job)**：
   - 检出代码（包括子模块）
   - 安装 Hugo
   - 构建网站（`hugo --minify`）
   - 上传构建产物

3. **部署阶段 (deploy job)**：
   - 将构建产物部署到 GitHub Pages

## 第三步：推送代码到 GitHub

### 3.1 初始化 Git 仓库（如果还没有）

```bash
cd /Users/ostensible_paradox/github/ostensible-paradox
git init
```

### 3.2 添加所有文件

```bash
git add .
```

### 3.3 创建首次提交

```bash
git commit -m "Initial commit: Hugo blog with bilingual support"
```

### 3.4 添加远程仓库

```bash
# 将 YOUR_USERNAME 替换为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/ostensible-paradox.git
```

### 3.5 推送到 GitHub

```bash
# 推送到 main 分支
git branch -M main
git push -u origin main
```

## 第四步：查看部署状态

### 4.1 查看 Actions 运行

1. 进入你的 GitHub 仓库
2. 点击 **Actions** 标签
3. 你会看到 workflow 正在运行或已经完成
4. 点击具体的 workflow 可以查看详细日志

### 4.2 检查部署结果

1. 如果 workflow 成功完成，你会看到绿色的 ✓ 标记
2. 点击 **Settings** → **Pages** 查看部署状态
3. 成功后，你会看到类似这样的 URL：
   - `https://YOUR_USERNAME.github.io/ostensible-paradox/`

## 第五步：配置自定义域名（可选）

如果你想使用自定义域名，可以按照以下步骤操作：

### 5.1 在 GitHub Pages 设置中添加域名

1. 进入 **Settings** → **Pages**
2. 在 **Custom domain** 输入你的域名（如 `blog.yourdomain.com`）
3. 点击 **Save**

### 5.2 配置 DNS

在你的域名提供商处添加 DNS 记录：

- **A 记录**：
  - 名称：`blog`（或 `@`）
  - 值：`185.199.108.153`
  - TTL：默认

- **CNAME 记录**（可选）：
  - 名称：`www`
  - 值：`YOUR_USERNAME.github.io`
  - TTL：默认

### 5.3 启用 HTTPS

在 GitHub Pages 设置中：
1. 等待 DNS 传播完成
2. 点击 **Enforce HTTPS** 启用 HTTPS

## 第六步：日常使用

### 6.1 更新博客内容

1. 修改或添加新的 Markdown 文件
2. 提交更改：
   ```bash
   git add .
   git commit -m "Add new blog post"
   git push
   ```
3. GitHub Actions 会自动构建并部署

### 6.2 手动触发部署

如果你想手动触发部署（不推送代码）：

1. 进入仓库的 **Actions** 页面
2. 选择 "Deploy Hugo site to GitHub Pages" workflow
3. 点击 **Run workflow** 按钮
4. 选择分支并点击 **Run workflow**

## 第七步：故障排除

### 7.1 构建失败

如果构建失败，检查以下内容：

1. **查看 Actions 日志**：
   - 在 Actions 页面点击失败的 workflow
   - 查看具体的错误信息

2. **常见问题**：
   - **子模块问题**：确保主题子模块正确配置
   - **Hugo 版本问题**：workflow 中的 `hugo-version` 可能需要指定特定版本
   - **语法错误**：检查 Markdown 文件的 Front Matter 语法

### 7.2 部署失败

如果部署失败，检查：

1. **权限问题**：
   - 确保 workflow 中的 `permissions` 配置正确
   - 检查仓库的 **Settings** → **Actions** → **General** → **Workflow permissions**

2. **Pages 设置**：
   - 确保 Source 设置为 **GitHub Actions**
   - 检查是否有其他 Pages 设置冲突

### 7.3 网站无法访问

1. **等待 DNS 传播**：新部署可能需要几分钟才能生效
2. **检查 URL**：确认访问的是正确的 GitHub Pages URL
3. **清除缓存**：尝试清除浏览器缓存或使用无痕模式

## 第八步：优化配置

### 8.1 指定 Hugo 版本

为了避免版本兼容性问题，可以指定特定版本的 Hugo：

```yaml
- name: Setup Hugo
  uses: peaceiris/actions-hugo@v3
  with:
    hugo-version: '0.123.4'  # 指定具体版本
    extended: true
```

### 8.2 添加缓存加速构建

可以添加缓存来加速构建过程：

```yaml
- name: Cache Hugo
  uses: actions/cache@v4
  with:
    path: /tmp/hugo_cache
    key: ${{ runner.os }}-hugomod-${{ hashFiles('**/go.sum') }}
    restore-keys: |
      ${{ runner.os }}-hugomod-
```

### 8.3 添加环境变量

如果需要环境变量，可以在 workflow 中添加：

```yaml
env:
  HUGO_ENV: production
```

## 常用命令参考

### Git 命令

```bash
# 查看状态
git status

# 添加文件
git add .

# 提交更改
git commit -m "Your message"

# 推送到远程
git push

# 拉取最新更改
git pull

# 查看提交历史
git log
```

### Hugo 本地测试

```bash
# 本地开发服务器
hugo server -D

# 本地构建测试
hugo

# 清理并重新构建
hugo --cleanDestinationDir
```

## 相关资源

- [GitHub Actions 官方文档](https://docs.github.com/en/actions)
- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Hugo 官方文档](https://gohugo.io/documentation/)
- [peaceiris/actions-hugo](https://github.com/peaceiris/actions-hugo)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)

## 总结

通过以上步骤，你的 Hugo 博客现在已经配置为使用 GitHub Actions 自动部署到 GitHub Pages。每次你推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署你的网站。

这种方式的优势：
- ✅ 自动化部署，无需手动操作
- ✅ 免费托管
- ✅ 支持 HTTPS
- ✅ 自定义域名支持
- ✅ 版本控制和回滚
