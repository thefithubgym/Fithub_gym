import { PlanService } from "@/services/plan.service";
import PlansListClient from "./PlansListClient";

export const dynamic = "force-dynamic";

export default async function MembershipPlansPage() {
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
