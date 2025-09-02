"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin, Video, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EventItem {
  id: number;
  type: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  registrationUrl: string;
}

export default function EventClient({ events }: { events: EventItem[] }) {
  return (
    <div className="max-w-6xl mx-auto">
      <header className="text-center mb-14 relative">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center -z-10">
          <div className="w-full max-w-4xl h-56 bg-gradient-to-br from-primary/15 via-transparent to-accent/20 blur-3xl rounded-[4rem]" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
          Event <span className="text-primary">Finansial</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Ikuti webinar & seminar pilihan untuk mempercepat pemahaman dan
          praktik keuangan Anda. Pilih acara, daftar, dan dapatkan pengingat
          langsung di email.
        </p>
      </header>

      <section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {events.map((ev) => (
            <EventCard key={ev.id} ev={ev} />
          ))}
        </div>

        <aside className="space-y-6 h-fit top-24 lg:sticky">
          <RegistrationCard />
          <div className="rounded-xl border border-border/60 bg-background/40 backdrop-blur p-5 text-xs text-muted-foreground leading-relaxed">
            <p>
              Dengan mendaftar, Anda setuju menerima email terkait event. Anda
              dapat berhenti berlangganan kapan saja melalui tautan di email.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function EventCard({ ev }: { ev: EventItem }) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur hover:border-primary/60 transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/10">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-xs font-medium uppercase tracking-wide px-2.5 py-1 rounded-full border ${
              ev.type === "webinar"
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-accent/10 text-accent-foreground border-accent/30"
            }`}
          >
            {ev.type}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {formatDate(ev.date)}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors">
          {ev.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 max-w-prose">
          {ev.description}
        </p>
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 mt-0.5 text-primary" />
            <div>
              <dt className="font-medium mb-0.5">Waktu</dt>
              <dd className="text-muted-foreground">{ev.time}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Video className="w-4 h-4 mt-0.5 text-primary" />
            <div>
              <dt className="font-medium mb-0.5">Durasi</dt>
              <dd className="text-muted-foreground">{ev.duration}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 mt-0.5 text-primary" />
            <div>
              <dt className="font-medium mb-0.5">Lokasi</dt>
              <dd className="text-muted-foreground">{ev.location}</dd>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Mail className="w-4 h-4 mt-0.5 text-primary" />
            <div>
              <dt className="font-medium mb-0.5">Pendaftaran</dt>
              <dd className="text-muted-foreground">Email</dd>
            </div>
          </div>
        </dl>
      </div>
    </article>
  );
}

function RegistrationCard() {
  return (
    <div className="rounded-xl border border-border bg-card/70 backdrop-blur p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-2 tracking-tight">
        Daftar & Dapatkan Pengingat
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Masukkan email Anda untuk mendaftar & menerima link / pengingat acara
        yang dipilih. Kami tidak akan mengirim spam.
      </p>
      <EmailRegistrationForm />
    </div>
  );
}

function EmailRegistrationForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage(null);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setMessage("Terdaftar! Cek inbox Anda untuk konfirmasi.");
      setEmail("");
    } catch {
      setMessage("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-2">
        <Input
          type="email"
          required
          placeholder="nama@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-background/60 backdrop-blur"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90"
      >
        {loading ? "Mendaftarkan..." : "Daftar"}
      </Button>
      {message && (
        <p className="text-xs text-primary font-medium animate-in fade-in">
          {message}
        </p>
      )}
    </form>
  );
}
