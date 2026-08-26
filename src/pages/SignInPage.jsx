import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const navigate = useNavigate();
  const { signInWithEmail } = useAuth();
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
    <div className="iphone-screen bg-ink">
      {/* Top bar */}
      <header className="px-4 pt-14 flex items-center">
        <button
          onClick={() => navigate('/')}
          aria-label="Back"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-raised border border-line text-text-primary"
        >
          <ArrowLeft size={20} />
        </button>
      </header>

      <main className="flex-1 flex flex-col px-6 pt-10 pb-10 overflow-y-auto no-scrollbar">
        {/* Heading — clean, no kicker */}
        <div className="mb-9">
          <h1 className="font-display font-bold tracking-tight text-3xl text-text-primary leading-tight">
            Sign in
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            Sign in to accept jobs and track your earnings.
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
                placeholder="Your password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
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

          {/* Forgot password */}
          <div className="flex justify-end">
            <a className="text-sm font-semibold text-brand-lime-dark" href="#">
              Forgot password?
            </a>
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
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Sign up link */}
        <div className="pt-8 text-center">
          <p className="text-sm text-text-secondary">
            New to RESQ?{' '}
            <Link className="text-brand-lime-dark font-bold" to="/signup">
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
