"use client";

import { useState, useEffect, useTransition } from "react";
import { Building2, User, Loader2, CheckCircle2, XCircle, X, Eye, EyeOff, LogOut, Clock, Mail, Lock } from "lucide-react";
import { getSettingsAction, updateSettingsAction } from "@/features/settings/actions";
import { getAccountInfoAction, changePasswordAction, sendForgotPasswordOtpAction, verifyOtpAndResetPasswordAction, changeEmailAction } from "@/features/auth/account-actions";
import { signOut } from "next-auth/react";

type Toast = { type: "success" | "error"; message: string } | null;
type Tab = "gym" | "account";

const RULES = [
  { label: "Minimum 8 characters",  check: (p: string) => p.length >= 8 },
  { label: "One uppercase letter",  check: (p: string) => /[A-Z]/.test(p) },
  { label: "One lowercase letter",  check: (p: string) => /[a-z]/.test(p) },
  { label: "One number",            check: (p: string) => /[0-9]/.test(p) },
  { label: "One special character", check: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

// ── OTP Modal ────────────────────────────────────────────────────────
function OtpModal({ prefillEmail, onClose, onSuccess }: { prefillEmail?: string; onClose: () => void; onSuccess: () => void; }) {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState(prefillEmail || "");
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
            <h3 className="font-display text-lg font-bold text-on-background">Reset Password</h3>
            <p className="text-xs text-secondary">OTP sent to your registered admin email</p>
          </div>
        </div>

        {step === "email" && (
          <div className="flex flex-col gap-md">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="otp-email">Admin Registered Email</label>
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

// ── Main Settings Page ────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("gym");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  // Gym form state
  const [gymName, setGymName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [addressLine3, setAddressLine3] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [registrationFee, setRegistrationFee] = useState(200);
  const [expiryReminderDays, setExpiryReminderDays] = useState(5);
  const [socialInstagram, setSocialInstagram] = useState("");
  const [socialWhatsapp, setSocialWhatsapp] = useState("");
  const [socialGoogleMaps, setSocialGoogleMaps] = useState("");
  const [socialEmail, setSocialEmail] = useState("");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Account tab state
  const [accountEmail, setAccountEmail] = useState("");
  const [lastLoginAt, setLastLoginAt] = useState<string | null>(null);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changingPass, setChangingPass] = useState(false);

  // Email update state
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState("");
  const [emailConfirmPassword, setEmailConfirmPassword] = useState("");
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);

  useEffect(() => { loadSettings(); }, []);
  useEffect(() => { if (activeTab === "account") loadAccountInfo(); }, [activeTab]);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await getSettingsAction();
      if (res.error) { showToast("error", res.error); return; }
      if (res.data) {
        const d = res.data;
        setGymName(d.gymName); setAddressLine1(d.addressLine1 || ""); setAddressLine2(d.addressLine2 || "");
        setAddressLine3(d.addressLine3 || ""); setPhoneNo(d.phoneNo || "");
        setRegistrationFee(d.registrationFee); setExpiryReminderDays(d.expiryReminderDays ?? 5);
        setSocialInstagram(d.socialInstagram || ""); setSocialWhatsapp(d.socialWhatsapp || "");
        setSocialGoogleMaps(d.socialGoogleMaps || ""); setSocialEmail(d.socialEmail || "");
        setTimezone(d.timezone);
      }
    } catch (err: any) { showToast("error", err.message || "Failed to load settings."); }
    finally { setLoading(false); }
  };

  const loadAccountInfo = async () => {
    const res = await getAccountInfoAction();
    if (res.success && res.data) {
      setAccountEmail(res.data.email);
      setNewEmailInput(res.data.email);
      setLastLoginAt(res.data.lastLoginAt);
    }
  };

  const handleSaveGym = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    try {
      const res = await updateSettingsAction({
        gymName, addressLine1, addressLine2, addressLine3, phoneNo,
        registrationFee, expiryReminderDays,
        socialInstagram: socialInstagram || null, socialWhatsapp: socialWhatsapp || null,
        socialGoogleMaps: socialGoogleMaps || null, socialEmail: socialEmail || null,
        timezone, whatsappEnabled: false, whatsappPhoneId: null, whatsappToken: null, businessId: null,
      });
      if (res.error) showToast("error", res.error);
      else showToast("success", "Settings saved successfully!");
    } catch (err: any) { showToast("error", err.message || "Failed to save settings."); }
    finally { setSaving(false); }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault(); setChangingPass(true);
    try {
      const res = await changePasswordAction({ currentPassword: currentPass, newPassword: newPass, confirmPassword: confirmPass });
      if (res.error) showToast("error", res.error);
      else { showToast("success", "Password changed successfully!"); setCurrentPass(""); setNewPass(""); setConfirmPass(""); }
    } catch (err: any) { showToast("error", err.message || "Failed to change password."); }
    finally { setChangingPass(false); }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault(); setUpdatingEmail(true);
    try {
      const res = await changeEmailAction({ newEmail: newEmailInput, passwordConfirm: emailConfirmPassword });
      if (res.error) showToast("error", res.error);
      else {
        showToast("success", "Email updated successfully! Logging out...");
        setIsEditingEmail(false); setEmailConfirmPassword("");
        setTimeout(() => { signOut({ callbackUrl: "/auth/login" }); }, 1500);
      }
    } catch (err: any) { showToast("error", err.message || "Failed to update email."); }
    finally { setUpdatingEmail(false); }
  };

  const formatLoginDate = (iso: string | null) => {
    if (!iso) return "No sessions recorded yet";
    return new Date(iso).toLocaleString("en-IN", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Kolkata" });
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-lg w-full max-w-4xl mx-auto animate-pulse">
        <div>
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-xl w-64 mb-sm"></div>
          <div className="h-5 bg-[#181818] border border-[#323232] rounded-lg w-full max-w-md"></div>
        </div>
        <div className="flex border-b border-[#323232] gap-sm mt-md pb-xs">
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-lg w-36"></div>
          <div className="h-10 bg-[#181818] border border-[#323232] rounded-lg w-36"></div>
        </div>
        <div className="bg-[#181818] border border-[#323232] rounded-xl p-xl flex flex-col gap-md">
          {[1,2,3].map(i => (
            <div key={i} className="flex flex-col gap-xs">
              <div className="h-4 bg-[#262626] rounded-md w-24"></div>
              <div className="h-12 bg-[#262626] rounded-xl w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-lg w-full max-w-4xl mx-auto">
      {showOtpModal && (
        <OtpModal
          prefillEmail={accountEmail}
          onClose={() => setShowOtpModal(false)}
          onSuccess={() => showToast("success", "Password reset! Log in with your new password.")}
        />
      )}

      {/* Header */}
      <div>
        <h2 className="font-display text-4xl font-extrabold text-on-background uppercase tracking-tight">System Settings</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Configure gym preferences, contact details, fees, and your account.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#323232] gap-sm mt-md">
        {([["gym","General",Building2],["account","Account",User]] as const).map(([tab, label, Icon]) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-xs pb-md px-md font-label-md text-sm cursor-pointer transition-colors border-b-2 ${activeTab === tab ? "border-primary text-primary font-bold" : "border-transparent text-secondary hover:text-white"}`}>
            <Icon className="w-4 h-4" />{label}
          </button>
        ))}
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[9999] flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[320px] max-w-sm animate-[slideInRight_0.35s_cubic-bezier(0.16,1,0.3,1)_both] ${toast.type === "success" ? "bg-[#0d1f18]/95 border-[#10B981]/40 text-[#10B981]" : "bg-[#1f0d0d]/95 border-red-500/40 text-red-400"}`}
          style={{ boxShadow: toast.type === "success" ? "0 8px 32px rgba(16,185,129,0.15)" : "0 8px 32px rgba(239,68,68,0.15)" }}>
          <div className="shrink-0 mt-0.5">{toast.type === "success" ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}</div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{toast.type === "success" ? "Success!" : "Error"}</p>
            <p className="text-xs opacity-80 mt-0.5 leading-relaxed">{toast.message}</p>
            <div className={`mt-2 h-0.5 rounded-full ${toast.type === "success" ? "bg-[#10B981]/30" : "bg-red-500/30"}`}>
              <div className={`h-full rounded-full animate-[shrink_4s_linear_forwards] ${toast.type === "success" ? "bg-[#10B981]" : "bg-red-500"}`} />
            </div>
          </div>
          <button onClick={() => setToast(null)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* ── GYM TAB ── */}
      {activeTab === "gym" && (
        <form onSubmit={handleSaveGym} className="bg-[#181818] border border-[#323232] rounded-2xl p-lg md:p-xl flex flex-col gap-lg shadow-lg">
          <div className="flex flex-col gap-xl">
            <div className="flex flex-col gap-md">
              <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide border-b border-[#323232] pb-xs mb-sm">1. Gym Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs md:col-span-2">
                  <label className="input-label" htmlFor="gymName">Gym/Facility Name</label>
                  <input id="gymName" className="input-field h-[42px]" type="text" value={gymName} onChange={(e) => setGymName(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-xs md:col-span-2">
                  <label className="input-label" htmlFor="addressLine1">Address Line 1</label>
                  <input id="addressLine1" className="input-field h-[42px]" type="text" placeholder="e.g. Plot No. 6456, Ward No. 17, Opp. Govt. ITI" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="addressLine2">Address Line 2</label>
                  <input id="addressLine2" className="input-field h-[42px]" type="text" placeholder="e.g. Kalambha Road" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="addressLine3">Address Line 3 / City & Pin</label>
                  <input id="addressLine3" className="input-field h-[42px]" type="text" placeholder="e.g. Narkhed - 441304" value={addressLine3} onChange={(e) => setAddressLine3(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="phoneNo">Contact Phone Number</label>
                  <input id="phoneNo" className="input-field h-[42px]" type="text" placeholder="e.g. +91 87888 49529" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="timezone">Default Timezone</label>
                  <select id="timezone" className="input-field px-3 h-[42px] outline-none" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="US/Eastern">US/Eastern (EST/EDT)</option>
                    <option value="Europe/London">Europe/London (GMT/BST)</option>
                  </select>
                  <p className="text-[11px] text-secondary">System-wide date conversions adapt to this zone.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide border-b border-[#323232] pb-xs mb-sm">2. Membership Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="regFee">Default Registration Fee (₹)</label>
                  <input id="regFee" className="input-field h-[42px]" type="number" min={0} value={registrationFee} onChange={(e) => setRegistrationFee(Number(e.target.value))} required />
                  <p className="text-[11px] text-secondary">Fee charged only on new member registrations. Renewals are exempt.</p>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="expiryReminderDays">Expiry Reminder Days</label>
                  <input id="expiryReminderDays" className="input-field h-[42px]" type="number" min={1} value={expiryReminderDays} onChange={(e) => setExpiryReminderDays(Number(e.target.value))} required />
                  <p className="text-[11px] text-secondary">Days before membership expiration to display warnings and send alerts.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-md">
              <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide border-b border-[#323232] pb-xs mb-sm">3. Social Links & Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="socialInstagram">Instagram URL</label>
                  <input id="socialInstagram" className="input-field h-[42px]" type="text" placeholder="e.g. https://www.instagram.com/thefithubgym.narkhed" value={socialInstagram} onChange={(e) => setSocialInstagram(e.target.value)} />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="socialWhatsapp">WhatsApp URL/Number</label>
                  <input id="socialWhatsapp" className="input-field h-[42px]" type="text" placeholder="e.g. https://wa.me/918788849529" value={socialWhatsapp} onChange={(e) => setSocialWhatsapp(e.target.value)} />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="socialGoogleMaps">Google Maps Link</label>
                  <input id="socialGoogleMaps" className="input-field h-[42px]" type="text" placeholder="Google Maps Directions URL" value={socialGoogleMaps} onChange={(e) => setSocialGoogleMaps(e.target.value)} />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="socialEmail">Email Address (Website Contact)</label>
                  <input id="socialEmail" className="input-field h-[42px]" type="email" placeholder="e.g. contact@fithub.com" value={socialEmail} onChange={(e) => setSocialEmail(e.target.value)} />
                  <p className="text-[11px] text-secondary">Displayed on the public website. Not used for admin login.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-md border-t border-[#323232] pt-lg mt-md">
            <button type="button" onClick={loadSettings} className="border border-[#323232] text-white px-lg py-sm rounded-xl hover:bg-[#262626] transition-colors text-xs font-semibold cursor-pointer">Reset</button>
            <button type="submit" disabled={saving} className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl hover:bg-primary transition-colors text-xs font-bold flex items-center gap-xs cursor-pointer disabled:opacity-50">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving...</> : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {/* ── ACCOUNT TAB ── */}
      {activeTab === "account" && (
        <div className="flex flex-col gap-lg">
          {/* 1. Registered Email */}
          <div className="bg-[#181818] border border-[#323232] rounded-2xl p-lg md:p-xl shadow-lg">
            <div className="flex items-center justify-between border-b border-[#323232] pb-xs mb-lg">
              <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide">1. Registered Email</h3>
              {!isEditingEmail && (
                <button type="button" onClick={() => setIsEditingEmail(true)}
                  className="text-xs text-primary-container hover:text-primary transition-colors underline underline-offset-2 cursor-pointer">
                  Change Email
                </button>
              )}
            </div>

            {!isEditingEmail ? (
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-xl bg-primary-container/15 border border-primary-container/25 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-secondary mb-0.5">Admin Login Email</p>
                  <p className="text-white font-semibold">{accountEmail || "—"}</p>
                  <p className="text-[11px] text-secondary mt-0.5">Used for admin portal login and OTP delivery. Different from the website contact email in General settings.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleChangeEmail} className="flex flex-col gap-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  <div className="flex flex-col gap-xs">
                    <label className="input-label" htmlFor="newEmailInput">New Login Email</label>
                    <input id="newEmailInput" className="input-field h-[42px]" type="email" value={newEmailInput} onChange={(e) => setNewEmailInput(e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="input-label" htmlFor="emailConfirmPassword">Confirm Account Password</label>
                    <div className="relative">
                      <input id="emailConfirmPassword" className="input-field h-[42px] pr-10" type={showEmailConfirm ? "text" : "password"} value={emailConfirmPassword} onChange={(e) => setEmailConfirmPassword(e.target.value)} required />
                      <button type="button" onClick={() => setShowEmailConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                        {showEmailConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-md pt-sm">
                  <button type="button" onClick={() => { setIsEditingEmail(false); setNewEmailInput(accountEmail); setEmailConfirmPassword(""); }}
                    className="border border-[#323232] text-white px-lg py-sm rounded-xl hover:bg-[#262626] transition-colors text-xs font-semibold cursor-pointer">
                    Cancel
                  </button>
                  <button type="submit" disabled={updatingEmail}
                    className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl hover:bg-primary transition-colors text-xs font-bold flex items-center gap-xs cursor-pointer disabled:opacity-50">
                    {updatingEmail ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : "Update Email"}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* 2. Change Password */}
          <div className="bg-[#181818] border border-[#323232] rounded-2xl p-lg md:p-xl shadow-lg">
            <div className="flex items-center justify-between border-b border-[#323232] pb-xs mb-lg">
              <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide">2. Change Password</h3>
              <button type="button" onClick={() => setShowOtpModal(true)}
                className="text-xs text-primary-container hover:text-primary transition-colors underline underline-offset-2 cursor-pointer">
                Forgot password?
              </button>
            </div>
            <form onSubmit={handleChangePassword} className="flex flex-col gap-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs md:col-span-2">
                  <label className="input-label" htmlFor="currentPass">Current Password</label>
                  <div className="relative">
                    <input id="currentPass" className="input-field h-[42px] pr-10" type={showCurrent ? "text" : "password"} value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} required />
                    <button type="button" onClick={() => setShowCurrent(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="newPass">New Password</label>
                  <div className="relative">
                    <input id="newPass" className="input-field h-[42px] pr-10" type={showNew ? "text" : "password"} value={newPass} onChange={(e) => setNewPass(e.target.value)} required />
                    <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="confirmPass">Confirm New Password</label>
                  <div className="relative">
                    <input id="confirmPass" className="input-field h-[42px] pr-10" type={showConfirm ? "text" : "password"} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} required />
                    <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-white cursor-pointer transition-colors">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              {/* Password Rules */}
              <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-md">
                <p className="text-xs text-secondary font-semibold mb-sm uppercase tracking-wider">Password Requirements</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                  {RULES.map((rule) => {
                    const ok = newPass.length > 0 && rule.check(newPass);
                    return (
                      <div key={rule.label} className={`flex items-center gap-xs text-xs transition-colors ${ok ? "text-emerald-400" : "text-secondary"}`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 transition-opacity ${ok ? "opacity-100" : "opacity-30"}`} />
                        {rule.label}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-end pt-sm">
                <button type="submit" disabled={changingPass} className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl hover:bg-primary transition-colors text-xs font-bold flex items-center gap-xs cursor-pointer disabled:opacity-50">
                  {changingPass ? <><Loader2 className="w-4 h-4 animate-spin" />Updating...</> : "Update Password"}
                </button>
              </div>
            </form>
          </div>

          {/* 3. Last Login Session */}
          <div className="bg-[#181818] border border-[#323232] rounded-2xl p-lg md:p-xl shadow-lg">
            <h3 className="text-primary font-display text-base font-bold uppercase tracking-wide border-b border-[#323232] pb-xs mb-lg">3. Last Login Session</h3>
            <div className="flex items-start gap-md">
              <div className="w-10 h-10 rounded-xl bg-primary-container/15 border border-primary-container/25 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-secondary mb-1">Most Recent Login</p>
                <p className="text-white font-semibold">{formatLoginDate(lastLoginAt)}</p>
                {lastLoginAt && <p className="text-[11px] text-secondary mt-1">Only the most recent session is tracked. Updates every login.</p>}
              </div>
              <div className="flex items-center gap-xs shrink-0">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs text-emerald-400 font-semibold">Active</span>
              </div>
            </div>
          </div>

          {/* 4. Logout */}
          <div className="bg-[#181818] border border-red-900/30 rounded-2xl p-lg md:p-xl shadow-lg">
            <h3 className="text-red-400 font-display text-base font-bold uppercase tracking-wide border-b border-red-900/20 pb-xs mb-lg">4. Session</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">Sign out of admin portal</p>
                <p className="text-xs text-secondary mt-0.5">You will be redirected to the login page.</p>
              </div>
              <button type="button" onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="flex items-center gap-xs px-lg py-sm bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/20 hover:border-red-500/50 transition-all text-sm font-bold cursor-pointer">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
