export default function NotificationsLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-xl w-80 mb-sm"></div>
          <div className="h-5 bg-[#181818] border border-[#323232] rounded-lg w-full max-w-lg"></div>
        </div>
        <div className="bg-[#181818] border border-[#323232] rounded-xl w-36 h-[44px]"></div>
      </div>

      {/* Table Card Container */}
      <div className="bg-[#181818] border border-[#323232] rounded-xl flex flex-col shadow-sm mt-md w-full max-w-full">
        {/* Table Toolbar controls skeleton */}
        <div className="p-md border-b border-[#323232] flex flex-col md:flex-row gap-md items-center justify-between w-full">
          <div className="flex flex-col sm:flex-row items-center gap-md w-full md:w-auto">
            {/* Search Input skeleton */}
            <div className="h-12 bg-[#262626] rounded-xl w-full sm:w-80"></div>
            {/* Filter buttons/selects skeleton */}
            <div className="h-12 bg-[#262626] rounded-xl w-32"></div>
          </div>
        </div>

        {/* Table Wrapper skeleton */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#131313]/50 border-b border-[#323232]">
              <tr>
                <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Recipient</th>
                <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Message Type</th>
                <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Status</th>
                <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#323232]/50 bg-[#181818]">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-[#323232]/30">
                  <td className="py-md px-lg">
                    <div className="flex flex-col gap-xs">
                      <div className="h-4 bg-[#262626] rounded-md w-32"></div>
                      <div className="h-3 bg-[#262626] rounded-md w-24"></div>
                    </div>
                  </td>
                  <td className="py-md px-lg">
                    <div className="h-4 bg-[#262626] rounded-md w-28"></div>
                  </td>
                  <td className="py-md px-lg">
                    <div className="w-16 h-6 bg-[#262626] rounded-md"></div>
                  </td>
                  <td className="py-md px-lg">
                    <div className="h-4 bg-[#262626] rounded-md w-24"></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination skeleton */}
        <div className="p-md border-t border-[#323232] flex items-center justify-between">
          <div className="h-4 bg-[#262626] rounded-md w-40"></div>
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 bg-[#262626] rounded-lg"></div>
            <div className="h-4 bg-[#262626] rounded-md w-12 text-center"></div>
            <div className="w-10 h-10 bg-[#262626] rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
