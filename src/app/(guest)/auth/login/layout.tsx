import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Secure administrator login portal for The FitHub Gym management dashboard. Access member records, membership plans, and payment reports.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
