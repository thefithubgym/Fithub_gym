"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin/dashboard",
    });
    return { success: true };
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Authentication failed. Please check your credentials." };
      }
    }
    
    // Auth.js redirects by throwing a special error. We must rethrow it so Next.js redirects correctly.
    if (error?.message === "NEXT_REDIRECT" || error?.name === "RedirectError" || error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    
    return { error: "An unexpected error occurred. Please try again." };
  }
}
