import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Send, User } from 'lucide-react';

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

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#444936]/30">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center text-[#E3E2E0] hover:bg-[#343534] rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>

        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full border-2 border-[#B5DD3D]/30 overflow-hidden bg-[#292A29] flex items-center justify-center">
            <User size={22} className="text-[#C5C9B0]" />
          </div>
          <div>
            <h1 className="text-base font-bold text-[#E3E2E0]">Lennert Nijenbijvank</h1>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D0FA58] animate-pulse" />
              <span className="font-mono text-[10px] text-[#D0FA58] tracking-wider">Active Job</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/call')}
          className="w-10 h-10 flex items-center justify-center bg-[#B5DD3D]/10 text-[#D0FA58] rounded-full hover:bg-[#B5DD3D]/20 transition-colors"
        >
          <Phone size={20} />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="bg-[#343534]/50 px-3 py-1 rounded-full font-mono text-[11px] text-[#C5C9B0] tracking-wider">
            TODAY, 14:22
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
                  ? 'bg-[#B5DD3D] text-[#283500] rounded-2xl rounded-br-sm'
                  : 'bg-[#292A29] text-[#E3E2E0] border border-[#444936]/30 rounded-2xl rounded-bl-sm'
              }`}
            >
              {msg.text}
            </div>
            <span className="font-mono text-[10px] text-[#8F937C] mt-1 px-1">
              {msg.time}
            </span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-[#444936]/30 bg-[#1F1F1E]">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-[#8F937C] hover:text-[#E3E2E0] transition-colors shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-[#343534] text-[#E3E2E0] placeholder:text-[#8F937C]/50 rounded-xl px-4 py-2.5 text-sm border border-[#444936]/50 focus:outline-none focus:border-[#B5DD3D]/50 transition-colors"
          />
          <button className="w-10 h-10 flex items-center justify-center bg-[#B5DD3D] text-[#283500] rounded-xl hover:brightness-110 active:scale-90 transition-all shrink-0 shadow-lg shadow-[#B5DD3D]/20">
            <Send size={20} />
          </button>
        </div>
      </div>

      {/* Dynamic Island */}
      <div className="fixed top-2 left-1/2 -translate-x-1/2 w-[120px] h-[34px] bg-black rounded-full z-[60]" />
    </div>
  );
}
