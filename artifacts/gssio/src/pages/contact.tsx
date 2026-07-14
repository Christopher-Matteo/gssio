import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
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
                  <p className="font-bold text-foreground">Global Sustainability and Social Impact Organisation</p>
                  <p>1200 International Avenue</p>
                  <p>Geneva, Switzerland 1204</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 shrink-0 text-secondary" />
                <span>+41 22 730 0000</span>
              </li>

              
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 shrink-0 text-secondary" />
                <span>contact@gssio.org</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mb-6">Regional Offices</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold">North America (New York)</p>
                <p className="text-sm text-muted-foreground">+1 212 555 0199 | ny@gssio.org</p>
              </div>
              <div>
                <p className="font-bold">Africa (Nairobi)</p>
                <p className="text-sm text-muted-foreground">+254 20 555 0199 | nairobi@gssio.org</p>
              </div>
              <div>
                <p className="font-bold">Asia Pacific (Bangkok)</p>
                <p className="text-sm text-muted-foreground">+66 2 555 0199 | bangkok@gssio.org</p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-8 rounded-sm border">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Inquiry Type</label>
                <select className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                  <option>General Information</option>
                  <option>Donations Support</option>
                  <option>Press / Media</option>
                  <option>Partnerships</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required></textarea>
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
