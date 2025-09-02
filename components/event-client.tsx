"use client";

import { useState, useEffect } from "react";
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
  registrationOpen?: boolean;
  registrationStart?: string;
  registrationEnd?: string;
}

export default function EventClient({ events }: { events: EventItem[] }) {
  // Tidak ada event terpilih secara default
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [statusTab, setStatusTab] = useState<"open" | "closed">("open");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  // Jika event yang dipilih hilang dari daftar (filter / data berubah), reset ke null
  useEffect(() => {
    if (
      selectedEventId !== null &&
      !events.find((e) => e.id === selectedEventId)
    ) {
      setSelectedEventId(null);
    }
  }, [events, selectedEventId]);

  // Reset pilihan jika event berubah menjadi closed
  useEffect(() => {
    if (selectedEventId !== null) {
      const current = events.find((e) => e.id === selectedEventId);
      if (current && current.registrationOpen === false) {
        setSelectedEventId(null);
      }
    }
  }, [events, selectedEventId]);

  const handleSelect = (id: number) => {
    setSelectedEventId(id);
    // Scroll to form
    const el = document.getElementById("register");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Filter events by status tab
  const filtered = events.filter((e) =>
    statusTab === "open"
      ? e.registrationOpen !== false
      : e.registrationOpen === false
  );

  // Pagination derived data
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  // Pastikan event terpilih masih ada pada filter aktif; jika tidak, reset
  useEffect(() => {
    if (
      selectedEventId !== null &&
      !filtered.find((e) => e.id === selectedEventId)
    ) {
      setSelectedEventId(null);
    }
  }, [filtered, selectedEventId]);

  // Reset page to 1 when status tab changes or filtered length shrinks below start index
  useEffect(() => {
    setPage(1);
  }, [statusTab]);

  useEffect(() => {
    if (start >= filtered.length && page !== 1) {
      setPage(1);
    }
  }, [filtered.length, start, page]);

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
        <div className="mt-10 inline-flex rounded-lg border border-border bg-card/60 backdrop-blur shadow-sm overflow-hidden">
          {[
            { key: "open" as const, label: "Open" },
            { key: "closed" as const, label: "Closed" },
          ].map((t) => {
            const active = statusTab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setStatusTab(t.key)}
                className={
                  "px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 " +
                  (active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground")
                }
                aria-pressed={active}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </header>

      <section className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Tidak ada event {statusTab === "open" ? "terbuka" : "tertutup"}.
            </p>
          )}
          {pageItems.map((ev) => (
            <EventCard
              key={ev.id}
              ev={ev}
              onSelect={handleSelect}
              active={ev.id === selectedEventId}
            />
          ))}
          {filtered.length > pageSize && (
            <Pagination
              current={currentPage}
              total={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>

        <aside className="space-y-6 h-fit top-24 lg:sticky">
          <RegistrationCard
            events={events}
            selectedEventId={selectedEventId}
            onChangeEvent={setSelectedEventId}
            statusTab={statusTab}
          />
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

function EventCard({
  ev,
  onSelect,
  active,
}: {
  ev: EventItem;
  onSelect: (id: number) => void;
  active: boolean;
}) {
  const open = ev.registrationOpen !== false; // default open if undefined
  const regRange =
    ev.registrationStart && ev.registrationEnd
      ? `${formatDateShort(ev.registrationStart)} – ${formatDateShort(
          ev.registrationEnd
        )}`
      : ev.registrationStart
      ? `Mulai ${formatDateShort(ev.registrationStart)}`
      : undefined;
  return (
    <article
      className={
        "group relative overflow-hidden rounded-xl border bg-card/60 backdrop-blur transition-colors shadow-sm hover:shadow-lg hover:shadow-primary/10 " +
        (active
          ? "border-primary/70 ring-1 ring-primary/30"
          : "border-border hover:border-primary/60")
      }
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="p-6 relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium uppercase tracking-wide px-2.5 py-1 rounded-full border bg-primary/10 text-primary border-primary/30">
            {ev.type}
          </span>
          {open ? (
            <span className="text-[10px] font-medium tracking-wide px-2 py-1 rounded-full border bg-emerald-500/10 text-emerald-500 border-emerald-500/30">
              OPEN
            </span>
          ) : (
            <span className="text-[10px] font-medium tracking-wide px-2 py-1 rounded-full border bg-rose-500/10 text-rose-500 border-rose-500/30">
              CLOSED
            </span>
          )}
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {formatDate(ev.date)}
          </span>
        </div>
        <h2 className="text-xl font-semibold mb-2 tracking-tight group-hover:text-primary transition-colors">
          {ev.title}
        </h2>
        {regRange && (
          <p className="text-[11px] font-medium mb-3 text-muted-foreground/80">
            Registrasi: {regRange}
            {open ? "" : " (Ditutup)"}
          </p>
        )}
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
        <div className="mt-6 flex justify-end">
          <Button
            size="sm"
            onClick={() => onSelect(ev.id)}
            disabled={!open}
            className="bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {!open ? "Ditutup" : active ? "Dipilih" : "Daftar"}
          </Button>
        </div>
      </div>
    </article>
  );
}

function formatDateShort(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function RegistrationCard({
  events,
  selectedEventId,
  onChangeEvent,
  statusTab,
}: {
  events: EventItem[];
  selectedEventId: number | null;
  onChangeEvent: (id: number) => void;
  statusTab: "open" | "closed";
}) {
  const selected =
    statusTab === "open"
      ? events.find(
          (e) => e.id === selectedEventId && e.registrationOpen !== false
        )
      : undefined;
  const openEvents =
    statusTab === "open"
      ? events.filter((e) => e.registrationOpen !== false)
      : [];
  return (
    <div
      id="register"
      className="relative z-20 rounded-xl border border-border bg-card/70 backdrop-blur p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-2 tracking-tight">
        Daftar Event
      </h3>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Pilih event lalu masukkan email Anda untuk menerima link / pengingat.
      </p>
      <EventSelect
        events={openEvents}
        value={selectedEventId}
        onChange={onChangeEvent}
        disabled={statusTab === "closed" || openEvents.length === 0}
      />
      {selected ? (
        <p className="text-[11px] text-muted-foreground line-clamp-2 mb-4">
          {selected.description}
        </p>
      ) : (
        <p className="text-[11px] text-muted-foreground mb-4 italic">
          {statusTab === "closed"
            ? "Semua event di tab ini sudah ditutup."
            : openEvents.length === 0
            ? "Belum ada event yang terbuka untuk pendaftaran."
            : "Belum ada event dipilih."}
        </p>
      )}
      <EmailRegistrationForm
        selectedEvent={selected}
        forceClosed={statusTab === "closed"}
      />
    </div>
  );
}

function EmailRegistrationForm({
  selectedEvent,
  forceClosed,
}: {
  selectedEvent?: EventItem | null;
  forceClosed?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (forceClosed || !email || !selectedEvent) return;
    setLoading(true);
    setMessage(null);
    try {
      await new Promise((res) => setTimeout(res, 800));
      if (selectedEvent) {
        setMessage(
          `Terdaftar untuk \"${selectedEvent.title}\"! Cek inbox Anda untuk konfirmasi.`
        );
      }
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
          disabled={
            forceClosed ||
            !selectedEvent ||
            selectedEvent.registrationOpen === false
          }
        />
      </div>
      <Button
        type="submit"
        disabled={
          forceClosed ||
          loading ||
          !selectedEvent ||
          selectedEvent.registrationOpen === false
        }
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {forceClosed
          ? "Pendaftaran Ditutup"
          : !selectedEvent
          ? "Pilih Event Dulu"
          : loading
          ? "Mendaftarkan..."
          : selectedEvent.registrationOpen !== false
          ? "Daftar Event"
          : "Pendaftaran Ditutup"}
      </Button>
      {message && (
        <p className="text-xs text-primary font-medium animate-in fade-in">
          {message}
        </p>
      )}
    </form>
  );
}

// Custom event select dropdown (mirip popover dropdown edukasi)
function EventSelect({
  events,
  value,
  onChange,
  disabled,
}: {
  events: EventItem[];
  value: number | null;
  onChange: (id: number) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const selected = events.find((e) => e.id === value);
  useEffect(() => {
    if (disabled && open) setOpen(false);
  }, [disabled, open]);
  return (
    <div className="mb-4">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">
        Pilih Event
      </label>
      <div className="relative z-50" data-state={open ? "open" : "closed"}>
        <button
          type="button"
          onClick={() => {
            if (!disabled) setOpen((o) => !o);
          }}
          className={
            "group h-10 w-full rounded-md border border-border bg-background/60 backdrop-blur px-3 pr-9 text-left text-sm font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 hover:border-primary/60 " +
            (disabled
              ? "opacity-60 cursor-not-allowed"
              : open
              ? "border-primary ring-2 ring-primary/30"
              : "")
          }
          aria-haspopup="listbox"
          aria-expanded={open}
          disabled={disabled}
        >
          <span className="line-clamp-1 pr-2">
            {disabled
              ? "Tidak tersedia"
              : selected
              ? selected.title
              : "Pilih Event"}
          </span>
          <svg
            className={
              "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-transform " +
              (open ? "rotate-180" : "")
            }
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {open && !disabled && (
          <div className="absolute left-0 right-0 mt-2 rounded-md border border-border/70 bg-popover/95 backdrop-blur shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 max-h-72 overflow-auto z-50">
            <ul role="listbox" className="py-1 text-sm">
              {events.map((ev) => {
                const active = ev.id === value;
                return (
                  <li key={ev.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        onChange(ev.id);
                        setOpen(false);
                      }}
                      className={
                        "w-full text-left px-3 py-2 flex flex-col gap-1 rounded-md transition-colors " +
                        (active
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "hover:bg-primary/10 text-foreground")
                      }
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
                        <span
                          className={
                            active
                              ? "px-1.5 py-0.5 rounded-md text-primary-foreground/90"
                              : "px-1.5 py-0.5 rounded-md border bg-primary/10 text-primary border-primary/30"
                          }
                        >
                          {ev.type}
                        </span>
                        {ev.registrationOpen ? (
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 text-[10px]">
                            OPEN
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 rounded-md bg-muted/20 text-muted-foreground border border-border/50 text-[10px]">
                            CLOSED
                          </span>
                        )}
                      </span>
                      <span className="text-xs line-clamp-1">{ev.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// Pagination component (simple numbered + prev/next)
function Pagination({
  current,
  total,
  onPageChange,
}: {
  current: number;
  total: number;
  onPageChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  // Dynamic window pagination: show at most 5 numbers.
  let start = current;
  const end = Math.min(start + 4, total);
  if (end - start + 1 < 5) {
    start = Math.max(1, end - 4);
  }
  const pages = [] as number[];
  for (let p = start; p <= end; p++) pages.push(p);
  return (
    <div className="flex flex-col items-center gap-2 pt-4">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.max(1, current - 1))}
          disabled={current === 1}
          className="bg-transparent"
        >
          Prev
        </Button>
        {pages.map((p) => (
          <Button
            key={p}
            size="sm"
            variant={p === current ? "default" : "outline"}
            onClick={() => onPageChange(p)}
            className={p === current ? "bg-primary" : "bg-transparent"}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(Math.min(total, current + 1))}
          disabled={current === total}
          className="bg-transparent"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
