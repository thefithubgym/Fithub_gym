"use client";

import { useRouter } from "next/navigation";

interface MemberTableRowProps {
  memberId: string;
  children: React.ReactNode;
}

export default function MemberTableRow({ memberId, children }: MemberTableRowProps) {
  const router = useRouter();

  return (
    <tr
      className="hover:bg-surface-container-lowest transition-colors cursor-pointer group"
      onClick={() => router.push(`/admin/members/${memberId}`)}
    >
      {children}
    </tr>
  );
}
