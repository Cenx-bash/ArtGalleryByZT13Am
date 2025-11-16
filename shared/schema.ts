import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("curator"),
});

export const artists = pgTable("artists", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  specialty: text("specialty").notNull(),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const exhibitions = pgTable("exhibitions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  dates: text("dates").notNull(),
  venue: text("venue").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const artworks = pgTable("artworks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  artistId: varchar("artist_id").notNull().references(() => artists.id),
  year: text("year").notNull(),
  medium: text("medium").notNull(),
  dimensions: text("dimensions").notNull(),
  category: text("category").notNull(),
  exhibitionId: varchar("exhibition_id").notNull().references(() => exhibitions.id),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

// Insert Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  role: true,
});

export const insertArtistSchema = createInsertSchema(artists).omit({
  id: true,
  createdAt: true,
});

export const insertExhibitionSchema = createInsertSchema(exhibitions).omit({
  id: true,
  createdAt: true,
});

export const insertArtworkSchema = createInsertSchema(artworks).omit({
  id: true,
  createdAt: true,
});

export const insertNewsletterSubscriberSchema = createInsertSchema(newsletterSubscribers).omit({
  id: true,
  subscribedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Artist = typeof artists.$inferSelect;
export type InsertArtist = z.infer<typeof insertArtistSchema>;

export type Exhibition = typeof exhibitions.$inferSelect;
export type InsertExhibition = z.infer<typeof insertExhibitionSchema>;

export type Artwork = typeof artworks.$inferSelect;
export type InsertArtwork = z.infer<typeof insertArtworkSchema>;

export type NewsletterSubscriber = typeof newsletterSubscribers.$inferSelect;
export type InsertNewsletterSubscriber = z.infer<typeof insertNewsletterSubscriberSchema>;
