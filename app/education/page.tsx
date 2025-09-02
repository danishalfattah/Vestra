import { Metadata } from "next";
import { Footer } from "../../components/footer";
import { Navigation } from "../../components/navigation";
import EducationPageWrapper from "./education-client";

export const metadata: Metadata = {
  title: "Edukasi Finansial – Modul & Tools",
  description:
    "Jelajahi modul belajar finansial, video, dan kalkulator interaktif untuk mempercepat pemahaman keuangan pribadi Anda.",
};

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <EducationPageWrapper />
      </main>
      <Footer />
    </div>
  );
}
