import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navigation,
  Phone,
  MessageCircle,
  ChevronRight,
  Plus,
  Minus,
  Crosshair,
  Clock,
  MapPin,
  Loader2,
  PhoneOff,
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
    }, 5000);
  };

  const handleArrived = () => {
    setArrivedState('loading');
    setTimeout(() => {
      setArrivedState('done');
      setTimeout(() => {
        navigate('/job-documentation');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="iphone-screen overflow-hidden" style={{ backgroundColor: '#121413' }}>
      {/* Top Status Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
        <div className="bg-[#1F1F1E]/85 backdrop-blur-md border border-[#444936] rounded-full px-6 py-3 flex items-center gap-4 pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-[#D0FA58]" />
            <span className="font-mono text-sm text-[#D0FA58]">4 mins</span>
          </div>
          <div className="w-px h-4 bg-[#444936]" />
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-[#C5C9B0]" />
            <span className="font-mono text-xs text-[#C5C9B0] uppercase tracking-wider">
              Heading to Pickup
            </span>
          </div>
        </div>
      </header>

      {/* Main Map */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Mapbox Map */}
        <div className="absolute inset-0 z-0">
          <MapboxMap interactive={false} />
        </div>

        {/* Animated Route Line */}
        <svg className="absolute inset-0 pointer-events-none z-10 w-full h-full" viewBox="0 0 400 800">
          <path
            className="opacity-80"
            d="M 200,600 L 220,540 L 150,480 L 180,350 L 300,280"
            fill="none"
            stroke="#B5DD3D"
            strokeDasharray="10 6"
            strokeWidth="4"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="5s"
              from="100"
              repeatCount="indefinite"
              to="0"
            />
          </path>
          {/* Destination Marker */}
          <circle className="animate-pulse" cx="300" cy="280" fill="#B5DD3D" r="12" />
          <circle cx="300" cy="280" fill="#1F1F1E" r="6" />
        </svg>

        {/* Side Map Controls */}
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          <button className="w-12 h-12 bg-[#1F1F1E] border border-[#444936] rounded-full flex items-center justify-center text-[#E3E2E0] hover:bg-[#292A29] shadow-lg transition-colors">
            <Plus size={20} />
          </button>
          <button className="w-12 h-12 bg-[#1F1F1E] border border-[#444936] rounded-full flex items-center justify-center text-[#E3E2E0] hover:bg-[#292A29] shadow-lg transition-colors">
            <Minus size={20} />
          </button>
          <button className="w-12 h-12 bg-[#1F1F1E] border border-[#444936] rounded-full flex items-center justify-center text-[#D0FA58] shadow-lg transition-colors">
            <Crosshair size={20} />
          </button>
        </div>
      </main>

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center p-4">
        <div className="w-full max-w-xl bg-[#1F1F1E] rounded-[2rem] border border-[#444936] shadow-[0_-20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          {/* Handle */}
          <div className="w-12 h-1 bg-[#444936] rounded-full mx-auto mt-3 mb-1" />

          <div className="px-6 pb-8 pt-2">
            {/* Customer & Vehicle Info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#E3E2E0]">Lennert Nijenbijvank</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#343534] text-[#C5C9B0] font-mono text-xs px-2 py-0.5 rounded">
                    Flatbed Towing
                  </span>
                  <span className="text-[#8F937C] text-xs">•</span>
                  <span className="text-[#C5C9B0] text-sm">Silver Toyota Camry</span>
                </div>
              </div>
              <div className="bg-[#292A29] border border-[#444936] rounded-xl px-3 py-1 text-center">
                <span className="font-mono text-sm text-[#D0FA58] block">ABC-1234</span>
                <span className="text-[10px] uppercase text-[#C5C9B0] tracking-widest">Plate</span>
              </div>
            </div>

            {/* Action Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button className="flex flex-col items-center justify-center gap-2 bg-[#B5DD3D] text-[#283500] h-20 rounded-2xl hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#B5DD3D]/10">
                <Navigation size={28} />
                <span className="font-mono text-xs">Navigate</span>
              </button>
              <button
                onClick={handleCall}
                disabled={connecting}
                className="flex flex-col items-center justify-center gap-2 bg-[#292A29] border border-[#444936] text-[#E3E2E0] h-20 rounded-2xl hover:bg-[#343534] active:scale-95 transition-all"
              >
                <Phone size={28} />
                <span className="font-mono text-xs">Call</span>
              </button>
              <button
                onClick={() => navigate('/message')}
                className="flex flex-col items-center justify-center gap-2 bg-[#292A29] border border-[#444936] text-[#E3E2E0] h-20 rounded-2xl hover:bg-[#343534] active:scale-95 transition-all"
              >
                <MessageCircle size={28} />
                <span className="font-mono text-xs">Message</span>
              </button>
            </div>

            {/* Main Primary Action */}
            <button
              onClick={handleArrived}
              disabled={arrivedState !== 'idle'}
              className={`w-full text-lg font-bold h-16 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl ${
                arrivedState === 'idle'
                  ? 'bg-[#D0FA58] text-[#283500] active:scale-[0.98] hover:brightness-105 shadow-[#D0FA58]/20'
                  : arrivedState === 'loading'
                    ? 'bg-[#D0FA58]/70 text-[#283500]/70 cursor-not-allowed'
                    : 'bg-green-600 text-white cursor-default'
              }`}
            >
              {arrivedState === 'idle' && (
                <>
                  <span>Arrived at Pickup</span>
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {arrivedState === 'loading' && (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  <span>Processing...</span>
                </>
              )}
              {arrivedState === 'done' && (
                <>
                  <span>✓ Arrived! Returning to dashboard...</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Connecting Overlay - Shows Lottie animation for 5s when Call is pressed */}
      {connecting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#121413]">
          <div className="flex flex-col items-center gap-6">
            <dotlottie-wc
              src="https://lottie.host/5a85d534-cce9-4217-98f7-cb5522daf3a6/rPhKEWlGzp.lottie"
              style={{ width: '160px', height: '160px' }}
              autoplay
              loop
            />
            <p className="font-mono text-sm text-[#C5C9B0] animate-pulse">
              Connecting...
            </p>
            <div className="flex flex-col items-center gap-1">
              <button
                onClick={() => {
                  setConnecting(false);
                }}
                className="w-16 h-16 rounded-full bg-[#93000A] text-[#FFDAD6] flex items-center justify-center shadow-lg hover:brightness-110 active:scale-90 transition-all border-4 border-[#121413]"
              >
                <PhoneOff size={28} />
              </button>
              <span className="font-mono text-[10px] text-[#8F937C]">Cancel</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
