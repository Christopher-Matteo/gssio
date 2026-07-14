import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logoImage from "@/assets/images/gssio-logo.webp";

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <img src={logoImage} alt="GSSIO Logo" className="h-12 w-auto object-contain bg-white rounded p-1" />
              <span className="font-bold text-2xl tracking-tight">GSSIO</span>
            </Link>
            <p className="text-white/80 leading-relaxed text-sm">
              The Global Sustainability and Social Impact Organisation works across borders to build resilient communities, protect human rights, and safeguard our planet for future generations.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/who-we-are" className="text-white/80 hover:text-white transition-colors">Who We Are</Link></li>
              <li><Link href="/what-we-do" className="text-white/80 hover:text-white transition-colors">What We Do</Link></li>
              <li><Link href="/impact-reports" className="text-white/80 hover:text-white transition-colors">Impact & Reports</Link></li>
              <li><Link href="/stories" className="text-white/80 hover:text-white transition-colors">Stories from the Field</Link></li>
              <li><Link href="/get-involved" className="text-white/80 hover:text-white transition-colors">Get Involved</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-white/80">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 shrink-0 text-white/60" />
                <span>1200 International Avenue<br/>Geneva, Switzerland 1204</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 shrink-0 text-white/60" />
                <span>+41 22 730 0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 shrink-0 text-white/60" />
                <span>contact@gssio.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Stay Informed</h3>
            <p className="text-white/80 text-sm mb-4">
              Subscribe to our monthly briefing for the latest updates on our global initiatives.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button 
                type="submit"
                className="bg-white text-primary hover:bg-white/90 font-medium py-3 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} Global Sustainability and Social Impact Organisation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
