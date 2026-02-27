import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { ExternalLink, ArrowRight, BookOpen, Database, Square, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("theme-jason");
  const [mounted, setMounted] = useState(false);

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { id: "theme-notebook", name: "NotebookLM", icon: <BookOpen className="w-4 h-4" /> },
    { id: "theme-palantir", name: "Palantir", icon: <Database className="w-4 h-4" /> },
    { id: "theme-minimal", name: "Minimalist", icon: <Square className="w-4 h-4" /> },
    { id: "theme-neobrutalism", name: "Neo-Brutalism", icon: <Zap className="w-4 h-4" /> },
    { id: "theme-jason", name: "Jason S.", icon: <ExternalLink className="w-4 h-4" /> },
  ];

  if (!mounted) return null;

  return (
    <div className={`playground-root ${theme} min-h-screen selection:bg-current selection:text-white`}>
      {/* Sticky Header with Playground Switcher */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b playground-border bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full playground-accent-bg flex items-center justify-center font-bold text-lg">
              R
            </div>
            <h1 className="text-xl font-bold playground-heading tracking-tight">Ruhaus</h1>
          </div>
          
          <div className="flex items-center gap-2 p-1.5 rounded-full border playground-border backdrop-blur-md bg-opacity-20" style={{ backgroundColor: 'color-mix(in srgb, var(--card-bg) 50%, transparent)'}}>
            <span className="text-xs font-mono opacity-50 px-3 hidden lg:block uppercase tracking-widest">
              Style Engine:
            </span>
            {themes.map(t => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                  theme === t.id 
                    ? 'playground-switcher-item active' 
                    : 'playground-switcher-item hover:opacity-70'
                }`}
                data-testid={`theme-btn-${t.id}`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Hero Section */}
        <div className="max-w-4xl mb-24 md:mb-32 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-5xl md:text-7xl font-bold playground-heading mb-8 leading-[1.1]">
            We design <span className="playground-accent italic">digital dimensions</span> that leave a mark.
          </h2>
          <p className="text-xl md:text-2xl opacity-70 leading-relaxed max-w-2xl font-light">
            Ruhaus is an independent studio crafting bespoke web experiences. 
            Toggle the style engine above to see how our fundamental design architecture 
            adapts to completely different visual languages.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-y-24">
          {isLoading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col gap-4">
                <div className="aspect-[4/3] bg-neutral-100 rounded-xl" />
                <div className="h-4 bg-neutral-100 rounded w-1/4" />
                <div className="h-4 bg-neutral-100 rounded w-3/4" />
              </div>
            ))
          ) : (
            projects?.map((project, idx) => (
              <div 
                key={project.id} 
                className="group cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Project Card/Image */}
                <div className="playground-card mb-6 md:mb-8 relative aspect-[4/3] overflow-hidden">
                  <div className="playground-card-img-container w-full h-full relative flex items-center justify-center bg-[#F5F5F5] p-12 md:p-20">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="max-w-full max-h-full object-contain grayscale brightness-[0.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                    />
                  </div>
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col gap-3 px-1">
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="text-3xl md:text-4xl font-bold playground-heading tracking-tight">{project.title}</h3>
                  </div>
                  <p className="text-lg opacity-70 leading-relaxed max-w-md">
                    {project.intro}
                  </p>
                  
                  {theme === "theme-jason" && project.tags && project.tags.length > 0 && (
                    <div className="project-tags flex gap-2 flex-wrap">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag text-[10px] tracking-wider py-1 px-3 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  )}

                  {theme !== "theme-jason" && (
                    <>
                      <span className="text-xs md:text-sm font-mono mt-2 playground-accent whitespace-nowrap">{project.domain}</span>
                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 playground-accent">
                        View Case Study <ExternalLink className="w-4 h-4" />
                      </div>
                    </>
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