"use client";

import Link from "next/link";

import type { AuthorProfile } from "@/lib/content/author-profiles";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type ArticleAuthorCardProps = {
  author: AuthorProfile;
};

export function ArticleAuthorCard({ author }: ArticleAuthorCardProps) {
  return (
    <div className="rounded-2xl border border-outline-variant/50 bg-surface-low p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
        Written by
      </p>
      <p className="mt-1 font-bold text-on-surface">{author.name}</p>
      <p className="mt-0.5 text-xs font-semibold text-primary">{author.role}</p>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{author.shortBio}</p>
      <Link
        href={author.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant transition-colors hover:text-primary"
      >
        <LinkedInIcon className="h-4 w-4" />
        LinkedIn
      </Link>
    </div>
  );
}
