import { useNavigate } from 'react-router-dom';
import { ClipboardList, Map, DollarSign, User } from 'lucide-react';

const ITEMS = [
  { to: '/jobs', icon: ClipboardList, label: 'Jobs', key: 'jobs' },
  { to: '/dashboard', icon: Map, label: 'Map', key: 'map' },
  { to: '/earnings', icon: DollarSign, label: 'Earnings', key: 'earnings' },
  { to: '/profile', icon: User, label: 'Profile', key: 'profile' },
];

export default function BottomNav({ active }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-5 pointer-events-none safe-area-bottom">
      <div className="dock-glass mx-auto max-w-[380px] rounded-full px-3 py-2.5 flex items-center justify-around pointer-events-auto">
        {ITEMS.map(({ to, icon: Icon, label, key }) => {
          const isActive = active === key;
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              aria-label={label}
              className={`flex flex-col items-center justify-center gap-1 rounded-full px-5 py-1.5 ${
                isActive
                  ? 'bg-brand-lime/15 text-text-primary'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <Icon size={21} strokeWidth={2} />
              <span
                className={`text-[10px] leading-none font-medium ${
                  isActive ? 'text-text-primary' : 'text-text-muted'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
