import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Search,
  Star,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  ChevronRight,
  Phone,
  X,
  ArrowRight,
  Hammer,
} from "lucide-react";

// Import existing before/after images
import kitchenBefore from "@/assets/kitchen-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpg";
import bathroomBefore from "@/assets/bathroom-before.jpg";
import bathroomAfter from "@/assets/bathroom-after.jpg";
import roofBefore from "@/assets/roof-before.jpg";
import roofAfter from "@/assets/roof-after.jpg";

interface Project {
  id: string;
  title: string;
  location: string;
  serviceType: string;
  serviceCategoryId: string;
  completionDate: string;
  duration: string;
  budgetRange?: string;
  description: string;
  features: string[];
  beforeImage: string;
  afterImage: string;
  testimonial?: {
    rating: number;
    quote: string;
    customerName: string;
  };
  gallery?: string[];
  materials?: string[];
  timeline?: string[];
}

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Modern Kitchen Transformation",
    location: "Seattle, WA",
    serviceType: "Kitchen Remodeling",
    serviceCategoryId: "kitchen",
    completionDate: "January 2024",
    duration: "3 weeks",
    budgetRange: "$15,000 - $20,000",
    description:
      "Complete transformation of an outdated 1980s kitchen into a stunning modern culinary space. This project included custom cabinetry, premium quartz countertops, and state-of-the-art appliances.",
    features: ["New cabinets", "Quartz countertops", "Hardwood floors", "Under-cabinet lighting"],
    beforeImage: kitchenBefore,
    afterImage: kitchenAfter,
    testimonial: {
      rating: 5,
      quote: "Exceeded our expectations! The team was professional and the results are stunning.",
      customerName: "Jennifer M.",
    },
    materials: ["Custom maple cabinets", "Calacatta quartz countertops", "Stainless steel appliances"],
    timeline: ["Week 1: Demolition and prep", "Week 2: Cabinet and countertop installation", "Week 3: Finishing touches"],
  },
  {
    id: "2",
    title: "Spa-Like Bathroom Retreat",
    location: "Bellevue, WA",
    serviceType: "Bathroom Renovation",
    serviceCategoryId: "bathroom",
    completionDate: "December 2023",
    duration: "2 weeks",
    budgetRange: "$12,000 - $18,000",
    description:
      "Transformed an outdated pink tile bathroom into a serene spa-like retreat with modern fixtures, heated floors, and a walk-in rain shower.",
    features: ["Walk-in shower", "Heated floors", "Double vanity", "LED mirrors"],
    beforeImage: bathroomBefore,
    afterImage: bathroomAfter,
    testimonial: {
      rating: 5,
      quote: "Beautiful work, professional team. Our bathroom feels like a luxury spa now!",
      customerName: "David & Sarah K.",
    },
    materials: ["Marble tile", "Kohler fixtures", "Custom glass shower enclosure"],
    timeline: ["Week 1: Demolition and plumbing", "Week 2: Tile and fixture installation"],
  },
  {
    id: "3",
    title: "Complete Roof Replacement",
    location: "Redmond, WA",
    serviceType: "Roofing Services",
    serviceCategoryId: "roofing",
    completionDate: "November 2023",
    duration: "4 days",
    budgetRange: "$8,000 - $12,000",
    description:
      "Full tear-off and replacement of damaged asphalt shingles with premium architectural shingles, including new underlayment and improved ventilation.",
    features: ["Architectural shingles", "New gutters", "Improved ventilation", "50-year warranty"],
    beforeImage: roofBefore,
    afterImage: roofAfter,
    testimonial: {
      rating: 5,
      quote: "No more leaks! Fast, efficient work and great communication throughout.",
      customerName: "Robert T.",
    },
    materials: ["GAF Timberline HDZ shingles", "Synthetic underlayment", "Ridge vent system"],
    timeline: ["Day 1-2: Tear-off and prep", "Day 3-4: New roof installation"],
  },
  {
    id: "4",
    title: "Basement Living Space",
    location: "Kirkland, WA",
    serviceType: "General Repairs",
    serviceCategoryId: "repairs",
    completionDate: "October 2023",
    duration: "6 weeks",
    budgetRange: "$35,000 - $45,000",
    description:
      "Converted an unfinished concrete basement into a beautiful living space with a home theater, wet bar, and guest bedroom.",
    features: ["Home theater", "Wet bar", "Guest bedroom", "Full bathroom"],
    beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    testimonial: {
      rating: 5,
      quote: "Added so much value to our home. The space is incredible!",
      customerName: "Michael P.",
    },
    materials: ["LVP flooring", "Drywall and insulation", "Recessed lighting"],
    timeline: ["Weeks 1-2: Framing and electrical", "Weeks 3-4: Drywall and paint", "Weeks 5-6: Flooring and finishing"],
  },
  {
    id: "5",
    title: "Premium Composite Deck",
    location: "Renton, WA",
    serviceType: "General Repairs",
    serviceCategoryId: "repairs",
    completionDate: "September 2023",
    duration: "10 days",
    budgetRange: "$18,000 - $25,000",
    description:
      "Removed old rotting wood deck and built a stunning new composite deck with built-in seating and cable railings for unobstructed views.",
    features: ["Composite decking", "Built-in seating", "Cable railings", "LED deck lighting"],
    beforeImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    testimonial: {
      rating: 5,
      quote: "Perfect for entertaining! Our neighbors are so jealous.",
      customerName: "Amanda & Chris L.",
    },
    materials: ["Trex composite decking", "Aluminum cable railings", "Concrete footings"],
    timeline: ["Days 1-3: Demolition and prep", "Days 4-7: Framing and decking", "Days 8-10: Railings and finishing"],
  },
  {
    id: "6",
    title: "Full Exterior Refresh",
    location: "Tacoma, WA",
    serviceType: "Painting",
    serviceCategoryId: "painting",
    completionDate: "August 2023",
    duration: "1 week",
    budgetRange: "$6,000 - $9,000",
    description:
      "Complete exterior painting including power washing, wood repair, priming, and two coats of premium exterior paint in modern colors.",
    features: ["Power washing", "Wood repair", "Premium paint", "10-year warranty"],
    beforeImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    testimonial: {
      rating: 5,
      quote: "Looks brand new! Amazing transformation for a great price.",
      customerName: "Lisa W.",
    },
    materials: ["Sherwin-Williams Duration paint", "Premium primer", "Behr Deckover for deck"],
    timeline: ["Days 1-2: Prep and washing", "Days 3-5: Priming and painting", "Days 6-7: Touch-ups and cleanup"],
  },
];

