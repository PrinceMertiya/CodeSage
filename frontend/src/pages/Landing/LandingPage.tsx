import Background from "../../components/landing/Background";
import Hero from "../../components/landing/Hero";
import Navbar from "../../components/landing/Navbar";
import Features from "../../components//landing/FeatureSection"
import ProductShowcase from "../../components/landing/ProductShowcase"
import HowItWork from "../../components/landing/HowItWorks"
import AiAssistant from "../../components/landing/AIAssistant"

import Architecture from "../../components/landing/ArchitectureSection"

import Pricing from "../../components/landing/Pricing"
import CTA from "../../components/landing/CTA"
import Footer from "../../components/landing/Footer"

import FAQ from "../../components/landing/FAQ"
export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05040D] text-white">

      <Background />

      <div className="relative z-10">

        <Navbar />

        <Hero />

        <Features />

        <ProductShowcase />

        <HowItWork />

        <AiAssistant />

        <Architecture />

        <Pricing />

        <FAQ />

        <CTA />

        <Footer />

      </div>

    </main>
  );
}