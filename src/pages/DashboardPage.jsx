import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Navigation,
  Info,
  CheckCircle,
  ClipboardList,
  Map,
  DollarSign,
  User,
  Star,
  Truck,
  Loader2,
  X,
  Zap,
  WifiOff,
} from 'lucide-react';
import MapboxMap from '../components/MapboxMap';

const CUSTOMERS = [
  { name: 'Lennert Nijenbijvank', rating: 4.8, reviews: 240, distance: '3.3km', time: '5mins', location: '9130/40 City Cent..' },
  { name: 'Emma Voss', rating: 4.9, reviews: 187, distance: '1.2km', time: '2mins', location: 'Keskuskatu 12..' },
  { name: 'Mikko Aaltonen', rating: 4.7, reviews: 312, distance: '5.8km', time: '9mins', location: 'Mannerheimintie 8..' },
  { name: 'Sofia Lehtinen', rating: 5.0, reviews: 89, distance: '2.1km', time: '4mins', location: 'Bulevardi 15..' },
  { name: 'Oliver Mäki', rating: 4.6, reviews: 156, distance: '4.5km', time: '7mins', location: 'Hämeentie 33..' },
  { name: 'Aino Järvinen', rating: 4.9, reviews: 203, distance: '0.8km', time: '1min', location: 'Fredrikinkatu 5..' },
  { name: 'Elias Korhonen', rating: 4.5, reviews: 94, distance: '6.2km', time: '10mins', location: 'Lönnrotinkatu 20..' },
  { name: 'Linnea Virtanen', rating: 4.8, reviews: 278, distance: '2.5km', time: '4mins', location: 'Pohjoisesplanadi 3..' },
];

