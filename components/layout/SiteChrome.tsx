"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isBlogAdmin = pathname.startsWith("/blog/admin");

  if (isBlogAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-w-0 overflow-x-clip">{children}</main>
      <Footer />
    </>
  );
}
