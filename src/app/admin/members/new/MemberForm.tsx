"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSingleMemberAction, createCoupleMemberAction } from "@/features/members/actions";
import { Gender, PaymentMethod, MemberType } from "@prisma/client";
import { Plus, Trash, Check, User, ArrowRight } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  memberType: MemberType;
  price: number;
  durationMonths: number;
}

interface MemberFormProps {
  plans: Plan[];
}

export default function MemberForm({ plans }: MemberFormProps) {
  const router = useRouter();
  const [memberType, setMemberType] = useState<MemberType>(MemberType.SINGLE);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Filter plans based on selected type
  const availablePlans = plans.filter(p => p.memberType === memberType);

  // Form setup
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      gender: Gender.MALE,
      email: "",
      dateOfBirth: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
      notes: "",
      
      // Partner fields (for Couple)
      partnerFirstName: "",
      partnerLastName: "",
      partnerPhone: "",
      partnerGender: Gender.FEMALE,
      partnerEmail: "",
      partnerDateOfBirth: "",
      partnerAddress: "",

      // Membership details
      membershipPlanId: "",
      customPlanName: "",
      amount: 0,
      registrationFee: 200, // Default fee
      paymentMethod: PaymentMethod.UPI,
      paymentReference: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      remarks: "",
    }
  });

  const selectedPlanId = watch("membershipPlanId");
  const selectedStartDate = watch("startDate");

  // Handle plan change to set default price & calculate end date
  const handlePlanChange = (planId: string) => {
    if (!planId) {
      setValue("amount", 0);
      setValue("endDate", "");
      return;
    }

    const plan = plans.find(p => p.id === planId);
    if (plan) {
      setValue("amount", plan.price);
      
      // Calculate end date based on duration
      if (selectedStartDate) {
        const start = new Date(selectedStartDate);
        start.setMonth(start.getMonth() + plan.durationMonths);
        setValue("endDate", start.toISOString().split("T")[0]);
      }
    }
  };

  const onSubmit = async (data: any) => {
    setError(null);
    setLoading(true);

    try {
      if (memberType === MemberType.SINGLE) {
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
          membershipPlanId: data.membershipPlanId || undefined,
          customPlanName: data.customPlanName || undefined,
          amount: Number(data.amount),
          registrationFee: Number(data.registrationFee),
          paymentMethod: data.paymentMethod,
          paymentReference: data.paymentReference || undefined,
          startDate: data.startDate,
          endDate: data.endDate,
          remarks: data.remarks || undefined,
        };

        const res = await createSingleMemberAction(payload);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(true);
          setTimeout(() => router.push("/admin/members"), 1500);
        }
      } else {
        const payload = {
          memberOne: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            gender: data.gender,
            email: data.email || undefined,
            dateOfBirth: data.dateOfBirth || undefined,
            address: data.address || undefined,
          },
          memberTwo: {
            firstName: data.partnerFirstName,
            lastName: data.partnerLastName,
            phone: data.partnerPhone,
            gender: data.partnerGender,
            email: data.partnerEmail || undefined,
            dateOfBirth: data.partnerDateOfBirth || undefined,
            address: data.partnerAddress || undefined,
          },
          emergencyContact: data.emergencyContact || undefined,
          emergencyPhone: data.emergencyPhone || undefined,
          notes: data.notes || undefined,
          membershipPlanId: data.membershipPlanId || undefined,
          customPlanName: data.customPlanName || undefined,
          amount: Number(data.amount),
          registrationFee: Number(data.registrationFee),
          paymentMethod: data.paymentMethod,
          paymentReference: data.paymentReference || undefined,
          startDate: data.startDate,
          endDate: data.endDate,
          remarks: data.remarks || undefined,
        };

        const res = await createCoupleMemberAction(payload);
        if (res.error) {
          setError(res.error);
        } else {
          setSuccess(true);
          setTimeout(() => router.push("/admin/members"), 1500);
        }
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-lg pb-xl">
      {/* Header */}
      <div>
        <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight">Register New Member</h2>
        <p className="text-secondary text-sm">Add a new single member or a couple membership to the system.</p>
      </div>

      {/* Member Type Selection Tabs */}
      <div className="flex border-b border-[#323232] w-full justify-start gap-4">
        <button
          type="button"
          onClick={() => {
            setMemberType(MemberType.SINGLE);
            setValue("membershipPlanId", "");
            setValue("amount", 0);
            setValue("endDate", "");
          }}
          className={`py-3 px-lg font-label-md text-sm font-bold border-b-2 cursor-pointer transition-colors ${
            memberType === MemberType.SINGLE ? "border-primary text-primary" : "border-transparent text-secondary hover:text-white"
          }`}
        >
          Single Member
        </button>
        <button
          type="button"
          onClick={() => {
            setMemberType(MemberType.COUPLE);
            setValue("membershipPlanId", "");
            setValue("amount", 0);
            setValue("endDate", "");
          }}
          className={`py-3 px-lg font-label-md text-sm font-bold border-b-2 cursor-pointer transition-colors ${
            memberType === MemberType.COUPLE ? "border-primary text-primary" : "border-transparent text-secondary hover:text-white"
          }`}
        >
          Couple Membership
        </button>
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
            Registration saved successfully! Redirecting...
          </div>
        )}

        {/* SECTION 1: Member Profiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          {/* Primary Member */}
          <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col gap-md">
            <h3 className="font-headline-md text-lg font-bold text-white flex items-center gap-xs">
              <User className="w-5 h-5 text-primary" />
              {memberType === MemberType.COUPLE ? "Primary Member Details" : "Member Details"}
            </h3>
            
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
              <input className="input-field h-[40px] text-sm py-2" id="phone" placeholder="+919876543210" {...register("phone")} required />
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
              <input className="input-field h-[40px] text-sm py-2" id="email" type="email" placeholder="email@example.com" {...register("email")} />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="address">Street Address</label>
              <input className="input-field h-[40px] text-sm py-2" id="address" {...register("address")} />
            </div>
          </section>

          {/* Secondary Member (Only for Couple) */}
          {memberType === MemberType.COUPLE && (
            <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col gap-md animate-fade-in">
              <h3 className="font-headline-md text-lg font-bold text-white flex items-center gap-xs">
                <User className="w-5 h-5 text-primary" />
                Partner Details
              </h3>
              
              <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="partnerFirstName">First Name</label>
                  <input className="input-field h-[40px] text-sm py-2" id="partnerFirstName" {...register("partnerFirstName")} required />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="partnerLastName">Last Name</label>
                  <input className="input-field h-[40px] text-sm py-2" id="partnerLastName" {...register("partnerLastName")} required />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="partnerPhone">Phone Number</label>
                <input className="input-field h-[40px] text-sm py-2" id="partnerPhone" placeholder="+919876543211" {...register("partnerPhone")} required />
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="partnerGender">Gender</label>
                  <select className="input-field h-[40px] text-sm py-2 px-3 outline-none" id="partnerGender" {...register("partnerGender")}>
                    <option value={Gender.FEMALE}>Female</option>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.OTHER}>Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="partnerDateOfBirth">Date of Birth</label>
                  <input className="input-field h-[40px] text-sm py-2" id="partnerDateOfBirth" type="date" {...register("partnerDateOfBirth")} />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="partnerEmail">Email Address</label>
                <input className="input-field h-[40px] text-sm py-2" id="partnerEmail" type="email" placeholder="partner@example.com" {...register("partnerEmail")} />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="partnerAddress">Street Address</label>
                <input className="input-field h-[40px] text-sm py-2" id="partnerAddress" {...register("partnerAddress")} />
              </div>
            </section>
          )}
        </div>

        {/* SECTION 2: Emergency Contact & Notes */}
        <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="flex flex-col gap-md">
            <h3 className="font-headline-md text-base font-bold text-white">Emergency Contact</h3>
            <div className="grid grid-cols-2 gap-sm">
              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="emergencyContact">Contact Name</label>
                <input className="input-field h-[40px] text-sm py-2" id="emergencyContact" {...register("emergencyContact")} />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="emergencyPhone">Contact Phone</label>
                <input className="input-field h-[40px] text-sm py-2" id="emergencyPhone" {...register("emergencyPhone")} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-xs">
            <h3 className="font-headline-md text-base font-bold text-white mb-xs">Internal Notes</h3>
            <textarea 
              className="bg-[#181818] border border-[#323232] rounded-xl p-3 text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-sm resize-none flex-grow" 
              id="notes" 
              placeholder="Health conditions, weight goals, references..."
              {...register("notes")}
            />
          </div>
        </section>

        {/* SECTION 3: Membership Details */}
        <section className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col gap-md">
          <h3 className="font-headline-md text-lg font-bold text-white">Membership Package</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="membershipPlanId">Select Package Plan</label>
              <select 
                className="input-field h-[40px] text-sm py-2 px-3 outline-none" 
                id="membershipPlanId" 
                {...register("membershipPlanId")}
                onChange={(e) => handlePlanChange(e.target.value)}
              >
                <option value="">-- Custom Plan (No Template) --</option>
                {availablePlans.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} (₹{p.price})</option>
                ))}
              </select>
            </div>

            {!selectedPlanId && (
              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="customPlanName">Custom Plan Name</label>
                <input className="input-field h-[40px] text-sm py-2" id="customPlanName" placeholder="e.g. Special Offer 2 Months" {...register("customPlanName")} />
              </div>
            )}

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="amount">Plan Price (₹)</label>
              <input 
                className="input-field h-[40px] text-sm py-2" 
                id="amount" 
                type="number" 
                readOnly={!!selectedPlanId}
                {...register("amount")}
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="registrationFee">Registration Fee (₹)</label>
              <input className="input-field h-[40px] text-sm py-2" id="registrationFee" type="number" {...register("registrationFee")} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-md border-t border-[#323232] pt-md mt-sm">
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="startDate">Start Date</label>
              <input className="input-field h-[40px] text-sm py-2" id="startDate" type="date" {...register("startDate")} />
            </div>
            
            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="endDate">End Date</label>
              <input 
                className="input-field h-[40px] text-sm py-2" 
                id="endDate" 
                type="date" 
                readOnly={!!selectedPlanId}
                {...register("endDate")} 
                required
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="paymentMethod">Payment Method</label>
              <select className="input-field h-[40px] text-sm py-2 px-3 outline-none" id="paymentMethod" {...register("paymentMethod")}>
                <option value={PaymentMethod.UPI}>UPI (GPay / PhonePe / Paytm)</option>
                <option value={PaymentMethod.CASH}>Cash Payment</option>
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="input-label" htmlFor="paymentReference">Payment Reference / Transaction ID</label>
              <input className="input-field h-[40px] text-sm py-2" id="paymentReference" placeholder="e.g. UPI Ref Number" {...register("paymentReference")} />
            </div>

            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="input-label" htmlFor="remarks">Remarks</label>
              <input className="input-field h-[40px] text-sm py-2" id="remarks" placeholder="Optional purchase notes" {...register("remarks")} />
            </div>
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
            {loading ? "Registering..." : "Submit Registration"}
          </button>
        </div>
      </form>
    </div>
  );
}
