import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { Exhibition } from "@shared/schema";

interface FilterBarProps {
  categoryFilter: string;
  exhibitionFilter: string;
  searchQuery: string;
  exhibitions: Exhibition[];
  onCategoryChange: (category: string) => void;
  onExhibitionChange: (exhibition: string) => void;
  onSearchChange: (query: string) => void;
  resultCount: number;
}

export default function FilterBar({
  categoryFilter,
  exhibitionFilter,
  searchQuery,
  exhibitions,
  onCategoryChange,
  onExhibitionChange,
  onSearchChange,
  resultCount,
}: FilterBarProps) {
  const categories = [
    { value: "all", label: "All Artworks" },
    { value: "visual", label: "Visual Arts" },
    { value: "literary", label: "Literary Arts" },
    { value: "applied", label: "Applied Arts" },
    { value: "performance", label: "Performance Arts" },
  ];

  const exhibitionOptions = [
    { value: "all", label: "All Exhibitions" },
    ...exhibitions.map(ex => ({ value: ex.title, label: ex.title })),
  ];

  return (
    <div className="sticky top-[88px] bg-background z-40 py-6 -mx-6 px-6 md:-mx-12 md:px-12 border-b border-border mb-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat.value}
              variant={categoryFilter === cat.value ? "default" : "outline"}
              className="cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2"
              onClick={() => onCategoryChange(cat.value)}
              data-testid={`filter-category-${cat.value}`}
            >
              {cat.label}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {exhibitionOptions.map((ex) => (
            <Badge
              key={ex.value}
              variant={exhibitionFilter === ex.value ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 text-sm hover-elevate active-elevate-2"
              onClick={() => onExhibitionChange(ex.value)}
              data-testid={`filter-exhibition-${ex.value}`}
            >
              {ex.label}
            </Badge>
          ))}
        </div>

        <Input
          type="search"
          placeholder="Search by artist or title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-md"
          data-testid="input-search"
        />

        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {resultCount === 1 ? "1 artwork found" : `${resultCount} artworks found`}
        </div>
      </div>
    </div>
  );
}
