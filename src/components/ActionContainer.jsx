import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function ActionContainer({ onExit }) {
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const handleSignIn = () => {
    setClicked(true);
    onExit?.();
    setTimeout(() => {
      navigate('/signin');
    }, 350);
  };

  return (
    <section className="w-full" data-purpose="auth-actions">
      <div className="mb-8">
        <p className="text-sm text-brand-lime font-semibold mb-4 animate-slideUp delay-200">
          Existing customer / Get started
        </p>

        {/* Sign In Button */}
        <button
          className={`bg-brand-lime text-black w-full py-4 rounded-xl font-bold text-lg transition-all ${
            clicked ? 'animate-shrinkOut' : 'hover:opacity-90 animate-slideUp delay-300'
          }`}
          data-purpose="sign-in-trigger"
          id="sign-in-button"
          onClick={handleSignIn}
          disabled={clicked}
        >
          Sign in
        </button>
      </div>

      {/* Registration Link */}
      <div className="text-sm font-medium animate-slideUp delay-400">
        <span className="text-white">New customer? </span>
        <Link className="text-brand-lime hover:underline transition-all" to="/signup">
          Create new account
        </Link>
      </div>
    </section>
  );
}
