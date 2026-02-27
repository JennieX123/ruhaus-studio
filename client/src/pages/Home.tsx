import { useState, useEffect } from "react";
import { BookOpen, Database, Square, Zap, ArrowRight, ExternalLink } from "lucide-react";

// We will use the images generated in the parallel step
import hearMeImg from "@/assets/images/project-hearme.png";
import yoyoImg from "@/assets/images/project-yoyo.png";
import learnoImg from "@/assets/images/project-learno.png";
import galaxsyncImg from "@/assets/images/project-galaxsync.png";
import somaImg from "@/assets/images/project-soma.png";
import luminaImg from "@/assets/images/project-lumina.png";

export default function Home() {
  const [theme, setTheme] = useState("theme-minimal");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const themes = [
    { id: "theme-notebook", name: "NotebookLM", icon: <BookOpen className="w-4 h-4" /> },
    { id: "theme-palantir", name: "Palantir", icon: <Database className="w-4 h-4" /> },
    { id: "theme-minimal", name: "Minimalist", icon: <Square className="w-4 h-4" /> },
    { id: "theme-neobrutalism", name: "Neo-Brutalism", icon: <Zap className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "Hear Me",
      domain: "#Audio #Voice",
      intro: "Next-gen voice interfaces and immersive auditory experiences for creative professionals.",
      image: hearMeImg,
    },
    {
      title: "YOYO",
      domain: "#Play #Interactive",
      intro: "Whimsical digital toys and interactive playgrounds that bring joy to daily routines.",
      image: yoyoImg,
    },
    {
      title: "LEARNO",
      domain: "#EdTech #Learning",
      intro: "Structured and beautiful educational platforms designed for the curious mind.",
      image: learnoImg,
    },
    {
      title: "Galaxsync",
      domain: "#Data #Sci-Fi",
      intro: "Real-time data synchronization visualizer crossing vast digital distances.",
      image: galaxsyncImg,
    },
    {
      title: "Soma",
      domain: "#Health #Wellness",
      intro: "Mindful applications tracking holistic body health through organic interfaces.",
      image: somaImg,
    },
    {
      title: "Lumina",
      domain: "#SmartHome #IoT",
      intro: "Ambient computing and intelligent lighting systems blending seamlessly into spaces.",
      image: luminaImg,
    },
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
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer flex flex-col animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              {/* Project Card/Image */}
              <div className="playground-card mb-6 md:mb-8 relative aspect-[4/3] transform transition-transform duration-500 hover:-translate-y-2">
                <div className="playground-card-img-container w-full h-full relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white text-black p-4 rounded-full shadow-2xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-out">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-3xl md:text-4xl font-bold playground-heading tracking-tight">{project.title}</h3>
                  <span className="text-xs md:text-sm font-mono mt-2 playground-accent whitespace-nowrap">{project.domain}</span>
                </div>
                <p className="text-lg opacity-70 leading-relaxed max-w-md">
                  {project.intro}
                </p>
                
                <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 playground-accent">
                  View Case Study <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
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