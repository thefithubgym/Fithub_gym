import { Loader2 } from "lucide-react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0F0F0F] text-[#FFFFFF]">
      <div className="flex flex-col items-center gap-md">
        <Loader2 className="w-12 h-12 text-[#ffc174] animate-spin" />
        <p className="font-sans text-sm uppercase tracking-widest text-[#B3B3B3]">
          Loading FitHub...
        </p>
      </div>
    </div>
  );
}
