export default function AdminFallbackLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-md">
        <div className="flex flex-col gap-xs w-full max-w-sm">
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-xl w-3/4"></div>
          <div className="h-4 bg-[#181818] border border-[#323232] rounded-lg w-1/2"></div>
        </div>
        <div className="h-12 bg-[#181818] border border-[#323232] rounded-xl w-32 shrink-0"></div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md h-[400px]">
        <div className="h-6 bg-[#262626] rounded-md w-1/4 mb-md"></div>
        <div className="h-4 bg-[#262626] rounded-md w-full"></div>
        <div className="h-4 bg-[#262626] rounded-md w-5/6"></div>
        <div className="h-4 bg-[#262626] rounded-md w-4/5"></div>
        <div className="h-4 bg-[#262626] rounded-md w-full"></div>
      </div>
    </div>
  );
}
