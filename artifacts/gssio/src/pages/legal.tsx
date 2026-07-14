import { Link } from "wouter";
import { ArrowLeft, Shield, FileSpreadsheet, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LegalProps {
  type: "privacy" | "terms" | "accessibility";
}

export default function Legal({ type }: LegalProps) {
  const content = {
    privacy: {
      title: "Privacy Policy",
      subtitle: "Last Updated: July 14, 2026",
      icon: Shield,
      paragraphs: [
        {
          heading: "1. Information We Collect",
          body: "GSSIO is committed to protecting your privacy. We collect personal information you provide directly, such as your name, email address, phone number, organization name, and payment information when you make a donation, apply for volunteer opportunities, register for a summit, or contact us. We also collect automated log data such as IP address and browser type when navigating the site.",
        },
        {
          heading: "2. How We Use Your Information",
          body: "We use the collected information to process donations, send transaction receipts, manage job and volunteer applications, send invitations for summits, and distribute newsletter briefings. We will never sell, lease, or rent your personal information to third parties.",
        },
        {
          heading: "3. Cookie Compliance",
          body: "Our website uses cookies and similar tracking tools to analyze traffic and customize page layouts. You can control your browser settings to reject cookies, though some features of our site may not perform optimally without them.",
        },
        {
          heading: "4. Information Security",
          body: "We implement industry-standard encryption protocols (SSL/TLS) for all transactions and communications. Access to personal database servers is strictly restricted to GSSIO authorized staff and IT personnel.",
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      subtitle: "Last Updated: July 14, 2026",
      icon: FileSpreadsheet,
      paragraphs: [
        {
          heading: "1. Acceptance of Terms",
          body: "By accessing and using the GSSIO-Global-Suite web applications, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you must refrain from using the platform.",
        },
        {
          heading: "2. Rules of Engagement",
          body: "You agree to use our site for lawful purposes. You shall not input fraudulent information on volunteer or partnership inquiries, submit fake resumes on career postings, or attempt unauthorized database exploits.",
        },
        {
          heading: "3. Intellectual Property Rights",
          body: "All text, custom web graphics, logo layouts, publication reports, and photography assets displayed on the GSSIO platform are copyrighted properties of the Global Sustainability and Social Impact Organisation, unless otherwise cited. Unauthorized commercial replication is strictly prohibited.",
        },
        {
          heading: "4. Limitation of Liability",
          body: "GSSIO makes no absolute warranties that website modules will run completely uninterrupted or bug-free. All programs, opportunities, and event updates are provided on an 'as is' basis without liability for technical anomalies.",
        },
      ],
    },
    accessibility: {
      title: "Accessibility Statement",
      subtitle: "Last Updated: July 14, 2026",
      icon: Activity,
      paragraphs: [
        {
          heading: "1. Our Commitment",
          body: "GSSIO is dedicated to ensuring digital accessibility for all users, including individuals with visual, auditory, cognitive, or physical impairments. We continuously upgrade our web layouts to follow the Web Content Accessibility Guidelines (WCAG) 2.1 level AA standards.",
        },
        {
          heading: "2. Implemented Measures",
          body: "We employ high-contrast color balances, readable text scales, screen-reader descriptions on image tags (alt attributes), skip-navigation elements, and keyboard-navigable links to provide a fluid user experience.",
        },
        {
          heading: "3. Third-Party Plugins",
          body: "While we strive for absolute site-wide accessibility, third-party widgets (such as mapping services or external donation processors) may present layout constraints beyond our direct operational adjustments.",
        },
        {
          heading: "4. Accessibility Feedback",
          body: "If you encounter layout issues or access barriers while using GSSIO systems, please contact our web accessibility team at accessibility@gssio.org. We will make every effort to resolve the issue as quickly as possible.",
        },
      ],
    },
  };

  const doc = content[type];
  const Icon = doc.icon;

  return (
    <div className="py-24 bg-muted/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="bg-white border rounded-xl p-8 sm:p-12 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{doc.title}</h1>
              <p className="text-sm text-muted-foreground">{doc.subtitle}</p>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            {doc.paragraphs.map((p, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-foreground mb-3">{p.heading}</h3>
                <p className="text-sm sm:text-base">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} GSSIO. All rights reserved.</p>
            <div className="flex gap-4 text-xs font-semibold text-primary">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/accessibility" className="hover:underline">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
