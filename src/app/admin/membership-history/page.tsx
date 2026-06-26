import Link from "next/link";
import { MembershipService } from "@/services/membership.service";
import { ChevronLeft, ChevronRight, History, Calendar, CheckCircle } from "lucide-react";

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function MembershipHistoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page || "1");

  const result = await MembershipService.getMembershipHistoryLog({
    page,
    limit: 10,
  });

  const prevPage = page > 1 ? page - 1 : 1;
  const nextPage = page < result.totalPages ? page + 1 : result.totalPages;

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Page Header */}
      <div>
        <h2 className="font-display text-4xl font-extrabold text-on-background uppercase tracking-tight">Membership History</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
          Audit log of all registered membership transactions, renewals, and fees.
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-surface border border-outline-variant rounded-xl flex flex-col shadow-sm mt-md overflow-hidden w-full max-w-full">
        {/* Table Header toolbar */}
        <div className="p-lg border-b border-outline-variant flex items-center justify-between bg-surface-container-lowest">
          <h3 className="font-headline-md text-base font-bold text-white flex items-center gap-xs">
            <History className="w-5 h-5 text-primary" />
            Transaction History
          </h3>
        </div>

        {/* Table Wrapper */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead className="bg-surface-container border-b border-outline-variant">
              <tr>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Date</th>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Member</th>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Plan Name</th>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Period</th>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Method</th>
                <th className="py-md px-lg font-label-sm text-xs text-on-surface-variant uppercase tracking-widest font-semibold text-right">Paid Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant font-body-md text-sm bg-surface">
              {result.data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-xl text-center text-on-surface-variant">
                    No transactions found in history.
                  </td>
                </tr>
              ) : (
                result.data.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-lowest transition-colors">
                    <td className="py-md px-lg text-on-surface-variant">
                      {new Date(log.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-md px-lg font-medium text-white">
                      <Link href={`/admin/members/${log.memberId}`} className="hover:text-primary transition-colors">
                        {log.memberName}
                      </Link>
                    </td>
                    <td className="py-md px-lg text-on-surface">
                      {log.planName}
                    </td>
                    <td className="py-md px-lg text-on-surface-variant">
                      {new Date(log.startDate).toLocaleDateString()} to {new Date(log.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-md px-lg text-on-surface-variant font-semibold">
                      {log.paymentMethod}
                    </td>
                    <td className="py-md px-lg text-right font-bold text-primary-container">
                      ₹{(log.amount + log.registrationFee).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {result.totalPages > 1 && (
          <div className="p-lg border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between">
            <p className="font-label-md text-label-md text-on-surface-variant">
              Showing <span className="text-on-background font-bold">{((page - 1) * 10) + 1}</span> to <span className="text-on-background font-bold">{Math.min(page * 10, result.total)}</span> of <span className="text-on-background font-bold">{result.total}</span> transactions
            </p>
            <div className="flex items-center gap-xs">
              <Link
                href={`/admin/membership-history?page=${prevPage}`}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors ${
                  page === 1 ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <ChevronLeft className="w-[18px] h-[18px]" />
              </Link>
              
              {Array.from({ length: result.totalPages }, (_, idx) => idx + 1).map((p) => {
                const isCurrent = p === page;
                return (
                  <Link
                    key={p}
                    href={`/admin/membership-history?page=${p}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg font-label-md font-bold transition-colors ${
                      isCurrent
                        ? "bg-primary-container text-on-primary-container"
                        : "border border-outline-variant text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {p}
                  </Link>
                );
              })}

              <Link
                href={`/admin/membership-history?page=${nextPage}`}
                className={`w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors ${
                  page === result.totalPages ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <ChevronRight className="w-[18px] h-[18px]" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
