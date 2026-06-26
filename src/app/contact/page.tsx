import Link from "next/link";
import { Dumbbell, Phone, Mail, MapPin, Compass } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col">
      {/* Navigation Header */}
      <header className="w-full h-20 border-b border-outline-variant bg-surface/90 backdrop-blur-md sticky top-0 z-50 px-lg md:px-container-margin flex justify-between items-center">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-xl bg-surface-container border border-outline-variant flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary-container" />
          </div>
          <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">THE FITHUB</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-xl font-label-md text-label-md text-on-surface-variant">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors text-primary font-bold">Contact</Link>
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

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full max-w-full">
        <section className="max-w-7xl mx-auto px-lg md:px-container-margin py-2xl md:py-3xl grid grid-cols-1 lg:grid-cols-2 gap-xl">
          {/* Left Column: Form */}
          <div className="flex flex-col gap-lg bg-[#181818] border border-[#323232] rounded-2xl p-xl shadow-lg">
            <div>
              <h2 className="font-display text-4xl font-extrabold text-white uppercase tracking-tight">Connect with us</h2>
              <p className="text-secondary text-sm mt-sm">
                Have questions about memberships or want to schedule a visit? Send us a message and our team will connect with you.
              </p>
            </div>
            <form className="flex flex-col gap-md">
              <div className="flex flex-col gap-sm">
                <label className="input-label" htmlFor="fullName">Full Name</label>
                <input className="input-field" id="fullName" placeholder="John Doe" type="text" required />
              </div>
              <div className="flex flex-col gap-sm">
                <label className="input-label" htmlFor="emailAddress">Email Address</label>
                <input className="input-field" id="emailAddress" placeholder="john@example.com" type="email" required />
              </div>
              <div className="flex flex-col gap-sm">
                <label className="input-label" htmlFor="phoneNumber">Phone Number</label>
                <input className="input-field" id="phoneNumber" placeholder="+91 98765 43210" type="tel" required />
              </div>
              <div className="flex flex-col gap-sm">
                <label className="input-label" htmlFor="message">Message</label>
                <textarea 
                  className="bg-[#181818] border border-[#323232] rounded-xl p-4 text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-body-md resize-none h-32" 
                  id="message" 
                  placeholder="Tell us about your goals..." 
                  required
                />
              </div>
              <button 
                className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold rounded-xl py-4 hover:bg-primary transition-all active:scale-[0.98] cursor-pointer"
                type="submit"
              >
                Send Request
              </button>
            </form>
          </div>

          {/* Right Column: Contact info & Operating Hours */}
          <div className="flex flex-col gap-xl">
            {/* Contact Details */}
            <div className="bg-[#181818] border border-[#323232] rounded-2xl p-xl flex flex-col gap-lg">
              <h3 className="font-headline-md text-2xl font-bold text-white">Facility Details</h3>
              <div className="flex flex-col gap-md">
                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Street Address</h4>
                    <p className="text-secondary text-sm mt-xs">123 Gym Street, Sector V, Salt Lake City, Kolkata - 700091</p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Contact Number</h4>
                    <p className="text-secondary text-sm mt-xs">+91 33 2345 6789 / +91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-start gap-md">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Email Address</h4>
                    <p className="text-secondary text-sm mt-xs">support@thefithubgym.com / admin@thefithubgym.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="bg-[#181818] border border-[#323232] rounded-2xl p-xl overflow-hidden">
              <h3 className="font-headline-md text-2xl font-bold text-white mb-md">Operating Hours</h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#323232]">
                    <th className="py-sm font-label-sm text-label-sm text-secondary uppercase font-semibold">Day</th>
                    <th className="py-sm font-label-sm text-label-sm text-secondary uppercase font-semibold text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="font-body-md text-body-md">
                  <tr className="border-b border-[#323232]">
                    <td className="py-md text-on-surface">Monday - Friday</td>
                    <td className="py-md text-secondary text-right">5:00 AM - 11:00 PM</td>
                  </tr>
                  <tr className="border-b border-[#323232]">
                    <td className="py-md text-on-surface">Saturday</td>
                    <td className="py-md text-secondary text-right">6:00 AM - 9:00 PM</td>
                  </tr>
                  <tr>
                    <td className="py-md text-on-surface">Sunday</td>
                    <td className="py-md text-secondary text-right">7:00 AM - 8:00 PM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="w-full h-96 border-t border-[#323232] relative bg-surface-container-highest flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center opacity-65 grayscale" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC5xmJNc-NU6Ode4H2ovgTdyS7SyDQHA8VHMXVmX_lpvQtwsKux6YA2dh1S42841koZX6Xm1oWmZcOJONmyW5mmOzdJ96sVrxNK4FzX7tGdc9BWp1C5CDjx0j6VqzgWPkrnEDpoPzwSrp-npJUD-SXpGajcvzPXS84cd5DMbSW8EreUsN04lBQsDPKmflaGMXR834_m8EWThxdICAbypCRk851XRUYlnHdQUNIxFaGbme6Y3HVJkOMqAGZjCFsHtzQVkmpNXNi3b6k')" }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-lg left-1/2 -translate-x-1/2 bg-[#181818] border border-[#323232] px-lg py-md rounded-xl shadow-lg backdrop-blur-md flex items-center gap-md">
            <Compass className="w-5 h-5 text-primary-container animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-label-md text-label-md font-bold text-white">Find Us in Sector V, Salt Lake City</span>
          </div>
        </section>
      </main>

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
            <Link href="/contact" className="hover:text-primary transition-colors text-primary font-bold">Contact</Link>
            <Link href="/auth/login" className="hover:text-primary transition-colors">Admin Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
