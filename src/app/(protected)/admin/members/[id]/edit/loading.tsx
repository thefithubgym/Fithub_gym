import { ArrowLeft } from "lucide-react";

export default function EditMemberLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse pb-xl">
      {/* Back button skeleton */}
      <div className="flex items-center gap-xs text-zinc-700 font-label-md text-sm self-start">
        <ArrowLeft className="w-4 h-4 text-zinc-700" />
        <div className="h-4 bg-[#181818] border border-[#323232] rounded w-24"></div>
      </div>

      {/* Main card form skeleton */}
      <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md max-w-4xl w-full mx-auto">
        <div className="h-7 bg-[#262626] rounded-md w-48 mb-md"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex flex-col gap-xs">
              <div className="h-4 bg-[#262626] rounded-md w-24"></div>
              <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-md mt-lg border-t border-[#323232] pt-md">
          <div className="h-12 bg-[#262626] rounded-xl w-24"></div>
          <div className="h-12 bg-[#262626] rounded-xl w-32"></div>
        </div>
      </div>
    </div>
  );
}
