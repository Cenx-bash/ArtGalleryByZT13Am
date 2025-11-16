import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Exhibition } from "@shared/schema";

interface ExhibitionsCarouselProps {
  exhibitions: Exhibition[];
}

export default function ExhibitionsCarousel({ exhibitions }: ExhibitionsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 450;
    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-12 relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {exhibitions.map((exhibition) => (
          <article
            key={exhibition.id}
            className="flex-shrink-0 w-[400px] bg-card rounded-md overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-lg snap-start"
            data-testid={`card-exhibition-${exhibition.id}`}
          >
            <img
              src={exhibition.imageUrl}
              alt={`${exhibition.title} exhibition`}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-medium mb-3">{exhibition.title}</h3>
              <p className="text-primary font-medium text-sm mb-2">{exhibition.dates}</p>
              <p className="text-sm opacity-70">{exhibition.venue}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          size="icon"
          variant="default"
          onClick={() => scroll("left")}
          className="rounded-full"
          aria-label="Previous exhibition"
          data-testid="button-carousel-prev"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          size="icon"
          variant="default"
          onClick={() => scroll("right")}
          className="rounded-full"
          aria-label="Next exhibition"
          data-testid="button-carousel-next"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
