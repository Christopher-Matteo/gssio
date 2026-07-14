import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Briefcase, MapPin, Building, ShieldCheck, HeartHandshake, Smile, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Positions() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "Senior Health Policy Advisor",
    resumeLink: "",
    coverLetter: "",
  });

  const categories = ["All", "Health", "Climate", "Operations"];

  const positionsList = [
    {
      title: "Senior Health Policy Advisor",
      category: "Health",
      location: "Geneva, Switzerland",
      type: "Full-Time",
      desc: "Lead GSSIO's engagement with global health bodies, coordinate vaccination programs, and design scalable primary health policies for rural centers.",
    },
    {
      title: "Climate Change Adaptation Specialist",
      category: "Climate",
      location: "Nairobi, Kenya",
      type: "Full-Time",
      desc: "Implement sustainable agriculture systems, oversee agroforestry projects, and help local farmers implement climate-resilient practices.",
    },
    {
      title: "Emergency Operations Manager",
      category: "Operations",
      location: "Bangkok, Thailand",
      type: "Full-Time",
      desc: "Coordinate rapid-response logistics in natural disaster and conflict zones. Manage distribution pipelines and field response personnel.",
    },
    {
      title: "Sustainable Grants Coordinator",
      category: "Operations",
      location: "Remote / Geneva",
      type: "Contract",
      desc: "Oversee grant applications, monitor budget distributions for global water projects, and ensure reporting compliance with donor agencies.",
    },
    {
      title: "Director of Girls' Education Programs",
      category: "Operations",
      location: "New York, USA",
      type: "Full-Time",
      desc: "Steer GSSIO's global education initiatives, grow scholarship fund portfolios, and coordinate local school construction guidelines.",
    },
  ];

  const filteredPositions = activeCategory === "All" 
    ? positionsList 
    : positionsList.filter(pos => pos.category === activeCategory);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: "Application Received!",
      description: `Your application for the ${formData.position} position has been successfully registered.`,
    });
  };

  return (
    <div className="py-16 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/get-involved" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Get Involved
        </Link>

        {/* Hero Area */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Careers with Purpose
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At GSSIO, we bring together researchers, logistic experts, health professionals, and field coordinators to build a sustainable, equitable future. Discover your next role and build a career that changes lives.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 border rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Comprehensive Security</h3>
            <p className="text-sm text-muted-foreground">Competitive international salaries, full medical and life insurance, and robust retirement contributions.</p>
          </div>
          <div className="bg-white p-8 border rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Global Mobility</h3>
            <p className="text-sm text-muted-foreground">Opportunities to transfer between headquarters and our regional hubs in Geneva, New York, Nairobi, and Bangkok.</p>
          </div>
          <div className="bg-white p-8 border rounded-xl shadow-sm text-center">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Inclusive Culture</h3>
            <p className="text-sm text-muted-foreground">Diverse, multilingual, and highly collaborative environment focused on equity and continuous learning.</p>
          </div>
        </div>

        {/* Categories / Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-6 font-semibold ${
                activeCategory === cat ? "bg-primary text-white" : "border-border text-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Positions List */}
        <div className="space-y-6 mb-20">
          {filteredPositions.map((pos, idx) => (
            <div key={idx} className="bg-white border rounded-xl p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="space-y-3 max-w-2xl">
                <h3 className="text-2xl font-bold text-foreground">{pos.title}</h3>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-primary">
                    <Briefcase className="w-3.5 h-3.5" />
                    {pos.type}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {pos.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" />
                    {pos.category}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{pos.desc}</p>
              </div>
              <div className="shrink-0">
                <a href="#apply-job-form">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-lg"
                    onClick={() => setFormData(prev => ({ ...prev, position: pos.title }))}
                  >
                    Apply Now
                  </Button>
                </a>
              </div>
            </div>
          ))}
          {filteredPositions.length === 0 && (
            <div className="text-center py-12 border bg-white rounded-xl">
              <p className="text-muted-foreground font-semibold">No open roles currently listed in this category. Please check back soon!</p>
            </div>
          )}
        </div>

        {/* Job Application Form */}
        <div id="apply-job-form" className="bg-white border rounded-xl p-8 sm:p-12 shadow-lg scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Application Complete</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Your application for the <strong>{formData.position}</strong> position has been registered. An HR representative will reach out to you if your profile matches the qualifications.
                </p>
                <Button 
                  onClick={() => setFormSubmitted(false)} 
                  className="bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  View Open Positions
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">Job Application</h2>
                <p className="text-muted-foreground text-center mb-10">
                  Submit your details below to apply for your preferred global career path.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">First Name</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Selected Position</label>
                      <select 
                        name="position" 
                        value={formData.position}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        {positionsList.map((pos, i) => (
                          <option key={i} value={pos.title}>{pos.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Resume URL / Link</label>
                      <input 
                        type="url" 
                        name="resumeLink" 
                        placeholder="Link to LinkedIn profile, GDrive file, or PDF"
                        value={formData.resumeLink}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Cover Letter</label>
                    <textarea 
                      rows={5} 
                      name="coverLetter" 
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Outline your background, your research / project management credentials, and why GSSIO matches your career goals."
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-sm">
                    Submit Application
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
