import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Clock, User, Calendar, Tag } from "lucide-react";
import { storiesData } from "@/data/stories";
import { Button } from "@/components/ui/button";

export default function StoryDetailWrapper() {
  const params = useParams();
  return <StoryDetail key={params.id} params={params} />;
}

function StoryDetail({ params }: { params: { id?: string } }) {
  const storyId = params.id;
  const [stories, setStories] = useState<any[]>(storiesData);

  useEffect(() => {
    window.scrollTo(0, 0);
    const apiBase = import.meta.env.VITE_API_URL || "";
    fetch(`${apiBase}/api/stories`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStories(data);
        }
      })
      .catch(() => {});
  }, [storyId]);

  const story = stories.find((s) => s.id === storyId);

  if (!story) {
    return (
      <div className="py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Story Not Found</h2>
          <p className="text-muted-foreground mb-8">The story you are looking for does not exist or has been moved.</p>
          <Link href="/stories">
            <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related stories (excluding current one)
  const relatedStories = stories
    .filter((s) => s.id !== story.id)
    .slice(0, 3);

  return (
    <div className="bg-muted/10 min-h-screen">
      {/* Back Button and Breadcrumb */}
      <div className="container mx-auto px-4 pt-12 max-w-4xl">
        <Link href="/stories" className="inline-flex items-center text-primary font-bold hover:underline mb-8 group">
          <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Stories
        </Link>
      </div>

      {/* Main Content Area */}
      <article className="container mx-auto px-4 pb-24 max-w-4xl">
        {/* Category Tag & Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold uppercase tracking-wider mb-6">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            {story.tag}
          </span>
          <span className="text-muted-foreground/30">|</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {story.date}
          </span>
          <span className="text-muted-foreground/30">|</span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {story.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 text-foreground leading-[1.15]">
          {story.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-10 pb-6 border-b">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg border">
            {story.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold text-foreground flex items-center gap-1.5">
              <User className="w-4 h-4 text-muted-foreground" />
              {story.author}
            </div>
            <div className="text-xs text-muted-foreground">Contributor</div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-12 shadow-md border bg-muted">
          <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
        </div>

        {/* Article text content */}
        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6 leading-relaxed text-lg">
          {story.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Call to Action Block */}
        <div className="bg-primary text-white p-8 sm:p-12 rounded-2xl shadow-xl mt-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">Support our global initiatives</h3>
            <p className="text-primary-foreground/80 max-w-md">Your donation directly funds healthcare, clean water access, and education programs where they are needed most.</p>
          </div>
          <div className="flex gap-4 shrink-0 flex-wrap">
            <Link href="/donate">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-lg px-8 py-4 shadow-md h-auto">
                Donate Now
              </Button>
            </Link>
            <Link href="/get-involved">
              <Button size="lg" variant="outline" className="border-2 border-white bg-transparent hover:bg-white hover:text-primary text-white font-bold rounded-lg px-8 py-4 h-auto">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>

        {/* Related Stories Section */}
        <div className="mt-24 border-t pt-16">
          <h3 className="text-2xl font-bold mb-8">Related Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedStories.map((related) => (
              <Link key={related.id} href={`/stories/${related.id}`} className="group block">
                <div className="aspect-[4/3] w-full rounded-lg overflow-hidden bg-muted mb-4 border group-hover:shadow-md transition-shadow">
                  <img src={related.img} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">{related.tag}</div>
                <h4 className="font-bold text-base line-clamp-2 group-hover:text-primary transition-colors">{related.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
