import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { isNightNow } from '../lib/daynight';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();
  const isNight = useMemo(() => isNightNow(), []);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmail(email, password);
      navigate('/company-key');
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iphone-screen bg-ink relative">
      {/* Soft brand backdrop — faint video under a strong light scrim */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-25"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src={isNight ? '/videos/night.mp4' : '/videos/morning.mp4'} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/90 to-ink" />

      {/* Top bar */}
      <header className="relative z-10 h-16 px-4 flex items-center safe-area-top">
        <button
          onClick={() => navigate('/')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-raised border border-line text-text-primary press"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
      </header>

      <main className="relative z-10 flex-1 flex flex-col px-6 pb-8 overflow-y-auto no-scrollbar">
        {/* Heading */}
        <div className="mt-4 mb-8">
          <span className="text-brand-lime-dark text-[10px] font-medium uppercase tracking-[0.3em] font-bold">
            AUTH · SIGN IN
          </span>
          <h1 className="font-display font-bold tracking-tight text-4xl text-text-primary leading-tight mt-2">
            Sign in
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Access your rescue dispatch account.
          </p>
        </div>

        {/* Card — clean, high-contrast, professional */}
        <div className="bg-surface-raised border border-line rounded-3xl p-6 shadow-card card-inset">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-text-secondary" htmlFor="email">
                Email
              </label>
              <div className="relative flex items-center bg-surface-elevated border border-line rounded-xl px-4 transition-all input-glow">
                <Mail size={18} className="text-text-muted mr-3 shrink-0" />
                <input
                  className="bg-transparent border-none p-0 w-full h-12 text-text-primary placeholder-text-muted text-base focus:outline-none"
                  id="email"
                  name="email"
                  placeholder="name@email.com"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[11px] font-medium text-text-secondary" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center bg-surface-elevated border border-line rounded-xl px-4 transition-all input-glow">
                <Lock size={18} className="text-text-muted mr-3 shrink-0" />
                <input
                  className="bg-transparent border-none p-0 w-full h-12 text-text-primary placeholder-text-muted text-base focus:outline-none"
                  id="password"
                  name="password"
                  placeholder="Your password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="ml-2 focus:outline-none press shrink-0"
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-brand-lime-dark" />
                  ) : (
                    <Eye size={18} className="text-text-muted" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  className="w-4 h-4 rounded border-line bg-surface-elevated accent-[#7FA82E]"
                  type="checkbox"
                />
                <span className="text-xs text-text-secondary">Remember me</span>
              </label>
              <a className="text-xs font-semibold text-brand-lime-dark hover:underline" href="#">
                Forgot password?
              </a>
            </div>

            {/* Error */}
            {error && (
              <p className="text-danger text-xs text-center">{error}</p>
            )}

            {/* Submit */}
            <div className="pt-2">
              <button
                className={`w-full btn-lime font-display rounded-2xl py-3.5 font-bold text-lg press flex items-center justify-center gap-2 ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                disabled={loading}
                type="submit"
              >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>

        {/* Sign up link */}
        <div className="pt-8 text-center">
          <p className="text-sm text-text-secondary">
            Don't have an account?{' '}
            <Link className="text-brand-lime-dark font-bold hover:underline" to="/signup">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
