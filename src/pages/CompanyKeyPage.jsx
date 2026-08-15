import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import BackgroundQ from '../components/BackgroundQ';
import { supabase } from '../lib/supabase';

// Company key validated against Supabase access_keys table

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
      // Validate key against Supabase
      const { data, error } = await supabase
        .from('access_keys')
        .select('*')
        .eq('code', key)
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .single()

      if (error || !data) {
        setError('Invalid or expired company key.')
        setDigits(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
        return
      }

      // Log the validation
      const { data: { user } } = await supabase.auth.getUser()
      await supabase.from('key_validations').insert({
        key_id: data.id,
        validated_by: user?.id,
        app_source: 'business_app',
        success: true,
      })

      // Increment usage counter
      await supabase.rpc('increment_key_usage', { key_id: data.id })

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
    <div className="iphone-screen animate-fadeIn" style={{ backgroundColor: '#100F0F' }}>
      <BackgroundQ />

      <main className="relative z-10 flex-grow flex flex-col px-6 pb-12 max-w-md mx-auto w-full pt-24 safe-area-top">
        {/* Header */}
        <div className="mb-12 animate-slideUp delay-0 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-[#D4F05A]/10 flex items-center justify-center">
              <ShieldCheck size={44} className="text-[#D4F05A]" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#D4F05A] leading-tight">
            Company Key
          </h1>
          <p className="text-[#71717A] text-sm mt-3 max-w-xs mx-auto">
            Enter your 6-digit company key to access the app
          </p>
        </div>

        {/* Digit Inputs */}
        <div className="animate-slideUp delay-100">
          <div className="flex justify-center gap-3 mb-10">
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
                className={`w-12 h-14 text-center text-2xl font-bold rounded-xl border-2 bg-transparent transition-all focus:outline-none ${
                  digit
                    ? 'border-[#D4F05A] text-[#D4F05A] shadow-[0_0_12px_rgba(212,240,90,0.25)]'
                    : 'border-[#333] text-white focus:border-[#D4F05A]'
                }`}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-xs text-center mb-6">{error}</p>
          )}

          {/* Verify Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${
              loading
                ? 'bg-[#D4F05A]/50 text-[#100F0F]/50 cursor-not-allowed'
                : 'bg-[#D4F05A] text-[#100F0F] hover:bg-[#c4df4a]'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify & Access'}
          </button>

          <p className="text-[#71717A] text-xs text-center mt-6">
            Access key required — contact your admin
          </p>
        </div>
      </main>
    </div>
  );
}
