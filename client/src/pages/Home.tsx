import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [, navigate] = useLocation();

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="playground-root theme-jason min-h-screen selection:bg-current selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 py-4" style={{ backgroundColor: '#ffffff' }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate("/")}
              className="text-lg font-medium playground-heading tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
            >
              Ruhaus
            </button>
          </div>
          <nav className="flex gap-8 text-sm font-medium opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 pt-[0px] pb-[0px]">
        {/* Hero Section */}
        <div className="max-w-3xl mb-8 md:mb-12">
          <h2 className="text-base md:text-lg font-normal playground-heading mb-4 leading-relaxed text-neutral-500">
            Design, strategize, and build <span className="playground-accent italic">AI-powered experiences for social impact</span>, exploring the future of human intelligence. 
            Pioneering innovative product design and contributing to the global advancement of AI.
          </h2>
        </div>

        {/* Awards Strip */}
        <div className="mb-12 md:mb-16">
          <p className="text-[10px] tracking-[2px] text-neutral-300 uppercase font-semibold mb-4">Recognition</p>
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { src: "/award-reddot.png", alt: "Red Dot Design Award" },
              { src: "/award-if.png", alt: "iF Design Award" },
              { src: "/award-adesign.png", alt: "A' Design Award" },
              { src: "/award-indigo.png", alt: "Indigo Design Award" },
              { src: "/award-asia.png", alt: "Asia Design Prize" },
              { src: "/award-adc.png", alt: "ADC Award" },
              { src: "/award-ux.png", alt: "UX Design Award" },
            ].map((award) => (
              <img
                key={award.alt}
                src={award.src}
                alt={award.alt}
                style={{ height: "36px", width: "auto", objectFit: "contain" }}
              />
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="aspect-[4/3] bg-neutral-100 rounded-xl" />
                <div className="h-4 bg-neutral-100 rounded w-1/4" />
                <div className="h-4 bg-neutral-100 rounded w-3/4" />
              </div>
            ))
          ) : (
            projects?.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer flex flex-col"
                onClick={() => navigate(`/${project.slug}`)}
              >
                {/* Project Card/Image */}
                <div className="playground-card mb-6 relative aspect-video overflow-hidden">
                  <div className="playground-card-img-container w-full h-full relative flex items-center justify-center p-12 md:p-20 bg-[#F5F5F5]">
                    {project.slug === 'hear-me' ? (
                      <span
                        className="text-3xl md:text-4xl font-bold transition-all duration-700 ease-out group-hover:scale-115"
                        style={{ fontFamily: "'Nunito', sans-serif", color: '#88B395' }}
                        data-testid="text-hearme-logo"
                      >
                        Hear Me
                      </span>
                    ) : (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className={`object-contain transition-all duration-700 ease-out group-hover:scale-115 ${
                          project.slug === 'soma' ? 'w-36 md:w-44' :
                          project.slug === 'galaxsync' ? 'w-48 md:w-60' :
                          project.slug === 'yoyo' ? 'w-20 md:w-28' :
                          project.slug === 'learno' ? 'w-36 md:w-44' :
                          'max-w-full max-h-full'
                        }`}
                      />
                    )}
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-lg font-semibold playground-heading">{project.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {project.intro}
                  </p>
                  
                  {project.tags && project.tags.length > 0 && (
                    <div className="project-tags flex gap-2 flex-wrap mt-2">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag text-[10px] tracking-wider py-1 px-3 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t playground-border mt-20 py-12">
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
  );
}