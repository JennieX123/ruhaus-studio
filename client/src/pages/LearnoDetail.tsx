import { useLocation } from "wouter";
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

const COLORS = {
  bg: '#FBF8F4',
  text: '#3D2B1F',
  textMuted: 'rgba(61,43,31,0.55)',
  textLight: 'rgba(61,43,31,0.35)',
  accent: '#8BC34A',
  border: 'rgba(61,43,31,0.08)',
  headerBg: 'rgba(251,248,244,0.85)',
};

function IpadVideo({ src, alt, testId }: { src: string; alt: string; testId: string }) {
  return (
    <div className="relative mx-auto" style={{ maxWidth: '560px' }}>
      <div className="relative rounded-[16px] md:rounded-[24px] overflow-hidden shadow-2xl border-[6px] md:border-[10px] border-[#1a1a1a]" style={{ background: '#1a1a1a' }}>
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto block"
          data-testid={testId}
        />
      </div>
    </div>
  );
}

interface FeatureCardProps {
  label: string;
  title: string;
  description: string;
  videoSrc: string;
  layout: 'left' | 'right';
  testId: string;
}

function FeatureCard({ label, title, description, videoSrc, layout, testId }: FeatureCardProps) {
  const textContent = (
    <div className="flex flex-col justify-center space-y-4 md:space-y-6">
      <p className="text-xs tracking-widest uppercase font-medium" style={{ color: COLORS.textLight }}>{label}</p>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight playground-heading" style={{ color: COLORS.text }}>{title}</h3>
      <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.textMuted }}>{description}</p>
    </div>
  );

  const ipadContent = (
    <IpadVideo src={videoSrc} alt={title} testId={testId} />
  );

  return (
    <RevealSection direction={layout === 'left' ? 'left' : 'right'}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {layout === 'left' ? (
          <>
            <div className="order-2 md:order-1">{textContent}</div>
            <div className="order-1 md:order-2">{ipadContent}</div>
          </>
        ) : (
          <>
            <div className="order-1">{ipadContent}</div>
            <div className="order-2">{textContent}</div>
          </>
        )}
      </div>
    </RevealSection>
  );
}

