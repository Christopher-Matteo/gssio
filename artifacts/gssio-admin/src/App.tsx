import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Megaphone, 
  Image as ImageIcon, 
  BookOpen, 
  Newspaper, 
  Calendar, 
  Users, 
  Briefcase, 
  Handshake, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Check, 
  ExternalLink,
  Loader
} from "lucide-react";

// Local models
interface Banner {
  text: string;
  linkText: string;
  linkUrl: string;
}

interface Story {
  id: string;
  img: string;
  tag: string;
  date: string;
  title: string;
  desc: string;
  author: string;
  readTime: string;
  content: string[];
}

interface News {
  id: string;
  title: string;
  img: string;
  date: string;
}

interface Event {
  id: string;
  date: string;
  month: string;
  title: string;
  loc: string;
  desc: string;
}

interface Opportunity {
  id: string;
  title: string;
  type: string;
  commitment: string;
  desc: string;
}

interface Position {
  id: string;
  title: string;
  category: string;
  location: string;
  type: string;
  desc: string;
}

interface Partner {
  id: string;
  orgName: string;
  contactName: string;
  email: string;
  phone: string;
  partnerType: string;
  focusArea: string;
  proposal: string;
  date: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(true);

  // App data states
  const [banner, setBanner] = useState<Banner>({ text: "", linkText: "", linkUrl: "" });
  const [heroSlides, setHeroSlides] = useState<string[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);

  // Editing & Dialog states
  const [toastMsg, setToastMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showModal, setShowModal] = useState<"story" | "news" | "event" | "opportunity" | "position" | null>(null);

