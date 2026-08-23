import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import BackgroundQ from '../components/BackgroundQ';
import { useAuth } from '../context/AuthContext';

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signUpWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const displayName = email.split('@')[0];
      await signUpWithEmail(email, password, displayName);
      navigate('/company-key');
    } catch (err) {
      setError(err.message || 'Failed to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="iphone-screen page-wipe animate-fadeIn bg-ink relative">
      <BackgroundQ />
      <div className="grain-overlay" />

      <main className="relative z-10 flex-grow flex flex-col px-6 pb-12 max-w-md mx-auto w-full pt-24 safe-area-top">
        {/* Header */}
        <header className="mb-8 animate-slideUp delay-0">
          <span className="text-brand-lime text-[10px] font-mono uppercase tracking-[0.3em]">AUTH · CREATE ACCOUNT</span>
          <h1 className="font-display text-5xl font-bold tracking-tight text-brand-lime leading-tight mt-1">
            <span className="custom-underline">Sign up</span>
          </h1>
        </header>

        {/* Sign Up Form */}
        <div className="glass-surface rounded-3xl clip-notch p-6 card-inset animate-slideUp delay-100">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary" htmlFor="email">
                Email
              </label>
              <div className="relative flex items-center border-b border-line-strong pb-2 transition-all input-glow">
                <Mail size={20} className="text-text-muted mr-3 shrink-0" />
                <span className="text-text-muted mr-2 select-none">|</span>
                <input
                  className="bg-transparent border-none p-0 w-full text-text-primary placeholder-text-muted text-base"
                  id="email"
                  name="email"
                  placeholder="demo@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center border-b border-line-strong pb-2 transition-all input-glow">
                <Lock size={20} className="text-text-muted mr-3 shrink-0" />
                <span className="text-text-muted mr-2 select-none">|</span>
                <input
                  className="bg-transparent border-none p-0 w-full text-text-primary placeholder-text-muted text-base"
                  id="password"
                  name="password"
                  placeholder="enter your password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="ml-2 focus:outline-none transition-all press"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-brand-lime" />
                  ) : (
                    <Eye size={20} className="text-brand-lime" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary" htmlFor="confirm-password">
                Confirm Password
              </label>
              <div className="relative flex items-center border-b border-line-strong pb-2 transition-all input-glow">
                <Lock size={20} className="text-text-muted mr-3 shrink-0" />
                <span className="text-text-muted mr-2 select-none">|</span>
                <input
                  className="bg-transparent border-none p-0 w-full text-text-primary placeholder-text-muted text-base"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  className="ml-2 focus:outline-none transition-all press"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} className="text-brand-lime" />
                  ) : (
                    <Eye size={20} className="text-brand-lime" />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-danger text-xs text-center animate-slideUp delay-100">{error}</p>
            )}

            {/* Create Account Button */}
            <div className="pt-2">
              <button
                className={`w-full btn-lime rounded-2xl py-3.5 font-bold text-lg transition-all press flex items-center justify-center gap-2 ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                disabled={loading}
                type="submit"
              >
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center relative z-10 animate-slideUp delay-500">
        <p className="text-sm text-text-secondary">
          Already have an Account?{' '}
          <Link className="text-brand-lime font-bold transition-all hover:underline" to="/signin">
            Login
          </Link>
        </p>
      </footer>
    </div>
  );
}
