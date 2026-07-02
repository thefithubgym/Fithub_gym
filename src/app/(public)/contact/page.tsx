import { Metadata } from "next";
import ConnectWithUs from "@/components/landing/ConnectWithUs";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with The FitHub Gym in Narkhed. View our operating hours, location on Google Maps, phone number, and social links to start your fitness journey today.",
  keywords: [
    "contact FitHub Gym", "gym location Narkhed", "gym phone number", "gym hours",
    "gym address Narkhed", "FitHub contact", "gym WhatsApp", "gym Instagram"
  ],
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
  return <ConnectWithUs />;
}
