"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-md">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-surface border border-outline-variant rounded-2xl p-lg shadow-2xl w-full max-w-md z-10 text-left flex flex-col gap-md"
          >
            {/* Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 text-secondary hover:text-white transition-colors cursor-pointer border-none bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon + Title */}
            <div className="flex items-start gap-md">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  isDestructive
                    ? "bg-error/10 border-error/20 text-error"
                    : "bg-primary-container/10 border-primary-container/20 text-primary"
                }`}
              >
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-xs min-w-0 pr-6">
                <h3 className="font-display text-md font-bold text-white uppercase tracking-wide">
                  {title}
                </h3>
                <p className="font-body-md text-xs text-secondary leading-relaxed">
                  {message}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-md justify-end border-t border-[#323232] pt-md mt-sm">
              <button
                type="button"
                onClick={onCancel}
                className="border border-[#323232] text-white font-bold rounded-xl px-lg py-sm hover:bg-[#262626] transition-colors text-xs cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                }}
                className={`font-bold rounded-xl px-lg py-sm transition-all text-xs cursor-pointer active:scale-98 ${
                  isDestructive
                    ? "bg-error-container text-white hover:bg-error"
                    : "bg-primary-container text-on-primary-container hover:bg-primary"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
