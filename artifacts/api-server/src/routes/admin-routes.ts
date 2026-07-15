import { Router, type Request, type Response } from "express";
import { 
  db,
  bannerTable,
  heroSlidesTable,
  storiesTable,
  newsTable,
  eventsTable,
  opportunitiesTable,
  positionsTable,
  partnersTable,
  volunteersTable
} from "@workspace/db";
import { eq, asc } from "drizzle-orm";

const router = Router();

// Helper to generate text IDs (retained for backward compatibility and clean DB ids)
const generateId = () => Math.random().toString(36).substr(2, 9);

// --- BANNER ROUTE ---
router.get("/banner", async (req: Request, res: Response) => {
  try {
    const banners = await db.select().from(bannerTable).where(eq(bannerTable.id, 1));
    if (banners.length > 0) {
      res.json(banners[0]);
    } else {
      res.json({ text: "", linkText: "", linkUrl: "" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banner settings" });
  }
});

router.post("/banner", async (req: Request, res: Response) => {
  try {
    const { text, linkText, linkUrl } = req.body;
    
    // Attempt to upsert the single banner row
    const existing = await db.select().from(bannerTable).where(eq(bannerTable.id, 1));
    if (existing.length > 0) {
      await db.update(bannerTable)
        .set({ text, linkText, linkUrl })
        .where(eq(bannerTable.id, 1));
    } else {
      await db.insert(bannerTable).values({ id: 1, text, linkText, linkUrl });
    }

    res.json({ success: true, banner: { text, linkText, linkUrl } });
  } catch (err) {
    res.status(500).json({ error: "Failed to save banner settings" });
  }
});

// --- HERO SLIDES ROUTE ---
router.get("/hero", async (req: Request, res: Response) => {
  try {
    const slides = await db.select().from(heroSlidesTable).orderBy(asc(heroSlidesTable.displayOrder));
    res.json(slides.map(s => s.imageUrl));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hero slides" });
  }
});

router.post("/hero", async (req: Request, res: Response) => {
  try {
    const { slides } = req.body as { slides: string[] };
    if (!Array.isArray(slides)) {
      res.status(400).json({ error: "slides must be an array of image strings" });
      return;
    }

    // Delete existing slides and insert new list
    await db.delete(heroSlidesTable);
    if (slides.length > 0) {
      await db.insert(heroSlidesTable).values(
        slides.map((url, index) => ({
          imageUrl: url,
          displayOrder: index
        }))
      );
    }

    res.json({ success: true, slides });
  } catch (err) {
    res.status(500).json({ error: "Failed to save hero slides" });
  }
});

// --- STORIES CRUD ---
router.get("/stories", async (req: Request, res: Response) => {
  try {
    const stories = await db.select().from(storiesTable);
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stories" });
  }
});

router.post("/stories", async (req: Request, res: Response) => {
  try {
    const { img, tag, date, title, desc, author, readTime, content } = req.body;
    const newStory = {
      id: generateId(),
      img,
      tag,
      date,
      title,
      desc,
      author,
      readTime,
      content: Array.isArray(content) ? content : []
    };
    await db.insert(storiesTable).values(newStory);
    res.json({ success: true, story: newStory });
  } catch (err) {
    res.status(500).json({ error: "Failed to create story" });
  }
});

router.put("/stories/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { img, tag, date, title, desc, author, readTime, content } = req.body;
    
    const updated = await db.update(storiesTable)
      .set({ img, tag, date, title, desc, author, readTime, content: Array.isArray(content) ? content : [] })
      .where(eq(storiesTable.id, id))
      .returning();

    if (updated.length > 0) {
      res.json({ success: true, story: updated[0] });
    } else {
      res.status(404).json({ error: "Story not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update story" });
  }
});

router.delete("/stories/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(storiesTable).where(eq(storiesTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Story not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete story" });
  }
});

// --- NEWS CRUD ---
router.get("/news", async (req: Request, res: Response) => {
  try {
    const news = await db.select().from(newsTable);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

router.post("/news", async (req: Request, res: Response) => {
  try {
    const { title, img, date } = req.body;
    const newNews = {
      id: generateId(),
      title,
      img,
      date
    };
    await db.insert(newsTable).values(newNews);
    res.json({ success: true, news: newNews });
  } catch (err) {
    res.status(500).json({ error: "Failed to create news item" });
  }
});

router.put("/news/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, img, date } = req.body;
    
    const updated = await db.update(newsTable)
      .set({ title, img, date })
      .where(eq(newsTable.id, id))
      .returning();

    if (updated.length > 0) {
      res.json({ success: true, news: updated[0] });
    } else {
      res.status(404).json({ error: "News item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update news item" });
  }
});

router.delete("/news/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(newsTable).where(eq(newsTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "News item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete news item" });
  }
});

