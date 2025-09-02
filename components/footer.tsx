"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();
  const categories = [
    { label: "Penganggaran", slug: "budgeting" },
    { label: "Investasi", slug: "investing" },
    { label: "Perencanaan", slug: "planning" },
    { label: "Utang", slug: "debt" },
    { label: "Asuransi", slug: "insurance" },
    { label: "Psikologi", slug: "psychology" },
  ];
  return (
    <footer className="relative border-t border-border bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/65">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Main Grid */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:gap-14 md:grid-cols-12">
          {/* Brand / Intro */}
          <div className="md:col-span-5 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center group"
              aria-label="VESTRA Home"
            >
              <Image
                src="/logo.svg"
                alt="VESTRA"
                width={160}
                height={40}
                className="h-8 w-auto select-none pointer-events-none group-hover:brightness-110 transition"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Artikel mendalam, video ringkas, dan kalkulator praktis untuk
              membantu Anda membuat keputusan finansial yang lebih baik.
            </p>
            <p className="text-[11px] text-muted-foreground/60">
              Konten bersifat edukatif, bukan saran investasi.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3 space-y-4 text-sm">
            <h3 className="font-medium text-foreground/90">Menu</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary transition-colors text-muted-foreground"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="hover:text-primary transition-colors text-muted-foreground"
                >
                  Edukasi
                </Link>
              </li>
              <li>
                <Link
                  href="/event"
                  className="hover:text-primary transition-colors text-muted-foreground"
                >
                  Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-4 space-y-4 text-sm">
            <h3 className="font-medium text-foreground/90">Kategori</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/education?c=${cat.slug}#modules`}
                  className="text-xs rounded-full border border-border/60 px-3 py-1.5 text-muted-foreground hover:border-primary/60 hover:text-primary transition-colors bg-background/40 backdrop-blur-sm"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-t border-border/60 pt-6">
          <p className="text-xs text-muted-foreground">
            © {year} VESTRA. Semua hak dilindungi.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground/80">
            <Link href="#" className="hover:text-primary transition-colors">
              Privasi
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Syarat
            </Link>
            <span className="text-muted-foreground/50">
              Artikel • Video • Tools
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
