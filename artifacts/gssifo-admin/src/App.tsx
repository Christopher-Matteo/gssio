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
  Loader,
  TrendingUp,
  MapPin,
  Clock
} from "lucide-react";

// Interfaces
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
    <div className="flex min-h-screen bg-slate-50 text-slate-900 antialiased">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-lg border flex items-center gap-3 animate-fade-in ${
          toastMsg.type === "success" 
            ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
            : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          {toastMsg.type === "success" ? <Check className="w-5 h-5 text-emerald-600" /> : <X className="w-5 h-5 text-rose-600" />}
          <span className="font-bold text-sm">{toastMsg.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          <div className="p-8 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-extrabold text-xl text-white shadow-md shadow-blue-500/25">G</div>
            <div>
              <h2 className="font-extrabold text-lg leading-tight text-slate-900 tracking-tight">GSSIFO Hub</h2>
              <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mt-0.5">Control Center</p>
            </div>
          </div>
          <nav className="p-4 space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "banner-hero", label: "Banner & Hero Slides", icon: Megaphone },
              { id: "stories", label: "Stories & Articles", icon: BookOpen },
              { id: "news", label: "Homepage News", icon: Newspaper },
              { id: "events", label: "Events Calendar", icon: Calendar },
              { id: "opportunities", label: "Volunteering Roles", icon: Users },
              { id: "positions", label: "Careers Openings", icon: Briefcase },
              { id: "partners", label: "Partnership Inbox", icon: Handshake },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-left text-sm font-bold transition-all relative ${
                    activeTab === tab.id 
                      ? "bg-blue-50 text-blue-600 shadow-sm border border-blue-100" 
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                  }`}
                >
                  {activeTab === tab.id && (
                    <span className="absolute left-0 top-3 bottom-3 w-1 bg-blue-600 rounded-r-full" />
                  )}
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-400 font-bold">© {new Date().getFullYear()} GSSIFO Admin</p>
          <a href="/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-extrabold text-xs mt-3 transition-colors">
            View Live Website <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-grow p-10 overflow-y-auto max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center gap-3 text-slate-500 font-bold">
            <Loader className="w-6 h-6 animate-spin text-blue-600" /> Connecting to server...
          </div>
        ) : (
          <div className="animate-fade-in space-y-8">
            
            {/* Header section with live status */}
            <div className="flex justify-between items-center border-b border-slate-200 pb-6">
              <div>
                <span className="text-xs text-slate-400 font-extrabold uppercase tracking-widest">Workspace</span>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                  {activeTab === "dashboard" && "Dashboard Overview"}
                  {activeTab === "banner-hero" && "Banner & Slide Configurations"}
                  {activeTab === "stories" && "Impact Stories Publications"}
                  {activeTab === "news" && "Press & News Releases"}
                  {activeTab === "events" && "Global Calendar Events"}
                  {activeTab === "opportunities" && "Volunteer Positions"}
                  {activeTab === "positions" && "Career Opportunities"}
                  {activeTab === "partners" && "Partnership Inbox"}
                </h1>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200 text-xs font-bold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                GSSIFO Core API: Active
              </div>
            </div>

            {/* Tab: Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { title: "Stories from the Field", count: stories.length, icon: BookOpen, color: "text-blue-600 bg-blue-50 border-blue-100" },
                    { title: "Active Careers Listed", count: positions.length, icon: Briefcase, color: "text-indigo-600 bg-indigo-50 border-indigo-100" },
                    { title: "Volunteer Openings", count: opportunities.length, icon: Users, color: "text-sky-600 bg-sky-50 border-sky-100" },
                    { title: "Summit & Schedule Events", count: events.length, icon: Calendar, color: "text-amber-600 bg-amber-50 border-amber-100" },
                    { title: "Submitted Partnerships", count: partners.length, icon: Handshake, color: "text-emerald-600 bg-emerald-50 border-emerald-100" },
                  ].map((card, idx) => {
                    const Icon = card.icon;
                    return (
                      <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">{card.title}</span>
                          <span className="text-3xl font-extrabold text-slate-900 block mt-2">{card.count}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${card.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dashboard Action Box */}
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <TrendingUp className="text-blue-600 w-6 h-6" /> Dynamic Content Control
                    </h3>
                    <p className="text-slate-600 mt-2.5 leading-relaxed text-sm font-semibold">
                      Welcome to your admin console. All tables here synchronize in real-time with the GSSIFO main portal. To update homepage image sliders, news announcements, summits, or read partners inquiry emails, select their respective tabs.
                    </p>
                  </div>
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => setActiveTab("banner-hero")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm">
                      Change Hero Sliders
                    </button>
                    <button onClick={() => triggerAdd("story")} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-3 rounded-xl transition-all border border-slate-200 text-sm">
                      Write New Story
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Banner & Hero */}
            {activeTab === "banner-hero" && (
              <div className="space-y-8">
                {/* Banner Editor */}
                <form onSubmit={handleBannerSave} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
                  <h3 className="text-lg font-extrabold border-b border-slate-100 pb-4 flex items-center gap-2 text-slate-900">
                    <Megaphone className="w-5 h-5 text-blue-600" /> Announcement Banner Control
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-xs uppercase font-extrabold text-slate-500 mb-2">Banner Message Text</label>
                      <input 
                        type="text" 
                        value={banner.text}
                        onChange={(e) => setBanner({ ...banner, text: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-extrabold text-slate-500 mb-2">Link Button Text</label>
                      <input 
                        type="text" 
                        value={banner.linkText}
                        onChange={(e) => setBanner({ ...banner, linkText: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all"
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-extrabold text-slate-500 mb-2">Link Target URL</label>
                      <input 
                        type="text" 
                        value={banner.linkUrl}
                        onChange={(e) => setBanner({ ...banner, linkUrl: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all"
                        required 
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center gap-2 text-sm">
                    <Save className="w-4 h-4" /> Save Banner Config
                  </button>
                </form>

                {/* Hero Slides Editor */}
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
                  <h3 className="text-lg font-extrabold border-b border-slate-100 pb-4 flex items-center gap-2 text-slate-900">
                    <ImageIcon className="w-5 h-5 text-blue-600" /> Slideshow Gallery Cover Photos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {heroSlides.map((slide, i) => (
                      <div key={i} className="space-y-4">
                        <span className="block text-sm font-extrabold text-slate-700">Homepage Slide {i + 1}</span>
                        <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 relative shadow-inner">
                          <img src={slide} alt={`Slide ${i}`} className="w-full h-full object-cover" onError={(e) => {
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
                            placeholder="Static photo path or image URL"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all"
                          />
                          <button 
                            onClick={() => handleHeroSave(i, slide)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl font-extrabold text-xs transition-colors shrink-0 shadow-md shadow-blue-500/10"
                          >
                            Update Slide
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
                    <h2 className="text-xl font-extrabold text-slate-900">Articles & Impact Stories</h2>
                    <p className="text-sm text-slate-500">Edit, add, or delete stories from GSSIFO operations.</p>
                  </div>
                  <button onClick={() => triggerAdd("story")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Story
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">Story Title</th>
                        <th className="p-5">Category</th>
                        <th className="p-5">Author</th>
                        <th className="p-5">Publish Date</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {stories.map(st => (
                        <tr key={st.id} className="hover:bg-slate-50/50">
                          <td className="p-5 text-slate-900 font-extrabold max-w-sm truncate">{st.title}</td>
                          <td className="p-5">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
                              {st.tag}
                            </span>
                          </td>
                          <td className="p-5 text-slate-600">{st.author.split(",")[0]}</td>
                          <td className="p-5 text-slate-500">{st.date}</td>
                          <td className="p-5 text-right space-x-1.5">
                            <button onClick={() => triggerEdit("story", st)} className="bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 transition-all shadow-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("stories", "Story", st.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl border border-red-100 transition-all">
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
                    <h2 className="text-xl font-extrabold text-slate-900">Latest Press Releases</h2>
                    <p className="text-sm text-slate-500">Manage three core spotlight news items visible on the home page.</p>
                  </div>
                  <button onClick={() => triggerAdd("news")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add News
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">News Title</th>
                        <th className="p-5">Date</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {news.map(nw => (
                        <tr key={nw.id} className="hover:bg-slate-50/50">
                          <td className="p-5 text-slate-900 font-extrabold max-w-lg truncate">{nw.title}</td>
                          <td className="p-5 text-slate-500">{nw.date}</td>
                          <td className="p-5 text-right space-x-1.5">
                            <button onClick={() => triggerEdit("news", nw)} className="bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 transition-all shadow-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("news", "News", nw.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl border border-red-100 transition-all">
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
                    <h2 className="text-xl font-extrabold text-slate-900">Upcoming Calendar & Summit Events</h2>
                    <p className="text-sm text-slate-500">Manage registration events visible on GSSIFO pages.</p>
                  </div>
                  <button onClick={() => triggerAdd("event")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Event
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">Event Title</th>
                        <th className="p-5">Date Code</th>
                        <th className="p-5">Location</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {events.map(ev => (
                        <tr key={ev.id} className="hover:bg-slate-50/50">
                          <td className="p-5 text-slate-900 font-extrabold">{ev.title}</td>
                          <td className="p-5 text-slate-600">{ev.date} {ev.month}</td>
                          <td className="p-5 text-slate-500 flex items-center gap-1 mt-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.loc}</td>
                          <td className="p-5 text-right space-x-1.5">
                            <button onClick={() => triggerEdit("event", ev)} className="bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 transition-all shadow-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("events", "Event", ev.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl border border-red-100 transition-all">
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
                    <h2 className="text-xl font-extrabold text-slate-900">Volunteer Opportunities</h2>
                    <p className="text-sm text-slate-500">Edit or add roles inside the volunteering options dropdown form.</p>
                  </div>
                  <button onClick={() => triggerAdd("opportunity")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Role
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">Opportunity Title</th>
                        <th className="p-5">Location Type</th>
                        <th className="p-5">Commitment</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {opportunities.map(opp => (
                        <tr key={opp.id} className="hover:bg-slate-50/50">
                          <td className="p-5 text-slate-900 font-extrabold">{opp.title}</td>
                          <td className="p-5 text-slate-600">{opp.type}</td>
                          <td className="p-5 text-slate-550 flex items-center gap-1 mt-1.5"><Clock className="w-3.5 h-3.5 text-slate-400" /> {opp.commitment}</td>
                          <td className="p-5 text-right space-x-1.5">
                            <button onClick={() => triggerEdit("opportunity", opp)} className="bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 transition-all shadow-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("opportunities", "Opportunity", opp.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl border border-red-100 transition-all">
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
                    <h2 className="text-xl font-extrabold text-slate-900">Career Positions</h2>
                    <p className="text-sm text-slate-500">Add, edit, or archive career listings.</p>
                  </div>
                  <button onClick={() => triggerAdd("position")} className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/10 text-sm flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Job Listing
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">Position Title</th>
                        <th className="p-5">Department</th>
                        <th className="p-5">Location</th>
                        <th className="p-5">Contract Type</th>
                        <th className="p-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {positions.map(pos => (
                        <tr key={pos.id} className="hover:bg-slate-50/50">
                          <td className="p-5 text-slate-900 font-extrabold">{pos.title}</td>
                          <td className="p-5">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">
                              {pos.category}
                            </span>
                          </td>
                          <td className="p-5 text-slate-600 flex items-center gap-1 mt-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {pos.location}</td>
                          <td className="p-5 text-slate-500">{pos.type}</td>
                          <td className="p-5 text-right space-x-1.5">
                            <button onClick={() => triggerEdit("position", pos)} className="bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-xl border border-slate-200 transition-all shadow-sm">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteItem("positions", "Position", pos.id)} className="bg-red-50 hover:bg-red-100 text-red-600 p-2 rounded-xl border border-red-100 transition-all">
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
                  <h2 className="text-xl font-extrabold text-slate-900">Partnership Proposals Inbox</h2>
                  <p className="text-sm text-slate-500">Read and process applications submitted by organizations.</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-extrabold uppercase tracking-wider border-b border-slate-200">
                        <th className="p-5">Organization</th>
                        <th className="p-5">Contact Lead</th>
                        <th className="p-5">Contact Info</th>
                        <th className="p-5">Focus Area</th>
                        <th className="p-5">Date Received</th>
                        <th className="p-5">Proposal Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
                      {partners.map(pt => (
                        <tr key={pt.id} className="hover:bg-slate-50/50 align-top">
                          <td className="p-5 text-slate-900 font-extrabold">
                            {pt.orgName}
                            <span className="block text-[10px] text-blue-600 font-extrabold uppercase mt-1 tracking-wider">{pt.partnerType}</span>
                          </td>
                          <td className="p-5 text-slate-700 font-extrabold">{pt.contactName}</td>
                          <td className="p-5 text-slate-500 font-semibold text-xs leading-relaxed">
                            <span className="block font-bold text-slate-750">{pt.email}</span>
                            <span className="block text-slate-400">{pt.phone}</span>
                          </td>
                          <td className="p-5">
                            <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-bold border border-slate-200">
                              {pt.focusArea}
                            </span>
                          </td>
                          <td className="p-5 text-slate-500">{pt.date}</td>
                          <td className="p-5 text-slate-650 max-w-sm text-xs leading-relaxed whitespace-pre-wrap font-medium">
                            {pt.proposal}
                          </td>
                        </tr>
                      ))}
                      {partners.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-12 text-center text-slate-400 font-bold">
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
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{editingItem ? "Edit Story Details" : "Add New Story"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("stories", "Story", storyForm, !!editingItem);
                  }} className="space-y-5">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Article Title</label>
                      <input type="text" value={storyForm.title || ""} onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Category Tag</label>
                        <select value={storyForm.tag || "Health"} onChange={(e) => setStoryForm({ ...storyForm, tag: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all">
                          <option>Health</option>
                          <option>Water</option>
                          <option>Education</option>
                          <option>Agriculture</option>
                          <option>Disaster Relief</option>
                          <option>Human Rights</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Author</label>
                        <input type="text" value={storyForm.author || ""} onChange={(e) => setStoryForm({ ...storyForm, author: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Read Time</label>
                        <input type="text" value={storyForm.readTime || ""} onChange={(e) => setStoryForm({ ...storyForm, readTime: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Date</label>
                        <input type="text" value={storyForm.date || ""} onChange={(e) => setStoryForm({ ...storyForm, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Image URL / Path</label>
                      <input type="text" value={storyForm.img || ""} onChange={(e) => setStoryForm({ ...storyForm, img: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Summary Description</label>
                      <textarea rows={3} value={storyForm.desc || ""} onChange={(e) => setStoryForm({ ...storyForm, desc: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Article Content Paragraphs (Hit enter for separate paragraphs)</label>
                      <textarea rows={5} value={storyForm.content?.join("\n") || ""} onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value.split("\n") })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-200">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Article</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: News Editor */}
            {showModal === "news" && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{editingItem ? "Edit News Item" : "Add News Item"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("news", "News", newsForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">News Title</label>
                      <textarea rows={3} value={newsForm.title || ""} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Publish Date</label>
                      <input type="text" value={newsForm.date || ""} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Image URL / Path</label>
                      <input type="text" value={newsForm.img || ""} onChange={(e) => setNewsForm({ ...newsForm, img: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-200">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"><Save className="w-4 h-4" /> Save News</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Event Editor */}
            {showModal === "event" && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{editingItem ? "Edit Calendar Event" : "Add Calendar Event"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("events", "Event", eventForm, !!editingItem);
                  }} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Day (Number)</label>
                        <input type="text" placeholder="e.g. 15" value={eventForm.date || ""} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Month (Code)</label>
                        <input type="text" placeholder="e.g. NOV" value={eventForm.month || ""} onChange={(e) => setEventForm({ ...eventForm, month: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Event Title</label>
                      <input type="text" value={eventForm.title || ""} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Location</label>
                      <input type="text" placeholder="e.g. Geneva, Switzerland" value={eventForm.loc || ""} onChange={(e) => setEventForm({ ...eventForm, loc: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Short Description</label>
                      <textarea rows={3} value={eventForm.desc || ""} onChange={(e) => setEventForm({ ...eventForm, desc: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-200">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Event</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Opportunity Editor */}
            {showModal === "opportunity" && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{editingItem ? "Edit Volunteer Role" : "Add Volunteer Role"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("opportunities", "Opportunity", oppForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Opportunity Title</label>
                      <input type="text" value={oppForm.title || ""} onChange={(e) => setOppForm({ ...oppForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Location Type</label>
                      <input type="text" placeholder="e.g. Remote / On-site" value={oppForm.type || ""} onChange={(e) => setOppForm({ ...oppForm, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Commitment Time</label>
                      <input type="text" placeholder="e.g. 5-10 hours/week" value={oppForm.commitment || ""} onChange={(e) => setOppForm({ ...oppForm, commitment: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Description</label>
                      <textarea rows={4} value={oppForm.desc || ""} onChange={(e) => setOppForm({ ...oppForm, desc: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-200">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Role</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Job Position Editor */}
            {showModal === "position" && (
              <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg shadow-2xl p-8 animate-fade-in space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-extrabold text-slate-900">{editingItem ? "Edit Job Listing" : "Add Job Listing"}</h3>
                    <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-slate-900 transition-colors"><X className="w-5 h-5" /></button>
                  </div>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveItem("positions", "Position", posForm, !!editingItem);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Job Title</label>
                      <input type="text" value={posForm.title || ""} onChange={(e) => setPosForm({ ...posForm, title: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Category</label>
                        <select value={posForm.category || "Health"} onChange={(e) => setPosForm({ ...posForm, category: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all">
                          <option>Health</option>
                          <option>Climate</option>
                          <option>Operations</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Location</label>
                        <input type="text" placeholder="e.g. Geneva, Switzerland" value={posForm.location || ""} onChange={(e) => setPosForm({ ...posForm, location: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required />
                      </div>
                      <div>
                        <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Type</label>
                        <select value={posForm.type || "Full-Time"} onChange={(e) => setPosForm({ ...posForm, type: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all">
                          <option>Full-Time</option>
                          <option>Contract</option>
                          <option>Part-Time</option>
                          <option>Remote</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase text-slate-500 mb-1.5">Job Description</label>
                      <textarea rows={4} value={posForm.desc || ""} onChange={(e) => setPosForm({ ...posForm, desc: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/25 focus:border-blue-600 focus:bg-white transition-all" required></textarea>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      <button type="button" onClick={() => setShowModal(null)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold px-5 py-2.5 rounded-xl text-sm transition-colors border border-slate-200">Cancel</button>
                      <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-5 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-blue-500/10 flex items-center gap-1.5"><Save className="w-4 h-4" /> Save Job</button>
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
