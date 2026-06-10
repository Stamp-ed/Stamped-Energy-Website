import type { Metadata } from "next";

import { SITE_ORIGIN } from "@/lib/config/admin-host";
import { siteConfig } from "@/lib/content";

export function absoluteUrl(path: string): string {
  const base = SITE_ORIGIN.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type,
      siteName: siteConfig.name,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title: `${title} | ${siteConfig.name}`,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

export const siteMetadataBase: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
};
