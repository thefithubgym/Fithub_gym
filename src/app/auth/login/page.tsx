"use client";

import { useActionState, useState } from "react";
import { authenticate } from "@/features/auth/actions";
import { Eye, EyeOff, Dumbbell, ArrowRight, Check } from "lucide-react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-container-margin font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Background Atmospheric Element */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high via-background to-background"></div>

      {/* Main Login Container */}
      <main className="w-full max-w-[440px] relative z-10 flex flex-col gap-xl">
        {/* Header / Branding */}
        <header className="flex flex-col items-center justify-center text-center gap-sm">
          <div className="w-16 h-16 rounded-xl bg-surface-container flex items-center justify-center border border-surface-container-highest mb-md">
            <span className="material-symbols-outlined text-[32px] text-primary" data-icon="fitness_center">fitness_center</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface">The FitHub</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Admin Portal</p>
        </header>

        {/* Login Card */}
        <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg md:p-xl shadow-2xl flex flex-col gap-lg">
          <div className="flex flex-col gap-xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">Secure Login</h2>
            <p className="font-body-md text-body-md text-secondary">
              Enter your credentials to access the Elite Performance Framework.
            </p>
          </div>

          <form action={formAction} className="flex flex-col gap-md">
            {/* Error Message */}
            {state?.error && (
              <div className="bg-error-container/20 border border-error/30 text-error text-sm p-sm rounded-lg">
                {state.error}
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-sm">
              <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider" htmlFor="email">
                Administrator Email
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-md text-secondary pointer-events-none">mail</span>
                <input 
                  className="w-full bg-[#181818] border border-[#323232] rounded-xl py-sm pl-[48px] pr-md text-on-surface placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-body-md h-[48px]" 
                  id="email" 
                  name="email" 
                  placeholder="admin@thefithub.com" 
                  required 
                  type="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <a className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors" href="#">
                  Forgot?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-md text-secondary pointer-events-none">lock</span>
                <input 
                  className="w-full bg-[#181818] border border-[#323232] rounded-xl py-sm pl-[48px] pr-md text-on-surface placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-body-md h-[48px]" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                />
                <button 
                  aria-label="Toggle password visibility" 
                  className="absolute right-md text-secondary hover:text-on-surface transition-colors focus:outline-none" 
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between mt-sm">
              <label className="flex items-center gap-sm cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    className="peer appearance-none w-5 h-5 border border-[#323232] rounded-[4px] bg-[#181818] checked:bg-primary-container checked:border-primary-container transition-colors cursor-pointer" 
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <Check className="absolute inset-0 pointer-events-none text-surface opacity-0 peer-checked:opacity-100 w-5 h-5 p-0.5 transition-opacity" />
                </div>
                <span className="font-label-md text-label-md text-secondary group-hover:text-on-surface transition-colors">
                  Remember Me
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isPending}
              className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold rounded-xl h-[48px] flex items-center justify-center gap-sm hover:bg-primary transition-colors active:scale-[0.98] mt-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
            >
              <span>{isPending ? "Logging in..." : "Login to Dashboard"}</span>
              {!isPending && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>
        </section>

        {/* Footer / Legal */}
        <footer className="text-center">
          <p className="font-label-sm text-label-sm text-tertiary-container">
            © 2026 The FitHub Gym. Authorized Personnel Only.
          </p>
        </footer>
      </main>
    </div>
  );
}
