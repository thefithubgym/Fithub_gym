import { prisma } from "@/lib/prisma";
import { Gender, MemberType } from "@prisma/client";
import { getSettings } from "@/features/settings/actions";

export interface CreateMemberInput {
  firstName: string;
  lastName: string;
  phone?: string | null;
  gender: Gender;
  email?: string;
  dateOfBirth?: Date;
  address?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  notes?: string;
  avatarUrl?: string;
}

export class MemberService {
  static async getMembers({
    page = 1,
    limit = 10,
    search = "",
    status = "",
    planId = "",
    sortBy = "",
    sortOrder = "",
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
    planId?: string;
    sortBy?: string;
    sortOrder?: string;
  }) {
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { isDeleted: false };

    if (search) {
      const trimmedSearch = search.trim();
      const parts = trimmedSearch.split(/\s+/);
      let orConditions: any[] = [
        { firstName: { contains: trimmedSearch, mode: "insensitive" } },
        { lastName: { contains: trimmedSearch, mode: "insensitive" } },
        { phone: { contains: trimmedSearch, mode: "insensitive" } },
        { email: { contains: trimmedSearch, mode: "insensitive" } },
      ];

      if (parts.length >= 2) {
        const firstPart = parts[0];
        const lastPart = parts.slice(1).join(" ");
        const reverseFirstPart = parts[parts.length - 1];
        const reverseLastPart = parts.slice(0, parts.length - 1).join(" ");

        orConditions.push(
          {
            AND: [
              { firstName: { contains: firstPart, mode: "insensitive" } },
              { lastName: { contains: lastPart, mode: "insensitive" } },
            ],
          },
          {
            AND: [
              { firstName: { contains: reverseLastPart, mode: "insensitive" } },
              { lastName: { contains: reverseFirstPart, mode: "insensitive" } },
            ],
          }
        );
      }

      where.OR = orConditions;
    }

    if (status) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      if (status === "active") {
        where.memberships = {
          some: {
            startDate: { lte: todayEnd },
            endDate: { gte: todayStart },
          },
        };
      } else if (status === "expired") {
        const thirtyDaysAgo = new Date(todayStart);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        where.memberships = {
          some: {
            endDate: {
              lt: todayStart,
              gte: thirtyDaysAgo,
            },
          },
          none: {
            endDate: { gte: todayStart },
          },
        };
      } else if (status === "inactive") {
        const thirtyDaysAgo = new Date(todayStart);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        where.memberships = {
          none: {
            endDate: { gte: thirtyDaysAgo },
          },
        };
      } else if (status === "upcoming") {
        where.memberships = {
          some: {
            startDate: { gt: todayEnd },
          },
        };
      } else if (status === "expiring_soon") {
        const settings = await getSettings();
        const reminderDays = settings?.expiryReminderDays ?? 5;
        const expiryThresholdEnd = new Date();
        expiryThresholdEnd.setDate(expiryThresholdEnd.getDate() + reminderDays);
        expiryThresholdEnd.setHours(23, 59, 59, 999);

        where.memberships = {
          some: {
            startDate: { lte: todayEnd },
            endDate: {
              gte: todayStart,
              lte: expiryThresholdEnd,
            },
          },
        };
      }
    }

    if (planId) {
      where.memberships = {
        some: {
          membershipPlanId: planId,
        },
      };
    }

    let data: any[] = [];
    let total = 0;

