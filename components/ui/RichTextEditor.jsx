"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function RichTextEditor({ value, onChange, placeholder = "Write your content here..." }) {
  const config = {
    readonly: false,
    placeholder,
    height: 450,
    toolbarButtonSize: "middle",
    buttons: [
      "bold", "italic", "underline", "strikethrough", "|",
      "ul", "ol", "|",
      "outdent", "indent", "|",
      "font", "fontsize", "brush", "paragraph", "|",
      "image", "link", "table", "|",
      "align", "|",
      "undo", "redo", "|",
      "hr", "eraser", "source",
    ],
    uploader: {
      insertImageAsBase64URI: true,
    },
    style: {
      background: "var(--jodit-bg, #fff)",
      color: "var(--jodit-color, #333)",
    },
  };

  return (
    <JoditEditor
      value={value}
      config={config}
      onBlur={(newContent) => onChange(newContent)}
    />
  );
}
