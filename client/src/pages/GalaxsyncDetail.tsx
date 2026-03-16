import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function GalaxsyncDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [planetsExploded, setPlanetsExploded] = useState(false);
  const elderVideoRef = useRef<HTMLVideoElement>(null);

  const heroRef = useScrollAnimation();
  const problemRef = useScrollAnimation();
  const solutionRef = useScrollAnimation();

  const featuresRef = useScrollAnimation();
  const impactRef = useScrollAnimation();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!elderVideoRef.current) return;
    const video = elderVideoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) return null;

  const hoverScale = "hover:scale-105 transition-transform duration-300";
  
  const getAnimationClass = (isVisible: boolean) => {
    return isVisible 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-8";
  };

  return (
    <div className="min-h-screen selection:bg-current selection:text-white relative" style={{ backgroundColor: '#FEF5E4', fontFamily: "'Nunito', sans-serif" }}>
      {/* Background galaxy image */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/galaxsync-galaxy.png)',
          backgroundSize: '600px 600px',
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          zIndex: 0
        }}
      />
      {/* Content wrapper */}
      <div className="relative z-10">
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(32px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .animate-scaleIn {
            animation: scaleIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .scroll-section {
            transition: opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
        `}</style>
        {/* Header */}
      <header className="sticky top-0 z-50 py-4" style={{ backgroundColor: '#FEF5E4' }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-medium playground-heading tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
          >
            Ruhaus
          </button>
          <nav className="flex gap-8 text-sm font-medium opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12 md:pb-20" style={{ paddingTop: 0 }}>
        <div className="space-y-16">
          {/* Hero Section */}
          <div 
            ref={heroRef.ref}
            className={`space-y-8 scroll-section ${heroRef.isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <div className="bg-[#F5F5F5] overflow-hidden flex items-center justify-center" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
              <img src="/galaxsync-hero.jpg" alt="Galaxsync Hero" className="w-full h-auto object-contain" />
            </div>

            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-semibold playground-heading">Galaxsync</h1>
              <p className="text-lg text-neutral-500 leading-relaxed">
                A reciprocal AI-driven VR-integrated care ecosystem connecting generations through shared stories and meaningful interaction.
              </p>
              <div className="flex gap-2 flex-wrap pt-4">
                <span className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">DATA VIZ</span>
                <span className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">SYSTEMS</span>
              </div>
            </div>
          </div>

          {/* Problem Section */}
          <div 
            ref={problemRef.ref}
            className={`space-y-8 scroll-section ${problemRef.isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-2xl font-semibold playground-heading">Problem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg border border-neutral-100 hover:scale-105 transition-transform duration-300 flex items-center gap-8 bg-[#FFECBD] text-[#563D33]">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-4">Empty-Nest Seniors</h3>
                  <ul className="space-y-2 text-neutral-600 text-sm">
                    <li>• 200M seniors living alone worldwide</li>
                    <li>• Lifetimes of wisdom and rich personal histories</li>
                    <li>• Decreasing social interaction and isolation</li>
                    <li>• Seeking meaningful connection and purpose</li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <img src="/elder-avatar.png" alt="Elder" className="w-40 h-40 object-contain" />
                </div>
              </div>

              <div className="p-8 rounded-lg border border-neutral-100 hover:scale-105 transition-transform duration-300 flex items-center gap-8 text-[#FFECBD] bg-[#97563D]">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-4">Children with ADHD</h3>
                  <ul className="space-y-2 text-sm text-[#FFECBD]">
                    <li>• 366M children globally struggle with attention</li>
                    <li>• High energy and fragmented focus</li>
                    <li>• Often misunderstood for their intensity</li>
                    <li>• Thrive in immersive, structured environments</li>
                  </ul>
                </div>
                <div className="flex-shrink-0">
                  <img src="/child-avatar.png" alt="Child" className="w-40 h-40 object-contain" />
                </div>
              </div>
            </div>
          </div>

          {/* Solution Overview */}
          <div 
            ref={solutionRef.ref}
            className={`space-y-8 scroll-section ${solutionRef.isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-2xl font-semibold playground-heading">Solution</h2>
            <div 
              className="p-12 rounded-lg border border-neutral-100 relative overflow-hidden transition-all duration-300 cursor-pointer"
              style={{ 
                backgroundImage: 'url(/galaxsync-galaxy.png)', 
                backgroundSize: isHovering ? '130%' : '100%',
                backgroundPosition: 'center',
                transition: 'background-size 0.3s ease-out'
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)', pointerEvents: 'none' }} />
              <div className="relative z-10 space-y-6 text-center">
                <div>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    The gap could be bridged. Two generations could be connected.
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-semibold playground-heading text-neutral-800">
                    Through the Neuro-Reciprocal Interaction Model, seniors' life stories are transformed into interactive VR worlds where children explore narrative missions while elders rediscover purpose and companionship.
                  </p>
                </div>
                <div>
                  <p className="text-lg text-neutral-700 leading-relaxed">
                    Rather than one-way care, Galaxsync creates a reciprocal healing loop where memories become exploration and attention becomes connection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Solution Components */}
          <div 
            ref={featuresRef.ref}
            className={`space-y-12 scroll-section ${featuresRef.isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-2xl font-semibold playground-heading">How It Works</h2>

            {/* 1. Elders - Digital Assets Curator */}
            <div className={`p-8 rounded-xl border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="flex items-center gap-4 mb-4">
                <img src="/elder-avatar.png" alt="Elder" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 1 · Elders</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-3">Digital Assets Curator</h3>
              <p className="text-neutral-600 mb-8">
                Elders preserve real-life memories as digital assets, which are processed by AI into interactive story-based games for intergenerational engagement.
              </p>
              {/* iPad with Video */}
              <div className="flex justify-center">
                <div className="relative w-full max-w-4xl">
                  <img src="/ipad-constellation.png" alt="iPad frame" className="w-full relative z-10 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ padding: '3.5% 5.5% 5% 5.5%' }}>
                    <video
                      ref={elderVideoRef}
                      src="/elder-recording.mp4"
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover rounded-[12px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Steps 2-5: ADHD Children — full-width dark background */}
            <div className="overflow-hidden py-4" style={{ backgroundColor: '#97563D', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: 'calc(50vw - 50%)', paddingRight: 'calc(50vw - 50%)' }}>
              {/* Step 2 */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/child-avatar.png" alt="Child" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 2 · ADHD Children</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-amber-50">Game-Based The Six-Realm VR Experience Galaxy</h3>
                <p className="text-amber-100/80 mb-8">
                  The Galaxsync Galaxy generated entirely from the elders' diverse life stories. This VR universe features six cognitive realms. Each realm covers vast diversity, ensures every ADHD child can discover stories that spark their unique interests.
                </p>

                {/* Six Realm Planets - Row 1 */}
                <div className="grid grid-cols-3 gap-6 mb-4">
                  {[
                    { src: '/planet-art-craft.png', name: 'Art & Craft', hasSubPlanets: true },
                    { src: '/planet-life-nature.png', name: 'Life & Nature', hasSubPlanets: false },
                    { src: '/planet-logic-science.png', name: 'Logic & Science', hasSubPlanets: false },
                  ].map((planet) => (
                    <div key={planet.name} className="group flex flex-col items-center gap-2 cursor-pointer relative">
                      <div
                        className="relative transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                        onClick={() => planet.hasSubPlanets && setPlanetsExploded(!planetsExploded)}
                      >
                        <img
                          src={planet.src}
                          alt={planet.name}
                          className="w-60 h-60 md:w-80 md:h-80 object-contain drop-shadow-lg transition-all duration-500 group-hover:drop-shadow-[0_8px_24px_rgba(255,200,100,0.4)] group-hover:brightness-110"
                          style={{ animation: 'float 3s ease-in-out infinite' }}
                        />
                        {/* Sub-planets for Art & Craft */}
                        {planet.hasSubPlanets && [
                          { src: '/artcraft-sub1.png', angle: 150 },
                          { src: '/artcraft-sub2.png', angle: 180 },
                          { src: '/artcraft-sub3.png', angle: 210 },
                          { src: '/artcraft-sub4.png', angle: 330 },
                          { src: '/artcraft-sub5.png', angle: 0 },
                          { src: '/artcraft-sub6.png', angle: 30 },
                        ].map((sub, i) => {
                          const rad = (sub.angle * Math.PI) / 180;
                          const radius = 170;
                          const x = Math.cos(rad) * radius;
                          const y = Math.sin(rad) * radius;
                          return (
                            <div
                              key={i}
                              className="absolute left-1/2 top-1/2 z-20"
                              style={{
                                transform: planetsExploded
                                  ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`
                                  : 'translate(-50%, -50%) scale(0)',
                                opacity: planetsExploded ? 1 : 0,
                                transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 80}ms`,
                              }}
                            >
                              <img
                                src={sub.src}
                                alt={`Art & Craft detail ${i + 1}`}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-md hover:scale-125 transition-transform duration-300"
                                style={{ animation: planetsExploded ? `orbit-float 3s ease-in-out infinite ${i * 0.4}s` : 'none' }}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <span className="text-xs font-semibold text-amber-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{planet.name}</span>
                    </div>
                  ))}
                </div>
                {/* Six Realm Planets - Row 2 */}
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { src: '/planet-skills-growth.png', name: 'Skills & Growth' },
                    { src: '/planet-myths-tales.png', name: 'Myths & Tales' },
                    { src: '/planet-heart-mind.png', name: 'Heart & Mind' },
                  ].map((planet) => (
                    <div key={planet.name} className="group flex flex-col items-center gap-2 cursor-pointer">
                      <div className="relative transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
                        <img
                          src={planet.src}
                          alt={planet.name}
                          className="w-60 h-60 md:w-80 md:h-80 object-contain drop-shadow-lg transition-all duration-500 group-hover:drop-shadow-[0_8px_24px_rgba(255,200,100,0.4)] group-hover:brightness-110"
                          style={{ animation: 'float 3s ease-in-out infinite' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-amber-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{planet.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mx-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

              {/* Step 3 */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/child-avatar.png" alt="Child" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 3 · ADHD Children</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-amber-50">Dunhuang Planet – The Cosmic Mentor</h3>
                <p className="text-amber-100/80 mb-6">
                  Take the Dunhuang Planet as example. Here, the senior creator acts as a "Cosmic Mentor." Through real-time communication and gentle on-site check-ins, they provide essential encouragement and guidance.
                </p>
                <img src="/step3-dunhuang.png" alt="Dunhuang Planet - Grandpa Tony" className="w-full rounded-2xl" />
              </div>

              <div className="mx-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

              {/* Step 4 */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/child-avatar.png" alt="Child" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 4 · ADHD Children</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-amber-50">Precision Biometric Guidance</h3>
                <p className="text-amber-100/80">
                  Galaxsync utilizes eye-monitoring technology to detect distraction in real-time. When the child's attention begins to drift, the environment responds with a brief, calming interaction that supports a natural return to focus.
                </p>
              </div>

              <div className="mx-8 border-t" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />

              {/* Step 5 */}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src="/child-avatar.png" alt="Child" className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-200/70">Step 5 · ADHD Children</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3 text-amber-50">The Story Echo</h3>
                <p className="text-amber-100/80">
                  After kids finish the stories, through story echo, we replace traditional scores with world-centric digital rewards, where the environment visibly heals and blooms, to validate their impact and build lasting confidence.
                </p>
              </div>
            </div>

            {/* 6. Elders - My Constellation */}
            <div className={`p-8 rounded-xl border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="flex items-center gap-4 mb-4">
                <img src="/elder-avatar.png" alt="Elder" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 6 · Elders</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-3">My Constellation</h3>
              <p className="text-neutral-600">
                Elders review story planets showing ADHD child interactions. Each session layers child's data onto the narrative, creating a co-created living memory legacy for future generations.
              </p>
            </div>

            {/* 7. Elders - Profile & Dashboard */}
            <div className={`p-8 rounded-xl border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
              <div className="flex items-center gap-4 mb-4">
                <img src="/elder-avatar.png" alt="Elder" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step 7 · Elders</span>
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-3">Profile & Dashboard</h3>
              <p className="text-neutral-600">
                Elders can view dynamic summaries of each child's exploration—their highlights, progress, and moments of achievement. Every insight reaffirms how their guidance nurtures growth, turning mentorship into a tangible sense of purpose and impact.
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div 
            ref={impactRef.ref}
            className={`space-y-8 scroll-section ${impactRef.isVisible ? 'animate-fadeInUp' : 'opacity-0 translate-y-8'}`}
          >
            <h2 className="text-2xl font-semibold playground-heading">Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`p-8 rounded-lg border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: '#563D33' }}>
                <h3 className="font-semibold text-lg mb-4 text-amber-50">Reduced Isolation</h3>
                <p className="text-amber-100/80 text-sm">
                  Sharing stories gives elders purpose and connection, transforming memories into meaningful contribution and intergenerational bonds.
                </p>
              </div>

              <div className={`p-8 rounded-lg border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: '#FFECBD' }}>
                <h3 className="font-semibold text-lg mb-4">Meaningful Connection</h3>
                <p className="text-neutral-600 text-sm">
                  Children and elders co-create stories together, building emotional bonds across generations and creating shared narratives of growth.
                </p>
              </div>

              <div className={`p-8 rounded-lg border border-neutral-100 ${hoverScale}`} style={{ backgroundColor: '#563D33' }}>
                <h3 className="font-semibold text-lg mb-4 text-amber-50">ADHD Growth Reflection</h3>
                <p className="text-amber-100/80 text-sm">
                  Children's choices and focus patterns become part of the evolving narrative world, showing measurable growth and meaningful progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-neutral-100 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60 text-sm">
          <p>© {new Date().getFullYear()} Ruhaus Studio. All rights reserved.</p>
          <div className="flex gap-6 font-mono tracking-wider">
            <a href="#" className="hover:opacity-100 transition-opacity">
              TWITTER
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              DRIBBBLE
            </a>
            <a href="#" className="hover:opacity-100 transition-opacity">
              CONTACT
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
