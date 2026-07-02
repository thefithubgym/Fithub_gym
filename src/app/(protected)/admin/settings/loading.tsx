export default function SettingsLoading() {
  return (
    <div className="flex flex-col gap-lg w-full max-w-4xl mx-auto animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-10 bg-[#181818] border border-[#323232] rounded-xl w-64 mb-sm"></div>
        <div className="h-5 bg-[#181818] border border-[#323232] rounded-lg w-full max-w-md"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="flex border-b border-[#323232] gap-sm mt-md pb-xs">
        <div className="h-10 bg-[#181818] border border-[#323232] rounded-lg w-36"></div>
        <div className="h-10 bg-[#181818] border border-[#323232] rounded-lg w-40"></div>
      </div>

      {/* Form Card Skeleton */}
      <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md">
        <div className="h-6 bg-[#262626] rounded-md w-40 mb-md"></div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-xs">
            <div className="h-4 bg-[#262626] rounded-md w-24"></div>
            <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
          </div>
        ))}
        <div className="h-12 bg-[#262626] rounded-xl w-32 mt-lg self-start"></div>
      </div>
    </div>
  );
}
