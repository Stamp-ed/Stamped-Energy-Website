"use client";

import { useCallback, useState } from "react";

import { ClipboardIcon } from "@/components/blog/admin/ui/ClipboardIcon";
import { AI_DISCOVERY_WORKFLOW_STEPS } from "@/lib/admin/ai-discovery";
import {
  buildAiBlogWriterPrompt,
  parseAiBlogOutput,
  type AiBlogImport,
} from "@/lib/blog/ai-workflow";
import {
  buildAiCaseStudyWriterPrompt,
  parseAiCaseStudyOutput,
  type AiCaseStudyImport,
} from "@/lib/case-studies/ai-workflow";

type AiWriterAssistantProps =
  | {
      variant: "blog";
      onImport: (data: AiBlogImport) => void;
    }
  | {
      variant: "case-study";
      onImport: (data: AiCaseStudyImport) => void;
    };

const CONFIG = {
  blog: {
    label: "blog post",
    topicPlaceholder: "e.g. Weekend furnace holding waste in heat treatment plants",
    pastePlaceholder: `---
title: Your title
slug: your-slug
excerpt: Preview text...
category: plant-intelligence
tags: tag one, tag two
status: draft
featured: false
cover_image: /industries/forging.jpg
---

## First section

Markdown body...`,
    buildPrompt: buildAiBlogWriterPrompt,
    parseOutput: parseAiBlogOutput,
  },
  "case-study": {
    label: "case study",
    topicPlaceholder: "e.g. Die casting plant MD spike from shift-start overlap",
    pastePlaceholder: `---
title: Your outcome-led title
slug: your-slug
excerpt: Preview text...
category: unit-economics
industry: Die casting supplier, NCR
client_context: One-line plant summary
tag: Field pilot
status: draft
featured: false
cover_image: /industries/die-casting.jpeg
cover_image_alt: Plant floor description
metrics_json: [{"label":"Monthly savings","value":"₹8–12L"}]
outcomes_json: ["Outcome one","Outcome two"]
disclaimer: Reference benchmark until client approval.
---

## The problem

Markdown body...`,
    buildPrompt: buildAiCaseStudyWriterPrompt,
    parseOutput: parseAiCaseStudyOutput,
  },
} as const;

export function AiWriterAssistant(props: AiWriterAssistantProps) {
  const config = CONFIG[props.variant];
  const [topic, setTopic] = useState("");
  const [pasteValue, setPasteValue] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(true);

  const handleCopyPrompt = useCallback(async () => {
    const prompt = config.buildPrompt(topic);
    try {
      await navigator.clipboard.writeText(prompt);
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2500);
    } catch {
      setCopyState("error");
      setTimeout(() => setCopyState("idle"), 2500);
    }
  }, [config, topic]);

  const handleImport = useCallback(() => {
    const { data, warnings } = config.parseOutput(pasteValue);
    const hasContent =
      props.variant === "blog"
        ? !!(data as AiBlogImport).title || !!(data as AiBlogImport).content
        : !!(data as AiCaseStudyImport).title || !!(data as AiCaseStudyImport).content;

    if (!hasContent) {
      setImportMessage("Could not parse anything. Check the AI used the YAML frontmatter format.");
      return;
    }

    if (props.variant === "blog") {
      props.onImport(data as AiBlogImport);
    } else {
      props.onImport(data as AiCaseStudyImport);
    }

    setImportMessage(
      warnings.length > 0
        ? `Imported with notes: ${warnings.join(" ")}`
        : "Imported successfully. Review fields, then save.",
    );
    setPasteValue("");
  }, [config, pasteValue, props]);

  const copyLabel =
    copyState === "copied"
      ? "Prompt copied"
      : copyState === "error"
        ? "Copy failed"
        : "Copy AI writer prompt";

  return (
    <div className="admin-panel overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-[var(--admin-panel)]"
      >
        <div>
          <p className="text-sm font-semibold text-[var(--admin-text)]">Write with AI</p>
          <p className="mt-0.5 text-xs text-[var(--admin-text-muted)]">
            Copy prompt → answer discovery questions in ChatGPT/Claude → import final response
          </p>
        </div>
        <span className="text-xs font-medium text-[var(--admin-text-muted)]">
          {expanded ? "Hide" : "Show"}
        </span>
      </button>

      {expanded ? (
        <div className="space-y-5 border-t border-[var(--admin-border-subtle)] px-5 py-5">
          <ol className="grid gap-3 text-xs text-[var(--admin-text-secondary)] sm:grid-cols-3">
            {AI_DISCOVERY_WORKFLOW_STEPS.map((item) => (
              <li key={item.step} className="rounded-lg bg-[var(--admin-panel)] px-3 py-2.5">
                <span className="font-semibold text-[var(--admin-text)]">{item.step}</span>
                <p className="mt-1">{item.detail}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-lg border border-[var(--admin-border-subtle)] bg-[var(--admin-panel)] px-4 py-3 text-xs leading-relaxed text-[var(--admin-text-secondary)]">
            <p className="font-semibold text-[var(--admin-text)]">What the AI will ask you</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>What outcome should the reader achieve?</li>
              <li>What must they understand or know?</li>
              <li>Who is the audience?</li>
              <li>How technical should it be?</li>
              <li>Should we include diagrams or GIFs?</li>
            </ul>
            <p className="mt-2">
              Go back and forth until you are satisfied, then paste the final {config.label} package
              below.
            </p>
          </div>

          <div>
            <label
              htmlFor={`ai-topic-${props.variant}`}
              className="mb-1.5 block text-xs font-medium text-[var(--admin-text-secondary)]"
            >
              Seed topic (optional, included in prompt)
            </label>
            <input
              id={`ai-topic-${props.variant}`}
              type="text"
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder={config.topicPlaceholder}
              className="admin-input"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={handleCopyPrompt} className="admin-btn admin-btn-primary">
              <ClipboardIcon className="h-3.5 w-3.5" />
              {copyLabel}
            </button>
          </div>

          <div>
            <label
              htmlFor={`ai-paste-${props.variant}`}
              className="mb-1.5 block text-xs font-medium text-[var(--admin-text-secondary)]"
            >
              Paste final AI response here
            </label>
            <textarea
              id={`ai-paste-${props.variant}`}
              rows={8}
              value={pasteValue}
              onChange={(event) => {
                setPasteValue(event.target.value);
                setImportMessage(null);
              }}
              placeholder={config.pastePlaceholder}
              className="w-full rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 font-mono text-xs text-[var(--admin-text)] outline-none focus:border-[var(--admin-accent)] focus:shadow-[0_0_0_3px_var(--admin-focus)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleImport}
              disabled={!pasteValue.trim()}
              className="admin-btn admin-btn-secondary disabled:opacity-50"
            >
              Import into editor
            </button>
            {importMessage ? (
              <p className="text-xs text-[var(--admin-text-secondary)]">{importMessage}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use AiWriterAssistant with variant="blog" */
export function AiBlogAssistant(props: { onImport: (data: AiBlogImport) => void }) {
  return <AiWriterAssistant variant="blog" onImport={props.onImport} />;
}
