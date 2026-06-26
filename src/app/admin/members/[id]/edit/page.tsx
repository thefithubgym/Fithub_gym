import { notFound } from "next/navigation";
import { MemberService } from "@/services/member.service";
import EditMemberForm from "./EditMemberForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function EditMemberPage({ params }: PageProps) {
  const { id } = await params;
  const member = await MemberService.getMemberById(id);

  if (!member) {
    notFound();
  }

  return <EditMemberForm member={member} />;
}
