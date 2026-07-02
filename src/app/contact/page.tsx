import { Metadata } from "next";
import { auth } from "@/auth";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ConnectWithUs from "@/components/landing/ConnectWithUs";

export const metadata: Metadata = {
  title: "Contact Us | The FitHub Gym",
  description: "Get in touch with The FitHub Gym in Narkhed. View our operating hours, location on Google Maps, phone number, and social links to start your fitness journey today.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | The FitHub Gym",
    description: "Get in touch with The FitHub Gym in Narkhed. View our operating hours, location on Google Maps, phone number, and social links.",
    url: "https://fithubgym.in/contact",
    images: [
      {
        url: "/assets/gallery/hero.webp",
        width: 1200,
        height: 630,
        alt: "Contact The FitHub Gym",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | The FitHub Gym",
    description: "Get in touch with The FitHub Gym in Narkhed. View our operating hours, location on Google Maps, phone number, and social links.",
    images: ["/assets/gallery/hero.webp"],
  },
};

export default async function ContactPage() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="bg-background text-on-background min-h-screen font-sans antialiased overflow-x-hidden relative selection:bg-primary-container selection:text-on-primary-container flex flex-col justify-between">
      {/* Global Header */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Content Area */}
      <main className="pt-20 flex-grow">
        <ConnectWithUs />
      </main>

      {/* Global Footer */}
      <Footer isLoggedIn={isLoggedIn} />
    </div>
  );
}