// --- EVENTS CRUD ---
router.get("/events", async (req: Request, res: Response) => {
  try {
    const events = await db.select().from(eventsTable);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

router.post("/events", async (req: Request, res: Response) => {
  try {
    const { date, month, title, loc, desc } = req.body;
    const newEvent = {
      id: generateId(),
      date,
      month,
      title,
      loc,
      desc
    };
    await db.insert(eventsTable).values(newEvent);
    res.json({ success: true, event: newEvent });
  } catch (err) {
    res.status(500).json({ error: "Failed to create event" });
  }
});

router.put("/events/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { date, month, title, loc, desc } = req.body;
    
    const updated = await db.update(eventsTable)
      .set({ date, month, title, loc, desc })
      .where(eq(eventsTable.id, id))
      .returning();

    if (updated.length > 0) {
      res.json({ success: true, event: updated[0] });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});

router.delete("/events/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(eventsTable).where(eq(eventsTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete event" });
  }
});

// --- OPPORTUNITIES CRUD ---
router.get("/opportunities", async (req: Request, res: Response) => {
  try {
    const opportunities = await db.select().from(opportunitiesTable);
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

router.post("/opportunities", async (req: Request, res: Response) => {
  try {
    const { title, type, commitment, desc } = req.body;
    const newOpp = {
      id: generateId(),
      title,
      type,
      commitment,
      desc
    };
    await db.insert(opportunitiesTable).values(newOpp);
    res.json({ success: true, opportunity: newOpp });
  } catch (err) {
    res.status(500).json({ error: "Failed to create opportunity" });
  }
});

router.put("/opportunities/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, type, commitment, desc } = req.body;
    
    const updated = await db.update(opportunitiesTable)
      .set({ title, type, commitment, desc })
      .where(eq(opportunitiesTable.id, id))
      .returning();

    if (updated.length > 0) {
      res.json({ success: true, opportunity: updated[0] });
    } else {
      res.status(404).json({ error: "Opportunity not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update opportunity" });
  }
});

router.delete("/opportunities/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(opportunitiesTable).where(eq(opportunitiesTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Opportunity not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete opportunity" });
  }
});

// --- POSITIONS CRUD ---
router.get("/positions", async (req: Request, res: Response) => {
  try {
    const positions = await db.select().from(positionsTable);
    res.json(positions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch careers positions" });
  }
});

router.post("/positions", async (req: Request, res: Response) => {
  try {
    const { title, category, location, type, desc } = req.body;
    const newPos = {
      id: generateId(),
      title,
      category,
      location,
      type,
      desc
    };
    await db.insert(positionsTable).values(newPos);
    res.json({ success: true, position: newPos });
  } catch (err) {
    res.status(500).json({ error: "Failed to create careers position" });
  }
});

router.put("/positions/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { title, category, location, type, desc } = req.body;
    
    const updated = await db.update(positionsTable)
      .set({ title, category, location, type, desc })
      .where(eq(positionsTable.id, id))
      .returning();

    if (updated.length > 0) {
      res.json({ success: true, position: updated[0] });
    } else {
      res.status(404).json({ error: "Careers position not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update careers position" });
  }
});

router.delete("/positions/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(positionsTable).where(eq(positionsTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Careers position not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete careers position" });
  }
});

// --- PARTNERS CRUD ---
router.get("/partners", async (req: Request, res: Response) => {
  try {
    const partners = await db.select().from(partnersTable);
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch partnership inquiries" });
  }
});

router.post("/partners", async (req: Request, res: Response) => {
  try {
    const { orgName, contactName, email, phone, partnerType, focusArea, proposal } = req.body;
    const newPartner = {
      id: generateId(),
      orgName,
      contactName,
      email,
      phone,
      partnerType,
      focusArea,
      proposal,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    };
    await db.insert(partnersTable).values(newPartner);
    res.json({ success: true, partner: newPartner });
  } catch (err) {
    res.status(500).json({ error: "Failed to save partnership inquiry" });
  }
});

// --- VOLUNTEERS CRUD ---
router.get("/volunteers", async (req: Request, res: Response) => {
  try {
    const volunteers = await db.select().from(volunteersTable);
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch volunteer applications" });
  }
});

router.post("/volunteers", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, opportunity, availability, message } = req.body;
    const newApp = {
      id: generateId(),
      firstName,
      lastName,
      email,
      phone,
      opportunity,
      availability,
      message,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    };
    await db.insert(volunteersTable).values(newApp);
    res.json({ success: true, volunteer: newApp });
  } catch (err) {
    res.status(500).json({ error: "Failed to save volunteer application" });
  }
});

router.delete("/volunteers/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await db.delete(volunteersTable).where(eq(volunteersTable.id, id)).returning();
    if (deleted.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Volunteer application not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete volunteer application" });
  }
});

export default router;
