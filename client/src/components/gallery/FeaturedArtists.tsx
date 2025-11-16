import type { Artist } from "@shared/schema";

interface FeaturedArtistsProps {
  artists: Artist[];
}

export default function FeaturedArtists({ artists }: FeaturedArtistsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {artists.slice(0, 4).map((artist) => (
        <article
          key={artist.id}
          className="flex flex-col md:flex-row gap-6 p-6 bg-card rounded-md hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
          data-testid={`card-artist-${artist.id}`}
        >
          <img
            src={artist.photoUrl}
            alt={`Portrait of ${artist.name}`}
            className="w-32 h-32 rounded-full object-cover border-2 border-border flex-shrink-0 mx-auto md:mx-0"
            loading="lazy"
          />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium mb-1" data-testid={`text-artist-name-${artist.id}`}>
              {artist.name}
            </h3>
            <p className="text-primary font-medium text-sm mb-3">{artist.specialty}</p>
            <p className="text-sm leading-relaxed opacity-80">{artist.bio}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
