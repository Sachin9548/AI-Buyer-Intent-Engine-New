import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { Problem } from "@/components/landing/Problem";
import { Comparison } from "@/components/landing/Comparison";
import { Pillars } from "@/components/landing/Pillars";
import { Dashboard } from "@/components/landing/Dashboard";
import { AIAssistant } from "@/components/landing/AIAssistant";
import { Bento } from "@/components/landing/Bento";
import { Stats } from "@/components/landing/Stats";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />       
      <Hero />
      <ScrollStory />
      <Problem />
      <Comparison />
      <Pillars />
      <Dashboard />
      <AIAssistant />
      <Bento />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer /> 
    </main>
  );
};

export default Index;
