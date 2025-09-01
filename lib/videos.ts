import { LearningModule } from "./module-types";

export const videoModules: LearningModule[] = [
  {
    id: 4,
    slug: "video-intro-investasi",
    title: "Video: Pengenalan Investasi untuk Pemula",
    description:
      "Tonton penjelasan dasar konsep investasi: risiko vs return, diversifikasi, dan langkah awal memulai.",
    category: "investing",
    duration: "8 menit",
    students: 4500,
    type: "video",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export function getVideoBySlug(slug: string) {
  return videoModules.find((m) => m.slug === slug);
}
