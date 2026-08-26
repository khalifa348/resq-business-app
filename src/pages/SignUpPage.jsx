import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
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
    <div className="iphone-screen bg-ink">
      {/* Top bar */}
      <header className="px-4 pt-14 flex items-center">
        <button
          onClick={() => navigate('/signin')}
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
            Create account
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Start working with RESQ in less than a minute.
          </p>
        </div>

        {/* Form — flat, native, no card */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-primary" htmlFor="email">
              Email
            </label>
            <input
              className="w-full h-12 bg-surface-raised border border-line rounded-xl px-4 text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-lime input-glow"
              id="email"
              name="email"
              placeholder="name@email.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-primary" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full h-12 bg-surface-raised border border-line rounded-xl px-4 pr-16 text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-lime input-glow"
                id="password"
                name="password"
                placeholder="At least 6 characters"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-lime-dark"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-text-primary" htmlFor="confirm-password">
              Confirm password
            </label>
            <div className="relative">
              <input
                className="w-full h-12 bg-surface-raised border border-line rounded-xl px-4 pr-16 text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-brand-lime input-glow"
                id="confirm-password"
                name="confirm-password"
                placeholder="Repeat your password"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-brand-lime-dark"
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-danger text-sm">{error}</p>}

          {/* Submit */}
          <button
            className={`w-full btn-lime rounded-full h-14 font-display font-bold text-lg flex items-center justify-center gap-2 ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
            disabled={loading}
            type="submit"
          >
            {loading && <Loader2 size={20} className="animate-spin" />}
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        {/* Sign in link */}
        <div className="pt-8 text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{' '}
            <Link className="text-brand-lime-dark font-bold" to="/signin">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
