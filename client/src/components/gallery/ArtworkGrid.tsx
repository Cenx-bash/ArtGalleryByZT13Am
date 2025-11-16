import { Badge } from "@/components/ui/badge";
import type { Artwork, Artist } from "@shared/schema";

interface ArtworkGridProps {
  artworks: Artwork[];
  artists: Artist[];
  onArtworkClick: (id: string) => void;
}

const categoryLabels: Record<string, string> = {
  visual: "Visual Arts",
  literary: "Literary Arts",
  applied: "Applied Arts",
  performance: "Performance Arts",
};

export default function ArtworkGrid({ artworks, artists, onArtworkClick }: ArtworkGridProps) {
  const getArtistName = (artistId: string) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist?.name || "Unknown Artist";
  };

  if (artworks.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground">No artworks match your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
      {artworks.map((artwork, index) => (
        <article
          key={artwork.id}
          className="group cursor-pointer rounded-md overflow-hidden bg-card hover:-translate-y-1 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4"
          onClick={() => onArtworkClick(artwork.id)}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onArtworkClick(artwork.id);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`View details for ${artwork.title} by ${getArtistName(artwork.artistId)}`}
          style={{ animationDelay: `${index * 0.1}s` }}
          data-testid={`card-artwork-${artwork.id}`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={artwork.imageUrl}
              alt={`${artwork.title} - ${artwork.description.substring(0, 100)}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <div className="text-white">
                <h3 className="text-lg font-medium mb-1">{artwork.title}</h3>
                <p className="text-sm opacity-90">
                  {getArtistName(artwork.artistId)}, {artwork.year}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-lg font-medium mb-2" data-testid={`text-artwork-title-${artwork.id}`}>
              {artwork.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {getArtistName(artwork.artistId)}
            </p>
            <Badge variant="default" className="text-xs">
              {categoryLabels[artwork.category] || artwork.category}
            </Badge>
          </div>
        </article>
      ))}
    </div>
  );
}
