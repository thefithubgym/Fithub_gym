"use client";

import { useActionState, useState, useTransition } from "react";
import { authenticate } from "@/features/auth/actions";
import { Eye, EyeOff, X, Loader2, CheckCircle2, Lock } from "lucide-react";
import { sendForgotPasswordOtpAction, verifyOtpAndResetPasswordAction } from "@/features/auth/account-actions";
import Logo from "@/components/common/Logo";

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
      <div className="bg-[#181818] border border-[#323232] rounded-2xl p-lg shadow-2xl w-full max-w-md relative text-left">
        <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-white transition-colors cursor-pointer border-none bg-transparent">
          <X className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-sm mb-md">
          <div className="w-9 h-9 rounded-xl bg-primary-container/20 border border-primary-container/30 flex items-center justify-center">
            <Lock className="w-4.5 h-4.5 text-primary" />
          </div>
          <div>
            <h3 className="font-display text-md font-bold text-on-background">Forgot Password</h3>
            <p className="text-[10px] text-secondary">Verify ownership with an OTP</p>
          </div>
        </div>

        {step === "email" && (
          <div className="flex flex-col gap-sm">
            <div className="flex flex-col gap-1">
              <label className="input-label" htmlFor="otp-email">Admin Email</label>
              <input id="otp-email" className="input-field h-[40px]" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@example.com" />
            </div>
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <button onClick={handleSendOtp} disabled={pending} className="bg-primary-container text-on-primary-container px-lg rounded-xl hover:bg-primary transition-colors text-sm font-bold flex items-center justify-center gap-xs cursor-pointer disabled:opacity-50 h-[40px] w-full border-none">
              {pending ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : "Send OTP"}
            </button>
          </div>
        )}

        {step === "otp" && (
          <div className="flex flex-col gap-sm">
            <div className="bg-[#111] border border-primary-container/20 rounded-xl p-sm text-[11px] text-secondary">
              OTP sent to <span className="text-primary font-semibold">{email}</span>. Valid for 10 minutes.
            </div>
            <div className="flex flex-col gap-1">
              <label className="input-label" htmlFor="otp-code">6-Digit OTP</label>
              <input id="otp-code" className="input-field h-[40px] tracking-[0.5em] text-center text-md font-bold" type="text" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} placeholder="------" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="input-label" htmlFor="otp-newpass">New Password</label>
              <div className="relative">
                <input id="otp-newpass" className="input-field h-[40px] pr-10" type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors border-none bg-transparent">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="input-label" htmlFor="otp-confirmpass">Confirm Password</label>
              <div className="relative">
                <input id="otp-confirmpass" className="input-field h-[40px] pr-10" type={showConfirm ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors border-none bg-transparent">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-sm flex flex-col gap-1">
              {RULES.map((rule) => {
                const ok = rule.check(newPass);
                return (
                  <div key={rule.label} className={`flex items-center gap-xs text-[11px] transition-colors ${ok ? "text-emerald-400" : "text-secondary"}`}>
                    <CheckCircle2 className={`w-3 h-3 shrink-0 ${ok ? "opacity-100" : "opacity-30"}`} />
                    {rule.label}
                  </div>
                );
              })}
            </div>
            {err && <p className="text-red-400 text-xs">{err}</p>}
            <button onClick={handleVerify} disabled={pending} className="bg-primary-container text-on-primary-container px-lg rounded-xl hover:bg-primary transition-colors text-sm font-bold flex items-center justify-center gap-xs cursor-pointer disabled:opacity-50 h-[40px] w-full border-none">
              {pending ? <><Loader2 className="w-4 h-4 animate-spin" />Verifying...</> : "Reset Password"}
            </button>
          </div>
        )}

        {step === "done" && (
          <div className="flex flex-col items-center gap-sm py-sm text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <p className="text-white text-sm font-semibold">Password reset successfully!</p>
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
    <div className="h-screen max-h-screen overflow-hidden flex items-center justify-center p-md md:p-container-margin font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container relative">
      {/* Background Layer with Image and Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <img
          alt="FitHub Gym Interior"
          className="w-full h-full object-cover grayscale-[0.2] blur-[4px]"
          src="/assets/bg.png"
        />
      </div>

      {showForgotModal && (
        <OtpModal
          onClose={() => setShowForgotModal(false)}
          onSuccess={() => setSuccessMsg("Password reset successfully! Please log in with your new password.")}
        />
      )}

      {/* Main Login Container */}
      <main className="relative z-20 w-full max-w-[440px] px-container-margin animate-in fade-in zoom-in duration-500">
        <div className="bg-[#181818] border border-[#323232] rounded-xl p-md sm:p-lg shadow-2xl flex flex-col gap-md">
          {/* Branding Header with Logo Component */}
          <div className="flex flex-col items-center text-center gap-sm">
            <Logo />
            <div className="space-y-1">
              <h1 className="font-headline-md text-white tracking-tight uppercase text-base sm:text-lg font-bold">
                Administrator Login
              </h1>
              <p className="text-secondary text-label-md max-w-[320px] mx-auto text-[11px] sm:text-xs">
                Sign in to access the FitHub Gym Management Dashboard.
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form action={formAction} className="flex flex-col gap-md" id="loginForm">
            {/* Error Message */}
            {state?.error && (
              <div className="bg-error-container/20 border border-error/30 text-error text-xs p-2 rounded-lg">
                {state.error}
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="bg-[#10b981]/10 border border-[#10b981]/30 text-[#34d399] text-xs p-2 rounded-lg">
                {successMsg}
              </div>
            )}

            {/* Email Input */}
            <div className="flex flex-col gap-sm">
              <label className="font-label-sm text-secondary uppercase tracking-widest text-[10px] font-semibold" htmlFor="email">
                Administrator Email
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  className="w-full h-[48px] pl-[44px] pr-md rounded-xl bg-[#1c1b1b] border border-[#323232] text-white placeholder:text-secondary-container focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container transition-all font-body-md text-sm"
                  id="email"
                  name="email"
                  placeholder="admin@thefithub.gym"
                  required
                  type="email"
                  disabled={isPending}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-sm">
              <div className="flex justify-between items-center">
                <label className="font-label-sm text-secondary uppercase tracking-widest text-[10px] font-semibold" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setSuccessMsg(""); setShowForgotModal(true); }}
                  className="text-primary hover:text-primary-fixed transition-colors font-label-sm text-[10px] cursor-pointer border-none bg-transparent"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  className="w-full h-[48px] pl-[44px] pr-[48px] rounded-xl bg-[#1c1b1b] border border-[#323232] text-white placeholder:text-secondary-container focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container transition-all font-body-md text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  disabled={isPending}
                />
                <button
                  className="absolute right-md top-1/2 -translate-y-1/2 text-secondary hover:text-white transition-colors focus:outline-none border-none bg-transparent cursor-pointer"
                  id="togglePassword"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-sm cursor-pointer group w-fit">
              <div className="relative flex items-center">
                <input
                  className="peer appearance-none w-[18px] h-[18px] border border-[#323232] rounded-md bg-[#181818] checked:bg-primary-container checked:border-primary-container transition-all cursor-pointer"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="material-symbols-outlined absolute opacity-0 peer-checked:opacity-100 text-on-primary-fixed text-[14px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ fontVariationSettings: "'wght' 700" }}>
                  check
                </span>
              </div>
              <span className="text-label-md text-secondary group-hover:text-white transition-colors text-xs font-medium">
                Remember Me
              </span>
            </label>

            {/* Action Button */}
            <button
              className="w-full h-[50px] bg-primary-container hover:bg-primary text-on-primary-container font-bold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-md uppercase tracking-tight cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-none text-sm"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Login to Dashboard</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          {/* Helper Text & Footer */}
          <div className="flex flex-col items-center gap-sm border-t border-[#323232] pt-md">
            <p className="text-label-md text-secondary text-xs">
              Need help? <a className="text-primary hover:underline underline-offset-4" href="#">Contact Gym Owner</a>
            </p>
            <footer className="text-center">
              <p className="font-label-sm text-secondary-fixed-dim tracking-wider text-[9px] uppercase text-neutral-500">
                © THE FITHUB GYM • ADMIN PORTAL
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}

