import { PrismaClient } from "@prisma/client";
import dns from "dns";

// Prefer IPv4 DNS resolution to resolve connection issues with Neon in environments with unstable IPv6 routing
if (dns && typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
