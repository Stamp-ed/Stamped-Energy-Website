"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Something went wrong</p>
      <h1 className="mt-3 max-w-md text-2xl font-bold text-on-surface">This page did not load correctly</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-on-surface-variant">
        Try again or refresh the page. If the problem continues, navigate from the home page.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-md border-2 border-primary bg-primary px-5 text-sm font-semibold text-on-primary"
        >
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-md border-2 border-primary px-5 text-sm font-semibold text-primary"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
