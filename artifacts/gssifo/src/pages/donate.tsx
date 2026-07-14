import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Donate() {
  const [amount, setAmount] = useState<number | null>(50);
  const [frequency, setFrequency] = useState<"once" | "monthly">("monthly");

  return (
    <div className="min-h-screen bg-muted/30 py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-sm shadow-lg overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left Side - Impact Info */}
          <div className="lg:w-5/12 bg-primary text-primary-foreground p-10 lg:p-16 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-6">Fund the Future</h1>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                Your donation directly supports community-led programs around the globe. 89% of every dollar goes straight to field operations.
              </p>
              
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="font-bold text-accent text-xl mt-1">$50</div>
                  <p className="text-primary-foreground/90">Provides clean water access for a family for an entire year.</p>
                </li>
                <li className="flex gap-4">
                  <div className="font-bold text-accent text-xl mt-1">$100</div>
                  <p className="text-primary-foreground/90">Equips a rural health clinic with essential medical supplies for a week.</p>
                </li>
                <li className="flex gap-4">
                  <div className="font-bold text-accent text-xl mt-1">$500</div>
                  <p className="text-primary-foreground/90">Funds a full year of education, including books and uniforms, for two children.</p>
                </li>
              </ul>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-primary-foreground/70">
                GSSIFO is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the full extent of the law.
              </p>
            </div>
          </div>

          {/* Right Side - Donation Form */}
          <div className="lg:w-7/12 p-10 lg:p-16">
            <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto">
              
              <div className="flex gap-2 mb-8 p-1 bg-muted rounded-sm">
                <button
                  type="button"
                  onClick={() => setFrequency("once")}
                  className={`flex-1 py-3 text-sm font-bold rounded-sm transition-colors ${
                    frequency === "once" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Give Once
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency("monthly")}
                  className={`flex-1 py-3 text-sm font-bold rounded-sm transition-colors ${
                    frequency === "monthly" ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Give Monthly
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold mb-4 text-foreground">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[25, 50, 100, 250, 500].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setAmount(val)}
                      className={`py-4 font-bold border rounded-sm transition-all ${
                        amount === val 
                          ? "border-primary bg-primary/5 text-primary" 
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setAmount(null)}
                    className={`py-4 font-bold border rounded-sm transition-all ${
                      amount === null 
                        ? "border-primary bg-primary/5 text-primary" 
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                  >
                    Other
                  </button>
                </div>
                {amount === null && (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">$</span>
                    <input 
                      type="number" 
                      placeholder="Custom Amount" 
                      className="w-full pl-8 pr-4 py-4 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold text-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="font-bold border-b pb-2">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                  <input type="text" placeholder="Last Name" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary" required />
              </div>

              <Button type="submit" size="lg" className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg rounded-sm shadow-sm">
                Donate {amount ? `$${amount}` : ""} {frequency === "monthly" ? "Monthly" : ""}
              </Button>
              
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
