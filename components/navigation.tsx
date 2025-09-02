"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Komponen HamburgerIcon yang dianimasikan (tidak ada perubahan)
function AnimatedHamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const barBase =
    "block absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out";

  return (
    <div className="relative h-6 w-6">
      <span
        className={`${barBase} ${
          isOpen ? "rotate-45 top-1/2 -translate-y-1/2" : "top-[5px]"
        }`}
      />
      <span
        className={`${barBase} top-1/2 -translate-y-1/2 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`${barBase} ${
          isOpen ? "-rotate-45 top-1/2 -translate-y-1/2" : "bottom-[5px]"
        }`}
      />
    </div>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkBase =
    "group relative transition-colors px-0.5 py-0.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:rounded-md after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300";
  const linkActive = "text-primary after:scale-x-100";
  const linkHover = "hover:text-primary group-hover:after:scale-x-100";

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="VESTRA Home"
            >
              <Image
                src="/logo.svg"
                alt="VESTRA"
                width={160}
                height={40}
                priority
                className="h-7 w-auto select-none pointer-events-none group-hover:brightness-110 transition"
              />
            </Link>
          </div>

          {/* Navigasi Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                href="/"
                className={`${linkBase} ${linkHover} ${
                  pathname === "/" ? linkActive : "text-foreground"
                }`}
              >
                <span className="relative z-10">Beranda</span>
              </Link>
              <Link
                href="/education"
                className={`${linkBase} ${linkHover} ${
                  pathname?.startsWith("/education")
                    ? linkActive
                    : "text-foreground"
                }`}
              >
                <span className="relative z-10">Edukasi</span>
              </Link>
              <Link
                href="/event"
                className={`${linkBase} ${linkHover} ${
                  pathname?.startsWith("/event")
                    ? linkActive
                    : "text-foreground"
                }`}
              >
                <span className="relative z-10">Event</span>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/education">
              <Button className="bg-primary hover:bg-primary/90">
                Mulai Belajar
              </Button>
            </Link>
          </div>

          {/* Tombol Hamburger untuk Mobile */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="transition hover:scale-105 active:scale-95"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <AnimatedHamburgerIcon isOpen={isOpen} />
            </Button>
          </div>
        </div>
      </div>

      {/* --- PERBAIKAN ANIMASI DI SINI --- */}
      {/* Dropdown Menu Mobile dengan transisi standar */}
      <div
        className={`md:hidden absolute w-full bg-background/95 backdrop-blur-sm border-b border-border shadow-lg transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${
              pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            Beranda
          </Link>
          <Link
            href="/education"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${
              pathname?.startsWith("/education")
                ? "text-primary"
                : "text-foreground"
            }`}
          >
            Edukasi
          </Link>
          <Link
            href="/event"
            onClick={() => setIsOpen(false)}
            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 ${
              pathname?.startsWith("/event")
                ? "text-primary"
                : "text-foreground"
            }`}
          >
            Event
          </Link>
          <div className="pt-2 px-3">
            <Link href="/education" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Mulai Belajar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
