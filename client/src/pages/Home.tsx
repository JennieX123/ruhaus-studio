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
      <header className="py-8 pt-[24px] pb-[24px]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium playground-heading tracking-tight">Ruhaus</h1>
          </div>
          <nav className="flex gap-8 text-sm font-medium opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 pt-[0px] pb-[0px]">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h2 className="text-base md:text-lg font-normal playground-heading mb-4 leading-relaxed text-neutral-500">
            Design, strategize, and build <span className="playground-accent italic">AI-powered experiences for social impact</span>, exploring the future of human intelligence. 
            Pioneering innovative product design and contributing to the global advancement of AI.
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
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
                  <div className="playground-card-img-container w-full h-full relative flex items-center justify-center bg-[#F5F5F5] p-12 md:p-20">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`max-w-full max-h-full object-contain transition-all ease-in-out ${
                        ['galaxsync', 'soma'].includes(project.slug)
                          ? 'duration-200 ' + (project.slug === 'galaxsync'
                            ? 'group-hover:drop-shadow-[0_0_20px_rgba(160,110,80,0.6)]'
                            : 'group-hover:drop-shadow-[0_0_20px_rgba(76,129,161,0.6)]')
                          : 'duration-700 grayscale brightness-[0.2] group-hover:grayscale-0 group-hover:brightness-100'
                      }`}
                    />
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-lg font-semibold playground-heading">{project.title}</h3>
                  </div>
                  <p className="text-sm text-neutral-500 truncate">
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