import React, { useState } from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'Soma',
    category: '#Health #Wellness',
    description: 'An AI-powered wearable ecosystem designed for neurodivergent children aged 6–12, providing a critical window for behavioral support.',
    tags: ['ASD', 'IDENTITY'],
    image: '/__mockup/images/soma-logo.png',
    bgColor: 'bg-rose-100',
    accentColor: 'text-rose-600',
    tagColor: 'bg-rose-200 text-rose-800',
    size: 'large'
  },
  {
    id: 2,
    title: 'Galaxsync',
    category: '#Data #Sci-Fi',
    description: 'Real-time data synchronization visualizer crossing vast digital distances.',
    tags: ['DATA VIZ', 'SYSTEMS'],
    image: '/__mockup/images/galaxsync-logo.png',
    bgColor: 'bg-indigo-100',
    accentColor: 'text-indigo-600',
    tagColor: 'bg-indigo-200 text-indigo-800',
    size: 'small'
  },
  {
    id: 3,
    title: 'Hear Me',
    category: '#Audio #Voice',
    description: 'Next-gen voice interfaces and immersive auditory experiences for creative professionals.',
    tags: ['AI', 'VOICE UX', 'NEW'],
    placeholderIcon: '🎧',
    bgColor: 'bg-amber-100',
    accentColor: 'text-amber-600',
    tagColor: 'bg-amber-200 text-amber-800',
    size: 'small'
  },
  {
    id: 4,
    title: 'YOYO',
    category: '#Play #Interactive',
    description: 'Whimsical digital toys and interactive playgrounds that bring joy to daily routines.',
    tags: ['PRODUCT', 'INTERACTIVE'],
    placeholderIcon: '🪀',
    bgColor: 'bg-emerald-100',
    accentColor: 'text-emerald-600',
    tagColor: 'bg-emerald-200 text-emerald-800',
    size: 'large'
  },
  {
    id: 5,
    title: 'LEARNO',
    category: '#EdTech #Learning',
    description: 'Structured and beautiful educational platforms designed for the curious mind.',
    tags: ['EDTECH', 'UX DESIGN'],
    placeholderIcon: '🧠',
    bgColor: 'bg-sky-100',
    accentColor: 'text-sky-600',
    tagColor: 'bg-sky-200 text-sky-800',
    size: 'large'
  },
  {
    id: 6,
    title: 'Lumina',
    category: '#SmartHome #IoT',
    description: 'Ambient computing and intelligent lighting systems blending seamlessly into spaces.',
    tags: ['IOT', 'AMBIENT'],
    placeholderIcon: '💡',
    bgColor: 'bg-fuchsia-100',
    accentColor: 'text-fuchsia-600',
    tagColor: 'bg-fuchsia-200 text-fuchsia-800',
    size: 'small'
  }
];

export default function PlayfulInnovation() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-rose-200 overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-slate-900/20 transform rotate-3 hover:rotate-6 transition-transform">
              R
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Ruhaus
            </span>
          </motion.div>
          
          <nav>
            <motion.a 
              href="#about"
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition-colors"
            >
              About
            </motion.a>
          </nav>
        </div>
      </header>

      <main className="pt-32 pb-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 md:py-32 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full font-bold text-sm mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Studio for Social Impact
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] text-slate-900 max-w-5xl"
          >
            Design, strategize, and build <span className="text-rose-500 relative inline-block">
              AI-powered experiences
              <svg className="absolute w-full h-4 -bottom-1 left-0 text-rose-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent" strokeLinecap="round" />
              </svg>
            </span> for social impact.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-xl md:text-2xl text-slate-500 font-medium max-w-3xl"
          >
            Exploring the future of human intelligence through playful, innovative product design.
          </motion.p>
        </section>

        {/* Portfolio Grid */}
        <section className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className={`
                  group relative flex flex-col cursor-pointer
                  ${project.size === 'large' ? 'md:col-span-7' : 'md:col-span-5'}
                  ${index % 3 === 1 ? 'md:mt-12' : ''}
                `}
              >
                {/* Image Container */}
                <div className={`
                  relative w-full overflow-hidden rounded-[2rem] md:rounded-[3rem] 
                  ${project.bgColor} mb-6 transition-all duration-500 ease-out
                  ${project.size === 'large' ? 'aspect-[4/3] md:aspect-[16/10]' : 'aspect-square md:aspect-[4/5]'}
                  group-hover:shadow-2xl group-hover:shadow-${project.bgColor.replace('bg-', '').replace('-100', '')}-500/20
                  group-hover:-translate-y-2
                `}>
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    {project.image ? (
                      <motion.img 
                        src={project.image} 
                        alt={project.title}
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.05 : 1,
                          rotate: hoveredProject === project.id ? (index % 2 === 0 ? 2 : -2) : 0
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="max-w-full max-h-full object-contain drop-shadow-xl"
                      />
                    ) : (
                      <motion.div 
                        animate={{ 
                          scale: hoveredProject === project.id ? 1.1 : 1,
                          rotate: hoveredProject === project.id ? (index % 2 === 0 ? 5 : -5) : 0
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`text-8xl md:text-9xl filter drop-shadow-lg ${project.accentColor}`}
                      >
                        {project.placeholderIcon}
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Category Badge overlaying image */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-800 shadow-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-rose-500 transition-colors">
                      {project.title}
                    </h3>
                    
                    {/* Hover Arrow */}
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 font-medium leading-relaxed text-lg max-w-xl">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${project.tagColor}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="max-w-5xl mx-auto px-6 mt-32 md:mt-40">
          <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center flex flex-col items-center relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 relative z-10">
              Ready to build the future?
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl relative z-10">
              Let's collaborate on innovative AI experiences that make a real difference in the world.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-xl shadow-white/10 hover:shadow-white/20 transition-all relative z-10"
            >
              Get in touch 👋
            </motion.button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm">
              R
            </div>
            <span className="font-bold text-slate-900">Ruhaus Studio</span>
          </div>
          
          <p className="text-slate-500 font-medium text-sm text-center">
            © {new Date().getFullYear()} Ruhaus Studio. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            {['TWITTER', 'DRIBBBLE', 'CONTACT'].map((link) => (
              <motion.a 
                key={link}
                href="#" 
                whileHover={{ y: -2 }}
                className="px-4 py-2 bg-white rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 hover:shadow-sm transition-all shadow-slate-200/50"
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}} />
    </div>
  );
}
