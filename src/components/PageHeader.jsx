import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader({ title, subtitle, right, onBack, code }) {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 header-glass safe-area-top">
      <div className="px-4 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack || (() => navigate(-1))}
            aria-label="Go back"
            className="w-10 h-10 rounded-full bg-surface-elevated border border-line flex items-center justify-center text-text-primary transition-all press hover:bg-surface-bright shrink-0"
          >
            <ArrowLeft size={19} />
          </button>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-[17px] font-bold text-text-primary tracking-tight truncate leading-tight">
                {title}
              </h1>
            </div>
            {subtitle && (
              <p className="text-[11px] font-medium text-text-muted uppercase tracking-[0.18em] truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {right && <div className="flex items-center gap-3 shrink-0">{right}</div>}
      </div>
    </header>
  );
}
