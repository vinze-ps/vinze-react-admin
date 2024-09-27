import { EditorContent } from "@tiptap/react";
import { TextMenu } from "@/components/text_editor/components/menus/TextMenu";
import {
  ContentItemMenu,
  LinkMenu,
} from "@/components/text_editor/components/menus";
import { ColumnsMenu } from "./extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "./extensions/Table/menus";
import React, { useRef } from "react";
import ImageBlockMenu from "./extensions/ImageBlock/components/ImageBlockMenu";
import { useBlockEditor } from "@/components/text_editor/hooks/useBlockEditor.ts";

import "@/components/text_editor/styles/index.scss";
import "@/components/text_editor/styles/globals.scss";

const TextEditor = ({label}: {label?: React.ReactNode}) => {
  const menuContainerRef = useRef(null);
  const { editor } = useBlockEditor();

  if (!editor) {
    return null;
  }

  return (
    <div ref={menuContainerRef}>
      {label && <div
        className={"mb-[10px] pointer-events-none subpixel-antialiased block text-foreground pb-0 end-auto pe-2 max-w-full text-ellipsis overflow-hidden text-sm"}>{label}</div>}
      <EditorContent editor={editor} className="" />
      <ContentItemMenu editor={editor} />
      <LinkMenu editor={editor} appendTo={menuContainerRef} />
      <TextMenu editor={editor} />
      <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
      <TableRowMenu editor={editor} appendTo={menuContainerRef} />
      <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
    </div>
  );
};

export default TextEditor;
