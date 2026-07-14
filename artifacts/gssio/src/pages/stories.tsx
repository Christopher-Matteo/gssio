import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { storiesData } from "@/data/stories";

export default function Stories() {
  const [stories, setStories] = useState(storiesData);

  useEffect(() => {
    fetch("/api/stories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        }
      })
      .catch(() => {});
  }, []);


  return (
    <div className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6 text-center">Stories from the Field</h1>
        <p className="text-xl text-muted-foreground mb-16 max-w-3xl mx-auto text-center">
          Read firsthand accounts of how our programs are making a tangible difference in communities around the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <Link key={i} href={`/stories/${i}`} className="group flex flex-col bg-white rounded-sm overflow-hidden border hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider">
                  <span className="text-secondary">{story.tag}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground">{story.date}</span>
                </div>
                <h4 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{story.title}</h4>
                <p className="text-muted-foreground mb-6 line-clamp-3">{story.desc}</p>
                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-primary">
                  Read Story <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
