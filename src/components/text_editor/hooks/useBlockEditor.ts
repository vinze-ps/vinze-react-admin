import { useEditor } from "@tiptap/react";
import type { AnyExtension, Editor } from "@tiptap/core";

import { ExtensionKit } from "@/components/text_editor/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        ctx.editor.commands.setContent({});
        ctx.editor.commands.focus("start", { scrollIntoView: true });
      },
      extensions: [...ExtensionKit()].filter(
        (e): e is AnyExtension => e !== undefined,
      ),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  window.editor = editor;

  return { editor };
};
