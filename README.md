# 盛玉飞设计作品集

这是一个基于 Next.js 和 Markdown 的个人作品集网站，完全独立于 Notion，方便维护和部署。

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React Markdown** - Markdown 渲染
- **Remark GFM** - GitHub Flavored Markdown 支持
- **Rehype Highlight** - 代码高亮

## 特性

- ✅ 完全独立，不依赖 Notion API
- ✅ 保留 Markdown 格式（标题、列表、代码块等）
- ✅ 支持代码高亮
- ✅ 支持图片
- ✅ 支持表格
- ✅ 响应式设计
- ✅ Vercel 零配置部署

## 如何更新内容

1. **在 Notion 中编辑你的内容**
2. **导出为 Markdown**
   - 在 Notion 页面右上角点击 "..."
   - 选择 "Export"
   - 格式选择 "Markdown & CSV"
   - 下载并解压

3. **更新网站内容**
   - 将导出的 markdown 文件复制到 `content/index.md`
   - 如果有图片，确保图片 URL 是可访问的（保持 Notion 的图片 URL 即可）

4. **提交并推送**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

Vercel 会自动检测更新并重新部署。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 部署

代码已经推送到 GitHub，Vercel 会自动部署。

如果需要手动重新部署，访问 Vercel 仪表板点击 "Redeploy"。

## 自定义样式

### 修改颜色

编辑 `app/globals.css` 添加自定义颜色：

```css
/* 自定义主题色 */
@layer base {
  :root {
    --primary: #your-color;
  }
}
```

### 修改布局

编辑 `app/page.tsx` 修改容器宽度：

```tsx
<div className="max-w-4xl mx-auto px-4 py-8">
  {/* 改为你喜欢的宽度，例如 max-w-6xl */}
</div>
```

### 修改 Markdown 样式

编辑 `components/MarkdownRenderer.tsx` 自定义各个元素的样式。

## 添加新页面

1. 在 `content/` 目录创建新的 markdown 文件，例如 `about.md`

2. 创建对应的 Next.js 页面，例如 `app/about/page.tsx`：

```tsx
import fs from 'fs'
import path from 'path'
import MarkdownRenderer from '@/components/MarkdownRenderer'

function getMarkdownContent() {
  const filePath = path.join(process.cwd(), 'content', 'about.md')
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8')
  }
  return '# About\n\nThis is the about page.'
}

export default function About() {
  const content = getMarkdownContent()
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MarkdownRenderer content={content} />
      </div>
    </main>
  )
}
```

## License

MIT
