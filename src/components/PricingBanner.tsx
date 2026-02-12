import { useState, useEffect, useRef } from "react";
import { Package } from "lucide-react";

export const PricingBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 10, seconds: 0 });
  const [timerExpired, setTimerExpired] = useState(false);
  const [bottlesRemaining, setBottlesRemaining] = useState(120);
  const [isActive, setIsActive] = useState(false);
  const secondsElapsedRef = useRef(0);
  const nextDecreaseAtRef = useRef(0);

  // Listen for the custom event to start the timer
  useEffect(() => {
    const handleStartTimer = () => {
      console.log("Starting pricing timer and bottle counter");
      setIsActive(true);
    };

    window.addEventListener("startPricingTimer", handleStartTimer);
    return () => window.removeEventListener("startPricingTimer", handleStartTimer);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const getNextDecreaseDelay = () => {
      const progress = secondsElapsedRef.current / 600;
      const minDelay = 3 + progress * 17;
      const maxDelay = 6 + progress * 29;
      return Math.floor(Math.random() * (maxDelay - minDelay)) + minDelay;
    };

    nextDecreaseAtRef.current = getNextDecreaseDelay();

    const timer = setInterval(() => {
      if (timerExpired) {
        clearInterval(timer);
        return;
      }

      secondsElapsedRef.current += 1;

      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        setTimerExpired(true);
        return { minutes: 0, seconds: 0 };
      });

      nextDecreaseAtRef.current -= 1;

      if (nextDecreaseAtRef.current <= 0) {
        const decrements = [2, 3, 6];
        const randomDecrement = decrements[Math.floor(Math.random() * decrements.length)];

        setBottlesRemaining((prev) => {
          const newValue = prev - randomDecrement;
          return newValue >= 8 ? newValue : prev;
        });

        nextDecreaseAtRef.current = getNextDecreaseDelay();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timerExpired]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div id="pricing-section" className="bg-gradient-to-b from-[#0d1b2a] to-[#1a2744] rounded-lg md:rounded-xl py-4 px-3 md:py-8 md:px-6 mb-6 md:mb-10 text-center border border-border">
      <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1 md:mb-2 leading-tight">
        Wählen Sie Ihr vergünstigtes ErecPro Paket
      </h2>
      <p className="text-sm md:text-lg text-[#FCD34D] font-semibold mb-2 md:mb-4">
        Mit unserem speziellen zeitlich begrenzten Angebot!
      </p>
      <p className="text-xs md:text-base text-white mb-3 md:mb-4">Nur bis <span className="font-bold">{formattedDate}</span></p>

      {timerExpired ? (
        <p className="text-base md:text-xl lg:text-2xl font-bold text-[#FCD34D] animate-pulse">
          Dies ist Ihre letzte Chance – nur noch wenige Einheiten verfügbar
        </p>
      ) : (
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-3 md:mb-4">
          <div className="text-white text-3xl md:text-5xl font-bold">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <span className="text-white text-2xl md:text-4xl font-bold">:</span>
          <div className="text-white text-3xl md:text-5xl font-bold">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-xs md:text-sm">
        <span className="flex items-center gap-1.5 md:gap-2 text-white">
          <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-[#4ADE80] shadow-[0_0_8px_3px_rgba(74,222,128,0.6)]"></span>
          </span>
          Verkaufsstatus: <span className="font-bold text-[#4ADE80]">Aktiv</span>
        </span>
        <span className="flex items-center gap-1.5 md:gap-2 text-white">
          <Package className="w-4 h-4 md:w-5 md:h-5 text-[#FCD34D]" />
          Flaschen übrig: <span className="font-bold text-[#FCD34D]">{bottlesRemaining}</span>
        </span>
      </div>
    </div>
  );
};

export default PricingBanner;
