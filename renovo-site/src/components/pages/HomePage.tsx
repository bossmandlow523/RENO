import HeroSection from "@/components/hero/HeroSection";
import AcceptedScrapSection from "@/components/catalog/AcceptedScrapSection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Fixed background — persists behind all sections */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/darkshell.jpeg')",
          backgroundSize: "120%",
          backgroundPosition: "center right",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-[1]">
        <HeroSection />
        <AcceptedScrapSection />
      </div>
    </div>
  );
}
