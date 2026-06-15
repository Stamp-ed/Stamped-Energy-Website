"use client";

import "@/styles/rich-article.css";

import { useEditor, EditorContent } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";

import type { JSONContent } from "@tiptap/react";

import {
  markdownToRichDoc,
  parseRichDoc,
  RICH_EXTENSIONS,
  serializeRichDoc,
} from "@/lib/rich-content/document";

import {
  EditorInsertDialog,
  type EditorDialogKind,
} from "@/components/rich-content/EditorInsertDialog";

type RichArticleEditorProps = {
  value: string | null;
  onChange: (json: string, plainText: string) => void;
  placeholder?: string;
  className?: string;
};

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  title?: string;
};

function ToolbarDivider() {
  return <span className="mx-1 h-5 w-px shrink-0 bg-[var(--admin-border)]" aria-hidden />;
}

function ToolbarButton({ onClick, active, disabled, label, title }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={title ?? label}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-[var(--admin-text)] text-[var(--admin-surface)]"
          : "text-[var(--admin-text-secondary)] hover:bg-[var(--admin-surface)] hover:text-[var(--admin-text)]"
      }`}
    >
      {label}
    </button>
  );
}

export function RichArticleEditor({
  value,
  onChange,
  placeholder,
  className = "",
}: RichArticleEditorProps) {
  const [dialogKind, setDialogKind] = useState<EditorDialogKind | null>(null);
  const [dialogInitial, setDialogInitial] = useState<Record<string, string>>({});
  const [canRemoveLink, setCanRemoveLink] = useState(false);

  const editor = useEditor({
    extensions: RICH_EXTENSIONS,
    content: parseRichDoc(value),
    editorProps: {
      attributes: {
        class:
          "rich-article rich-article-editor min-h-[calc(100vh-18rem)] px-6 py-6 focus:outline-none",
        "data-placeholder": placeholder ?? "Tell your story…",
      },
    },
    onUpdate: ({ editor: ed }) => {
      onChange(serializeRichDoc(ed.getJSON()), ed.getText());
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

  const openLinkDialog = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const { empty } = editor.state.selection;
    setCanRemoveLink(Boolean(previousUrl));
    setDialogInitial({
      url: previousUrl ?? "https://",
      text: empty ? "" : editor.state.doc.textBetween(editor.state.selection.from, editor.state.selection.to),
    });
    setDialogKind("link");
  }, [editor]);

  const openImageDialog = useCallback(() => {
    setDialogInitial({});
    setCanRemoveLink(false);
    setDialogKind("image");
  }, []);

  const openVideoDialog = useCallback(() => {
    setDialogInitial({});
    setCanRemoveLink(false);
    setDialogKind("video");
  }, []);

  const openMermaidDialog = useCallback(() => {
    setDialogInitial({
      source: "flowchart TD\n  A[Plant data] --> B[Stamped prescriptions]",
    });
    setCanRemoveLink(false);
    setDialogKind("mermaid");
  }, []);

  const handleLinkSubmit = useCallback(
    (values: Record<string, string>) => {
      if (!editor) return;
      const href = values.url.trim();
      if (!href) {
        setDialogKind(null);
        return;
      }

      const { empty } = editor.state.selection;
      const displayText = values.text.trim();

      if (editor.isActive("link")) {
        editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
      } else if (!empty) {
        editor.chain().focus().setLink({ href }).run();
      } else if (displayText) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "text",
            text: displayText,
            marks: [{ type: "link", attrs: { href } }],
          })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .insertContent({
            type: "text",
            text: href,
            marks: [{ type: "link", attrs: { href } }],
          })
          .run();
      }

      setDialogKind(null);
    },
    [editor],
  );

  const handleRemoveLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    setDialogKind(null);
  }, [editor]);

  const handleDialogSubmit = useCallback(
    (values: Record<string, string>) => {
      if (!editor) return;

      if (dialogKind === "link") {
        handleLinkSubmit(values);
        return;
      }

      if (dialogKind === "image") {
        const src = values.src.trim();
        if (src) {
          editor.chain().focus().setImage({ src, alt: values.alt.trim() }).run();
        }
      }

      if (dialogKind === "video") {
        const url = values.url.trim();
        if (url) {
          editor.chain().focus().setYoutubeVideo({ src: url }).run();
        }
      }

      if (dialogKind === "mermaid") {
        const source = values.source.trim();
        if (source) {
          editor
            .chain()
            .focus()
            .insertContent({
              type: "codeBlock",
              attrs: { language: "mermaid" },
              content: [{ type: "text", text: source }],
            })
            .run();
        }
      }

      setDialogKind(null);
    },
    [dialogKind, editor, handleLinkSubmit],
  );

  const insertTable = useCallback(() => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  }, [editor]);

  if (!editor) {
    return (
      <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] text-sm text-[var(--admin-text-muted)]">
        Loading editor…
      </div>
    );
  }

  return (
    <>
      <div
        className={`overflow-hidden rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-sm ${className}`}
      >
        <div className="sticky top-0 z-10 border-b border-[var(--admin-border-subtle)] bg-[var(--admin-panel)]/95 backdrop-blur-sm">
          <div className="flex flex-wrap items-center gap-0.5 px-2 py-2">
            <ToolbarButton
              label="Undo"
              title="Undo (Ctrl+Z)"
              disabled={!editor.can().undo()}
              onClick={() => editor.chain().focus().undo().run()}
            />
            <ToolbarButton
              label="Redo"
              title="Redo (Ctrl+Y)"
              disabled={!editor.can().redo()}
              onClick={() => editor.chain().focus().redo().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="H2"
              title="Heading 2"
              active={editor.isActive("heading", { level: 2 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            />
            <ToolbarButton
              label="H3"
              title="Heading 3"
              active={editor.isActive("heading", { level: 3 })}
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            />
            <ToolbarButton
              label="Bold"
              title="Bold (Ctrl+B)"
              active={editor.isActive("bold")}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
              label="Italic"
              title="Italic (Ctrl+I)"
              active={editor.isActive("italic")}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
              label="Underline"
              title="Underline (Ctrl+U)"
              active={editor.isActive("underline")}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
            <ToolbarButton
              label="Code"
              title="Inline code"
              active={editor.isActive("code")}
              onClick={() => editor.chain().focus().toggleCode().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="Quote"
              title="Blockquote"
              active={editor.isActive("blockquote")}
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            />
            <ToolbarButton
              label="Bullets"
              title="Bullet list"
              active={editor.isActive("bulletList")}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
              label="Numbers"
              title="Numbered list"
              active={editor.isActive("orderedList")}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            />
            <ToolbarButton
              label="Rule"
              title="Horizontal rule"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            />

            <ToolbarDivider />

            <ToolbarButton
              label="Link"
              title="Insert or edit link"
              active={editor.isActive("link")}
              onClick={openLinkDialog}
            />
            <ToolbarButton label="Image" title="Insert image or GIF" onClick={openImageDialog} />
            <ToolbarButton label="Video" title="Embed YouTube" onClick={openVideoDialog} />
            <ToolbarButton label="Diagram" title="Insert Mermaid diagram" onClick={openMermaidDialog} />
            <ToolbarButton
              label="Table"
              title="Insert 3×3 table with header row"
              active={editor.isActive("table")}
              onClick={insertTable}
            />

            {editor.isActive("table") ? (
              <>
                <ToolbarDivider />
                <ToolbarButton
                  label="+Col"
                  title="Add column after"
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                />
                <ToolbarButton
                  label="+Row"
                  title="Add row after"
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                />
                <ToolbarButton
                  label="−Col"
                  title="Delete column"
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                />
                <ToolbarButton
                  label="−Row"
                  title="Delete row"
                  onClick={() => editor.chain().focus().deleteRow().run()}
                />
                <ToolbarButton
                  label="Del table"
                  title="Delete table"
                  onClick={() => editor.chain().focus().deleteTable().run()}
                />
              </>
            ) : null}
          </div>
        </div>

        <EditorContent editor={editor} />

        {placeholder ? (
          <p className="border-t border-[var(--admin-border-subtle)] px-4 py-2 text-[11px] text-[var(--admin-text-muted)]">
            {placeholder}
          </p>
        ) : null}
      </div>

      <EditorInsertDialog
        kind={dialogKind}
        onClose={() => setDialogKind(null)}
        onSubmit={handleDialogSubmit}
        initialValues={dialogInitial}
        canRemoveLink={canRemoveLink}
        onRemoveLink={handleRemoveLink}
      />
    </>
  );
}

export function richDocFromMarkdown(markdown: string): JSONContent {
  return markdown.trim()
    ? markdownToRichDoc(markdown)
    : { type: "doc", content: [{ type: "paragraph" }] };
}
