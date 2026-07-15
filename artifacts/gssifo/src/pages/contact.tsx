import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiryType: "General Information",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Inquiry: ${formData.inquiryType}`);
    const body = encodeURIComponent(
      `First Name: ${formData.firstName}\n` +
      `Last Name: ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Inquiry Type: ${formData.inquiryType}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:info@gssifo.org?subject=${subject}&body=${body}`;

    toast({
      title: "Inquiry Sent Successfully!",
      description: "Thank you for contacting us. We will get back to you shortly.",
    });

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      inquiryType: "General Information",
      message: ""
    });
  };

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-center">
          Have a question about our programs, partnerships, or donations? Reach out to our team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">Headquarters</h2>
            <ul className="space-y-6 text-foreground/80 mb-12">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 shrink-0 text-secondary mt-1" />
                <div>
                  <p className="font-bold text-foreground">Global Sustainability and Social Impact Foundation</p>
                  <p>45, Valluvar Kottam High Rd,</p>
                  <p>pONNANGIPURAM, nUNGAMBAKKAM,</p>
                  <p>Chennai, Greater Chennai, Tamilnadu 600034</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 shrink-0 text-secondary" />
                <span>+91 91597 79659</span>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 shrink-0 text-secondary" />
                <span>info@gssifo.org</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Regional Offices</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold">North America (New York)</p>
                <p className="text-sm text-muted-foreground">+1 212 555 0199 | ny@gssifo.org</p>
              </div>
              <div>
                <p className="font-bold">Africa (Nairobi)</p>
                <p className="text-sm text-muted-foreground">+254 20 555 0199 | nairobi@gssifo.org</p>
              </div>
              <div>
                <p className="font-bold">Asia Pacific (Bangkok)</p>
                <p className="text-sm text-muted-foreground">+66 2 555 0199 | bangkok@gssifo.org</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-8 rounded-sm border">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" 
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
                    className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                    required 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Inquiry Type</label>
                <select 
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  <option>General Information</option>
                  <option>Donations Support</option>
                  <option>Press / Media</option>
                  <option>Partnerships</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                ></textarea>
              </div>
              <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-sm">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
