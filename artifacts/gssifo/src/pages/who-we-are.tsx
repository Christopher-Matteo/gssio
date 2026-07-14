export default function WhoWeAre() {
  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">Who We Are</h1>
        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
          The Global Sustainability and Social Impact Foundation (GSSIFO) was founded in 1995 with a singular vision: to address the world's most pressing challenges through coordinated, science-based, and community-led interventions.
        </p>
        
        <div className="prose prose-lg max-w-none text-foreground/80">
          <h2>Our Mission</h2>
          <p>
            We exist to empower communities, protect vulnerable populations, and advocate for sustainable policies on a global scale. Operating in over 140 countries, our staff and volunteers work tirelessly to deliver health, education, and economic programs where they are needed most.
          </p>
 
          <h2>Our History</h2>
          <p>
            What began as a coalition of independent researchers and field workers has grown into a major international NGO. Throughout the early 2000s, GSSIFO pioneered community-managed water systems in sub-Saharan Africa. Today, we are a leading voice in global policy, advising governments and intergovernmental bodies on sustainable development goals.
          </p>

          <h2>Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="flex gap-4 items-start">
              <div className="w-20 h-20 bg-muted rounded-full overflow-hidden shrink-0"></div>
              <div>
                <h4 className="font-bold text-lg mb-1">Dr. Elena Rostova</h4>
                <p className="text-primary text-sm font-semibold mb-2">Director General</p>
                <p className="text-sm">Former Minister of Health with 30 years of experience in public health policy.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-20 h-20 bg-muted rounded-full overflow-hidden shrink-0"></div>
              <div>
                <h4 className="font-bold text-lg mb-1">James O. Mensah</h4>
                <p className="text-primary text-sm font-semibold mb-2">Head of Global Operations</p>
                <p className="text-sm">Humanitarian logistics expert specializing in crisis response and supply chain management.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
