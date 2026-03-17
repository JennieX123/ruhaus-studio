import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting] as const;
};

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [ref, isVisible] = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export function AppleInspired() {
  // Add Google Font
  useEffect(() => {
    if (!document.getElementById("nunito-font")) {
      const link = document.createElement("link");
      link.id = "nunito-font";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="bg-[#FEF5E4] text-[#563D33] min-h-screen selection:bg-[#563D33] selection:text-[#FEF5E4]" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* 1. HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/galaxsync-hero.jpg" 
            alt="Galaxsync Hero" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FEF5E4]/20 to-[#FEF5E4]"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
          <FadeIn>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-light tracking-widest mb-6">
              GALAXSYNC
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-xl md:text-3xl lg:text-4xl font-light max-w-4xl mx-auto leading-tight mb-10">
              A Reciprocal AI-VR Ecosystem Transforming Memories into Healing Worlds
            </p>
          </FadeIn>
          <FadeIn delay={400} className="flex flex-wrap justify-center gap-3">
            <Badge variant="outline" className="border-[#563D33] text-[#563D33] px-4 py-2 text-sm rounded-full bg-white/50 backdrop-blur-sm">System Design</Badge>
            <Badge variant="outline" className="border-[#563D33] text-[#563D33] px-4 py-2 text-sm rounded-full bg-white/50 backdrop-blur-sm">UI/UX</Badge>
            <Badge variant="outline" className="border-[#563D33] text-[#563D33] px-4 py-2 text-sm rounded-full bg-white/50 backdrop-blur-sm">Service Design</Badge>
          </FadeIn>
        </div>
      </section>

      {/* 2. PROBLEM */}
      <section className="py-32 px-6 lg:px-12">
        <FadeIn>
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-7xl font-light mb-6">The Disconnect.</h2>
            <p className="text-xl md:text-2xl text-[#563D33]/70 max-w-3xl mx-auto">Bridging the gap between two isolated generations.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Elder Card */}
          <FadeIn delay={100}>
            <Card className="bg-[#FFECBD] border-none shadow-2xl overflow-hidden rounded-[2.5rem] h-full flex flex-col">
              <CardContent className="p-12 flex-grow flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-10 ring-8 ring-white/30">
                  <img src="/__mockup/images/elder-avatar.png" alt="Elder" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-4xl font-bold text-[#563D33] mb-6">Elders</h3>
                <p className="text-2xl font-light text-[#563D33]/80 mb-8 leading-relaxed">
                  Experiencing memory decline and severe social isolation, leading to an exacerbated sense of worthlessness.
                </p>
                <div className="mt-auto">
                  <div className="text-6xl font-bold text-[#563D33] mb-2">43%</div>
                  <div className="text-lg font-semibold uppercase tracking-wider text-[#563D33]/60">Feel socially isolated</div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Child Card */}
          <FadeIn delay={300}>
            <Card className="bg-[#563D33] border-none shadow-2xl overflow-hidden rounded-[2.5rem] h-full flex flex-col">
              <CardContent className="p-12 flex-grow flex flex-col items-center text-center">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-10 ring-8 ring-[#FFECBD]/10">
                  <img src="/__mockup/images/child-avatar-new.png" alt="Child" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-4xl font-bold text-[#FFECBD] mb-6">ADHD Children</h3>
                <p className="text-2xl font-light text-[#FFECBD]/80 mb-8 leading-relaxed">
                  Struggling with focus and social skills, finding traditional therapy methods unengaging and ineffective.
                </p>
                <div className="mt-auto">
                  <div className="text-6xl font-bold text-[#FFECBD] mb-2">6M+</div>
                  <div className="text-lg font-semibold uppercase tracking-wider text-[#FFECBD]/60">Children diagnosed</div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#563D33] leading-tight mb-12">
              This changes <br/><span className="italic">everything.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-2xl md:text-4xl font-light text-[#563D33]/70 leading-relaxed max-w-4xl mx-auto">
              We connect elder wisdom with childhood wonder. Through AI and VR, memories aren't just preserved—they become interactive worlds for ADHD therapy.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-32 bg-[#FEF5E4] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-bold text-[#563D33]">How it works.</h2>
          </FadeIn>
        </div>

        <div className="space-y-40">
          {/* Step 1 */}
          <div className="relative max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="absolute -left-10 md:left-0 top-0 text-[15rem] md:text-[20rem] font-bold text-[#563D33]/5 z-0 leading-none">1</div>
            <div className="w-full md:w-1/2 relative z-10">
              <FadeIn>
                <Badge className="bg-[#FFECBD] text-[#563D33] mb-6 text-sm px-4 py-1 hover:bg-[#FFECBD]">Elders</Badge>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Digital Assets Curator</h3>
                <p className="text-xl md:text-2xl text-[#563D33]/70 leading-relaxed">
                  Elders share their life stories, skills, and wisdom. Our AI seamlessly transforms these narratives into rich digital assets.
                </p>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 relative z-10">
              <FadeIn delay={200}>
                <div className="bg-white p-4 rounded-[2rem] shadow-2xl border-4 border-[#563D33]/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                    <img src="/__mockup/images/ipad-constellation.png" alt="iPad Mockup" className="w-full h-full object-cover" />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16">
            <div className="absolute right-0 top-0 text-[15rem] md:text-[20rem] font-bold text-[#563D33]/5 z-0 leading-none text-right">2</div>
            <div className="w-full md:w-1/2 relative z-10">
              <FadeIn delay={200}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "planet-art-craft.png", "planet-life-nature.png", "planet-logic-science.png", 
                    "planet-skills-growth.png", "planet-myths-tales.png", "planet-heart-mind.png"
                  ].map((planet, i) => (
                    <div key={i} className="aspect-square bg-[#563D33]/5 rounded-full p-4 hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                      <img src={`/__mockup/images/${planet}`} alt="Planet" className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 relative z-10 md:pl-12">
              <FadeIn>
                <Badge className="bg-[#563D33] text-[#FEF5E4] mb-6 text-sm px-4 py-1 hover:bg-[#563D33]">ADHD Children</Badge>
                <h3 className="text-4xl md:text-5xl font-bold mb-6">Six Realm VR Galaxy</h3>
                <p className="text-xl md:text-2xl text-[#563D33]/70 leading-relaxed">
                  The curated assets are generated into six distinct therapeutic planets. Children navigate these worlds, engaging in tailored activities that build focus and skills.
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative max-w-7xl mx-auto px-6">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 text-[15rem] md:text-[20rem] font-bold text-[#563D33]/5 z-0 leading-none text-center w-full">3</div>
            <FadeIn className="text-center relative z-10 mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">Dunhuang Planet Immersion</h3>
              <p className="text-xl md:text-2xl text-[#563D33]/70 max-w-3xl mx-auto">
                Restoring murals while practicing mindfulness and focus.
              </p>
            </FadeIn>
            <FadeIn delay={200} className="relative z-10">
              <div className="aspect-video w-full max-w-5xl mx-auto bg-[#563D33] rounded-[2rem] shadow-2xl overflow-hidden relative group flex items-center justify-center">
                <div className="text-[#FFECBD] text-center">
                  <div className="w-20 h-20 border-4 border-[#FFECBD]/30 border-t-[#FFECBD] rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-xl font-light">VR Demo Loading...</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Steps 4 & 5 Grid */}
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-10 top-0 text-[10rem] font-bold text-[#563D33]/5 z-0 leading-none">4</div>
              <FadeIn className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Biometric Guidance</h3>
                <p className="text-lg text-[#563D33]/70 mb-8">Real-time physiological tracking adapts the VR environment to maintain optimal engagement levels.</p>
                <div className="aspect-video bg-white rounded-[2rem] shadow-xl flex items-center justify-center overflow-hidden border-2 border-[#563D33]/5">
                  <div className="w-12 h-12 bg-[#FFECBD] rounded-full animate-pulse"></div>
                </div>
              </FadeIn>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="absolute -left-10 top-0 text-[10rem] font-bold text-[#563D33]/5 z-0 leading-none">5</div>
              <FadeIn delay={200} className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Story Echo</h3>
                <p className="text-lg text-[#563D33]/70 mb-8">Children leave voice messages and artifacts for the elders, completing the reciprocal loop.</p>
                <div className="aspect-video bg-[#563D33] rounded-[2rem] shadow-xl flex items-center justify-center overflow-hidden">
                   <div className="w-16 h-16 rounded-full bg-[#FFECBD]/20 flex items-center justify-center">
                     <div className="w-8 h-8 bg-[#FFECBD] rounded-full animate-ping"></div>
                   </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Steps 6 & 7 */}
          <div className="relative max-w-7xl mx-auto px-6">
            <FadeIn>
              <div className="bg-white rounded-[3rem] p-12 md:p-24 shadow-2xl text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-16">The Loop Completes.</h2>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <div className="absolute -left-4 top-12 text-[10rem] font-bold text-[#563D33]/5 z-0 leading-none">6</div>
                    <h4 className="text-2xl font-bold mb-4 relative z-10">My Constellation</h4>
                    <p className="text-[#563D33]/70 mb-8 relative z-10">Elders see their impact visualized as glowing constellations.</p>
                    <div className="aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden border-8 border-white shadow-inner">
                      <div className="w-full h-full bg-gradient-to-br from-[#563D33] to-[#2A1E19] flex items-center justify-center">
                        <span className="text-[#FFECBD]/50 font-light">Constellation View</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="absolute right-4 top-12 text-[10rem] font-bold text-[#563D33]/5 z-0 leading-none">7</div>
                    <h4 className="text-2xl font-bold mb-4 relative z-10">Profile & Dashboard</h4>
                    <p className="text-[#563D33]/70 mb-8 relative z-10">Tracking engagement and messages received from children.</p>
                    <div className="aspect-[3/4] bg-gray-100 rounded-[2rem] overflow-hidden border-8 border-white shadow-inner">
                      <div className="w-full h-full bg-[#FEF5E4] flex flex-col p-6">
                        <div className="w-full h-32 bg-white rounded-xl mb-4 shadow-sm"></div>
                        <div className="w-full h-16 bg-white rounded-xl mb-4 shadow-sm"></div>
                        <div className="w-full flex-grow bg-white rounded-xl shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 5. IMPACT */}
      <section className="py-40 px-6 bg-[#563D33] text-[#FEF5E4]">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-5xl md:text-7xl font-light text-center mb-24">Profound Impact.</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FadeIn delay={100}>
              <div className="border-t border-[#FFECBD]/30 pt-8">
                <h3 className="text-3xl font-bold text-[#FFECBD] mb-4">Reduced Isolation</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  Elders experience a renewed sense of purpose, knowing their life stories are directly helping children heal and grow.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="border-t border-[#FFECBD]/30 pt-8">
                <h3 className="text-3xl font-bold text-[#FFECBD] mb-4">Meaningful Connection</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  Creating a bridge across generations without the friction of direct, high-pressure social interaction.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={500}>
              <div className="border-t border-[#FFECBD]/30 pt-8">
                <h3 className="text-3xl font-bold text-[#FFECBD] mb-4">ADHD Growth</h3>
                <p className="text-lg text-white/70 font-light leading-relaxed">
                  Children engage longer in therapy through immersive, narrative-driven VR environments tailored to their needs.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="py-24 bg-white text-center">
        <FadeIn>
          <img 
            src="/__mockup/images/galaxsync-logo-detail.png" 
            alt="Galaxsync Logo" 
            className="h-16 mx-auto mb-8"
          />
          <p className="text-[#563D33]/50 text-sm tracking-widest uppercase">
            Transforming Memories into Healing Worlds
          </p>
        </FadeIn>
      </footer>
    </div>
  );
}
