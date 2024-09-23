import {  EditorContent } from "@tiptap/react";
import { TextMenu } from "@/components/text_editor/components/menus/TextMenu";
import {ContentItemMenu, LinkMenu} from "@/components/text_editor/components/menus";
import { ColumnsMenu } from "./extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "./extensions/Table/menus";
import { useRef } from "react";
import ImageBlockMenu from "./extensions/ImageBlock/components/ImageBlockMenu";
import {useBlockEditor} from "@/components/text_editor/hooks/useBlockEditor.ts";

const TextEditor = () => {
  const menuContainerRef = useRef(null);
  const { editor } = useBlockEditor();

  if (!editor) {
    return null;
  }

  return (
    <div ref={menuContainerRef}>
      <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
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
