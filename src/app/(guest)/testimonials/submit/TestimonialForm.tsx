"use client";

import { useState } from "react";
import { Star, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { submitTestimonialAction } from "@/features/testimonials/actions";

export default function TestimonialForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");
    if (rating === 0) return setError("Please select a star rating");
    if (review.trim().length < 10) return setError("Testimonial must be at least 10 characters");
    if (review.length > 500) return setError("Testimonial must be 500 characters or less");
    if (!consent) return setError("You must agree to the consent statement");

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitTestimonialAction({
        name,
        email,
        rating,
        review,
        consent,
      });

      if (response?.error) {
        setError(response.error);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto bg-[#181818]/70 backdrop-blur-md border border-[#323232] rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden"
      >
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider mb-4">
          Thank you!
        </h2>
        <p className="font-body-md text-secondary text-sm md:text-base leading-relaxed mb-8">
          Thank you for sharing your experience! Your testimonial has been submitted successfully and will appear on our website once approved by our team.
        </p>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/"
            prefetch={false}
            className="w-full max-w-[200px] py-3 rounded-xl bg-primary-container text-on-primary-container font-label-md font-bold hover:bg-primary active:scale-95 transition-all text-center border-none cursor-pointer"
          >
            Go Home
          </Link>
          <button
            onClick={() => {
              setName("");
              setEmail("");
              setRating(0);
              setReview("");
              setConsent(false);
              setSuccess(false);
            }}
            className="w-full max-w-[200px] py-3 rounded-xl border border-[#323232] hover:border-primary/50 text-white font-label-md font-bold active:scale-95 transition-all text-center bg-transparent cursor-pointer"
          >
            Submit Again
          </button>
        </div>


      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-xl bg-[#181818]/70 backdrop-blur-md border border-[#323232] rounded-xl p-4 sm:p-6 shadow-2xl relative">
      <form onSubmit={handleSubmit} className="space-y-md" id="testimonialForm">
        {error && (
          <div className="bg-error/10 border border-error/20 text-error rounded-xl p-3 text-sm font-semibold">
            {error}
          </div>
        )}

        {/* Personal Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-secondary block" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full bg-[#1c1b1b] border border-[#323232] rounded-lg px-md py-sm text-white placeholder:text-secondary-container focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container transition-all font-body-md text-sm h-[44px]"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-1">
            <label className="font-label-md text-label-md text-secondary block" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full bg-[#1c1b1b] border border-[#323232] rounded-lg px-md py-sm text-white placeholder:text-secondary-container focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container transition-all font-body-md text-sm h-[44px]"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Rating System */}
        <div className="space-y-1">
          <label className="font-label-md text-label-md text-secondary block">
            Overall Rating
          </label>
          <div className="flex gap-xs" id="ratingContainer">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = star <= (hoveredRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-0.5 focus:outline-none transition-transform hover:scale-110 active:scale-95 border-none bg-transparent cursor-pointer"
                  disabled={isSubmitting}
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${active ? "fill-primary text-primary" : "text-[#2e2e2d] fill-none"
                      }`}
                  />
                </button>
              );
            })}
            {rating > 0 && (
              <span className="text-primary font-bold ml-2 text-xs uppercase font-display self-center">
                {rating === 5 ? "Elite" : rating === 4 ? "Strong" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
              </span>
            )}
          </div>
        </div>

        {/* Testimonial Textarea */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label className="font-label-md text-label-md text-secondary block" htmlFor="review">
              Testimonial
            </label>
            <span className={`font-label-md text-xs font-semibold ${review.length > 450 ? "text-error" : "text-[#a08e7a]"}`} id="charCounter">
              {review.length} / 500
            </span>
          </div>
          <textarea
            id="review"
            maxLength={500}
            className="w-full h-32 bg-[#1c1b1b] border border-[#323232] rounded-lg px-md py-2 text-white placeholder:text-secondary-container focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container transition-all font-body-md resize-none leading-relaxed text-sm"
            placeholder="Share the details of your transformation, favorite classes, or how our trainers helped you..."
            value={review}
            onChange={(e) => setReview(e.target.value.slice(0, 500))}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* Consent Checkbox */}
        <label className="flex items-start gap-sm cursor-pointer group select-none">
          <div className="relative flex items-center mt-0.5">
            <input
              id="consent"
              type="checkbox"
              className="peer appearance-none w-[18px] h-[18px] border border-[#323232] rounded bg-[#181818] checked:bg-primary-container checked:border-primary-container transition-all cursor-pointer"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              disabled={isSubmitting}
            />
            <span className="material-symbols-outlined absolute opacity-0 peer-checked:opacity-100 text-on-primary-fixed text-[14px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ fontVariationSettings: "'wght' 700" }}>
              check
            </span>
          </div>
          <span className="font-body-md text-xs text-secondary group-hover:text-on-surface transition-colors leading-relaxed">
            I agree that my testimonial may be published on The FitHub Gym website and promotional materials.
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-headline-md text-sm font-bold flex items-center justify-center gap-sm active:scale-[0.98] transition-all cursor-pointer border-none ${consent && !isSubmitting
            ? "bg-primary-container text-on-primary-container hover:bg-primary hover:opacity-90"
            : "bg-surface-container-highest text-on-surface-variant/40 border border-outline-variant/50 cursor-not-allowed"
            }`}
          disabled={!consent || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting Testimonial...
            </>
          ) : (
            <>
              <span>Submit Testimonial</span>
              <span className="material-symbols-outlined text-[16px]">send</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