const serviceCategories = [
  { id: "all", name: "All Projects" },
  { id: "kitchen", name: "Kitchen Remodeling" },
  { id: "bathroom", name: "Bathroom Renovation" },
  { id: "roofing", name: "Roofing" },
  { id: "electrical", name: "Electrical" },
  { id: "plumbing", name: "Plumbing" },
  { id: "painting", name: "Painting" },
  { id: "repairs", name: "Other Repairs" },
];

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "budget-high", label: "Highest Budget" },
  { value: "budget-low", label: "Lowest Budget" },
];

const BeforeAfterGalleryPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const filteredProjects = useMemo(() => {
    let filtered = [...sampleProjects];

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.serviceCategoryId === selectedCategory);
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.serviceType.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case "oldest":
        filtered.reverse();
        break;
      case "budget-high":
        filtered.sort((a, b) => {
          const aMax = parseInt(a.budgetRange?.split("-")[1]?.replace(/\D/g, "") || "0");
          const bMax = parseInt(b.budgetRange?.split("-")[1]?.replace(/\D/g, "") || "0");
          return bMax - aMax;
        });
        break;
      case "budget-low":
        filtered.sort((a, b) => {
          const aMin = parseInt(a.budgetRange?.split("-")[0]?.replace(/\D/g, "") || "0");
          const bMin = parseInt(b.budgetRange?.split("-")[0]?.replace(/\D/g, "") || "0");
          return aMin - bMin;
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleProjects);
  const hasMore = visibleProjects < filteredProjects.length;

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main id="main-content">
      {/* Hero Header */}
      <section className="relative bg-primary py-20 px-4">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=600&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Our Work Speaks For Itself
          </h1>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Browse our completed projects and see the Rhino Remodeler difference
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/request-quote">
              Get Your Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-0 z-30 bg-background border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {serviceCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="transition-all duration-200"
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects by location or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <p className="text-sm text-muted-foreground">
          Showing {displayedProjects.length} of {filteredProjects.length} projects
        </p>
      </section>

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <Hammer className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Image Comparison */}
                  <ImageComparisonSlider
                    beforeImage={project.beforeImage}
                    afterImage={project.afterImage}
                    className="aspect-[4/3]"
                  />

                  {/* Project Info */}
                  <div className="p-5 space-y-4">
                    {/* Title and Location */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {project.serviceType}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {project.completionDate}
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {project.duration}
                      </span>
                    </div>

                    {project.budgetRange && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4" />
                        <span>{project.budgetRange}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {project.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 3 && (
                        <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                          +{project.features.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Testimonial */}
                    {project.testimonial && (
                      <div className="bg-muted/50 rounded-lg p-3">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(project.testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3 fill-secondary text-secondary"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic line-clamp-2">
                          "{project.testimonial.quote}"
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          — {project.testimonial.customerName}
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => setSelectedProject(project)}
                      >
                        View Full Project
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                      <Button asChild size="sm" className="flex-1">
                        <Link to="/request-quote">Get Similar Quote</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" onClick={loadMore}>
                  Load More Projects
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Home?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8">
            Let's discuss your project and create something amazing together
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link to="/request-quote">
                Request Your Free Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-primary-foreground">
              <span>Or call us:</span>
              <a
                href="tel:+12065557446"
                className="flex items-center gap-2 font-semibold hover:underline"
              >
                <Phone className="w-5 h-5" />
                (206) 555-RHINO
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl pr-8">{selectedProject.title}</DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Large Comparison */}
                <ImageComparisonSlider
                  beforeImage={selectedProject.beforeImage}
                  afterImage={selectedProject.afterImage}
                  className="aspect-video rounded-lg"
                />

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedProject.completionDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedProject.duration}</span>
                  </div>
                  {selectedProject.budgetRange && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedProject.budgetRange}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Project Description</h4>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Key Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                {selectedProject.materials && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Materials Used</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      {selectedProject.materials.map((material) => (
                        <li key={material}>{material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Timeline */}
                {selectedProject.timeline && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Project Timeline</h4>
                    <div className="space-y-2">
                      {selectedProject.timeline.map((step, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonial */}
                {selectedProject.testimonial && (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(selectedProject.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-foreground italic mb-2">
                      "{selectedProject.testimonial.quote}"
                    </blockquote>
                    <p className="text-sm text-muted-foreground">
                      — {selectedProject.testimonial.customerName}
                    </p>
                  </div>
                )}

                {/* CTA */}
                <div className="flex gap-4 pt-4 border-t">
                  <Button asChild className="flex-1">
                    <Link to="/request-quote">Request Similar Project</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedProject(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BeforeAfterGalleryPage;
