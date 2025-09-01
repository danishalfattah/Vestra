import { LearningModule } from "./module-types";

export const videoModules: LearningModule[] = [
  {
    "id": 1,
    "slug": "3-cara-mengelola-keuangan-pribadi",
    "title": "3 Cara untuk Mulai Mengelola Keuangan Pribadi",
    "description": "Video ini menjelaskan tiga cara sederhana untuk mulai mengelola keuangan pribadi Anda.",
    "category": "budgeting",
    "duration": "4 menit 30 detik",
    "students": 521127,
    "type": "video",
    "youtubeId": "7yW_GD-RoZY"
  },
  {
    "id": 2,
    "slug": "pentingnya-membuat-anggaran-keuangan",
    "title": "Pentingnya membuat anggaran keuangan",
    "description": "Animasi singkat yang menjelaskan pentingnya membuat anggaran keuangan.",
    "category": "budgeting",
    "duration": "53 detik",
    "students": 220,
    "type": "video",
    "youtubeId": "bjQJDAj5lPI"
  },
  {
    "id": 3,
    "slug": "logika-sederhana-pentingnya-investasi",
    "title": "Logika Sederhana Pentingnya Investasi",
    "description": "Video dari Indonesia Stock Exchange (IDX) yang menjelaskan mengapa investasi itu penting.",
    "category": "investing",
    "duration": "3 menit 40 detik",
    "students": 492668,
    "type": "video",
    "youtubeId": "4tlGcAVnJO4"
  },
  {
    "id": 4,
    "slug": "bagaimana-sebenarnya-pasar-saham-bekerja",
    "title": "Bagaimana Sebenarnya Pasar Saham Bekerja?",
    "description": "Video dari Kok Bisa? yang menjelaskan cara kerja pasar saham secara sederhana.",
    "category": "investing",
    "duration": "3 menit 36 detik",
    "students": 1752765,
    "type": "video",
    "youtubeId": "MXj1oSUEVv8"
  },
  {
    "id": 5,
    "slug": "10-menit-ngerti-financial-planning",
    "title": "10 Menit NGERTI Financial Planning!🤑",
    "description": "Video dari Felicia Putri Tjiasaka yang akan membuat Anda mengerti perencanaan keuangan dalam 10 menit.",
    "category": "planning",
    "duration": "10 menit",
    "students": 167246,
    "type": "video",
    "youtubeId": "xk5SeLs5Loc"
  },
  {
    "id": 6,
    "slug": "3-cara-mengelola-keuangan-pribadi-perencanaan",
    "title": "3 Cara untuk Mulai Mengelola Keuangan Pribadi",
    "description": "Video ini menjelaskan tiga cara sederhana untuk mulai mengelola keuangan pribadi Anda.",
    "category": "planning",
    "duration": "4 menit 30 detik",
    "students": 521127,
    "type": "video",
    "youtubeId": "7yW_GD-RoZY"
  },
  {
    "id": 7,
    "slug": "belajar-hutang-ala-orang-kaya",
    "title": "Belajar HUTANG ala Orang Kaya",
    "description": "Video dari Raymond Chin yang membahas cara mengelola utang seperti orang kaya.",
    "category": "debt",
    "duration": "9 menit 9 detik",
    "students": 420619,
    "type": "video",
    "youtubeId": "1Iv3Xr9ZUy0"
  },
  {
    "id": 8,
    "slug": "cara-keluar-dari-kemiskinan-dapat-miliaran",
    "title": "Cara Keluar Dari Kemiskinan & Dapat Miliaran",
    "description": "Video dari Leon Hartono yang memberikan wawasan tentang cara keluar dari kemiskinan.",
    "category": "debt",
    "duration": "59 menit 10 detik",
    "students": 1413670,
    "type": "video",
    "youtubeId": "Y-NawgPB_lA"
  },
  {
    "id": 9,
    "slug": "asuransi-iknb-ekonomi-kelas-x",
    "title": "Asuransi -IKNB | Ekonomi Kelas X (Kurikulum Sekolah Penggerak) | EDURAYA MENGAJAR",
    "description": "Video edukasi tentang asuransi untuk siswa kelas X oleh Eduraya Teknologi.",
    "category": "insurance",
    "duration": "4 menit 22 detik",
    "students": 32235,
    "type": "video",
    "youtubeId": "T7Jvi9t92uA"
  },
  {
    "id": 10,
    "slug": "cerita-asuransi-aku",
    "title": "CERITA ASURANSI AKU | #CeritaAsuransi eps 1",
    "description": "Felicia Putri Tjiasaka berbagi cerita dan pengalamannya seputar asuransi.",
    "category": "insurance",
    "duration": "10 menit 22 detik",
    "students": 101673,
    "type": "video",
    "youtubeId": "vVRi7kHYdLc"
  },
  {
    "id": 11,
    "slug": "mindset-yang-benar-soal-uang",
    "title": "Mindset yang Benar soal Uang | The Psychology Of Money",
    "description": "Video dari Si Kutu Buku yang membahas mindset yang benar tentang uang berdasarkan buku 'The Psychology of Money'.",
    "category": "psychology",
    "duration": "10 menit 4 detik",
    "students": 736076,
    "type": "video",
    "youtubeId": "evXfyT4AsL4"
  },
  {
    "id": 12,
    "slug": "cara-ngatur-duit-tanpa-ribet",
    "title": "Cara Ngatur Duit Tanpa Ribet",
    "description": "Timothy Ronald memberikan tips praktis cara mengatur uang tanpa ribet.",
    "category": "psychology",
    "duration": "17 menit 44 detik",
    "students": 1150153,
    "type": "video",
    "youtubeId": "sCUghGYNGC4"
  }
]

export function getVideoBySlug(slug: string) {
  return videoModules.find((m) => m.slug === slug);
}
