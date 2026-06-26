"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateMemberAction } from "@/features/members/actions";
import { Gender } from "@prisma/client";
import { Check, ArrowLeft } from "lucide-react";

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  gender: Gender;
  email?: string | null;
  dateOfBirth?: Date | null;
  address?: string | null;
  emergencyContact?: string | null;
  emergencyPhone?: string | null;
  notes?: string | null;
  avatarUrl?: string | null;
}

interface EditMemberFormProps {
  member: Member;
}

export default function EditMemberForm({ member }: EditMemberFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      phone: member.phone,
      gender: member.gender,
      email: member.email || "",
      dateOfBirth: member.dateOfBirth ? new Date(member.dateOfBirth).toISOString().split("T")[0] : "",
      address: member.address || "",
      emergencyContact: member.emergencyContact || "",
      emergencyPhone: member.emergencyPhone || "",
      notes: member.notes || "",
      avatarUrl: member.avatarUrl || "",
    }
  });

  const onSubmit = async (data: any) => {
    setError(null);
    setLoading(true);

    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        gender: data.gender,
        email: data.email || undefined,
        dateOfBirth: data.dateOfBirth || undefined,
        address: data.address || undefined,
        emergencyContact: data.emergencyContact || undefined,
        emergencyPhone: data.emergencyPhone || undefined,
        notes: data.notes || undefined,
        avatarUrl: data.avatarUrl || undefined,
      };

      const res = await updateMemberAction(member.id, payload);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push(`/admin/members/${member.id}`), 1500);
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-lg pb-xl">
      {/* Back Header */}
      <button 
        type="button" 
        onClick={() => router.back()}
        className="text-on-surface-variant hover:text-on-surface flex items-center gap-xs font-label-md text-sm self-start cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Member Profile
      </button>

      {/* Title */}
      <div>
        <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight">Edit Member Profile</h2>
        <p className="text-secondary text-sm">Update the contact or personal details of the member.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-xl">
        {error && (
          <div className="bg-error-container/20 border border-error/30 text-error text-sm p-md rounded-xl">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm p-md rounded-xl flex items-center gap-sm">
            <Check className="w-5 h-5" />
            Profile updated successfully! Redirecting...
          </div>
        )}

        {/* Form fields */}
        <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col gap-md">
          <div className="grid grid-cols-2 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="firstName">First Name</label>
              <input className="input-field h-[40px] text-sm py-2" id="firstName" {...register("firstName")} required />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="lastName">Last Name</label>
              <input className="input-field h-[40px] text-sm py-2" id="lastName" {...register("lastName")} required />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="input-label" htmlFor="phone">Phone Number</label>
            <input className="input-field h-[40px] text-sm py-2" id="phone" {...register("phone")} required />
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="gender">Gender</label>
              <select className="input-field h-[40px] text-sm py-2 px-3 outline-none" id="gender" {...register("gender")}>
                <option value={Gender.MALE}>Male</option>
                <option value={Gender.FEMALE}>Female</option>
                <option value={Gender.OTHER}>Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="dateOfBirth">Date of Birth</label>
              <input className="input-field h-[40px] text-sm py-2" id="dateOfBirth" type="date" {...register("dateOfBirth")} />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="input-label" htmlFor="email">Email Address</label>
            <input className="input-field h-[40px] text-sm py-2" id="email" type="email" {...register("email")} />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="input-label" htmlFor="address">Street Address</label>
            <input className="input-field h-[40px] text-sm py-2" id="address" {...register("address")} />
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="emergencyContact">Emergency Contact</label>
              <input className="input-field h-[40px] text-sm py-2" id="emergencyContact" {...register("emergencyContact")} />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="emergencyPhone">Emergency Phone</label>
              <input className="input-field h-[40px] text-sm py-2" id="emergencyPhone" {...register("emergencyPhone")} />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="input-label" htmlFor="notes">Internal Notes</label>
            <textarea 
              className="bg-[#181818] border border-[#323232] rounded-xl p-3 text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-sm resize-none h-28" 
              id="notes" 
              {...register("notes")}
            />
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-md justify-end">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="border border-[#323232] text-white font-bold rounded-xl px-lg py-3 hover:bg-surface-container-high transition-colors font-label-md text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button 
            disabled={loading}
            className="bg-primary-container text-on-primary-container font-bold rounded-xl px-2xl py-3 hover:bg-primary transition-all font-label-md text-sm disabled:opacity-50 cursor-pointer"
            type="submit"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
