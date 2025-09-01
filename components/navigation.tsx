"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const linkBase =
    "group relative transition-colors px-0.5 py-0.5 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:rounded-md after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300";
  const linkActive = "text-primary after:scale-x-100";
  const linkHover = "hover:text-primary group-hover:after:scale-x-100";

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Vestra
            </Link>
          </div>

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
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/education">
              <Button className="bg-primary hover:bg-primary/90">
                Mulai Belajar
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="transition hover:scale-105 active:scale-95"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-in fade-in slide-in-from-top-2">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-card/95 backdrop-blur border-b border-border shadow-lg">
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
            <div className="pt-2 px-3">
              <Link href="/education" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Mulai Belajar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
