import { notFound } from "next/navigation";
import { MemberService } from "@/services/member.service";
import EditMemberForm from "./EditMemberForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

import { Suspense } from "react";
import EditMemberLoading from "./loading";

export const unstable_instant = { prefetch: "static", unstable_disableValidation: true };

export default function EditMemberPage({ params }: PageProps) {
  return (
    <Suspense fallback={<EditMemberLoading />}>
      <EditMemberContent params={params} />
    </Suspense>
  );
}

async function EditMemberContent({ params }: PageProps) {
  const { id } = await params;
  const member = await MemberService.getMemberById(id);

  if (!member) {
    notFound();
  }

  return <EditMemberForm member={member} />;
}
