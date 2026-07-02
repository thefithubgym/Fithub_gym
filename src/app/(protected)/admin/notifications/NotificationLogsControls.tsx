"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, Filter } from "lucide-react";

export default function NotificationLogsControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "");

  const applyFilters = (newSearch: string, newType: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to page 1

    if (newSearch) params.set("search", newSearch);
    else params.delete("search");

    if (newType) params.set("type", newType);
    else params.delete("type");

    startTransition(() => {
      router.push(`/admin/notifications?${params.toString()}`);
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearch(val);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters(search, type);
    }
  };

  return (
    <div className="p-lg border-b border-[#323232] flex flex-col md:flex-row gap-md items-center justify-between bg-[#181818]">
      {/* Search Input */}
      <div className="relative w-full md:w-80 h-10 flex items-center rounded-lg bg-background border border-[#323232] focus-within:border-primary-container transition-colors">
        <Search className="text-on-surface-variant ml-sm w-5 h-5 shrink-0" />
        <input 
          className="w-full h-full bg-transparent border-none text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-0 font-body-md text-sm px-sm" 
          placeholder="Search by recipient or content... (Enter)" 
          type="text"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleSearchKeyDown}
        />
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-2 md:flex md:items-center gap-sm w-full md:w-auto">
        {/* Type Dropdown */}
        <select 
          className="col-span-1 h-10 bg-background border border-[#323232] text-on-surface rounded-lg font-label-md text-sm focus:border-primary-container focus:ring-0 cursor-pointer px-sm outline-none w-full md:w-56"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            applyFilters(search, e.target.value);
          }}
        >
          <option value="">All Notification Types</option>
          <option value="RECEIPT">Receipt</option>
          <option value="EXPIRY_REMINDER">Expiry Reminder</option>
          <option value="BROADCAST">Broadcast</option>
        </select>

        <button 
          onClick={() => applyFilters(search, type)}
          className="col-span-1 h-10 px-md flex items-center justify-center rounded-lg border border-[#323232] text-on-surface-variant hover:bg-[#181818] transition-colors font-label-md text-sm cursor-pointer w-full md:w-auto"
        >
          <Filter className="mr-xs w-4 h-4" />
          {isPending ? "Filtering..." : "Filter"}
        </button>
      </div>
    </div>
  );
}
