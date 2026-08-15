import { useNavigate } from 'react-router-dom';
import {
  ClipboardList,
  Map,
  DollarSign,
  User,
  CheckCircle,
  ArrowLeft,
  Truck,
  Clock,
  MapPin,
  Star,
} from 'lucide-react';

const ALL_JOBS = [
  { name: 'Lennert Nijenbijvank', time: '14:20', date: '2025-03-27', distance: '3.3km', amount: 45.0, status: 'Completed', type: 'Flatbed Towing', vehicle: 'Silver Toyota Camry', plate: 'ABC-1234', rating: 4.8 },
  { name: 'Sarah Jenkins', time: '12:45', date: '2025-03-27', distance: '12.8km', amount: 82.5, status: 'Completed', type: 'Flatbed Towing', vehicle: 'Blue Honda Accord', plate: 'XYZ-7890', rating: 4.9 },
  { name: 'Mike Chen', time: '09:30', date: '2025-03-27', distance: '5.1km', amount: 62.0, status: 'Completed', type: 'Heavy Duty', vehicle: 'White Ford F-150', plate: 'TRK-4455', rating: 4.7 },
  { name: 'Emma Voss', time: '16:10', date: '2025-03-26', distance: '2.4km', amount: 38.5, status: 'Completed', type: 'Battery Jump', vehicle: 'Red Tesla Model 3', plate: 'EV-2025', rating: 5.0 },
  { name: 'David Kim', time: '11:00', date: '2025-03-26', distance: '8.7km', amount: 95.0, status: 'Completed', type: 'Winch Service', vehicle: 'Black Jeep Wrangler', plate: 'OFF-ROAD', rating: 4.6 },
  { name: 'Lisa Thompson', time: '08:15', date: '2025-03-26', distance: '1.8km', amount: 30.0, status: 'Completed', type: 'Lockout', vehicle: 'Gray Nissan Altima', plate: 'KEY-1234', rating: 4.5 },
  { name: 'James Wilson', time: '15:45', date: '2025-03-25', distance: '6.2km', amount: 55.0, status: 'Completed', type: 'Flatbed Towing', vehicle: 'Green Ford Explorer', plate: 'EXP-7766', rating: 4.3 },
  { name: 'Rachel Green', time: '10:20', date: '2025-03-25', distance: '4.5km', amount: 48.0, status: 'Completed', type: 'Tire Change', vehicle: 'White Toyota RAV4', plate: 'TIRE-88', rating: 4.8 },
];

const totalEarnings = ALL_JOBS.reduce((sum, job) => sum + job.amount, 0);
const totalRatings = ALL_JOBS.reduce((sum, job) => sum + job.rating, 0);
const avgRating = (totalRatings / ALL_JOBS.length).toFixed(1);

export default function JobsPage() {
  const navigate = useNavigate();

  return (
    <div className="iphone-screen overflow-y-auto" style={{ backgroundColor: '#121413' }}>
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
          <span className="text-[#E3E2E0] font-mono uppercase tracking-widest text-sm">Jobs History</span>
        </div>
        <div className="flex items-center gap-4">
          <Truck size={22} className="text-[#D0FA58]" />
        </div>
      </header>

      <main className="mt-20 px-4 pb-32 space-y-6 overflow-y-auto flex-1">
        {/* Summary Cards */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-[#2A2A28]/80 backdrop-blur-md border border-[#353533] p-5 rounded-xl">
            <p className="font-mono text-[10px] text-[#C5C9B0] uppercase tracking-wider">Total Revenue</p>
            <h2 className="text-3xl font-bold text-[#D0FA58] mt-1">${totalEarnings.toFixed(2)}</h2>
            <div className="flex items-center gap-1 mt-2">
              <DollarSign size={12} className="text-[#B5DD3D]" />
              <span className="font-mono text-[10px] text-[#C5C9B0]/60">All time earnings</span>
            </div>
          </div>
          <div className="bg-[#2A2A28]/80 backdrop-blur-md border border-[#353533] p-5 rounded-xl">
            <p className="font-mono text-[10px] text-[#C5C9B0] uppercase tracking-wider">Jobs Done</p>
            <h2 className="text-3xl font-bold text-[#E3E2E0] mt-1">{ALL_JOBS.length}</h2>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={12} className="text-[#B5DD3D]" />
              <span className="font-mono text-[10px] text-[#C5C9B0]/60">Completed jobs</span>
            </div>
          </div>
        </section>

        {/* Rating & Performance */}
        <section className="bg-[#2A2A28]/80 backdrop-blur-md border border-[#353533] p-5 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#343534] flex items-center justify-center border border-[#444936]">
                <Star size={24} className="text-[#D0FA58] fill-[#D0FA58]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#E3E2E0]">{avgRating}</p>
                <p className="font-mono text-[10px] text-[#C5C9B0]/60 uppercase tracking-wider">Average Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= Math.round(Number(avgRating)) ? 'text-[#D0FA58] fill-[#D0FA58]' : 'text-[#444936]'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Jobs List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-mono text-xs text-[#C5C9B0] uppercase tracking-wider">All Completed Jobs</h3>
            <span className="font-mono text-[10px] text-[#C5C9B0]/40">{ALL_JOBS.length} total</span>
          </div>

          <div className="space-y-3">
            {ALL_JOBS.map((job, i) => (
              <div
                key={i}
                className="bg-[#1F1F1E]/40 p-4 rounded-xl border border-[#444936]/20 hover:bg-[#292A29] transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#343534] flex items-center justify-center text-[#D0FA58]/70 group-hover:text-[#D0FA58] transition-colors shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#E3E2E0] truncate">{job.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-[#D0FA58] fill-[#D0FA58]" />
                          <span className="text-[10px] font-mono text-[#C5C9B0]">{job.rating}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-[#444936]/30" />
                        <span className="text-[10px] font-mono text-[#C5C9B0]/60">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-bold text-[#D0FA58] shrink-0 ml-2">${job.amount.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 mt-2 pl-[52px]">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-[#C5C9B0]/40" />
                    <span className="text-[10px] font-mono text-[#C5C9B0]/60">{job.date} {job.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-[#C5C9B0]/40" />
                    <span className="text-[10px] font-mono text-[#C5C9B0]/60">{job.distance}</span>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded bg-[#D0FA58]/10 text-[#D0FA58] text-[10px] uppercase font-mono tracking-tighter">
                    {job.status}
                  </span>
                </div>

                <div className="mt-2 pl-[52px] flex items-center gap-2">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">{job.vehicle}</span>
                  <span className="w-px h-3 bg-[#444936]/20" />
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40 uppercase">{job.plate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#121413] border-t border-[#444936] safe-area-bottom">
        <button className="flex flex-col items-center justify-center bg-[#B5DD3D] text-[#283500] rounded-xl px-4 py-1 active:scale-95 transition-transform">
          <ClipboardList size={22} />
          <span className="font-mono text-[10px] mt-0.5">Jobs</span>
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <Map size={22} />
          <span className="font-mono text-[10px] mt-0.5">Map</span>
        </button>
        <button
          onClick={() => navigate('/earnings')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <DollarSign size={22} />
          <span className="font-mono text-[10px] mt-0.5">Earnings</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="flex flex-col items-center justify-center text-[#C5C9B0] hover:bg-[#343534] transition-colors px-4 py-1 rounded-xl active:scale-95"
        >
          <User size={22} />
          <span className="font-mono text-[10px] mt-0.5">Profile</span>
        </button>
      </nav>
    </div>
  );
}
