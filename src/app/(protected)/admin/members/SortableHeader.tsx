"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTableTransition } from "@/components/ui/table-transition";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";

interface SortableHeaderProps {
  column: string;
  label: string;
  align?: "left" | "right";
}

export default function SortableHeader({
  column,
  label,
  align = "left",
}: SortableHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { startTransition } = useTableTransition();

  const currentSortBy = searchParams.get("sortBy") || "";
  const currentSortOrder = searchParams.get("sortOrder") || "";
  const isActive = currentSortBy === column;

  const handleClick = () => {
    let nextOrder = "";
    if (isActive) {
      if (currentSortOrder === "asc") {
        nextOrder = "desc";
      } else if (currentSortOrder === "desc") {
        nextOrder = ""; // Loop back to default
      } else {
        nextOrder = "asc";
      }
    } else {
      nextOrder = "asc";
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (nextOrder) {
      params.set("sortBy", column);
      params.set("sortOrder", nextOrder);
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-xs hover:text-primary transition-colors group cursor-pointer font-semibold uppercase tracking-widest text-xs ${
        align === "right" ? "flex-row-reverse justify-start w-full text-right" : "text-left"
      }`}
    >
      <span>{label}</span>
      {isActive ? (
        currentSortOrder === "asc" ? (
          <ArrowUp className="w-3.5 h-3.5 text-primary shrink-0" />
        ) : (
          <ArrowDown className="w-3.5 h-3.5 text-primary shrink-0" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 text-on-surface-variant/30 group-hover:text-primary/70 transition-colors shrink-0" />
      )}
    </button>
  );
}
