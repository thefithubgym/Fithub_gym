import { prisma } from "@/lib/prisma";
import FAQSection from "@/components/common/FAQSection";
import HeroSection from "@/components/membership-plans/HeroSection";
import OverviewSection from "@/components/membership-plans/OverviewSection";
import PlansTables from "@/components/membership-plans/PlansTables";
import CTASection from "@/components/membership-plans/CTASection";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Plans",
  description: "Choose the perfect gym membership plan at The FitHub Gym, Narkhed. View monthly, quarterly, and annual pricing for single and couple memberships. Transparent, up-to-date pricing with no hidden fees.",
  keywords: [
    "gym membership plans", "gym fees Narkhed", "monthly gym membership", "couple gym membership",
    "annual gym membership", "FitHub Gym pricing", "affordable gym Narkhed", "fitness plans Maharashtra"
  ],
  alternates: {
    canonical: "/memberships",
  },
  openGraph: {
    title: "Membership Plans | The FitHub Gym",
    description: "Explore transparent monthly, quarterly, and annual gym membership plans at The FitHub Gym in Narkhed. Single and couple options available.",
    url: "https://fithubgym.in/memberships",
    images: [
      {
        url: "/assets/gallery/hero.webp",
        width: 1200,
        height: 630,
        alt: "FitHub Gym Membership Plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Membership Plans | The FitHub Gym",
    description: "Explore transparent monthly, quarterly, and annual gym membership plans at The FitHub Gym in Narkhed. Single and couple options available.",
    images: ["/assets/gallery/hero.webp"],
  },
};

export default async function MembershipsPage() {
  // Fetch active, non-deleted plans from Prisma sorted by durationMonths ASC
  const allPlans = await prisma.membershipPlan.findMany({
    where: {
      isActive: true,
      isDeleted: false,
    },
    orderBy: {
      durationMonths: "asc",
    },
  });

  // Group plans into Single and Couple
  const singlePlans = allPlans.filter((plan) => plan.memberType === "SINGLE");
  const couplePlans = allPlans.filter((plan) => plan.memberType === "COUPLE");

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Membership Overview */}
      <OverviewSection />

      {/* 3 & 4. Membership Tables & Empty State */}
      <section className="py-16 px-container-margin">
        <div className="max-w-7xl mx-auto">
          <PlansTables singlePlans={singlePlans} couplePlans={couplePlans} />
        </div>
      </section>

      {/* 5. CTA Section */}
      <CTASection />

      {/* 6. FAQ Section */}
      <FAQSection />
    </>
  );
}
