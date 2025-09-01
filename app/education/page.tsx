import { EducationHero } from "../../components/education-hero";
import { LearningModules } from "../../components/learning-modules";
import { InteractiveTools } from "../../components/interactive-tools";
import { Footer } from "../../components/footer";
import { Navigation } from "../../components/navigation";

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-6xl mx-auto blur-3xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <EducationHero />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-6xl mx-auto blur-3xl bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <LearningModules />
          </div>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-5xl mx-auto blur-3xl bg-gradient-to-l from-primary/10 via-transparent to-accent/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <InteractiveTools />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
