import { ArrowLeft } from "lucide-react";

export default function MemberDetailLoading() {
  return (
    <div className="flex flex-col gap-lg w-full pb-xl animate-pulse">
      {/* Back & Actions Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md">
        <div className="flex items-center gap-xs text-zinc-700 font-label-md text-sm self-start">
          <ArrowLeft className="w-4 h-4 text-zinc-700" />
          <div className="h-4 bg-[#181818] border border-[#323232] rounded w-24"></div>
        </div>
        <div className="flex gap-sm self-end sm:self-auto">
          <div className="w-24 h-12 bg-[#181818] border border-[#323232] rounded-xl"></div>
          <div className="w-44 h-12 bg-[#181818] border border-[#323232] rounded-xl"></div>
        </div>
      </div>

      {/* Main Profile Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column: Member Card & Profile Details (7 columns) */}
        <div className="lg:col-span-7 flex flex-col gap-lg">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-lg">
            <div className="flex items-center justify-between border-b border-[#323232] pb-sm">
              <div className="h-6 bg-[#262626] rounded-md w-44"></div>
              <div className="h-4 bg-[#262626] rounded-md w-16"></div>
            </div>
            
            <div className="flex items-center gap-md">
              <div className="w-20 h-20 rounded-full bg-[#262626]"></div>
              <div className="flex flex-col gap-xs">
                <div className="h-6 bg-[#262626] rounded-md w-40"></div>
                <div className="h-4 bg-[#262626] rounded-md w-24"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md mt-md">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex gap-sm items-start">
                  <div className="w-5 h-5 rounded bg-[#262626] shrink-0 mt-0.5"></div>
                  <div className="flex flex-col gap-xs">
                    <div className="h-3 bg-[#262626] rounded w-16"></div>
                    <div className="h-4 bg-[#262626] rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Membership & Quick Actions (5 columns) */}
        <div className="lg:col-span-5 flex flex-col gap-lg">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md">
            <div className="h-6 bg-[#262626] rounded-md w-40 mb-xs"></div>
            <div className="h-24 bg-[#131313] border border-[#323232] rounded-xl p-md flex items-center justify-between">
              <div className="flex flex-col gap-xs">
                <div className="h-4 bg-[#262626] rounded w-20"></div>
                <div className="h-6 bg-[#262626] rounded w-28"></div>
              </div>
              <div className="w-20 h-8 bg-[#262626] rounded-full"></div>
            </div>
            <div className="flex flex-col gap-xs mt-md">
              <div className="h-3 bg-[#262626] rounded w-24"></div>
              <div className="h-4 bg-[#262626] rounded w-full"></div>
            </div>
            <div className="flex flex-col gap-xs">
              <div className="h-3 bg-[#262626] rounded w-24"></div>
              <div className="h-4 bg-[#262626] rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
