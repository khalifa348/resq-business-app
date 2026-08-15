import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
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
    <div className="iphone-screen animate-fadeIn" style={{ backgroundColor: '#100F0F' }}>
      <BackgroundQ />

      <main className="relative z-10 flex-grow flex flex-col px-6 pb-12 max-w-md mx-auto w-full pt-24 safe-area-top">
        {/* Header */}
        <header className="mb-12 animate-slideUp delay-0">
          <h1 className="text-5xl font-bold leading-tight" style={{ color: '#D4F05A' }}>
            <span className="custom-underline">Sign up</span>
          </h1>
        </header>

        {/* Sign Up Form */}
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="space-y-2 animate-slideUp delay-100">
            <label className="text-sm font-medium text-[#71717A]" htmlFor="email">
              Email
            </label>
            <div className="relative flex items-center border-b border-[#71717A] pb-2 transition-all input-glow">
              <Mail size={20} className="text-[#71717A] mr-3 shrink-0" />
              <span className="text-[#71717A] mr-2 select-none">|</span>
              <input
                className="bg-transparent border-none p-0 w-full text-white placeholder-[#71717A] text-base"
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
          <div className="space-y-2 animate-slideUp delay-200">
            <label className="text-sm font-medium text-[#71717A]" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center border-b border-[#71717A] pb-2 transition-all input-glow">
              <Lock size={20} className="text-[#71717A] mr-3 shrink-0" />
              <span className="text-[#71717A] mr-2 select-none">|</span>
              <input
                className="bg-transparent border-none p-0 w-full text-white placeholder-[#71717A] text-base"
                id="password"
                name="password"
                placeholder="enter your password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="ml-2 focus:outline-none transition-all"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-[#D4F05A]" />
                ) : (
                  <Eye size={20} className="text-[#D4F05A]" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2 animate-slideUp delay-300">
            <label className="text-sm font-medium text-[#71717A]" htmlFor="confirm-password">
              Confirm Password
            </label>
            <div className="relative flex items-center border-b border-[#71717A] pb-2 transition-all input-glow">
              <Lock size={20} className="text-[#71717A] mr-3 shrink-0" />
              <span className="text-[#71717A] mr-2 select-none">|</span>
              <input
                className="bg-transparent border-none p-0 w-full text-white placeholder-[#71717A] text-base"
                id="confirm-password"
                name="confirm-password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="ml-2 focus:outline-none transition-all"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} className="text-[#D4F05A]" />
                ) : (
                  <Eye size={20} className="text-[#D4F05A]" />
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-xs text-center animate-slideUp delay-100">{error}</p>
          )}

          {/* Create Account Button */}
          <div className="pt-10 animate-slideUp delay-400">
            <button
              className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${
                loading
                  ? 'bg-[#D4F05A]/50 text-[#100F0F]/50 cursor-not-allowed'
                  : 'bg-[#D4F05A] text-[#100F0F] hover:bg-[#c4df4a]'
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center relative z-10 animate-slideUp delay-500">
        <p className="text-sm text-gray-400">
          Already have an Account?{' '}
          <Link className="text-[#D4F05A] font-bold transition-all hover:underline" to="/signin">
            Login
          </Link>
        </p>
      </footer>
    </div>
  );
}
