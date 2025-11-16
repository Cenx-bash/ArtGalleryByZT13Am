import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Artwork, Artist, Exhibition } from "@shared/schema";
import HeroSection from "@/components/gallery/HeroSection";
import FilterBar from "@/components/gallery/FilterBar";
import ArtworkGrid from "@/components/gallery/ArtworkGrid";
import FeaturedArtists from "@/components/gallery/FeaturedArtists";
import ExhibitionsCarousel from "@/components/gallery/ExhibitionsCarousel";
import ArtworkModal from "@/components/gallery/ArtworkModal";
import Footer from "@/components/gallery/Footer";

export default function Gallery() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [exhibitionFilter, setExhibitionFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedArtworkId, setSelectedArtworkId] = useState<string | null>(null);

  const { data: artworks = [] } = useQuery<Artwork[]>({
    queryKey: ["/api/artworks"],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
  });

  const { data: exhibitions = [] } = useQuery<Exhibition[]>({
    queryKey: ["/api/exhibitions"],
  });

  const filteredArtworks = artworks.filter((artwork) => {
    const matchesCategory = categoryFilter === "all" || artwork.category === categoryFilter;
    
    const matchesExhibition = exhibitionFilter === "all" || (() => {
      const exhibition = exhibitions.find(ex => ex.id === artwork.exhibitionId);
      return exhibition?.title === exhibitionFilter;
    })();
    
    const matchesSearch = 
      searchQuery === "" ||
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (() => {
        const artist = artists.find(a => a.id === artwork.artistId);
        return artist?.name.toLowerCase().includes(searchQuery.toLowerCase());
      })();

    return matchesCategory && matchesExhibition && matchesSearch;
  });

  const selectedArtwork = selectedArtworkId
    ? artworks.find((a) => a.id === selectedArtworkId)
    : null;

  const selectedArtist = selectedArtwork
    ? artists.find((a) => a.id === selectedArtwork.artistId)
    : null;

  const selectedExhibition = selectedArtwork
    ? exhibitions.find((e) => e.id === selectedArtwork.exhibitionId)
    : null;

  useEffect(() => {
    const header = document.querySelector("header");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header?.classList.add("shadow-sm");
      } else {
        header?.classList.remove("shadow-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 bg-background z-50 transition-shadow duration-300">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-6 flex justify-between items-center">
          <h1 className="text-xl font-medium tracking-wide">Philippine Art Gallery</h1>
          <nav className="hidden md:block">
            <ul className="flex gap-8">
              <li><a href="#home" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Home</a></li>
              <li><a href="#collections" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#artists" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Artists</a></li>
              <li><a href="#exhibitions" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Exhibitions</a></li>
              <li><a href="#about" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">About</a></li>
              <li><a href="#contact" className="text-sm font-medium tracking-wide hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="pt-[88px]">
        <HeroSection />

        <section id="collections" className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Our Collections</h2>

            <FilterBar
              categoryFilter={categoryFilter}
              exhibitionFilter={exhibitionFilter}
              searchQuery={searchQuery}
              exhibitions={exhibitions}
              onCategoryChange={setCategoryFilter}
              onExhibitionChange={setExhibitionFilter}
              onSearchChange={setSearchQuery}
              resultCount={filteredArtworks.length}
            />

            <ArtworkGrid
              artworks={filteredArtworks}
              artists={artists}
              onArtworkClick={setSelectedArtworkId}
            />
          </div>
        </section>

        <section id="artists" className="py-20 bg-muted/30">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Featured Artists</h2>
            <FeaturedArtists artists={artists} />
          </div>
        </section>

        <section id="exhibitions" className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-5xl font-light mb-8">Current Exhibitions</h2>
            <ExhibitionsCarousel exhibitions={exhibitions} />
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/30">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-8">About Us</h2>
              <p className="text-lg leading-relaxed mb-6 opacity-85">
                The Philippine Art Gallery is dedicated to preserving and promoting Filipino artistic heritage. 
                Through our carefully curated collections, we showcase the diversity and richness of Philippine arts across multiple disciplines.
              </p>
              <p className="text-lg leading-relaxed opacity-85">
                Our mission is to make Filipino art accessible to collectors, curators, students, and the general public, 
                fostering appreciation for the cultural treasures that define our national identity.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {selectedArtwork && selectedArtist && selectedExhibition && (
        <ArtworkModal
          artwork={selectedArtwork}
          artist={selectedArtist}
          exhibition={selectedExhibition}
          onClose={() => setSelectedArtworkId(null)}
        />
      )}
    </div>
  );
}
