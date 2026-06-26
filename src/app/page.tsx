import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Dumbbell, Users, CheckCircle, Clock, ShieldCheck, Mail, MapPin, Phone } from "lucide-react";

export const revalidate = 3600; // Revalidate every hour

export default async function LandingPage() {
  // Fetch active plans to display in the pricing grid
  const plans = await prisma.membershipPlan.findMany({
    where: { isActive: true },
    orderBy: [{ memberType: 'asc' }, { price: 'asc' }],
  });

  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Navigation Header */}
      <header className="w-full h-20 border-b border-outline-variant bg-surface/90 backdrop-blur-md sticky top-0 z-50 px-lg md:px-container-margin flex justify-between items-center">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary-container" />
          </div>
          <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">THE FITHUB</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-xl font-label-md text-label-md text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors text-primary font-bold">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-md">
          <Link 
            href="/auth/login" 
            className="border border-[#323232] text-white hover:bg-surface-container-high transition-colors font-label-md text-label-md font-bold px-lg py-sm rounded-xl"
          >
            Admin Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-lg md:px-container-margin py-2xl md:py-3xl max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        <div className="flex flex-col gap-lg">
          <span className="bg-[#222222] border border-[#323232] text-primary-container text-xs px-3 py-1.5 rounded-full font-label-sm uppercase tracking-wider self-start">
            Premium Unisex Fitness Center
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ELITE FITNESS FOR <span className="text-primary-container">ELITE PERFORMANCE</span>
          </h2>
          <p className="font-body-lg text-body-lg text-secondary max-w-lg">
            Experience state-of-the-art training facilities, customized membership plans, and a dedicated environment designed to elevate your performance.
          </p>
          <div className="flex flex-wrap gap-md mt-md">
            <a 
              href="#pricing" 
              className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-xl py-4 rounded-xl hover:bg-primary transition-colors flex items-center gap-sm"
            >
              Explore Plans
            </a>
            <Link 
              href="/contact" 
              className="border border-[#323232] text-white hover:bg-surface-container-high transition-colors font-label-md text-label-md font-bold px-xl py-4 rounded-xl"
            >
              Book a Tour
            </Link>
          </div>
        </div>
        <div className="relative h-[320px] lg:h-[480px] rounded-2xl overflow-hidden border border-outline-variant bg-surface-container flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          {/* Gym atmospheric vector/background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#353534]/50 via-[#131313] to-[#0F0F0F] z-0"></div>
          <div className="z-10 text-center p-lg">
            <Dumbbell className="w-16 h-16 text-primary-container mx-auto mb-lg animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-2">Peak Performance Starts Here</h3>
            <p className="text-secondary max-w-sm mx-auto text-sm">
              Equipped with elite mechanical machinery, dedicated strength zones, and professional athletic coaching.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-surface py-2xl border-y border-outline-variant">
        <div className="max-w-7xl mx-auto px-lg md:px-container-margin grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div className="flex flex-col gap-sm p-lg bg-surface-container-low border border-outline-variant rounded-2xl">
            <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container mb-md">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-white">Flexible Timing</h3>
            <p className="text-secondary text-sm">Open early morning to late evening, accommodating busy professional schedules.</p>
          </div>
          <div className="flex flex-col gap-sm p-lg bg-surface-container-low border border-outline-variant rounded-2xl">
            <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container mb-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-white">Elite Equipment</h3>
            <p className="text-secondary text-sm">Top-tier biomechanically sound resistance machines and free weights.</p>
          </div>
          <div className="flex flex-col gap-sm p-lg bg-surface-container-low border border-outline-variant rounded-2xl">
            <div className="w-12 h-12 bg-primary-container/10 rounded-xl flex items-center justify-center text-primary-container mb-md">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-headline-md text-xl font-bold text-white">Supportive Community</h3>
            <p className="text-secondary text-sm">Train alongside like-minded, focused fitness enthusiasts and professionals.</p>
          </div>
        </div>
      </section>

      {/* Dynamic Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-lg md:px-container-margin py-2xl md:py-3xl">
        <div className="text-center mb-2xl">
          <h2 className="font-display text-4xl font-extrabold text-white mb-sm">MEMBERSHIP PACKAGES</h2>
          <p className="text-secondary max-w-xl mx-auto">
            Choose the membership tier that fits your athletic goals. Couple packages offer premium shared savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className={`bg-[#181818] border border-[#323232] rounded-2xl p-xl shadow-lg flex flex-col gap-lg relative overflow-hidden group hover:border-primary-container transition-all duration-300 ${
                plan.name.toLowerCase().includes('yearly') ? 'border-primary-container/50 lg:scale-105' : ''
              }`}
            >
              {plan.name.toLowerCase().includes('yearly') && (
                <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                  Best Value
                </div>
              )}
              <div>
                <span className="text-xs text-primary-container font-semibold uppercase tracking-widest">
                  {plan.memberType} PACKAGE
                </span>
                <h3 className="font-headline-md text-2xl font-bold text-white mt-xs">{plan.name}</h3>
                <p className="text-secondary text-sm mt-sm min-h-[40px]">{plan.description}</p>
              </div>
              
              <div className="border-t border-[#323232] pt-lg">
                <span className="text-4xl font-extrabold text-white">₹{Number(plan.price).toLocaleString('en-IN')}</span>
                <span className="text-secondary text-sm"> / {plan.durationMonths} {plan.durationMonths === 1 ? 'Month' : 'Months'}</span>
              </div>

              <div className="flex flex-col gap-sm flex-grow">
                <div className="flex items-center gap-sm text-sm text-on-surface">
                  <CheckCircle className="w-4 h-4 text-primary-container shrink-0" />
                  <span>Full Gym Access</span>
                </div>
                <div className="flex items-center gap-sm text-sm text-on-surface">
                  <CheckCircle className="w-4 h-4 text-primary-container shrink-0" />
                  <span>Locker & Shower Facilities</span>
                </div>
                <div className="flex items-center gap-sm text-sm text-on-surface">
                  <CheckCircle className="w-4 h-4 text-primary-container shrink-0" />
                  <span>Initial Assessment & Induction</span>
                </div>
                {plan.memberType === 'COUPLE' && (
                  <div className="flex items-center gap-sm text-sm text-primary font-medium">
                    <CheckCircle className="w-4 h-4 text-primary-container shrink-0" />
                    <span>Includes 2 Linked Members</span>
                  </div>
                )}
              </div>

              <Link 
                href="/contact"
                className="w-full bg-[#222222] border border-[#323232] hover:bg-primary-container hover:text-on-primary-container text-white font-bold rounded-xl py-3.5 text-center font-label-md text-label-md transition-all active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-outline-variant py-xl">
        <div className="max-w-7xl mx-auto px-lg md:px-container-margin flex flex-col md:flex-row justify-between items-center gap-lg text-center md:text-left">
          <div>
            <span className="font-extrabold text-primary text-lg">THE FITHUB GYM</span>
            <p className="text-secondary text-xs mt-xs">© 2026 The FitHub Gym. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-xl text-sm text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/auth/login" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
