import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import BackgroundQ from '../components/BackgroundQ';
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
    <div className="iphone-screen animate-fadeIn" style={{ backgroundColor: '#100F0F' }}>
      <BackgroundQ />

      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-12 max-w-md mx-auto w-full safe-area-top">
        {/* Sign In Heading */}
        <div className="mb-12 animate-slideUp delay-0">
          <h1 className="text-5xl font-bold text-[#D4F05A] leading-tight">
            <span className="custom-underline">Sign in</span>
          </h1>
        </div>

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

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-2 animate-slideUp delay-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                className="w-4 h-4 rounded border-[#D4F05A] bg-transparent text-[#D4F05A] focus:ring-0 focus:ring-offset-0"
                type="checkbox"
              />
              <span className="text-xs text-[#71717A]">Remember Me</span>
            </label>
            <a className="text-xs font-semibold text-[#D4F05A] transition-all hover:underline" href="#">
              Forgot Password?
            </a>
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-400 text-xs text-center animate-slideUp delay-100">{error}</p>
          )}

          {/* Login Button */}
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
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </div>
        </form>

        {/* Sign up Link */}
        <div className="pt-10 text-center animate-slideUp delay-500">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link className="text-[#D4F05A] font-bold transition-all hover:underline" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
