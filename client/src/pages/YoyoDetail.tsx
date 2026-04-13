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

export default function YoyoDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const heroParallax = useScrollParallax();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const heroScale = 1 + heroParallax.progress * 0.08;

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: '#F3F0FA', fontFamily: "'Nunito', sans-serif", overflowX: 'clip' }}>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .film-grain-yoyo::before {
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
        .full-bleed-yoyo {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
        }
      `}</style>

      <div className="film-grain-yoyo" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 py-4" style={{
          backgroundColor: 'rgba(243, 240, 250, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(88, 60, 160, 0.06)',
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

          {/* Hero Video */}
          <div ref={heroParallax.ref} className="overflow-hidden w-full">
            <RevealSection direction="scale">
              <div className="overflow-hidden">
                <video
                  src={videoSrc("/yoyo-video.mp4")}
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

              {/* Title + Tags */}
              <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-center pt-10 md:pt-16">
                <RevealSection delay={200}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold playground-heading" data-testid="text-title" style={{ color: '#2D1B69' }}>YOYO</h1>
                </RevealSection>
                <RevealSection delay={400}>
                  <p className="text-sm md:text-xl leading-relaxed px-4 md:px-0" data-testid="text-subtitle" style={{ color: 'rgba(45,27,105,0.55)', maxWidth: '640px', margin: '0 auto' }}>
                    An intelligent assistant, ensuring a holistic approach to child development
                  </p>
                </RevealSection>
                <RevealSection delay={600}>
                  <div className="flex gap-2 flex-wrap pt-2 md:pt-4 justify-center" data-testid="tags-container">
                    {["AI Assistant", "IoT", "Child Wellness"].map(tag => (
                      <span key={tag} className="text-xs tracking-wider py-2 px-4 border rounded-full font-bold uppercase" style={{ borderColor: 'rgba(45,27,105,0.15)', color: 'rgba(45,27,105,0.4)' }}>{tag}</span>
                    ))}
                  </div>
                </RevealSection>
              </div>

              {/* Overview */}
              <RevealSection>
                <div className="max-w-3xl mx-auto text-center px-4 md:px-0">
                  <p className="text-sm md:text-lg lg:text-xl font-light leading-relaxed" style={{ color: 'rgba(45,27,105,0.6)' }}>
                    YOYO targets challenges in environments with time-strapped parents, mitigating potential mental health issues in children. We aim to support parents, nurture relationships, and ensure optimal care for each child's well-being. Our approach integrates advanced AI, voice technology, health sensors, and children's preferences for comprehensive, personalized support.
                  </p>
                </div>
              </RevealSection>

              {/* Image 1 — App Overview */}
              <RevealSection direction="scale">
                <div className="full-bleed-yoyo overflow-hidden">
                  <img src="/yoyo-1.jpg" alt="YOYO App Overview — AI assistant and smart device ecosystem" className="w-full h-auto" data-testid="img-overview" />
                </div>
              </RevealSection>

              {/* Image 2 — Smart Device */}
              <RevealSection direction="scale">
                <div className="full-bleed-yoyo overflow-hidden">
                  <img src="/yoyo-2.jpg" alt="YOYO Smart Device — mood detection and messaging" className="w-full h-auto" data-testid="img-device" />
                </div>
              </RevealSection>

              {/* Image 3 — Parent-Child Connection */}
              <RevealSection direction="scale">
                <div className="full-bleed-yoyo overflow-hidden">
                  <img src="/yoyo-3.jpg" alt="YOYO Parent-Child health tracking and birthday messages" className="w-full h-auto" data-testid="img-connection" />
                </div>
              </RevealSection>

              {/* Image 4 — Health Status */}
              <RevealSection direction="scale">
                <div className="full-bleed-yoyo overflow-hidden">
                  <img src="/yoyo-4.jpg" alt="YOYO Health Status — daily mood and health tracking screens" className="w-full h-auto" data-testid="img-health" />
                </div>
              </RevealSection>

              {/* Image 5 — Contact & Connection */}
              <RevealSection direction="scale">
                <div className="full-bleed-yoyo overflow-hidden">
                  <img src="/yoyo-5.jpg" alt="YOYO Contact and Connection — voice messaging and sensor device" className="w-full h-auto" data-testid="img-contact" />
                </div>
              </RevealSection>

              {/* Closing */}
              <RevealSection direction="scale">
                <div className="flex flex-col items-center gap-4 md:gap-6 py-12 md:py-24 text-center">
                  <img src="/yoyo-logo.png" alt="YOYO Logo" className="w-24 md:w-36" data-testid="img-logo" />
                  <p className="text-xs md:text-sm tracking-widest uppercase" style={{ color: 'rgba(45,27,105,0.4)' }}>
                    Nurturing connection. Supporting growth.
                  </p>
                </div>
              </RevealSection>
            </div>
          </div>
        </main>

        <footer style={{ borderTop: '1px solid rgba(45,27,105,0.08)', marginTop: '80px', padding: '48px 0' }}>
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