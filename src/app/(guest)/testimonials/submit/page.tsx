import TestimonialForm from "./TestimonialForm";

export const metadata = {
  title: "Submit Testimonial | The FitHub Gym",
  description: "Share your fitness journey and review your training experience at The FitHub Gym.",
};

export default function TestimonialSubmitPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-sans antialiased overflow-x-hidden relative selection:bg-primary-container selection:text-on-primary-container flex justify-center items-center py-12 px-container-margin">
      <main className="w-full">
        <TestimonialForm />
      </main>
    </div>
  );
}
