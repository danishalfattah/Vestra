"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Star,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Eye,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import Image from "next/image";

// Data modul (dipindah dari /course ke /education)
const moduleData = {
  "dasar-dasar-penganggaran": {
    id: 1,
    title: "Dasar-Dasar Penganggaran: Kendalikan Uang Anda",
    description:
      "Pelajari fundamental membuat dan memelihara anggaran yang sesuai dengan gaya hidup Anda.",
    duration: "2 jam",
    students: 15420,
    rating: 4.9,
    level: "Pemula",
    image: "/budgeting-calculator-interface.png",
    content: [
      {
        title: "Apa itu Anggaran?",
        text: "Anggaran adalah rencana keuangan yang membantu Anda mengalokasikan pendapatan untuk berbagai kebutuhan dan tujuan. Dengan anggaran yang baik, Anda dapat mengontrol pengeluaran dan mencapai tujuan finansial.\n\nAnggaran bukan hanya tentang membatasi pengeluaran, tetapi juga tentang memberikan kebebasan finansial. Ketika Anda tahu persis kemana uang Anda pergi, Anda dapat membuat keputusan yang lebih bijak dan menghindari stres keuangan.\n\nSebuah anggaran yang efektif harus realistis, fleksibel, dan dapat disesuaikan dengan perubahan situasi keuangan Anda. Ingatlah bahwa anggaran adalah alat untuk mencapai tujuan, bukan penghalang untuk menikmati hidup.",
      },
      {
        title: "Langkah Membuat Anggaran",
        text: "1. Hitung total pendapatan bulanan dari semua sumber\n2. Catat semua pengeluaran tetap (sewa, listrik, asuransi, cicilan)\n3. Identifikasi pengeluaran variabel (makanan, transportasi, hiburan)\n4. Tentukan alokasi untuk kebutuhan, keinginan, dan tabungan\n5. Sisihkan untuk dana darurat dan investasi\n6. Monitor dan evaluasi setiap bulan\n\nTips penting: Mulai dengan mencatat semua pengeluaran selama sebulan untuk mendapatkan gambaran yang akurat. Gunakan aplikasi atau spreadsheet untuk memudahkan tracking. Jangan lupa untuk menyisakan ruang untuk pengeluaran tak terduga.",
      },
      {
        title: "Tips Mengelola Anggaran",
        text: "Gunakan aturan 50/30/20: 50% untuk kebutuhan pokok, 30% untuk keinginan, 20% untuk tabungan dan investasi. Aturan ini memberikan keseimbangan antara memenuhi kebutuhan, menikmati hidup, dan mempersiapkan masa depan.\n\nSelalu catat pengeluaran harian dan review anggaran setiap minggu. Buat kategori pengeluaran yang spesifik agar lebih mudah dianalisis. Jika ada kategori yang sering over budget, evaluasi apakah alokasi perlu disesuaikan atau pengeluaran perlu dikurangi.\n\nJangan terlalu ketat pada diri sendiri. Sisakan sedikit ruang untuk 'fun money' agar anggaran tetap sustainable dalam jangka panjang.",
      },
      {
        title: "Mengatasi Tantangan Anggaran",
        text: "Tantangan umum dalam penganggaran adalah pengeluaran impulsif dan kurangnya disiplin. Untuk mengatasinya, terapkan aturan 24 jam sebelum membeli barang non-esensial yang mahal.\n\nBuat sistem reward untuk diri sendiri ketika berhasil mengikuti anggaran. Misalnya, jika berhasil hemat 10% dari target bulanan, gunakan sebagian untuk membeli sesuatu yang diinginkan.\n\nJangan menyerah jika gagal di bulan pertama. Anggaran adalah skill yang perlu dipraktikkan. Sesuaikan dan perbaiki terus hingga menemukan formula yang cocok untuk gaya hidup Anda.",
      },
    ],
    quiz: [
      {
        question:
          "Berapa persen dari pendapatan yang sebaiknya dialokasikan untuk tabungan menurut aturan 50/30/20?",
        options: ["10%", "15%", "20%", "25%"],
        correct: 2,
      },
      {
        question: "Apa yang termasuk dalam pengeluaran tetap?",
        options: [
          "Makanan dan hiburan",
          "Sewa dan cicilan",
          "Belanja dan jalan-jalan",
          "Hadiah dan donasi",
        ],
        correct: 1,
      },
      {
        question: "Mengapa anggaran perlu di-review secara berkala?",
        options: [
          "Untuk menambah pengeluaran",
          "Untuk menyesuaikan dengan perubahan situasi",
          "Untuk mengurangi tabungan",
          "Untuk menghilangkan kategori pengeluaran",
        ],
        correct: 1,
      },
      {
        question: "Apa tujuan utama dari membuat anggaran?",
        options: [
          "Membatasi semua pengeluaran",
          "Mengontrol keuangan dan mencapai tujuan finansial",
          "Menghindari berbelanja",
          "Menyimpan semua uang",
        ],
        correct: 1,
      },
      {
        question:
          "Strategi apa yang bisa diterapkan untuk mengatasi pengeluaran impulsif?",
        options: [
          "Membawa uang cash lebih banyak",
          "Menerapkan aturan 24 jam sebelum membeli",
          "Berbelanja setiap hari",
          "Tidak membuat daftar belanja",
        ],
        correct: 1,
      },
    ],
  },
  "fundamental-investasi": {
    id: 2,
    title: "Fundamental Investasi: Membangun Kekayaan",
    description:
      "Temukan dasar-dasar investasi, dari saham dan obligasi hingga strategi diversifikasi.",
    duration: "3 jam",
    students: 12350,
    rating: 4.8,
    level: "Pemula",
    image: "/investment-growth-chart-dashboard.png",
    content: [
      {
        title: "Mengapa Harus Investasi?",
        text: "Investasi adalah cara untuk mengalahkan inflasi dan membangun kekayaan jangka panjang. Dengan menyimpan uang di bank saja, nilai uang Anda akan tergerus inflasi setiap tahunnya.\n\nInflasi rata-rata di Indonesia sekitar 3-4% per tahun, sementara bunga tabungan hanya 1-2%. Artinya, daya beli uang Anda berkurang 1-2% setiap tahun jika hanya menabung.\n\nInvestasi memberikan potensi return yang lebih tinggi dari inflasi, sehingga nilai riil uang Anda dapat bertumbuh. Semakin dini Anda mulai berinvestasi, semakin besar manfaat compound interest yang akan Anda dapatkan.",
      },
      {
        title: "Jenis-Jenis Investasi",
        text: "1. Saham - kepemilikan perusahaan dengan potensi return tinggi tapi risiko tinggi\n2. Obligasi - surat utang dengan return stabil dan risiko rendah\n3. Reksa Dana - investasi kolektif yang dikelola manajer investasi profesional\n4. Emas - investasi safe haven yang tahan inflasi\n5. Properti - investasi aset riil dengan potensi capital gain dan rental yield\n6. Deposito - investasi dengan return tetap dan risiko minimal\n\nSetiap jenis investasi memiliki karakteristik risiko dan return yang berbeda. Pemula sebaiknya mulai dari reksa dana atau saham blue chip yang relatif stabil.",
      },
      {
        title: "Prinsip Diversifikasi",
        text: "Jangan taruh semua telur dalam satu keranjang. Diversifikasi membantu mengurangi risiko dengan menyebar investasi ke berbagai instrumen, sektor, dan geografis yang berbeda.\n\nDiversifikasi bisa dilakukan secara horizontal (berbagai jenis aset) dan vertikal (berbagai perusahaan dalam satu sektor). Misalnya, kombinasi saham, obligasi, dan emas dengan proporsi yang sesuai profil risiko.\n\nUntuk pemula, reksa dana campuran sudah memberikan diversifikasi otomatis. Seiring bertambahnya pengetahuan dan modal, Anda bisa melakukan diversifikasi mandiri.",
      },
      {
        title: "Strategi Investasi Jangka Panjang",
        text: "Dollar Cost Averaging (DCA) adalah strategi investasi rutin dengan nominal tetap, terlepas dari kondisi pasar. Strategi ini membantu mengurangi risiko timing dan volatilitas pasar.\n\nFokus pada fundamental perusahaan atau aset yang Anda beli, bukan fluktuasi harga jangka pendek. Investasi terbaik adalah yang Anda pahami dan percayai untuk jangka panjang.\n\nRebalancing portofolio secara berkala untuk memastikan alokasi aset tetap sesuai target. Jual yang sudah overweight, beli yang underweight.",
      },
    ],
    quiz: [
      {
        question: "Apa tujuan utama dari diversifikasi investasi?",
        options: [
          "Meningkatkan return",
          "Mengurangi risiko",
          "Mempercepat keuntungan",
          "Menghindari pajak",
        ],
        correct: 1,
      },
      {
        question: "Mengapa investasi penting untuk mengalahkan inflasi?",
        options: [
          "Karena inflasi selalu naik",
          "Karena return investasi umumnya lebih tinggi dari inflasi",
          "Karena uang akan habis",
          "Karena bank tidak aman",
        ],
        correct: 1,
      },
      {
        question: "Apa itu Dollar Cost Averaging (DCA)?",
        options: [
          "Investasi sekali dalam jumlah besar",
          "Investasi rutin dengan nominal tetap",
          "Investasi hanya saat harga turun",
          "Investasi hanya di saham Amerika",
        ],
        correct: 1,
      },
      {
        question: "Instrumen investasi mana yang paling cocok untuk pemula?",
        options: ["Saham individual", "Reksa dana", "Forex", "Cryptocurrency"],
        correct: 1,
      },
      {
        question: "Kapan sebaiknya melakukan rebalancing portofolio?",
        options: [
          "Setiap hari",
          "Secara berkala sesuai rencana",
          "Hanya saat rugi",
          "Tidak pernah",
        ],
        correct: 1,
      },
    ],
  },
  "strategi-dana-darurat": {
    id: 3,
    title: "Strategi Dana Darurat",
    description:
      "Bangun jaring pengaman keuangan yang solid dengan strategi dana darurat yang terbukti.",
    duration: "1.5 jam",
    students: 9870,
    rating: 4.9,
    level: "Pemula",
    image: "/emergency-fund-piggy-bank-savings.png",
    content: [
      {
        title: "Pentingnya Dana Darurat",
        text: "Dana darurat adalah uang yang disisihkan khusus untuk menghadapi situasi tak terduga seperti kehilangan pekerjaan, sakit, atau kerusakan kendaraan. Ini adalah fondasi keuangan yang harus dimiliki sebelum berinvestasi.\n\nTanpa dana darurat, Anda akan terpaksa menggunakan kartu kredit, meminjam uang, atau menjual investasi saat kondisi tidak menguntungkan ketika menghadapi keadaan darurat.\n\nDana darurat memberikan ketenangan pikiran dan fleksibilitas dalam mengambil keputusan finansial. Anda tidak akan terjebak dalam situasi yang memaksa Anda mengambil keputusan buruk karena tekanan keuangan.",
      },
      {
        title: "Berapa Besar Dana Darurat?",
        text: "Idealnya 6-12 bulan pengeluaran bulanan. Untuk karyawan tetap minimal 6 bulan, untuk freelancer atau wirausaha sebaiknya 12 bulan karena pendapatan yang tidak pasti.\n\nMulai dengan target 1 bulan pengeluaran, lalu tingkatkan bertahap hingga mencapai target ideal. Jangan terbebani dengan target besar di awal, yang penting konsisten menyisihkan dana.\n\nHitung berdasarkan pengeluaran bulanan, bukan pendapatan. Misalnya jika pengeluaran bulanan Rp 5 juta, maka dana darurat minimal Rp 30 juta (6 bulan).",
      },
      {
        title: "Dimana Menyimpan Dana Darurat?",
        text: "Simpan di instrumen yang mudah dicairkan (liquid) seperti tabungan biasa, deposito jangka pendek, atau reksa dana pasar uang. Prioritas utama adalah likuiditas, bukan return.\n\nHindari investasi berisiko tinggi seperti saham atau crypto untuk dana darurat. Dana darurat harus stabil nilainya dan bisa diakses kapan saja tanpa penalty.\n\nPertimbangkan untuk membagi dana darurat ke beberapa tempat: sebagian di tabungan untuk akses cepat, sebagian di deposito untuk return lebih baik.",
      },
      {
        title: "Strategi Membangun Dana Darurat",
        text: "Otomatisasi adalah kunci sukses. Set up auto debit dari rekening utama ke rekening khusus dana darurat setiap gajian. Treat it like a bill yang harus dibayar.\n\nMulai dari yang kecil tapi konsisten. Lebih baik Rp 500 ribu per bulan secara konsisten daripada Rp 2 juta sekali lalu berhenti.\n\nGunakan windfall seperti bonus, THR, atau uang lembur untuk mempercepat pembentukan dana darurat. Jangan gunakan untuk lifestyle inflation.",
      },
    ],
    quiz: [
      {
        question:
          "Berapa bulan pengeluaran yang ideal untuk dana darurat seorang karyawan tetap?",
        options: ["3-4 bulan", "6-12 bulan", "12-24 bulan", "1-2 bulan"],
        correct: 1,
      },
      {
        question: "Dimana sebaiknya menyimpan dana darurat?",
        options: ["Saham", "Tabungan atau deposito", "Cryptocurrency", "Emas"],
        correct: 1,
      },
      {
        question:
          "Apa prioritas utama dalam memilih instrumen untuk dana darurat?",
        options: [
          "Return tinggi",
          "Likuiditas tinggi",
          "Risiko tinggi",
          "Jangka waktu panjang",
        ],
        correct: 1,
      },
      {
        question: "Kapan sebaiknya mulai membangun dana darurat?",
        options: [
          "Setelah investasi",
          "Sebelum investasi",
          "Bersamaan dengan investasi",
          "Tidak perlu",
        ],
        correct: 1,
      },
      {
        question:
          "Strategi apa yang paling efektif untuk membangun dana darurat?",
        options: [
          "Menabung sisa uang bulanan",
          "Otomatisasi dengan auto debit",
          "Menabung saat ada uang lebih",
          "Menunggu bonus besar",
        ],
        correct: 1,
      },
    ],
  },
} as const;

