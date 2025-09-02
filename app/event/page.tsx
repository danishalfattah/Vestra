import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import EventClient from "@/components/event-client";

export const metadata: Metadata = {
  title: "Event Finansial – Jadwal & Pendaftaran",
  description:
    "Temukan webinar dan seminar finansial terkini untuk meningkatkan literasi keuangan Anda.",
};

// Data akan diteruskan ke komponen client; sementara statis di sini.
const events = [
  {
    id: 1,
    type: "webinar",
    title: "Strategi Investasi Pasar Saham 2025",
    description:
      "Kupas tren pasar dan taktik penyusunan portofolio yang adaptif menghadapi volatilitas.",
    date: "2025-09-20",
    time: "19:00 WIB",
    duration: "90 menit",
    location: "Online Zoom",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-08-25",
    registrationEnd: "2025-09-18",
  },
  {
    id: 2,
    type: "seminar",
    title: "Membangun Dana Darurat & Proteksi Risiko",
    description:
      "Kerangka praktis membangun buffer keuangan dan memilih asuransi yang relevan.",
    date: "2025-10-05",
    time: "10:00 WIB",
    duration: "120 menit",
    location: "Hotel Grand Jakarta",
    registrationUrl: "#",
    registrationOpen: false,
    registrationStart: "2025-07-25",
    registrationEnd: "2025-08-25",
  },
  {
    id: 3,
    type: "webinar",
    title: "Psikologi Keputusan Finansial: Bias Umum & Solusinya",
    description:
      "Identifikasi bias kognitif yang sering menjebak keputusan keuangan dan cara mitigasinya.",
    date: "2025-10-18",
    time: "19:30 WIB",
    duration: "75 menit",
    location: "Online YouTube Live",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-09-01",
    registrationEnd: "2025-10-16",
  },
  {
    id: 4,
    type: "webinar",
    title: "Optimalisasi Pajak untuk Investor Ritel",
    description:
      "Strategi legal meminimalkan beban pajak atas dividen, capital gain, dan instrumen lain.",
    date: "2025-11-02",
    time: "19:00 WIB",
    duration: "80 menit",
    location: "Online Zoom",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-09-15",
    registrationEnd: "2025-10-31",
  },
  {
    id: 5,
    type: "seminar",
    title: "Manajemen Risiko Portofolio Lanjutan",
    description:
      "Pendalaman Value-at-Risk, stress test, dan penentuan sizing posisi yang optimal.",
    date: "2025-11-09",
    time: "09:30 WIB",
    duration: "150 menit",
    location: "Hotel Grand Jakarta",
    registrationUrl: "#",
    registrationOpen: false,
    registrationStart: "2025-07-20",
    registrationEnd: "2025-08-15",
  },
  {
    id: 6,
    type: "webinar",
    title: "Perencanaan Pensiun Modern: FIRE vs Traditional",
    description:
      "Membandingkan pendekatan Financial Independence Retire Early dengan strategi pensiun klasik.",
    date: "2025-11-16",
    time: "20:00 WIB",
    duration: "85 menit",
    location: "Online YouTube Live",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-09-25",
    registrationEnd: "2025-11-14",
  },
  {
    id: 7,
    type: "seminar",
    title: "Evaluasi Produk Asuransi Kesehatan 2025",
    description:
      "Metrik membandingkan polis kesehatan: limit tahunan, inner limit, dan pengecualian umum.",
    date: "2025-11-23",
    time: "13:00 WIB",
    duration: "110 menit",
    location: "Convention Center Bandung",
    registrationUrl: "#",
    registrationOpen: false,
    registrationStart: "2025-07-28",
    registrationEnd: "2025-08-20",
  },
  {
    id: 8,
    type: "webinar",
    title: "Strategi Diversifikasi Multi-Aset Global",
    description:
      "Membangun portofolio lintas saham, obligasi, komoditas, dan REIT lintas kawasan.",
    date: "2025-12-01",
    time: "19:30 WIB",
    duration: "90 menit",
    location: "Online Zoom",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-10-01",
    registrationEnd: "2025-11-29",
  },
  {
    id: 9,
    type: "webinar",
    title: "Analisis Portofolio Kuantitatif Dasar",
    description:
      "Memahami metrik korelasi, beta, dan Sharpe untuk meningkatkan konstruksi portofolio.",
    date: "2025-12-10",
    time: "19:00 WIB",
    duration: "80 menit",
    location: "Online Zoom",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-10-25",
    registrationEnd: "2025-12-08",
  },
  {
    id: 10,
    type: "seminar",
    title: "Taktik Negosiasi Gaji & Kompensasi 2026",
    description:
      "Framework menilai nilai pasar, menyusun argumen nilai tambah, dan strategi counter-offer.",
    date: "2025-12-14",
    time: "09:30 WIB",
    duration: "120 menit",
    location: "Hotel Grand Jakarta",
    registrationUrl: "#",
    registrationOpen: false,
    registrationStart: "2025-08-01",
    registrationEnd: "2025-08-28",
  },
  {
    id: 11,
    type: "webinar",
    title: "Manajemen Likuiditas Pribadi & Cash Ladder",
    description:
      "Membangun struktur kas berlapis untuk tujuan jangka pendek, menengah, dan darurat.",
    date: "2025-12-20",
    time: "20:00 WIB",
    duration: "70 menit",
    location: "Online YouTube Live",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-11-01",
    registrationEnd: "2025-12-18",
  },
  {
    id: 12,
    type: "webinar",
    title: "Evaluasi Kinerja Tahun 2025 & Rebalancing Awal 2026",
    description:
      "Checklist meninjau alokasi aset, risiko, dan penyesuaian rebalancing menghadapi tahun baru.",
    date: "2025-12-28",
    time: "19:30 WIB",
    duration: "85 menit",
    location: "Online Zoom",
    registrationUrl: "#",
    registrationOpen: false,
    registrationStart: "2025-08-05",
    registrationEnd: "2025-08-30",
  },
  {
    id: 13,
    type: "seminar",
    title: "Perencanaan Arus Kas Awal Tahun & Budget 2026",
    description:
      "Metodologi mengonversi sasaran tahunan jadi peta arus kas bulanan yang realistis.",
    date: "2026-01-11",
    time: "10:00 WIB",
    duration: "140 menit",
    location: "Convention Center Bandung",
    registrationUrl: "#",
    registrationOpen: true,
    registrationStart: "2025-11-20",
    registrationEnd: "2026-01-08",
  },
];

