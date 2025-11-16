import { storage } from "./storage";

export async function seed() {
  console.log("🌱 Seeding database...");
  
  // Check if already seeded
  const existingArtworks = await storage.getArtworks();
  if (existingArtworks.length > 0) {
    console.log("✅ Database already seeded, skipping...");
    return;
  }

  // Create Artists
  console.log("Creating artists...");
  const mariaSantos = await storage.createArtist({
    name: "Maria Santos",
    specialty: "Contemporary Visual Artist",
    bio: "Known for vibrant folk-inspired paintings that bridge traditional Filipino imagery with modern expressionism. Her work celebrates street culture and everyday Filipino life.",
    photoUrl: "attached_assets/generated_images/Filipino_female_artist_portrait_b4075d46.png"
  });

  const juanDelaCruz = await storage.createArtist({
    name: "Juan dela Cruz",
    specialty: "Landscape Painter",
    bio: "Specializes in capturing the natural beauty of Philippine landscapes. His work documents heritage sites and explores the relationship between Filipinos and their environment.",
    photoUrl: "attached_assets/generated_images/Filipino_male_artist_portrait_8456af65.png"
  });

  const sofiaReyes = await storage.createArtist({
    name: "Sofia Reyes",
    specialty: "Calligrapher & Literary Artist",
    bio: "Dedicated to reviving and preserving Baybayin script through contemporary calligraphic art. Her illuminated manuscripts merge ancestral literacy with modern artistic expression.",
    photoUrl: "attached_assets/generated_images/Young_Filipino_artist_portrait_ac7cb3de.png"
  });

  const langDulay = await storage.createArtist({
    name: "Lang Dulay Legacy",
    specialty: "Master Weaver",
    bio: "Representing generations of T'boli weaving tradition, continuing the sacred art of T'nalak cloth creation with patterns revealed through dreams.",
    photoUrl: "attached_assets/generated_images/Senior_Filipino_artist_portrait_3c14bb58.png"
  });

  const potteryCollective = await storage.createArtist({
    name: "Pottery Collective",
    specialty: "Traditional Ceramics",
    bio: "A collective of Kalinga artisans preserving centuries-old ceramic techniques. Their work tells stories of community, harvest, and spiritual beliefs unique to the Cordillera region.",
    photoUrl: "attached_assets/generated_images/Filipino_male_artist_portrait_8456af65.png"
  });

  const danceDocProject = await storage.createArtist({
    name: "Dance Documentation Project",
    specialty: "Performance Arts Photography",
    bio: "Documents traditional Filipino performance arts and indigenous cultural expressions. Preserving living traditions for future generations through stunning visual storytelling.",
    photoUrl: "attached_assets/generated_images/Young_Filipino_artist_portrait_ac7cb3de.png"
  });

  // Create Exhibitions
  console.log("Creating exhibitions...");
  const contemporaryVoices = await storage.createExhibition({
    title: "Contemporary Filipino Voices",
    dates: "January 15 - March 30, 2024",
    venue: "Main Gallery, Manila",
    imageUrl: "attached_assets/generated_images/Filipino_art_exhibition_gallery_889fe884.png"
  });

  const wovenStories = await storage.createExhibition({
    title: "Woven Stories",
    dates: "February 1 - April 15, 2024",
    venue: "Heritage Hall, Baguio",
    imageUrl: "attached_assets/generated_images/Art_exhibition_opening_event_db724440.png"
  });

  const writtenHeritage = await storage.createExhibition({
    title: "Written Heritage",
    dates: "February 10 - April 20, 2024",
    venue: "Cultural Center, Cebu",
    imageUrl: "attached_assets/generated_images/Heritage_art_exhibition_display_48097625.png"
  });

  const landscapesHeritage = await storage.createExhibition({
    title: "Landscapes of Heritage",
    dates: "January 20 - March 25, 2024",
    venue: "National Museum, Manila",
    imageUrl: "attached_assets/generated_images/Filipino_art_exhibition_gallery_889fe884.png"
  });

  const earthAndFire = await storage.createExhibition({
    title: "Earth and Fire",
    dates: "February 5 - April 10, 2024",
    venue: "Cordillera Art Center, Baguio",
    imageUrl: "attached_assets/generated_images/Art_exhibition_opening_event_db724440.png"
  });

  const livingTraditions = await storage.createExhibition({
    title: "Living Traditions",
    dates: "March 10 - May 25, 2024",
    venue: "Cultural Center, Cebu",
    imageUrl: "attached_assets/generated_images/Heritage_art_exhibition_display_48097625.png"
  });

  // Create Artworks
  console.log("Creating artworks...");
  await storage.createArtwork({
    title: "Jeepney Dreams",
    artistId: mariaSantos.id,
    year: "2023",
    medium: "Acrylic on Canvas",
    dimensions: "100 × 80 cm",
    category: "visual",
    exhibitionId: contemporaryVoices.id,
    description: "A vibrant celebration of Philippine street culture, this piece captures the iconic jeepney as a symbol of Filipino resilience and creativity. The intricate floral patterns pay homage to traditional folk art while embracing modern expressionism.",
    imageUrl: "attached_assets/generated_images/Filipino_jeepney_folk_art_aa9574a9.png"
  });

  await storage.createArtwork({
    title: "Banaue: Golden Terraces",
    artistId: juanDelaCruz.id,
    year: "2022",
    medium: "Oil on Canvas",
    dimensions: "120 × 90 cm",
    category: "visual",
    exhibitionId: landscapesHeritage.id,
    description: "This stunning landscape depicts the UNESCO World Heritage site of Banaue Rice Terraces during golden hour. The terraced fields represent over 2,000 years of indigenous engineering and sustainable agriculture, showcasing the harmonious relationship between Filipino ancestors and nature.",
    imageUrl: "attached_assets/generated_images/Banaue_rice_terraces_painting_8bf15f9f.png"
  });

  await storage.createArtwork({
    title: "Baybayin Chronicles",
    artistId: sofiaReyes.id,
    year: "2024",
    medium: "Gold Leaf & Ink on Parchment",
    dimensions: "45 × 60 cm",
    category: "literary",
    exhibitionId: writtenHeritage.id,
    description: "An illuminated manuscript featuring ancient Baybayin script, the pre-colonial writing system of the Philippines. This contemporary interpretation bridges ancestral literacy with modern calligraphic artistry, preserving cultural memory through beautiful letterforms.",
    imageUrl: "attached_assets/generated_images/Baybayin_script_manuscript_1298871b.png"
  });

  await storage.createArtwork({
    title: "T'nalak Traditions",
    artistId: langDulay.id,
    year: "2023",
    medium: "Handwoven Abaca Fiber",
    dimensions: "200 × 150 cm",
    category: "applied",
    exhibitionId: wovenStories.id,
    description: "A masterwork of T'boli weaving tradition, this T'nalak cloth features sacred geometric patterns revealed through dreams to master weavers. The intricate design honors Lang Dulay, a National Living Treasure, representing generations of indigenous textile artistry.",
    imageUrl: "attached_assets/generated_images/T'nalak_textile_weaving_6bd1fa8f.png"
  });

  await storage.createArtwork({
    title: "Kalinga Vessel",
    artistId: potteryCollective.id,
    year: "2023",
    medium: "Earthenware Clay",
    dimensions: "40 × 30 cm",
    category: "applied",
    exhibitionId: earthAndFire.id,
    description: "This traditional Kalinga pottery exemplifies centuries-old ceramic techniques passed down through generations. The geometric tribal patterns etched into the terracotta surface tell stories of community, harvest, and spiritual beliefs unique to the Cordillera region.",
    imageUrl: "attached_assets/generated_images/Kalinga_pottery_vase_c8f47fe3.png"
  });

  await storage.createArtwork({
    title: "Tinikling in Motion",
    artistId: danceDocProject.id,
    year: "2024",
    medium: "Fine Art Photography",
    dimensions: "80 × 100 cm",
    category: "performance",
    exhibitionId: livingTraditions.id,
    description: "A dynamic capture of the Philippines' national dance, Tinikling, where dancers gracefully step between bamboo poles. This photograph freezes a moment of perfect synchronization, celebrating the rhythm, agility, and cultural pride embodied in traditional Filipino performance arts.",
    imageUrl: "attached_assets/generated_images/Tinikling_bamboo_dance_performance_b0031241.png"
  });

  console.log("✅ Database seeded successfully!");
  console.log(`Created ${(await storage.getArtists()).length} artists`);
  console.log(`Created ${(await storage.getExhibitions()).length} exhibitions`);
  console.log(`Created ${(await storage.getArtworks()).length} artworks`);
}
