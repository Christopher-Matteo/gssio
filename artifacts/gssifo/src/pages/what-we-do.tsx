import { Link } from "wouter";
import { Globe2, BookOpen, Sprout, Coins, Droplets, Shield, HeartHandshake } from "lucide-react";

export default function WhatWeDo() {
  const pillars = [
    { id: "health", icon: Globe2, title: "Global Health", desc: "Strengthening healthcare systems and fighting infectious diseases." },
    { id: "education", icon: BookOpen, title: "Education For All", desc: "Ensuring inclusive, equitable quality education for children." },
    { id: "climate", icon: Sprout, title: "Climate Action", desc: "Combating climate change and promoting sustainable ecosystems." },
    { id: "equity", icon: Coins, title: "Economic Equity", desc: "Eradicating extreme poverty and driving sustainable economic growth." },
    { id: "water", icon: Droplets, title: "Clean Water", desc: "Providing universal access to safe, affordable drinking water." },
    { id: "rights", icon: Shield, title: "Human Rights", desc: "Defending fundamental freedoms and promoting peaceful societies." },
    { id: "relief", icon: HeartHandshake, title: "Disaster Relief", desc: "Delivering rapid, life-saving assistance in humanitarian crises." },
  ];

  return (
    <div className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">What We Do</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our interventions are structured around 7 core pillars, addressing the root causes of global inequality and vulnerability.
          </p>
        </div>

        <div className="space-y-24">
          {pillars.map((pillar, idx) => (
            <div key={pillar.id} id={pillar.id} className="scroll-mt-32 bg-white rounded-sm p-8 md:p-12 shadow-sm border flex flex-col md:flex-row gap-8 items-start">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                <pillar.icon className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">{pillar.title}</h2>
                <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                  {pillar.desc} We work closely with local governments, community leaders, and partner NGOs to implement scalable solutions that drive lasting change.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Infrastructure development</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Community education programs</li>
                  <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Policy advocacy</li>
                </ul>
                {/* Hidden for now
                <Link href="/impact-reports">
                  <button className="text-primary font-bold hover:text-secondary hover:underline">
                    Read related reports &rarr;
                  </button>
                </Link>
                */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
