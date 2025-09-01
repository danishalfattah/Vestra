import { Hero } from "../components/hero";
import { Stats } from "../components/stats";
import { Features } from "../components/features";
import Faq from "../components/faq";
import { CTA } from "../components/cta";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="">
        <div className="">
          <Hero />
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-5xl mx-auto blur-3xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <Stats />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-6xl mx-auto blur-3xl bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <Features />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-4xl mx-auto blur-3xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5 rounded-3xl z-0" />
          <div className="relative z-10">
            <Faq />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-5xl mx-auto blur-3xl bg-gradient-to-l from-accent/10 via-transparent to-primary/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
