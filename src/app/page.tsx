import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import PromiseSection from '@/components/sections/PromiseSection';
import TimelineSection from '@/components/sections/TimelineSection';
import CandidateSection from '@/components/sections/CandidateSection';
import ContactSection from '@/components/sections/ContactSection';

export default function Home() {
  return (
    <main className="relative snap-y snap-mandatory h-screen overflow-y-scroll overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <PromiseSection />
      <TimelineSection />
      <CandidateSection />
      <ContactSection />
    </main>
  );
}