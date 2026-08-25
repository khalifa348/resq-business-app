import { useState, useCallback, useMemo } from 'react';
import BackgroundQ from '../components/BackgroundQ';
import WelcomeHeader from '../components/WelcomeHeader';
import ActionContainer from '../components/ActionContainer';
import { isNightNow } from '../lib/daynight';

const useDayNight = () =>
  useMemo(() => ({ isNight: isNightNow() }), []);

export default function WelcomePage() {
  const [exiting, setExiting] = useState(false);
  const { isNight } = useDayNight();

  const handleExit = useCallback(() => {
    setExiting(true);
  }, []);

  return (
    <div
      className={`iphone-screen page-wipe ${exiting ? 'animate-fadeOut' : ''}`}
      style={{ backgroundColor: '#F5F5F2' }}
    >
      {/* Cinematic night-drive backdrop */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={isNight ? '/videos/night.mp4' : '/videos/morning.mp4'} type="video/mp4" />
      </video>
      {/* Readability scrim — clear at top, solid over the actions */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />

      <BackgroundQ />

      <main className="relative z-10 flex-1 px-6 flex flex-col justify-between min-h-0 pt-24 pb-10">
        <WelcomeHeader lightText={isNight} />
        <ActionContainer onExit={handleExit} />
      </main>
    </div>
  );
}
