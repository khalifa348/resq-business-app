import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * PageTransition — minimal, native-feeling route change.
 *
 * A single fast crossfade (~180ms). No slide, no stagger, no scale —
 * movement reads as "template animation"; a plain fade is what native
 * apps use for subtle navigation and never feels AI-generated.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { autoAlpha: 1 });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.18, ease: 'power1.out', clearProps: 'opacity,visibility' }
      );
    }, el);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div ref={ref} className="page-transition-root">
      {children}
    </div>
  );
}
