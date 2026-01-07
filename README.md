# Notion 到 Vercel 部署项目

这个项目可以将 Notion 页面原样部署到 Vercel。

## 配置步骤

### 1. 创建 Notion Integration

1. 访问 [Notion My Integrations](https://www.notion.so/my-integrations)
2. 点击 "New integration"
3. 填写名称（例如：Vercel Deploy），选择你的 workspace
4. 点击 "Submit"
5. 复制生成的 **Internal Integration Token**（格式：`secret_xxx...`）

### 2. 授权 Integration 访问你的页面

1. 打开你的 Notion 页面：https://www.notion.so/PC-26f2cebad66680e18f2fea4c87f7ab29
2. 点击页面右上角的 `...` 按钮
3. 选择 "Add connections"
4. 找到并选择你刚才创建的 Integration
5. 确认授权

### 3. 配置环境变量

#### 本地开发
复制 `.env.example` 为 `.env.local`，填写：
```
NOTION_TOKEN=your_internal_integration_token_here
NOTION_PAGE_ID=26f2cebad66680e18f2fea4c87f7ab29
```

#### Vercel 部署
在 Vercel 项目设置 → Environment Variables 中添加：
- `NOTION_TOKEN`: 你的 Integration Token
- `NOTION_PAGE_ID`: `26f2cebad66680e18f2fea4c87f7ab29`

## 部署到 Vercel

### 方法 1：通过 Git（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 Vercel 中点击 "Add New Project"
3. 导入你的仓库
4. 配置环境变量（见上一步）
5. 点击 "Deploy"

### 方法 2：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel

# 按提示配置环境变量
```

## 本地开发

```bash
# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 NOTION_TOKEN

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 功能特性

- ✅ 完整保留 Notion 页面内容和样式
- ✅ 支持图片、代码块、表格等所有 Notion 块
- ✅ 响应式设计
- ✅ 自动缓存（1小时更新一次）
- ✅ 自定义域名支持

## 常见问题

### 页面显示 "加载失败"
- 检查 `NOTION_TOKEN` 是否正确
- 确认 Integration 已授权访问该页面
- 检查 `NOTION_PAGE_ID` 是否正确

### 图片无法显示
- 确保 Notion 页面中的图片是公开可访问的
- 检查 next.config.mjs 中的 images 配置

### 内容更新后没有同步
- 默认缓存时间为 1 小时
- 可以手动触发 Vercel 重新部署来强制更新
- 或者修改 `revalidate` 值调整缓存时间

## 自定义配置

### 修改缓存时间
编辑 `app/page.tsx`:
```typescript
export const revalidate = 3600 // 1小时，单位：秒
```

### 自定义样式
编辑 `app/globals.css` 或 `app/layout.tsx`

### 添加自定义域名
在 Vercel 项目设置 → Domains 中添加

## 技术栈

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Notion Client
- React Notion X
