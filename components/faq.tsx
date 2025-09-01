"use client";

import { useState, useRef, useEffect } from "react"; // <-- tambah useRef, useEffect
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, User } from "lucide-react";

export function Testimonials() {
  const [messages, setMessages] = useState<
    Array<{ type: "question" | "answer"; content: string }>
  >([]);
  const [showQuestions, setShowQuestions] = useState(true);

  // ref ke container pesan
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const faqs = [
    {
      question:
        "Apakah platform ini cocok untuk pemula yang tidak tahu apa-apa tentang keuangan?",
      answer:
        "Tentu saja! Platform kami dirancang khusus untuk pemula. Kami memulai dari konsep dasar dan membangun pengetahuan secara bertahap. Setiap materi dilengkapi dengan penjelasan yang mudah dipahami dan contoh praktis.",
    },
    {
      question:
        "Berapa lama waktu yang dibutuhkan untuk menyelesaikan semua materi?",
      answer:
        "Setiap materi dirancang untuk diselesaikan dalam 12-25 menit. Total waktu untuk menyelesaikan semua materi sekitar 2-3 jam, namun Anda bisa belajar sesuai kecepatan Anda sendiri.",
    },
    {
      question: "Apakah saya perlu membayar untuk mengakses semua fitur?",
      answer:
        "Semua materi pembelajaran dan kalkulator keuangan tersedia gratis. Kami percaya bahwa edukasi keuangan harus dapat diakses oleh semua orang tanpa hambatan finansial.",
    },
    {
      question: "Bagaimana cara kerja kalkulator keuangan di platform ini?",
      answer:
        "Kalkulator kami menggunakan rumus keuangan yang telah terbukti dan digunakan oleh para ahli. Anda tinggal memasukkan data keuangan Anda, dan sistem akan memberikan analisis serta rekomendasi yang sesuai.",
    },
    {
      question: "Apakah materi di platform ini selalu diperbarui?",
      answer:
        "Ya, kami secara berkala memperbarui materi untuk memastikan informasi yang diberikan selalu relevan dengan kondisi ekonomi dan peraturan keuangan terkini di Indonesia.",
    },
    {
      question: "Bisakah saya mengakses platform ini dari smartphone?",
      answer:
        "Tentu! Platform kami fully responsive dan dapat diakses dengan nyaman dari smartphone, tablet, atau komputer. Anda bisa belajar kapan saja dan di mana saja.",
    },
  ];

  const handleQuestionClick = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { type: "question", content: question },
      { type: "answer", content: answer },
    ]);
  };

  const resetChat = () => {
    setMessages([]);
    setShowQuestions(true);
  };

  // Auto-scroll ke bawah setiap messages berubah
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    // langsung tanpa animasi (karena animasi dilarang)
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Tanya Jawab <span className="text-primary">Interaktif</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Klik pertanyaan di bawah untuk mendapatkan jawaban langsung dari
            asisten AI kami
          </p>
        </div>

        <Card className="bg-card border-border min-h-[500px] flex flex-col py-0">
          <CardContent className="p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 pb-4 border-b border-border mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Asisten Keuangan AI</h3>
                <p className="text-sm text-muted-foreground">
                  Siap membantu menjawab pertanyaan Anda
                </p>
              </div>
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetChat}
                  className="ml-auto bg-transparent"
                >
                  Reset Chat
                </Button>
              )}
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 space-y-4 mb-6 max-h-96 overflow-y-auto no-scrollbar"
            >
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Pilih pertanyaan di bawah untuk memulai percakapan
                  </p>
                </div>
              )}

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.type === "question"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.type === "answer" && (
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === "question"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm text-pretty">{message.content}</p>
                  </div>
                  {message.type === "question" && (
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {showQuestions && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Pertanyaan yang sering diajukan:
                </p>
                <div className="grid gap-2">
                  {faqs.map((faq, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left justify-start h-auto p-3 text-wrap bg-transparent hover:bg-primary/10 hover:border-primary/50"
                      onClick={() =>
                        handleQuestionClick(faq.question, faq.answer)
                      }
                    >
                      <MessageCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm text-pretty">
                        {faq.question}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Testimonials;
