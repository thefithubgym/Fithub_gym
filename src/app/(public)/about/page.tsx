import { Metadata } from "next";
import AboutContainer from "@/components/about/AboutContainer";
import StandardOfExcellence from "@/components/landing/StandardOfExcellence";

export const metadata: Metadata = {
  title: "About Us | The FitHub Gym",
  description: "Learn more about The FitHub Gym, our trainers, facilities, mission, vision, and commitment to helping the Narkhed community achieve their fitness goals.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | The FitHub Gym",
    description: "Learn more about The FitHub Gym, our trainers, facilities, mission, vision, and commitment to helping the Narkhed community achieve their fitness goals.",
    url: "https://fithubgym.in/about",
    images: [
      {
        url: "/assets/gallery/hero.webp",
        width: 1200,
        height: 630,
        alt: "About The FitHub Gym",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | The FitHub Gym",
    description: "Learn more about The FitHub Gym, our trainers, facilities, mission, vision, and commitment to helping the Narkhed community achieve their fitness goals.",
    images: ["/assets/gallery/hero.webp"],
  },
};

export default async function AboutPage() {
  return <AboutContainer whyChooseSection={<StandardOfExcellence />} />;
}
