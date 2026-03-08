import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function GalaxsyncDetail() {
  const [, navigate] = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const fadeInUp = "transition-all duration-700 ease-out";
  const hoverScale = "hover:scale-105 transition-transform duration-300";

  return (
    <div className="playground-root theme-jason min-h-screen selection:bg-current selection:text-white" style={{ backgroundColor: '#FEF5E4' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-100 py-4" style={{ backgroundColor: '#FEF5E4' }}>
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
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 pt-[0px] pb-[0px]">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className={`space-y-8 ${fadeInUp}`}>
            <div className="aspect-video bg-[#F5F5F5] rounded-lg overflow-hidden flex items-center justify-center p-8">
              <img src="/galaxsync-logo.png" alt="Galaxsync Logo" className="max-w-full max-h-full object-contain" />
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
          <div className={`space-y-8 ${fadeInUp}`} style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold playground-heading">Problem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`p-8 bg-neutral-50 rounded-lg border border-neutral-100 ${hoverScale}`}>
                <h3 className="font-semibold text-lg mb-4">Empty-Nest Seniors</h3>
                <ul className="space-y-2 text-neutral-600 text-sm">
                  <li>• 200M seniors living alone worldwide</li>
                  <li>• Lifetimes of wisdom and rich personal histories</li>
                  <li>• Decreasing social interaction and isolation</li>
                  <li>• Seeking meaningful connection and purpose</li>
                </ul>
              </div>

              <div className={`p-8 bg-neutral-50 rounded-lg border border-neutral-100 ${hoverScale}`}>
                <h3 className="font-semibold text-lg mb-4">Children with ADHD</h3>
                <ul className="space-y-2 text-neutral-600 text-sm">
                  <li>• 366M children globally struggle with attention</li>
                  <li>• High energy and fragmented focus</li>
                  <li>• Often misunderstood for their intensity</li>
                  <li>• Thrive in immersive, structured environments</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Solution Overview */}
          <div className={`space-y-8 ${fadeInUp}`} style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-semibold playground-heading">Solution</h2>
            <div className="p-12 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-lg border border-neutral-100">
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                The gap could be bridged. Two generations could be connected.
              </p>
              <p className="text-2xl font-semibold playground-heading text-neutral-800">
                Elders preserve real-life memories as digital assets, which are processed by AI into interactive story-based games for intergenerational engagement.
              </p>
            </div>
          </div>

          {/* Solution Components */}
          <div className={`space-y-12 ${fadeInUp}`} style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold playground-heading">Key Features</h2>

            <div className={`p-8 border-l-4 border-neutral-300 bg-neutral-50 rounded-r-lg ${hoverScale}`}>
              <h3 className="font-semibold text-lg mb-3">The Six-Realm Galaxy</h3>
              <p className="text-neutral-600">
                The Galaxsync Galaxy is generated entirely from the elders' diverse life stories. This VR universe features six cognitive realms, each covering vast diversity to ensure every ADHD child can discover stories that spark their unique interests.
              </p>
            </div>

            <div className={`p-8 border-l-4 border-neutral-300 bg-neutral-50 rounded-r-lg ${hoverScale}`}>
              <h3 className="font-semibold text-lg mb-3">Dunhuang Planet & Cosmic Mentor</h3>
              <p className="text-neutral-600 mb-4">
                Take the Dunhuang Planet as example. Here, the senior creator acts as a "Cosmic Mentor." Through real-time communication and gentle on-site check-ins, they provide essential encouragement and guidance. Their presence ensures the ADHD student completes their artistic journey with consistent emotional support and care.
              </p>
            </div>

            <div className={`p-8 border-l-4 border-neutral-300 bg-neutral-50 rounded-r-lg ${hoverScale}`}>
              <h3 className="font-semibold text-lg mb-3">Precision Biometric Guidance</h3>
              <p className="text-neutral-600">
                Galaxsync utilizes eye-monitoring technology to detect distraction in real-time. When the child's attention begins to drift, the environment responds with a brief, calming interaction that supports a natural return to focus.
              </p>
            </div>

            <div className={`p-8 border-l-4 border-neutral-300 bg-neutral-50 rounded-r-lg ${hoverScale}`}>
              <h3 className="font-semibold text-lg mb-3">The Story Echo</h3>
              <p className="text-neutral-600">
                After kids finish the stories, through story echo, we replace traditional scores with world-centric digital rewards, where the environment visibly heals and blooms, to validate their impact and build lasting confidence.
              </p>
            </div>

            <div className={`p-8 border-l-4 border-neutral-300 bg-neutral-50 rounded-r-lg ${hoverScale}`}>
              <h3 className="font-semibold text-lg mb-3">My Constellation & Elder Dashboard</h3>
              <p className="text-neutral-600">
                Elders review story planets showing ADHD child interactions. Each session layers child's data onto the narrative, creating a co-created living memory legacy. Elders can view dynamic summaries of each child's exploration—their highlights, progress, and moments of achievement.
              </p>
            </div>
          </div>

          {/* Impact Section */}
          <div className={`space-y-8 ${fadeInUp}`} style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold playground-heading">Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className={`p-8 bg-neutral-50 rounded-lg border border-neutral-100 ${hoverScale}`}>
                <h3 className="font-semibold text-lg mb-4">Reduced Isolation</h3>
                <p className="text-neutral-600 text-sm">
                  Sharing stories gives elders purpose and connection, transforming memories into meaningful contribution and intergenerational bonds.
                </p>
              </div>

              <div className={`p-8 bg-neutral-50 rounded-lg border border-neutral-100 ${hoverScale}`}>
                <h3 className="font-semibold text-lg mb-4">Meaningful Connection</h3>
                <p className="text-neutral-600 text-sm">
                  Children and elders co-create stories together, building emotional bonds across generations and creating shared narratives of growth.
                </p>
              </div>

              <div className={`p-8 bg-neutral-50 rounded-lg border border-neutral-100 ${hoverScale}`}>
                <h3 className="font-semibold text-lg mb-4">ADHD Growth Reflection</h3>
                <p className="text-neutral-600 text-sm">
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
  );
}
