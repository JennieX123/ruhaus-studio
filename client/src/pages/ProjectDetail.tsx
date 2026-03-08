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

  return (
    <div className="playground-root theme-jason min-h-screen selection:bg-current selection:text-white">
      {/* Header */}
      <header className="sticky top-0 bg-white z-50 border-b border-neutral-100 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="text-lg font-medium playground-heading tracking-tight hover:opacity-60 transition-opacity cursor-pointer"
          >
            Ruhaus
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm font-medium opacity-60 hover:opacity-100 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 pt-[0px] pb-[0px]">
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
            <div className="aspect-video bg-[#F5F5F5] rounded-lg overflow-hidden flex items-center justify-center p-8">
              <img
                src={project.image}
                alt={project.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Project Info */}
            <div className="max-w-3xl space-y-8">
              <div>
                <h1 className="text-4xl font-semibold playground-heading mb-4">
                  {project.title}
                </h1>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  {project.intro}
                </p>
              </div>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs tracking-wider py-2 px-4 border border-neutral-200 rounded-full text-neutral-400 font-bold uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-6 pt-8 border-t border-neutral-100">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-4">
                    Domain
                  </h3>
                  <p className="text-neutral-600">{project.domain}</p>
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
