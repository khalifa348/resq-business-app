import PageHeader from '../components/PageHeader';
import BottomNav from '../components/BottomNav';
import { CheckCircle } from 'lucide-react';

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

export default function EarningsPage() {
  return (
    <div className="iphone-screen bg-ink">
      <PageHeader
        title="Earnings"
      />

      <main className="pt-20 px-4 pb-32 space-y-5 overflow-y-auto flex-1">
        {/* Summary Card */}
        <section className="bg-surface-raised rounded-3xl border border-line p-6">
          <p className="text-xs font-medium text-text-secondary">
            Total earnings today
          </p>
          <h2 className="font-display text-4xl font-bold text-text-primary mt-2">$420.50</h2>

          <div className="grid grid-cols-2 gap-4 mt-7 pt-5 border-t border-line">
            <div className="flex flex-col gap-1">
              <p className="text-[11px] font-medium text-text-muted">Jobs completed</p>
              <p className="text-2xl font-bold text-text-primary">08</p>
            </div>
            <div className="flex flex-col gap-1 border-l border-line pl-4">
              <p className="text-[11px] font-medium text-text-muted">Online hours</p>
              <p className="text-2xl font-bold text-text-primary">
                6.5<span className="text-base font-normal text-text-secondary">h</span>
              </p>
            </div>
          </div>
        </section>

        {/* This Week */}
        <section className="bg-surface-raised rounded-3xl border border-line p-5">
          <h3 className="text-sm font-semibold text-text-primary mb-4">This week</h3>
          <div className="space-y-3.5">
            {WEEKLY_DATA.map((item) => (
              <div key={item.day} className="flex items-center gap-4">
                <span className="w-9 text-xs font-semibold text-text-secondary">{item.day}</span>
                <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
                  {item.earnings !== null && (
                    <div
                      className={`h-full rounded-full ${item.active ? 'bg-brand-lime' : 'bg-line-strong'}`}
                      style={{ width: `${item.height}%` }}
                    />
                  )}
                </div>
                <span className={`w-12 text-right text-sm font-semibold ${item.active ? 'text-brand-lime-dark' : 'text-text-primary'}`}>
                  {item.earnings !== null ? `$${item.earnings}` : '—'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold text-text-primary">
              Recent jobs
            </h3>
            <button className="text-brand-lime-dark text-sm font-semibold">
              View all
            </button>
          </div>

          <div className="space-y-3">
            {RECENT_JOBS.map((job, i) => (
              <div
                key={i}
                className="bg-surface-raised/60 p-4 rounded-2xl border border-line flex items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-surface-elevated border border-line flex items-center justify-center text-brand-lime/50 shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{job.name}</p>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-text-muted">
                      <span>{job.time}</span>
                      <span className="w-1 h-1 rounded-full bg-line-strong" />
                      <span>{job.distance}</span>
                      <span className="ml-2 px-1.5 py-0.5 rounded-full bg-ok/10 text-ok text-[10px] font-medium">
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="font-mono text-sm font-bold text-text-primary shrink-0 ml-3">${job.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav active="earnings" />
    </div>
  );
}
