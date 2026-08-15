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
    <div className="iphone-screen" style={{ backgroundColor: '#121413' }}>
      {/* Status Bar */}
      <div className="flex justify-between items-center px-8 pt-4 pb-2 z-10">
        <span className="font-mono text-sm text-[#E3E2E0]">9:41</span>
        <div className="flex gap-2 text-[#E3E2E0]">
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
            <div className="absolute -inset-1 bg-[#D0FA58]/20 rounded-full blur-xl group-hover:bg-[#D0FA58]/30 transition-all" />
            <div className="relative w-40 h-40 rounded-full border-2 border-[#B5DD3D] overflow-hidden bg-[#292A29] shadow-xl flex items-center justify-center">
              <User size={60} className="text-[#C5C9B0]" />
            </div>
          </div>

          <div className="mt-8 text-center">
            <h1 className="text-2xl font-bold text-[#E3E2E0]">Lennert Nijenbijvank</h1>
            <p className="font-mono text-sm text-[#C5C9B0] flex items-center justify-center gap-2 mt-2">
              <span>Mobile</span>
              <span className="w-1 h-1 bg-[#444936] rounded-full" />
              <span className="text-[#D0FA58] font-bold">{timerStr}</span>
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
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    btn.disabled
                      ? 'bg-[#343534] border border-[#444936]'
                      : isActive
                        ? 'bg-[#B5DD3D] text-[#283500] shadow-[0_0_15px_rgba(181,221,61,0.3)] active:scale-95'
                        : 'bg-[#343534] border border-[#444936] text-[#E3E2E0] active:scale-95 hover:bg-[#474745]'
                  }`}
                >
                  <Icon size={28} />
                </div>
                <span
                  className={`font-mono text-[10px] ${
                    isActive ? 'text-[#D0FA58]' : 'text-[#C5C9B0]'
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
            className={`w-20 h-20 rounded-full bg-[#93000A] text-[#FFDAD6] flex items-center justify-center shadow-lg hover:brightness-110 active:scale-90 transition-all border-4 border-[#121413] ${
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
      <div className="fixed top-12 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#1b1c1b] border border-[#444936] rounded-full flex items-center gap-2 z-20 backdrop-blur-md">
        <div className="w-2 h-2 bg-[#D0FA58] rounded-full animate-pulse" />
        <span className="font-mono text-xs text-[#E3E2E0]">Ongoing Service Call</span>
      </div>
    </div>
  );
}
