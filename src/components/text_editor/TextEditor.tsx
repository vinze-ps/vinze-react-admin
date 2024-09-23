import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextMenu } from "@/components/text_editor/components/menus/TextMenu";
import {ContentItemMenu, LinkMenu} from "@/components/text_editor/components/menus";
import { ColumnsMenu } from "./extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "./extensions/Table/menus";
import { useRef } from "react";
import ImageBlockMenu from "./extensions/ImageBlock/components/ImageBlockMenu";

const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const TextEditor = () => {
  const menuContainerRef = useRef(null);
  const editor = useEditor({
    extensions,
    content,
  });

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
