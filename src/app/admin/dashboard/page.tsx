import Link from "next/link";
import { DashboardService } from "@/services/dashboard.service";
import { 
  Users, 
  UserCheck, 
  UserX, 
  DollarSign, 
  TrendingUp, 
  UserPlus, 
  MessageSquare, 
  Download,
  Calendar,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const summary = await DashboardService.getSummary();
  const todayStr = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const statCards = [
    {
      title: "Total Members",
      value: summary.totalMembers.toLocaleString("en-IN"),
      icon: Users,
      trend: "12% up",
      trendType: "up",
      color: "text-primary-container",
      bg: "bg-primary-container/10"
    },
    {
      title: "Active Members",
      value: summary.activeMembers.toLocaleString("en-IN"),
      icon: UserCheck,
      trend: "8% up",
      trendType: "up",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      title: "Expired Members",
      value: summary.expiredMembers.toLocaleString("en-IN"),
      icon: UserX,
      trend: "2% down",
      trendType: "down",
      color: "text-error",
      bg: "bg-error/10"
    },
    {
      title: "Monthly Revenue",
      value: `₹${summary.monthlyRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      trend: "24% up",
      trendType: "up",
      color: "text-primary-container",
      bg: "bg-primary-container/10"
    }
  ];

  return (
    <div className="flex flex-col gap-lg w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface m-0 p-0">Overview</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Real-time performance metrics for The FitHub Gym.</p>
        </div>
        <div className="flex items-center gap-sm text-on-surface-variant font-label-sm text-label-sm bg-surface-container px-md py-sm rounded-lg border border-outline-variant self-start md:self-auto">
          <Calendar className="w-[18px] h-[18px] text-primary" />
          <span>Today, {todayStr}</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md md:gap-lg">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col hover:border-outline-variant transition-colors group">
              <div className="flex justify-between items-start mb-md">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${card.color} ${card.bg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`font-label-sm text-label-sm flex items-center gap-xs px-sm py-xs rounded-md ${
                  card.trendType === "up" ? "text-primary-container bg-primary-container/10" : "text-error bg-error/10"
                }`}>
                  {card.trendType === "up" ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {card.trend}
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-[#B3B3B3] uppercase tracking-wider mb-xs">{card.title}</p>
              <h3 className="font-headline-md text-3xl font-extrabold text-[#FFFFFF] m-0">{card.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Charts & Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-md md:gap-lg">
        {/* Main Chart Card */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl p-lg col-span-1 lg:col-span-8 flex flex-col min-h-[350px]">
          <div className="flex justify-between items-center mb-lg">
            <div>
              <h3 className="font-headline-md text-xl font-bold text-[#FFFFFF] m-0">Member Growth</h3>
              <p className="font-label-sm text-label-sm text-[#B3B3B3] mt-xs">Last 6 Months Trend</p>
            </div>
            <button className="bg-transparent border border-[#323232] text-[#FFFFFF] px-md py-xs rounded-md text-label-sm font-label-sm hover:border-outline-variant transition-colors flex items-center gap-xs">
              This Year
            </button>
          </div>
          
          {/* SVG Line Chart */}
          <div className="flex-1 w-full relative min-h-[200px]">
            <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 800 300">
              <defs>
                <linearGradient id="gradient-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"></stop>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line className="stroke-[#323232] stroke-[1]" x1="0" x2="800" y1="50" y2="50"></line>
              <line className="stroke-[#323232] stroke-[1]" x1="0" x2="800" y1="125" y2="125"></line>
              <line className="stroke-[#323232] stroke-[1]" x1="0" x2="800" y1="200" y2="200"></line>
              <line className="stroke-[#323232] stroke-[1]" x1="0" x2="800" y1="275" y2="275"></line>
              {/* Data Path Area */}
              <path fill="url(#gradient-area)" d="M0,250 L130,220 L260,230 L390,150 L520,180 L650,80 L800,100 L800,300 L0,300 Z"></path>
              {/* Data Path Line */}
              <path fill="none" stroke="#f59e0b" strokeWidth="3" d="M0,250 L130,220 L260,230 L390,150 L520,180 L650,80 L800,100"></path>
              {/* Data Points */}
              <circle cx="130" cy="220" fill="#f59e0b" r="5" stroke="#181818" strokeWidth="2"></circle>
              <circle cx="260" cy="230" fill="#f59e0b" r="5" stroke="#181818" strokeWidth="2"></circle>
              <circle cx="390" cy="150" fill="#f59e0b" r="5" stroke="#181818" strokeWidth="2"></circle>
              <circle cx="520" cy="180" fill="#f59e0b" r="5" stroke="#181818" strokeWidth="2"></circle>
              <circle cx="650" cy="80" fill="#FFFFFF" r="6" stroke="#f59e0b" strokeWidth="3"></circle>
            </svg>
            <div className="absolute bottom-[-10px] w-full flex justify-between text-[#B3B3B3] font-label-sm text-label-sm px-sm">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="col-span-1 lg:col-span-4 flex flex-col gap-md md:gap-lg">
          <div className="bg-[#181818] border border-[#323232] rounded-xl p-lg flex flex-col justify-between">
            <h3 className="font-headline-md text-lg font-bold text-[#FFFFFF] m-0 mb-md">Quick Actions</h3>
            <div className="flex flex-col gap-sm">
              <Link 
                href="/admin/members/new" 
                className="w-full bg-[#F59E0B] text-[#0F0F0F] font-label-md text-label-md font-bold py-3 px-md rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-sm"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </Link>
              <Link 
                href="/admin/notifications" 
                className="w-full bg-transparent border border-[#323232] text-[#FFFFFF] font-label-md text-label-md py-3 px-md rounded-lg hover:border-outline-variant hover:bg-surface-container transition-colors flex items-center justify-center gap-sm"
              >
                <MessageSquare className="w-4 h-4" />
                Broadcast WhatsApp
              </Link>
              <Link 
                href="/admin/membership-history" 
                className="w-full bg-transparent border border-[#323232] text-[#FFFFFF] font-label-md text-label-md py-3 px-md rounded-lg hover:border-outline-variant hover:bg-surface-container transition-colors flex items-center justify-center gap-sm"
              >
                <Download className="w-4 h-4" />
                Export Report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md md:gap-lg">
        {/* Recent Members */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden">
          <div className="p-lg border-b border-[#323232] flex justify-between items-center">
            <h3 className="font-headline-md text-lg font-bold text-[#FFFFFF] m-0">Recent Registrations</h3>
            <Link href="/admin/members" className="text-primary font-label-sm text-label-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#131313]/50">
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232]">Member</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232]">Plan</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232]">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-sm text-[#FFFFFF]">
                {summary.recentMembers.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-lg text-center text-secondary">No members registered yet.</td>
                  </tr>
                ) : (
                  summary.recentMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-surface-container-low transition-colors border-b border-[#323232]/50 last:border-0">
                      <td className="py-md px-lg">
                        <div>
                          <p className="m-0 font-medium">{member.name}</p>
                          <p className="m-0 text-[#B3B3B3] text-xs">{member.phone}</p>
                        </div>
                      </td>
                      <td className="py-md px-lg text-secondary">{member.planName}</td>
                      <td className="py-md px-lg">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                          member.status === "ACTIVE" 
                            ? "bg-green-500/10 text-green-500 border-green-500/20"
                            : member.status === "UPCOMING"
                            ? "bg-primary-container/10 text-primary-container border-primary-container/20"
                            : "bg-error/10 text-error border-error/20"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Renewals */}
        <div className="bg-[#181818] border border-[#323232] rounded-xl overflow-hidden">
          <div className="p-lg border-b border-[#323232] flex justify-between items-center">
            <h3 className="font-headline-md text-lg font-bold text-[#FFFFFF] m-0">Recent Transactions</h3>
            <Link href="/admin/membership-history" className="text-primary font-label-sm text-label-sm hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#131313]/50">
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232]">Member</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232]">Plan Details</th>
                  <th className="py-md px-lg font-label-sm text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold border-b border-[#323232] text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-sm text-[#FFFFFF]">
                {summary.recentRenewals.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-lg text-center text-secondary">No transactions found.</td>
                  </tr>
                ) : (
                  summary.recentRenewals.map((renewal) => (
                    <tr key={renewal.id} className="hover:bg-surface-container-low transition-colors border-b border-[#323232]/50 last:border-0">
                      <td className="py-md px-lg font-medium">{renewal.memberName}</td>
                      <td className="py-md px-lg text-secondary">{renewal.planName}</td>
                      <td className="py-md px-lg text-right font-bold text-primary-container">
                        ₹{renewal.amount.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
