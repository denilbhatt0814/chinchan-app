import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

// ---------- USERS TABLE ----------

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// ---------- CREATORS TABLE ----------

export const creatorsTable = pgTable("creators_table", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCreatorSchema = createInsertSchema(creatorsTable);
export type InsertCreator = typeof creatorsTable.$inferInsert;
export type SelectCreator = typeof creatorsTable.$inferSelect;

// ---------- BRANDS TABLE ----------

export const brandsTable = pgTable("brands_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  subdomain: text("subdomain").notNull(),
  logoUrl: text("logo_url"),
  bannerUrl: text("banner_url"),
  creatorId: integer("creator_id")
    .notNull()
    .references(() => creatorsTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertBrandSchema = createInsertSchema(brandsTable);
export const insertBrandFormSchema = insertBrandSchema.pick({
  name: true,
  subdomain: true,
  logoUrl: true,
  bannerUrl: true,
});
export type InsertBrand = typeof brandsTable.$inferInsert;
export type SelectBrand = typeof brandsTable.$inferSelect;

// ---------- VIDEOS TABLE ----------

export const videosTable = pgTable("videos_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  brandId: integer("brand_id")
    .notNull()
    .references(() => brandsTable.id, { onDelete: "cascade" }),
  mediaUrl: text("media_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertVideoSchema = createInsertSchema(videosTable);
export const insertVideoFormSchema = insertVideoSchema.pick({
  title: true,
  description: true,
  brandId: true,
  mediaUrl: true,
  thumbnailUrl: true,
});

export type InsertVideo = typeof videosTable.$inferInsert;
export type SelectVideo = typeof videosTable.$inferSelect;

// --------------------
