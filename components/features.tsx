import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, CalendarDays, ShieldCheck } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Modul Ringkas Terstruktur",
      description:
        "Materi 12–25 menit: urutan jelas dari dasar budgeting, proteksi, hingga pengenalan investasi tanpa jargon.",
    },
    {
      icon: CalendarDays,
      title: "Event & Webinar Finansial",
      description:
        "Halaman event statis dengan daftar webinar & seminar tematik untuk memperdalam topik tertentu.",
    },
    {
      icon: ShieldCheck,
      title: "Akses Gratis & Cepat",
      description:
        "Seluruh konten langsung bisa diakses tanpa login, cepat dimuat & aman tanpa hambatan.",
    },
  ];

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Tiga Pilar <span className="text-primary">Pembelajaran</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Fokus utama: belajar terarah lewat modul, perdalam dengan event, dan
            akses gratis tanpa hambatan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-colors group pt-6"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
