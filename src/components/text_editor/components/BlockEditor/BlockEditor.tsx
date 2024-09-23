import { EditorContent } from '@tiptap/react'
import React, { useRef } from 'react'

import { LinkMenu } from '@/components/text_editor/components/menus'

import { useBlockEditor } from '@/components/text_editor/hooks/useBlockEditor'

import '@/styles/index.css'

import { Sidebar } from '@/components/text_editor/components/Sidebar'
import ImageBlockMenu from '@/components/text_editor/extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from '@/components/text_editor/extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from '@/components/text_editor/extensions/Table/menus'
import { EditorHeader } from './components/EditorHeader'
import { TextMenu } from '../menus/TextMenu'
import { ContentItemMenu } from '../menus/ContentItemMenu'
import { useSidebar } from '@/components/text_editor/hooks/useSidebar'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

export const BlockEditor = ({
  aiToken,
  ydoc,
  provider,
}: {
  aiToken?: string
  hasCollab: boolean
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
}) => {
  const menuContainerRef = useRef(null)

  const leftSidebar = useSidebar()
  const { editor, users, collabState } = useBlockEditor({ aiToken, ydoc, provider })

  if (!editor || !users) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <Sidebar isOpen={leftSidebar.isOpen} onClose={leftSidebar.close} editor={editor} />
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorHeader
          editor={editor}
          collabState={collabState}
          users={users}
          isSidebarOpen={leftSidebar.isOpen}
          toggleSidebar={leftSidebar.toggle}
        />
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
