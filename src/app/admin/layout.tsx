import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <AdminLayoutClient adminName={session.user.name || "FitHub Admin"}>
      {children}
    </AdminLayoutClient>
  );
}
