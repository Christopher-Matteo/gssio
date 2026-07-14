import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Calendar, MapPin, Ticket, Award, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Summit() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    type: "Virtual Attendance",
    ticketClass: "General Admission",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = "GSS-" + Math.floor(100000 + Math.random() * 900000);
    setTicketId(generatedId);
    setFormSubmitted(true);
    toast({
      title: "Registration Confirmed!",
      description: `Your ticket ${generatedId} for the GSS 2024 Summit is now active. Check your email for access instructions.`,
    });
  };

  const schedule = [
    {
      time: "Day 1 (Nov 15)",
      title: "Climate Adaptation & Agricultural Systems",
      desc: "Keynote speeches from leading meteorologists and interactive workshops on sustainable farming models and soil rejuvenation protocols.",
    },
    {
      time: "Day 2 (Nov 16)",
      title: "Health Equity & Sustainable Infrastructure",
      desc: "Panels on clean water network expansion in arid regions and deploying solar-powered clinics in remote villages.",
    },
    {
      time: "Day 3 (Nov 17)",
      title: "Advocacy & Strategic Financing",
      desc: "Closing session detailing policy frameworks, public-private financial models, and mobilizing volunteer networks.",
    },
  ];

  return (
    <div className="py-16 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Banner Card */}
        <div className="bg-primary text-white rounded-2xl p-8 sm:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent-foreground text-xs font-bold uppercase tracking-widest rounded mb-6">
              Flagship Event
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
              Global Sustainability Summit 2024
            </h1>
            <p className="text-lg text-primary-foreground/95 mb-8 leading-relaxed">
              Join international policy leaders, climate researchers, and human rights coordinators in Geneva to forge actionable frameworks for the next decade of sustainable development.
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm font-semibold text-white/90">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Nov 15 - 17, 2024
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Geneva, Switzerland & Virtual
              </span>
            </div>
          </div>
        </div>

        {/* Summit Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
          <div className="bg-white p-8 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">50+ Speakers</h3>
            <p className="text-sm text-muted-foreground">Hear from NGO directors, climate scientists, and community leads from around the world.</p>
          </div>
          <div className="bg-white p-8 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Certification</h3>
            <p className="text-sm text-muted-foreground">Receive a certified attendee credential from GSSIFO for professional credits.</p>
          </div>
          <div className="bg-white p-8 border rounded-xl shadow-sm">
            <div className="w-12 h-12 bg-secondary/15 text-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg mb-2">Dual Access</h3>
            <p className="text-sm text-muted-foreground">Participate in-person at the Geneva Center or tune in via interactive live streams.</p>
          </div>
        </div>

        {/* Schedule */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-foreground text-center">Summit Program</h2>
        <div className="space-y-6 mb-16 max-w-3xl mx-auto">
          {schedule.map((day, idx) => (
            <div key={idx} className="bg-white border rounded-xl p-6 shadow-sm flex gap-6">
              <div className="text-primary font-bold text-sm shrink-0 w-28 pt-1">
                {day.time}
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-lg text-foreground">{day.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{day.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Form */}
        <div className="bg-white border rounded-xl p-8 sm:p-12 shadow-lg max-w-2xl mx-auto">
          {formSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold mb-4">Registration Confirmed</h3>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for registering. Your ticket reference ID is <strong className="text-primary">{ticketId}</strong> ({formData.ticketClass} - {formData.type}). We have sent an email with agenda schedules and details.
              </p>
              <Button 
                onClick={() => setFormSubmitted(false)} 
                className="bg-primary hover:bg-primary/90 text-white font-bold"
              >
                Register Another Attendee
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4 text-center">Summit Registration</h2>
              <p className="text-muted-foreground text-center mb-10">
                Secure your pass for GSS 2024. Standard tickets are complimentary but registration is required for access.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    required 
                  />
                </div>

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
                  <label className="block text-sm font-bold mb-2">Organization / Affiliation</label>
                  <input 
                    type="text" 
                    name="org" 
                    value={formData.org}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Attendance Format</label>
                    <select 
                      name="type" 
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      <option>Virtual Attendance</option>
                      <option>In-Person (Geneva HQ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Ticket Class</label>
                    <select 
                      name="ticketClass" 
                      value={formData.ticketClass}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                    >
                      <option>General Admission</option>
                      <option>Academic / Student Pass</option>
                      <option>Press / Media Credential</option>
                      <option>Delegated Speaker / Partner</option>
                    </select>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-sm">
                  Register For Summit
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
