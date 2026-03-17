import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
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

export default function GalaxsyncDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const elderVideoRef = useRef<HTMLVideoElement>(null);
  const elderVideo2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let observers: IntersectionObserver[] = [];
    const setupObserver = (video: HTMLVideoElement | null) => {
      if (!video) return;
      const observer = new IntersectionObserver(
        ([entry]) => { entry.isIntersecting ? video.play().catch(() => {}) : video.pause(); },
        { threshold: 0.2 }
      );
      observer.observe(video);
      observers.push(observer);
    };
    const timer = setTimeout(() => {
      setupObserver(elderVideoRef.current);
      setupObserver(elderVideo2Ref.current);
    }, 500);
    return () => { clearTimeout(timer); observers.forEach(o => o.disconnect()); };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: '#FEF5E4', fontFamily: "'Nunito', sans-serif" }}>
      <style>{`
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
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 200, 120, 0.15); }
          50% { box-shadow: 0 0 40px rgba(255, 200, 120, 0.3); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          30% { transform: translate(3%, -15%); }
          50% { transform: translate(12%, 9%); }
          70% { transform: translate(9%, 4%); }
          90% { transform: translate(-1%, 7%); }
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
        .step-number-bg {
          font-size: 12rem;
          font-weight: 800;
          opacity: 0.04;
          position: absolute;
          right: -20px;
          top: -40px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          color: #563D33;
        }
        .step-number-bg-light {
          font-size: 12rem;
          font-weight: 800;
          opacity: 0.08;
          position: absolute;
          right: -20px;
          top: -40px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
          color: rgba(255, 236, 189, 0.5);
        }
        .glass-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
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
      `}</style>

      <div className="film-grain" />

      {/* Background planet images */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <img src="/galaxsync-galaxy.png" alt="" className="absolute" style={{
          width: '700px', right: '-80px', bottom: '-80px',
          opacity: scrollProgress < 0.15 ? 0.08 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-nature.png" alt="" className="absolute" style={{
          width: '550px', right: '-5%', top: '5%',
          opacity: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(-5deg)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-tale.png" alt="" className="absolute" style={{
          width: '480px', left: '-3%', bottom: '8%',
          opacity: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.1 && scrollProgress < 0.35 ? 'scale(1) rotate(0deg)' : 'scale(0.9) rotate(5deg)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-logic.png" alt="" className="absolute" style={{
          width: '600px', right: '-5%', bottom: '5%',
          opacity: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 'scale(1)' : 'scale(0.85)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-mind.png" alt="" className="absolute" style={{
          width: '500px', left: '-3%', top: '12%',
          opacity: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: scrollProgress >= 0.35 && scrollProgress < 0.65 ? 'scale(1)' : 'scale(0.85)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-nature.png" alt="" className="absolute" style={{
          width: '450px', left: '-5%', top: '10%',
          opacity: scrollProgress >= 0.65 ? 0.06 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(1px)',
        }} />
        <img src="/planet-tale.png" alt="" className="absolute" style={{
          width: '550px', right: '-5%', bottom: '12%',
          opacity: scrollProgress >= 0.65 ? 0.07 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'blur(1px)',
        }} />
      </div>

      <div className="relative z-10">
        {/* Header - Glassmorphism */}
        <header className="sticky top-0 z-50 py-4" style={{
          backgroundColor: 'rgba(254, 245, 228, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: '1px solid rgba(86, 61, 51, 0.06)',
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

        <main className="max-w-7xl mx-auto px-6 pb-12 md:pb-20" style={{ paddingTop: 0 }}>
          <div className="space-y-16 md:space-y-20">

            {/* Hero Section */}
            <RevealSection direction="scale">
              <div className="space-y-8">
                <div className="bg-[#F5F5F5] overflow-hidden flex items-center justify-center" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
                  <img
                    src="/galaxsync-hero.jpg"
                    alt="Galaxsync Hero"
                    className="w-full h-auto object-contain"
                    data-testid="img-hero"
                    style={{
                      transition: 'transform 8s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: scrollProgress > 0.02 ? 'scale(1.03)' : 'scale(1)',
                    }}
                  />
                </div>

                <div className="max-w-3xl space-y-4">
                  <RevealSection delay={200}>
                    <h1 className="text-2xl md:text-4xl font-semibold playground-heading" data-testid="text-title">Galaxsync</h1>
                  </RevealSection>
                  <RevealSection delay={400}>
                    <p className="text-base md:text-lg text-neutral-500 leading-relaxed" data-testid="text-subtitle">
                      A reciprocal AI-driven VR-integrated care ecosystem connecting generations through shared stories and meaningful interaction.
                    </p>
                  </RevealSection>
                  <RevealSection delay={600}>
                    <div className="flex gap-2 flex-wrap pt-4" data-testid="tags-container">
                      <span className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">Reciprocal AI-VR Ecosystem</span>
                      <span className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">ADHD</span>
                      <span className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">Elders</span>
                    </div>
                  </RevealSection>
                </div>
              </div>
            </RevealSection>

            {/* Problem Section - Apple Style */}
            <div className="py-12 md:py-20" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
              <RevealSection>
                <div className="text-center mb-12 md:mb-20">
                  <h2 className="text-4xl md:text-6xl font-light mb-4 md:mb-6" data-testid="text-problem-heading" style={{ letterSpacing: '-0.02em' }}>The Disconnect.</h2>
                  <p className="text-lg md:text-2xl max-w-3xl mx-auto" style={{ color: 'rgba(86,61,51,0.6)' }}>Bridging the gap between two isolated generations.</p>
                </div>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
                <RevealSection delay={100} direction="left">
                  <MagneticCard
                    className="hover-lift h-full"
                    style={{
                      padding: '32px', borderRadius: '2.5rem', backgroundColor: '#FFECBD', color: '#563D33',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      cursor: 'default', boxShadow: '0 25px 50px -12px rgba(86,61,51,0.15)',
                    }}
                  >
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 md:mb-8" style={{ boxShadow: '0 0 0 6px rgba(255,255,255,0.3)' }}>
                      <img src="/elder-avatar.png" alt="Elder" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5">Elders</h3>
                    <p className="text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8" style={{ color: 'rgba(86,61,51,0.75)' }}>
                      Experiencing memory decline and severe social isolation, leading to an exacerbated sense of worthlessness.
                    </p>
                    <div className="mt-auto">
                      <div className="text-4xl md:text-5xl font-bold mb-1" style={{ color: '#563D33' }}><CountUp end={43} suffix="%" /></div>
                      <div className="text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'rgba(86,61,51,0.5)' }}>Feel socially isolated</div>
                    </div>
                  </MagneticCard>
                </RevealSection>

                <RevealSection delay={300} direction="right">
                  <MagneticCard
                    className="hover-lift h-full"
                    style={{
                      padding: '32px', borderRadius: '2.5rem', backgroundColor: '#563D33', color: '#FFECBD',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                      cursor: 'default', boxShadow: '0 25px 50px -12px rgba(86,61,51,0.3)',
                    }}
                  >
                    <div className="w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden mb-6 md:mb-8" style={{ boxShadow: '0 0 0 6px rgba(255,236,189,0.1)' }}>
                      <img src="/child-avatar-new.png" alt="Child" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5 text-[#FFECBD]">ADHD Children</h3>
                    <p className="text-base md:text-lg font-light leading-relaxed mb-6 md:mb-8" style={{ color: 'rgba(255,236,189,0.75)' }}>
                      Struggling with focus and social skills, finding traditional therapy methods unengaging and ineffective.
                    </p>
                    <div className="mt-auto">
                      <div className="text-4xl md:text-5xl font-bold text-[#FFECBD] mb-1"><CountUp end={6} suffix="M+" /></div>
                      <div className="text-xs md:text-sm font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,236,189,0.5)' }}>Children diagnosed</div>
                    </div>
                  </MagneticCard>
                </RevealSection>
              </div>
            </div>

            {/* Solution - Apple Style */}
            <div className="py-16 md:py-32" style={{ backgroundColor: 'white', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
              <div className="max-w-5xl mx-auto text-center" data-testid="text-solution-heading">
                <RevealSection>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl leading-tight mb-8 md:mb-12" style={{ fontFamily: "'Georgia', serif", color: '#563D33' }}>
                    This changes <br /><span className="italic">everything.</span>
                  </h2>
                </RevealSection>
                <RevealSection delay={200}>
                  <p className="text-lg md:text-2xl lg:text-3xl font-light leading-relaxed max-w-4xl mx-auto" style={{ color: 'rgba(86,61,51,0.6)' }}>
                    We connect elder wisdom with childhood wonder. Through AI and VR, memories aren't just preserved — they become interactive worlds for ADHD therapy.
                  </p>
                </RevealSection>
              </div>
            </div>

            {/* How It Works */}
            <div className="space-y-6">
              <RevealSection>
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-4xl md:text-6xl font-bold mb-2" data-testid="text-howitworks-heading" style={{ color: '#563D33' }}>How it works.</h2>
                </div>
              </RevealSection>

              {/* Step 1 - Elders */}
              <RevealSection>
                <div className="pt-0 pb-4 md:pb-8 relative">
                  <span className="step-number-bg">01</span>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/elder-avatar.png" alt="Elder" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 1 · Elders</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-3">Digital Assets Curator</h3>
                  <p className="text-neutral-600 mb-6 md:mb-8 text-sm md:text-base">
                    Elders preserve real-life memories as digital assets, which are processed by AI into interactive story-based games for intergenerational engagement.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-4xl ipad-glow">
                        <img src="/ipad-constellation.png" alt="iPad frame" className="w-full relative z-20 pointer-events-none" />
                        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video
                            ref={elderVideo2Ref}
                            src="/elder-digital-assets.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>

              {/* Steps 2-5: ADHD Children — dark background */}
              <div className="overflow-hidden py-4 relative" style={{ backgroundColor: '#563D33', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>

                {/* Step 2 */}
                <RevealSection>
                  <div className="p-4 md:p-8 relative z-10">
                    <span className="step-number-bg-light">02</span>
                    <div className="flex items-center gap-4 mb-4">
                      <img src="/child-avatar.png" alt="Child" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 2 · ADHD Children</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 text-amber-50">Game-Based The Six-Realm VR Experience Galaxy</h3>
                    <p className="text-amber-100/80 mb-6 md:mb-8 text-sm md:text-base">
                      Elders' diverse life stories collectively generate the entire Galaxsync Galaxy. This VR universe features six cognitive realms, each representing a wide range of narratives, ensuring every ADHD child can discover stories that spark their unique interests.
                    </p>

                    {/* Six Realm Planets - Row 1 */}
                    <StaggerChildren staggerMs={150}>
                      <div className="grid grid-cols-3 gap-2 md:gap-6 mb-4">
                        {[
                          { src: '/planet-art-craft.png', name: 'Art & Craft', hasSubPlanets: true, floatDuration: '3.5s', floatDelay: '0s' },
                          { src: '/planet-life-nature.png', name: 'Life & Nature', hasSubPlanets: false, floatDuration: '4.2s', floatDelay: '0.8s' },
                          { src: '/planet-logic-science.png', name: 'Logic & Science', hasSubPlanets: false, floatDuration: '3.8s', floatDelay: '1.5s' },
                        ].map((planet) => (
                          <div key={planet.name} className="group flex flex-col items-center gap-2 cursor-pointer relative">
                            <div className="relative transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                              <img
                                src={planet.src}
                                alt={planet.name}
                                className="w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-lg transition-all duration-500 group-hover:drop-shadow-[0_8px_24px_rgba(255,200,100,0.4)] group-hover:brightness-110"
                                style={{ animation: `float ${planet.floatDuration} ease-in-out ${planet.floatDelay} infinite` }}
                              />
                              {planet.hasSubPlanets && [
                                { src: '/artcraft-sub1.png', angle: 150 },
                                { src: '/artcraft-sub2.png', angle: 180 },
                                { src: '/artcraft-sub3.png', angle: 210 },
                                { src: '/artcraft-sub4.png', angle: 330 },
                                { src: '/artcraft-sub5.png', angle: 0 },
                                { src: '/artcraft-sub6.png', angle: 30 },
                              ].map((sub, i) => {
                                const rad = (sub.angle * Math.PI) / 180;
                                const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
                                const radius = isMobile ? 60 : 170;
                                const x = Math.cos(rad) * radius;
                                const y = Math.sin(rad) * radius;
                                return (
                                  <div
                                    key={i}
                                    className="absolute left-1/2 top-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
                                      transitionDelay: `${i * 60}ms`,
                                    }}
                                  >
                                    <img
                                      src={sub.src}
                                      alt={`Art & Craft detail ${i + 1}`}
                                      className="w-8 h-8 md:w-20 md:h-20 object-contain drop-shadow-md transition-transform duration-300 hover:scale-125"
                                      style={{ animation: `orbit-float 3s ease-in-out infinite ${i * 0.4}s` }}
                                    />
                                  </div>
                                );
                              })}
                            </div>
                            <span className="text-xs font-semibold text-amber-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{planet.name}</span>
                          </div>
                        ))}
                      </div>
                      {/* Row 2 */}
                      <div className="grid grid-cols-3 gap-2 md:gap-6">
                        {[
                          { src: '/planet-skills-growth.png', name: 'Skills & Growth', floatDuration: '4.5s', floatDelay: '0.5s' },
                          { src: '/planet-myths-tales.png', name: 'Myths & Tales', floatDuration: '3.2s', floatDelay: '1.2s' },
                          { src: '/planet-heart-mind.png', name: 'Heart & Mind', floatDuration: '4s', floatDelay: '2s' },
                        ].map((planet) => (
                          <div key={planet.name} className="group flex flex-col items-center gap-2 cursor-pointer">
                            <div className="relative transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                              <img
                                src={planet.src}
                                alt={planet.name}
                                className="w-24 h-24 md:w-80 md:h-80 object-contain drop-shadow-lg transition-all duration-500 group-hover:drop-shadow-[0_8px_24px_rgba(255,200,100,0.4)] group-hover:brightness-110"
                                style={{ animation: `float ${planet.floatDuration} ease-in-out ${planet.floatDelay} infinite` }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-amber-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{planet.name}</span>
                          </div>
                        ))}
                      </div>
                    </StaggerChildren>
                  </div>
                </RevealSection>

                <div className="glass-divider mx-8" />

                {/* Step 3 */}
                <RevealSection>
                  <div className="p-4 md:p-8 relative z-10">
                    <span className="step-number-bg-light">03</span>
                    <div className="flex items-center gap-4 mb-4">
                      <img src="/child-avatar.png" alt="Child" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 3 · ADHD Children</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 text-amber-50">Example: Dunhuang Planet – The Cosmic Mentor</h3>
                    <p className="text-amber-100/80 mb-6 text-sm md:text-base">
                      Take the Dunhuang Planet as an example. Here, seniors are not only the creators of the stories but also serve as "Cosmic Mentors."
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div className="flex justify-center mb-8">
                        <img src="/step3-gif1-opt.gif" alt="Dunhuang Planet Gameplay" className="w-full max-w-4xl rounded-xl" />
                      </div>
                    </RevealSection>
                    <p className="text-amber-100/80 mb-6 text-sm md:text-base">
                      Through real-time communication and gentle in-world check-ins, they offer encouragement, guidance, and emotional support to the child explorers.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div className="flex justify-center">
                        <img src="/step3-gif2-opt.gif" alt="Cosmic Mentor Interaction" className="w-full max-w-4xl rounded-xl" />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>

                <div className="glass-divider mx-8" />

                {/* Step 4 */}
                <RevealSection>
                  <div className="p-4 md:p-8 relative z-10">
                    <span className="step-number-bg-light">04</span>
                    <div className="flex items-center gap-4 mb-4">
                      <img src="/child-avatar.png" alt="Child" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 4 · ADHD Children</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 text-amber-50">Precision Biometric Guidance</h3>
                    <p className="text-amber-100/80 mb-6 text-sm md:text-base">
                      Galaxsync utilizes eye-monitoring technology to detect distraction in real-time. When the child's attention begins to drift, the environment responds with a brief, calming interaction that supports a natural return to focus.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div className="flex justify-center">
                        <img src="/step3-gif3-opt.gif" alt="Biometric Guidance" className="w-full max-w-4xl rounded-xl" />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>

                <div className="glass-divider mx-8" />

                {/* Step 5 */}
                <RevealSection>
                  <div className="p-4 md:p-8 relative z-10">
                    <span className="step-number-bg-light">05</span>
                    <div className="flex items-center gap-4 mb-4">
                      <img src="/child-avatar.png" alt="Child" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 5 · ADHD Children</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg mb-3 text-amber-50">The Story Echo</h3>
                    <p className="text-amber-100/80 mb-6 text-sm md:text-base">
                      After kids finish the stories, through story echo, we replace traditional scores with world-centric digital rewards, where the environment visibly heals and blooms, to validate their impact and build lasting confidence.
                    </p>
                    <RevealSection direction="scale" delay={150}>
                      <div className="flex justify-center">
                        <img src="/step5-gif4-opt.gif" alt="Story Echo Rewards" className="w-full max-w-4xl rounded-xl" />
                      </div>
                    </RevealSection>
                  </div>
                </RevealSection>
              </div>

              {/* The Loop Completes */}
              <RevealSection>
                <div className="text-center py-16 md:py-24">
                  <h2 className="text-4xl md:text-6xl font-bold" style={{ color: '#563D33' }}>The Loop Completes.</h2>
                </div>
              </RevealSection>

              {/* Step 6 */}
              <RevealSection>
                <div className="py-4 md:py-8 relative">
                  <span className="step-number-bg">06</span>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/elder-avatar.png" alt="Elder" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 6 · Elders</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-3">My Constellation</h3>
                  <p className="text-neutral-600 mb-6 md:mb-8 text-sm md:text-base">
                    Elders review story planets showing ADHD child interactions. Each session layers child's data onto the narrative, creating a co-created living memory legacy for future generations.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-4xl ipad-glow">
                        <img src="/ipad-constellation.png" alt="iPad frame" className="w-full relative z-20 pointer-events-none" />
                        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video
                            ref={elderVideoRef}
                            src="/elder-recording.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>

              {/* Step 7 */}
              <RevealSection>
                <div className="py-4 md:py-8 relative">
                  <span className="step-number-bg">07</span>
                  <div className="flex items-center gap-4 mb-4">
                    <img src="/elder-avatar.png" alt="Elder" className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 7 · Elders</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-base md:text-lg mb-3">Profile & Dashboard</h3>
                  <p className="text-neutral-600 mb-6 md:mb-8 text-sm md:text-base">
                    Elders can view dynamic summaries of each child's exploration—their highlights, progress, and moments of achievement. Every insight reaffirms how their guidance nurtures growth, turning mentorship into a tangible sense of purpose and impact.
                  </p>
                  <RevealSection direction="scale" delay={200}>
                    <div className="flex justify-center">
                      <div className="relative w-full max-w-4xl ipad-glow">
                        <img src="/ipad-constellation.png" alt="iPad frame" className="w-full relative z-20 pointer-events-none" />
                        <div className="absolute inset-0 z-30 flex items-center justify-center" style={{ padding: '3.2% 3.2% 2.8% 4.5%' }}>
                          <video
                            src="/elder-dashboard.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        </div>
                      </div>
                    </div>
                  </RevealSection>
                </div>
              </RevealSection>
            </div>

            {/* Impact Section - Apple Style with images */}
            <div className="py-16 md:py-24" style={{ backgroundColor: '#563D33', color: '#FEF5E4', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
              <RevealSection>
                <h2 className="text-4xl md:text-6xl font-light text-center mb-12 md:mb-20" data-testid="text-impact-heading" style={{ color: '#FEF5E4' }}>Profound Impact.</h2>
              </RevealSection>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                <RevealSection delay={100}>
                  <div>
                    <div className="mb-4">
                      <img src="/elder-avatar.png" alt="Elder" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
                    </div>
                    <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid rgba(255,236,189,0.3)' }}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: '#FFECBD' }}>Reduced Isolation</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Sharing stories gives elders purpose and connection, transforming memories into meaningful contribution and intergenerational bonds.
                      </p>
                    </div>
                  </div>
                </RevealSection>

                <RevealSection delay={300}>
                  <div>
                    <div className="mb-4">
                      <img src="/planet-heart-mind-crop.png" alt="Connection" className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                    </div>
                    <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid rgba(255,236,189,0.3)' }}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: '#FFECBD' }}>Meaningful Connection</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Children and elders co-create stories together, building emotional bonds across generations and creating shared narratives of growth.
                      </p>
                    </div>
                  </div>
                </RevealSection>

                <RevealSection delay={500}>
                  <div>
                    <div className="mb-4">
                      <img src="/child-avatar-new.png" alt="Child" className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover" />
                    </div>
                    <div className="pt-6 md:pt-8" style={{ borderTop: '1px solid rgba(255,236,189,0.3)' }}>
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4" style={{ color: '#FFECBD' }}>ADHD Growth</h3>
                      <p className="text-base md:text-lg font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Children engage longer in therapy through immersive, narrative-driven VR environments tailored to their needs.
                      </p>
                    </div>
                  </div>
                </RevealSection>
              </div>
            </div>

            {/* Bottom logos */}
            <RevealSection direction="scale">
              <div className="flex flex-col items-center gap-12 md:gap-24 mt-24 md:mt-48 mb-16">
                <img
                  src="/sub-planets-grid.png"
                  alt="Story Sub-Planets"
                  className="w-full max-w-sm md:max-w-xl"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(255, 200, 120, 0.25))' }}
                />
                <div className="flex flex-col items-center gap-3">
                  <img src="/galaxsync-logo-detail.png" alt="Galaxsync Logo" className="w-40 md:w-64" />
                  <p className="text-sm tracking-widest uppercase" style={{ color: 'rgba(86,61,51,0.4)' }}>Transforming Memories into Healing Worlds</p>
                </div>
              </div>
            </RevealSection>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-100 mt-20 py-12">
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