export default function LearnoDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const heroParallax = useScrollParallax();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const heroScale = 1 + heroParallax.progress * 0.08;

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: COLORS.bg, fontFamily: "'Nunito', sans-serif", overflowX: 'clip' }}>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .film-grain-learno::before {
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
        .full-bleed-learno {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;
          max-width: 100vw;
        }
      `}</style>

      <div className="film-grain-learno" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 py-4" style={{
          backgroundColor: COLORS.headerBg,
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${COLORS.border}`,
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

          {/* Hero Image */}
          <div ref={heroParallax.ref} className="overflow-hidden w-full">
            <RevealSection direction="scale">
              <div className="overflow-hidden">
                <img
                  src="/learno-hero.jpg"
                  alt="LEARNO — Knowledge Realms ecosystem"
                  className="w-full h-auto"
                  data-testid="img-hero"
                  style={{ transform: `scale(${heroScale})`, transition: 'transform 0.1s linear', transformOrigin: 'center center' }}
                />
              </div>
            </RevealSection>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-20 md:space-y-32 lg:space-y-40">

              {/* Title + Tags */}
              <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 text-center pt-10 md:pt-16">
                <RevealSection delay={200}>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold playground-heading" data-testid="text-title" style={{ color: COLORS.text }}>LEARNO</h1>
                </RevealSection>
                <RevealSection delay={400}>
                  <p className="text-sm md:text-xl leading-relaxed px-4 md:px-0" data-testid="text-subtitle" style={{ color: COLORS.textMuted, maxWidth: '640px', margin: '0 auto' }}>
                    A next-generation K–12 learning ecosystem with AI-guided gamified journeys and emotional companions
                  </p>
                </RevealSection>
                <RevealSection delay={600}>
                  <div className="flex gap-2 flex-wrap pt-2 md:pt-4 justify-center" data-testid="tags-container">
                    {["EdTech", "AI Learning", "K-12", "Gamification"].map(tag => (
                      <span key={tag} className="text-xs tracking-wider py-2 px-4 border rounded-full font-bold uppercase" style={{ borderColor: 'rgba(61,43,31,0.15)', color: COLORS.textLight }}>{tag}</span>
                    ))}
                  </div>
                </RevealSection>
              </div>

              {/* Problem Statement — editorial layout */}
              <RevealSection>
                <div className="max-w-5xl mx-auto px-4 md:px-0">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                    <div className="md:col-span-4">
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight playground-heading" style={{ color: COLORS.text }}>
                        Uncovering Hidden Pressure in K1–K12 Education
                      </h2>
                    </div>
                    <div className="md:col-span-8 space-y-6 md:space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <p className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.text }}>55M</p>
                          <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
                            K1–K12 students in the US face sustained and often underestimated academic pressure throughout their learning journey.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <p className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.text }}>60%</p>
                          <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
                            experience daily academic stress, while around 40% report persistent sadness or disengagement.
                          </p>
                        </div>
                        <div className="space-y-3">
                          <p className="text-3xl md:text-4xl font-bold" style={{ color: COLORS.text }}>40%</p>
                          <p className="text-sm leading-relaxed" style={{ color: COLORS.textMuted }}>
                            report persistent sadness. Existing tools remain performance-driven, leaving emotional resilience under-supported.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>

              {/* Solution Statement — refined */}
              <RevealSection>
                <div className="max-w-3xl mx-auto text-center px-4 md:px-0 space-y-6">
                  <p className="text-sm md:text-lg tracking-wide uppercase" style={{ color: COLORS.textLight, letterSpacing: '0.15em' }}>Pressure always happens</p>
                  <div className="w-12 h-px mx-auto" style={{ backgroundColor: COLORS.border }} />
                  <p className="text-lg md:text-2xl lg:text-3xl font-semibold leading-relaxed playground-heading" style={{ color: COLORS.text }}>
                    Now there is a way to make students have a <span style={{ color: COLORS.accent }}>mindful, confidence-building</span> learning journey from K1 to K12
                  </p>
                </div>
              </RevealSection>

              {/* ——— Learno Universe ——— */}
              <div className="space-y-20 md:space-y-28">
                <RevealSection>
                  <p className="text-xs tracking-widest uppercase font-medium border-b pb-4" style={{ color: COLORS.textLight, borderColor: COLORS.border }}>Learno Universe</p>
                </RevealSection>

                <FeatureCard
                  label="Learno Universe"
                  title="Individualized Learning Progress"
                  description="Learno represents each subject as a distinct realm, progressing at its own pace based on individual learning patterns. This approach emphasizes personalized growth rather than uniform advancement."
                  videoSrc="/learno-universe-dashboard.mp4"
                  layout="right"
                  testId="video-feature-progress"
                />

                <FeatureCard
                  label="Learno Universe"
                  title="World Overview & Learning Snapshot"
                  description="A world-level overview provides a consolidated snapshot of learning activity, progress distribution, and relative standing. This view encourages reflection and long-term engagement without overemphasizing competition."
                  videoSrc="/learno-universe-overview.mp4"
                  layout="left"
                  testId="video-feature-overview"
                />

                <FeatureCard
                  label="Learno Universe"
                  title="Subject-Based Realm Organization"
                  description="Learno organizes learning into subject-based realms, each encompassing its related disciplines and content areas. This structure maintains clarity across subjects while supporting seamless navigation within the learning ecosystem."
                  videoSrc="/learno-universe-realms.mp4"
                  layout="right"
                  testId="video-feature-realms"
                />
              </div>

              {/* ——— Feature 1: Personalized Avatars ——— */}
              <div className="space-y-20 md:space-y-28">
                <RevealSection>
                  <p className="text-xs tracking-widest uppercase font-medium border-b pb-4" style={{ color: COLORS.textLight, borderColor: COLORS.border }}>Feature 1: Personalized Avatars & Learning Communities</p>
                </RevealSection>

                <FeatureCard
                  label="Personalized Avatars"
                  title="Expressive Character System"
                  description="Learno introduces an expressive character system with varied appearances, outfits, and scales. These visual variations help learners form emotional connections while reinforcing individuality and engagement within the learning experience."
                  videoSrc="/learno-char-customized.mp4"
                  layout="left"
                  testId="video-feature-characters"
                />

                <FeatureCard
                  label="Personalized Avatars"
                  title="Personalized Avatar Customization"
                  description="Learno allows learners to customize their own characters through personalization settings. By enabling choice in appearance and expression, the system fosters a sense of ownership and identity from the start of the learning journey."
                  videoSrc="/learno-ai-customized.mp4"
                  layout="right"
                  testId="video-feature-avatar"
                />

                <FeatureCard
                  label="Learning Communities"
                  title="Learning Community in a Shared 3D World"
                  description="Learno extends learning into a shared 3D world where individual learners coexist within a broader community. This environment reinforces a sense of belonging and shared progress while maintaining each learner's personalized journey."
                  videoSrc="/learno-community.mp4"
                  layout="left"
                  testId="video-feature-community"
                />
              </div>

              {/* ——— Feature 2: Emotionally Aligned ——— */}
              <div className="space-y-20 md:space-y-28">
                <RevealSection>
                  <p className="text-xs tracking-widest uppercase font-medium border-b pb-4" style={{ color: COLORS.textLight, borderColor: COLORS.border }}>Feature 2: Emotionally & Personality-Aligned</p>
                </RevealSection>

                <FeatureCard
                  label="AI Companions"
                  title="AI Tutors That Adapt to You"
                  description="Learno offers emotionally and personality-aligned AI tutors, each designed with distinct interaction styles, tones, and behavioral archetypes. These tutors adapt to students' learning rhythms and emotional states, providing guidance that is supportive, relatable, and human-centered."
                  videoSrc="/learno-ai-therapy.mp4"
                  layout="right"
                  testId="video-feature-tutors"
                />
              </div>

              {/* ——— Feature 3: AI Adaptive Learning ——— */}
              <div className="space-y-20 md:space-y-28">
                <RevealSection>
                  <p className="text-xs tracking-widest uppercase font-medium border-b pb-4" style={{ color: COLORS.textLight, borderColor: COLORS.border }}>Feature 3: AI Adaptive Learning Journey</p>
                </RevealSection>

                <FeatureCard
                  label="Adaptive Learning"
                  title="AI-Tailored Holistic Study Journey"
                  description="Learno organizes learning content into an AI-tailored, holistic study journey that clearly structures subjects, lessons, and progression. This approach helps learners understand their path toward mastery while reducing cognitive overload and supporting sustained engagement."
                  videoSrc="/learno-ai-study.mp4"
                  layout="left"
                  testId="video-feature-study"
                />
              </div>

              {/* ——— Full-bleed VR Scene ——— */}
              <RevealSection direction="scale">
                <div className="full-bleed-learno overflow-hidden">
                  <img src="/learno-vr.jpg" alt="LEARNO — Immersive VR learning with AI companion" className="w-full h-auto" data-testid="img-vr-scene" />
                </div>
              </RevealSection>

              {/* ——— Closing — Characters + Logo ——— */}
              <RevealSection direction="scale">
                <div className="full-bleed-learno overflow-hidden">
                  <img src="/learno-characters.png" alt="LEARNO character collection" className="w-full h-auto" data-testid="img-characters" />
                </div>
              </RevealSection>

              <RevealSection direction="scale">
                <div className="flex flex-col items-center gap-4 md:gap-5 py-16 md:py-28 text-center">
                  <img src="/assets/images/project-learno.png" alt="LEARNO Logo" className="h-10 md:h-14" data-testid="img-logo" />
                  <p className="text-xs md:text-sm tracking-widest uppercase" style={{ color: COLORS.textLight }}>
                    The gamified knowledge realms ecosystem designed for K1–K12
                  </p>
                </div>
              </RevealSection>

            </div>
          </div>
        </main>

        <footer style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: '80px', padding: '48px 0' }}>
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
