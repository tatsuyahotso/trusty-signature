import About from "@/sections/About";
import CookieConsent from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollAnimations from "@/components/ScrollAnimations";
import Features from "@/sections/Features";
import Hero from "@/sections/Hero";
import HowItWorks from "@/sections/HowItWorks";
import Networks from "@/sections/Networks";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-[#0b1229]">
      <Header />
      <Hero />
      <Networks />
      <Features />
      <HowItWorks />
      <About />
      <Footer />
      <CookieConsent />
      <ScrollAnimations />
    </div>
  );
}
