import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calculator, Users } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: BookOpen,
      title: "Kurikulum Komprehensif",
      description: "Dari penganggaran dasar hingga strategi investasi lanjutan, kami mencakup semuanya.",
    },
    {
      icon: Calculator,
      title: "Kalkulator Interaktif",
      description: "Kalkulator praktis untuk anggaran, tabungan, dan investasi yang membantu pembelajaran aplikatif.",
    },
    {
      icon: Users,
      title: "Konten Berkualitas",
      description: "Materi pembelajaran yang disusun dengan bahasa sederhana dan mudah dipahami untuk semua level.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Fitur Yang Memberdayakan <span className="text-primary">Perjalanan Keuangan</span> Anda
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Platform kami menyediakan konten edukasi berkualitas dengan alat-alat praktis untuk membantu Anda memahami
            dan menerapkan konsep keuangan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-colors group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
