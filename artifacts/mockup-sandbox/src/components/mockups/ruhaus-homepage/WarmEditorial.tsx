import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Soma",
    category: "#Health #Wellness",
    intro: "An AI-powered wearable ecosystem designed for neurodivergent children aged 6–12, providing a critical window for behavioral support.",
    tags: ["ASD", "IDENTITY"],
    image: "/__mockup/images/soma-logo.png",
    color: "bg-[#EAE4D9]"
  },
  {
    id: 2,
    title: "Galaxsync",
    category: "#Data #Sci-Fi",
    intro: "Real-time data synchronization visualizer crossing vast digital distances.",
    tags: ["DATA VIZ", "SYSTEMS"],
    image: "/__mockup/images/galaxsync-logo.png",
    color: "bg-[#D9E2EA]"
  },
  {
    id: 3,
    title: "Hear Me",
    category: "#Audio #Voice",
    intro: "Next-gen voice interfaces and immersive auditory experiences for creative professionals.",
    tags: ["AI", "VOICE UX", "NEW"],
    image: null,
    color: "bg-[#E6DCD1]"
  },
  {
    id: 4,
    title: "YOYO",
    category: "#Play #Interactive",
    intro: "Whimsical digital toys and interactive playgrounds that bring joy to daily routines.",
    tags: ["PRODUCT", "INTERACTIVE"],
    image: null,
    color: "bg-[#DDE5D9]"
  },
  {
    id: 5,
    title: "LEARNO",
    category: "#EdTech #Learning",
    intro: "Structured and beautiful educational platforms designed for the curious mind.",
    tags: ["EDTECH", "UX DESIGN"],
    image: null,
    color: "bg-[#EBE2E4]"
  },
  {
    id: 6,
    title: "Lumina",
    category: "#SmartHome #IoT",
    intro: "Ambient computing and intelligent lighting systems blending seamlessly into spaces.",
    tags: ["IOT", "AMBIENT"],
    image: null,
    color: "bg-[#E3E0D8]"
  }
];

export default function WarmEditorial() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#3D3531] selection:bg-[#E8E0D5] selection:text-[#2D2521] font-sans antialiased overflow-x-hidden">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Lora:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500&display=swap');
        
        .font-serif-display {
          font-family: 'Playfair Display', serif;
        }
        
        .font-serif-body {
          font-family: 'Lora', serif;
        }
        
        .font-sans-clean {
          font-family: 'Inter', sans-serif;
        }

        .warm-shadow {
          box-shadow: 0 10px 40px -10px rgba(100, 80, 70, 0.08);
        }
        
        .warm-shadow-hover:hover {
          box-shadow: 0 20px 40px -10px rgba(100, 80, 70, 0.15);
        }
        
        .warm-border {
          border: 1px solid rgba(130, 110, 100, 0.15);
        }
      `}} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#3D3531]/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-24 flex justify-between items-center">
          <a href="#" className="font-serif-display text-2xl lg:text-3xl font-semibold tracking-tight hover:opacity-70 transition-opacity">
            Ruhaus
          </a>
          <nav className="hidden sm:flex gap-10">
            <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.2em] font-medium hover:text-[#8C7A6B] transition-colors">About</a>
            <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.2em] font-medium hover:text-[#8C7A6B] transition-colors">Work</a>
            <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.2em] font-medium hover:text-[#8C7A6B] transition-colors">Studio</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 lg:pt-32 pb-24 lg:pb-40">
          <div className="max-w-4xl">
            <p className="font-sans-clean text-sm uppercase tracking-[0.2em] text-[#8C7A6B] mb-8 lg:mb-12 font-medium">A Design Studio</p>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-7xl leading-[1.1] text-[#2D2521] font-medium">
              Design, strategize, and build <span className="italic text-[#8C7A6B]">AI-powered experiences</span> for social impact, exploring the future of human intelligence.
            </h1>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-end mb-16 border-b border-[#3D3531]/10 pb-6">
            <h2 className="font-serif-display text-3xl font-medium">Selected Works</h2>
            <p className="font-sans-clean text-xs uppercase tracking-[0.1em] text-[#8C7A6B]">2022 — 2024</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
            {projects.map((project, index) => (
              <a 
                key={project.id} 
                href="#"
                className={`group flex flex-col block ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
              >
                {/* Project Image/Card */}
                <div className="relative mb-8 overflow-hidden rounded-[2px] warm-border bg-[#F5F2EC] aspect-[4/3] sm:aspect-[3/2] warm-shadow transition-all duration-700 ease-out warm-shadow-hover group-hover:-translate-y-2">
                  <div className="absolute inset-0 bg-[#3D3531]/0 group-hover:bg-[#3D3531]/5 transition-colors duration-500 z-10 pointer-events-none" />
                  
                  {project.image ? (
                    <div className="w-full h-full flex items-center justify-center p-12 lg:p-24 relative overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="max-w-full max-h-full object-contain relative z-0 transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center p-12 lg:p-24 ${project.color} transition-transform duration-1000 ease-out group-hover:scale-105`}>
                      <span className="font-serif-display text-6xl text-[#3D3531]/20 italic">{project.title.charAt(0)}</span>
                    </div>
                  )}
                </div>
                
                {/* Project Info */}
                <div className="flex flex-col flex-1 pl-2 border-l border-[#3D3531]/20 transition-colors duration-300 group-hover:border-[#8C7A6B]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif-display text-2xl md:text-3xl font-medium text-[#2D2521] group-hover:text-[#8C7A6B] transition-colors">{project.title}</h3>
                    <div className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-[#8C7A6B]">
                      <ArrowRight size={20} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  <p className="font-serif-body text-base lg:text-lg text-[#5D524A] leading-relaxed mb-6 max-w-lg">
                    {project.intro}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="font-sans-clean text-[10px] tracking-[0.15em] text-[#8C7A6B] uppercase font-semibold relative after:content-[''] after:absolute after:-right-2.5 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-1 after:bg-[#3D3531]/20 after:rounded-full last:after:hidden"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#EFECE5] py-20 lg:py-32 border-t warm-border mt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-8">
            <div className="max-w-md">
              <h2 className="font-serif-display text-4xl mb-6">Let's build something enduring.</h2>
              <a href="mailto:hello@ruhaus.studio" className="font-sans-clean text-sm uppercase tracking-[0.2em] border-b border-[#3D3531]/30 pb-1 hover:border-[#3D3531] hover:text-[#8C7A6B] transition-all">hello@ruhaus.studio</a>
            </div>
            
            <div className="flex flex-col md:items-end gap-12">
              <div className="flex gap-8">
                <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.15em] hover:text-[#8C7A6B] transition-colors">Twitter</a>
                <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.15em] hover:text-[#8C7A6B] transition-colors">Dribbble</a>
                <a href="#" className="font-sans-clean text-xs uppercase tracking-[0.15em] hover:text-[#8C7A6B] transition-colors">Contact</a>
              </div>
              <p className="font-sans-clean text-xs text-[#8C7A6B] uppercase tracking-[0.1em]">
                © {new Date().getFullYear()} Ruhaus Studio. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
