import { Metadata } from "next";
import { Hero } from "../components/hero";
import { Stats } from "../components/stats";
import { Features } from "../components/features";
import Faq from "../components/faq";
import { CTA } from "../components/cta";
import { Footer } from "../components/footer";
import { Navigation } from "../components/navigation";

export const metadata: Metadata = {
  title: "Beranda – Edukasi Keuangan Praktis",
  description:
    "Belajar keuangan pribadi, investasi, dan perencanaan finansial lewat modul ringkas, video fokus, dan event finansial.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Layer container so background color sits behind, glows above it, content above glows */}
      <div className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(circle_at_center,black,transparent_85%)]">
        {/* Top central large glow */}
        <div className="absolute -top-72 left-1/2 -translate-x-1/2 w-[1500px] h-[1500px] rounded-full bg-primary/15 blur-[260px] opacity-70 mix-blend-screen" />
        {/* Upper left subtle */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[190px] opacity-45 mix-blend-screen" />
        {/* Upper right */}
        <div className="absolute top-0 right-[-180px] w-[720px] h-[720px] rounded-full bg-primary/18 blur-[200px] opacity-40 mix-blend-screen" />
        {/* Mid left */}
        <div className="absolute top-1/3 -left-60 w-[820px] h-[820px] rounded-full bg-primary/14 blur-[230px] opacity-40 mix-blend-screen" />
        {/* Mid right accent */}
        <div className="absolute top-1/2 right-[-260px] w-[900px] h-[900px] rounded-full bg-accent/18 blur-[230px] opacity-45 mix-blend-screen" />
        {/* Lower left */}
        <div className="absolute bottom-[-320px] left-[-220px] w-[1000px] h-[1000px] rounded-full bg-primary/15 blur-[240px] opacity-50 mix-blend-screen" />
        {/* Lower right */}
        <div className="absolute bottom-[-260px] right-[-140px] w-[760px] h-[760px] rounded-full bg-accent/16 blur-[220px] opacity-45 mix-blend-screen" />
        {/* Soft center pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[560px] rounded-full bg-primary/25 blur-[180px] opacity-30 animate-pulse mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/5 to-background/40" />
      </div>
      <div className="relative z-10">
        <Navigation />
        <main>
          <section
            className="relative reveal-base reveal-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <Hero />
          </section>
          <section
            className="relative reveal-base reveal-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            <Stats />
          </section>
          <section
            className="relative reveal-base reveal-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <Features />
          </section>
          <section
            className="relative reveal-base reveal-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <Faq />
          </section>
          <section
            className="relative reveal-base reveal-fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <CTA />
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
