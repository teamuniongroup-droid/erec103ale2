import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import VideoPlayer from "@/components/VideoPlayer";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unlock = () => {
      if (containerRef.current) {
        containerRef.current.style.height = "auto";
        containerRef.current.style.overflow = "auto";
      }
    };

    // Check immediately and periodically if pricing is visible
    const check = () => {
      const el = document.querySelector(".esconder") as HTMLElement;
      if (el && window.getComputedStyle(el).display !== "none") {
        unlock();
        return true;
      }
      return false;
    };

    if (!check()) {
      const interval = setInterval(() => {
        if (check()) clearInterval(interval);
      }, 500);
      window.addEventListener("startPricingTimer", unlock);
      return () => {
        clearInterval(interval);
        window.removeEventListener("startPricingTimer", unlock);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="h-[100svh] flex flex-col bg-background overflow-y-auto">
      <Header />
      
      <main className="flex-1 flex flex-col items-center px-2 md:px-4 md:py-8 min-h-0">
        <VideoPlayer />
      </main>

      {/* Hidden sections that appear after video */}
      <div className="esconder" id="pricing-section">
        <PricingSection />
      </div>
    </div>
  );
};

export default Index;
