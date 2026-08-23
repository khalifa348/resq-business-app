import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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
    <section className="w-full space-y-3" data-purpose="auth-actions">
      {/* Sign In — primary action */}
      <button
        className={`btn-lime w-full h-16 rounded-full font-display font-bold text-xl flex items-center justify-center gap-2 ${
          clicked ? 'animate-shrinkOut' : ''
        }`}
        data-purpose="sign-in-trigger"
        id="sign-in-button"
        onClick={handleSignIn}
        disabled={clicked}
      >
        Sign in
        <ArrowRight size={20} strokeWidth={2.5} />
      </button>

      {/* Create account — secondary action */}
      <button
        className="btn-ghost w-full h-16 rounded-full flex items-center justify-center"
        onClick={() => navigate('/signup')}
      >
        Create new account
      </button>
    </section>
  );
}
