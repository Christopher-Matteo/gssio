import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Users, Heart, Globe, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import volunteerImg from "@/assets/images/volunteer-action.webp";

export default function Opportunities() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    opportunity: "Local Advocacy Coordinator",
    availability: "Flexible",
    message: "",
  });

  const defaultOpps = [
    {
      title: "Local Advocacy Coordinator",
      type: "Remote / Community-Based",
      commitment: "5-10 hours/week",
      desc: "Organize local campaigns, manage regional outreach events, and raise awareness on critical climate and sustainability initiatives.",
      icon: Users,
    },
    {
      title: "Clean Water Project Assistant",
      type: "On-site (Sub-Saharan Africa / Asia)",
      commitment: "2-4 weeks (Field deployment)",
      desc: "Assist our engineering teams on the ground with mapping water points, conducting local sanitation workshops, and distributing supplies.",
      icon: Globe,
    },
    {
      title: "Crisis Relief Logistics volunteer",
      type: "On-site or Remote Support",
      commitment: "On-call / Emergency-based",
      desc: "Help coordinate supply lines, translate community requests, or support distribution centers in the wake of humanitarian crises.",
      icon: Heart,
    },
    {
      title: "Youth Mentor & Education Helper",
      type: "Hybrid / Remote Sessions",
      commitment: "2-4 hours/week",
      desc: "Provide academic tutoring or career mentorship to young girls enrolled in our global education scholarship programs.",
      icon: Calendar,
    },
  ];

  const [opportunitiesList, setOpportunitiesList] = useState<any[]>(defaultOpps);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL || "";
    fetch(`${apiBase}/api/opportunities`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const icons = [Users, Globe, Heart, Calendar];
          const mapped = data.map((item, idx) => ({
            ...item,
            icon: icons[idx % icons.length]
          }));
          setOpportunitiesList(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    toast({
      title: "Application Submitted Successfully!",
      description: "Thank you for applying. A volunteer coordinator will contact you within 3 business days.",
    });
  };

  return (
    <div className="py-16 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/get-involved" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Get Involved
        </Link>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              Volunteer Opportunities
            </h1>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              When you volunteer with GSSIO, you are not just offering your time; you are joining a global community of over 12,000 active advocates dedicated to building sustainable and resilient environments.
            </p>
            <div className="flex gap-8 border-t pt-6">
              <div>
                <span className="text-3xl font-bold text-primary block">12k+</span>
                <span className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">Active Volunteers</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-secondary block">45</span>
                <span className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">Countries Involved</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-accent block">200k+</span>
                <span className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">Hours Logged</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 rounded-2xl overflow-hidden shadow-lg bg-muted border aspect-[4/3] w-full">
            <img src={volunteerImg} alt="GSSIO volunteers in action" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Opportunities List */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-foreground text-center">Available Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {opportunitiesList.map((opp, idx) => {
            const Icon = opp.icon;
            return (
              <div key={idx} className="bg-white border rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{opp.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-xs font-semibold text-muted-foreground">
                    <span className="text-secondary">{opp.type}</span>
                    <span>•</span>
                    <span>{opp.commitment}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {opp.desc}
                  </p>
                </div>
                <div className="mt-8">
                  <a href="#volunteer-form">
                    <Button 
                      variant="outline" 
                      className="border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                      onClick={() => setFormData(prev => ({ ...prev, opportunity: opp.title }))}
                    >
                      Apply for this role
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Application Form */}
        <div id="volunteer-form" className="bg-white border rounded-xl p-8 sm:p-12 shadow-lg scroll-mt-24">
          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Thank You!</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Your application for the <strong>{formData.opportunity}</strong> position has been submitted. Our global volunteer coordination team is reviewing your profile and will get back to you shortly.
                </p>
                <Button 
                  onClick={() => setFormSubmitted(false)} 
                  className="bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">Volunteer Application</h2>
                <p className="text-muted-foreground text-center mb-10">
                  Ready to make a difference? Fill out the details below, and let's start working together.
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
                      <label className="block text-sm font-bold mb-2">Select Preferred Role</label>
                      <select 
                        name="opportunity" 
                        value={formData.opportunity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        {opportunitiesList.map((opp, i) => (
                          <option key={i} value={opp.title}>{opp.title}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Availability</label>
                      <select 
                        name="availability" 
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        <option>Flexible</option>
                        <option>Weekends Only</option>
                        <option>Weekdays Only</option>
                        <option>Specific Dates (mention in comments)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Tell Us About Yourself</label>
                    <textarea 
                      rows={5} 
                      name="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Share your relevant background, skills, or why you want to volunteer with us."
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
