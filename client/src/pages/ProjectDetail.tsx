import { useQuery } from "@tanstack/react-query";
import { type Project } from "@shared/schema";
import { useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function ProjectDetail() {
  const [match, params] = useRoute("/:slug");
  const [, navigate] = useLocation();
  
  const slug = params?.slug;
  
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/slug/${slug}`],
    enabled: !!slug,
  });

  if (!match) return null;

  const isSoma = slug === 'soma';

  return (
    <div className="playground-root theme-jason min-h-screen selection:bg-current selection:text-white" style={isSoma ? { backgroundColor: '#EFF4FB', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', color: '#1D2C4E' } : {}}>
      {/* Header */}
      <header className="sticky top-0 z-50 py-4" style={isSoma ? { backgroundColor: '#EFF4FB', color: '#1D2C4E' } : { backgroundColor: '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-medium playground-heading tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
            style={isSoma ? { color: '#1D2C4E' } : {}}
          >
            Ruhaus
          </button>
          <nav className="flex gap-8 text-sm font-medium opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity" style={isSoma ? { color: '#1D2C4E' } : {}}>About</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-12 md:pb-20" style={{ paddingTop: 0 }}>
        {isLoading ? (
          <div className="animate-pulse space-y-8">
            <div className="aspect-video bg-neutral-100 rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-neutral-100 rounded w-1/4" />
              <div className="h-4 bg-neutral-100 rounded w-full" />
              <div className="h-4 bg-neutral-100 rounded w-full" />
            </div>
          </div>
        ) : project ? (
          <div className="space-y-12">
            {/* Project Image */}
            <div className={`${isSoma ? '' : 'aspect-video p-8'} bg-[#F5F5F5] rounded-lg overflow-hidden flex items-center justify-center`} style={isSoma ? { width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' } : {}}>
              <img
                src={isSoma ? "/soma-hero.jpg" : project.image}
                alt={project.title}
                className={isSoma ? "w-full h-auto object-contain" : "max-w-full max-h-full object-contain"}
              />
            </div>

            {/* Project Info */}
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className="text-4xl font-semibold playground-heading mb-4" style={isSoma ? { color: '#1D2C4E' } : {}}>
                  {project.title}
                </h1>
                <p className="text-lg leading-relaxed" style={isSoma ? { color: '#1D2C4E', opacity: 0.8 } : { color: '#737373' }}>
                  {project.intro}
                </p>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs tracking-wider py-2 px-4 border rounded-full font-bold uppercase"
                      style={isSoma ? { borderColor: '#1D2C4E', color: '#1D2C4E', opacity: 0.6 } : { borderColor: '#e5e5e5', color: '#a3a3a3' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-6 pt-8 border-t" style={isSoma ? { borderColor: 'rgba(29, 44, 78, 0.1)' } : { borderColor: '#f5f5f5' }}>
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest mb-4" style={isSoma ? { color: '#1D2C4E', opacity: 0.5 } : { color: '#a3a3a3' }}>
                    Domain
                  </h3>
                  <p style={isSoma ? { color: '#1D2C4E' } : { color: '#525252' }}>{project.domain}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-500">Project not found</p>
          </div>
        )}
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
