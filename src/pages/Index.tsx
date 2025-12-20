import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import VideoDemo from "@/components/landing/VideoDemo";
import BrandScroller from "@/components/landing/BrandScroller";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Impact from "@/components/landing/Impact";
import Sectors from "@/components/landing/Sectors";
import Pricing from "@/components/landing/Pricing";
import VideoTestimonials from "@/components/landing/VideoTestimonials";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import ContactForm from "@/components/landing/ContactForm";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import { useEffect } from "react";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { isVisible, loading } = useSectionVisibility();

  useEffect(() => {
    // BotPenguin chatbot - using exact script from user
    const existingBotScript = document.getElementById("messenger-widget-b");
    if (!existingBotScript) {
      const script = document.createElement("script");
      script.id = "messenger-widget-b";
      script.src = "https://cdn.botpenguin.com/website-bot.js";
      script.defer = true;
      script.textContent = "69434a7bbdb6af04d6637bc0,69433bdd43ae703cb75f6f6b";
      document.body.appendChild(script);
    }

    return () => {
      // Cleanup on unmount
    };
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Header />
      {isVisible('Hero') && <Hero />}
      {isVisible('VideoDemo') && <VideoDemo />}
      {isVisible('BrandScroller') && <BrandScroller />}
      {isVisible('Features') && <Features />}
      {isVisible('HowItWorks') && <HowItWorks />}
      {isVisible('Impact') && <Impact />}
      {isVisible('Sectors') && <Sectors />}
      {isVisible('Pricing') && <Pricing />}
      {isVisible('VideoTestimonials') && <VideoTestimonials />}
      {isVisible('Testimonials') && <Testimonials />}
      {isVisible('FAQ') && <FAQ />}
      {isVisible('ContactForm') && <ContactForm />}
      {isVisible('CTA') && <CTA />}
      <Footer />
    </main>
  );
};

export default Index;
