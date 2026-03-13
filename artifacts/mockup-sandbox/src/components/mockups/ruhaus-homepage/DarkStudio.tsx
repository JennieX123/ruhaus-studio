import React from 'react';

const projects = [
  {
    id: 'soma',
    title: 'Soma',
    intro: 'An AI-powered wearable ecosystem designed for neurodivergent children aged 6–12, providing a critical window for behavioral support.',
    tags: ['ASD', 'IDENTITY'],
    image: '/__mockup/images/soma-logo.png',
    placeholderColor: 'from-blue-500/20 to-purple-500/20',
    icon: 'S'
  },
  {
    id: 'galaxsync',
    title: 'Galaxsync',
    intro: 'Real-time data synchronization visualizer crossing vast digital distances.',
    tags: ['DATA VIZ', 'SYSTEMS'],
    image: '/__mockup/images/galaxsync-logo.png',
    placeholderColor: 'from-emerald-500/20 to-teal-500/20',
    icon: 'G'
  },
  {
    id: 'hearme',
    title: 'Hear Me',
    intro: 'Next-gen voice interfaces and immersive auditory experiences for creative professionals.',
    tags: ['AI', 'VOICE UX', 'NEW'],
    placeholderColor: 'from-amber-500/20 to-orange-500/20',
    icon: 'H'
  },
  {
    id: 'yoyo',
    title: 'YOYO',
    intro: 'Whimsical digital toys and interactive playgrounds that bring joy to daily routines.',
    tags: ['PRODUCT', 'INTERACTIVE'],
    placeholderColor: 'from-pink-500/20 to-rose-500/20',
    icon: 'Y'
  },
  {
    id: 'learno',
    title: 'LEARNO',
    intro: 'Structured and beautiful educational platforms designed for the curious mind.',
    tags: ['EDTECH', 'UX DESIGN'],
    placeholderColor: 'from-cyan-500/20 to-blue-500/20',
    icon: 'L'
  },
  {
    id: 'lumina',
    title: 'Lumina',
    intro: 'Ambient computing and intelligent lighting systems blending seamlessly into spaces.',
    tags: ['IOT', 'AMBIENT'],
    placeholderColor: 'from-yellow-500/20 to-amber-500/20',
    icon: 'L'
  }
];

export default function DarkStudio() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-200 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Header */}
      <header className="sticky top-0 z-50 py-6 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-xl font-medium tracking-tight text-white cursor-pointer hover:text-amber-400 transition-colors">
              Ruhaus
            </span>
          </div>
          <nav className="flex gap-8 text-sm font-medium text-neutral-400">
            <a href="#" className="hover:text-amber-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <div className="max-w-4xl mb-20 md:mb-32">
          <h2 className="text-2xl md:text-4xl font-light tracking-tight mb-6 leading-tight text-neutral-400">
            Design, strategize, and build <span className="text-white italic font-serif">AI-powered experiences for social impact</span>, exploring the future of human intelligence.
          </h2>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer flex flex-col"
            >
              {/* Project Card/Image */}
              <div className="mb-6 relative aspect-[4/3] overflow-hidden rounded-sm bg-[#111118] border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-amber-500/30 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 ease-out opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                  />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${project.placeholderColor} opacity-40 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700`}>
                    <span className="text-8xl font-serif text-white/20 group-hover:text-white/40 transition-colors duration-700">
                      {project.icon}
                    </span>
                  </div>
                )}
                
                {/* Overlay content on hover */}
                <div className="absolute bottom-0 left-0 p-8 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="text-amber-400 text-sm tracking-widest uppercase mb-2">View Project</div>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="flex flex-col gap-3 px-2">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-medium text-white group-hover:text-amber-400 transition-colors">{project.title}</h3>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  {project.intro}
                </p>
                
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] tracking-widest py-1 px-2 bg-white/5 border border-white/10 rounded text-neutral-300 font-mono uppercase group-hover:border-amber-500/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Ruhaus Studio. All rights reserved.</p>
          <div className="flex gap-8 font-mono tracking-widest text-xs">
            <a href="#" className="hover:text-amber-400 transition-colors">TWITTER</a>
            <a href="#" className="hover:text-amber-400 transition-colors">DRIBBBLE</a>
            <a href="#" className="hover:text-amber-400 transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}