import { Calendar, Users } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-md">
        <div className="flex-1">
          <div className="h-9 bg-[#181818] border border-[#323232] rounded-xl w-48 mb-xs"></div>
          <div className="h-5 bg-[#181818] border border-[#323232] rounded-lg w-80"></div>
        </div>
        <div className="flex items-center gap-sm bg-[#181818] border border-[#323232] px-md py-sm rounded-lg w-44 h-10 self-start md:self-auto">
          <Calendar className="w-[18px] h-[18px] text-zinc-700" />
          <div className="h-4 bg-[#262626] rounded w-24"></div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col h-[142px]">
            <div className="flex justify-between items-start mb-md">
              <div className="w-10 h-10 rounded-full bg-[#262626]"></div>
              <div className="w-16 h-6 bg-[#262626] rounded-md"></div>
            </div>
            <div className="h-4 bg-[#262626] rounded-md w-28 mb-xs"></div>
            <div className="h-8 bg-[#262626] rounded-lg w-20"></div>
          </div>
        ))}
      </div>

      {/* Charts & Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg">
        {/* Main Chart Card Skeleton */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl p-lg col-span-1 lg:col-span-8 flex flex-col min-h-[350px]">
          <div className="flex justify-between items-center mb-lg">
            <div>
              <div className="h-6 bg-[#262626] rounded-md w-36 mb-xs"></div>
              <div className="h-4 bg-[#262626] rounded-md w-28"></div>
            </div>
            <div className="w-24 h-8 bg-[#262626] rounded-md"></div>
          </div>
          {/* Mock Chart Area */}
          <div className="flex-1 w-full bg-[#131313]/50 border border-[#262626] rounded-xl flex items-center justify-center min-h-[200px]">
            <div className="w-full h-32 flex items-end justify-between px-lg gap-sm">
              {[60, 45, 75, 55, 90, 80, 70, 85, 60, 95].map((h, i) => (
                <div key={i} className="bg-[#262626] rounded-t w-full" style={{ height: `${h}%` }}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel Skeleton */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-md md:gap-lg">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col h-full justify-between">
            <div className="h-6 bg-[#262626] rounded-md w-32 mb-lg"></div>
            <div className="flex flex-col gap-sm flex-1 justify-center">
              <div className="h-12 bg-[#262626] rounded-lg w-full"></div>
              <div className="h-12 bg-[#262626] rounded-lg w-full"></div>
              <div className="h-12 bg-[#262626] rounded-lg w-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md md:gap-lg">
        {/* Recent Members Table Skeleton */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden">
          <div className="p-lg border-b border-[#323232] flex justify-between items-center">
            <div className="h-6 bg-[#262626] rounded-md w-44"></div>
            <div className="h-4 bg-[#262626] rounded-md w-16"></div>
          </div>
          <div className="p-lg flex flex-col gap-md">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-xs border-b border-[#323232]/50 last:border-0">
                <div className="flex flex-col gap-xs">
                  <div className="h-4 bg-[#262626] rounded-md w-32"></div>
                  <div className="h-3 bg-[#262626] rounded-md w-24"></div>
                </div>
                <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                <div className="w-16 h-6 bg-[#262626] rounded-md"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Renewals Table Skeleton */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden">
          <div className="p-lg border-b border-[#323232] flex justify-between items-center">
            <div className="h-6 bg-[#262626] rounded-md w-44"></div>
            <div className="h-4 bg-[#262626] rounded-md w-16"></div>
          </div>
          <div className="p-lg flex flex-col gap-md">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-xs border-b border-[#323232]/50 last:border-0">
                <div className="h-4 bg-[#262626] rounded-md w-36"></div>
                <div className="h-4 bg-[#262626] rounded-md w-24"></div>
                <div className="h-4 bg-[#262626] rounded-md w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
