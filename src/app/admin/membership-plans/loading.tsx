export default function MembershipPlansLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-xl w-64 mb-sm"></div>
          <div className="h-5 bg-[#181818] border border-[#323232] rounded-lg w-72"></div>
        </div>
        <div className="bg-[#181818] border border-[#323232] rounded-xl w-32 h-[44px]"></div>
      </div>

      {/* Grid containing Single & Couple Plans Table skeletons */}
      <div className="grid grid-cols-1 gap-lg">
        {/* Single Plans Section */}
        <div>
          <div className="h-6 bg-[#181818] border border-[#323232] rounded-md w-36 mb-md"></div>
          <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#131313]/50 border-b border-[#323232]">
                <tr>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Name</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Duration</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Price</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold hidden md:table-cell w-1/4">Description</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold text-right w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#323232]/50 bg-[#181818]">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="border-b border-[#323232]/30">
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-28"></div>
                    </td>
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                    </td>
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-16"></div>
                    </td>
                    <td className="py-md px-lg hidden md:table-cell">
                      <div className="h-4 bg-[#262626] rounded-md w-44"></div>
                    </td>
                    <td className="py-md px-lg text-right">
                      <div className="flex justify-end gap-sm">
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Couple Plans Section */}
        <div>
          <div className="h-6 bg-[#181818] border border-[#323232] rounded-md w-36 mb-md"></div>
          <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#131313]/50 border-b border-[#323232]">
                <tr>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Name</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Duration</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold w-1/4">Price</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold hidden md:table-cell w-1/4">Description</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-widest font-semibold text-right w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#323232]/50 bg-[#181818]">
                {[1, 2].map((i) => (
                  <tr key={i} className="border-b border-[#323232]/30">
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-28"></div>
                    </td>
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                    </td>
                    <td className="py-md px-lg">
                      <div className="h-4 bg-[#262626] rounded-md w-16"></div>
                    </td>
                    <td className="py-md px-lg hidden md:table-cell">
                      <div className="h-4 bg-[#262626] rounded-md w-44"></div>
                    </td>
                    <td className="py-md px-lg text-right">
                      <div className="flex justify-end gap-sm">
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                        <div className="w-8 h-8 rounded-full bg-[#262626]"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
