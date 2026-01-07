import { NotionAPI } from 'notion-client'
import NotionPage from '@/components/NotionPage'
import 'react-notion-x/src/styles.css'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function Home() {
  const notionPageId = process.env.NOTION_PAGE_ID
  const notionToken = process.env.NOTION_TOKEN

  if (!notionPageId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">环境变量未配置</h1>
          <p className="text-gray-600 mb-6">请按照以下步骤配置 Notion：</p>
          <div className="text-left bg-gray-50 p-6 rounded-lg space-y-4">
            <div>
              <h2 className="font-semibold mb-2">1. 创建 Notion Integration</h2>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>访问 <a href="https://www.notion.so/my-integrations" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.notion.so/my-integrations</a></li>
                <li>点击 "New integration"</li>
                <li>填写名称，选择 workspace</li>
                <li>复制生成的 Internal Integration Token</li>
              </ol>
            </div>
            <div>
              <h2 className="font-semibold mb-2">2. 授权 Integration 访问页面</h2>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>打开你的 Notion 页面</li>
                <li>点击右上角 "..." → "Add connections"</li>
                <li>选择你创建的 Integration</li>
              </ol>
            </div>
            <div>
              <h2 className="font-semibold mb-2">3. 配置环境变量</h2>
              <p className="text-sm text-gray-600">
                在 Vercel 项目设置中添加：
              </p>
              <div className="mt-2 p-3 bg-black text-green-400 rounded font-mono text-xs">
                NOTION_TOKEN=your_integration_token<br/>
                NOTION_PAGE_ID=26f2cebad66680e18f2fea4c87f7ab29
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  try {
    const notion = new NotionAPI({
      authToken: notionToken,
    })

    const recordMap = await notion.getPage(notionPageId)

    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <NotionPage recordMap={recordMap} />
      </main>
    )
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-red-600">加载失败</h1>
          <p className="text-gray-600 mb-4">无法加载 Notion 页面，请检查：</p>
          <ul className="text-left text-gray-600 space-y-2">
            <li>• NOTION_TOKEN 是否正确</li>
            <li>• NOTION_PAGE_ID 是否正确</li>
            <li>• Integration 是否已授权访问该页面</li>
          </ul>
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm text-gray-500">错误详情</summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
                {error instanceof Error ? error.message : String(error)}
              </pre>
            </details>
          )}
        </div>
      </div>
    )
  }
}
