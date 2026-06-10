import Link from "next/link";

import type { ContactSubmissionRecord } from "@/lib/contact/submissions";
import {
  emptyDisplay,
  formatInquiryDate,
  formatInquiryRelative,
} from "@/lib/contact/format";

type ContactInquiryDashboardTableProps = {
  inquiries: ContactSubmissionRecord[];
};

export function ContactInquiryDashboardTable({
  inquiries,
}: ContactInquiryDashboardTableProps) {
  if (inquiries.length === 0) {
    return (
      <div className="admin-panel px-4 py-10 text-center">
        <p className="text-sm text-[var(--admin-text-secondary)]">
          No inbound inquiries yet. Submissions from the contact form will appear here.
        </p>
        <Link
          href="/contact"
          target="_blank"
          className="mt-3 inline-block text-sm font-medium text-[var(--admin-accent)] hover:underline"
        >
          View public contact page
        </Link>
      </div>
    );
  }

  return (
    <div className="admin-panel overflow-hidden">
      <div className="overflow-x-auto">
        <table className="admin-table min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left">Received</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="hidden px-4 py-3 text-left md:table-cell">Contact</th>
              <th className="px-4 py-3 text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="whitespace-nowrap px-4 py-3.5 text-[var(--admin-text-muted)]">
                  <time
                    dateTime={new Date(inquiry.createdAt).toISOString()}
                    title={formatInquiryDate(inquiry.createdAt)}
                  >
                    {formatInquiryRelative(inquiry.createdAt)}
                  </time>
                </td>
                <td className="px-4 py-3.5 font-medium text-[var(--admin-text)]">
                  {inquiry.name}
                </td>
                <td className="px-4 py-3.5 text-[var(--admin-text-secondary)]">
                  {inquiry.company}
                </td>
                <td className="hidden px-4 py-3.5 text-[var(--admin-text-secondary)] md:table-cell">
                  {emptyDisplay(inquiry.whatsapp ?? inquiry.email)}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <Link
                    href={`/blog/admin/inquiries?id=${inquiry.id}`}
                    className="text-sm font-medium text-[var(--admin-accent)] hover:underline"
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
