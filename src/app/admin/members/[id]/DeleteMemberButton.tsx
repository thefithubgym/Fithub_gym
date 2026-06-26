"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { softDeleteMemberAction } from "@/features/members/actions";
import { Trash2 } from "lucide-react";

interface DeleteMemberButtonProps {
  memberId: string;
  memberName: string;
}

export default function DeleteMemberButton({ memberId, memberName }: DeleteMemberButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${memberName}? This will archive the member profile.`)) {
      setLoading(true);
      const res = await softDeleteMemberAction(memberId);
      if (res.error) {
        alert(res.error);
        setLoading(false);
      } else {
        router.push("/admin/members");
      }
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="border border-error/30 text-error hover:bg-error/10 font-bold rounded-xl px-lg py-3 transition-colors font-label-md text-sm flex items-center gap-xs cursor-pointer disabled:opacity-50"
    >
      <Trash2 className="w-4 h-4" />
      {loading ? "Deleting..." : "Delete Profile"}
    </button>
  );
}
