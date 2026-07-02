import TestimonialForm from "./TestimonialForm";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Submit Testimonial | The FitHub Gym",
  description: "Share your fitness journey and review your training experience at The FitHub Gym.",
};

export default function TestimonialSubmitPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-sans antialiased overflow-x-hidden relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Image with Overlay */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]"></div>
        <img
          alt="High-performance gym interior"
          className="w-full h-full object-cover"
          src="/assets/bg.png"
        />
      </div>

      {/* Main Content Canvas */}
      <main className="relative z-20 min-h-screen flex flex-col items-center px-gutter py-2xl">
        {/* Submission Header */}
        <div className="text-center mb-xl max-w-2xl px-md flex flex-col items-center">
          <div className="mb-md">
            <Logo />
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl font-extrabold text-on-surface mb-md">
            Share Your Fitness Journey
          </h1>
          <p className="font-body-md text-secondary text-sm sm:text-base max-w-[500px]">
            Tell others how your experience at The FitHub Gym helped you achieve your fitness goals. Your story inspires our community.
          </p>
        </div>


        {/* Submission Form Container */}
        <div className="w-full max-w-xl">
          <TestimonialForm />
        </div>
      </main>
    </div>
  );
}

