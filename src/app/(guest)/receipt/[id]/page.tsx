import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { MembershipService } from "@/services/membership.service";
import ReceiptControls from "./ReceiptControls";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReceiptPage({ params }: PageProps) {
  const { id } = await params;
  const data = await MembershipService.getMembershipReceiptDetails(id);

  if (!data) {
    notFound();
  }

  const { member, membershipPlan, partner, receiptNo, ...membership } = data;

  // Format Dates
  const paymentDate = new Date(membership.createdAt);
  const formattedDate = paymentDate.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const formattedTime = paymentDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const startDateFormatted = new Date(membership.startDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const endDateFormatted = new Date(membership.endDate).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Calculate duration
  let durationText = "";
  if (membershipPlan?.durationMonths) {
    durationText = `${membershipPlan.durationMonths} Month${membershipPlan.durationMonths > 1 ? "s" : ""}`;
  } else {
    const diffTime = Math.abs(
      new Date(membership.endDate).getTime() - new Date(membership.startDate).getTime()
    );
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const approxMonths = Math.round(diffDays / 30.4);
    durationText = approxMonths > 0 ? `${approxMonths} Month${approxMonths > 1 ? "s" : ""}` : `${diffDays} Days`;
  }

  // Check Registration vs Renewal
  const isFirstTime = Number(membership.registrationFee) > 0;
  const transactionType = isFirstTime ? "First Time" : "Renewal";

  // Financial values
  const baseAmount = Number(membership.amount);
  const regFee = Number(membership.registrationFee);
  const totalAmount = baseAmount + regFee;

  // Sanitized WhatsApp Link construction
  const headerList = await headers();
  const host = headerList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const receiptLink = `${protocol}://${host}/receipt/${id}`;

  let whatsappPhone = member.phone.replace(/[^0-9]/g, "");
  if (whatsappPhone.length === 10) {
    whatsappPhone = "91" + whatsappPhone;
  }

  const whatsappMessage = `Hello ${member.firstName},\n\nThank you for choosing *The Fit Hub Gym*! Here is your payment receipt.\n\n*Receipt No:* ${receiptNo}\n*Plan:* ${membershipPlan?.name || membership.customPlanName || "Custom Plan"}\n*Amount Paid:* ₹${totalAmount.toLocaleString("en-IN")}\n*Validity:* ${startDateFormatted} to ${endDateFormatted}\n\n*View Receipt online:* ${receiptLink}\n\nStay consistent, stay fit! 💪🏼💥`;
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] px-md py-xl md:py-2xl flex flex-col justify-start items-center selection:bg-amber-100 print:bg-white print:p-0 print:py-0 font-sans antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A5 portrait;
            margin: 8mm 10mm;
          }
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .receipt-container {
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            background-color: white !important;
            color: black !important;
          }
          .receipt-header {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            border-bottom-width: 1px !important;
            padding-bottom: 0.5rem !important;
            margin-bottom: 0.75rem !important;
            gap: 1rem !important;
          }
          .receipt-header > div {
            text-align: left !important;
          }
          .receipt-header > .text-right {
            text-align: right !important;
            align-items: flex-end !important;
          }
          .receipt-title {
            font-size: 1.25rem !important;
          }
          .receipt-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1rem !important;
            margin-bottom: 0.75rem !important;
          }
          .receipt-table-section {
            margin-bottom: 0.75rem !important;
          }
          .receipt-table-section th,
          .receipt-table-section td {
            padding-top: 0.35rem !important;
            padding-bottom: 0.35rem !important;
          }
          .receipt-financials {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: flex-start !important;
            gap: 1rem !important;
            margin-top: 0.5rem !important;
            padding-top: 0.5rem !important;
            border-top-width: 1px !important;
          }
          .receipt-payment-info {
            width: 50% !important;
          }
          .receipt-summary {
            width: 45% !important;
            margin-top: 0 !important;
          }
          .receipt-footer {
            margin-top: 1rem !important;
            padding-top: 0.75rem !important;
          }
        }
      `}} />

      <div className="w-full max-w-[148mm] mx-auto">
        {/* Top Navigation & Actions */}
        <ReceiptControls whatsappUrl={whatsappUrl} />

        {/* Main Receipt Card */}
        <main className="receipt-container w-full max-w-[148mm] bg-white text-stone-900 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-lg border border-stone-200 print:border-none print:shadow-none print:p-0">
          {/* Header Section */}
          <header className="receipt-header flex flex-row justify-between items-center border-b-2 border-stone-100 pb-md mb-md gap-md">
            <div className="flex flex-col gap-xs text-left">
              <div className="receipt-title font-sans font-black text-lg sm:text-2xl tracking-tight uppercase text-stone-900 leading-none select-none">
                THE FITHUB <span className="text-[#f59e0b]">GYM</span>
              </div>
              <div className="font-semibold text-[8px] sm:text-[9px] font-medium tracking-[0.22em] uppercase text-stone-500 mt-1 pl-[1px]">
                Unisex Fitness Center
              </div>
              <div className="font-sans text-xs font-bold text-stone-500 uppercase tracking-widest mt-2">
                Membership Payment Receipt
              </div>
            </div>
            <div className="text-right flex flex-col items-end text-[10px] sm:text-xs">
              <span className="inline-flex items-center px-sm py-xs rounded bg-green-100 text-green-700 font-bold mb-xs text-[10px]">
                <span className="material-symbols-outlined text-[14px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                PAID
              </span>
              <p className="text-stone-500 mt-1">Receipt #: <span className="text-stone-900 font-semibold">{receiptNo}</span></p>
              <p className="text-stone-500">Date: <span className="text-stone-900">{formattedDate}</span></p>
              <p className="text-stone-500">Time: <span className="text-stone-900">{formattedTime}</span></p>
            </div>
          </header>

          <div className="receipt-grid grid grid-cols-2 gap-md sm:gap-lg mb-lg text-left">
            {/* Gym Details */}
            <section className="text-[10px] sm:text-xs">
              <h3 className="font-bold text-stone-400 uppercase tracking-wider mb-sm text-[9px] sm:text-[10px]">Facility Information</h3>
              <div className="space-y-xs">
                <p className="font-bold text-stone-900 text-sm">The FitHub Gym</p>
                <p className="text-stone-600 leading-relaxed">
                  Plot no 6456, Ward no 17, opp Govt ITI,<br />
                  Kalambha Road, Narkhed - 441304
                </p>
                <p className="text-stone-600">PH: +91 8788849529</p>
                <p className="text-stone-600 underline break-all">millennialcorpllp@gmail.com</p>
              </div>
            </section>

            {/* Member Details */}
            <section className="text-[10px] sm:text-xs">
              <h3 className="font-bold text-stone-400 uppercase tracking-wider mb-sm text-[9px] sm:text-[10px]">Member Information</h3>
              <div className="space-y-xs">
                <p className="font-bold text-stone-900 text-sm">
                  {member.firstName} {member.lastName}
                </p>
                {partner && (
                  <p className="text-stone-600">
                    Partner: <span className="text-stone-950 font-semibold">{partner.firstName} {partner.lastName}</span> (Couple Add-on)
                  </p>
                )}
                <p className="text-stone-600">Phone: {member.phone}</p>
                <p className="text-stone-600 underline break-all">Email: {member.email || "N/A"}</p>
              </div>
            </section>
          </div>

          {/* Membership Info Table */}
          <section className="receipt-table-section mb-lg overflow-x-auto text-left text-[10px] sm:text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-t border-b border-stone-200">
                  <th className="py-md px-xs sm:px-sm font-bold text-stone-500 uppercase tracking-wider text-[9px] sm:text-[10px]">Plan Description</th>
                  <th className="py-md px-xs sm:px-sm font-bold text-stone-500 uppercase tracking-wider text-[9px] sm:text-[10px]">Duration</th>
                  <th className="py-md px-xs sm:px-sm font-bold text-stone-500 uppercase tracking-wider text-[9px] sm:text-[10px]">Validity Period</th>
                  <th className="py-md px-xs sm:px-sm font-bold text-stone-500 uppercase tracking-wider text-right text-[9px] sm:text-[10px]">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-md px-xs sm:py-lg sm:px-sm">
                    <div className="font-semibold text-stone-900">
                      {membershipPlan?.name || membership.customPlanName || "Custom Plan"}
                    </div>
                    <div className="text-stone-500 text-[9px] sm:text-[10px] mt-0.5">
                      {partner ? "Couple Membership Plan" : "Single Membership Plan"}
                    </div>
                  </td>
                  <td className="py-md px-xs sm:py-lg sm:px-sm text-stone-600">{durationText}</td>
                  <td className="py-md px-xs sm:py-lg sm:px-sm text-stone-600">{startDateFormatted} - {endDateFormatted}</td>
                  <td className="py-md px-xs sm:py-lg sm:px-sm text-stone-900 font-semibold text-right">
                    ₹{baseAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </td>
                </tr>
                {regFee > 0 && (
                  <tr>
                    <td className="py-sm px-xs sm:py-md sm:px-sm">
                      <div className="text-stone-900 font-medium">One-time Registration Fee</div>
                    </td>
                    <td className="py-sm px-xs sm:py-md sm:px-sm text-stone-600">N/A</td>
                    <td className="py-sm px-xs sm:py-md sm:px-sm text-stone-600">Immediate</td>
                    <td className="py-sm px-xs sm:py-md sm:px-sm text-stone-900 font-semibold text-right">
                      ₹{regFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>

          {/* Financials & Payment Info */}
          <section className="receipt-financials flex flex-row justify-between items-start gap-md pt-md border-t-2 border-stone-100 text-left text-[10px] sm:text-xs">
            <div className="receipt-payment-info w-[50%] space-y-sm">
              <div className="p-sm sm:p-md bg-stone-50 rounded-lg border border-stone-100">
                <h4 className="font-bold text-stone-400 uppercase mb-xs text-[9px] sm:text-[10px]">Payment Information</h4>
                <div className="grid grid-cols-2 gap-xs sm:gap-sm text-stone-600 text-[10px] sm:text-xs">
                  <span className="font-semibold">Method:</span>
                  <span className="text-stone-900 font-semibold uppercase">{membership.paymentMethod}</span>
                  <span className="font-semibold">Ref ID:</span>
                  <span className="text-stone-900 font-medium truncate max-w-[100px]">{membership.paymentReference || "-"}</span>
                  <span className="font-semibold">Type:</span>
                  <span className="text-stone-900 font-medium">{transactionType}</span>
                </div>
              </div>
            </div>
            <div className="receipt-summary w-[45%] space-y-xs">
              <div className="flex justify-between text-stone-600">
                <span className="font-semibold">Fee</span>
                <span className="font-medium">₹{baseAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              {regFee > 0 && (
                <div className="flex justify-between text-stone-600">
                  <span className="font-semibold">Reg Fee</span>
                  <span className="font-medium">₹{regFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                </div>
              )}
              <div className="flex justify-between items-center py-sm border-t-2 border-stone-900 mt-xs">
                <span className="font-bold text-stone-900 text-[11px] sm:text-sm">Total Paid</span>
                <span className="font-bold text-[#f59e0b] text-xs sm:text-base">
                  ₹{totalAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="receipt-footer mt-xl text-center pt-lg border-t border-dashed border-stone-200 text-xs">
            <p className="text-stone-900 mb-xs italic font-semibold text-sm">Stay Consistent. Stay Fit.</p>
            <p className="text-stone-500 mb-lg text-[10px] sm:text-xs">Thank you for choosing The FitHub Gym. Your progress is our mission.</p>
            <div className="flex justify-center gap-xl opacity-20 grayscale no-print">
              <span className="material-symbols-outlined text-[48px]">fitness_center</span>
              <span className="material-symbols-outlined text-[48px]">monitor_heart</span>
              <span className="material-symbols-outlined text-[48px]">nutrition</span>
            </div>
            <p className="mt-xl font-semibold text-stone-300 uppercase tracking-widest no-print text-[9px]">
              Electronic Copy • No Signature Required
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
