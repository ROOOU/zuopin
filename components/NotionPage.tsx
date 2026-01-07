'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { NotionRenderer } from 'react-notion-x'
import type { ExtendedRecordMap } from 'notion-types'

// Dynamically import optional components to reduce bundle size
const Code = dynamic(() =>
  import('react-notion-x/build/third-party/code').then((m) => m.Code)
)
const Collection = dynamic(() =>
  import('react-notion-x/build/third-party/collection').then(
    (m) => m.Collection
  )
)
const Equation = dynamic(() =>
  import('react-notion-x/build/third-party/equation').then((m) => m.Equation)
)
const Pdf = dynamic(
  () => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf),
  { ssr: false }
)
const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false }
)

const mapPageUrl = (pageId?: string, recordMap?: ExtendedRecordMap) => {
  if (!pageId) return '/'

  // If it's same page, return root
  if (recordMap) {
    const rootPageId = Object.keys(recordMap.block)[0]
    if (pageId === rootPageId) {
      return '/'
    }
  }

  // For subpages, we'll open them in current page (not navigate)
  return `?page=${pageId}`
}

export default function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      disableHeader={false}
      components={{
        Code,
        Collection,
        Equation,
        Pdf,
        Modal,
        nextImage: undefined,
        nextLink: Link,
      }}
      mapPageUrl={mapPageUrl}
    />
  )
}
