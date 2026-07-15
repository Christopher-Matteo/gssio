import { pgTable, text, integer, serial } from "drizzle-orm/pg-core";

export const bannerTable = pgTable("banner", {
  id: integer("id").primaryKey().default(1),
  text: text("text").notNull(),
  linkText: text("link_text").notNull(),
  linkUrl: text("link_url").notNull(),
});

export const heroSlidesTable = pgTable("hero_slides", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
});

export const storiesTable = pgTable("stories", {
  id: text("id").primaryKey(),
  img: text("img").notNull(),
  tag: text("tag").notNull(),
  date: text("date").notNull(),
  title: text("title").notNull(),
  desc: text("desc").notNull(),
  author: text("author").notNull(),
  readTime: text("read_time").notNull(),
  content: text("content").array().notNull(),
});

export const newsTable = pgTable("news", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  img: text("img").notNull(),
  date: text("date").notNull(),
});

export const eventsTable = pgTable("events", {
  id: text("id").primaryKey(),
  date: text("date").notNull(),
  month: text("month").notNull(),
  title: text("title").notNull(),
  loc: text("loc").notNull(),
  desc: text("desc").notNull(),
});

export const opportunitiesTable = pgTable("opportunities", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  commitment: text("commitment").notNull(),
  desc: text("desc").notNull(),
});

export const positionsTable = pgTable("positions", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  desc: text("desc").notNull(),
});

export const partnersTable = pgTable("partners", {
  id: text("id").primaryKey(),
  orgName: text("org_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  partnerType: text("partner_type").notNull(),
  focusArea: text("focus_area").notNull(),
  proposal: text("proposal").notNull(),
  date: text("date").notNull(),
});

export const volunteersTable = pgTable("volunteers", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  opportunity: text("opportunity").notNull(),
  availability: text("availability").notNull(),
  message: text("message").notNull(),
  date: text("date").notNull(),
});