const SWIPE_THRESHOLD = 80;

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [customerIndex, setCustomerIndex] = useState(0);
  const [acceptState, setAcceptState] = useState('idle');
  const [swiping, setSwiping] = useState(false);
  const [swipeX, setSwipeX] = useState(0);
  const [swipeOpacity, setSwipeOpacity] = useState(1);
  const [goingOnline, setGoingOnline] = useState(false);
  const swipeStartX = useRef(0);
  const cardRef = useRef(null);

  const customer = CUSTOMERS[customerIndex % CUSTOMERS.length];

  const nextCustomer = useCallback(() => {
    setCustomerIndex((i) => i + 1);
    setAcceptState('idle');
    setSwipeX(0);
    setSwipeOpacity(1);
  }, []);

  const handleGoOnline = () => {
    setGoingOnline(true);
    setTimeout(() => {
      setIsOnline(true);
      setGoingOnline(false);
    }, 1200);
  };

  const handleTouchStart = (e) => {
    if (acceptState !== 'idle') return;
    swipeStartX.current = e.touches[0].clientX;
    setSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!swiping || acceptState !== 'idle') return;
    const dx = e.touches[0].clientX - swipeStartX.current;
    if (dx < 0) {
      setSwipeX(dx);
      setSwipeOpacity(1 + dx / 500);
    }
  };

  const handleTouchEnd = () => {
    if (!swiping) return;
    setSwiping(false);
    if (swipeX < -SWIPE_THRESHOLD) {
      setSwipeX(-400);
      setSwipeOpacity(0);
      setTimeout(nextCustomer, 200);
    } else {
      setSwipeX(0);
      setSwipeOpacity(1);
    }
  };

  const handleMouseDown = (e) => {
    if (acceptState !== 'idle') return;
    swipeStartX.current = e.clientX;
    setSwiping(true);
  };

  const handleMouseMove = (e) => {
    if (!swiping || acceptState !== 'idle') return;
    const dx = e.clientX - swipeStartX.current;
    if (dx < 0) {
      setSwipeX(dx);
      setSwipeOpacity(1 + dx / 500);
    }
  };

  const handleMouseUp = () => {
    handleTouchEnd();
  };

  useEffect(() => {
    if (acceptState === 'accepted') {
      const timer = setTimeout(() => {
        navigate('/active-job');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [acceptState, navigate]);

  const handleAccept = () => {
    setAcceptState('loading');
    setTimeout(() => {
      setAcceptState('accepted');
    }, 1200);
  };

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
      <span className="font-mono text-[10px] mt-1 tracking-wider">{label}</span>
    </button>
  );

  const BottomNav = ({ activeTab }) => (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-[#121413] border-t border-[#444936] safe-area-bottom">
      <NavLink to="/jobs" icon={ClipboardList} label="Jobs" active={activeTab === 'jobs'} />
      <NavLink to="/dashboard" icon={Map} label="Map" active={activeTab === 'map'} />
      <NavLink to="/earnings" icon={DollarSign} label="Earnings" active={activeTab === 'earnings'} />
      <NavLink to="/profile" icon={User} label="Profile" active={activeTab === 'profile'} />
    </nav>
  );

  if (!isOnline) {
    return (
      <div className="iphone-screen select-none" style={{ backgroundColor: '#121413' }}>
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-[#121413] border-b border-[#444936] safe-area-top">
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-[#1b1c1b] px-3 py-1 rounded-full border border-[#444936]">
              <div className="w-2 h-2 rounded-full bg-[#C5C9B0] mr-2" />
              <span className="font-mono text-xs text-[#C5C9B0] tracking-wider">Offline</span>
            </div>
            <button
              onClick={() => setIsOnline(true)}
              className="text-[#D0FA58] hover:opacity-80 transition-opacity"
              aria-label="Toggle online"
            >
              <Truck size={20} />
            </button>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292A29] text-[#E3E2E0] hover:bg-[#343534] transition-colors">
            <Search size={20} />
          </button>
        </header>

        <main className="flex-1 relative mt-16 mb-20">
          {/* Gradient Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1b1a] via-[#1F1F1E] to-[#141514]" />
          <div className="absolute inset-0 opacity-[0.08]" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #D4F05A 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4F05A 0%, transparent 50%)'
          }} />

          <div className="relative h-full w-full flex flex-col items-center justify-center px-4">
            <div className="bg-[#1F1F1E] border border-[#444936] w-full max-w-[340px] p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-6 animate-scaleIn">
              <div className="w-20 h-20 rounded-full bg-[#292A29] flex items-center justify-center border border-[#444936]">
                <WifiOff size={40} className="text-[#C5C9B0]" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold text-[#E3E2E0]">You're Offline</h1>
                <p className="text-sm text-[#C5C9B0] leading-relaxed">
                  Your status is currently set to off-duty. Go online to start receiving rescue requests in your area.
                </p>
              </div>
              <div className="w-full">
                <button
                  onClick={handleGoOnline}
                  disabled={goingOnline}
                  className={`w-full font-bold py-3.5 rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
                    goingOnline
                      ? 'bg-[#B5DD3D]/50 text-[#161F00]/50 cursor-not-allowed'
                      : 'bg-[#B5DD3D] text-[#161F00] hover:brightness-105'
                  }`}
                >
                  {goingOnline ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span className="font-mono">Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={20} />
                      <span className="font-mono">Go Online</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Typography System Showcase */}
            <div className="w-full max-w-[340px] mt-6">
              <div className="bg-[#1F1F1E] border border-[#444936] rounded-2xl p-6 shadow-2xl space-y-6">
                <div className="border-b border-[#444936] pb-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C5C9B0]/50">Typography / 5-Level Hierarchy</span>
                </div>

                {/* Level 1: Passenger name */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">L1 · 20pt Bold</span>
                  <p className="text-[20px] font-bold text-[#E3E2E0] leading-tight">
                    Lennert Nijenbijvank
                  </p>
                </div>

                {/* Level 2: Section headers */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">L2 · 17pt Semibold</span>
                  <p className="text-[17px] font-semibold text-[#E3E2E0] leading-snug">
                    Active Requests
                  </p>
                </div>

                {/* Level 3: Body data */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">L3 · 15pt Regular</span>
                  <p className="text-[15px] font-normal text-[#E3E2E0] leading-relaxed">
                    ★ 4.8 · 3.3km · 5 mins away
                  </p>
                </div>

                {/* Level 4: Labels */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">L4 · 11pt Medium + All-caps +1 tracking</span>
                  <p className="text-[11px] font-medium text-[#C5C9B0] uppercase tracking-[0.06em]">
                    Target Location
                  </p>
                </div>

                {/* Level 5: Metadata/captions */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-[#C5C9B0]/40">L5 · 13pt Light</span>
                  <p className="text-[13px] font-light text-[#C5C9B0]/70 leading-snug">
                    240 reviews · 2.5 km from you
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-4 right-4 grid grid-cols-2 gap-3">
              <div className="bg-[#1b1c1b]/80 backdrop-blur-sm border border-[#444936]/50 p-4 rounded-xl">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C5C9B0]/70">Today's Earnings</span>
                <span className="text-xl font-bold text-[#E3E2E0] mt-1 block">$0.00</span>
              </div>
              <div className="bg-[#1b1c1b]/80 backdrop-blur-sm border border-[#444936]/50 p-4 rounded-xl">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#C5C9B0]/70">Active Requests</span>
                <span className="text-xl font-bold text-[#E3E2E0] mt-1 block">None</span>
              </div>
            </div>
          </div>
        </main>

        <BottomNav activeTab="map" />
      </div>
    );
  }

  return (
    <div
      className="iphone-screen select-none"
      style={{ backgroundColor: '#1F1F1E' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 bg-[#1F1F1E]/80 backdrop-blur-md border-b border-[#444936] safe-area-top">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-[#B5DD3D] overflow-hidden bg-[#343534] flex items-center justify-center shrink-0">
            <User size={20} className="text-[#B5DD3D]" />
          </div>
          <button
            onClick={() => setIsOnline(false)}
            className="flex items-center bg-[#B5DD3D]/10 border border-[#B5DD3D]/30 px-3 py-1 rounded-full gap-2 hover:bg-red-500/20 hover:border-red-500/30 transition-all group"
          >
            <div className="w-2 h-2 rounded-full bg-[#B5DD3D] glow-pulse group-hover:bg-red-500" />
            <span className="text-xs font-mono text-[#B5DD3D]/80 group-hover:text-red-400 tracking-wider">Online</span>
            <Truck size={14} className="text-[#B5DD3D] group-hover:text-red-400" />
          </button>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#292A29] text-[#E3E2E0] hover:bg-[#343534] transition-colors">
          <Search size={20} />
        </button>
      </header>

      <main className="relative w-full flex-1 min-h-0 overflow-hidden">
        {/* Map */}
        <div className="absolute inset-0 z-0">
          <MapboxMap interactive={false} showDimOverlay={true} />
          <div className="absolute inset-0 map-gradient-overlay pointer-events-none z-10" />
        </div>

        {/* Route Info Bubble */}
        <div
          key={customerIndex}
          className="absolute top-[40%] left-1/2 -translate-x-1/2 flex items-center bg-[#292A29]/95 backdrop-blur-md border border-[#444936] px-5 py-3 rounded-2xl shadow-2xl z-20 transition-all duration-300"
        >
          <div className="flex flex-col border-r border-[#444936] pr-4 mr-4">
            <span className="text-[#B5DD3D] font-bold text-lg">{customer.distance}</span>
            <span className="text-[#C5C9B0] text-xs font-mono tracking-wider">{customer.time}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#E3E2E0] font-semibold text-sm">{customer.location}</span>
            <span className="text-[#C5C9B0] text-[10px] uppercase tracking-widest">Target Location</span>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#292A29] border-r border-b border-[#444936] rotate-45" />
        </div>

        {/* Driver Marker */}
        <div className="absolute top-[55%] left-[40%] z-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-12 h-12 bg-[#B5DD3D]/20 rounded-full animate-ping" />
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-[#B5DD3D]">
              <Navigation size={20} className="text-[#B5DD3D] rotate-45" />
            </div>
          </div>
        </div>

        {/* Swipeable Card */}
        <div
          ref={cardRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          className="absolute bottom-24 left-0 w-full px-5 z-40 transition-transform will-change-transform"
          style={{
            transform: `translateX(${swipeX}px)`,
            opacity: swipeOpacity,
          }}
        >
          <div className="card-stack-effect bg-[#292A29] border border-[#444936] rounded-3xl p-6 shadow-2xl">
            {/* Customer Profile */}
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#444936] bg-gradient-to-br from-[#343534] to-[#292A29] flex items-center justify-center shrink-0">
                  <User size={28} className="text-[#C5C9B0]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="text-lg font-bold text-[#E3E2E0] truncate max-w-[180px]">{customer.name}</h2>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-[#B5DD3D] fill-[#B5DD3D]" />
                    <span className="text-[#C5C9B0] font-bold text-sm">{customer.rating}</span>
                    <span className="text-[#C5C9B0]/60 text-xs ml-1">({customer.reviews})</span>
                  </div>
                </div>
              </div>
              <button className="w-10 h-10 rounded-full bg-[#343534] flex items-center justify-center border border-[#444936] shrink-0 hover:bg-[#474745] transition-colors">
                <Info size={18} className="text-[#E3E2E0]" />
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-6">
              {acceptState === 'idle' && (
                <button
                  onClick={() => {
                    setSwipeX(-400);
                    setSwipeOpacity(0);
                    setTimeout(nextCustomer, 200);
                  }}
                  className="w-16 h-16 rounded-full bg-[#343534] border border-[#444936] flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 transition-all shrink-0 active:scale-90"
                  aria-label="Decline ride"
                >
                  <X size={24} className="text-red-400" />
                </button>
              )}
              <button
                onClick={handleAccept}
                disabled={acceptState !== 'idle'}
                className={`flex-1 h-16 rounded-2xl flex items-center justify-center gap-3 transition-all duration-150 relative overflow-hidden ${
                  acceptState === 'idle'
                    ? 'bg-[#B5DD3D] text-[#283500] active:scale-[0.98] hover:brightness-105'
                    : acceptState === 'loading'
                      ? 'bg-[#B5DD3D] text-[#283500] cursor-not-allowed'
                      : 'bg-green-600 text-white cursor-default'
                }`}
              >
                {acceptState === 'idle' && (
                  <>
                    <CheckCircle size={24} />
                    <span className="font-bold text-lg">Accept Ride</span>
                  </>
                )}
                {acceptState === 'loading' && (
                  <>
                    <Loader2 size={24} className="animate-spin" />
                    <span className="font-bold text-lg">Processing...</span>
                  </>
                )}
                {acceptState === 'accepted' && (
                  <>
                    <CheckCircle size={24} />
                    <span className="font-bold text-lg">Job Accepted!</span>
                  </>
                )}
              </button>
            </div>

            {/* Swipe Hint */}
            <div className="w-full flex flex-col items-center gap-2">
              <div className="w-full h-1 bg-[#343534] rounded-full overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-1/4 bg-[#C5C9B0]/30 animate-dash-slide" />
              </div>
              <span className="text-[#C5C9B0] font-mono uppercase tracking-[0.2em] text-[10px]">
                Swipe left or tap ✕ to reject
              </span>
            </div>
          </div>
        </div>

        {/* Next customer peek */}
        {swipeX < -40 && (
          <div
            className="absolute bottom-24 right-3 z-30 transition-all duration-150"
            style={{ opacity: Math.min(1, Math.abs(swipeX) / 200) }}
          >
            <div className="bg-[#343534] border border-[#444936] rounded-3xl p-5 shadow-xl w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1F1F1E] flex items-center justify-center">
                  <User size={18} className="text-[#C5C9B0]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[#E3E2E0] text-sm font-bold truncate max-w-[120px]">
                    {CUSTOMERS[(customerIndex + 1) % CUSTOMERS.length].name}
                  </span>
                  <span className="text-[#C5C9B0] text-[10px]">Next request</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-[#1F1F1E] border-t border-[#444936] safe-area-bottom">
        <NavLink to="/jobs" icon={ClipboardList} label="Jobs" />
        <NavLink to="/dashboard" icon={Map} label="Map" active />
        <NavLink to="/earnings" icon={DollarSign} label="Earnings" />
        <NavLink to="/profile" icon={User} label="Profile" />
      </nav>
    </div>
  );
}