export default function EducationModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const moduleItem = moduleData[slug as keyof typeof moduleData];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(5).fill(null)
  );
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (selectedAnswer !== null) {
      setAnswers((prev) => {
        const copy = [...prev];
        copy[currentQuestionIndex] = selectedAnswer;
        return copy;
      });
    }
  }, [selectedAnswer, currentQuestionIndex]);

  if (!moduleItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Materi Tidak Ditemukan</h1>
          <Link href="/education">
            <Button>Kembali ke Halaman Belajar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };
  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;
    if (currentQuestionIndex < moduleItem.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(answers[currentQuestionIndex - 1]);
    }
  };
  const handleSubmitQuiz = () => setQuizSubmitted(true);
  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers(new Array(5).fill(null));
    setQuizSubmitted(false);
  };

  const currentQuestion = moduleItem.quiz[currentQuestionIndex];
  const correctAnswersCount = quizSubmitted
    ? answers.filter(
        (answer, index) => answer === moduleItem.quiz[index]?.correct
      ).length
    : 0;
  const allQuestionsAnswered = answers.every((answer) => answer !== null);

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
          <div className="w-full h-64 relative rounded-lg overflow-hidden mb-6">
            <Image
              src={moduleItem.image || "/placeholder.svg"}
              alt={moduleItem.title}
              fill
              priority
              sizes="(max-width:768px) 100vw, (max-width:1200px) 800px, 1000px"
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Badge className="bg-primary/10 text-primary transition-colors duration-200">
              {moduleItem.level}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" /> {moduleItem.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />{" "}
              {moduleItem.students.toLocaleString()} views
            </div>
            <div className="flex items-center text-sm">
              <Star className="w-4 h-4 text-accent fill-accent mr-1" />{" "}
              {moduleItem.rating}
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">{moduleItem.title}</h1>
          <p className="text-lg text-muted-foreground">
            {moduleItem.description}
          </p>
        </div>
        <div className="space-y-6 mb-8">
          {moduleItem.content.map((section, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {section.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        {!quizSubmitted ? (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" /> Kuis
                  Mini - Pertanyaan {currentQuestionIndex + 1} dari{" "}
                  {moduleItem.quiz.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    ((currentQuestionIndex + 1) / moduleItem.quiz.length) * 100
                  )}
                  %
                </div>
              </CardTitle>
              <CardDescription>
                Jawab semua pertanyaan sebelum melihat hasil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4" key={currentQuestionIndex}>
                <h3 className="text-lg font-medium">
                  {currentQuestion.question}
                </h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                        selectedAnswer === optionIndex
                          ? "border-primary bg-primary/10"
                          : "border-border hover:bg-muted/50 hover:border-primary/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="quiz-answer"
                        value={optionIndex}
                        checked={selectedAnswer === optionIndex}
                        onChange={() => handleAnswerSelect(optionIndex)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-transparent"
                >
                  Sebelumnya
                </Button>
                <div className="flex gap-2">
                  {currentQuestionIndex < moduleItem.quiz.length - 1 ? (
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                    >
                      Selanjutnya <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmitQuiz}
                      disabled={!allQuestionsAnswered}
                    >
                      Submit Semua Jawaban
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex justify-center space-x-2 mt-4">
                {moduleItem.quiz.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      answers[index] !== null
                        ? "bg-primary scale-110"
                        : index === currentQuestionIndex
                        ? "bg-primary/50 scale-105"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="text-center p-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Kuis Selesai!</h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  {correctAnswersCount}/{moduleItem.quiz.length}
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  Skor Anda:{" "}
                  {Math.round(
                    (correctAnswersCount / moduleItem.quiz.length) * 100
                  )}
                  %
                </p>
                <Button
                  onClick={handleRetakeQuiz}
                  variant="outline"
                  className="bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Ulangi Kuis
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Review Jawaban</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {moduleItem.quiz.map((question, questionIndex) => (
                  <div key={questionIndex} className="space-y-3">
                    <h4 className="font-medium">
                      {questionIndex + 1}. {question.question}
                    </h4>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isCorrect = optionIndex === question.correct;
                        const isUserAnswer =
                          answers[questionIndex] === optionIndex;
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border transition-all duration-200 ${
                              isCorrect
                                ? "border-green-500 bg-green-50/50"
                                : isUserAnswer && !isCorrect
                                ? "border-red-500 bg-red-50/50"
                                : "border-border"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{option}</span>
                              <div className="flex items-center gap-2">
                                {isCorrect && (
                                  <span className="text-xs text-green-600 font-medium">
                                    Benar
                                  </span>
                                )}
                                {isUserAnswer && (
                                  <span className="text-xs text-muted-foreground">
                                    Jawaban Anda
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
