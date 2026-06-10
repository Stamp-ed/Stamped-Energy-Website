import "@/styles/rich-article.css";

import { useMemo } from "react";

import {
  getRenderableBody,
  richDocToHtml,
  type ContentFormat,
} from "@/lib/rich-content/document";

type RichArticleBodyProps = {
  contentFormat?: ContentFormat;
  bodyJson?: string | null;
  content?: string;
  className?: string;
  reading?: boolean;
};

export function RichArticleBody({
  contentFormat = "RICH",
  bodyJson,
  content = "",
  className = "",
  reading = true,
}: RichArticleBodyProps) {
  const html = useMemo(() => {
    const { doc } = getRenderableBody({
      contentFormat,
      bodyJson: bodyJson ?? null,
      content,
    });
    return richDocToHtml(doc);
  }, [contentFormat, bodyJson, content]);

  return (
    <div className={reading ? `rich-article-reading ${className}`.trim() : className}>
      <div
        className="rich-article"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
