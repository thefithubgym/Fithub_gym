"use client";

import { useState, useEffect } from "react";
import { X, Search, CheckSquare, Square, Users, Send, Loader2 } from "lucide-react";
import { getBroadcastRecipientsAction, sendBroadcastAction } from "@/features/notifications/actions";

interface Recipient {
  id: string;
  name: string;
  phone: string;
}

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function BroadcastModal({ isOpen, onClose, onSuccess }: BroadcastModalProps) {
  const [loading, setLoading] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [statusReport, setStatusReport] = useState<{ sent: number; failed: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadRecipients();
    }
  }, [isOpen]);

  const loadRecipients = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getBroadcastRecipientsAction();
      if (res.error) {
        setError(res.error);
      } else if (res.data) {
        setRecipients(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load recipients.");
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipients = recipients.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  );

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredRecipients.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredRecipients.map(r => r.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIds.length === 0) {
      setError("Please select at least one recipient.");
      return;
    }
    if (!message.trim()) {
      setError("Message content cannot be empty.");
      return;
    }

    setError(null);
    setSending(true);
    setStatusReport(null);

    try {
      const res = await sendBroadcastAction({
        memberIds: selectedIds,
        message,
      });

      if (res.error) {
        setError(res.error);
      } else {
        const successRes = res as { sent: number; failed: number };
        setStatusReport({
          sent: successRes.sent,
          failed: successRes.failed,
        });
        // Clear message & selections
        setMessage("");
        setSelectedIds([]);
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-md">
      <div className="bg-[#181818] border border-[#323232] rounded-2xl w-full max-w-2xl relative flex flex-col max-h-[85vh] overflow-hidden animate-fade-in shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center px-lg py-md border-b border-[#323232] shrink-0">
          <div className="flex items-center gap-sm">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-bold text-white uppercase tracking-tight">Send WhatsApp Broadcast</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-lg flex flex-col gap-lg">
          {error && (
            <div className="bg-error-container/20 border border-error/30 text-error text-xs p-sm rounded-lg">
              {error}
            </div>
          )}

          {statusReport && (
            <div className="bg-primary-container/10 border border-primary/20 text-on-primary-container p-md rounded-xl">
              <h4 className="font-bold text-sm">Broadcast Completed</h4>
              <p className="text-xs text-secondary mt-xs">
                Successfully dispatched: <span className="text-white font-bold">{statusReport.sent}</span> | Failed: <span className="text-error font-bold">{statusReport.failed}</span>
              </p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-xl">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-secondary text-sm mt-md">Loading member directory...</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="flex flex-col gap-lg md:grid md:grid-cols-2 md:gap-lg">
              {/* Recipient Selection Column */}
              <div className="flex flex-col gap-sm border-r border-[#323232]/50 pr-md">
                <label className="input-label flex justify-between items-center">
                  <span>Select Recipients ({selectedIds.length})</span>
                  <button 
                    type="button" 
                    onClick={toggleSelectAll} 
                    className="text-xs text-primary hover:underline cursor-pointer"
                  >
                    {selectedIds.length === filteredRecipients.length && filteredRecipients.length > 0
                      ? "Deselect All"
                      : "Select All"}
                  </button>
                </label>

                {/* Recipient Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="Search by name or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field pl-9 h-[38px] text-xs"
                  />
                </div>

                {/* Recipient list wrapper */}
                <div className="border border-[#323232] rounded-xl overflow-hidden bg-background/50 h-[220px] overflow-y-auto">
                  {filteredRecipients.length === 0 ? (
                    <div className="p-lg text-center text-xs text-secondary">
                      No members matching.
                    </div>
                  ) : (
                    filteredRecipients.map((rec) => {
                      const isSelected = selectedIds.includes(rec.id);
                      return (
                        <div 
                          key={rec.id}
                          onClick={() => toggleSelectOne(rec.id)}
                          className="flex items-center gap-md px-sm py-xs border-b border-[#323232]/50 hover:bg-[#181818] cursor-pointer transition-colors"
                        >
                          <button type="button" className="text-secondary focus:outline-none">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-primary" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
                          <div className="flex flex-col text-left">
                            <span className="text-white text-xs font-bold">{rec.name}</span>
                            <span className="text-[#B3B3B3] text-[10px]">{rec.phone}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Message Composer Column */}
              <div className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="broadcastMsg">Broadcast Message</label>
                  <textarea
                    id="broadcastMsg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your WhatsApp notification message here... (e.g. FitHub is hosting a special training seminar this Saturday at 10 AM! RSVP today.)"
                    className="bg-background border border-[#323232] rounded-xl p-md text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-xs resize-none h-[180px]"
                    required
                  />
                </div>

                <div className="bg-[#2a1b02]/20 border border-primary/10 rounded-lg p-xs flex gap-xs items-start">
                  <span className="text-primary text-[10px] font-bold mt-0.5">⚠️ NOTE:</span>
                  <p className="text-[10px] text-secondary leading-normal">
                    Plain text messages are sent directly. Make sure the phone numbers are active on WhatsApp and integration settings are correctly configured.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending || selectedIds.length === 0}
                  className="w-full bg-primary-container text-on-primary-container font-bold py-3 rounded-xl hover:bg-primary transition-all font-label-md text-xs flex items-center justify-center gap-sm cursor-pointer disabled:opacity-50"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Broadcast...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Broadcast ({selectedIds.length})
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-lg py-sm border-t border-[#323232] flex justify-end shrink-0 bg-background/30">
          <button 
            onClick={onClose}
            className="border border-[#323232] text-white hover:bg-[#181818] px-md py-sm rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
