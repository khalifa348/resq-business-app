import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import {
  Navigation,
  Star,
  User,
  Loader2,
  X,
  Zap,
  WifiOff,
  Check,
  MapPin,
  Clock,
} from 'lucide-react';
import MapboxMap from '../components/MapboxMap';
import BottomNav from '../components/BottomNav';

gsap.registerPlugin(Draggable);

const CUSTOMERS = [
  { name: 'Lennert Nijenbijvank', rating: 4.8, reviews: 240, distance: '3.3 km', time: '5 min', location: '9130/40 City Center', fare: '$18.50' },
  { name: 'Emma Voss', rating: 4.9, reviews: 187, distance: '1.2 km', time: '2 min', location: 'Keskuskatu 12', fare: '$12.00' },
  { name: 'Mikko Aaltonen', rating: 4.7, reviews: 312, distance: '5.8 km', time: '9 min', location: 'Mannerheimintie 8', fare: '$24.20' },
  { name: 'Sofia Lehtinen', rating: 5.0, reviews: 89, distance: '2.1 km', time: '4 min', location: 'Bulevardi 15', fare: '$15.75' },
  { name: 'Oliver Mäki', rating: 4.6, reviews: 156, distance: '4.5 km', time: '7 min', location: 'Hämeentie 33', fare: '$19.40' },
];

