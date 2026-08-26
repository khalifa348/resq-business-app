import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MicOff,
  Keyboard,
  Volume2,
  Plus,
  VideoOff,
  User,
  PhoneOff,
} from 'lucide-react';

const CONTROL_BUTTONS = [
  { id: 'mute', icon: MicOff, label: 'Mute', defaultActive: false },
  { id: 'keypad', icon: Keyboard, label: 'Keypad', defaultActive: false },
  { id: 'speaker', icon: Volume2, label: 'Speaker', defaultActive: true },
  { id: 'add-call', icon: Plus, label: 'Add Call', defaultActive: false },
  { id: 'facetime', icon: VideoOff, label: 'FaceTime', defaultActive: false, disabled: true },
  { id: 'contacts', icon: User, label: 'Contacts', defaultActive: false },
];

export default function CallPage() {
  const navigate = useNavigate();
  const [activeStates, setActiveStates] = useState({
    mute: false,
    keypad: false,
    speaker: true,
    'add-call': false,
    facetime: false,
    contacts: false,
  });
  const [seconds, setSeconds] = useState(45);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timerStr = `${mins}:${secs.toString().padStart(2, '0')}`;

  const toggleControl = (id) => {
    if (id === 'facetime') return; // disabled
    setActiveStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleEndCall = () => {
    setIsEnding(true);
    setTimeout(() => {
      navigate('/active-job');
    }, 350);
  };

  return (
    <div className="iphone-screen page-wipe bg-ink">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-8 pt-4 pb-2 z-10">
        <span className="font-mono text-sm text-text-primary">9:41</span>
        <div className="flex gap-2 text-text-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20V2L2 22z"/></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-between py-12 px-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center w-full mt-8">
          {/* Avatar with Glow */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-lime/20 rounded-full blur-xl group-hover:bg-brand-lime/30 transition-all" />
            <div className="relative w-40 h-40 rounded-full border-2 border-brand-lime overflow-hidden bg-surface-elevated shadow-card flex items-center justify-center">
              <User size={60} className="text-text-secondary" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <span className="text-brand-lime-dark text-[11px] font-semibold uppercase tracking-wide">Active call</span>
            <h1 className="font-display text-2xl font-bold text-text-primary mt-1">Lennert Nijenbijvank</h1>
            <p className="text-sm text-text-secondary flex items-center justify-center gap-2 mt-2">
              <span>Mobile</span>
              <span className="w-1 h-1 bg-line rounded-full" />
              <span className="text-brand-lime font-bold">{timerStr}</span>
            </p>
          </div>
        </div>

        {/* Control Grid */}
        <div className="w-full grid grid-cols-3 gap-y-6 gap-x-6 mb-4">
          {CONTROL_BUTTONS.map((btn) => {
            const Icon = btn.icon;
            const isActive = activeStates[btn.id];

            return (
              <button
                key={btn.id}
                onClick={() => toggleControl(btn.id)}
                disabled={btn.disabled}
                className={`flex flex-col items-center gap-2 group ${
                  btn.disabled ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <div
                  className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    btn.disabled
                      ? 'bg-surface-elevated border border-line'
                      : isActive
                        ? 'bg-brand-lime text-on-primary  press'
                        : 'bg-surface-raised border border-line text-text-primary press hover:bg-surface-bright'
                  }`}
                >
                  <Icon size={28} />
                  {isActive && !btn.disabled && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-lime-bright animate-pulse " />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium ${
                    isActive ? 'text-brand-lime' : 'text-text-secondary'
                  }`}
                >
                  {btn.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* End Call Button */}
        <div className="w-full flex justify-center pb-4">
          <button
            onClick={handleEndCall}
            disabled={isEnding}
            className={`w-20 h-20 rounded-full bg-danger text-white flex items-center justify-center  press transition-all border-4 border-ink ${
              isEnding ? 'animate-shrink-to-center pointer-events-none' : ''
            }`}
          >
            <PhoneOff size={36} />
          </button>
        </div>
      </main>

      {/* Dynamic Island */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-[60]" />

      {/* Call Indicator */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 glass-surface rounded-full flex items-center gap-2 z-20">
        <div className="w-2 h-2 bg-brand-lime rounded-full animate-pulse" />
        <span className="text-xs font-medium text-text-primary">Ongoing Service Call</span>
      </div>
    </div>
  );
}
