"use server";

import { revalidatePath } from "next/cache";
import { WhatsAppService } from "@/services/whatsapp.service";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

export async function getNotificationLogsAction(params: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}) {
  try {
    const logs = await WhatsAppService.getLogs(params);
    return { success: true, data: logs };
  } catch (error: any) {
    console.error("Error fetching notification logs:", error);
    return { error: error.message || "Failed to fetch logs." };
  }
}

export async function getBroadcastRecipientsAction() {
  try {
    // Get all non-deleted members for selection
    const members = await prisma.member.findMany({
      where: { isDeleted: false },
      orderBy: [
        { firstName: "asc" },
        { lastName: "asc" }
      ],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
      }
    });

    return {
      success: true,
      data: members.map(m => ({
        id: m.id,
        name: `${m.firstName} ${m.lastName}`,
        phone: m.phone,
      }))
    };
  } catch (error: any) {
    console.error("Error fetching broadcast recipients:", error);
    return { error: error.message || "Failed to fetch recipients." };
  }
}

const broadcastSchema = z.object({
  memberIds: z.array(z.string().uuid("Invalid member selected")).min(1, "Please select at least one recipient"),
  message: z.string().min(1, "Message content is required").trim(),
});

export async function sendBroadcastAction(data: { memberIds: string[]; message: string }) {
  try {
    const validated = broadcastSchema.parse(data);
    const result = await WhatsAppService.sendBroadcast(validated.memberIds, validated.message);
    revalidatePath("/admin/notifications");
    return { success: true, ...result };
  } catch (error: any) {
    console.error("Error sending broadcast:", error);
    return { error: error.message || "Failed to send broadcast." };
  }
}
