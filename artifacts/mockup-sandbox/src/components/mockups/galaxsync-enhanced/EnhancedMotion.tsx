import { useState, useEffect, useRef, useCallback } from "react";

function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      setOffset((center - viewCenter) * speed);
    };
    const container = document.querySelector('.galaxsync-scroll-root');
    if (container) container.addEventListener('scroll', handleScroll, { passive: true });
    return () => { if (container) container.removeEventListener('scroll', handleScroll); };
  }, [speed]);
  return { ref, offset };
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.querySelector('.galaxsync-scroll-root');
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold, root: root as Element | null }
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

function StaggerChildren({ children, className = "", staggerMs = 120 }: { children: React.ReactNode; className?: string; staggerMs?: number }) {
  const { ref, isVisible } = useReveal(0.1);
  const items = Array.isArray(children) ? children : [children];
  return (
    <div ref={ref} className={className}>
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "none" : "translateY(40px)",
            transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * staggerMs}ms`,
          }}
        >
          {child}
        </div>
      ))}
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

function CountUp({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const { ref, isVisible } = useReveal(0.3);
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);
  return <span ref={ref as any}>{value}{suffix}</span>;
}

export default function EnhancedMotion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const elderVideoRef = useRef<HTMLVideoElement>(null);
  const elderVideo2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const docHeight = container.scrollHeight - container.clientHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    let observers: IntersectionObserver[] = [];
    const setupObserver = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const observer = new IntersectionObserver(
        ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
        { threshold: 0.2, root }
      );
      observer.observe(video);
      observers.push(observer);
    };
    const timer = setTimeout(() => {
      setupObserver(elderVideoRef.current);
      setupObserver(elderVideo2Ref.current);
    }, 500);
    return () => { clearTimeout(timer); observers.forEach(o => o.disconnect()); };
  }, []);

  return (
    <div
      ref={scrollRef}
      className="galaxsync-scroll-root"
      style={{
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        backgroundColor: "#FEF5E4",
        fontFamily: "'Nunito', sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700;800&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes orbit-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 200, 120, 0.15); }
          50% { box-shadow: 0 0 40px rgba(255, 200, 120, 0.3); }
        }
        @keyframes text-reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }
        .shimmer-line {
          background: linear-gradient(90deg, transparent 0%, rgba(255,200,120,0.08) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
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
        .step-number {
          font-size: 12rem;
          font-weight: 800;
          opacity: 0.04;
          position: absolute;
          right: -20px;
          top: -40px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .glass-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(86, 61, 51, 0.15), transparent);
        }
        .ipad-glow {
          animation: pulse-glow 4s ease-in-out infinite;
          border-radius: 24px;
        }
        .hover-lift {
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(86, 61, 51, 0.12);
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(86,61,51,0.15); border-radius: 4px; }
      `}</style>

      <div className="film-grain" />

      {/* Scroll-based background planets */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <img src="/__mockup/images/planet-nature.png" alt="" style={{
          position: 'absolute', width: '550px', right: '-5%', top: '5%',
          opacity: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-5deg)',
          filter: 'blur(1px)',
        }} />
        <img src="/__mockup/images/planet-tale.png" alt="" style={{
          position: 'absolute', width: '480px', left: '-3%', bottom: '8%',
          opacity: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(5deg)',
          filter: 'blur(1px)',
        }} />
        <img src="/__mockup/images/planet-logic.png" alt="" style={{
          position: 'absolute', width: '600px', right: '-5%', bottom: '5%',
          opacity: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 'scale(1)' : 'scale(0.85)',
          filter: 'blur(1px)',
        }} />
        <img src="/__mockup/images/planet-mind.png" alt="" style={{
          position: 'absolute', width: '500px', left: '-3%', top: '12%',
          opacity: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 'scale(1)' : 'scale(0.85)',
          filter: 'blur(1px)',
        }} />
        <img src="/__mockup/images/planet-nature.png" alt="" style={{
          position: 'absolute', width: '450px', left: '-5%', top: '10%',
          opacity: scrollProgress >= 0.65 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(1px)',
        }} />
        <img src="/__mockup/images/planet-tale.png" alt="" style={{
          position: 'absolute', width: '550px', right: '-5%', bottom: '12%',
          opacity: scrollProgress >= 0.65 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(1px)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50, padding: '16px 0',
          backgroundColor: 'rgba(254, 245, 228, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(86, 61, 51, 0.06)',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', cursor: 'pointer' }}>Ruhaus</span>
            <nav style={{ display: 'flex', gap: '32px', fontSize: '14px', fontWeight: 500, opacity: 0.5 }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>About</a>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>

            {/* Hero Section */}
            <RevealSection direction="scale">
              <div style={{ overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
                <img
                  src="/__mockup/images/galaxsync-hero.jpg"
                  alt="Galaxsync Hero"
                  style={{
                    width: '100%', height: 'auto', objectFit: 'contain',
                    transition: 'transform 8s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: scrollProgress > 0.02 ? 'scale(1.03)' : 'scale(1)',
                  }}
                />
              </div>
              <div style={{ maxWidth: '720px', marginTop: '40px' }}>
                <RevealSection delay={200}>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: '16px', lineHeight: 1.1 }}>Galaxsync</h1>
                </RevealSection>
                <RevealSection delay={400}>
                  <p style={{ fontSize: '1.1rem', color: '#888', lineHeight: 1.7, marginBottom: '24px' }}>
                    A reciprocal AI-driven VR-integrated care ecosystem connecting generations through shared stories and meaningful interaction.
                  </p>
                </RevealSection>
                <RevealSection delay={600}>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {["Reciprocal AI-VR Ecosystem", "ADHD", "Elders"].map(tag => (
                      <span key={tag} style={{
                        fontSize: '11px', letterSpacing: '0.08em', padding: '8px 16px',
                        border: '1px solid rgba(0,0,0,0.1)', borderRadius: '999px',
                        color: '#999', fontWeight: 700, textTransform: 'uppercase',
                      }}>{tag}</span>
                    ))}
                  </div>
                </RevealSection>
              </div>
            </RevealSection>

            {/* Problem Section - Apple Style */}
            <div style={{ padding: '48px 0 80px' }}>
              <RevealSection>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 300, marginBottom: '16px', letterSpacing: '-0.02em', color: '#563D33' }}>The Disconnect.</h2>
                  <p style={{ fontSize: '1.4rem', color: 'rgba(86,61,51,0.6)', maxWidth: '640px', margin: '0 auto' }}>Bridging the gap between two isolated generations.</p>
                </div>
              </RevealSection>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <RevealSection delay={100} direction="left">
                  <MagneticCard
                    className="hover-lift"
                    style={{
                      padding: '40px', borderRadius: '2.5rem', backgroundColor: '#FFECBD', color: '#563D33',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      cursor: 'default', boxShadow: '0 25px 50px -12px rgba(86,61,51,0.15)', height: '100%',
                    }}
                  >
                    <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 0 0 6px rgba(255,255,255,0.3)' }}>
                      <img src="/__mockup/images/elder-avatar.png" alt="Elder" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '16px' }}>Elders</h3>
                    <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(86,61,51,0.75)', marginBottom: '32px' }}>
                      Experiencing memory decline and severe social isolation, leading to an exacerbated sense of worthlessness.
                    </p>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 700, color: '#563D33', marginBottom: '4px' }}><CountUp end={43} suffix="%" /></div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(86,61,51,0.5)' }}>Feel socially isolated</div>
                    </div>
                  </MagneticCard>
                </RevealSection>

                <RevealSection delay={300} direction="right">
                  <MagneticCard
                    className="hover-lift"
                    style={{
                      padding: '40px', borderRadius: '2.5rem', backgroundColor: '#563D33', color: '#FFECBD',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      cursor: 'default', boxShadow: '0 25px 50px -12px rgba(86,61,51,0.3)', height: '100%',
                    }}
                  >
                    <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', marginBottom: '32px', boxShadow: '0 0 0 6px rgba(255,236,189,0.1)' }}>
                      <img src="/__mockup/images/child-avatar-new.png" alt="Child" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '2rem', marginBottom: '16px', color: '#FFECBD' }}>ADHD Children</h3>
                    <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(255,236,189,0.75)', marginBottom: '32px' }}>
                      Struggling with focus and social skills, finding traditional therapy methods unengaging and ineffective.
                    </p>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontSize: '3rem', fontWeight: 700, color: '#FFECBD', marginBottom: '4px' }}><CountUp end={6} suffix="M+" /></div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,236,189,0.5)' }}>Children diagnosed</div>
                    </div>
                  </MagneticCard>
                </RevealSection>
              </div>
            </div>

            {/* Solution - Apple Style */}
            <div style={{
              padding: '80px 0', backgroundColor: 'white',
              marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)',
              paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)',
            }}>
              <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                <RevealSection>
                  <h2 style={{ fontSize: '3.5rem', fontFamily: "'Georgia', serif", color: '#563D33', lineHeight: 1.15, marginBottom: '40px' }}>
                    This changes <br /><span style={{ fontStyle: 'italic' }}>everything.</span>
                  </h2>
                </RevealSection>
                <RevealSection delay={200}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 300, lineHeight: 1.6, color: 'rgba(86,61,51,0.6)', maxWidth: '800px', margin: '0 auto' }}>
                    We connect elder wisdom with childhood wonder. Through AI and VR, memories aren't just preserved — they become interactive worlds for ADHD therapy.
                  </p>
                </RevealSection>
              </div>
            </div>

            {/* How It Works */}
            <div>
              <RevealSection>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '16px' }}>How It Works</h2>
              </RevealSection>

              {/* Step 1 */}
              <RevealSection>
                <div style={{ paddingTop: 0, paddingBottom: '32px', position: 'relative' }}>
                  <span className="step-number" style={{ color: '#563D33' }}>01</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <img src="/__mockup/images/elder-avatar.png" alt="Elder" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Step 1 · Elders</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>Digital Assets Curator</h3>
                  <p style={{ color: '#777', marginBottom: '32px', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px' }}>
                    Elders preserve real-life memories as digital assets, which are processed by AI into interactive story-based games for intergenerational engagement.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div className="ipad-glow" style={{ position: 'relative', width: '100%', maxWidth: '896px' }}>
                        <img src="/__mockup/images/ipad-constellation.png" alt="iPad frame" style={{ width: '100%', position: 'relative', zIndex: 20, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video ref={elderVideo2Ref} src="/__mockup/images/elder-digital-assets.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>

              {/* Steps 2-5: ADHD dark section */}
              <div style={{
                backgroundColor: '#563D33', overflow: 'hidden', padding: '16px 0', position: 'relative',
                marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)',
                paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)',
              }}>
                {/* Step 2 */}
                <RevealSection>
                  <div style={{ padding: '16px 16px 32px', position: 'relative', zIndex: 10 }}>
                    <span className="step-number" style={{ color: 'rgba(255,236,189,0.06)' }}>02</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <img src="/__mockup/images/child-avatar.png" alt="Child" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,236,189,0.5)' }}>Step 2 · ADHD Children</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>Game-Based The Six-Realm VR Experience Galaxy</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', marginBottom: '32px', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px' }}>
                      Elders' diverse life stories collectively generate the entire Galaxsync Galaxy. This VR universe features six cognitive realms, each representing a wide range of narratives, ensuring every ADHD child can discover stories that spark their unique interests.
                    </p>

                    {/* Planets Row 1 */}
                    <StaggerChildren className="" staggerMs={150}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '16px' }}>
                        {[
                          { src: '/__mockup/images/planet-art-craft.png', name: 'Art & Craft', dur: '3.5s', del: '0s', hasSubs: true },
                          { src: '/__mockup/images/planet-life-nature.png', name: 'Life & Nature', dur: '4.2s', del: '0.8s', hasSubs: false },
                          { src: '/__mockup/images/planet-logic-science.png', name: 'Logic & Science', dur: '3.8s', del: '1.5s', hasSubs: false },
                        ].map(p => (
                          <div key={p.name} className="group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}>
                            <div style={{ position: 'relative', transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                              <img src={p.src} alt={p.name} style={{
                                width: '200px', height: '200px', objectFit: 'contain',
                                filter: 'drop-shadow(0 4px 20px rgba(255,200,100,0.2))',
                                animation: `float ${p.dur} ease-in-out ${p.del} infinite`,
                                transition: 'filter 0.5s, transform 0.5s',
                              }} />
                              {p.hasSubs && [
                                { src: '/__mockup/images/artcraft-sub1.png', angle: 150 },
                                { src: '/__mockup/images/artcraft-sub2.png', angle: 180 },
                                { src: '/__mockup/images/artcraft-sub3.png', angle: 210 },
                                { src: '/__mockup/images/artcraft-sub4.png', angle: 330 },
                                { src: '/__mockup/images/artcraft-sub5.png', angle: 0 },
                                { src: '/__mockup/images/artcraft-sub6.png', angle: 30 },
                              ].map((sub, i) => {
                                const rad = (sub.angle * Math.PI) / 180;
                                const radius = 120;
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;
                                return (
                                  <div key={i} style={{
                                    position: 'absolute', left: '50%', top: '50%', zIndex: 20,
                                    opacity: 0, transition: 'opacity 0.5s',
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                  }}>
                                    <img src={sub.src} alt="" style={{
                                      width: '48px', height: '48px', objectFit: 'contain',
                                      animation: `orbit-float 3s ease-in-out infinite ${i * 0.4}s`,
                                    }} />
                                  </div>
                                );
                              })}
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,236,189,0.6)' }}>{p.name}</span>
                          </div>
                        ))}
                      </div>
                      {/* Row 2 */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                        {[
                          { src: '/__mockup/images/planet-skills-growth.png', name: 'Skills & Growth', dur: '4.5s', del: '0.5s' },
                          { src: '/__mockup/images/planet-myths-tales.png', name: 'Myths & Tales', dur: '3.2s', del: '1.2s' },
                          { src: '/__mockup/images/planet-heart-mind.png', name: 'Heart & Mind', dur: '4s', del: '2s' },
                        ].map(p => (
                          <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <img src={p.src} alt={p.name} style={{
                              width: '200px', height: '200px', objectFit: 'contain',
                              filter: 'drop-shadow(0 4px 20px rgba(255,200,100,0.2))',
                              animation: `float ${p.dur} ease-in-out ${p.del} infinite`,
                            }} />
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,236,189,0.6)' }}>{p.name}</span>
                          </div>
                        ))}
                      </div>
                    </StaggerChildren>
                  </div>
                </RevealSection>

                <div className="glass-divider" style={{ margin: '0 32px' }} />

                {/* Step 3 */}
                <RevealSection>
                  <div style={{ padding: '16px 16px 32px', position: 'relative', zIndex: 10 }}>
                    <span className="step-number" style={{ color: 'rgba(255,236,189,0.06)' }}>03</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <img src="/__mockup/images/child-avatar.png" alt="Child" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,236,189,0.5)' }}>Step 3 · ADHD Children</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>Example: Dunhuang Planet – The Cosmic Mentor</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      Take the Dunhuang Planet as an example. Here, seniors are not only the creators of the stories but also serve as "Cosmic Mentors."
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                        <img src="/__mockup/images/step3-gif1-opt.gif" alt="Dunhuang Planet Gameplay" style={{ width: '100%', maxWidth: '896px', borderRadius: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} />
                      </div>
                    </RevealSection>
                    <p style={{ color: 'rgba(255,236,189,0.7)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      Through real-time communication and gentle in-world check-ins, they offer encouragement, guidance, and emotional support to the child explorers.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/__mockup/images/step3-gif2-opt.gif" alt="Cosmic Mentor Interaction" style={{ width: '100%', maxWidth: '896px', borderRadius: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>

                <div className="glass-divider" style={{ margin: '0 32px' }} />

                {/* Step 4 */}
                <RevealSection>
                  <div style={{ padding: '16px 16px 32px', position: 'relative', zIndex: 10 }}>
                    <span className="step-number" style={{ color: 'rgba(255,236,189,0.06)' }}>04</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <img src="/__mockup/images/child-avatar.png" alt="Child" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,236,189,0.5)' }}>Step 4 · ADHD Children</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>Precision Biometric Guidance</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      Galaxsync utilizes eye-monitoring technology to detect distraction in real-time. When the child's attention begins to drift, the environment responds with a brief, calming interaction that supports a natural return to focus.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/__mockup/images/step3-gif3-opt.gif" alt="Biometric Guidance" style={{ width: '100%', maxWidth: '896px', borderRadius: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>

                <div className="glass-divider" style={{ margin: '0 32px' }} />

                {/* Step 5 */}
                <RevealSection>
                  <div style={{ padding: '16px 16px 32px', position: 'relative', zIndex: 10 }}>
                    <span className="step-number" style={{ color: 'rgba(255,236,189,0.06)' }}>05</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <img src="/__mockup/images/child-avatar.png" alt="Child" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,236,189,0.5)' }}>Step 5 · ADHD Children</span>
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>The Story Echo</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', marginBottom: '24px', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      After kids finish the stories, through story echo, we replace traditional scores with world-centric digital rewards, where the environment visibly heals and blooms, to validate their impact and build lasting confidence.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/__mockup/images/step5-gif4-opt.gif" alt="Story Echo Rewards" style={{ width: '100%', maxWidth: '896px', borderRadius: '16px', boxShadow: '0 12px 48px rgba(0,0,0,0.3)' }} />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>
              </div>

              {/* Step 6 */}
              <RevealSection>
                <div style={{ padding: '32px 0', position: 'relative' }}>
                  <span className="step-number" style={{ color: '#563D33' }}>06</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <img src="/__mockup/images/elder-avatar.png" alt="Elder" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Step 6 · Elders</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>My Constellation</h3>
                  <p style={{ color: '#777', marginBottom: '32px', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px' }}>
                    Elders review story planets showing ADHD child interactions. Each session layers child's data onto the narrative, creating a co-created living memory legacy for future generations.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div className="ipad-glow" style={{ position: 'relative', width: '100%', maxWidth: '896px' }}>
                        <img src="/__mockup/images/ipad-constellation.png" alt="iPad frame" style={{ width: '100%', position: 'relative', zIndex: 20, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video ref={elderVideoRef} src="/__mockup/images/elder-recording.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>

              {/* Step 7 */}
              <RevealSection>
                <div style={{ padding: '32px 0', position: 'relative' }}>
                  <span className="step-number" style={{ color: '#563D33' }}>07</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <img src="/__mockup/images/elder-avatar.png" alt="Elder" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999' }}>Step 7 · Elders</span>
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>Profile & Dashboard</h3>
                  <p style={{ color: '#777', marginBottom: '32px', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px' }}>
                    Elders can view dynamic summaries of each child's exploration—their highlights, progress, and moments of achievement. Every insight reaffirms how their guidance nurtures growth, turning mentorship into a tangible sense of purpose and impact.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div className="ipad-glow" style={{ position: 'relative', width: '100%', maxWidth: '896px' }}>
                        <img src="/__mockup/images/ipad-constellation.png" alt="iPad frame" style={{ width: '100%', position: 'relative', zIndex: 20, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video src="/__mockup/images/elder-dashboard.mp4" autoPlay muted loop playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '14px' }} />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>
            </div>

            {/* Impact Section */}
            <div>
              <RevealSection>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '32px' }}>Impact</h2>
              </RevealSection>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
                <RevealSection delay={0}>
                  <MagneticCard className="hover-lift" style={{
                    padding: '32px', borderRadius: '16px', backgroundColor: '#563D33',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  }}>
                    <img src="/__mockup/images/elder-avatar.png" alt="Elder" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>Reduced Isolation</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      Sharing stories gives elders purpose and connection, transforming memories into meaningful contribution and intergenerational bonds.
                    </p>
                  </MagneticCard>
                </RevealSection>

                <RevealSection delay={150}>
                  <MagneticCard className="hover-lift" style={{
                    padding: '32px', borderRadius: '16px', backgroundColor: '#FFECBD',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  }}>
                    <img src="/__mockup/images/planet-heart-mind-crop.png" alt="Connection" style={{ width: '120px', height: '120px', objectFit: 'contain', marginBottom: '20px' }} />
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px' }}>Meaningful Connection</h3>
                    <p style={{ color: 'rgba(86,61,51,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      Children and elders co-create stories together, building emotional bonds across generations and creating shared narratives of growth.
                    </p>
                  </MagneticCard>
                </RevealSection>

                <RevealSection delay={300}>
                  <MagneticCard className="hover-lift" style={{
                    padding: '32px', borderRadius: '16px', backgroundColor: '#563D33',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  }}>
                    <img src="/__mockup/images/child-avatar-new.png" alt="Child" style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '20px' }} />
                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '12px', color: 'rgba(255,250,240,0.95)' }}>ADHD Growth Reflection</h3>
                    <p style={{ color: 'rgba(255,236,189,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                      Children's choices and focus patterns become part of the evolving narrative world, showing measurable growth and meaningful progress.
                    </p>
                  </MagneticCard>
                </RevealSection>
              </div>
            </div>

            {/* Footer logos */}
            <RevealSection direction="scale">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '64px', marginTop: '80px', marginBottom: '40px' }}>
                <img src="/__mockup/images/sub-planets-grid.png" alt="Story Sub-Planets" style={{
                  width: '100%', maxWidth: '480px',
                  filter: 'drop-shadow(0 0 30px rgba(255, 200, 120, 0.25))',
                }} />
                <img src="/__mockup/images/galaxsync-logo-detail.png" alt="Galaxsync Logo" style={{ width: '200px' }} />
              </div>
            </RevealSection>
          </div>
        </main>

        <footer style={{
          borderTop: '1px solid rgba(0,0,0,0.06)', marginTop: '80px', padding: '48px 0',
        }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.5, fontSize: '14px' }}>
            <p>&copy; {new Date().getFullYear()} Ruhaus Studio. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '24px', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>TWITTER</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>DRIBBBLE</a>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>CONTACT</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}