import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Search, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoImage from "@/assets/images/gssio-logo.webp";

const pillars = [
  { name: "Global Health", path: "/what-we-do#health" },
  { name: "Education For All", path: "/what-we-do#education" },
  { name: "Climate Action", path: "/what-we-do#climate" },
  { name: "Economic Equity", path: "/what-we-do#equity" },
  { name: "Clean Water", path: "/what-we-do#water" },
  { name: "Human Rights", path: "/what-we-do#rights" },
  { name: "Disaster Relief", path: "/what-we-do#relief" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [banner, setBanner] = useState({
    text: "Join our upcoming Global Sustainability Summit 2024.",
    linkText: "Register now.",
    linkUrl: "/summit"
  });

  useEffect(() => {
    fetch("/api/banner")
      .then(res => res.json())
      .then(data => {
        if (data && data.text) setBanner(data);
      })
      .catch(() => {});
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <>
      <div className="bg-primary text-white py-2 px-4 text-center text-sm font-medium">
        {banner.text} <Link href={banner.linkUrl} className="underline font-bold ml-1">{banner.linkText}</Link>
      </div>
      <header className="sticky top-0 z-[100] w-full bg-[#f8fafc] border-b transition-all duration-300 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between max-w-[1280px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 z-50">
            <img src={logoImage} alt="GSSIO Logo" className="h-14 w-auto object-contain" />
            <span className="font-bold text-xl sm:text-2xl tracking-tight text-primary -ml-1">
              GSSIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/who-we-are"
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                isActive("/who-we-are") ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
              }`}
            >
              Who We Are
            </Link>
            
            <div className="group relative py-8">
              <Link
                href="/what-we-do"
                className={`text-sm font-medium uppercase tracking-wide flex items-center gap-1 transition-colors hover:text-primary ${
                  isActive("/what-we-do") ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
                }`}
              >
                What We Do <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </Link>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-background border shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 grid grid-cols-2 p-6 gap-6">
                <div className="col-span-2 pb-4 border-b">
                  <h3 className="font-semibold text-lg text-primary">Our 7 Programme Pillars</h3>
                  <p className="text-sm text-muted-foreground mt-1">Comprehensive action across global challenges.</p>
                </div>
                <div className="flex flex-col gap-3">
                  {pillars.slice(0, 4).map((pillar) => (
                    <Link key={pillar.name} href={pillar.path} className="text-sm font-medium hover:text-primary hover:underline">
                      {pillar.name}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3">
                  {pillars.slice(4).map((pillar) => (
                    <Link key={pillar.name} href={pillar.path} className="text-sm font-medium hover:text-primary hover:underline">
                      {pillar.name}
                    </Link>
                  ))}
                  <Link href="/what-we-do" className="text-sm font-bold text-primary hover:text-primary/80 mt-2">
                    View All Programmes &rarr;
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/impact-reports"
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                isActive("/impact-reports") ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
              }`}
            >
              Impact & Reports
            </Link>
            
            <Link
              href="/stories"
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                isActive("/stories") ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
              }`}
            >
              Stories
            </Link>
            
            <Link
              href="/get-involved"
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                isActive("/get-involved") ? "text-primary border-b-2 border-primary pb-1" : "text-foreground/80"
              }`}
            >
              Get Involved
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden xl:flex items-center bg-muted rounded-full px-4 py-1.5 border border-border">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input className="bg-transparent border-none focus:outline-none text-sm w-32 placeholder:text-muted-foreground" placeholder="Search..." type="text" />
            </div>
            
            <button className="text-foreground/80 hover:text-primary transition-colors hidden sm:block">
              <Globe className="w-5 h-5" />
            </button>

            <Link href="/get-involved" className="hidden lg:inline-flex">
              <Button variant="secondary" className="font-semibold rounded-lg px-6">
                Volunteer
              </Button>
            </Link>

            <Link href="/donate" className="hidden sm:inline-flex">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground border border-accent-border font-semibold px-6 rounded-lg transition-all">
                Donate
              </Button>
            </Link>
            
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-[#f8fafc] z-40 overflow-y-auto border-t shadow-xl max-h-[calc(100vh-5rem)]">
            <nav className="flex flex-col p-6 gap-6">
              <Link href="/who-we-are" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground uppercase tracking-wide">
                Who We Are
              </Link>
              <div className="flex flex-col gap-4">
                <Link href="/what-we-do" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground uppercase tracking-wide">
                  What We Do
                </Link>
                <div className="pl-4 flex flex-col gap-3 border-l-2 border-muted">
                  {pillars.map((pillar) => (
                    <Link key={pillar.name} href={pillar.path} onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground">
                      {pillar.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/impact-reports" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground uppercase tracking-wide">
                Impact & Reports
              </Link>
              <Link href="/stories" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground uppercase tracking-wide">
                Stories
              </Link>
              <Link href="/get-involved" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground uppercase tracking-wide">
                Get Involved
              </Link>
              <div className="mt-4 flex flex-col gap-3">
                <Link href="/get-involved" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full rounded-lg h-12 text-lg">
                    Volunteer
                  </Button>
                </Link>
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground border border-accent-border font-bold h-12 rounded-lg text-lg">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

