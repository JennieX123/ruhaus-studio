import { useLocation } from "wouter";
import { videoSrc } from '../lib/video';
import { useState, useEffect, useRef } from "react";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

function RevealSection({ children, className = "", delay = 0, direction = "up" }: { children: React.ReactNode; className?: string; delay?: number; direction?: "up" | "left" | "right" | "scale" }) {
  const { ref, isVisible } = useReveal(0.1);
  const transforms: Record<string, string> = {
    up: "translateY(60px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
    scale: "scale(0.92)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

function useScrollParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const p = Math.max(0, Math.min(1, 1 - (rect.bottom / (viewH + rect.height))));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return { ref, progress };
}

export default function HearMeDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const heroParallax = useScrollParallax();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const heroScale = 1 + heroParallax.progress * 0.08;

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: '#F0F5F0', fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .film-grain-hm::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          z-index: 100;
        }
        .full-bleed {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }
      `}</style>

      <div className="film-grain-hm" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 py-4" style={{
          backgroundColor: 'rgba(240, 245, 240, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 60, 30, 0.06)',
        }}>
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <button
              onClick={() => navigate("/")}
              className="text-lg font-medium playground-heading tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
              data-testid="link-home"
            >
              Ruhaus
            </button>
            <nav className="flex gap-8 text-sm font-medium opacity-60">
              <a href="#" className="hover:opacity-100 transition-opacity" data-testid="link-about">About</a>
            </nav>
          </div>
        </header>

        <main className="pb-12 md:pb-20" style={{ paddingTop: 0 }}>

          {/* Hero Video — Parallax */}
          <div ref={heroParallax.ref} className="overflow-hidden" style={{ width: '100vw' }}>
            <RevealSection direction="scale">
              <div className="overflow-hidden">
                <video
                  src={videoSrc("/hearme-video.mp4")}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                  data-testid="video-hero"
                  style={{ transform: `scale(${heroScale})`, transition: 'transform 0.1s linear', transformOrigin: 'center center' }}
                />
              </div>
            </RevealSection>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-16 md:space-y-24">

              {/* Title + Description */}
              <div className="max-w-4xl mx-auto space-y-6 text-center pt-12 md:pt-16">
                <RevealSection delay={200}>
                  <h1 className="text-4xl md:text-6xl font-semibold playground-heading" data-testid="text-title" style={{ color: '#1a3a2a' }}>Hear Me</h1>
                </RevealSection>
                <RevealSection delay={400}>
                  <p className="text-base md:text-xl leading-relaxed" data-testid="text-subtitle" style={{ color: 'rgba(26,58,42,0.6)', maxWidth: '640px', margin: '0 auto' }}>
                    AI-based avatar assistant for people with hearing and speech disabilities
                  </p>
                </RevealSection>
                <RevealSection delay={600}>
                  <div className="flex gap-2 flex-wrap pt-4 justify-center" data-testid="tags-container">
                    {["AI", "Voice UX", "Accessibility"].map(tag => (
                      <span key={tag} className="text-xs tracking-wider py-2 px-4 border rounded-full font-bold uppercase" style={{ borderColor: 'rgba(26,58,42,0.15)', color: 'rgba(26,58,42,0.4)' }}>{tag}</span>
                    ))}
                  </div>
                </RevealSection>
              </div>

              {/* Overview Text */}
              <RevealSection>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(26,58,42,0.7)' }}>
                    For deaf and non-vocal people, connecting with the world can be deeply frustrating. But it doesn't have to be. HEAR ME is an app that uses AI technology and mindful interaction design to provide 360-degree support for the deaf and non-vocal community. It not only bridges their communication gap, but offers 24/7 mood tracking and AI avatar-based personal assistance as well as emotional support.
                  </p>
                </div>
              </RevealSection>

              {/* Image 1 — App Overview */}
              <RevealSection direction="scale">
                <div className="full-bleed overflow-hidden">
                  <img src="/hearme-1.jpg" alt="Hear Me App Overview" className="w-full h-auto" data-testid="img-overview" />
                </div>
              </RevealSection>

              {/* Image 2 — Features */}
              <RevealSection direction="scale">
                <div className="full-bleed overflow-hidden">
                  <img src="/hearme-2.jpg" alt="Hear Me Features" className="w-full h-auto" data-testid="img-features" />
                </div>
              </RevealSection>

              {/* Image 3 — Tablet Usage */}
              <RevealSection direction="scale">
                <div className="full-bleed overflow-hidden">
                  <img src="/hearme-3.jpg" alt="Hear Me on Tablet" className="w-full h-auto" data-testid="img-tablet" />
                </div>
              </RevealSection>

              {/* Image 4 — Tablet Screens */}
              <RevealSection direction="scale">
                <div className="full-bleed overflow-hidden">
                  <img src="/hearme-4.jpg" alt="Hear Me Tablet Screens" className="w-full h-auto" data-testid="img-tablet-screens" />
                </div>
              </RevealSection>

              {/* Image 5 — Data & Mood Tracking */}
              <RevealSection direction="scale">
                <div className="full-bleed overflow-hidden">
                  <img src="/hearme-5.jpg" alt="Hear Me Mood Tracking" className="w-full h-auto" data-testid="img-mood" />
                </div>
              </RevealSection>

              {/* Closing */}
              <RevealSection direction="scale">
                <div className="flex flex-col items-center gap-6 py-16 md:py-24 text-center">
                  <h2 className="text-3xl md:text-5xl font-bold" data-testid="img-logo" style={{ fontFamily: "'Nunito', sans-serif", color: '#1a3a2a' }}>Hear Me</h2>
                  <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(26,58,42,0.4)' }}>
                    Bridging communication. Building connection.
                  </p>
                </div>
              </RevealSection>
            </div>
          </div>
        </main>

        <footer style={{ borderTop: '1px solid rgba(26,58,42,0.08)', marginTop: '80px', padding: '48px 0' }}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm">
            <p>© {new Date().getFullYear()} Ruhaus Studio. All rights reserved.</p>
            <div className="flex gap-6 font-mono tracking-wider">
              <a href="#" className="hover:opacity-100 transition-opacity">TWITTER</a>
              <a href="#" className="hover:opacity-100 transition-opacity">DRIBBBLE</a>
              <a href="#" className="hover:opacity-100 transition-opacity">CONTACT</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}