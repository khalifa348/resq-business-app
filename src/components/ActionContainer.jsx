import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function ActionContainer() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <section className="w-full space-y-3" data-purpose="auth-actions">
      {/* Sign In — primary action */}
      <button
        className="btn-lime w-full h-16 rounded-full font-display font-bold text-xl flex items-center justify-center gap-2"
        onClick={handleSignIn}
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
