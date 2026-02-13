import { motion } from "framer-motion";
import { Lock, Truck } from "lucide-react";
import bottlesSix from "@/assets/bottles-six.webp";
import bottlesThree from "@/assets/bottles-three.webp";
import bottlesTwo from "@/assets/bottles-two.webp";
import guaranteeBadge from "@/assets/guarantee-badge.png";
import paymentCards from "@/assets/payment-cards.png";


interface PackageProps {
  title: string;
  bottles: number;
  supply: string;
  originalPrice: number;
  salePrice: number;
  perBottle: number;
  originalPerBottle: number;
  savings: string;
  discount: string;
  features: string[];
  isBestValue?: boolean;
  isGoodValue?: boolean;
  hasShipping?: boolean;
  shippingCost?: string;
  image: string;
  hasSurprise?: boolean;
  checkoutUrl: string;
  mobileOrder?: string;
}

const PackageCard = ({
  bottles,
  supply,
  originalPrice,
  salePrice,
  perBottle,
  savings,
  isBestValue,
  hasShipping,
  shippingCost,
  image,
  hasSurprise,
  checkoutUrl,
  mobileOrder,
}: PackageProps) => {
  const getCardBackground = () => {
    if (isBestValue) return "bg-gradient-to-b from-[#1e3a5f] to-[#0f1f33]";
    return "bg-white";
  };

  const isLight = !isBestValue;
  const textColor = isLight ? "text-gray-900" : "text-white";
  const subTextColor = isLight ? "text-gray-600" : "text-gray-200";

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toLocaleDateString('de-DE', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  return (
    <a href={checkoutUrl} className={`block ${mobileOrder || ""}`}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl overflow-hidden cursor-pointer ${isBestValue ? "border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]" : "border border-slate-300 md:border-none shadow-[0_4px_20px_rgba(0,0,0,0.5)]"}`}
    >
      {isBestValue && (
        <div className="bg-primary py-2.5 px-4 text-center">
          <span className="text-yellow-300 font-bold text-sm uppercase tracking-wider">
            KOMPLETTES KIT FÜR MAXIMALE LEISTUNG
          </span>
        </div>
      )}

      <div className={`${getCardBackground()} p-5 md:p-6`}>
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Top row: title + price */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-center">
              <h3 className={`text-2xl font-extrabold ${textColor}`}>
                {bottles} FLASCHEN
              </h3>
              <p className={`text-sm uppercase ${subTextColor}`}>{supply}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`text-5xl font-extrabold leading-none ${isBestValue ? "text-gold" : textColor}`}>
                €{perBottle}
              </span>
              <span className={`text-sm font-bold uppercase leading-tight ${subTextColor}`}>PRO<br />FLASCHE</span>
            </div>
          </div>

          {/* Image + details row */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-[42%] flex-shrink-0 ${isBestValue ? "h-[170px]" : "h-[140px]"} flex items-center justify-center`}>
              <img src={image} alt={`${bottles} Flaschen`} className="max-w-full max-h-full object-contain" />
            </div>
            <div className="flex-1 flex flex-col items-center space-y-3">
              <div className="relative inline-flex items-center justify-center">
                <span className="relative z-10 text-base font-bold text-green-500 px-2">
                  SIE SPAREN {savings}!
                </span>
                <svg className="absolute pointer-events-none" style={{ width: 'calc(100% + 16px)', height: 'calc(100% + 12px)', left: '-8px', top: '-6px' }} viewBox="0 0 120 44" preserveAspectRatio="none">
                  <ellipse cx="60" cy="22" rx="56" ry="19" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="300" strokeLinecap="round" className="animate-pencil-circle" />
                </svg>
              </div>

              <div className="flex items-center gap-2 w-full">
                <span className={`flex-1 h-[1px] ${isLight ? "bg-gray-300" : "bg-gray-500"}`}></span>
                <img src={guaranteeBadge} alt="Garantie" className="w-9 h-9 object-contain" />
                <span className={`text-xs font-bold leading-tight uppercase ${textColor}`}>
                  GELD-ZURÜCK<br />GARANTIE
                </span>
                <span className={`flex-1 h-[1px] ${isLight ? "bg-gray-300" : "bg-gray-500"}`}></span>
              </div>

              <div className="text-center">
                <p className={`text-base font-bold ${textColor}`}>
                  Gesamt: <span className="line-through text-red-500 decoration-red-500 text-sm">€{originalPrice}</span>{" "}
                  <span className="text-green-500 text-lg font-extrabold">€{salePrice}</span>
                </p>
                {hasShipping ? (
                  <p className={`text-sm font-semibold ${subTextColor}`}>+ €{shippingCost} VERSAND</p>
                ) : (
                  <p className="text-sm text-yellow-400 font-bold">+ KOSTENLOSER VERSAND</p>
                )}
              </div>

              {hasSurprise && <p className={`text-base font-bold ${textColor}`}>+ÜBERRASCHUNG 🎁</p>}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="text-center mb-3">
            <h3 className={`text-2xl font-extrabold ${textColor}`}>
              {bottles} FLASCHEN
            </h3>
            <p className={`text-sm uppercase ${subTextColor}`}>{supply}</p>
          </div>

          <div className="h-44 mb-4 flex items-center justify-center">
            <img src={image} alt={`${bottles} Flaschen`} className="max-h-full object-contain" />
          </div>

          <div className="text-center mb-3">
            <div className="flex items-baseline justify-center gap-1.5">
              <span className={`text-5xl font-extrabold ${isBestValue ? "text-gold animate-glow-pulse" : textColor}`}>
                €{perBottle}
              </span>
              <span className={`text-sm ${subTextColor}`}>PRO<br />FLASCHE</span>
            </div>
          </div>

          <div className="flex justify-center mb-3">
            <div className="relative inline-block">
              <span className="text-sm font-bold text-green-500">
                SIE SPAREN {savings}!
              </span>
              <svg className="absolute pointer-events-none" style={{ width: 'calc(100% + 12px)', height: 'calc(100% + 8px)', left: '-6px', top: '-4px' }} viewBox="0 0 100 40" preserveAspectRatio="none">
                <ellipse cx="50" cy="20" rx="48" ry="18" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="300" strokeLinecap="round" className="animate-pencil-circle" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={guaranteeBadge} alt="Garantie" className="w-10 h-10 object-contain" />
            <span className={`text-xs font-semibold leading-tight ${textColor}`}>
              GELD-ZURÜCK<br />GARANTIE
            </span>
          </div>

          <div className="text-center mb-3">
            <p className={`text-sm font-bold ${textColor}`}>
              Gesamt: <span className="line-through text-red-500 decoration-red-500 text-xs">€{originalPrice}</span>{" "}
              <span className="text-green-500 text-lg font-extrabold">€{salePrice}</span>
            </p>
            {hasShipping ? (
              <p className={`text-xs ${subTextColor}`}>+ €{shippingCost} VERSAND</p>
            ) : (
              <p className="text-xs text-yellow-400 font-semibold">+ KOSTENLOSER VERSAND</p>
            )}
          </div>

          {hasSurprise ? <p className={`text-sm font-semibold ${textColor} text-center mb-3`}>+ÜBERRASCHUNG 🎁</p> : <div className="mb-3 h-5"></div>}
        </div>

        {/* Delivery + CTA (shared) */}
        <div className="flex items-center justify-center gap-1.5 mb-3">
          <Truck className={`w-4 h-4 ${isBestValue ? "text-cyan-400" : "text-blue-600"}`} />
          <span className={`text-xs font-bold ${subTextColor}`}>
            Bestellen & erhalten bis <span className="underline font-semibold text-red-500">{getDeliveryDate()}</span>!
          </span>
        </div>

        <a
          href={checkoutUrl}
          className={isBestValue ? "buy-button-green" : "buy-button-blue"}
        >
          IN DEN WARENKORB
        </a>

        <div className="flex items-center justify-center gap-1.5 mt-3">
          <Lock className={`w-3.5 h-3.5 ${isLight ? "text-gray-500" : "text-white"}`} />
          <span className={`text-xs font-bold ${isLight ? "text-gray-500" : "text-gray-300"}`}>Sicherer Checkout</span>
        </div>

        <div className="flex justify-center mt-3">
          <img src={paymentCards} alt="Visa, Mastercard, Discover, American Express" className="h-6 md:h-7 object-contain" />
        </div>
      </div>

      <style>{`
        @keyframes pencilCircle {
          0% { stroke-dashoffset: 300; opacity: 1; }
          25% { stroke-dashoffset: 0; opacity: 1; }
          75% { stroke-dashoffset: 0; opacity: 1; }
          90% { stroke-dashoffset: 0; opacity: 0; }
          100% { stroke-dashoffset: 300; opacity: 0; }
        }
        .animate-pencil-circle { animation: pencilCircle 5s ease-in-out infinite; }
      `}</style>
    </motion.div>
    </a>
  );
};

