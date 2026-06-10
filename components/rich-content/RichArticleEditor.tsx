import "@/styles/rich-article.css";

import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect } from "react";

import type { JSONContent } from "@tiptap/react";

import {
  markdownToRichDoc,
  parseRichDoc,
  RICH_EXTENSIONS,
  serializeRichDoc,
} from "@/lib/rich-content/document";

type RichArticleEditorProps = {
  value: string | null;
  onChange: (json: string, plainText: string) => void;
  placeholder?: string;
};

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors ${
        active
          ? "bg-[var(--admin-text)] text-[var(--admin-surface)]"
          : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-panel)] hover:text-[var(--admin-text)]"
      }`}
    >
      {label}
    </button>
  );
}

export function RichArticleEditor({ value, onChange, placeholder }: RichArticleEditorProps) {
  const editor = useEditor({
    extensions: RICH_EXTENSIONS,
    content: parseRichDoc(value),
    editorProps: {
      attributes: {
        class: "rich-article rich-article-editor min-h-[420px] px-4 py-5 focus:outline-none",
      },
    },
    onUpdate: ({ editor: ed }) => {
      const json = ed.getJSON();
      onChange(serializeRichDoc(json), ed.getText());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor) return;
    const parsed = parseRichDoc(value);
    const current = JSON.stringify(editor.getJSON());
    const incoming = JSON.stringify(parsed);
    if (current !== incoming) {
      editor.commands.setContent(parsed, { emitUpdate: false });
    }
  }, [editor, value]);

  const insertImage = useCallback(() => {
    const src = window.prompt("Image or GIF URL (/industries/forging.jpg or https://…)");
    if (!src?.trim() || !editor) return;
    const alt = window.prompt("Alt text (optional)") ?? "";
    editor.chain().focus().setImage({ src: src.trim(), alt }).run();
  }, [editor]);

  const insertVideo = useCallback(() => {
    const url = window.prompt("YouTube URL");
    if (!url?.trim() || !editor) return;
    editor.chain().focus().setYoutubeVideo({ src: url.trim() }).run();
  }, [editor]);

  const insertLink = useCallback(() => {
    const href = window.prompt("Link URL");
    if (!href?.trim() || !editor) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run();
  }, [editor]);

  const insertMermaid = useCallback(() => {
    const source = window.prompt(
      "Mermaid diagram source",
      "flowchart TD\n  A[Plant data] --> B[Stamped prescriptions]",
    );
    if (!source?.trim() || !editor) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "codeBlock",
        attrs: { language: "mermaid" },
        content: [{ type: "text", text: source.trim() }],
      })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)]">
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-panel)] px-2 py-2">
        <ToolbarButton
          label="H2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        />
        <ToolbarButton
          label="H3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        />
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        />
        <ToolbarButton
          label="List"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton label="Image" onClick={insertImage} />
        <ToolbarButton label="Video" onClick={insertVideo} />
        <ToolbarButton label="Diagram" onClick={insertMermaid} />
        <ToolbarButton label="Link" onClick={insertLink} />
        <ToolbarButton
          label="Divider"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>
      <EditorContent editor={editor} />
      {placeholder ? (
        <p className="border-t border-[var(--admin-border-subtle)] px-4 py-2 text-[11px] text-[var(--admin-text-muted)]">
          {placeholder}
        </p>
      ) : null}
    </div>
  );
}

export function richDocFromMarkdown(markdown: string): JSONContent {
  return markdown.trim() ? markdownToRichDoc(markdown) : { type: "doc", content: [{ type: "paragraph" }] };
}
