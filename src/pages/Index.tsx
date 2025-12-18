import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import VideoDemo from "@/components/landing/VideoDemo";
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

const Index = () => {
  useEffect(() => {
    // BotPenguin chatbot script
    const script = document.createElement("script");
    script.id = "messenger-widget-b";
    script.src = "https://cdn.botpenguin.com/website-bot.js";
    script.defer = true;
    script.dataset.botId = "67f56c6e7670c84c1abdf696";
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById("messenger-widget-b");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <VideoDemo />
      <Features />
      <HowItWorks />
      <Impact />
      <Sectors />
      <Pricing />
      <VideoTestimonials />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
