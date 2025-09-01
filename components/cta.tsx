"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-8 lg:p-16">
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
              Siap Mengubah{" "}
              <span className="text-primary">Masa Depan Keuangan</span> Anda?
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Bergabunglah dengan ribuan pelajar yang sudah membangun kekayaan
              dan mengamankan kemandirian finansial mereka melalui edukasi
              cerdas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/education">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 group"
                >
                  Mulai Perjalanan Anda
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute top-4 left-4 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 right-4 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
        </div>
      </div>
    </section>
  );
}
