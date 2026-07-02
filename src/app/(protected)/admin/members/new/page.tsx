import { prisma } from "@/lib/prisma";
import MemberForm from "./MemberForm";
import { MemberType } from "@prisma/client";
import { getSettings } from "@/features/settings/actions";

import { Suspense } from "react";
import NewMemberLoading from "./loading";

export const unstable_instant = { prefetch: "static", unstable_disableValidation: true };

export default function NewMemberPage() {
  return (
    <Suspense fallback={<NewMemberLoading />}>
      <NewMemberContent />
    </Suspense>
  );
}

async function NewMemberContent() {
  const settings = await getSettings();
  const defaultRegistrationFee = settings?.registrationFee ?? 200;

  // Fetch active plans to pass to form
  const activePlans = await prisma.membershipPlan.findMany({
    where: { isActive: true, isDeleted: false },
    select: {
      id: true,
      name: true,
      memberType: true,
      price: true,
      durationMonths: true,
    },
  });

  // Map Decimal to Number for React components compatibility
  const plans = activePlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    memberType: plan.memberType,
    price: Number(plan.price),
    durationMonths: plan.durationMonths,
  }));

  return <MemberForm plans={plans} defaultRegistrationFee={defaultRegistrationFee} />;
}
