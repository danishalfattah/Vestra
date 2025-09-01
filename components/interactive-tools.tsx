"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, PiggyBank, TrendingUp } from "lucide-react";

const formatRupiah = (value: string) => {
  const number = value.replace(/\D/g, "");
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseRupiah = (value: string) => {
  return Number.parseFloat(value.replace(/\./g, "")) || 0;
};

export function InteractiveTools() {
  const [activeCalculator, setActiveCalculator] = useState("budget");
  const [budgetIncome, setBudgetIncome] = useState("");
  const [budgetExpenses, setBudgetExpenses] = useState("");
  const [savingsAmount, setSavingsAmount] = useState("");
  const [savingsMonths, setSavingsMonths] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [investmentRate, setInvestmentRate] = useState("");
  const [investmentYears, setInvestmentYears] = useState("");

  const calculateSavings = () => {
    const amount = parseRupiah(savingsAmount);
    const months = Number.parseFloat(savingsMonths) || 0;
    return amount * months;
  };

  const calculateInvestment = () => {
    const principal = parseRupiah(investmentAmount);
    const rate = (Number.parseFloat(investmentRate) || 0) / 100;
    const years = Number.parseFloat(investmentYears) || 0;
    return principal * Math.pow(1 + rate, years);
  };

  const handleRupiahChange = (
    value: string,
    setter: (value: string) => void
  ) => {
    const formatted = formatRupiah(value);
    setter(formatted);
  };

  const calculators = [
    {
      id: "budget",
      icon: Calculator,
      title: "Kalkulator Anggaran",
      subtitle: "Metode 50/30/20",
      color: "bg-primary",
    },
    {
      id: "investment",
      icon: TrendingUp,
      title: "Kalkulator Investasi",
      subtitle: "Simulasi Compound Interest",
      color: "bg-primary",
    },
    {
      id: "emergency",
      icon: PiggyBank,
      title: "Kalkulator Dana Darurat",
      subtitle: "Target dana darurat",
      color: "bg-primary",
    },
  ];

  const renderCalculatorContent = () => {
    switch (activeCalculator) {
      case "budget":
        const income = parseRupiah(budgetIncome);
        const needs = Math.round(income * 0.5);
        const wants = Math.round(income * 0.3);
        const savings = Math.round(income * 0.2);

        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Kalkulator Anggaran (Metode 50/30/20)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="income" className="text-sm font-medium">
                    Total Pemasukan Bulanan
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                      Rp
                    </span>
                    <Input
                      id="income"
                      type="text"
                      placeholder="5.000.000"
                      value={budgetIncome}
                      onChange={(e) =>
                        handleRupiahChange(e.target.value, setBudgetIncome)
                      }
                      className="pl-8 h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="expenses" className="text-sm font-medium">
                    Pengeluaran Wajib Bulanan
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                      Rp
                    </span>
                    <Input
                      id="expenses"
                      type="text"
                      placeholder="1.500.000"
                      value={budgetExpenses}
                      onChange={(e) =>
                        handleRupiahChange(e.target.value, setBudgetExpenses)
                      }
                      className="pl-8 h-12"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Alokasi Anggaran Anda
              </h3>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-primary/10 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Kebutuhan (50%)
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    Rp {needs.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Keinginan (30%)
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    Rp {wants.toLocaleString("id-ID")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">
                    Tabungan/Investasi (20%)
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    Rp {savings.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "investment":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Kalkulator Investasi</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <Label
                    htmlFor="investment-amount"
                    className="text-sm font-medium"
                  >
                    Jumlah Awal
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                      Rp
                    </span>
                    <Input
                      id="investment-amount"
                      type="text"
                      placeholder="10.000.000"
                      value={investmentAmount}
                      onChange={(e) =>
                        handleRupiahChange(e.target.value, setInvestmentAmount)
                      }
                      className="pl-8 h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="investment-rate"
                    className="text-sm font-medium"
                  >
                    Return Tahunan (%)
                  </Label>
                  <Input
                    id="investment-rate"
                    type="number"
                    placeholder="7"
                    value={investmentRate}
                    onChange={(e) => setInvestmentRate(e.target.value)}
                    className="h-12 mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="investment-years"
                    className="text-sm font-medium"
                  >
                    Tahun
                  </Label>
                  <Input
                    id="investment-years"
                    type="number"
                    placeholder="10"
                    value={investmentYears}
                    onChange={(e) => setInvestmentYears(e.target.value)}
                    className="h-12 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary break-words">
                  Rp {calculateInvestment().toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Nilai Masa Depan
                </div>
              </div>
            </div>
          </div>
        );

      case "emergency":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Kalkulator Dana Darurat
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label
                    htmlFor="savings-amount"
                    className="text-sm font-medium"
                  >
                    Tabungan Bulanan
                  </Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
                      Rp
                    </span>
                    <Input
                      id="savings-amount"
                      type="text"
                      placeholder="500.000"
                      value={savingsAmount}
                      onChange={(e) =>
                        handleRupiahChange(e.target.value, setSavingsAmount)
                      }
                      className="pl-8 h-12"
                    />
                  </div>
                </div>
                <div>
                  <Label
                    htmlFor="savings-months"
                    className="text-sm font-medium"
                  >
                    Periode Waktu (Bulan)
                  </Label>
                  <Input
                    id="savings-months"
                    type="number"
                    placeholder="12"
                    value={savingsMonths}
                    onChange={(e) => setSavingsMonths(e.target.value)}
                    className="h-12 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary break-words">
                  Rp {calculateSavings().toLocaleString("id-ID")}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Total Target Dana Darurat
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-balance">
            Alat Keuangan <span className="text-primary">Interaktif</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Berlatih dengan kalkulator dan alat nyata untuk menerapkan apa yang
            telah Anda pelajari dan membuat keputusan keuangan yang tepat.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {calculators.map((calc) => (
                <Card
                  key={calc.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    activeCalculator === calc.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setActiveCalculator(calc.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-12 h-12 ${calc.color} rounded-lg flex items-center justify-center`}
                      >
                        <calc.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">{calc.title}</h3>
                        <p className="text-xs text-muted-foreground">
                          {calc.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                {renderCalculatorContent()}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
