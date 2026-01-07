import fs from 'fs'
import path from 'path'
import MarkdownRenderer from '@/components/MarkdownRenderer'

// Read markdown file
function getMarkdownContent() {
  const filePath = path.join(process.cwd(), 'content', 'index.md')
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8')
  }
  return `# Welcome

请将你的 Notion 页面导出为 Markdown 格式，并保存到 \`content/index.md\`

## 导出步骤

1. 在 Notion 页面右上角点击 "..."
2. 选择 "Export"
3. 格式选择 "Markdown & CSV"
4. 下载后解压，将 markdown 文件放到 \`content/index.md\`

## 特性

- ✅ 完全独立，不依赖 Notion API
- ✅ 保留 Markdown 格式（标题、列表、代码块等）
- ✅ 支持代码高亮
- ✅ 支持图片
- ✅ 支持表格
- ✅ 响应式设计
`
}

export default function Home() {
  const content = getMarkdownContent()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MarkdownRenderer content={content} />
      </div>
    </main>
  )
}
