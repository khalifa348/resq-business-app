import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';

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
    <div className="iphone-screen bg-ink">
      {/* Top bar */}
      <header className="px-4 pt-14 flex items-center">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-raised border border-line text-text-primary"
        >
          <ArrowLeft size={20} />
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-10 pb-10 overflow-y-auto no-scrollbar">
        {/* Heading */}
        <div className="mb-9">
          <h1 className="font-display font-bold tracking-tight text-3xl text-text-primary leading-tight">
            Company key
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Enter the 6-digit key your admin gave you.
          </p>
        </div>

        {/* Digit Inputs */}
        <div className="flex gap-3">
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
              className={`w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border-2 bg-surface-raised focus:outline-none ${
                digit
                  ? 'border-brand-lime-dark text-brand-lime-dark'
                  : 'border-line text-text-primary focus:border-brand-lime'
              }`}
            />
          ))}
        </div>

        {/* Error */}
        {error && <p className="text-danger text-sm mt-5">{error}</p>}

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full btn-lime rounded-full h-14 font-display font-bold text-lg flex items-center justify-center gap-2 mt-8 ${
            loading ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {loading && <Loader2 size={20} className="animate-spin" />}
          {loading ? 'Verifying…' : 'Verify & access'}
        </button>

        <p className="text-text-muted text-xs text-center mt-6">
          Key required — contact your admin if you don't have one.
        </p>
      </main>
    </div>
  );
}
