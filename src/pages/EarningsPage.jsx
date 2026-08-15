import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Map,
  DollarSign,
  User,
  CheckCircle,
  ArrowLeft,
  Truck,
} from 'lucide-react';

const WEEKLY_DATA = [
  { day: 'MON', earnings: 310, height: 60, active: false },
  { day: 'TUE', earnings: 245, height: 45, active: false },
  { day: 'WED', earnings: 420, height: 85, active: true },
  { day: 'THU', earnings: null, height: 0, active: false },
  { day: 'FRI', earnings: null, height: 0, active: false },
];

const RECENT_JOBS = [
  { name: 'Lennert Nijenbijvank', time: '14:20', distance: '3.3km', amount: 45.0, status: 'Completed' },
  { name: 'Sarah Jenkins', time: '12:45', distance: '12.8km', amount: 82.5, status: 'Completed' },
];

const NavLink = ({ to, icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick || (() => navigate(to))}
    className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all active:scale-95 ${
      active
        ? 'bg-[#B5DD3D] text-[#283500]'
        : 'text-[#C5C9B0] hover:bg-[#343534]'
    }`}
  >
    <Icon size={22} />
    <span className="font-mono text-[10px] mt-0.5">{label}</span>
  </button>
);

export default function EarningsPage() {
  const navigate = useNavigate();

  return (
    <div className="iphone-screen" style={{ backgroundColor: '#121413' }}>
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#121413] h-16 flex justify-between items-center px-6 border-b border-[#444936] safe-area-top">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-[#292A29] flex items-center justify-center hover:bg-[#343534] transition-colors"
          >
            <ArrowLeft size={20} className="text-[#E3E2E0]" />
          </button>
          <span className="text-[#C5C9B0] opacity-50 mx-1">/</span>
          <span className="text-[#E3E2E0] font-mono uppercase tracking-widest text-sm">Earnings</span>
        </div>
        <div className="flex items-center gap-4">
          <Truck size={22} className="text-[#D0FA58]" />
        </div>
      </header>

      <main className="mt-20 px-4 pb-32 space-y-6 overflow-y-auto flex-1">
        {/* Summary Card */}
        <section className="grid grid-cols-1 gap-4">
          <div className="bg-[#2A2A28]/80 backdrop-blur-md border border-[#353533] p-6 rounded-xl relative overflow-hidden shadow-[0_0_20px_rgba(181,221,61,0.1)]">
            <div className="relative z-10">
              <p className="font-mono text-xs text-[#C5C9B0] uppercase tracking-wider">
                Total Earnings (Today)
              </p>
              <div className="flex items-end justify-between mt-2">
                <h2 className="text-4xl font-bold text-[#D0FA58]">$420.50</h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col gap-1">
                  <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-tighter">
                    Jobs Completed
                  </p>
                  <p className="text-2xl font-bold text-[#E3E2E0]">08</p>
                </div>
                <div className="flex flex-col gap-1 border-l border-[#444936]/20 pl-4">
                  <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-tighter">
                    Online Hours
                  </p>
                  <p className="text-2xl font-bold text-[#E3E2E0]">
                    6.5<span className="text-base font-normal text-[#C5C9B0]">h</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly Performance */}
        <section className="space-y-3">
          <h3 className="font-mono text-xs text-[#C5C9B0] px-1 uppercase tracking-wider">
            Weekly Performance
          </h3>
          <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
            {WEEKLY_DATA.map((item) => (
              <div key={item.day} className="flex-shrink-0 w-16 flex flex-col items-center gap-3">
                <span
                  className={`text-[10px] font-mono ${
                    item.active ? 'text-[#D0FA58]' : 'text-[#C5C9B0]/50'
                  }`}
                >
                  {item.day}
                </span>
                <div className="w-[2px] h-16 bg-[#343534] rounded-full relative">
                  {item.earnings !== null && (
                    <div
                      className={`absolute bottom-0 w-full rounded-full transition-all duration-500 ${
                        item.active
                          ? 'bg-[#D0FA58] shadow-[0_0_8px_rgba(181,221,61,0.4)]'
                          : 'bg-[#ADD535]'
                      }`}
                      style={{ height: `${item.height}%` }}
                    />
                  )}
                </div>
                <span
                  className={`text-[11px] font-mono ${
                    item.active ? 'text-[#D0FA58] font-bold' : 'text-[#C5C9B0]'
                  }`}
                >
                  {item.earnings !== null ? `$${item.earnings}` : '-'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-mono text-xs text-[#C5C9B0] uppercase tracking-wider">
              Recent Jobs
            </h3>
            <button className="text-[#D0FA58] font-mono text-[10px] hover:underline transition-all">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_JOBS.map((job, i) => (
              <div
                key={i}
                className="bg-[#1F1F1E]/40 p-4 rounded-xl border border-[#444936]/20 flex items-center justify-between hover:bg-[#292A29] transition-all group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#343534] flex items-center justify-center text-[#D0FA58]/70 group-hover:text-[#D0FA58] transition-colors shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#E3E2E0] truncate">{job.name}</p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-[#C5C9B0]/60">
                      <span>{job.time}</span>
                      <span className="w-1 h-1 rounded-full bg-[#444936]/30" />
                      <span>{job.distance}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-[#D0FA58]/10 text-[#D0FA58] text-[10px] uppercase tracking-tighter">
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-mono text-sm font-bold text-[#E3E2E0] shrink-0 ml-3">${job.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#121413] border-t border-[#444936] safe-area-bottom">
        <NavLink to="/jobs" icon={ClipboardList} label="Jobs" />
        <NavLink to="/dashboard" icon={Map} label="Map" />
        <NavLink to="/earnings" icon={DollarSign} label="Earnings" active />
        <NavLink to="/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
}
