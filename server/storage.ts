import { 
  type User, 
  type InsertUser,
  type Artist,
  type InsertArtist,
  type Exhibition,
  type InsertExhibition,
  type Artwork,
  type InsertArtwork,
  type NewsletterSubscriber,
  type InsertNewsletterSubscriber,
  users,
  artists,
  exhibitions,
  artworks,
  newsletterSubscribers
} from "@shared/schema";
import { randomUUID } from "crypto";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Artists
  getArtists(): Promise<Artist[]>;
  getArtist(id: string): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  updateArtist(id: string, artist: Partial<InsertArtist>): Promise<Artist | undefined>;
  deleteArtist(id: string): Promise<boolean>;
  
  // Exhibitions
  getExhibitions(): Promise<Exhibition[]>;
  getExhibition(id: string): Promise<Exhibition | undefined>;
  createExhibition(exhibition: InsertExhibition): Promise<Exhibition>;
  updateExhibition(id: string, exhibition: Partial<InsertExhibition>): Promise<Exhibition | undefined>;
  deleteExhibition(id: string): Promise<boolean>;
  
  // Artworks
  getArtworks(): Promise<Artwork[]>;
  getArtwork(id: string): Promise<Artwork | undefined>;
  getArtworksByArtist(artistId: string): Promise<Artwork[]>;
  getArtworksByExhibition(exhibitionId: string): Promise<Artwork[]>;
  createArtwork(artwork: InsertArtwork): Promise<Artwork>;
  updateArtwork(id: string, artwork: Partial<InsertArtwork>): Promise<Artwork | undefined>;
  deleteArtwork(id: string): Promise<boolean>;
  
  // Newsletter Subscribers
  getNewsletterSubscribers(): Promise<NewsletterSubscriber[]>;
  createNewsletterSubscriber(subscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private artists: Map<string, Artist>;
  private exhibitions: Map<string, Exhibition>;
  private artworks: Map<string, Artwork>;
  private newsletterSubscribers: Map<string, NewsletterSubscriber>;

  constructor() {
    this.users = new Map();
    this.artists = new Map();
    this.exhibitions = new Map();
    this.artworks = new Map();
    this.newsletterSubscribers = new Map();
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: "curator" };
    this.users.set(id, user);
    return user;
  }

  // Artists
  async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getArtist(id: string): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = randomUUID();
    const artist: Artist = { 
      ...insertArtist, 
      id, 
      createdAt: new Date() 
    };
    this.artists.set(id, artist);
    return artist;
  }

  async updateArtist(id: string, update: Partial<InsertArtist>): Promise<Artist | undefined> {
    const artist = this.artists.get(id);
    if (!artist) return undefined;
    
    const updated = { ...artist, ...update };
    this.artists.set(id, updated);
    return updated;
  }

  async deleteArtist(id: string): Promise<boolean> {
    return this.artists.delete(id);
  }

  // Exhibitions
  async getExhibitions(): Promise<Exhibition[]> {
    return Array.from(this.exhibitions.values());
  }

  async getExhibition(id: string): Promise<Exhibition | undefined> {
    return this.exhibitions.get(id);
  }

  async createExhibition(insertExhibition: InsertExhibition): Promise<Exhibition> {
    const id = randomUUID();
    const exhibition: Exhibition = { 
      ...insertExhibition, 
      id, 
      createdAt: new Date() 
    };
    this.exhibitions.set(id, exhibition);
    return exhibition;
  }

  async updateExhibition(id: string, update: Partial<InsertExhibition>): Promise<Exhibition | undefined> {
    const exhibition = this.exhibitions.get(id);
    if (!exhibition) return undefined;
    
    const updated = { ...exhibition, ...update };
    this.exhibitions.set(id, updated);
    return updated;
  }

  async deleteExhibition(id: string): Promise<boolean> {
    return this.exhibitions.delete(id);
  }

  // Artworks
  async getArtworks(): Promise<Artwork[]> {
    return Array.from(this.artworks.values());
  }

  async getArtwork(id: string): Promise<Artwork | undefined> {
    return this.artworks.get(id);
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    return Array.from(this.artworks.values()).filter(
      (artwork) => artwork.artistId === artistId
    );
  }

  async getArtworksByExhibition(exhibitionId: string): Promise<Artwork[]> {
    return Array.from(this.artworks.values()).filter(
      (artwork) => artwork.exhibitionId === exhibitionId
    );
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const id = randomUUID();
    const artwork: Artwork = { 
      ...insertArtwork, 
      id, 
      createdAt: new Date() 
    };
    this.artworks.set(id, artwork);
    return artwork;
  }

  async updateArtwork(id: string, update: Partial<InsertArtwork>): Promise<Artwork | undefined> {
    const artwork = this.artworks.get(id);
    if (!artwork) return undefined;
    
    const updated = { ...artwork, ...update };
    this.artworks.set(id, updated);
    return updated;
  }

  async deleteArtwork(id: string): Promise<boolean> {
    return this.artworks.delete(id);
  }

  // Newsletter Subscribers
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return Array.from(this.newsletterSubscribers.values());
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const id = randomUUID();
    const subscriber: NewsletterSubscriber = { 
      ...insertSubscriber, 
      id, 
      subscribedAt: new Date() 
    };
    this.newsletterSubscribers.set(id, subscriber);
    return subscriber;
  }
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Artists
  async getArtists(): Promise<Artist[]> {
    return db.select().from(artists);
  }

  async getArtist(id: string): Promise<Artist | undefined> {
    const result = await db.select().from(artists).where(eq(artists.id, id)).limit(1);
    return result[0];
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const result = await db.insert(artists).values(insertArtist).returning();
    return result[0];
  }

  async updateArtist(id: string, update: Partial<InsertArtist>): Promise<Artist | undefined> {
    const result = await db.update(artists).set(update).where(eq(artists.id, id)).returning();
    return result[0];
  }

  async deleteArtist(id: string): Promise<boolean> {
    const result = await db.delete(artists).where(eq(artists.id, id)).returning();
    return result.length > 0;
  }

  // Exhibitions
  async getExhibitions(): Promise<Exhibition[]> {
    return db.select().from(exhibitions);
  }

  async getExhibition(id: string): Promise<Exhibition | undefined> {
    const result = await db.select().from(exhibitions).where(eq(exhibitions.id, id)).limit(1);
    return result[0];
  }

  async createExhibition(insertExhibition: InsertExhibition): Promise<Exhibition> {
    const result = await db.insert(exhibitions).values(insertExhibition).returning();
    return result[0];
  }

  async updateExhibition(id: string, update: Partial<InsertExhibition>): Promise<Exhibition | undefined> {
    const result = await db.update(exhibitions).set(update).where(eq(exhibitions.id, id)).returning();
    return result[0];
  }

  async deleteExhibition(id: string): Promise<boolean> {
    const result = await db.delete(exhibitions).where(eq(exhibitions.id, id)).returning();
    return result.length > 0;
  }

  // Artworks
  async getArtworks(): Promise<Artwork[]> {
    return db.select().from(artworks);
  }

  async getArtwork(id: string): Promise<Artwork | undefined> {
    const result = await db.select().from(artworks).where(eq(artworks.id, id)).limit(1);
    return result[0];
  }

  async getArtworksByArtist(artistId: string): Promise<Artwork[]> {
    return db.select().from(artworks).where(eq(artworks.artistId, artistId));
  }

  async getArtworksByExhibition(exhibitionId: string): Promise<Artwork[]> {
    return db.select().from(artworks).where(eq(artworks.exhibitionId, exhibitionId));
  }

  async createArtwork(insertArtwork: InsertArtwork): Promise<Artwork> {
    const result = await db.insert(artworks).values(insertArtwork).returning();
    return result[0];
  }

  async updateArtwork(id: string, update: Partial<InsertArtwork>): Promise<Artwork | undefined> {
    const result = await db.update(artworks).set(update).where(eq(artworks.id, id)).returning();
    return result[0];
  }

  async deleteArtwork(id: string): Promise<boolean> {
    const result = await db.delete(artworks).where(eq(artworks.id, id)).returning();
    return result.length > 0;
  }

  // Newsletter Subscribers
  async getNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
    return db.select().from(newsletterSubscribers);
  }

  async createNewsletterSubscriber(insertSubscriber: InsertNewsletterSubscriber): Promise<NewsletterSubscriber> {
    const result = await db.insert(newsletterSubscribers).values(insertSubscriber).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
