"use client";

import { useParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { getVideoBySlug } from "@/lib/videos";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VideoModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const moduleItem = getVideoBySlug(slug);

  if (!moduleItem || moduleItem.type !== "video") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Video Tidak Ditemukan</h1>
          <Link href="/education">
            <Button>Kembali ke Halaman Belajar</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/education"
          className="inline-flex items-center text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Halaman Belajar
        </Link>
        <div className="mb-8">
          <div className="w-full aspect-video relative rounded-lg overflow-hidden mb-6 bg-black">
            {moduleItem.youtubeId ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${moduleItem.youtubeId}?rel=0&modestbranding=1`}
                title={moduleItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                Video tidak tersedia
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-primary/10 text-primary capitalize">
              {moduleItem.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" /> {moduleItem.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />{" "}
              {moduleItem.students.toLocaleString()} views
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">{moduleItem.title}</h1>
          <p className="text-lg text-muted-foreground">
            {moduleItem.description}
          </p>
        </div>
      </div>
    </div>
  );
}
