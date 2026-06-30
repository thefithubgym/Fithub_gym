"use client";

import { useActionState, useState, useTransition } from "react";
import { authenticate } from "@/features/auth/actions";
import { Eye, EyeOff, Dumbbell, ArrowRight, Check, X, Loader2, CheckCircle2, Lock } from "lucide-react";
import { sendForgotPasswordOtpAction, verifyOtpAndResetPasswordAction } from "@/features/auth/account-actions";

const RULES = [
  { label: "Minimum 8 characters",   check: (p: string) => p.length >= 8 },
  { label: "One uppercase letter",   check: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter",   check: (p: string) => /[a-z]/.test(p) },
  { label: "One number",             check: (p: string) => /[0-9]/.test(p) },
  { label: "One special character",  check: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

function OtpModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void; }) {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [err, setErr] = useState("");
  const [pending, startTransition] = useTransition();

  const handleSendOtp = () => {
    if (!email) { setErr("Please enter your email."); return; }
    setErr("");
    startTransition(async () => {
      const res = await sendForgotPasswordOtpAction(email);
      if (res.error) { setErr(res.error); return; }
      setStep("otp");
    });
  };

  const handleVerify = () => {
    if (!otp || !newPass || !confirmPass) { setErr("Please fill in all fields."); return; }
    setErr("");
    startTransition(async () => {
      const res = await verifyOtpAndResetPasswordAction({ email, otp, newPassword: newPass, confirmPassword: confirmPass });
      if (res.error) { setErr(res.error); return; }
      setStep("done");
      setTimeout(() => { onSuccess(); onClose(); }, 1500);
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-md">
      <div className="bg-[#181818] border border-[#323232] rounded-2xl p-xl shadow-2xl w-full max-w-md relative text-left">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors cursor-pointer">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-sm mb-lg">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-on-background">Forgot Password</h3>
            <p className="text-xs text-secondary">Verify ownership with an OTP</p>
          </div>
        </div>

        {step === "email" && (
          <div className="flex flex-col gap-md">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="otp-email">Admin Email</label>
              <input id="otp-email" className="input-field h-[42px]" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
            </div>
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <button onClick={handleSendOtp} disabled={pending} className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl hover:bg-primary transition-colors text-sm font-bold flex items-center justify-center gap-xs cursor-pointer disabled:opacity-50 h-[42px]">
              {pending ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-col gap-md">
            <div className="bg-[#111] border border-primary-container/20 rounded-xl p-md text-xs text-secondary">
              OTP sent to <span className="text-primary font-semibold">{email}</span>. Valid for 10 minutes.
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="otp-code">6-Digit OTP</label>
              <input id="otp-code" className="input-field h-[42px] tracking-[0.5em] text-center text-lg font-bold" type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="------" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="otp-newpass">New Password</label>
              <div className="relative">
                <input id="otp-newpass" className="input-field h-[42px] pr-10" type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="otp-confirmpass">Confirm Password</label>
              <div className="relative">
                <input id="otp-confirmpass" className="input-field h-[42px] pr-10" type={showConfirm ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-md flex flex-col gap-1.5">
              {RULES.map((rule) => {
                const ok = rule.check(newPass);
                return (
                  <div key={rule.label} className={`flex items-center gap-xs text-xs transition-colors ${ok ? "text-emerald-400" : "text-secondary"}`}>
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${ok ? "opacity-100" : "opacity-30"}`} />
                    {rule.label}
                  </div>
                );
              })}
            </div>
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <button onClick={handleVerify} disabled={pending} className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl hover:bg-primary transition-colors text-sm font-bold flex items-center justify-center gap-xs cursor-pointer disabled:opacity-50 h-[42px]">
              {pending ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : "Reset Password"}
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center gap-md py-md">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <p className="text-white font-semibold">Password reset successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-md md:p-container-margin font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Background Atmospheric Element */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high via-background to-background"></div>

      {showForgotModal && (
        <OtpModal
          onClose={() => setShowForgotModal(false)}
          onSuccess={() => setSuccessMsg("Password reset successfully! Please log in with your new password.")}
        />
      )}

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

            {/* Success Message */}
            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm p-sm rounded-lg">
                {successMsg}
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
                <button
                  type="button"
                  onClick={() => { setSuccessMsg(""); setShowForgotModal(true); }}
                  className="font-label-md text-label-md text-primary-container hover:text-primary transition-colors cursor-pointer"
                >
                  Forgot?
                </button>
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
