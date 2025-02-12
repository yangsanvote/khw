import HeroSection from '@/components/sections/HeroSection';
import CandidateSection from '@/components/sections/CandidateSection';
import ContactSection from '@/components/sections/ContactSection';
import DeclarationSection from "@/components/sections/DeclarationSection";

export default function Home() {
  return (
    <main className="relative snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      <HeroSection />
      <DeclarationSection />
      <CandidateSection />
      <ContactSection />
      {/* 
      아래 섹션들은 주석 처리
      <ProblemSection />
      <SolutionSection />
      <PromiseSection />
      <TimelineSection />
      */}
    </main>
  );
}