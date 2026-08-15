import { useState, useCallback } from 'react';
import BackgroundQ from '../components/BackgroundQ';
import WelcomeHeader from '../components/WelcomeHeader';
import ActionContainer from '../components/ActionContainer';

export default function WelcomePage() {
  const [exiting, setExiting] = useState(false);

  const handleExit = useCallback(() => {
    setExiting(true);
  }, []);

  return (
    <div className={`iphone-screen ${exiting ? 'animate-fadeOut' : 'animate-fadeIn'}`} style={{ backgroundColor: '#100F0F' }}>
      <BackgroundQ />

      <main className="relative z-10 flex-1 px-6 flex flex-col justify-center min-h-0">
        <WelcomeHeader />
        <ActionContainer onExit={handleExit} />
      </main>
    </div>
  );
}
