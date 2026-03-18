import { useLocation } from "wouter";
import { useState, useEffect, useRef, useCallback } from "react";

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

function MagneticCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(800px) rotateX(0) rotateY(0)");
  const handleMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`);
  }, []);
  const handleLeave = useCallback(() => {
    setTransform("perspective(800px) rotateX(0) rotateY(0) scale(1)");
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform, transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)", willChange: "transform" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}

function PhoneCarousel({ phones }: { phones: { src: string; label: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const itemWidth = el.scrollWidth / phones.length;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(idx, phones.length - 1));
  }, [phones.length]);

  const scrollTo = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const itemWidth = scrollRef.current.scrollWidth / phones.length;
    scrollRef.current.scrollTo({ left: itemWidth * index, behavior: 'smooth' });
    setActiveIndex(index);
  }, [phones.length]);

  return (
    <div>
      <style>{`
        .phone-carousel::-webkit-scrollbar { display: none; }
        .phone-item { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .phone-item:hover { transform: scale(1.12); z-index: 10; }
      `}</style>
      <div
        ref={scrollRef}
        className="phone-carousel flex gap-10 md:gap-14 px-8 md:px-16 overflow-x-auto"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory', paddingTop: '24px', paddingBottom: '24px' }}
        onScroll={handleScroll}
      >
        {phones.map((phone, i) => (
          <div
            key={i}
            className="phone-item flex flex-col items-center gap-3 flex-shrink-0"
            style={{ width: '260px', scrollSnapAlign: 'center' }}
          >
            <img
              src={phone.src}
              alt={phone.label}
              className="w-full h-auto"
              data-testid={`img-phone-${i}`}
            />
            <span className="text-[10px] md:text-xs text-center font-medium whitespace-nowrap" style={{ color: 'rgba(26,58,74,0.5)' }}>{phone.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-full" style={{ backgroundColor: 'rgba(26,58,74,0.06)' }}>
          {phones.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="transition-all duration-300 rounded-full cursor-pointer"
              style={{
                width: activeIndex === i ? '28px' : '8px',
                height: '8px',
                backgroundColor: activeIndex === i ? '#5BA4D9' : 'rgba(26,58,74,0.2)',
                border: activeIndex === i ? '2px solid #5BA4D9' : 'none',
              }}
              data-testid={`dot-phone-${i}`}
            />
          ))}
        </div>
      </div>
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

export default function SomaDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const heroParallax = useScrollParallax();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const phoneImages = [
    { src: "/soma-phone-waiting-trimmed.png", label: "Waiting to Connect" },
    { src: "/soma-phone-steady-trimmed.png", label: "Steady & At Ease" },
    { src: "/soma-phone-unsettled-trimmed.png", label: "Unsettled" },
    { src: "/soma-phone-overwhelmed-trimmed.png", label: "Overwhelmed" },
    { src: "/soma-phone-balance-trimmed.png", label: "Returning to Balance" },
  ];

  const heroScale = 1 + heroParallax.progress * 0.08;

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: '#EFF4FB', fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        .film-grain::before {
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
        .hover-lift {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 50, 80, 0.1);
        }
        .full-bleed-video {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-right: calc(-50vw + 50%);
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .phone-card {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        }
        .phone-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 30px 80px rgba(0, 50, 80, 0.15);
        }
      `}</style>

      <div className="film-grain" />

      <div className="relative z-10">
        <header className="sticky top-0 z-50 py-4" style={{
          backgroundColor: 'rgba(239, 244, 251, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(0, 50, 80, 0.06)',
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

          {/* 1. Hero — Parallax zoom on scroll */}
          <div ref={heroParallax.ref} className="overflow-hidden" style={{ width: '100vw' }}>
            <RevealSection direction="scale">
              <div className="overflow-hidden">
                <img
                  src="/soma-hero.jpg"
                  alt="Soma Hero"
                  className="w-full h-auto object-cover"
                  data-testid="img-hero"
                  style={{ transform: `scale(${heroScale})`, transition: 'transform 0.1s linear', transformOrigin: 'center center' }}
                />
              </div>
            </RevealSection>
          </div>

          <div className="max-w-7xl mx-auto px-6">
            <div className="space-y-16 md:space-y-20">

              <div className="max-w-4xl mx-auto space-y-4 text-center pt-12 md:pt-16">
                <RevealSection delay={200}>
                  <h1 className="text-3xl md:text-5xl font-semibold playground-heading" data-testid="text-title" style={{ color: '#1a3a4a' }}>Soma</h1>
                </RevealSection>
                <RevealSection delay={400}>
                  <p className="text-base md:text-xl leading-relaxed whitespace-nowrap" data-testid="text-subtitle" style={{ color: 'rgba(26,58,74,0.6)' }}>
                    An AI wearable ecosystem addressing self co-regulation in autism education.
                  </p>
                </RevealSection>
                <RevealSection delay={600}>
                  <div className="flex gap-2 flex-wrap pt-4 justify-center" data-testid="tags-container">
                    {["AI Wearable Ecosystem", "Smart Phone", "ASD"].map(tag => (
                      <span key={tag} className="text-xs tracking-wider py-2 px-4 border rounded-full font-bold uppercase" style={{ borderColor: 'rgba(26,58,74,0.15)', color: 'rgba(26,58,74,0.4)' }}>{tag}</span>
                    ))}
                  </div>
                </RevealSection>
              </div>

              {/* 2 & 3. Current Challenges */}
              <div className="py-12 md:py-20" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
                <RevealSection>
                  <div className="text-center mb-12 md:mb-20">
                    <h2 className="text-4xl md:text-6xl font-light mb-4 md:mb-6" style={{ letterSpacing: '-0.02em', color: '#1a3a4a' }}>Current Challenges</h2>
                  </div>
                </RevealSection>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                  <RevealSection delay={100} direction="left">
                    <MagneticCard className="h-full" style={{ display: 'flex', flexDirection: 'column', cursor: 'default' }}>
                      <div className="overflow-hidden rounded-2xl">
                        <img src="/soma-children-challenge.jpg" alt="Children regulation challenge" className="w-full object-cover transition-transform duration-700 hover:scale-105" style={{ aspectRatio: '4/3' }} data-testid="img-children-challenge" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-4" style={{ color: '#1a3a4a' }}>Autism Children Regulation Challenge</h3>
                      <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'rgba(26,58,74,0.6)' }}>
                        Autism is not a behavior problem. It is often a 1-to-1 aid intensive problem. Most autistic children attend mainstream schools. Emotional regulation is a daily concern. Physiological signals change first.
                      </p>
                    </MagneticCard>
                  </RevealSection>

                  <RevealSection delay={300} direction="right">
                    <MagneticCard className="h-full" style={{ display: 'flex', flexDirection: 'column', cursor: 'default' }}>
                      <div className="overflow-hidden rounded-2xl">
                        <img src="/soma-teacher-challenge.jpg" alt="Teacher's limited attention" className="w-full object-cover transition-transform duration-700 hover:scale-105" style={{ aspectRatio: '4/3' }} data-testid="img-teacher-challenge" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mt-6 mb-4" style={{ color: '#1a3a4a' }}>Teacher's Limited Attention</h3>
                      <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'rgba(26,58,74,0.6)' }}>
                        Teachers rely on experience and constant attention. 1 teacher, 20–30 students. And the harder part is not knowing if support is needed.
                      </p>
                    </MagneticCard>
                  </RevealSection>
                </div>

                <RevealSection delay={400}>
                  <div className="text-center mt-20 md:mt-32 mb-4">
                    <p className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-snug" style={{ color: 'rgba(26,58,74,0.45)' }}>
                      <span style={{ display: 'inline-block', opacity: 0.6 }}>"</span>What if regulation could begin<br />before escalation?<span style={{ display: 'inline-block', opacity: 0.6 }}>"</span>
                    </p>
                  </div>
                </RevealSection>
              </div>

              {/* 4. Innovation — Introduce Soma */}
              <div className="py-16 md:py-32" style={{ backgroundColor: 'white', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
                <div className="max-w-6xl mx-auto text-center">
                  <RevealSection>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 md:mb-12" style={{ fontFamily: "'Georgia', serif", color: '#1a3a4a' }}>
                      Introducing <br /><span className="italic">Soma</span>
                    </h2>
                  </RevealSection>
                  <RevealSection delay={200}>
                    <p className="text-lg md:text-2xl font-light leading-relaxed whitespace-nowrap mb-16" style={{ color: 'rgba(26,58,74,0.6)' }}>
                      An AI-wearable ecosystem addressing self co-regulation in autism education.
                    </p>
                  </RevealSection>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <RevealSection delay={200}>
                      <div className="flex flex-col items-center gap-5">
                        <img src="/soma-patch-image.jpg" alt="Soma Patch" className="w-full rounded-3xl object-cover" style={{ aspectRatio: '1/1' }} data-testid="img-patch-intro" />
                        <p className="text-sm md:text-base font-medium" style={{ color: 'rgba(26,58,74,0.7)' }}>A patch that senses early shifts</p>
                      </div>
                    </RevealSection>
                    <RevealSection delay={400}>
                      <div className="flex flex-col items-center gap-5">
                        <img src="/soma-ring-image.jpg" alt="Soma Ring" className="w-full rounded-3xl object-cover" style={{ aspectRatio: '1/1' }} data-testid="img-ring-intro" />
                        <p className="text-sm md:text-base font-medium" style={{ color: 'rgba(26,58,74,0.7)' }}>A ring that translates insight into action</p>
                      </div>
                    </RevealSection>
                    <RevealSection delay={600}>
                      <div className="flex flex-col items-center gap-5">
                        <img src="/soma-app-image.jpg" alt="Soma App" className="w-full rounded-3xl object-cover" style={{ aspectRatio: '1/1' }} data-testid="img-app-intro" />
                        <p className="text-sm md:text-base font-medium" style={{ color: 'rgba(26,58,74,0.7)' }}>An app that learns patterns</p>
                      </div>
                    </RevealSection>
                  </div>
                </div>
              </div>

              {/* 5. Soma Patch — Full-bleed Video */}
              <div className="space-y-6">
                <RevealSection>
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-4xl md:text-6xl font-bold" style={{ color: '#1a3a4a' }}>Soma Patch</h2>
                  </div>
                </RevealSection>

                <RevealSection>
                  <div className="max-w-4xl mx-auto text-center mb-8">
                    <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(26,58,74,0.6)' }}>
                      A soft, skin-like patch that monitors physiological signals of stress inside the palm.<br />A flexible sensing system continuously captures biometric signals.
                    </p>
                  </div>
                </RevealSection>

                <RevealSection direction="scale" delay={200}>
                  <div className="full-bleed-video overflow-hidden">
                    <video
                      src="/soma-patch-video.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                      data-testid="video-patch"
                    />
                  </div>
                </RevealSection>
              </div>

              {/* 6. Soma Ring — Full-bleed Video */}
              <div className="space-y-6">
                <RevealSection>
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-4xl md:text-6xl font-bold" style={{ color: '#1a3a4a' }}>Soma Ring</h2>
                  </div>
                </RevealSection>

                <RevealSection>
                  <div className="max-w-4xl mx-auto text-center mb-8">
                    <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(26,58,74,0.6)' }}>
                      A wearable for intuitive co-regulation. Receives real-time biometric data.<br />Multi-modal alerts through LED and vibration. Touch-to-guide regulation — teacher and child synchronize.
                    </p>
                    <ul className="flex flex-wrap justify-center gap-3 mt-6">
                      {[
                        "Real-time biometric data",
                        "Multi-level alerts",
                        "Time constraints",
                        "Touch-to-guide",
                        "Teacher-child sync",
                      ].map((item, i) => (
                        <RevealSection key={i} delay={200 + i * 80}>
                          <li className="flex items-center gap-2 text-xs md:text-sm px-4 py-2 rounded-full" style={{ color: 'rgba(26,58,74,0.6)', backgroundColor: 'rgba(91,164,217,0.08)' }}>
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#5BA4D9' }} />
                            {item}
                          </li>
                        </RevealSection>
                      ))}
                    </ul>
                  </div>
                </RevealSection>

                <RevealSection direction="scale" delay={200}>
                  <div className="full-bleed-video overflow-hidden">
                    <video
                      src="/soma-ring-video.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                      data-testid="video-ring"
                    />
                  </div>
                </RevealSection>
              </div>

              {/* Soma App */}
              <div className="space-y-6">
                {/* Feature 1 — 5 phone screenshots in one row */}
                <RevealSection>
                  <div className="py-20 md:py-32 relative" style={{ backgroundColor: 'white', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
                    <div className="max-w-6xl mx-auto">
                      <RevealSection>
                        <div className="text-center mb-16 md:mb-20">
                          <h2 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: '#1a3a4a' }}>Soma App</h2>
                          <p className="text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto" style={{ color: 'rgba(26,58,74,0.6)' }}>
                            The Soma app quietly monitors emotional patterns in the background.
                          </p>
                        </div>
                      </RevealSection>
                      <div className="text-center mb-12 md:mb-16">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(26,58,74,0.4)' }}>Feature 1</span>
                        <h3 className="text-xl md:text-2xl font-bold mt-3" style={{ color: '#1a3a4a' }}>Simplifies ASD Emotion to Practice Regulation</h3>
                      </div>
                    </div>

                    <PhoneCarousel phones={phoneImages} />
                  </div>
                </RevealSection>

                {/* Feature 2 — Video */}
                <RevealSection>
                  <div className="py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(26,58,74,0.4)' }}>Feature 2</span>
                        <h3 className="text-xl md:text-2xl font-bold mt-2" style={{ color: '#1a3a4a' }}>Co-regulation Synchronizes Activities & Suggestions</h3>
                        <p className="text-sm md:text-base font-light leading-relaxed mt-3" style={{ color: 'rgba(26,58,74,0.6)' }}>
                          Guidance appears when support is needed. Breathing guidance aligned with the child's rhythm. Or simple playful activities.
                        </p>
                      </div>
                      <RevealSection direction="scale" delay={200}>
                        <div className="rounded-2xl overflow-hidden">
                          <video
                            src="/soma-app-feature2.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto"
                            data-testid="video-feature2"
                          />
                        </div>
                      </RevealSection>
                    </div>
                  </div>
                </RevealSection>

                {/* Feature 3 — Video */}
                <RevealSection>
                  <div className="py-8 md:py-12" style={{ backgroundColor: 'white', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
                    <div className="max-w-7xl mx-auto">
                      <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(26,58,74,0.4)' }}>Feature 3</span>
                        <h3 className="text-xl md:text-2xl font-bold mt-2" style={{ color: '#1a3a4a' }}>Personalized Learning Patterns</h3>
                        <p className="text-sm md:text-base font-light leading-relaxed mt-3" style={{ color: 'rgba(26,58,74,0.6)' }}>
                          An AI/LLM that learns which strategies work best. And builds personalized support patterns.
                        </p>
                      </div>
                      <RevealSection direction="scale" delay={200}>
                        <div className="rounded-2xl overflow-hidden">
                          <video
                            src="/soma-app-feature3.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto"
                            data-testid="video-feature3"
                          />
                        </div>
                      </RevealSection>
                    </div>
                  </div>
                </RevealSection>

                {/* Feature 4 — Video */}
                <RevealSection>
                  <div className="py-8 md:py-12">
                    <div className="max-w-7xl mx-auto px-6">
                      <div className="mb-8">
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'rgba(26,58,74,0.4)' }}>Feature 4</span>
                        <h3 className="text-xl md:text-2xl font-bold mt-2" style={{ color: '#1a3a4a' }}>Adjustable AI Wearable Setting</h3>
                        <p className="text-sm md:text-base font-light leading-relaxed mt-3" style={{ color: 'rgba(26,58,74,0.6)' }}>
                          Teachers can adjust patch and ring settings/activities.
                        </p>
                      </div>
                      <RevealSection direction="scale" delay={200}>
                        <div className="rounded-2xl overflow-hidden">
                          <video
                            src="/soma-app-feature4.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-auto"
                            data-testid="video-feature4"
                          />
                        </div>
                      </RevealSection>
                    </div>
                  </div>
                </RevealSection>
              </div>

              {/* Impact */}
              <div className="py-16 md:py-24" style={{ backgroundColor: '#1a3a4a', color: '#EFF6FA', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
                <RevealSection>
                  <h2 className="text-4xl md:text-6xl font-light text-center mb-12 md:mb-20" style={{ color: '#EFF6FA' }}>Impact</h2>
                </RevealSection>

                <RevealSection delay={200}>
                  <div className="max-w-4xl mx-auto text-center mb-16">
                    <p className="text-lg md:text-xl font-light leading-relaxed" style={{ color: 'rgba(239,246,250,0.7)' }}>
                      Soma bridges the gap between physiological distress and classroom support, empowering children to make more intuitive pairing and transitions.
                    </p>
                  </div>
                </RevealSection>

                <RevealSection direction="scale" delay={300}>
                  <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden">
                    <img src="/soma-impact.jpg" alt="Impact" className="w-full h-auto" data-testid="img-impact" />
                  </div>
                </RevealSection>
              </div>

              {/* Closing + Logo */}
              <RevealSection direction="scale">
                <div className="flex flex-col items-center gap-6 py-16 md:py-24 text-center">
                  <img src="/soma-logo-detail.png" alt="Soma Logo" className="w-48 md:w-72" data-testid="img-logo" />
                  <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(26,58,74,0.4)' }}>
                    Small signals. Gentle support. Lasting connection.
                  </p>
                </div>
              </RevealSection>
            </div>
          </div>
        </main>

        <footer style={{ borderTop: '1px solid rgba(26,58,74,0.08)', marginTop: '80px', padding: '48px 0' }}>
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