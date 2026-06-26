"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import BroadcastModal from "./BroadcastModal";

export default function NewBroadcastButton() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-lg py-md rounded-xl flex items-center gap-sm active:scale-95 transition-transform shrink-0 cursor-pointer hover:bg-primary"
      >
        <Send className="w-[18px] h-[18px]" />
        New Broadcast
      </button>

      <BroadcastModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}
