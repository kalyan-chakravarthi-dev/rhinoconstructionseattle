import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import { useRecentProjects } from "@/hooks/useGalleryImages";

const RecentProjects = () => {
  const { t } = useTranslation();
  const { data: projects, isLoading, isError } = useRecentProjects(8);

  // Don't render the section if there's an error or no data after loading
  if (isError) return null;
  if (!isLoading && (!projects || projects.length === 0)) return null;

  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            {t("recentProjects.label")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {t("recentProjects.title")}
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl">
            {t("recentProjects.subtitle")}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-secondary" />
          </div>
        )}

        {/* Project Grid */}
        {!isLoading && projects && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.storage_url}
                    alt={project.title || project.drive_file_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                      {project.category_display_name}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-4 lg:p-5">
                  <h3 className="text-base font-semibold text-foreground line-clamp-1">
                    {project.title || project.drive_file_name}
                  </h3>
                  {project.description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {!isLoading && projects && projects.length > 0 && (
          <div className="text-center">
            <Button variant="default" size="lg" asChild>
              <Link
                to={ROUTES.RECENT_PROJECTS}
                className="inline-flex items-center gap-2"
              >
                {t("recentProjects.viewAll")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentProjects;
