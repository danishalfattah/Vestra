"use client";

import { BookOpen, Target, TrendingUp } from "lucide-react";

export function EducationHero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Perjalanan <span className="text-primary">Edukasi Keuangan</span>{" "}
              Anda Dimulai Di Sini
            </h1>
            <p className="text-lg text-muted-foreground text-pretty max-w-3xl mx-auto">
              Kuasai keterampilan keuangan penting melalui pelajaran interaktif,
              alat praktis, dan aplikasi dunia nyata. Bangun fondasi untuk
              kesuksesan keuangan seumur hidup.
            </p>
          </div>
        </div>

        {/* Progress Visualization */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Belajar</h3>
            <p className="text-muted-foreground">
              Pelajaran interaktif dan latihan praktis
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Praktik</h3>
            <p className="text-muted-foreground">
              Terapkan pengetahuan dengan skenario dunia nyata
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-chart-2/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-chart-2" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Berkembang</h3>
            <p className="text-muted-foreground">
              Pantau kemajuan dan capai tujuan keuangan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
