import { Metadata } from "next";
import FAQSection from "@/components/common/FAQSection";
import GalleryContainer from "@/components/gallery/GalleryContainer";
import { galleryItems } from "@/data/galleryData";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore The FitHub Gym through our photo gallery. Discover modern gym equipment, training spaces, cardio zone, strength area, and the motivating fitness environment in Narkhed.",
  keywords: [
    "gym gallery", "FitHub Gym photos", "gym equipment Narkhed", "gym interior", "cardio zone",
    "strength training area", "fitness center photos", "gym images Maharashtra"
  ],
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | The FitHub Gym",
    description: "Explore The FitHub Gym through our photo gallery. Discover modern gym equipment, training spaces, cardio zone, strength area, and the motivating fitness environment in Narkhed.",
    url: "https://fithubgym.in/gallery",
    images: [
      {
        url: "/assets/gallery/hero.webp",
        width: 1200,
        height: 630,
        alt: "The FitHub Gym Gallery Showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | The FitHub Gym",
    description: "Explore The FitHub Gym through our photo gallery. Discover modern gym equipment, training spaces, cardio zone, strength area, and the motivating fitness environment in Narkhed.",
    images: ["/assets/gallery/hero.webp"],
  },
};

export default async function GalleryPage() {
  return (
    <>
      {/* Core Gallery Component */}
      <GalleryContainer initialItems={galleryItems} />

      {/* Reusable FAQ Section */}
      <FAQSection />
    </>
  );
}
