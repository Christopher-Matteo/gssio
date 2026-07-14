import { Router, type Request, type Response } from "express";
import { 
  getData, 
  saveData, 
  Banner, 
  Story, 
  News, 
  Event, 
  Opportunity, 
  Position, 
  Partner 
} from "../lib/db-store";

const router = Router();

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

// --- BANNER ROUTE ---
router.get("/banner", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.banner);
});

router.post("/banner", (req: Request, res: Response) => {
  const db = getData();
  const { text, linkText, linkUrl } = req.body as Banner;
  db.banner = { text, linkText, linkUrl };
  saveData(db);
  res.json({ success: true, banner: db.banner });
});

// --- HERO SLIDES ROUTE ---
router.get("/hero", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.heroSlides);
});

router.post("/hero", (req: Request, res: Response) => {
  const db = getData();
  const { slides } = req.body as { slides: string[] };
  if (Array.isArray(slides)) {
    db.heroSlides = slides;
    saveData(db);
    res.json({ success: true, slides: db.heroSlides });
  } else {
    res.status(400).json({ error: "slides must be an array of image strings" });
  }
});

// --- STORIES CRUD ---
router.get("/stories", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.stories);
});

router.post("/stories", (req: Request, res: Response) => {
  const db = getData();
  const story = req.body as Story;
  story.id = generateId();
  db.stories.push(story);
  saveData(db);
  res.json({ success: true, story });
});

router.put("/stories/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const updatedStory = req.body as Story;
  const idx = db.stories.findIndex((s) => s.id === id);
  if (idx !== -1) {
    db.stories[idx] = { ...updatedStory, id };
    saveData(db);
    res.json({ success: true, story: db.stories[idx] });
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});

router.delete("/stories/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const filtered = db.stories.filter((s) => s.id !== id);
  if (filtered.length !== db.stories.length) {
    db.stories = filtered;
    saveData(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});

// --- NEWS CRUD ---
router.get("/news", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.news);
});

router.post("/news", (req: Request, res: Response) => {
  const db = getData();
  const newsItem = req.body as News;
  newsItem.id = generateId();
  db.news.push(newsItem);
  saveData(db);
  res.json({ success: true, news: newsItem });
});

router.put("/news/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const updatedNews = req.body as News;
  const idx = db.news.findIndex((n) => n.id === id);
  if (idx !== -1) {
    db.news[idx] = { ...updatedNews, id };
    saveData(db);
    res.json({ success: true, news: db.news[idx] });
  } else {
    res.status(404).json({ error: "News item not found" });
  }
});

router.delete("/news/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const filtered = db.news.filter((n) => n.id !== id);
  if (filtered.length !== db.news.length) {
    db.news = filtered;
    saveData(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "News item not found" });
  }
});

// --- EVENTS CRUD ---
router.get("/events", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.events);
});

router.post("/events", (req: Request, res: Response) => {
  const db = getData();
  const event = req.body as Event;
  event.id = generateId();
  db.events.push(event);
  saveData(db);
  res.json({ success: true, event });
});

router.put("/events/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const updatedEvent = req.body as Event;
  const idx = db.events.findIndex((e) => e.id === id);
  if (idx !== -1) {
    db.events[idx] = { ...updatedEvent, id };
    saveData(db);
    res.json({ success: true, event: db.events[idx] });
  } else {
    res.status(404).json({ error: "Event not found" });
  }
});

router.delete("/events/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const filtered = db.events.filter((e) => e.id !== id);
  if (filtered.length !== db.events.length) {
    db.events = filtered;
    saveData(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Event not found" });
  }
});

// --- OPPORTUNITIES CRUD ---
router.get("/opportunities", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.opportunities);
});

router.post("/opportunities", (req: Request, res: Response) => {
  const db = getData();
  const opp = req.body as Opportunity;
  opp.id = generateId();
  db.opportunities.push(opp);
  saveData(db);
  res.json({ success: true, opportunity: opp });
});

router.put("/opportunities/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const updatedOpp = req.body as Opportunity;
  const idx = db.opportunities.findIndex((o) => o.id === id);
  if (idx !== -1) {
    db.opportunities[idx] = { ...updatedOpp, id };
    saveData(db);
    res.json({ success: true, opportunity: db.opportunities[idx] });
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

router.delete("/opportunities/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const filtered = db.opportunities.filter((o) => o.id !== id);
  if (filtered.length !== db.opportunities.length) {
    db.opportunities = filtered;
    saveData(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Opportunity not found" });
  }
});

// --- POSITIONS CRUD ---
router.get("/positions", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.positions);
});

router.post("/positions", (req: Request, res: Response) => {
  const db = getData();
  const pos = req.body as Position;
  pos.id = generateId();
  db.positions.push(pos);
  saveData(db);
  res.json({ success: true, position: pos });
});

router.put("/positions/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const updatedPos = req.body as Position;
  const idx = db.positions.findIndex((p) => p.id === id);
  if (idx !== -1) {
    db.positions[idx] = { ...updatedPos, id };
    saveData(db);
    res.json({ success: true, position: db.positions[idx] });
  } else {
    res.status(404).json({ error: "Position not found" });
  }
});

router.delete("/positions/:id", (req: Request, res: Response) => {
  const db = getData();
  const { id } = req.params;
  const filtered = db.positions.filter((p) => p.id !== id);
  if (filtered.length !== db.positions.length) {
    db.positions = filtered;
    saveData(db);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Position not found" });
  }
});

// --- PARTNERS CRUD ---
router.get("/partners", (req: Request, res: Response) => {
  const db = getData();
  res.json(db.partners);
});

router.post("/partners", (req: Request, res: Response) => {
  const db = getData();
  const partner = req.body as Partner;
  partner.id = generateId();
  partner.date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  db.partners.push(partner);
  saveData(db);
  res.json({ success: true, partner });
});

export default router;
