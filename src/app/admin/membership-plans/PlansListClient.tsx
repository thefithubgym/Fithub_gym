"use client";

import { useState } from "react";
import { createPlanAction, togglePlanAction, deletePlanAction } from "@/features/plans/actions";
import { MemberType } from "@prisma/client";
import { Plus, Check, ToggleLeft, ToggleRight, Trash2, Eye, ShieldAlert, X } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  memberType: MemberType;
  price: any; // Decimal
  durationMonths: number;
  isActive: boolean;
  description: string | null;
}

interface PlansListClientProps {
  plans: Plan[];
}

export default function PlansListClient({ plans }: PlansListClientProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Split plans
  const singlePlans = plans.filter(p => p.memberType === MemberType.SINGLE);
  const couplePlans = plans.filter(p => p.memberType === MemberType.COUPLE);

  // New plan form state
  const [name, setName] = useState("");
  const [type, setType] = useState<MemberType>(MemberType.SINGLE);
  const [duration, setDuration] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await createPlanAction({
        name,
        memberType: type,
        durationMonths: duration,
        price,
        description,
      });

      if (res.error) {
        setError(res.error);
      } else {
        setShowAddModal(false);
        // Reset form
        setName("");
        setType(MemberType.SINGLE);
        setDuration(1);
        setPrice(0);
        setDescription("");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    if (confirm(`Are you sure you want to ${currentStatus ? "deactivate" : "activate"} this plan?`)) {
      const res = await togglePlanAction(id, !currentStatus);
      if (res.error) alert(res.error);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (confirm("Are you sure you want to archive this plan? It will be soft-deleted and hidden from registration options.")) {
      const res = await deletePlanAction(id);
      if (res.error) alert(res.error);
    }
  };

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
        <div>
          <h2 className="font-display text-4xl font-extrabold text-on-background uppercase tracking-tight">Membership Plans</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Manage tiers, pricing, and access controls.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold px-lg py-sm rounded-xl flex items-center gap-sm hover:bg-primary transition-colors cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          Add New Plan
        </button>
      </div>

      {/* Plans Section */}
      <div className="flex flex-col gap-xl">
        {/* Individual Plans */}
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white border-b border-outline-variant pb-sm mb-lg">Individual Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {singlePlans.length === 0 ? (
              <p className="text-secondary text-sm">No individual plans configured.</p>
            ) : (
              singlePlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-[#181818] border rounded-xl p-lg flex flex-col relative group transition-colors ${
                    plan.isActive ? "border-[#323232] hover:border-primary-container" : "border-error/20 opacity-60"
                  }`}
                >
                  <div className="absolute top-md right-md opacity-0 group-hover:opacity-100 transition-opacity flex gap-sm">
                    <button 
                      onClick={() => handleToggleActive(plan.id, plan.isActive)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:text-primary transition-colors cursor-pointer" 
                      title={plan.isActive ? "Deactivate" : "Activate"}
                    >
                      {plan.isActive ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5 text-secondary" />}
                    </button>
                    <button 
                      onClick={() => handleDeletePlan(plan.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:text-error transition-colors cursor-pointer" 
                      title="Archive (Soft Delete)"
                    >
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                  
                  <div className="mb-auto">
                    <span className="font-label-sm text-xs text-primary-container uppercase tracking-wider">
                      {plan.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <h4 className="font-headline-md text-xl font-bold text-[#FFFFFF] mt-xs mb-sm">{plan.name}</h4>
                    <div className="flex items-baseline gap-xs mb-md">
                      <span className="text-3xl font-extrabold text-[#FFFFFF]">₹{Number(plan.price).toLocaleString("en-IN")}</span>
                      <span className="font-body-md text-sm text-[#B3B3B3]">/ plan</span>
                    </div>
                    <p className="text-secondary text-sm min-h-[45px]">{plan.description || "No description provided."}</p>
                  </div>

                  <div className="mt-lg pt-md border-t border-[#323232] flex justify-between items-center text-xs text-[#B3B3B3]">
                    <span>Duration: {plan.durationMonths} {plan.durationMonths === 1 ? 'Month' : 'Months'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Couple Plans */}
        <div>
          <h3 className="font-headline-md text-xl font-bold text-white border-b border-outline-variant pb-sm mb-lg">Couple Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {couplePlans.length === 0 ? (
              <p className="text-secondary text-sm">No couple plans configured.</p>
            ) : (
              couplePlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-[#181818] border rounded-xl p-lg flex flex-col relative group transition-colors ${
                    plan.isActive ? "border-[#323232] hover:border-primary-container" : "border-error/20 opacity-60"
                  }`}
                >
                  <div className="absolute top-md right-md opacity-0 group-hover:opacity-100 transition-opacity flex gap-sm">
                    <button 
                      onClick={() => handleToggleActive(plan.id, plan.isActive)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:text-primary transition-colors cursor-pointer" 
                      title={plan.isActive ? "Deactivate" : "Activate"}
                    >
                      {plan.isActive ? <ToggleRight className="w-5 h-5 text-primary" /> : <ToggleLeft className="w-5 h-5 text-secondary" />}
                    </button>
                    <button 
                      onClick={() => handleDeletePlan(plan.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-highest text-on-surface hover:text-error transition-colors cursor-pointer" 
                      title="Archive (Soft Delete)"
                    >
                      <Trash2 className="w-4 h-4 text-error" />
                    </button>
                  </div>
                  
                  <div className="mb-auto">
                    <span className="font-label-sm text-xs text-primary-container uppercase tracking-wider">
                      {plan.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                    <h4 className="font-headline-md text-xl font-bold text-[#FFFFFF] mt-xs mb-sm">{plan.name}</h4>
                    <div className="flex items-baseline gap-xs mb-md">
                      <span className="text-3xl font-extrabold text-[#FFFFFF]">₹{Number(plan.price).toLocaleString("en-IN")}</span>
                      <span className="font-body-md text-sm text-[#B3B3B3]">/ plan</span>
                    </div>
                    <p className="text-secondary text-sm min-h-[45px]">{plan.description || "No description provided."}</p>
                  </div>

                  <div className="mt-lg pt-md border-t border-[#323232] flex justify-between items-center text-xs text-[#B3B3B3]">
                    <span>Duration: {plan.durationMonths} {plan.durationMonths === 1 ? 'Month' : 'Months'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Plan Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-md">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-lg md:p-xl w-full max-w-md relative flex flex-col gap-lg animate-fade-in">
            <button 
              onClick={() => setShowAddModal(false)}
              className="absolute top-md right-md text-on-surface-variant hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div>
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Create New Plan</h3>
              <p className="text-secondary text-sm mt-xs">Add a new pricing tier to the performance catalog.</p>
            </div>

            {error && (
              <div className="bg-error-container/20 border border-error/30 text-error text-xs p-sm rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleCreatePlan} className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="planName">Plan Name</label>
                <input 
                  className="input-field h-[40px] text-sm py-2" 
                  id="planName" 
                  placeholder="e.g. Monthly Standard" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-sm">
                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="planType">Member Type</label>
                  <select 
                    className="input-field h-[40px] text-sm py-2 px-3 outline-none" 
                    id="planType"
                    value={type}
                    onChange={(e) => setType(e.target.value as MemberType)}
                  >
                    <option value={MemberType.SINGLE}>Single Member</option>
                    <option value={MemberType.COUPLE}>Couple Membership</option>
                  </select>
                </div>

                <div className="flex flex-col gap-xs">
                  <label className="input-label" htmlFor="planDuration">Duration (Months)</label>
                  <input 
                    className="input-field h-[40px] text-sm py-2" 
                    id="planDuration" 
                    type="number" 
                    min={1} 
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    required 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="planPrice">Price (₹)</label>
                <input 
                  className="input-field h-[40px] text-sm py-2" 
                  id="planPrice" 
                  type="number" 
                  min={0} 
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required 
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="input-label" htmlFor="planDesc">Description</label>
                <textarea 
                  className="bg-[#181818] border border-[#323232] rounded-xl p-3 text-white placeholder:text-secondary focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors font-body-md text-sm resize-none h-20" 
                  id="planDesc" 
                  placeholder="Plan benefits..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-container font-bold py-3 rounded-xl hover:bg-primary transition-all font-label-md text-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? "Creating..." : "Save Plan"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
