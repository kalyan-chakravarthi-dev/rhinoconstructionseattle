import { useState, useRef, useCallback } from "react";
import { ArrowRight, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import images
import kitchenBefore from "@/assets/kitchen-before.jpg";
import kitchenAfter from "@/assets/kitchen-after.jpg";
import bathroomBefore from "@/assets/bathroom-before.jpg";
import bathroomAfter from "@/assets/bathroom-after.jpg";
import roofBefore from "@/assets/roof-before.jpg";
import roofAfter from "@/assets/roof-after.jpg";

const projects = [
  {
    id: 1,
    title: "Kitchen Remodel",
    location: "Seattle, WA",
    beforeImage: kitchenBefore,
    afterImage: kitchenAfter,
    description: "Complete transformation with modern cabinets, quartz countertops, and premium appliances.",
  },
  {
    id: 2,
    title: "Bathroom Renovation",
    location: "Bellevue, WA",
    beforeImage: bathroomBefore,
    afterImage: bathroomAfter,
    description: "Spa-like retreat with frameless shower, floating vanity, and marble accents.",
  },
  {
    id: 3,
    title: "Roof Replacement",
    location: "Redmond, WA",
    beforeImage: roofBefore,
    afterImage: roofAfter,
    description: "New architectural shingles with improved ventilation and 30-year warranty.",
  },
];

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

const ComparisonSlider = ({ beforeImage, afterImage, title }: ComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percent);
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden rounded-xl cursor-ew-resize select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${title} - After`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${title} - Before`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg cursor-ew-resize z-10"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary-foreground rounded-full shadow-lg flex items-center justify-center border-2 border-secondary">
          <GripVertical className="w-5 h-5 text-secondary" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-foreground/80 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
        BEFORE
      </div>
      <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
        AFTER
      </div>
    </div>
  );
};

const BeforeAfterGallery = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Work Speaks For Itself
          </h2>
          <p className="text-muted-foreground text-lg lg:text-xl">
            See the Rhino Construction difference
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-border"
            >
              {/* Comparison Slider */}
              <ComparisonSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={project.title}
              />

              {/* Project Info */}
              <div className="p-5 lg:p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {project.location}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Instruction Text */}
        <p className="text-center text-muted-foreground text-sm mb-8">
          <span className="inline-flex items-center gap-2">
            <GripVertical className="w-4 h-4" />
            Drag the slider to compare before and after
          </span>
        </p>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="default" size="lg" asChild>
            <a href="/before-after" className="inline-flex items-center gap-2">
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterGallery;
