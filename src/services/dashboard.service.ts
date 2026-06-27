import { prisma } from "@/lib/prisma";
import { MembershipStatus } from "@prisma/client";

export class DashboardService {
  static async getSummary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysFromNow = new Date(today);
    sevenDaysFromNow.setDate(today.getDate() + 7);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 1. Total Members (not soft-deleted)
    const totalMembers = await prisma.member.count({
      where: { isDeleted: false },
    });

    // 2. Active Members (have an active membership today)
    const activeMembers = await prisma.member.count({
      where: {
        isDeleted: false,
        memberships: {
          some: {
            status: MembershipStatus.ACTIVE,
            startDate: { lte: new Date() },
            endDate: { gte: today },
          },
        },
      },
    });

    // 3. Expiring Soon (membership ending within 7 days)
    const expiringSoon = await prisma.member.count({
      where: {
        isDeleted: false,
        memberships: {
          some: {
            status: MembershipStatus.ACTIVE,
            endDate: {
              gte: today,
              lte: sevenDaysFromNow,
            },
          },
        },
      },
    });

    // 4. Expired Members (have memberships, but none are active or upcoming, and latest is expired)
    // A simple approximation: members who have at least one membership, but zero active/upcoming ones.
    const expiredMembers = await prisma.member.count({
      where: {
        isDeleted: false,
        memberships: {
          some: {
            endDate: { lt: today },
          },
          none: {
            endDate: { gte: today },
          },
        },
      },
    });

    // 5. Monthly Revenue (sum of amount + registrationFee for current month)
    const revenueResult = await prisma.membership.aggregate({
      where: {
        createdAt: { gte: firstDayOfMonth },
      },
      _sum: {
        amount: true,
        registrationFee: true,
      },
    });

    const monthlyRevenue = 
      Number(revenueResult._sum.amount || 0) + 
      Number(revenueResult._sum.registrationFee || 0);

    // 6. Recent Members (last 5 created)
    const recentMembers = await prisma.member.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        memberships: {
          orderBy: { endDate: "desc" },
          take: 1,
          include: { membershipPlan: true },
        },
      },
    });

    // 7. Recent Renewals (last 5 memberships created where it's a renewal)
    // We can fetch the latest 5 memberships since every purchase/renewal creates a new record.
    const recentRenewals = await prisma.membership.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: {
        member: true,
        membershipPlan: true,
      },
    });

    return {
      totalMembers,
      activeMembers,
      expiringSoon,
      expiredMembers,
      monthlyRevenue,
      recentMembers: recentMembers.map(m => {
        const latestMembership = m.memberships[0] || null;
        let status = "INACTIVE";
        if (latestMembership) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const end = new Date(latestMembership.endDate);
          end.setHours(0, 0, 0, 0);
          const start = new Date(latestMembership.startDate);
          start.setHours(0, 0, 0, 0);

          if (start > today) {
            status = "UPCOMING";
          } else if (end < today) {
            status = "EXPIRED";
          } else {
            const diffTime = end.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays <= 5) {
              status = "EXPIRING_SOON";
            } else {
              status = "ACTIVE";
            }
          }
        }

        return {
          id: m.id,
          name: `${m.firstName} ${m.lastName}`,
          phone: m.phone,
          joinDate: m.createdAt,
          planName: latestMembership?.membershipPlan?.name || latestMembership?.customPlanName || "No Plan",
          status,
        };
      }),
      recentRenewals: recentRenewals.map(r => ({
        id: r.id,
        memberName: `${r.member.firstName} ${r.member.lastName}`,
        planName: r.membershipPlan?.name || r.customPlanName || "Custom Plan",
        amount: Number(r.amount),
        date: r.createdAt,
      })),
    };
  }
}
