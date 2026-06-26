import { prisma } from "@/lib/prisma";
import { Gender, MemberType } from "@prisma/client";

export interface CreateMemberInput {
  firstName: string;
  lastName: string;
  phone: string;
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
  }) {
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where: any = { isDeleted: false };

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: "insensitive" } },
        { lastName: { contains: search, mode: "insensitive" } },
        { phone: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
      ];
    }

    if (status) {
      // Find members with at least one membership matching the status
      // Note: for derived status, active is startDate <= now and endDate >= now
      const now = new Date();
      if (status === "active") {
        where.memberships = {
          some: {
            status: "ACTIVE",
            startDate: { lte: now },
            endDate: { gte: now },
          },
        };
      } else if (status === "expired") {
        where.memberships = {
          some: {
            endDate: { lt: now },
          },
          none: {
            endDate: { gte: now },
          },
        };
      } else if (status === "upcoming") {
        where.memberships = {
          some: {
            startDate: { gt: now },
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

    const [data, total] = await prisma.$transaction([
      prisma.member.findMany({
        where,
        orderBy: { createdAt: "desc" },
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
            },
          },
        },
      }),
      prisma.member.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data.map((m) => {
        const latestMembership = m.memberships[0] || null;
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
          status: latestMembership?.status || "INACTIVE",
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
          },
        },
      },
    });

    if (!member || member.isDeleted) {
      return null;
    }

    const latestMembership = member.memberships.find(m => m.status === "ACTIVE") || member.memberships[0] || null;

    return {
      ...member,
      name: `${member.firstName} ${member.lastName}`,
      status: latestMembership?.status || "INACTIVE",
      latestMembership,
    };
  }

  static async createMember(data: CreateMemberInput, coupleGroupId?: string) {
    // Validate phone number uniqueness
    const existing = await prisma.member.findUnique({
      where: { phone: data.phone },
    });

    if (existing && !existing.isDeleted) {
      throw new Error(`Phone number ${data.phone} is already registered to an active member.`);
    }

    // If member was soft deleted, we can reactivate or create new. Let's create new.
    return prisma.member.create({
      data: {
        ...data,
        coupleGroupId,
      },
    });
  }

  static async updateMember(id: string, data: Partial<CreateMemberInput>) {
    if (data.phone) {
      const existing = await prisma.member.findUnique({
        where: { phone: data.phone },
      });
      if (existing && existing.id !== id && !existing.isDeleted) {
        throw new Error(`Phone number ${data.phone} is already in use.`);
      }
    }

    return prisma.member.update({
      where: { id },
      data,
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
      return prisma.member.update({
        where: { id },
        data: { isDeleted: true },
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
