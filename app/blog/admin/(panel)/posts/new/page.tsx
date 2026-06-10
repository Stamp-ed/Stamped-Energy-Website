import type { Metadata } from "next";

import { PostEditor } from "@/components/blog/admin/PostEditor";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";

export const metadata: Metadata = {
  title: "New Blog Post",
  robots: { index: false, follow: false },
};

export default function NewBlogPostPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title="New post"
        description="Write in Markdown. Preview before publishing."
        secondaryAction={{ label: "Back to posts", href: "/blog/admin/posts" }}
      />
      <PostEditor mode="create" />
    </div>
  );
}