    if (sortBy === "expiresIn" && (sortOrder === "asc" || sortOrder === "desc")) {
      // 1. Fetch matching members with their latest membership end date
      const matchingMembers = await prisma.member.findMany({
        where,
        select: {
          id: true,
          memberships: {
            select: { endDate: true },
            orderBy: { endDate: "desc" },
            take: 1,
          },
        },
      });

      // 2. Sort matching members in memory based on membership end date
      matchingMembers.sort((a, b) => {
        const timeA = a.memberships[0]?.endDate ? new Date(a.memberships[0].endDate).getTime() : 0;
        const timeB = b.memberships[0]?.endDate ? new Date(b.memberships[0].endDate).getTime() : 0;

        if (sortOrder === "asc") {
          if (timeA === 0) return 1;
          if (timeB === 0) return -1;
          return timeA - timeB;
        } else {
          if (timeA === 0) return 1;
          if (timeB === 0) return -1;
          return timeB - timeA;
        }
      });

      total = matchingMembers.length;

      // 3. Slice for the current page
      const paginatedMembers = matchingMembers.slice(skip, skip + limit);
      const paginatedIds = paginatedMembers.map((m) => m.id);

      // 4. Fetch full details for the paginated page
      const rawData = await prisma.member.findMany({
        where: {
          id: { in: paginatedIds },
        },
        include: {
          memberships: {
            orderBy: { endDate: "desc" },
            take: 1,
            include: { membershipPlan: true },
          },
          coupleGroup: {
            include: {
              members: true,
              memberships: {
                orderBy: { endDate: "desc" },
                take: 1,
                include: { membershipPlan: true },
              },
            },
          },
        },
      });

      // 5. Re-sort fetched records to match the order of paginatedIds
      data = paginatedIds
        .map((id) => rawData.find((m) => m.id === id))
        .filter((m): m is Exclude<typeof m, undefined> => !!m);
    } else {
      // Standard database path
      let orderBy: any = { createdAt: "desc" };
      if (sortBy === "memberName" && (sortOrder === "asc" || sortOrder === "desc")) {
        orderBy = [
          { firstName: sortOrder },
          { lastName: sortOrder },
        ];
      }

      const [dbData, dbTotal] = await prisma.$transaction([
        prisma.member.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            memberships: {
              orderBy: { endDate: "desc" },
              take: 1,
              include: { membershipPlan: true },
            },
            coupleGroup: {
              include: {
                members: true,
                memberships: {
                  orderBy: { endDate: "desc" },
                  take: 1,
                  include: { membershipPlan: true },
                },
              },
            },
          },
        }),
        prisma.member.count({ where }),
      ]);

      data = dbData;
      total = dbTotal;
    }

    const totalPages = Math.ceil(total / limit);

    return {
      data: data.map((m) => {
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
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            if (end >= thirtyDaysAgo) {
              status = "EXPIRED";
            } else {
              status = "INACTIVE";
            }
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
          firstName: m.firstName,
          lastName: m.lastName,
          name: `${m.firstName} ${m.lastName}`,
          phone: m.phone,
          gender: m.gender,
          email: m.email,
          createdAt: m.createdAt,
          planName: latestMembership?.membershipPlan?.name || latestMembership?.customPlanName || "No Plan",
          status,
          latestMembership,
          coupleGroup: m.coupleGroup,
        };
      }),
      total,
      page,
      pageSize: limit,
      totalPages,
    };
  }

  static async getMemberById(id: string) {
    const member = await prisma.member.findUnique({
      where: { id },
      include: {
        memberships: {
          orderBy: { startDate: "desc" },
          include: { membershipPlan: true },
        },
        coupleGroup: {
          include: {
            members: {
              where: {
                id: { not: id },
                isDeleted: false,
              },
            },
            memberships: {
              orderBy: { startDate: "desc" },
              include: { membershipPlan: true },
            },
          },
        },
      },
    });

    if (!member || member.isDeleted) {
      return null;
    }

    const latestMembership = member.memberships.find(m => m.status === "ACTIVE") 
      || member.memberships[0] 
      || null;
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
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        if (end >= thirtyDaysAgo) {
          status = "EXPIRED";
        } else {
          status = "INACTIVE";
        }
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
      ...member,
      name: `${member.firstName} ${member.lastName}`,
      status,
      latestMembership,
    };
  }

  static async createMember(data: CreateMemberInput, coupleGroupId?: string) {
    const phone = data.phone?.trim() || null;
    if (phone) {
      const existing = await prisma.member.findUnique({
        where: { phone },
      });

      if (existing && !existing.isDeleted) {
        throw new Error(`Phone number ${phone} is already registered to an active member.`);
      }
    }

    return prisma.member.create({
      data: {
        ...data,
        phone,
        coupleGroupId,
      },
    });
  }

  static async updateMember(id: string, data: Partial<CreateMemberInput>) {
    const phone = data.phone === undefined ? undefined : (data.phone?.trim() || null);
    if (phone) {
      const existing = await prisma.member.findUnique({
        where: { phone },
      });
      if (existing && existing.id !== id && !existing.isDeleted) {
        throw new Error(`Phone number ${phone} is already in use.`);
      }
    }

    return prisma.member.update({
      where: { id },
      data: {
        ...data,
        ...(phone !== undefined ? { phone } : {}),
      },
    });
  }

  static async softDeleteMember(id: string) {
    // Business rule: Deletion should be prevented if historical memberships exist, or soft delete.
    // Let's check if they have memberships.
    const membershipsCount = await prisma.membership.count({
      where: { memberId: id },
    });

    if (membershipsCount > 0) {
      // Soft delete only
      const member = await prisma.member.findUnique({
        where: { id },
        select: { phone: true },
      });
      const suffix = `_deleted_${Date.now()}`;
      const newPhone = member ? `${member.phone}${suffix}` : `deleted_${id.substring(0, 8)}${suffix}`;

      return prisma.member.update({
        where: { id },
        data: { 
          isDeleted: true, 
          phone: newPhone 
        },
      });
    } else {
      // Hard delete if no history exists
      return prisma.member.delete({
        where: { id },
      });
    }
  }

  static async createCoupleGroup(memberOneId: string, memberTwoId: string) {
    const group = await prisma.coupleGroup.create({
      data: {},
    });

    await prisma.member.updateMany({
      where: {
        id: { in: [memberOneId, memberTwoId] },
      },
      data: {
        coupleGroupId: group.id,
      },
    });

    return group;
  }
}
