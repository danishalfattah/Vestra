"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Clock, Eye, Search, Play, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { articleModules } from "@/lib/articles";
import { videoModules } from "@/lib/videos";

export function LearningModules() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [articlePage, setArticlePage] = useState(1);
  const [videoPage, setVideoPage] = useState(1);
  const [pageSizeArticles, setPageSizeArticles] = useState(6); // default desktop (lg)
  const [pageSizeVideos, setPageSizeVideos] = useState(6); // default desktop (lg)
  const [articleSort, setArticleSort] = useState("default");
  const [videoSort, setVideoSort] = useState("default");

  // Custom popover sort select (styled dropdown)
  const SortSelect = ({
    value,
    onChange,
    options,
    ariaLabel,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
    ariaLabel: string;
  }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClick = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("mousedown", handleClick);
      window.addEventListener("keydown", handleKey);
      return () => {
        window.removeEventListener("mousedown", handleClick);
        window.removeEventListener("keydown", handleKey);
      };
    }, []);

    const current = options.find((o) => o.value === value)?.label || value;

    return (
      <div ref={ref} className="relative inline-block text-left w-56">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => setOpen((o) => !o)}
          className={
            "group h-9 inline-flex w-full items-center gap-2 rounded-md border border-border bg-background/70 backdrop-blur px-3 pr-9 text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 hover:border-primary/60 " +
            (open ? "border-primary ring-2 ring-primary/30" : "")
          }
        >
          <span className="whitespace-nowrap">{current}</span>
          <ChevronDown
            className={
              "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform text-muted-foreground " +
              (open ? "rotate-180" : "")
            }
          />
        </button>
        {open && (
          <div
            role="listbox"
            tabIndex={-1}
            className="z-40 absolute right-0 mt-2 w-full origin-top-right rounded-md border border-border/70 bg-popover/95 backdrop-blur shadow-xl ring-1 ring-black/5 focus:outline-none animate-in fade-in slide-in-from-top-1"
          >
            <ul className="py-1 max-h-64 overflow-auto text-sm">
              {options.map((o) => {
                const active = o.value === value;
                return (
                  <li key={o.value}>
                    <button
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                      }}
                      className={
                        "w-full text-left px-3 py-2 flex items-center justify-between rounded-md transition-colors " +
                        (active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-primary/10 text-foreground")
                      }
                    >
                      <span>{o.label}</span>
                      {active && (
                        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-primary-foreground/80" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Determine viewport-based page size (articles & videos):
  // mobile (<640)=3, tablet (<1024)=4, desktop (>=1024)=6
  useEffect(() => {
    const computeSize = () => {
      if (typeof window === "undefined") return;
      const w = window.innerWidth;
      const size = w < 640 ? 3 : w < 1024 ? 4 : 6;
      setPageSizeArticles(size);
      setPageSizeVideos(size);
    };
    computeSize();
    window.addEventListener("resize", computeSize);
    return () => window.removeEventListener("resize", computeSize);
  }, []);

  const categories = useMemo(
    () => [
      { id: "all", name: "Semua Materi" },
      { id: "budgeting", name: "Penganggaran" },
      { id: "investing", name: "Investasi" },
      { id: "planning", name: "Perencanaan" },
      { id: "debt", name: "Manajemen Utang" },
      { id: "insurance", name: "Asuransi" },
      { id: "psychology", name: "Psikologi Keuangan" },
    ],
    []
  );

  // Apply category from query param ?c= if valid
  const searchParams = useSearchParams();
  useEffect(() => {
    const qp = searchParams.get("c");
    if (qp && categories.some((c) => c.id === qp)) {
      setSelectedCategory(qp);
    }
  }, [searchParams, categories]);

  const { articles, videos, totalArticlePages, totalVideoPages } =
    useMemo(() => {
      const parseDuration = (d: string) => {
        if (!d) return 0;
        const n = parseInt(d.replace(/[^0-9]/g, ""), 10);
        return isNaN(n) ? 0 : n;
      };
      const combined = [...articleModules, ...videoModules];
      const filtered = combined.filter((module) => {
        const matchesCategory =
          selectedCategory === "all" || module.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          module.title.toLowerCase().includes(q) ||
          module.description.toLowerCase().includes(q) ||
          module.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      });
      let articleAll = filtered.filter((m) => m.type === "article");
      let videoAll = filtered.filter((m) => m.type === "video");

      // Apply sorting
      if (articleSort !== "default") {
        articleAll = [...articleAll].sort((a, b) => {
          switch (articleSort) {
            case "views-desc":
              return (b.students || 0) - (a.students || 0);
            case "views-asc":
              return (a.students || 0) - (b.students || 0);
            case "duration-asc":
              return parseDuration(a.duration) - parseDuration(b.duration);
            case "duration-desc":
              return parseDuration(b.duration) - parseDuration(a.duration);
            default:
              return 0;
          }
        });
      }
      if (videoSort !== "default") {
        videoAll = [...videoAll].sort((a, b) => {
          switch (videoSort) {
            case "views-desc":
              return (b.students || 0) - (a.students || 0);
            case "views-asc":
              return (a.students || 0) - (b.students || 0);
            case "duration-asc":
              return parseDuration(a.duration) - parseDuration(b.duration);
            case "duration-desc":
              return parseDuration(b.duration) - parseDuration(a.duration);
            default:
              return 0;
          }
        });
      }

      return {
        articles: articleAll,
        videos: videoAll,
        totalArticlePages: Math.max(
          1,
          Math.ceil(articleAll.length / pageSizeArticles)
        ),
        totalVideoPages: Math.max(
          1,
          Math.ceil(videoAll.length / pageSizeVideos)
        ),
      };
    }, [
      selectedCategory,
      searchQuery,
      pageSizeArticles,
      pageSizeVideos,
      articleSort,
      videoSort,
    ]);

  // Helper untuk menampilkan label kategori yang lebih ramah
  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "budgeting":
        return "Penganggaran";
      case "investing":
        return "Investasi";
      case "planning":
        return "Perencanaan";
      case "debt":
        return "Manajemen Utang";
      case "insurance":
        return "Asuransi";
      case "psychology":
        return "Psikologi Keuangan";
      default:
        return cat.charAt(0).toUpperCase() + cat.slice(1);
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setArticlePage(1);
    setVideoPage(1);
  }, [selectedCategory, searchQuery, articleSort, videoSort]);

  useEffect(() => {
    if (articlePage > totalArticlePages) setArticlePage(totalArticlePages);
  }, [articlePage, totalArticlePages]);
  useEffect(() => {
    if (videoPage > totalVideoPages) setVideoPage(totalVideoPages);
  }, [videoPage, totalVideoPages]);

  const paginatedArticles = useMemo(() => {
    const start = (articlePage - 1) * pageSizeArticles;
    return articles.slice(start, start + pageSizeArticles);
  }, [articles, articlePage, pageSizeArticles]);
  const paginatedVideos = useMemo(() => {
    const start = (videoPage - 1) * pageSizeVideos;
    return videos.slice(start, start + pageSizeVideos);
  }, [videos, videoPage, pageSizeVideos]);

  const Pagination = ({
    current,
    total,
    onChange,
  }: {
    current: number;
    total: number;
    onChange: (n: number) => void;
    label: string;
    size: number;
  }) => {
    if (total <= 1) return null;
    // Dynamic window: show at most 5 consecutive page numbers centered around current as it moves forward.
    let start = current;
    const end = Math.min(start + 4, total);
    if (end - start + 1 < 5) start = Math.max(1, end - 4);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return (
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(Math.max(1, current - 1))}
            disabled={current === 1}
            className="bg-transparent "
          >
            Prev
          </Button>
          {pages.map((p) => (
            <Button
              key={p}
              size="sm"
              variant={p === current ? "default" : "outline"}
              onClick={() => onChange(p)}
              className={p === current ? "bg-primary" : "bg-transparent"}
            >
              {p}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange(Math.min(total, current + 1))}
            disabled={current === total}
            className="bg-transparent"
          >
            Next
          </Button>
        </div>
      </div>
    );
  };

  return (
    <section
      id="modules"
      className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center">
        <div className="w-full max-w-6xl mx-auto h-64 mt-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 blur-3xl rounded-[3rem]" />
      </div>
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-balance">
            Jelajahi <span className="text-primary">Modul Belajar</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Kumpulan materi kurasi untuk mempercepat perjalanan literasi
            keuangan Anda: artikel mendalam dan video ringkas siap jelajah.
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Cari materi pembelajaran..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={
                selectedCategory === category.id
                  ? "bg-primary hover:bg-primary/90"
                  : "hover:bg-primary/10 hover:border-primary/50 transition-all duration-200"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Artikel Section */}
        <div className="space-y-12">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-2xl font-semibold">Modul Artikel</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Urutkan:</span>
                <SortSelect
                  ariaLabel="Urutkan artikel"
                  value={articleSort}
                  onChange={setArticleSort}
                  options={[
                    { value: "default", label: "Default" },
                    { value: "views-desc", label: "Views Terbanyak" },
                    { value: "views-asc", label: "Views Tersedikit" },
                    { value: "duration-asc", label: "Durasi Terpendek" },
                    { value: "duration-desc", label: "Durasi Terpanjang" },
                  ]}
                />
              </div>
            </div>
            {articles.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Tidak ada artikel cocok.
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                  {paginatedArticles.map((module) => (
                    <Link
                      key={module.id}
                      href={`/education/modul/${module.slug}`}
                    >
                      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <div className="w-full h-48 relative overflow-hidden">
                            <Image
                              src={module.image || "/placeholder.svg"}
                              alt={module.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              priority={module.id <= 2}
                            />
                          </div>
                          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                            {categoryLabel(module.category)}
                          </Badge>
                        </div>
                        <CardHeader className="flex-grow">
                          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                            {module.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {module.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 mt-auto">
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {module.duration}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {module.students.toLocaleString()}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
                <Pagination
                  current={articlePage}
                  total={totalArticlePages}
                  onChange={setArticlePage}
                  label="Artikel"
                  size={pageSizeArticles}
                />
              </>
            )}
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-2xl font-semibold">Video Pembelajaran</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Urutkan:</span>
                <SortSelect
                  ariaLabel="Urutkan video"
                  value={videoSort}
                  onChange={setVideoSort}
                  options={[
                    { value: "default", label: "Default" },
                    { value: "views-desc", label: "Views Terbanyak" },
                    { value: "views-asc", label: "Views Tersedikit" },
                    { value: "duration-asc", label: "Durasi Terpendek" },
                    { value: "duration-desc", label: "Durasi Terpanjang" },
                  ]}
                />
              </div>
            </div>
            {videos.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Tidak ada video cocok.
              </p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-4">
                  {paginatedVideos.map((module) => {
                    const thumb =
                      module.image ||
                      (module.youtubeId
                        ? `https://img.youtube.com/vi/${module.youtubeId}/hqdefault.jpg`
                        : "/placeholder.svg");
                    return (
                      <Link
                        key={module.id}
                        href={`/education/video/${module.slug}`}
                      >
                        <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full flex flex-col">
                          <div className="relative overflow-hidden">
                            <div className="w-full h-48 relative overflow-hidden">
                              <Image
                                src={thumb}
                                alt={module.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                priority={module.id <= 2}
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform">
                                  <Play className="w-6 h-6 ml-1" />
                                </div>
                              </div>
                            </div>
                            <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
                              {categoryLabel(module.category)}
                            </Badge>
                            <Badge className="absolute top-3 right-3 bg-black/70 backdrop-blur text-white border-white/10">
                              Video
                            </Badge>
                          </div>
                          <CardHeader className="flex-grow">
                            <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors duration-300">
                              {module.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {module.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4 mt-auto">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {module.duration}
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {module.students.toLocaleString()}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
                <Pagination
                  current={videoPage}
                  total={totalVideoPages}
                  onChange={setVideoPage}
                  label="Video"
                  size={pageSizeVideos}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
