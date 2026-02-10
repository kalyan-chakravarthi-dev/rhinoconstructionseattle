import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Search, Loader2, ImageIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ROUTES, COMPANY_INFO } from "@/lib/constants";
import { useTranslation } from "react-i18next";
import {
  useGalleryImages,
  useGalleryCategories,
  type GalleryImage,
} from "@/hooks/useGalleryImages";

const PAGE_SIZE = 12;

const RecentProjectsPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data: allImages, isLoading, isError } = useGalleryImages({
    category: selectedCategory || undefined,
  });
  const { data: categories } = useGalleryCategories();

  // Filter by search
  const filteredImages = useMemo(() => {
    if (!allImages) return [];
    if (!searchQuery.trim()) return allImages;

    const q = searchQuery.toLowerCase();
    return allImages.filter(
      (img) =>
        (img.title && img.title.toLowerCase().includes(q)) ||
        (img.description && img.description.toLowerCase().includes(q)) ||
        img.category_display_name.toLowerCase().includes(q)
    );
  }, [allImages, searchQuery]);

  const visibleImages = filteredImages.slice(0, visibleCount);
  const hasMore = visibleCount < filteredImages.length;

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <>
      <Helmet>
        <title>
          {t("recentProjectsPage.heroTitle")} | {COMPANY_INFO.name}
        </title>
        <meta
          name="description"
          content={t("recentProjectsPage.heroSubtitle")}
        />
      </Helmet>

      <div className="min-h-screen">
        <Navbar />
        <main id="main-content">
          {/* Hero */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 lg:py-24">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                {t("recentProjectsPage.heroTitle")}
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-8">
                {t("recentProjectsPage.heroSubtitle")}
              </p>
              <Button variant="default" size="lg" asChild>
                <Link to={ROUTES.REQUEST_QUOTE}>
                  {t("recentProjectsPage.getQuote")}
                </Link>
              </Button>
            </div>
          </section>

          {/* Filters + Content */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              {/* Filter Bar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
                {/* Category Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={
                      selectedCategory === null ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleCategoryChange(null)}
                  >
                    {t("recentProjectsPage.allProjects")}
                  </Button>
                  {categories?.map((cat) => (
                    <Button
                      key={cat.slug}
                      variant={
                        selectedCategory === cat.slug ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => handleCategoryChange(cat.slug)}
                    >
                      {cat.displayName}
                    </Button>
                  ))}
                </div>

                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={t("recentProjectsPage.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Count */}
              {!isLoading && (
                <p className="text-sm text-muted-foreground mb-6">
                  {t("recentProjectsPage.showing")}{" "}
                  <span className="font-semibold">{visibleImages.length}</span>{" "}
                  {t("recentProjectsPage.of")}{" "}
                  <span className="font-semibold">{filteredImages.length}</span>{" "}
                  {t("recentProjectsPage.projects")}
                </p>
              )}

              {/* Loading */}
              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-secondary" />
                </div>
              )}

              {/* Empty State */}
              {!isLoading && filteredImages.length === 0 && (
                <div className="text-center py-20">
                  <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t("recentProjectsPage.noProjects")}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t("recentProjectsPage.noProjectsDesc")}
                  </p>
                  {(searchQuery || selectedCategory) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory(null);
                        setVisibleCount(PAGE_SIZE);
                      }}
                    >
                      {t("recentProjectsPage.clearFilters")}
                    </Button>
                  )}
                </div>
              )}

              {/* Image Grid */}
              {!isLoading && visibleImages.length > 0 && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {visibleImages.map((image) => (
                      <div
                        key={image.id}
                        className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={image.storage_url}
                            alt={image.title || image.drive_file_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                              {image.category_display_name}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 lg:p-5">
                          <h3 className="text-base font-semibold text-foreground line-clamp-1">
                            {image.title || image.drive_file_name}
                          </h3>
                          {image.description && (
                            <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                              {image.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Load More */}
                  {hasMore && (
                    <div className="text-center mt-10">
                      <Button variant="outline" size="lg" onClick={handleLoadMore}>
                        {t("recentProjectsPage.loadMore")}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-primary/5 py-16">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t("recentProjectsPage.ctaTitle")}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                {t("recentProjectsPage.ctaSubtitle")}
              </p>
              <Button variant="default" size="lg" asChild>
                <Link
                  to={ROUTES.REQUEST_QUOTE}
                  className="inline-flex items-center gap-2"
                >
                  {t("recentProjectsPage.requestQuote")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RecentProjectsPage;
