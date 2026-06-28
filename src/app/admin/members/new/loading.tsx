import { ArrowLeft } from "lucide-react";

export default function NewMemberLoading() {
  return (
    <div className="flex flex-col gap-lg w-full animate-pulse pb-xl">
      {/* Back button skeleton */}
      <div className="flex items-center gap-xs text-zinc-700 font-label-md text-sm self-start">
        <ArrowLeft className="w-4 h-4 text-zinc-700" />
        <div className="h-4 bg-[#181818] border border-[#323232] rounded w-24"></div>
      </div>

      {/* Main Grid: Left Column for Forms, Right Column for Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg mt-sm">
        <div className="lg:col-span-8 flex flex-col gap-lg">
          {/* Card: Membership Type */}
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md">
            <div className="h-6 bg-[#262626] rounded-md w-40 mb-sm"></div>
            <div className="flex gap-md">
              <div className="h-14 bg-[#262626] rounded-xl flex-1"></div>
              <div className="h-14 bg-[#262626] rounded-xl flex-1"></div>
            </div>
          </div>

          {/* Card: Member Details */}
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md">
            <div className="h-6 bg-[#262626] rounded-md w-44 mb-sm"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
              </div>
              <div className="flex flex-col gap-xs">
                <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
              </div>
              <div className="flex flex-col gap-xs">
                <div className="h-4 bg-[#262626] rounded-md w-24"></div>
                <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
              </div>
              <div className="flex flex-col gap-xs">
                <div className="h-4 bg-[#262626] rounded-md w-20"></div>
                <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Plans */}
        <div className="lg:col-span-4 flex flex-col gap-lg">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md h-[400px]">
            <div className="h-6 bg-[#262626] rounded-md w-40 mb-md"></div>
            <div className="h-20 bg-[#262626] rounded-xl w-full"></div>
            <div className="h-20 bg-[#262626] rounded-xl w-full"></div>
            <div className="h-12 bg-[#262626] rounded-xl w-full mt-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
