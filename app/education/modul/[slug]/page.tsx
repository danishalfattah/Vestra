"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import Link from "next/link";
import Image from "next/image";
import { getArticleBySlug } from "@/lib/articles";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  Eye,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ArticleModulePage() {
  const params = useParams();
  const slug = params.slug as string;
  const moduleItem = getArticleBySlug(slug);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(moduleItem?.quiz?.length || 0).fill(null)
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

  if (!moduleItem || moduleItem.type !== "article") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Modul Tidak Ditemukan</h1>
          <Link href="/education">
            <Button>Kembali ke Halaman Belajar</Button>
          </Link>
        </div>
      </div>
    );
  }

  const hasQuiz = !!moduleItem.quiz && moduleItem.quiz.length > 0;
  const currentQuestion = hasQuiz
    ? moduleItem.quiz![currentQuestionIndex]
    : null;
  const correctAnswersCount =
    hasQuiz && quizSubmitted
      ? answers.filter(
          (answer, index) => answer === moduleItem.quiz![index]?.correct
        ).length
      : 0;
  const allQuestionsAnswered = hasQuiz
    ? answers.every((a) => a !== null)
    : false;

  const handleAnswerSelect = (idx: number) => setSelectedAnswer(idx);
  const handleNextQuestion = () => {
    if (!hasQuiz || selectedAnswer === null) return;
    if (currentQuestionIndex < moduleItem.quiz!.length - 1) {
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
    setAnswers(new Array(moduleItem?.quiz?.length || 0).fill(null));
    setQuizSubmitted(false);
  };

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
            <Badge className="bg-primary/10 text-primary capitalize">
              {moduleItem.category}
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" /> {moduleItem.duration}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="w-4 h-4 mr-1" />{" "}
              {moduleItem.students.toLocaleString()} views
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">{moduleItem.title}</h1>
          <p className="text-lg text-muted-foreground">
            {moduleItem.description}
          </p>
        </div>

        {moduleItem.content && (
          <div className="space-y-6 mb-8">
            {moduleItem.content.map((section, index) => (
              <Card key={index} className="bg-card border-border py-6 ">
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
        )}

        {hasQuiz && !quizSubmitted && currentQuestion && (
          <Card className="bg-primary/5 border-primary/20 pt-6">
            <CardHeader>
              <CardTitle className="text-xl flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-primary" /> Kuis
                  Mini - Pertanyaan {currentQuestionIndex + 1} dari{" "}
                  {moduleItem.quiz!.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {Math.round(
                    ((currentQuestionIndex + 1) / moduleItem.quiz!.length) * 100
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
                  {currentQuestionIndex < moduleItem.quiz!.length - 1 ? (
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
                {moduleItem.quiz!.map((_, index) => (
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
        )}

        {hasQuiz && quizSubmitted && (
          <div className="space-y-6">
            <Card className="bg-primary/5 border-primary/20 pt-6">
              <CardContent className="text-center p-8">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-2">Kuis Selesai!</h3>
                <div className="text-3xl font-bold text-primary mb-2">
                  {correctAnswersCount}/{moduleItem.quiz!.length}
                </div>
                <p className="text-lg text-muted-foreground mb-4">
                  Skor Anda:{" "}
                  {Math.round(
                    (correctAnswersCount / moduleItem.quiz!.length) * 100
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
            <Card className="pt-6">
              <CardHeader>
                <CardTitle>Review Jawaban</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {moduleItem.quiz!.map((question, questionIndex) => (
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
                                ? "border-green-500 bg-primary/10"
                                : isUserAnswer && !isCorrect
                                ? "border-red-500 bg-primary/10"
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
