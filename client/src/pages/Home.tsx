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
  const [theme] = useState("theme-jason");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // We only keep the Jason theme now
  const themes = [
    { id: "theme-jason", name: "Jason S.", icon: <ExternalLink className="w-4 h-4" /> },
  ];

  const projects = [
    {
      title: "Hear Me",
      domain: "#Audio #Voice",
      intro: "Next-gen voice interfaces and immersive auditory experiences for creative professionals.",
      image: hearMeImg,
      tags: ["AI", "VOICE UX", "NEW"]
    },
    {
      title: "YOYO",
      domain: "#Play #Interactive",
      intro: "Whimsical digital toys and interactive playgrounds that bring joy to daily routines.",
      image: yoyoImg,
      tags: ["PRODUCT", "INTERACTIVE"]
    },
    {
      title: "LEARNO",
      domain: "#EdTech #Learning",
      intro: "Structured and beautiful educational platforms designed for the curious mind.",
      image: learnoImg,
      tags: ["EDTECH", "UX DESIGN"]
    },
    {
      title: "Galaxsync",
      domain: "#Data #Sci-Fi",
      intro: "Real-time data synchronization visualizer crossing vast digital distances.",
      image: galaxsyncImg,
      tags: ["DATA VIZ", "SYSTEMS"]
    },
    {
      title: "Soma",
      domain: "#Health #Wellness",
      intro: "Mindful applications tracking holistic body health through organic interfaces.",
      image: somaImg,
      tags: ["HEALTH", "IDENTITY"]
    },
    {
      title: "Lumina",
      domain: "#SmartHome #IoT",
      intro: "Ambient computing and intelligent lighting systems blending seamlessly into spaces.",
      image: luminaImg,
      tags: ["IOT", "AMBIENT"]
    },
  ];

  if (!mounted) return null;

  return (
    <div className={`playground-root ${theme} min-h-screen selection:bg-current selection:text-white`}>
      {/* Header */}
      <header className="py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-medium playground-heading tracking-tight">Ruhaus</h1>
          </div>
          <nav className="flex gap-8 text-sm font-medium opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity">Work</a>
            <a href="#" className="hover:opacity-100 transition-opacity">About</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Contact</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        {/* Hero Section */}
        <div className="max-w-3xl mb-24 md:mb-32">
          <h2 className="text-2xl md:text-3xl font-normal playground-heading mb-12 leading-relaxed text-neutral-500">
            Designer, strategist, and builder specializing in <span className="playground-accent italic">AI and voice experiences</span>. 
            Currently building bespoke digital dimensions, exploring the future of personal intelligence. 
            Previously led design on iconic platforms and contributed to global AI efforts.
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer flex flex-col"
            >
              {/* Project Card/Image */}
              <div className="playground-card mb-6 relative aspect-[4/3] overflow-hidden">
                <div className="playground-card-img-container w-full h-full relative flex items-center justify-center bg-[#F5F5F5] p-12 md:p-20">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="max-w-full max-h-full object-contain grayscale brightness-[0.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-in-out"
                  />
                </div>
              </div>
              
              {/* Project Info */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col items-start gap-1">
                  <h3 className="text-lg font-semibold playground-heading">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-500 leading-relaxed max-w-md">
                  {project.intro}
                </p>
                
                {project.tags && (
                  <div className="project-tags flex gap-2 flex-wrap mt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="tag text-[10px] tracking-wider py-1 px-3 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase">{tag}</span>
                    ))}
                  </div>
                )}
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