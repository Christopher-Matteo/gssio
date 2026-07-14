import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Handshake } from "lucide-react";

export default function GetInvolved() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-bold mb-6 text-center">Get Involved</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-center">
          Global impact requires collective action. Whether you're an individual looking to volunteer, a professional seeking a career with purpose, or an organization wanting to partner, there's a place for you at GSSIFO.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border rounded-sm p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-primary mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Join our network of over 12,000 active volunteers supporting campaigns locally and internationally.
            </p>
            <Link href="/get-involved/opportunities" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                View Opportunities
              </Button>
            </Link>
          </div>

          <div className="bg-white border rounded-sm p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-primary mb-6">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Careers</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Bring your expertise to our global teams. We are always looking for passionate professionals.
            </p>
            <Link href="/get-involved/positions" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                Open Positions
              </Button>
            </Link>
          </div>

          <div className="bg-white border rounded-sm p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-primary mb-6">
              <Handshake className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Partner</h3>
            <p className="text-muted-foreground mb-8 flex-grow">
              Collaborate with us. We work with corporations, governments, and other NGOs to scale our impact.
            </p>
            <Link href="/get-involved/partner" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-bold">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
