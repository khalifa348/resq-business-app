import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

/**
 * PageTransition — professional layered route transition.
 *
 * Instead of sliding the whole page as one block (which looks AI-generated),
 * this finds the semantic sections inside the page (header, main, nav)
 * and stagger-animates them with slightly different offsets — like
 * Uber / Apple Maps route changes.
 */
export default function PageTransition({ children }) {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset any leftover state
    gsap.set(el, { autoAlpha: 1, y: 0, scale: 1 });

    const ctx = gsap.context(() => {
      // Find the page shell (first child), then target its direct children:
      // header, main, nav — these are the layers we stagger.
      const shell = el.firstElementChild;
      if (!shell) return;
      const layers = shell.children;
      if (!layers || !layers.length) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Shell: quick fade, no slide (keeps it grounded)
      tl.fromTo(shell, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 });

      // Stagger layers: each rises 14px and fades in, 55ms apart
      tl.fromTo(
        layers,
        { y: 14, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.055,
          ease: 'power2.out',
        },
        0.06
      );

      // Clean up transforms after so scrolling/layout isn't affected
      tl.then(() => {
        gsap.set(layers, { clearProps: 'transform,opacity,visibility' });
        gsap.set(shell, { clearProps: 'opacity,visibility' });
      });
    }, el);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div ref={ref} className="page-transition-root">
      {children}
    </div>
  );
}
