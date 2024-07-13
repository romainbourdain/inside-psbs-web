"use client";

import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { HTMLAttributes } from "react";

export type TipTapProps = HTMLAttributes<HTMLDivElement>;

export const Tiptap = ({ ...props }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content: "<p>Hello World! 🌎️</p>",
    editorProps: {
      attributes: {
        class: "h-full",
      },
    },
  });
  return <EditorContent editor={editor} {...props} />;
};
