"use client";

import { useState, useMemo, useEffect } from "react";
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
import { Clock, Eye, Search, Play } from "lucide-react";
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

  const categories = [
    { id: "all", name: "Semua Materi" },
    { id: "budgeting", name: "Penganggaran" },
    { id: "investing", name: "Investasi" },
    { id: "planning", name: "Perencanaan" },
    { id: "debt", name: "Manajemen Utang" },
    { id: "insurance", name: "Asuransi" },
    { id: "psychology", name: "Psikologi Keuangan" },
  ];

  const { articles, videos, totalArticlePages, totalVideoPages } =
    useMemo(() => {
      const combined = [...articleModules, ...videoModules];
      const filtered = combined.filter((module) => {
        const matchesCategory =
          selectedCategory === "all" || module.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesSearch =
          module.title.toLowerCase().includes(q) ||
          module.description.toLowerCase().includes(q) ||
          module.level.toLowerCase().includes(q) ||
          module.category.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
      });
      const articleAll = filtered.filter((m) => m.type === "article");
      const videoAll = filtered.filter((m) => m.type === "video");
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
    }, [selectedCategory, searchQuery, pageSizeArticles, pageSizeVideos]);

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
  }, [selectedCategory, searchQuery]);

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
    const pages: number[] = [];
    for (let i = 1; i <= total; i++) pages.push(i);
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
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Modul Pembelajaran{" "}
            <span className="text-primary">Komprehensif</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Pilih dari materi yang dirancang ahli kami untuk membawa Anda dari
            pemula keuangan menjadi master uang.
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
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Modul Artikel</h3>
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
            <h3 className="text-2xl font-semibold mb-4">Video Pembelajaran</h3>
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
