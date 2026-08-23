import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navigation,
  Phone,
  MessageCircle,
  ChevronRight,
  Clock,
  Loader2,
  PhoneOff,
  User,
} from 'lucide-react';
import MapboxMap from '../components/MapboxMap';

export default function ActiveJobPage() {
  const navigate = useNavigate();
  const [arrivedState, setArrivedState] = useState('idle'); // idle | loading | done
  const [connecting, setConnecting] = useState(false);

  const handleCall = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      navigate('/call');
    }, 1800);
  };

  const handleArrived = () => {
    setArrivedState('loading');
    setTimeout(() => {
      setArrivedState('done');
      setTimeout(() => navigate('/job-documentation'), 1400);
    }, 1200);
  };

  return (
    <div className="iphone-screen overflow-hidden bg-ink">
      {/* Floating header — back + ETA, clean and minimal */}
      <header className="absolute top-0 left-0 right-0 z-40 px-4 pt-14 flex items-center justify-between pointer-events-none">
        <button
          onClick={() => navigate('/dashboard')}
          aria-label="Back to dashboard"
          className="w-10 h-10 rounded-full bg-surface-raised border border-line shadow-card flex items-center justify-center text-text-primary press pointer-events-auto"
        >
          <ChevronRight size={20} className="rotate-180" />
        </button>
        <div className="flex items-center gap-1.5 bg-surface-raised border border-line shadow-card rounded-full px-4 py-2 pointer-events-auto">
          <Clock size={15} className="text-brand-lime-dark" />
          <span className="num-led text-sm font-bold text-text-primary">4 min</span>
          <span className="text-text-muted text-xs font-medium">to pickup</span>
        </div>
      </header>

      {/* Map */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MapboxMap interactive={false} />
        </div>

        {/* Route line */}
        <svg className="absolute inset-0 pointer-events-none z-10 w-full h-full text-brand-lime" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice">
          <path
            className="opacity-80"
            d="M 200,620 L 220,540 L 150,480 L 180,350 L 300,260"
            fill="none"
            stroke="currentColor"
            strokeDasharray="10 6"
            strokeWidth="4"
            strokeLinecap="round"
          >
            <animate attributeName="stroke-dashoffset" dur="5s" from="100" repeatCount="indefinite" to="0" />
          </path>
          <circle cx="300" cy="260" fill="currentColor" r="11" />
          <circle cx="300" cy="260" fill="#FFFFFF" r="5" />
          {/* Driver dot */}
          <circle cx="200" cy="620" fill="#FFFFFF" r="12" />
          <circle cx="200" cy="620" fill="currentColor" r="7" />
        </svg>
      </main>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-40 p-4 pb-6">
        <div className="w-full bg-surface-raised rounded-3xl border border-line shadow-card card-inset overflow-hidden">
          <div className="w-11 h-1 bg-line-strong rounded-full mx-auto mt-3" />

          <div className="px-5 pb-5 pt-4">
            {/* Customer + plate */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-line flex items-center justify-center shrink-0">
                  <User size={22} className="text-text-secondary" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-text-primary tracking-tight truncate">Lennert Nijenbijvank</h2>
                  <p className="text-text-secondary text-xs mt-0.5">Silver Toyota Camry · Flatbed tow</p>
                </div>
              </div>
              <div className="bg-surface-elevated border border-line rounded-lg px-2.5 py-1.5 text-center shrink-0">
                <span className="font-mono text-xs font-bold text-text-primary block leading-none">ABC-1234</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button className="btn-lime flex flex-col items-center justify-center gap-1.5 h-[68px] rounded-2xl press">
                <Navigation size={22} />
                <span className="text-[11px] font-semibold">Navigate</span>
              </button>
              <button
                onClick={handleCall}
                disabled={connecting}
                className="flex flex-col items-center justify-center gap-1.5 bg-surface-elevated border border-line text-text-primary h-[68px] rounded-2xl press"
              >
                <Phone size={22} />
                <span className="text-[11px] font-semibold">Call</span>
              </button>
              <button
                onClick={() => navigate('/message')}
                className="flex flex-col items-center justify-center gap-1.5 bg-surface-elevated border border-line text-text-primary h-[68px] rounded-2xl press"
              >
                <MessageCircle size={22} />
                <span className="text-[11px] font-semibold">Message</span>
              </button>
            </div>

            {/* Primary action */}
            <button
              onClick={handleArrived}
              disabled={arrivedState !== 'idle'}
              className={`w-full text-base font-bold h-14 rounded-full flex items-center justify-center gap-2 press ${
                arrivedState === 'idle'
                  ? 'btn-lime'
                  : arrivedState === 'loading'
                    ? 'bg-brand-lime/40 text-text-muted cursor-not-allowed'
                    : 'bg-ok text-white cursor-default'
              }`}
            >
              {arrivedState === 'idle' && (
                <>
                  <span>Arrived at pickup</span>
                  <ChevronRight size={20} />
                </>
              )}
              {arrivedState === 'loading' && (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Confirming…</span>
                </>
              )}
              {arrivedState === 'done' && <span>Confirmed</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Connecting overlay */}
      {connecting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95">
          <div className="flex flex-col items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-surface-elevated border border-line flex items-center justify-center">
              <Phone size={30} className="text-brand-lime-dark animate-pulse" />
            </div>
            <p className="text-text-secondary text-sm">Calling Lennert…</p>
            <button
              onClick={() => setConnecting(false)}
              className="w-14 h-14 rounded-full bg-danger text-white flex items-center justify-center press"
              aria-label="Cancel call"
            >
              <PhoneOff size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
