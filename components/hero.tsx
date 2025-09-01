"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, PiggyBank } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance ">
                Kuasai <span className="text-primary">Masa Depan Keuangan</span>{" "}
                Anda dengan Pembelajaran Cerdas
              </h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl">
                Buka kekuatan literasi keuangan dengan platform interaktif kami.
                Pelajari penganggaran, investasi, dan manajemen kekayaan melalui
                pelajaran menarik yang dirancang untuk generasi digital.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/education">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Mulai Belajar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative ">
            <div className="relative w-full h-96 lg:h-[500px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-lg border border-primary/30 flex items-center justify-center">
                    <DollarSign className="w-12 h-12 text-primary" />
                  </div>

                  <div className="absolute top-8 left-8 w-16 h-16 bg-accent/20 rounded-lg border border-accent/30 flex items-center justify-center cursor-pointer">
                    <PiggyBank className="w-8 h-8 text-accent" />
                  </div>

                  <div className="absolute top-8 right-8 w-16 h-16 bg-chart-2/20 rounded-lg border border-chart-2/30 flex items-center justify-center cursor-pointer">
                    <TrendingUp className="w-8 h-8 text-chart-2" />
                  </div>

                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-chart-3/20 rounded-lg border border-chart-3/30 flex items-center justify-center cursor-pointer">
                    <div className="w-8 h-8 bg-chart-3 rounded-full"></div>
                  </div>

                  <div className="absolute bottom-8 right-8 w-16 h-16 bg-chart-4/20 rounded-lg border border-chart-4/30 flex items-center justify-center cursor-pointer">
                    <div className="w-8 h-8 bg-chart-4 rounded-sm"></div>
                  </div>

                  {/* Connecting Lines */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 320 320"
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgb(139, 92, 246)"
                          stopOpacity="0.3"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgb(139, 92, 246)"
                          stopOpacity="0.1"
                        />
                      </linearGradient>
                    </defs>
                    <line
                      x1="80"
                      y1="80"
                      x2="160"
                      y2="160"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                    />
                    <line
                      x1="240"
                      y1="80"
                      x2="160"
                      y2="160"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                    />
                    <line
                      x1="80"
                      y1="240"
                      x2="160"
                      y2="160"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                    />
                    <line
                      x1="240"
                      y1="240"
                      x2="160"
                      y2="160"
                      stroke="url(#lineGradient)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
              {/* Background Glow (static) */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-3xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
