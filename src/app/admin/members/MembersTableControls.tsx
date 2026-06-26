"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Search, Filter } from "lucide-react";

interface PlanOption {
  id: string;
  name: string;
}

interface MembersTableControlsProps {
  plans: PlanOption[];
}

export default function MembersTableControls({ plans }: MembersTableControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [planId, setPlanId] = useState(searchParams.get("planId") || "");

  // Ref to hold latest filter values for use inside the debounce closure
  const statusRef = useRef(status);
  const planIdRef = useRef(planId);
  statusRef.current = status;
  planIdRef.current = planId;

  const applyFilters = (newSearch: string, newStatus: string, newPlanId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to page 1

    if (newSearch) params.set("search", newSearch);
    else params.delete("search");

    if (newStatus) params.set("status", newStatus);
    else params.delete("status");

    if (newPlanId) params.set("planId", newPlanId);
    else params.delete("planId");

    startTransition(() => {
      router.push(`/admin/members?${params.toString()}`);
    });
  };

  // Debounced search — fires 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(search, statusRef.current, planIdRef.current);
    }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row gap-md items-center justify-between bg-surface-container-lowest">
      {/* Search Input */}
      <div className="relative w-full md:w-80 h-10 flex items-center rounded-lg bg-surface border border-outline-variant focus-within:border-primary-container transition-colors">
        <Search className="text-on-surface-variant ml-sm w-5 h-5 shrink-0" />
        <input 
          className="w-full h-full bg-transparent border-none text-on-surface placeholder-on-surface-variant focus:outline-none focus:ring-0 font-body-md text-sm px-sm" 
          placeholder="Search by name, phone, email..." 
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-2 md:flex md:items-center gap-sm w-full md:w-auto">
        {/* Status Dropdown */}
        <select 
          className="col-span-1 h-10 bg-surface border border-outline-variant text-on-surface rounded-lg font-label-md text-sm focus:border-primary-container focus:ring-0 cursor-pointer px-sm outline-none w-full md:w-36"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            applyFilters(search, e.target.value, planId);
          }}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="expired">Expired</option>
        </select>

        {/* Plan Dropdown */}
        <select 
          className="col-span-1 h-10 bg-surface border border-outline-variant text-on-surface rounded-lg font-label-md text-sm focus:border-primary-container focus:ring-0 cursor-pointer px-sm outline-none w-full md:w-48"
          value={planId}
          onChange={(e) => {
            setPlanId(e.target.value);
            applyFilters(search, status, e.target.value);
          }}
        >
          <option value="">All Plans</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <button 
          onClick={() => applyFilters(search, status, planId)}
          className="col-span-2 md:col-span-1 h-10 px-md flex items-center justify-center rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors font-label-md text-sm cursor-pointer w-full md:w-auto"
        >
          <Filter className="mr-xs w-4 h-4" />
          {isPending ? "Filtering..." : "Filter"}
        </button>
      </div>
    </div>
  );
}
