"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-primary">
              Vestra
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className="text-foreground">
                Beranda
              </Link>
              <Link href="/education" className="text-foreground">
                Belajar
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-b border-border">
            <Link href="/" className="block px-3 py-2 text-foreground">
              Beranda
            </Link>
            <Link href="/education" className="block px-3 py-2 text-foreground">
              Belajar
            </Link>
            <div className="px-3 py-2">
              <Link href="/education">
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
