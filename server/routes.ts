import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertArtistSchema,
  insertExhibitionSchema,
  insertArtworkSchema,
  insertNewsletterSubscriberSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Artists Routes
  app.get("/api/artists", async (_req, res) => {
    try {
      const artists = await storage.getArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:id", async (req, res) => {
    try {
      const artist = await storage.getArtist(req.params.id);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artist" });
    }
  });

  app.post("/api/artists", async (req, res) => {
    try {
      const validatedData = insertArtistSchema.parse(req.body);
      const artist = await storage.createArtist(validatedData);
      res.status(201).json(artist);
    } catch (error) {
      res.status(400).json({ error: "Invalid artist data" });
    }
  });

  app.patch("/api/artists/:id", async (req, res) => {
    try {
      const validatedData = insertArtistSchema.partial().parse(req.body);
      const artist = await storage.updateArtist(req.params.id, validatedData);
      if (!artist) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(400).json({ error: "Invalid artist data" });
    }
  });

  app.delete("/api/artists/:id", async (req, res) => {
    try {
      const success = await storage.deleteArtist(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Artist not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete artist" });
    }
  });

  // Exhibitions Routes
  app.get("/api/exhibitions", async (_req, res) => {
    try {
      const exhibitions = await storage.getExhibitions();
      res.json(exhibitions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exhibitions" });
    }
  });

  app.get("/api/exhibitions/:id", async (req, res) => {
    try {
      const exhibition = await storage.getExhibition(req.params.id);
      if (!exhibition) {
        return res.status(404).json({ error: "Exhibition not found" });
      }
      res.json(exhibition);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch exhibition" });
    }
  });

  app.post("/api/exhibitions", async (req, res) => {
    try {
      const validatedData = insertExhibitionSchema.parse(req.body);
      const exhibition = await storage.createExhibition(validatedData);
      res.status(201).json(exhibition);
    } catch (error) {
      res.status(400).json({ error: "Invalid exhibition data" });
    }
  });

  app.patch("/api/exhibitions/:id", async (req, res) => {
    try {
      const validatedData = insertExhibitionSchema.partial().parse(req.body);
      const exhibition = await storage.updateExhibition(req.params.id, validatedData);
      if (!exhibition) {
        return res.status(404).json({ error: "Exhibition not found" });
      }
      res.json(exhibition);
    } catch (error) {
      res.status(400).json({ error: "Invalid exhibition data" });
    }
  });

  app.delete("/api/exhibitions/:id", async (req, res) => {
    try {
      const success = await storage.deleteExhibition(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Exhibition not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete exhibition" });
    }
  });

  // Artworks Routes
  app.get("/api/artworks", async (req, res) => {
    try {
      const { artistId, exhibitionId } = req.query;
      
      let artworks;
      if (artistId && typeof artistId === 'string') {
        artworks = await storage.getArtworksByArtist(artistId);
      } else if (exhibitionId && typeof exhibitionId === 'string') {
        artworks = await storage.getArtworksByExhibition(exhibitionId);
      } else {
        artworks = await storage.getArtworks();
      }
      
      res.json(artworks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artworks" });
    }
  });

  app.get("/api/artworks/:id", async (req, res) => {
    try {
      const artwork = await storage.getArtwork(req.params.id);
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.json(artwork);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch artwork" });
    }
  });

  app.post("/api/artworks", async (req, res) => {
    try {
      const validatedData = insertArtworkSchema.parse(req.body);
      const artwork = await storage.createArtwork(validatedData);
      res.status(201).json(artwork);
    } catch (error) {
      res.status(400).json({ error: "Invalid artwork data" });
    }
  });

  app.patch("/api/artworks/:id", async (req, res) => {
    try {
      const validatedData = insertArtworkSchema.partial().parse(req.body);
      const artwork = await storage.updateArtwork(req.params.id, validatedData);
      if (!artwork) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.json(artwork);
    } catch (error) {
      res.status(400).json({ error: "Invalid artwork data" });
    }
  });

  app.delete("/api/artworks/:id", async (req, res) => {
    try {
      const success = await storage.deleteArtwork(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Artwork not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete artwork" });
    }
  });

  // Newsletter Subscribers Routes
  app.post("/api/newsletter/subscribe", async (req, res) => {
    try {
      const validatedData = insertNewsletterSubscriberSchema.parse(req.body);
      const subscriber = await storage.createNewsletterSubscriber(validatedData);
      res.status(201).json({ 
        message: "Successfully subscribed to newsletter",
        subscriber 
      });
    } catch (error: any) {
      if (error?.message?.includes('unique')) {
        return res.status(409).json({ error: "Email already subscribed" });
      }
      res.status(400).json({ error: "Invalid email address" });
    }
  });

  app.get("/api/newsletter/subscribers", async (_req, res) => {
    try {
      const subscribers = await storage.getNewsletterSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
