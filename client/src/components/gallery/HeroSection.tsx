import { useEffect, useRef } from "react";
import heroImage from "@assets/generated_images/Hero_Filipino_contemporary_painting_2ee02e8f.png";

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      if (scrolled < window.innerHeight) {
        bgRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.05)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="home" className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-out"
        style={{ backgroundImage: `url(${heroImage})`, transform: "scale(1.05)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      
      <div className="relative z-10 text-center text-white max-w-4xl px-6">
        <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight drop-shadow-lg">
          Celebrating Filipino Culture Through Art
        </h1>
        <p className="text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow">
          Discover the richness of Philippine heritage through a curated collection of visual, literary, applied, 
          and performance arts that honor our ancestors and inspire future generations.
        </p>
        <a
          href="#collections"
          className="inline-block px-10 py-4 bg-white/15 backdrop-blur-md text-white font-medium text-sm tracking-wide rounded-md border border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5"
        >
          Explore Collections
        </a>
      </div>
    </section>
  );
}
