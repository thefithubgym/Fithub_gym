import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditMembershipForm from "./EditMembershipForm";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditMembershipPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="text-white text-sm">Loading membership data...</div>}>
      <EditMembershipContent params={params} />
    </Suspense>
  );
}

async function EditMembershipContent({ params }: PageProps) {
  const { id } = await params;
  const membership = await prisma.membership.findUnique({
    where: { id },
    include: {
      member: true,
    },
  });

  if (!membership) {
    notFound();
  }

  const plans = await prisma.membershipPlan.findMany({
    where: { isDeleted: false },
    select: {
      id: true,
      name: true,
      memberType: true,
      price: true,
      durationMonths: true,
    },
  });

  // Convert decimal to number for serializability
  const serializedMembership = {
    ...membership,
    amount: Number(membership.amount),
    registrationFee: Number(membership.registrationFee),
    startDate: membership.startDate.toISOString().split("T")[0],
    endDate: membership.endDate.toISOString().split("T")[0],
  };

  const serializedPlans = plans.map(p => ({
    ...p,
    price: Number(p.price),
  }));

  return (
    <EditMembershipForm 
      membership={serializedMembership} 
      plans={serializedPlans} 
    />
  );
}
