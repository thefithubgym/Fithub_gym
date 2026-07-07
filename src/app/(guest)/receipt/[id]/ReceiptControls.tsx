"use client";

import { Download } from "lucide-react";

interface ReceiptControlsProps {
  whatsappUrl: string;
}

export default function ReceiptControls({ whatsappUrl }: ReceiptControlsProps) {
  return (
    <div className="no-print w-full max-w-[148mm] mx-auto flex justify-center gap-sm mb-xl">
      <button
        onClick={() => window.print()}
        className="flex items-center gap-xs px-md py-sm rounded-lg border border-primary-container text-primary-container hover:bg-primary-container/10 transition-all font-label-md cursor-pointer text-xs font-semibold uppercase tracking-wider"
      >
        <Download className="w-4 h-4" />
        <span>Download PDF</span>
      </button>

      {whatsappUrl ? (
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-xs px-md py-sm rounded-lg border border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all font-label-md cursor-pointer text-xs font-semibold uppercase tracking-wider"
        >
          {/* Custom WhatsApp Icon SVG or Material Chat icon */}
          <span className="material-symbols-outlined text-[16px] -mt-[1px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            chat
          </span>
          <span>Share on WhatsApp</span>
        </a>
      ) : (
        <button
          disabled
          className="flex items-center gap-xs px-md py-sm rounded-lg border border-stone-800 text-stone-600 transition-all font-label-md cursor-not-allowed text-xs font-semibold uppercase tracking-wider"
          title="No phone number registered for member"
        >
          <span className="material-symbols-outlined text-[16px] -mt-[1px]">
            chat
          </span>
          <span>No WhatsApp</span>
        </button>
      )}
    </div>
  );
}


