"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateMembershipAction } from "@/features/members/actions";
import { PaymentMethod } from "@prisma/client";
import { Check, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Plan {
  id: string;
  name: string;
  memberType: string;
  price: number;
  durationMonths: number;
}

interface Membership {
  id: string;
  memberId: string;
  member: {
    firstName: string;
    lastName: string;
    phone: string | null;
  };
  membershipPlanId: string | null;
  customPlanName: string | null;
  amount: number;
  registrationFee: number;
  paymentMethod: PaymentMethod;
  paymentReference: string | null;
  startDate: string;
  endDate: string;
  remarks: string | null;
}

interface EditMembershipFormProps {
  membership: Membership;
  plans: Plan[];
}

export default function EditMembershipForm({ membership, plans }: EditMembershipFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      membershipPlanId: membership.membershipPlanId || "",
      customPlanName: membership.customPlanName || "",
      customPlanDuration: 1,
      amount: membership.amount,
      registrationFee: membership.registrationFee,
      paymentMethod: membership.paymentMethod,
      paymentReference: membership.paymentReference || "",
      startDate: membership.startDate,
      endDate: membership.endDate,
      remarks: membership.remarks || "",
    }
  });

  const selectedPlanId = watch("membershipPlanId");
  const selectedStartDate = watch("startDate");
  const customPlanDuration = watch("customPlanDuration");

  // Handle plan change to set default price & calculate end date (optional, for convenience)
  const handlePlanChange = (planId: string) => {
    if (!planId) {
      setValue("amount", 0);
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setValue("amount", plan.price);
      
      if (selectedStartDate) {
        const start = new Date(selectedStartDate);
        if (!isNaN(start.getTime())) {
          start.setMonth(start.getMonth() + plan.durationMonths);
          setValue("endDate", start.toISOString().split("T")[0]);
        }
      }
    }
  };

  // If start date or custom duration changes and no predefined plan is selected, auto calculate end date
  useEffect(() => {
    if (!selectedStartDate) return;
    const start = new Date(selectedStartDate);
    if (isNaN(start.getTime())) return;

    if (selectedPlanId) {
      const plan = plans.find(p => p.id === selectedPlanId);
      if (plan) {
        start.setMonth(start.getMonth() + plan.durationMonths);
        setValue("endDate", start.toISOString().split("T")[0]);
      }
    } else if (customPlanDuration) {
      const duration = Number(customPlanDuration);
      if (duration > 0) {
        start.setMonth(start.getMonth() + duration);
        setValue("endDate", start.toISOString().split("T")[0]);
      }
    }
  }, [selectedPlanId, selectedStartDate, customPlanDuration, plans, setValue]);

  const onSubmit = async (data: any) => {
    setError(null);
    setLoading(true);

    try {
      const payload = {
        membershipPlanId: data.membershipPlanId || null,
        customPlanName: data.membershipPlanId ? null : data.customPlanName,
        amount: Number(data.amount),
        registrationFee: Number(data.registrationFee),
        paymentMethod: data.paymentMethod,
        paymentReference: data.paymentReference || null,
        startDate: data.startDate,
        endDate: data.endDate,
        remarks: data.remarks || null,
      };

      const res = await updateMembershipAction(membership.id, payload);
      if (res.error) {
        setError(res.error);
      } else {
        setSuccess(true);
        setTimeout(() => router.push(`/admin/members/${membership.memberId}`), 1500);
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-lg pb-xl animate-fade-in">
      {/* Back Header */}
      <button 
        type="button" 
        onClick={() => router.back()}
        className="text-on-surface-variant hover:text-on-surface flex items-center gap-xs font-label-md text-sm self-start cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Title */}
      <div>
        <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight">Edit Membership Record</h2>
        <p className="text-secondary text-sm">
          Modifying membership transaction for <span className="text-white font-bold">{membership.member.firstName} {membership.member.lastName}</span>
        </p>
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
            Membership updated successfully! Redirecting...
          </div>
        )}

        {/* Membership Details Section */}
        <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col gap-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="membershipPlanId">Package Plan</label>
              <Select
                value={watch("membershipPlanId") || "custom"}
                onValueChange={(val) => {
                  const finalVal = val === "custom" ? "" : val;
                  setValue("membershipPlanId", finalVal);
                  handlePlanChange(finalVal);
                }}
              >
                <SelectTrigger className="h-[40px]">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">-- Custom Plan (No Template) --</SelectItem>
                  {plans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} (₹{Number(p.price).toLocaleString("en-IN")})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {!selectedPlanId && (
              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="customPlanName">Custom Plan Name</label>
                <input 
                  className="input-field h-[40px] text-sm py-2" 
                  id="customPlanName" 
                  placeholder="e.g. Special Offer 2 Months" 
                  {...register("customPlanName", { required: !selectedPlanId })} 
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="amount">Plan Price (₹)</label>
              <input
                className="input-field h-[40px] text-sm py-2"
                id="amount"
                type="number"
                {...register("amount")}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="registrationFee">Registration Fee (₹)</label>
              <input 
                className="input-field h-[40px] text-sm py-2" 
                id="registrationFee" 
                type="number" 
                {...register("registrationFee")} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md border-t border-[#323232] pt-md mt-xs">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="startDate">Start Date</label>
              <input
                className="input-field h-[40px] text-sm py-2 [color-scheme:dark]"
                id="startDate"
                type="date"
                {...register("startDate")}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="endDate">End Date (Expiry)</label>
              <input
                className="input-field h-[40px] text-sm py-2 [color-scheme:dark]"
                id="endDate"
                type="date"
                {...register("endDate")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-md border-t border-[#323232] pt-md mt-xs">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="paymentMethod">Payment Method</label>
              <Select
                value={watch("paymentMethod")}
                onValueChange={(val) => setValue("paymentMethod", val as PaymentMethod)}
              >
                <SelectTrigger className="h-[40px]">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={PaymentMethod.UPI}>UPI (GPay / PhonePe / Paytm)</SelectItem>
                  <SelectItem value={PaymentMethod.CASH}>Cash Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="paymentReference">Payment Reference / Transaction ID</label>
              <input 
                className="input-field h-[40px] text-sm py-2" 
                id="paymentReference" 
                placeholder="e.g. UPI Ref Number" 
                {...register("paymentReference")} 
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs border-t border-[#323232] pt-md mt-xs">
            <label className="input-label" htmlFor="remarks">Remarks</label>
            <input 
              className="input-field h-[40px] text-sm py-2" 
              id="remarks" 
              placeholder="Optional purchase notes" 
              {...register("remarks")} 
            />
          </div>
        </section>

        {/* Submit Actions */}
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
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
