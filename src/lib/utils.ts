import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAppError(error: any): string {
  if (error instanceof ZodError) {
    // ZodError.issues array holds individual validation failures
    const zodErr = error as ZodError & { issues: Array<{ message: string }> };
    return zodErr.issues?.[0]?.message || "Validation failed.";
  }
  return error?.message || "An unexpected error occurred.";
}
