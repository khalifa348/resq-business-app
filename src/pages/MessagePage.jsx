import { useNavigate } from 'react-router-dom';
import { Phone, Send, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';

const MESSAGES = [
  {
    id: 1,
    text: "I'm near the big blue warehouse on 40th St.",
    sender: 'customer',
    time: '14:22',
  },
  {
    id: 2,
    text: "Got it, I'm about 3 minutes away. Is your vehicle safely off the road?",
    sender: 'driver',
    time: '14:23',
  },
  {
    id: 3,
    text: "Yes, I've got the hazards on.",
    sender: 'customer',
    time: '14:24',
  },
];

export default function MessagePage() {
  const navigate = useNavigate();

  return (
    <div className="iphone-screen page-wipe bg-ink">
      {/* Header */}
      <PageHeader
        title="Lennert Nijenbijvank"
        subtitle="Active Job"
        right={
          <>
            <div className="w-10 h-10 rounded-full border-2 border-brand-lime/30 overflow-hidden bg-surface-elevated flex items-center justify-center">
              <User size={20} className="text-text-secondary" />
            </div>
            <button
              onClick={() => navigate('/call')}
              className="w-10 h-10 flex items-center justify-center bg-brand-lime/10 text-brand-lime rounded-full hover:bg-brand-lime/20 transition-colors"
            >
              <Phone size={20} />
            </button>
          </>
        }
      />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pt-20 pb-4 flex flex-col gap-4">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="bg-surface-elevated px-3 py-1 rounded-full text-[11px] font-medium text-text-secondary">
            Today · 14:22
          </span>
        </div>

        {MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[80%] ${
              msg.sender === 'driver' ? 'items-end ml-auto' : 'items-start'
            }`}
          >
            <div
              className={`px-4 py-2.5 text-sm leading-relaxed ${
                msg.sender === 'driver'
                  ? 'btn-lime rounded-2xl rounded-br-sm'
                  : 'bg-surface-elevated text-text-primary border border-line rounded-2xl rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[11px] font-medium text-text-muted mt-1 px-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-line bg-surface-raised">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-surface-elevated text-text-primary placeholder:text-text-muted rounded-xl px-4 py-2.5 text-sm border border-line focus:outline-none focus:border-brand-lime/50 transition-colors"
          />
          <button className="w-10 h-10 flex items-center justify-center btn-lime rounded-xl press transition-all shrink-0">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
