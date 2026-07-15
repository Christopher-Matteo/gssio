import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Handshake, Globe2, BarChart4, Landmark, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Partner() {
  const { toast } = useToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    orgName: "",
    contactName: "",
    email: "",
    phone: "",
    partnerType: "Corporate Partner",
    focusArea: "Global Health",
    proposal: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Partnership Inquiry: ${formData.orgName}`);
    const body = encodeURIComponent(
      `Organization Name: ${formData.orgName}\n` +
      `Contact Person: ${formData.contactName}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Partner Type: ${formData.partnerType}\n` +
      `Focus Area: ${formData.focusArea}\n\n` +
      `Proposal:\n${formData.proposal}`
    );
    window.location.href = `mailto:info@gssifo.org?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
    toast({
      title: "Partnership Inquiry Submitted!",
      description: "Our alliances team will review your proposal and respond within 5 business days.",
    });
  };

  return (
    <div className="py-16 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/get-involved" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Get Involved
        </Link>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
            Partner with GSSIFO
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We collaborate with corporations, governments, and non-profits to build clean water assets, deliver essential vaccinations, and adapt farming techniques for climate resilience. Join us to co-create sustainable development solutions at scale.
          </p>
        </div>

        {/* Partnership Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-8 border rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-4">Corporate Alliances</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Boost corporate social responsibility (CSR) programs by sponsoring high-impact regional water projects or girls' education campaigns.
              </p>
            </div>
            <ul className="text-xs space-y-2 border-t pt-4 font-semibold text-muted-foreground">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Tax-deductible sponsorships</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Dynamic co-branding</li>
            </ul>
          </div>

          <div className="bg-white p-8 border rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-4">Bilateral & Governments</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Integrate GSSIFO programs with local health ministries or public infrastructure works for regional compliance and lasting change.
              </p>
            </div>
            <ul className="text-xs space-y-2 border-t pt-4 font-semibold text-muted-foreground">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Technical alignment</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Multi-country scaling</li>
            </ul>
          </div>

          <div className="bg-white p-8 border rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <BarChart4 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl mb-4">NGOs & Coalitions</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Join forces on local project advocacy, share monitoring and evaluation dashboards, or combine emergency supply operations.
              </p>
            </div>
            <ul className="text-xs space-y-2 border-t pt-4 font-semibold text-muted-foreground">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Open-data indicators</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary"></div> Local grassroots roots</li>
            </ul>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white border rounded-xl p-8 sm:p-12 shadow-lg">
          <div className="max-w-2xl mx-auto">
            {formSubmitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className="text-3xl font-bold mb-4">Inquiry Received</h3>
                <p className="text-muted-foreground text-lg mb-8">
                  Your partnership proposal for <strong>{formData.orgName}</strong> has been received. Our Strategic Alliances team will review the details and reach out within 5 business days.
                </p>
                <Button 
                  onClick={() => setFormSubmitted(false)} 
                  className="bg-primary hover:bg-primary/90 text-white font-bold"
                >
                  Submit Another Inquiry
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-4 text-center">Partnership Inquiry Form</h2>
                <p className="text-muted-foreground text-center mb-10">
                  Ready to collaborate? Let us know what you have in mind and how we can combine forces.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Organization Name</label>
                      <input 
                        type="text" 
                        name="orgName" 
                        value={formData.orgName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Contact Person Name</label>
                      <input 
                        type="text" 
                        name="contactName" 
                        value={formData.contactName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2">Work Email Address</label>
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
                      <label className="block text-sm font-bold mb-2">Contact Phone Number</label>
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
                      <label className="block text-sm font-bold mb-2">Partnership Class</label>
                      <select 
                        name="partnerType" 
                        value={formData.partnerType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        <option>Corporate Partner</option>
                        <option>Government / Bilateral Agency</option>
                        <option>NGO / Advocacy Coalition</option>
                        <option>Academic / Research Partner</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">Primary Focus Area</label>
                      <select 
                        name="focusArea" 
                        value={formData.focusArea}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                      >
                        <option>Global Health</option>
                        <option>Education For All</option>
                        <option>Climate Action</option>
                        <option>Economic Equity</option>
                        <option>Clean Water</option>
                        <option>Disaster Relief</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Brief Collaboration Proposal</label>
                    <textarea 
                      rows={6} 
                      name="proposal" 
                      value={formData.proposal}
                      onChange={handleInputChange}
                      placeholder="Outline how your organization wishes to partner, target projects or regions, and the estimated resource deployment or budget parameters."
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                      required
                    ></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-sm">
                    Submit Partnership Proposal
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