export default function EventPage() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Lebih sedikit intensitas & glow tersebar */}
      <div className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]">
        {/* Sudut atas kiri */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[160px] opacity-30 mix-blend-screen" />
        {/* Sudut atas kanan */}
        <div className="absolute -top-32 right-0 w-[480px] h-[480px] rounded-full bg-accent/30 blur-[150px] opacity-25 mix-blend-screen" />
        {/* Tengah kiri */}
        <div className="absolute top-1/3 -left-28 w-[540px] h-[540px] rounded-full bg-primary/20 blur-[170px] opacity-30 mix-blend-screen" />
        {/* Tengah kanan */}
        <div className="absolute top-1/2 right-[-220px] w-[700px] h-[700px] rounded-full bg-primary/25 blur-[190px] opacity-25 mix-blend-screen" />
        {/* Bawah kiri */}
        <div className="absolute bottom-[-260px] left-[-120px] w-[680px] h-[680px] rounded-full bg-accent/25 blur-[200px] opacity-25 mix-blend-screen" />
        {/* Bawah kanan */}
        <div className="absolute bottom-[-200px] right-[-80px] w-[520px] h-[520px] rounded-full bg-primary/20 blur-[170px] opacity-25 mix-blend-screen" />
        {/* Glow halus pusat */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full bg-primary/25 blur-[160px] opacity-20 mix-blend-screen animate-pulse" />
        {/* Overlay ringan untuk menyatukan */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/10 mix-blend-overlay" />
      </div>
      <div className="relative z-10 flex flex-col flex-1">
        <Navigation />
        <main className="flex-1 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <EventClient events={events} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
