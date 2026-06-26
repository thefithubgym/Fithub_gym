"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const settingsSchema = z.object({
  gymName: z.string().min(1, "Gym name is required").trim(),
  registrationFee: z.coerce.number().min(0, "Registration fee cannot be negative"),
  whatsappEnabled: z.boolean().default(false),
  whatsappPhoneId: z.string().nullable().optional().transform(v => v === "" ? null : v),
  whatsappToken: z.string().nullable().optional().transform(v => v === "" ? null : v),
  businessId: z.string().nullable().optional().transform(v => v === "" ? null : v),
  timezone: z.string().min(1, "Timezone is required").trim(),
});

export async function getSettingsAction() {
  try {
    let settings = await prisma.settings.findFirst();
    if (!settings) {
      // Create default settings if not found
      settings = await prisma.settings.create({
        data: {
          gymName: "The FitHub Gym",
          registrationFee: 200.00,
          whatsappEnabled: false,
          timezone: "Asia/Kolkata",
        },
      });
    }

    return {
      success: true,
      data: {
        id: settings.id,
        gymName: settings.gymName,
        registrationFee: Number(settings.registrationFee),
        whatsappEnabled: settings.whatsappEnabled,
        whatsappPhoneId: settings.whatsappPhoneId,
        whatsappToken: settings.whatsappToken,
        businessId: settings.businessId,
        timezone: settings.timezone,
      },
    };
  } catch (error: any) {
    console.error("Error fetching settings:", error);
    return { error: error.message || "Failed to fetch settings." };
  }
}

export async function updateSettingsAction(data: any) {
  try {
    const validated = settingsSchema.parse(data);
    let settings = await prisma.settings.findFirst();

    if (!settings) {
      await prisma.settings.create({
        data: validated,
      });
    } else {
      await prisma.settings.update({
        where: { id: settings.id },
        data: validated,
      });
    }

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error: any) {
    console.error("Error updating settings:", error);
    return { error: error.message || "Failed to update settings." };
  }
}
