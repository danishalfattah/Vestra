export function Stats() {
  const stats = [
    { number: "50k+", label: "Pelajar Aktif" },
    { number: "95%", label: "Pelajar Merasa Puas" },
    { number: "50+", label: "Modul Pembelajaran" },
    { number: "10+", label: "Webinar Event" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Stats as default };
