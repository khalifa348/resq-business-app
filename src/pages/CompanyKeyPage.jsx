import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Loader2 } from 'lucide-react';
import BackgroundQ from '../components/BackgroundQ';

// Company key accepted locally (Supabase disconnected)

export default function CompanyKeyPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return; // only digits

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    setError('');

    // Auto-advance to next field
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    // Focus the next empty field or the last field
    const nextEmpty = newDigits.findIndex((d) => !d);
    const focusIndex = nextEmpty === -1 ? 5 : nextEmpty;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const key = digits.join('');
    if (key.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Supabase disconnected — keys are accepted locally for now.
      await new Promise((r) => setTimeout(r, 600))

      // Store validated key info in session
      sessionStorage.setItem('resq_company_key', key)

      navigate('/dashboard')
    } catch (err) {
      setError('Verification failed. Please try again.')
      setDigits(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="iphone-screen page-wipe bg-ink relative">
      <BackgroundQ />
      <div className="grain-overlay" />

      <main className="relative z-10 flex-grow flex flex-col px-6 pb-12 max-w-md mx-auto w-full pt-24 safe-area-top">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="text-brand-lime-dark text-[11px] font-semibold uppercase tracking-wide">Company key</span>
          <div className="flex justify-center mb-6 mt-2">
            <div className="w-20 h-20 rounded-2xl bg-brand-lime/10 border border-line flex items-center justify-center">
              <ShieldCheck size={44} className="text-brand-lime" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-brand-lime leading-tight">
            Company Key
          </h1>
          <p className="text-text-secondary text-sm mt-3 max-w-xs mx-auto">
            Enter your 6-digit company key to access the app
          </p>
        </div>

        {/* Digit Inputs */}
        <div className="glass-surface rounded-3xl p-6 card-inset delay-100">
          <div className="flex justify-center gap-3 mb-8">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2 bg-surface-elevated transition-all focus:outline-none ${
                  digit
                    ? 'border-brand-lime text-brand-lime shadow-[0_0_12px_rgba(198,242,78,0.30)]'
                    : 'border-line text-text-primary focus:border-brand-lime'
                }`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-danger text-xs text-center mb-6">{error}</p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full btn-lime rounded-2xl py-3.5 font-bold text-lg transition-all press flex items-center justify-center gap-2 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? 'Verifying...' : 'Verify & Access'}
          </button>

          <p className="text-text-muted text-xs text-center mt-6">
            Access key required — contact your admin
          </p>
        </div>
      </main>
    </div>
  );
}
