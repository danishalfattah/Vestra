"use client";

import { Suspense } from "react";
import { LearningModules } from "../../components/learning-modules";
import { InteractiveTools } from "../../components/interactive-tools";
import { FadeIn } from "@/components/motion";

function EducationContent() {
  return (
    <>
      <FadeIn>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-6xl mx-auto blur-3xl bg-gradient-to-br from-accent/10 via-transparent to-primary/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <LearningModules />
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 max-w-5xl mx-auto blur-3xl bg-gradient-to-l from-primary/10 via-transparent to-accent/10 rounded-3xl z-0" />
          <div className="relative z-10">
            <InteractiveTools />
          </div>
        </div>
      </FadeIn>
    </>
  );
}

export default function EducationPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EducationContent />
    </Suspense>
  );
}
