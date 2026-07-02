# 🏋️ The FitHub Gym — Gym Management System

A full-stack gym management web application built with **Next.js 16 (App Router)**, **Prisma ORM**, and **PostgreSQL**. Designed for The FitHub Gym in Narkhed, Maharashtra, India — providing a public-facing website and a private admin dashboard for managing members, memberships, and payments.

---

## ✨ Features

- **Public Website** — Hero, about, gallery, membership plans, testimonials, and contact pages
- **Admin Dashboard** — Secure login with JWT-based session management
- **Member Management** — Add, edit, and soft-delete members with full profile details
- **Membership Plans** — Create and manage single/couple plans by duration and type
- **Payment Receipts** — Generate and download A5 PDF receipts per membership transaction
- **Testimonials** — Public submission form with admin approval workflow
- **Gallery** — Categorised photo gallery with filter navigation
- **Email Notifications** — OTP-based password reset via Resend
- **SEO Ready** — Full metadata, Open Graph, JSON-LD LocalBusiness schema, sitemap, and robots.txt
- **Responsive Design** — Dark-theme UI optimised for all screen sizes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma 6 |
| Database | PostgreSQL |
| Auth | NextAuth.js v5 (JWT) |
| Email | Resend |
| Image Storage | Cloudinary |
| PDF Generation | jsPDF + jsPDF-AutoTable |
| UI Components | Radix UI, Lucide React, Framer Motion |
| Forms | React Hook Form + Zod |
| Data Fetching | TanStack React Query |

---

## 📁 Folder Structure

```
FitHubGym/
├── prisma/
│   └── schema.prisma          # Database schema
├── public/
│   └── assets/                # Static images and icons
├── src/
│   ├── app/
│   │   ├── (public)/          # Public pages (home, about, gallery, memberships, contact)
│   │   ├── (guest)/           # Unauthenticated-only pages (login, testimonials/submit, receipt)
│   │   ├── (protected)/       # Admin dashboard (requires authentication)
│   │   ├── api/               # API route handlers
│   │   ├── layout.tsx          # Root layout with global metadata and JSON-LD schema
│   │   ├── sitemap.ts          # Auto-generated XML sitemap
│   │   └── robots.ts           # robots.txt configuration
│   ├── components/            # Reusable UI components
│   ├── data/                  # Static data (gallery items, FAQs, etc.)
│   ├── features/              # Feature-specific server actions and logic
│   ├── lib/                   # Shared utilities (Prisma client, helpers)
│   ├── services/              # Business logic services
│   ├── auth.ts                # NextAuth configuration
│   ├── auth.config.ts         # Auth route protection callbacks
│   └── middleware.ts          # Route protection middleware
├── .env                       # Environment variables (not committed)
├── next.config.ts
├── package.json
└── tsconfig.json
```

---

## ✅ Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- A **PostgreSQL** database (local or cloud-hosted)
- A **Resend** account for transactional email delivery
- A **Cloudinary** account for image uploads (gallery management)

---

## 🚀 Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/FitHubGym.git
cd FitHubGym

# 2. Install dependencies
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root. The following variables are required:

```env
# Database
DATABASE_URL=

# NextAuth
AUTH_SECRET=
AUTH_URL=

# Resend (Email)
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Admin Seed (used only during initial database seed)
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🗄 Database Setup

```bash
# Apply all pending migrations to the database
npx prisma migrate deploy

# For development (creates a new migration on schema changes)
npx prisma migrate dev --name init

# Seed the database (creates the initial admin account)
npx prisma db seed
```

---

## 🧰 Prisma Commands

```bash
# Generate Prisma client after schema changes
npx prisma generate

# Open Prisma Studio (visual database browser)
npx prisma studio

# Reset the database (destructive — development only)
npx prisma migrate reset
```

---

## 💻 Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The admin portal is accessible at `/auth/login`.

---

## 🏗 Production Build

```bash
npm run build
npm run start
```

> The build script automatically runs `prisma generate` before compiling Next.js.

---

## 🚢 Deployment

This project is optimised for deployment on **Vercel**:

1. Push your repository to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Add all required environment variables in the Vercel project settings.
4. Vercel detects Next.js automatically and deploys on every push.

For other platforms (Railway, Render, DigitalOcean App Platform):
- Build command: `npm run build`
- Start command: `npm run start`
- Node.js version: >= 20
- Set all environment variables in the platform dashboard

---

## 📄 License

This project is proprietary software developed for **The FitHub Gym**, Narkhed.  
All rights reserved © 2025 The FitHub Gym.

---

## 👤 Author

**Sandesh Lawhale**  
Full-stack Developer  
[GitHub](https://github.com/sandeshlawhale) · [Instagram — @thefithubgym.narkhed](https://www.instagram.com/thefithubgym.narkhed)