const SWIPE_THRESHOLD = 90;

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);
  const [customerIndex, setCustomerIndex] = useState(0);
  const [acceptState, setAcceptState] = useState('idle');
  const [goingOnline, setGoingOnline] = useState(false);
  const cardRef = useRef(null);
  const acceptStateRef = useRef('idle');
  acceptStateRef.current = acceptState;

  const headerRef = useRef(null);
  const bubbleRef = useRef(null);
  const markerRef = useRef(null);
  const navRef = useRef(null);
  const playedIntro = useRef(false);

  const customer = CUSTOMERS[customerIndex % CUSTOMERS.length];

  const nextCustomer = useCallback(() => {
    setCustomerIndex((i) => i + 1);
    setAcceptState('idle');
    if (cardRef.current) gsap.set(cardRef.current, { x: 0, opacity: 1 });
  }, []);

  const dismissCard = useCallback(() => {
    gsap.to(cardRef.current, {
      x: -420,
      opacity: 0,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        nextCustomer();
        gsap.fromTo(
          cardRef.current,
          { x: 48, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      },
    });
  }, [nextCustomer]);

  // Entrance choreography
  useEffect(() => {
    if (!isOnline || playedIntro.current) return;
    playedIntro.current = true;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(headerRef.current, { y: -48, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 })
        .fromTo(markerRef.current, { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.8)' }, '-=0.2')
        .fromTo(bubbleRef.current, { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, '-=0.25')
        .fromTo(cardRef.current, { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
        .fromTo(navRef.current, { y: 48, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.4 }, '-=0.4');
    });
    return () => ctx.revert();
  }, [isOnline]);

  // Swipe physics
  useEffect(() => {
    if (!isOnline || !cardRef.current) return;
    const d = Draggable.create(cardRef.current, {
      type: 'x',
      bounds: { minX: -500, maxX: 0 },
      edgeResistance: 0.78,
      onDrag() {
        gsap.set(cardRef.current, { opacity: 1 + this.x / 600 });
      },
      onDragEnd() {
        if (acceptStateRef.current !== 'idle') {
          gsap.to(cardRef.current, { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' });
          return;
        }
        if (this.x < -SWIPE_THRESHOLD) {
          dismissCard();
        } else {
          gsap.to(cardRef.current, { x: 0, opacity: 1, duration: 0.7, ease: 'elastic.out(1, 0.6)' });
        }
      },
    });
    return () => d[0].kill();
  }, [isOnline, customerIndex, dismissCard]);

  const handleGoOnline = () => {
    setGoingOnline(true);
    setTimeout(() => {
      playedIntro.current = false;
      setIsOnline(true);
      setGoingOnline(false);
    }, 1200);
  };

  useEffect(() => {
    if (acceptState === 'accepted') {
      const timer = setTimeout(() => navigate('/active-job'), 900);
      return () => clearTimeout(timer);
    }
  }, [acceptState, navigate]);

  const handleAccept = () => {
    setAcceptState('loading');
    setTimeout(() => setAcceptState('accepted'), 1100);
  };

  /* ------------------------------ OFFLINE ------------------------------ */
  if (!isOnline) {
    return (
      <div className="iphone-screen select-none bg-ink">
        <header className="px-5 pt-14 pb-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-text-primary">Dispatch</h1>
          <span className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-text-muted" />
            Offline
          </span>
        </header>

        <main className="flex-1 relative flex flex-col items-center justify-center px-6 pb-24">
          <div className="w-full max-w-[340px] bg-surface-raised border border-line rounded-3xl p-8 shadow-card card-inset flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center border border-line">
              <WifiOff size={30} className="text-text-secondary" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-bold tracking-tight text-text-primary">You're offline</h2>
              <p className="text-sm text-text-secondary leading-relaxed">
                Go online to start receiving rescue requests in your area.
              </p>
            </div>
            <button
              onClick={handleGoOnline}
              disabled={goingOnline}
              className={`w-full font-bold py-3.5 rounded-full press flex items-center justify-center gap-2 ${
                goingOnline ? 'bg-brand-lime/50 text-text-muted cursor-not-allowed' : 'btn-lime'
              }`}
            >
              {goingOnline ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  <span>Connecting…</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Go online</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full max-w-[340px] mt-6 grid grid-cols-2 gap-3">
            <div className="bg-surface-raised border border-line p-4 rounded-2xl">
              <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Today's earnings</span>
              <span className="num-led text-xl font-bold text-text-primary mt-1 block">$0.00</span>
            </div>
            <div className="bg-surface-raised border border-line p-4 rounded-2xl">
              <span className="text-[11px] font-medium uppercase tracking-wide text-text-muted">Active requests</span>
              <span className="num-led text-xl font-bold text-text-primary mt-1 block">None</span>
            </div>
          </div>
        </main>

        <div ref={navRef}>
          <BottomNav active="map" />
        </div>
      </div>
    );
  }

  /* ------------------------------ ONLINE ------------------------------ */
  return (
    <div className="iphone-screen select-none bg-ink">
      {/* Header */}
      {/* Floating online status — no bar, just the toggle over the map */}
      <button
        ref={headerRef}
        onClick={() => setIsOnline(false)}
        className="absolute top-14 left-5 z-40 inline-flex items-center bg-surface-raised border border-line px-4 py-2 rounded-full shadow-card"
        aria-label="Go offline"
      >
        <span className="text-xs font-semibold text-brand-lime-dark">Online</span>
      </button>

      <main className="relative w-full flex-1 min-h-0 overflow-hidden">
        {/* Map */}
        <div className="absolute inset-0 z-0">
          <MapboxMap interactive={false} showDimOverlay={true} />
          <div className="absolute inset-0 map-gradient-overlay pointer-events-none z-10" />
        </div>

        {/* Route bubble — clean, integrated */}
        <div
          ref={bubbleRef}
          key={customerIndex}
          className="absolute top-[13%] left-1/2 -translate-x-1/2 z-20 glass-surface-strong rounded-2xl shadow-card px-4 py-2.5 flex items-center gap-3 whitespace-nowrap"
        >
          <div className="flex items-center gap-1.5">
            <MapPin size={15} className="text-brand-lime-dark shrink-0" />
            <span className="num-led text-text-primary font-bold text-base">{customer.distance}</span>
          </div>
          <div className="w-px h-5 bg-line-strong" />
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-text-muted shrink-0" />
            <span className="text-text-secondary text-sm font-medium">{customer.time} away</span>
          </div>
        </div>

        {/* Driver marker — single clean dot */}
        <div ref={markerRef} className="absolute top-[48%] left-[42%] z-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-10 h-10 rounded-full bg-brand-lime/30" />
            <div className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-brand-lime">
              <Navigation size={19} className="text-brand-lime-dark rotate-45" />
            </div>
          </div>
        </div>

        {/* Request card — clean, professional */}
        <div
          ref={cardRef}
          className="absolute bottom-24 left-0 w-full px-4 z-40 will-change-transform cursor-grab active:cursor-grabbing"
        >
          <div className="bg-surface-raised border border-line rounded-3xl p-5 shadow-card card-inset">
            {/* Customer row */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-14 h-14 rounded-2xl bg-surface-elevated border border-line flex items-center justify-center shrink-0">
                  <User size={26} className="text-text-secondary" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="font-display text-lg font-bold text-text-primary truncate tracking-tight">
                    {customer.name}
                  </h2>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star size={14} className="text-brand-lime-dark fill-brand-lime-dark" />
                    <span className="text-text-primary font-semibold text-sm">{customer.rating}</span>
                    <span className="text-text-muted text-xs">({customer.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="num-led text-xl font-bold text-text-primary">{customer.fare}</div>
                <div className="text-text-muted text-[11px] font-medium">est. fare</div>
              </div>
            </div>

            {/* Location row */}
            <div className="flex items-center gap-2.5 bg-surface-elevated rounded-2xl px-4 py-3 mb-5">
              <MapPin size={16} className="text-brand-lime-dark shrink-0" />
              <div className="min-w-0">
                <div className="text-text-primary text-sm font-semibold truncate">{customer.location}</div>
                <div className="text-text-muted text-[11px]">Pickup location</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {acceptState === 'idle' && (
                <button
                  onClick={dismissCard}
                  className="w-14 h-14 rounded-full bg-surface-elevated border border-line flex items-center justify-center press shrink-0"
                  aria-label="Decline"
                >
                  <X size={22} className="text-danger" />
                </button>
              )}
              <button
                onClick={handleAccept}
                disabled={acceptState !== 'idle'}
                className={`flex-1 h-14 rounded-full flex items-center justify-center gap-2.5 font-display font-bold text-lg press ${
                  acceptState === 'idle'
                    ? 'btn-lime'
                    : acceptState === 'loading'
                      ? 'btn-lime cursor-not-allowed opacity-90'
                      : 'bg-ok text-white cursor-default'
                }`}
              >
                {acceptState === 'idle' && (
                  <>
                    <Check size={22} strokeWidth={3} />
                    <span>Accept</span>
                  </>
                )}
                {acceptState === 'loading' && (
                  <>
                    <Loader2 size={22} className="animate-spin" />
                    <span>Processing…</span>
                  </>
                )}
                {acceptState === 'accepted' && (
                  <>
                    <Check size={22} strokeWidth={3} />
                    <span>Accepted</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <div ref={navRef}>
        <BottomNav active="map" />
      </div>
    </div>
  );
}
