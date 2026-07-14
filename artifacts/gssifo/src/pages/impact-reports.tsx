import { Button } from "@/components/ui/button";
import { Download, FileText, BarChart3 } from "lucide-react";

export default function ImpactReports() {
  const reports = [
    { year: "2023", title: "Global Health Equity Report", category: "Health", size: "4.2 MB" },
    { year: "2023", title: "Clean Water Access Review", category: "Infrastructure", size: "3.1 MB" },
    { year: "2022", title: "Annual Impact Summary", category: "Annual Report", size: "8.5 MB" },
    { year: "2022", title: "Climate Action Progress", category: "Environment", size: "5.4 MB" },
  ];

  return (
    <div className="py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-5xl font-bold mb-6">Impact & Reports</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl">
          Transparency and measurable results are at the core of our methodology. We publish detailed reviews of all our programs to ensure accountability to our donors and the communities we serve.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-primary text-white p-8 rounded-sm">
            <BarChart3 className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-2">50M+</div>
            <p className="text-primary-foreground/80">Lives directly improved since 2010</p>
          </div>
          <div className="bg-secondary text-white p-8 rounded-sm">
            <Globe2Icon className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-2">142</div>
            <p className="text-white/80">Countries with active operations</p>
          </div>
          <div className="bg-accent text-accent-foreground p-8 rounded-sm">
            <CoinsIcon className="w-10 h-10 mb-4 opacity-80" />
            <div className="text-4xl font-bold mb-2">$850M</div>
            <p className="text-accent-foreground/80">Funds deployed to local programs</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8">Latest Publications</h2>
        <div className="flex flex-col gap-4">
          {reports.map((report, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white border rounded-sm hover:shadow-md transition-shadow gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-primary shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold px-2 py-1 bg-muted text-muted-foreground rounded-sm">{report.year}</span>
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{report.category}</span>
                  </div>
                  <h3 className="font-bold text-lg">{report.title}</h3>
                </div>
              </div>
              <Button variant="outline" className="shrink-0 border-primary text-primary hover:bg-primary hover:text-white">
                <Download className="w-4 h-4 mr-2" /> Download PDF ({report.size})
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Globe2Icon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}

function CoinsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  )
}
