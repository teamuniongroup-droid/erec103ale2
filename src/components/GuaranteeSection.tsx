import guaranteeBadge from "@/assets/guarantee-badge.png";

const GuaranteeSection = () => {
  return (
    <section className="py-8 px-3 md:py-16 md:px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-1 md:mb-2 leading-tight">
            100% Zufriedenheit oder Geld zurück
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-primary">
            180-Tage Bedingungslose Garantie
          </h3>
        </div>

        <div className="flex flex-col items-center gap-4 md:gap-8 md:flex-row">
          <div className="flex-shrink-0">
            <img 
              src={guaranteeBadge} 
              alt="100% Geld-zurück-Garantie" 
              className="w-28 h-28 md:w-40 md:h-40 object-contain"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm md:text-base text-slate-600 mb-3 md:mb-4 leading-relaxed">
              Wir sind so überzeugt, dass ErecPro Ihnen bemerkenswerte Ergebnisse liefern wird, dass wir bereit sind, das gesamte Risiko für volle 180 Tage zu übernehmen. Beginnen Sie ab dem Moment, in dem Ihre Bestellung eintrifft, ErecPro täglich einzunehmen und achten Sie genau darauf, wie Sie sich fühlen.
            </p>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Wenn Sie zu irgendeinem Zeitpunkt während dieser 180 Tage das Gefühl haben, dass ErecPro nicht das liefert, was wir versprochen haben, lassen Sie es uns einfach wissen. Unser Team wird jeden Cent zurückerstatten, ohne Fragen zu stellen.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
