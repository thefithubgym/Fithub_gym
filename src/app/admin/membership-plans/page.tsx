import { PlanService } from "@/services/plan.service";
import PlansListClient from "./PlansListClient";

import { Suspense } from "react";
import MembershipPlansLoading from "./loading";

export const unstable_instant = { prefetch: "static", unstable_disableValidation: true };

export default function MembershipPlansPage() {
  return (
    <Suspense fallback={<MembershipPlansLoading />}>
      <MembershipPlansContent />
    </Suspense>
  );
}

async function MembershipPlansContent() {
  const activePlans = await PlanService.getPlans();

  // Convert schema object to plain properties for React client rendering
  const plans = activePlans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    memberType: plan.memberType,
    price: Number(plan.price),
    durationMonths: plan.durationMonths,
    isActive: plan.isActive,
    description: plan.description,
  }));

  return <PlansListClient plans={plans} />;
}