  // Form input helper states
  const [storyForm, setStoryForm] = useState<Partial<Story>>({ title: "", tag: "Health", desc: "", author: "", readTime: "5 min read", img: "", content: [""] });
  const [newsForm, setNewsForm] = useState<Partial<News>>({ title: "", img: "", date: "" });
  const [eventForm, setEventForm] = useState<Partial<Event>>({ date: "15", month: "NOV", title: "", loc: "", desc: "" });
  const [oppForm, setOppForm] = useState<Partial<Opportunity>>({ title: "", type: "Remote", commitment: "5-10 hours/week", desc: "" });
  const [posForm, setPosForm] = useState<Partial<Position>>({ title: "", category: "Health", location: "", type: "Full-Time", desc: "" });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMsg({ text, type });
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Fetch all database tables on load
  const loadData = async () => {
    const apiBase = import.meta.env.VITE_API_URL || "";
    try {
      setIsLoading(true);
      const [
        resBanner, resHero, resStories, resNews, resEvents, resOpps, resPos, resPartners
      ] = await Promise.all([
        fetch(`${apiBase}/api/banner`).then(r => r.json()),
        fetch(`${apiBase}/api/hero`).then(r => r.json()),
        fetch(`${apiBase}/api/stories`).then(r => r.json()),
        fetch(`${apiBase}/api/news`).then(r => r.json()),
        fetch(`${apiBase}/api/events`).then(r => r.json()),
        fetch(`${apiBase}/api/opportunities`).then(r => r.json()),
        fetch(`${apiBase}/api/positions`).then(r => r.json()),
        fetch(`${apiBase}/api/partners`).then(r => r.json()),
      ]);

      setBanner(resBanner);
      setHeroSlides(resHero);
      setStories(resStories);
      setNews(resNews);
      setEvents(resEvents);
      setOpportunities(resOpps);
      setPositions(resPos);
      setPartners(resPartners);
    } catch (err) {
      showToast("Error loading server data.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Update banner settings
  const handleBannerSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiBase = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${apiBase}/api/banner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(banner),
      });
      if (res.ok) {
        showToast("Banner settings updated!");
      }
    } catch {
      showToast("Failed to save banner.", "error");
    }
  };

  // Update hero slides URLs
  const handleHeroSave = async (idx: number, val: string) => {
    const apiBase = import.meta.env.VITE_API_URL || "";
    const nextSlides = [...heroSlides];
    nextSlides[idx] = val;
    setHeroSlides(nextSlides);
    try {
      const res = await fetch(`${apiBase}/api/hero`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides: nextSlides }),
      });
      if (res.ok) {
        showToast("Hero slide updated!");
      }
    } catch {
      showToast("Failed to save slides.", "error");
    }
  };

  // --- CRUD Operations ---
  const handleSaveItem = async (endpoint: string, itemType: string, body: any, isEdit: boolean) => {
    const apiBase = import.meta.env.VITE_API_URL || "";
    try {
      const url = isEdit ? `${apiBase}/api/${endpoint}/${editingItem.id}` : `${apiBase}/api/${endpoint}`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        showToast(`${itemType} ${isEdit ? "updated" : "created"}!`);
        setShowModal(null);
        setEditingItem(null);
        loadData();
      } else {
        showToast("Failed to save item.", "error");
      }
    } catch {
      showToast("Failed to save item.", "error");
    }
  };

  const handleDeleteItem = async (endpoint: string, itemType: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${itemType}?`)) return;
    const apiBase = import.meta.env.VITE_API_URL || "";
    try {
      const res = await fetch(`${apiBase}/api/${endpoint}/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`${itemType} deleted successfully.`);
        loadData();
      } else {
        showToast("Failed to delete.", "error");
      }
    } catch {
      showToast("Failed to delete.", "error");
    }
  };

  // Trigger modal for Edit modes
  const triggerEdit = (type: "story" | "news" | "event" | "opportunity" | "position", item: any) => {
    setEditingItem(item);
    if (type === "story") {
      setStoryForm({ ...item });
    } else if (type === "news") {
      setNewsForm({ ...item });
    } else if (type === "event") {
      setEventForm({ ...item });
    } else if (type === "opportunity") {
      setOppForm({ ...item });
    } else if (type === "position") {
      setPosForm({ ...item });
    }
    setShowModal(type);
  };

  const triggerAdd = (type: "story" | "news" | "event" | "opportunity" | "position") => {
    setEditingItem(null);
    if (type === "story") {
      setStoryForm({ title: "", tag: "Health", desc: "", author: "", readTime: "5 min read", img: "/src/assets/images/story-3.webp", content: [""] });
    } else if (type === "news") {
      setNewsForm({ title: "", img: "/src/assets/images/news_1.webp", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) });
    } else if (type === "event") {
      setEventForm({ date: "15", month: "NOV", title: "", loc: "", desc: "" });
    } else if (type === "opportunity") {
      setOppForm({ title: "", type: "Remote", commitment: "5-10 hours/week", desc: "" });
    } else if (type === "position") {
      setPosForm({ title: "", category: "Health", location: "", type: "Full-Time", desc: "" });
    }
    setShowModal(type);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 antialiased font-sans">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in border ${
          toastMsg.type === "success" 
            ? "bg-emerald-950 border-emerald-800 text-emerald-200" 
            : "bg-rose-950 border-rose-850 text-rose-200"
        }`}>
          {toastMsg.type === "success" ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
          <span className="font-semibold text-sm">{toastMsg.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between shrink-0">
        <div>
          <div className="p-8 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg text-white">G</div>
            <div>
              <h2 className="font-bold text-lg tracking-tight text-white">GSSIO</h2>
              <p className="text-xs text-slate-400 font-semibold uppercase">Admin Suite</p>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "banner-hero", label: "Banner & Hero Slides", icon: Megaphone },
              { id: "stories", label: "Stories Reader", icon: BookOpen },
              { id: "news", label: "Homepage News", icon: Newspaper },
              { id: "events", label: "Summit & Events", icon: Calendar },
              { id: "opportunities", label: "Volunteering roles", icon: Users },
              { id: "positions", label: "Career openings", icon: Briefcase },
              { id: "partners", label: "Partners Inquiry", icon: Handshake },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                    activeTab === tab.id 
                      ? "bg-blue-600/15 text-blue-400 border border-blue-600/30" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-800 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} GSSIO. All rights reserved.</p>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-500 hover:underline mt-2 font-bold">
            Open Website <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center gap-3 text-slate-400 font-semibold">
            <Loader className="w-8 h-8 animate-spin text-blue-500" /> Connecting to database...
          </div>
        ) : (
          <div className="animate-fade-in space-y-8">
            
            {/* Tab: Dashboard */}
            {activeTab === "dashboard" && (
              <div>
                <h1 className="text-3xl font-extrabold text-white mb-8">Dashboard Overview</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Stories Count</span>
                    <span className="text-4xl font-extrabold text-white block mt-2">{stories.length}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Careers Listed</span>
                    <span className="text-4xl font-extrabold text-white block mt-2">{positions.length}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Volunteer Roles</span>
                    <span className="text-4xl font-extrabold text-white block mt-2">{opportunities.length}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Upcoming Events</span>
                    <span className="text-4xl font-extrabold text-white block mt-2">{events.length}</span>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <span className="text-xs uppercase font-bold tracking-wider text-slate-500">Partners Inquiries</span>
                    <span className="text-4xl font-extrabold text-white block mt-2">{partners.length}</span>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                  <h3 className="text-xl font-bold mb-4">Quick Shortcuts</h3>
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Use the sidebar on the left to modify banner announcements, upload slider photos, change reports, edit job categories, publish emergency Cyclone alerts, or review business proposals.
                  </p>
                  <div className="flex gap-4">
                    <button onClick={() => setActiveTab("banner-hero")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm">
                      Configure Hero Images
                    </button>
                    <button onClick={() => setActiveTab("stories")} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded-lg border border-slate-700 transition-colors text-sm">
                      Write New Story
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Banner & Hero */}
            {activeTab === "banner-hero" && (
              <div className="space-y-12">
                <div>
                  <h1 className="text-3xl font-extrabold text-white mb-2">Banner & Slider Images</h1>
                  <p className="text-slate-400">Configure global top headers and homepage slideshow assets.</p>
                </div>

                {/* Banner Form */}
                <form onSubmit={handleBannerSave} className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6">
                  <h3 className="text-xl font-bold border-b border-slate-800 pb-4 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-blue-500" /> Announcement Banner
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Banner Text</label>
                      <input 
                        type="text" 
                        value={banner.text}
                        onChange={(e) => setBanner({ ...banner, text: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Link Text</label>
                      <input 
                        type="text" 
                        value={banner.linkText}
                        onChange={(e) => setBanner({ ...banner, linkText: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-bold text-slate-400 mb-2">Link URL / Anchor</label>
                      <input 
                        type="text" 
                        value={banner.linkUrl}
                        onChange={(e) => setBanner({ ...banner, linkUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500"
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Banner Config
                  </button>
                </form>

                {/* Hero Slides Editor */}
                <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6">
                  <h3 className="text-xl font-bold border-b border-slate-800 pb-4 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-blue-500" /> Hero Slider Images
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {heroSlides.map((slide, i) => (
                      <div key={i} className="space-y-4">
                        <span className="block text-sm font-bold text-slate-300">Slide Image {i + 1}</span>
                        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-slate-800 bg-slate-950 relative">
                          <img src={slide} alt={`Slide ${i}`} className="w-full h-full object-cover" onError={(e) => {
                            // If invalid URL displays fallback info icon
                            e.currentTarget.style.display = "none";
                          }} />
                        </div>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={slide}
                            onChange={(e) => {
                              const ns = [...heroSlides];
                              ns[i] = e.target.value;
                              setHeroSlides(ns);
                            }}
                            placeholder="Image asset path or external URL"
                            className="w-full bg-slate-950 border border-slate-850 rounded-lg p-3 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
                          />
                          <button 
                            onClick={() => handleHeroSave(i, slide)}
                            className="bg-slate-800 hover:bg-slate-700 text-white px-4 rounded-lg font-bold text-xs shrink-0 border border-slate-700"
                          >
                            Update Link
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Stories CRUD */}
            {activeTab === "stories" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Stories from the Field</h1>
                    <p className="text-slate-400">Configure global articles and impact stories.</p>
                  </div>
                  <button onClick={() => triggerAdd("story")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Story
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Story Title</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Date</th>
                        <th className="p-5">Author</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {stories.map(st => (
                        <tr key={st.id} className="hover:bg-slate-850/50">
                          <td className="p-5 text-white max-w-xs truncate">{st.title}</td>
                          <td className="p-5"><span className="px-2.5 py-1 bg-slate-800 text-blue-400 rounded-md text-xs">{st.tag}</span></td>
                          <td className="p-5 text-slate-400">{st.date}</td>
                          <td className="p-5 text-slate-400">{st.author.split(",")[0]}</td>
                          <td className="p-5 text-right space-x-2 shrink-0">
                            <button onClick={() => triggerEdit("story", st)} className="bg-slate-850 text-slate-300 p-2 rounded-lg hover:text-white border border-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("stories", "Story", st.id)} className="bg-red-950/20 text-red-400 p-2 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: News CRUD */}
            {activeTab === "news" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Homepage Latest News</h1>
                    <p className="text-slate-400">Configure cards under the 'Latest News' section on the homepage.</p>
                  </div>
                  <button onClick={() => triggerAdd("news")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add News Item
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Title</th>
                        <th className="p-5">Publish Date</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {news.map(nw => (
                        <tr key={nw.id} className="hover:bg-slate-850/50">
                          <td className="p-5 text-white max-w-sm truncate">{nw.title}</td>
                          <td className="p-5 text-slate-400">{nw.date}</td>
                          <td className="p-5 text-right space-x-2">
                            <button onClick={() => triggerEdit("news", nw)} className="bg-slate-850 text-slate-300 p-2 rounded-lg hover:text-white border border-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("news", "News", nw.id)} className="bg-red-950/20 text-red-400 p-2 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Events CRUD */}
            {activeTab === "events" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Summit & Calendar Events</h1>
                    <p className="text-slate-400">Configure global summit outline and regional events schedules.</p>
                  </div>
                  <button onClick={() => triggerAdd("event")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Event
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Event Title</th>
                        <th className="p-5">Date</th>
                        <th className="p-5">Location</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {events.map(ev => (
                        <tr key={ev.id} className="hover:bg-slate-850/50">
                          <td className="p-5 text-white">{ev.title}</td>
                          <td className="p-5 text-slate-400">{ev.date} {ev.month}</td>
                          <td className="p-5 text-slate-400">{ev.loc}</td>
                          <td className="p-5 text-right space-x-2">
                            <button onClick={() => triggerEdit("event", ev)} className="bg-slate-850 text-slate-300 p-2 rounded-lg hover:text-white border border-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("events", "Event", ev.id)} className="bg-red-950/20 text-red-400 p-2 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Volunteering CRUD */}
            {activeTab === "opportunities" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Volunteer Opportunities</h1>
                    <p className="text-slate-400">Configure roles in the Volunteering section of the site.</p>
                  </div>
                  <button onClick={() => triggerAdd("opportunity")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Volunteer Role
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Opportunity Role</th>
                        <th className="p-5">Location Type</th>
                        <th className="p-5">Commitment</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {opportunities.map(opp => (
                        <tr key={opp.id} className="hover:bg-slate-850/50">
                          <td className="p-5 text-white">{opp.title}</td>
                          <td className="p-5 text-slate-400">{opp.type}</td>
                          <td className="p-5 text-slate-400">{opp.commitment}</td>
                          <td className="p-5 text-right space-x-2">
                            <button onClick={() => triggerEdit("opportunity", opp)} className="bg-slate-850 text-slate-300 p-2 rounded-lg hover:text-white border border-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("opportunities", "Opportunity", opp.id)} className="bg-red-950/20 text-red-400 p-2 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Careers CRUD */}
            {activeTab === "positions" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Career Open Positions</h1>
                    <p className="text-slate-400">Configure global job listings.</p>
                  </div>
                  <button onClick={() => triggerAdd("position")} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Job Listing
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Position Title</th>
                        <th className="p-5">Department</th>
                        <th className="p-5">Location</th>
                        <th className="p-5">Contract Class</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {positions.map(pos => (
                        <tr key={pos.id} className="hover:bg-slate-850/50">
                          <td className="p-5 text-white">{pos.title}</td>
                          <td className="p-5"><span className="px-2.5 py-1 bg-slate-800 text-slate-300 rounded-md text-xs">{pos.category}</span></td>
                          <td className="p-5 text-slate-400">{pos.location}</td>
                          <td className="p-5 text-slate-400">{pos.type}</td>
                          <td className="p-5 text-right space-x-2">
                            <button onClick={() => triggerEdit("position", pos)} className="bg-slate-850 text-slate-300 p-2 rounded-lg hover:text-white border border-slate-700 transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("positions", "Position", pos.id)} className="bg-red-950/20 text-red-400 p-2 rounded-lg hover:bg-red-950/40 border border-red-900/30 transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab: Partners Inbox */}
            {activeTab === "partners" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-white mb-2">Partnership Inquiries Inbox</h1>
                  <p className="text-slate-400">View and respond to inquiries submitted by external organizations.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-950 text-slate-400 text-xs font-bold uppercase tracking-wider border-b border-slate-800">
                        <th className="p-5">Organization</th>
                        <th className="p-5">Contact Lead</th>
                        <th className="p-5">Contact Details</th>
                        <th className="p-5">Focus Sector</th>
                        <th className="p-5">Submission Date</th>
                        <th className="p-5">Inquiry Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-sm font-semibold">
                      {partners.map(pt => (
                        <tr key={pt.id} className="hover:bg-slate-850/50 align-top">
                          <td className="p-5 text-white font-bold">
                            {pt.orgName}
                            <span className="block text-[10px] text-blue-400 font-bold uppercase mt-1">{pt.partnerType}</span>
                          </td>
                          <td className="p-5 text-slate-300 font-bold">{pt.contactName}</td>
                          <td className="p-5 text-slate-400 font-medium">
                            <span className="block">{pt.email}</span>
                            <span className="block text-xs">{pt.phone}</span>
                          </td>
                          <td className="p-5"><span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs">{pt.focusArea}</span></td>
                          <td className="p-5 text-slate-400 font-medium">{pt.date}</td>
                          <td className="p-5 text-slate-300 max-w-sm font-medium text-xs whitespace-pre-wrap leading-relaxed">
                            {pt.proposal}
                          </td>
                        </tr>
                      ))}
                      {partners.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500 font-bold">
                            No partnership inquiries have been received yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* --- MODAL DIALOGS --- */}

            {/* Modal: Story Editor */}
            {showModal === "story" && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white">{editingItem ? "Edit Story Details" : "Add New Story"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("stories", "Story", storyForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Article Title</label>
                      <input type="text" value={storyForm.title || ""} onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Category Tag</label>
                        <select value={storyForm.tag || "Health"} onChange={(e) => setStoryForm({ ...storyForm, tag: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-950">
                          <option>Health</option>
                          <option>Water</option>
                          <option>Education</option>
                          <option>Agriculture</option>
                          <option>Disaster Relief</option>
                          <option>Human Rights</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Author</label>
                        <input type="text" value={storyForm.author || ""} onChange={(e) => setStoryForm({ ...storyForm, author: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Read Time</label>
                        <input type="text" value={storyForm.readTime || ""} onChange={(e) => setStoryForm({ ...storyForm, readTime: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Date</label>
                        <input type="text" value={storyForm.date || ""} onChange={(e) => setStoryForm({ ...storyForm, date: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Image URL / Path</label>
                      <input type="text" value={storyForm.img || ""} onChange={(e) => setStoryForm({ ...storyForm, img: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Summary Description</label>
                      <textarea rows={3} value={storyForm.desc || ""} onChange={(e) => setStoryForm({ ...storyForm, desc: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Article Content Paragraphs (Joined by line breaks)</label>
                      <textarea rows={5} value={storyForm.content?.join("\n") || ""} onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value.split("\n") })} placeholder="Separate paragraphs by hitting enter" className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-xs focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Article</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: News Editor */}
            {showModal === "news" && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white">{editingItem ? "Edit News Item" : "Add News Item"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("news", "News", newsForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">News Title</label>
                      <textarea rows={3} value={newsForm.title || ""} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Publish Date</label>
                      <input type="text" value={newsForm.date || ""} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Image URL / Path</label>
                      <input type="text" value={newsForm.img || ""} onChange={(e) => setNewsForm({ ...newsForm, img: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save News</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Event Editor */}
            {showModal === "event" && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white">{editingItem ? "Edit Calendar Event" : "Add Calendar Event"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("events", "Event", eventForm, !!editingItem);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Day (Number)</label>
                        <input type="text" placeholder="e.g. 15" value={eventForm.date || ""} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Month (Code)</label>
                        <input type="text" placeholder="e.g. NOV" value={eventForm.month || ""} onChange={(e) => setEventForm({ ...eventForm, month: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Event Title</label>
                      <input type="text" value={eventForm.title || ""} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Location</label>
                      <input type="text" placeholder="e.g. Nairobi, Kenya" value={eventForm.loc || ""} onChange={(e) => setEventForm({ ...eventForm, loc: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Short Description</label>
                      <textarea rows={3} value={eventForm.desc || ""} onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Event</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Opportunity Editor */}
            {showModal === "opportunity" && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white">{editingItem ? "Edit Volunteer Role" : "Add Volunteer Role"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("opportunities", "Opportunity", oppForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Opportunity Title</label>
                      <input type="text" value={oppForm.title || ""} onChange={(e) => setOppForm({ ...oppForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Location Type</label>
                      <input type="text" placeholder="e.g. Remote / On-site" value={oppForm.type || ""} onChange={(e) => setOppForm({ ...oppForm, type: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Commitment Time</label>
                      <input type="text" placeholder="e.g. 5-10 hours/week" value={oppForm.commitment || ""} onChange={(e) => setOppForm({ ...oppForm, commitment: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Description</label>
                      <textarea rows={4} value={oppForm.desc || ""} onChange={(e) => setOppForm({ ...oppForm, desc: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Role</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Job Position Editor */}
            {showModal === "position" && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                    <h3 className="text-xl font-bold text-white">{editingItem ? "Edit Job Listing" : "Add Job Listing"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("positions", "Position", posForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Job Title</label>
                      <input type="text" value={posForm.title || ""} onChange={(e) => setPosForm({ ...posForm, title: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Category</label>
                        <select value={posForm.category || "Health"} onChange={(e) => setPosForm({ ...posForm, category: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-950">
                          <option>Health</option>
                          <option>Climate</option>
                          <option>Operations</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Location</label>
                        <input type="text" placeholder="e.g. Geneva, Switzerland" value={posForm.location || ""} onChange={(e) => setPosForm({ ...posForm, location: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Type</label>
                        <select value={posForm.type || "Full-Time"} onChange={(e) => setPosForm({ ...posForm, type: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-slate-950">
                          <option>Full-Time</option>
                          <option>Contract</option>
                          <option>Part-Time</option>
                          <option>Remote</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Job Description</label>
                      <textarea rows={4} value={posForm.desc || ""} onChange={(e) => setPosForm({ ...posForm, desc: e.target.value })} className="w-full bg-slate-950 border border-slate-805 rounded-lg p-3 text-slate-200 text-sm focus:outline-none focus:border-blue-500" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Job</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}