const PricingSection = () => {
  const packages: PackageProps[] = [
    {
      title: "Zum Testen", bottles: 2, supply: "60-Tage-Vorrat", originalPrice: 198, salePrice: 178,
      perBottle: 89, originalPerBottle: 98, savings: "€20", discount: "10%", features: [],
      hasShipping: true, shippingCost: "20,00", image: bottlesTwo,
      checkoutUrl: "https://www.checkout-ds24.com/product/638004/?aff=uniongroup&cam=bic",
      mobileOrder: "order-3 md:order-1",
    },
    {
      title: "Bester Wert", bottles: 6, supply: "180-Tage-Vorrat", originalPrice: 588, salePrice: 294,
      perBottle: 49, originalPerBottle: 98, savings: "€294", discount: "50%",
      features: ["3 GRATIS FLASCHEN"], isBestValue: true, hasSurprise: true, image: bottlesSix,
      checkoutUrl: "https://www.checkout-ds24.com/product/638002/?aff=uniongroup&cam=bic",
      mobileOrder: "order-1 md:order-2",
    },
    {
      title: "Guter Wert", bottles: 3, supply: "90-Tage-Vorrat", originalPrice: 297, salePrice: 177,
      perBottle: 59, originalPerBottle: 98, savings: "€120", discount: "40%",
      features: ["1 GRATIS FLASCHE"], isGoodValue: true, image: bottlesThree,
      checkoutUrl: "https://www.checkout-ds24.com/product/638001/?aff=uniongroup&cam=bic",
      mobileOrder: "order-2 md:order-3",
    },
  ];

  return (
    <section className="pt-4 pb-8 md:pt-6 md:pb-16 px-3 md:px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {packages.map((pkg, index) => (
            <PackageCard key={index} {...pkg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
