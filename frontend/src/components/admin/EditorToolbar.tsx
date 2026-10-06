"use client";

import { Editor } from "@tiptap/react";
import { useRef } from "react";
import { useState } from "react";
import MediaLibrary from "@/components/media/MediaLibrary";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Undo2,
  Redo2,
  Link2,
  Image,
  Minus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eraser,
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

export default function EditorToolbar({ editor }: Props) {
  const [mediaOpen, setMediaOpen] = useState(false);
  if (!editor) return null;

  const btn =
    "h-9 w-9 border rounded-md flex items-center justify-center hover:bg-gray-100 transition";

  const active = "bg-blue-600 text-white border-blue-600";

  return (
    <>
      <div className="mb-4 flex flex-wrap gap-2 rounded-lg border bg-gray-50 p-3">
        {/* Undo */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn}>
          <Undo2 size={18} />
        </button>

        {/* Redo */}
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn}>
          <Redo2 size={18} />
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* H1 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btn} ${editor.isActive("heading", { level: 1 }) ? active : ""}`}
        >
          <Heading1 size={18} />
        </button>

        {/* H2 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btn} ${editor.isActive("heading", { level: 2 }) ? active : ""}`}
        >
          <Heading2 size={18} />
        </button>

        {/* H3 */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btn} ${editor.isActive("heading", { level: 3 }) ? active : ""}`}
        >
          <Heading3 size={18} />
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${btn} ${editor.isActive("bold") ? active : ""}`}
        >
          <Bold size={18} />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${btn} ${editor.isActive("italic") ? active : ""}`}
        >
          <Italic size={18} />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${btn} ${editor.isActive("underline") ? active : ""}`}
        >
          <UnderlineIcon size={18} />
        </button>

        {/* Strike */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${btn} ${editor.isActive("strike") ? active : ""}`}
        >
          <Strikethrough size={18} />
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* Bullet */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${btn} ${editor.isActive("bulletList") ? active : ""}`}
        >
          <List size={18} />
        </button>

        {/* Ordered */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${btn} ${editor.isActive("orderedList") ? active : ""}`}
        >
          <ListOrdered size={18} />
        </button>

        {/* Quote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${btn} ${editor.isActive("blockquote") ? active : ""}`}
        >
          <Quote size={18} />
        </button>

        {/* Code */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${btn} ${editor.isActive("codeBlock") ? active : ""}`}
        >
          <Code2 size={18} />
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* Left */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btn}
        >
          <AlignLeft size={18} />
        </button>

        {/* Center */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btn}
        >
          <AlignCenter size={18} />
        </button>

        {/* Right */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btn}
        >
          <AlignRight size={18} />
        </button>

        <div className="mx-1 w-px bg-gray-300" />

        {/* Divider */}
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btn}
        >
          <Minus size={18} />
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => {
            const url = window.prompt("Enter URL");

            if (!url) return;

            editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`${btn} ${editor.isActive("link") ? active : ""}`}
        >
          <Link2 size={18} />
        </button>

        {/* Image */}
        <button type="button" onClick={() => setMediaOpen(true)} className={btn}>
          <Image size={18} />
        </button>

        {/* Clear */}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className={btn}
        >
          <Eraser size={18} />
        </button>
      </div>
      <MediaLibrary
        open={mediaOpen}
        folder="blog"
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          editor
            .chain()
            .focus()
            .setImage({
              src: url,
            })
            .run();
        }}
      />
    </>
  );
}
