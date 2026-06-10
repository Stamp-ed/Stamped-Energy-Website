import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";
import { generateHTML } from "@tiptap/html";

export type { JSONContent };

export type ContentFormat = "MARKDOWN" | "RICH";

export const RICH_EXTENSIONS = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    HTMLAttributes: { class: "rich-link" },
  }),
  Image.configure({
    HTMLAttributes: { class: "rich-image" },
  }),
  Youtube.configure({
    HTMLAttributes: { class: "rich-video" },
  }),
  Placeholder.configure({
    placeholder: "Tell your story…",
  }),
];

export const EMPTY_RICH_DOC: JSONContent = {
  type: "doc",
  content: [{ type: "paragraph" }],
};

export function parseRichDoc(raw: string | null | undefined): JSONContent {
  if (!raw?.trim()) {
    return EMPTY_RICH_DOC;
  }
  try {
    return JSON.parse(raw) as JSONContent;
  } catch {
    return EMPTY_RICH_DOC;
  }
}

export function serializeRichDoc(doc: JSONContent): string {
  return JSON.stringify(doc);
}

export function richDocToPlainText(doc: JSONContent): string {
  const walk = (node: JSONContent): string => {
    if (node.type === "text" && node.text) {
      return node.text;
    }
    if (!node.content?.length) {
      return "";
    }
    const inner = node.content.map(walk).join(" ");
    if (node.type === "paragraph" || node.type === "heading") {
      return `${inner}\n`;
    }
    return inner;
  };
  return walk(doc).trim();
}

export function estimateReadTimeFromDoc(doc: JSONContent): number {
  const words = richDocToPlainText(doc).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function richDocToHtml(doc: JSONContent): string {
  return generateHTML(doc, RICH_EXTENSIONS);
}

/** Basic markdown → TipTap for AI import and legacy posts */
export function markdownToRichDoc(markdown: string): JSONContent {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const content: JSONContent[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: { type: "bullet" | "ordered"; items: string[] } | null = null;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      content.push({
        type: "paragraph",
        content: [{ type: "text", text: paragraphBuffer.join(" ").trim() }],
      });
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (!listBuffer?.items.length) {
      listBuffer = null;
      return;
    }
    content.push({
      type: listBuffer.type === "ordered" ? "orderedList" : "bulletList",
      content: listBuffer.items.map((item) => ({
        type: "listItem",
        content: [{ type: "paragraph", content: [{ type: "text", text: item }] }],
      })),
    });
    listBuffer = null;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = trimmed.match(/^#{2,3}\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = trimmed.startsWith("###") ? 3 : 2;
      content.push({
        type: "heading",
        attrs: { level },
        content: [{ type: "text", text: heading[1] }],
      });
      continue;
    }

    const image = trimmed.match(/^!\[(.*?)\]\((.+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      content.push({
        type: "image",
        attrs: { src: image[2], alt: image[1] || "" },
      });
      continue;
    }

    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== "bullet") {
        flushList();
        listBuffer = { type: "bullet", items: [] };
      }
      listBuffer.items.push(bullet[1]);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (!listBuffer || listBuffer.type !== "ordered") {
        flushList();
        listBuffer = { type: "ordered", items: [] };
      }
      listBuffer.items.push(ordered[1]);
      continue;
    }

    flushList();
    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  flushList();

  return content.length ? { type: "doc", content } : EMPTY_RICH_DOC;
}

export function getRenderableBody(input: {
  contentFormat: ContentFormat;
  bodyJson: string | null;
  content: string;
}): { format: ContentFormat; doc: JSONContent; markdown: string } {
  if (input.contentFormat === "RICH" && input.bodyJson) {
    return {
      format: "RICH",
      doc: parseRichDoc(input.bodyJson),
      markdown: input.content,
    };
  }
  const doc = markdownToRichDoc(input.content);
  return { format: "MARKDOWN", doc, markdown: input.content };
}
