import PageHeader from '../components/PageHeader';
import BottomNav from '../components/BottomNav';
import {
  CheckCircle,
  Clock,
  MapPin,
  Star,
  DollarSign,
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
  return (
    <div className="iphone-screen page-wipe overflow-y-auto bg-ink">
      <PageHeader
        title="Jobs History"
        code="OPS-01"
      />

      <main className="pt-20 px-4 pb-32 space-y-6 overflow-y-auto flex-1">
        {/* Summary Cards */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-surface-raised rounded-3xl shadow-card card-inset border border-line p-5">
            <span className="kicker">Total Revenue</span>
            <h2 className="num-led text-3xl text-gradient-lime mt-1">${totalEarnings.toFixed(2)}</h2>
            <div className="flex items-center gap-1 mt-2">
              <DollarSign size={12} className="text-brand-lime-dim" />
              <span className="font-mono text-[10px] text-text-muted">All time earnings</span>
            </div>
          </div>
          <div className="bg-surface-raised rounded-3xl shadow-card card-inset border border-line p-5">
            <span className="kicker">Jobs Done</span>
            <h2 className="num-led text-3xl text-text-primary mt-1">{ALL_JOBS.length}</h2>
            <div className="flex items-center gap-1 mt-2">
              <CheckCircle size={12} className="text-brand-lime-dim" />
              <span className="font-mono text-[10px] text-text-muted">Completed jobs</span>
            </div>
          </div>
        </section>

        {/* Rating & Performance */}
        <section className="bg-surface-raised rounded-3xl shadow-card card-inset border border-line p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 clip-notch-sm bg-surface-elevated border border-line flex items-center justify-center">
                <Star size={24} className="text-brand-lime fill-brand-lime" />
              </div>
              <div>
                <p className="num-led text-xl text-text-primary">{avgRating}</p>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Average Rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={star <= Math.round(Number(avgRating)) ? 'text-brand-lime fill-brand-lime' : 'text-line-strong'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Jobs List */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-mono text-xs text-text-secondary uppercase tracking-wider">All Completed Jobs</h3>
            <span className="font-mono text-[10px] text-text-muted">{ALL_JOBS.length} total</span>
          </div>

          <div className="space-y-3">
            {ALL_JOBS.map((job, i) => (
              <div
                key={i}
                className="bg-surface-raised/60 p-4 rounded-2xl border border-line hover:bg-surface-elevated transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-line flex items-center justify-center text-brand-lime/70 group-hover:text-brand-lime transition-colors shrink-0">
                      <CheckCircle size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">{job.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-brand-lime fill-brand-lime" />
                          <span className="text-[10px] font-mono text-text-secondary">{job.rating}</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-line-strong" />
                        <span className="text-[10px] font-mono text-text-muted">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-bold text-brand-lime shrink-0 ml-2">${job.amount.toFixed(2)}</p>
                </div>

                <div className="flex items-center gap-4 mt-2 pl-[52px]">
                  <div className="flex items-center gap-1">
                    <Clock size={10} className="text-text-muted" />
                    <span className="text-[10px] font-mono text-text-muted">{job.date} {job.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={10} className="text-text-muted" />
                    <span className="text-[10px] font-mono text-text-muted">{job.distance}</span>
                  </div>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-brand-lime/10 text-brand-lime text-[10px] uppercase font-mono tracking-wider">
                    {job.status}
                  </span>
                </div>

                <div className="mt-2 pl-[52px] flex items-center gap-2">
                  <span className="text-[10px] font-mono text-text-muted">{job.vehicle}</span>
                  <span className="w-px h-3 bg-line" />
                  <span className="text-[10px] font-mono text-text-muted uppercase">{job.plate}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav active="jobs" />
    </div>
  );
}
