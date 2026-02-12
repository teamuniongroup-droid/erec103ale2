import { Bell, Eye } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

const VideoPlayer = () => {
  const [viewerCount, setViewerCount] = useState(693);
  const [containerMaxWidth, setContainerMaxWidth] = useState<string>("100%");
  const reachedMax = useRef(false);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const hashtagsRef = useRef<HTMLDivElement>(null);

  const calculateSize = useCallback(() => {
    const vh = window.innerHeight;

    // Measure actual element heights
    const headerEl = document.querySelector("header");
    const headerH = headerEl ? headerEl.getBoundingClientRect().height : 0;
    const topBarH = topBarRef.current ? topBarRef.current.getBoundingClientRect().height : 0;
    const bottomBarH = bottomBarRef.current ? bottomBarRef.current.getBoundingClientRect().height : 0;
    const hashtagsH = hashtagsRef.current ? hashtagsRef.current.getBoundingClientRect().height : 0;

    // Available height for the video = viewport - all other elements - small margin
    const reserved = headerH + topBarH + bottomBarH + hashtagsH + 16;
    const availableHeight = vh - reserved;

    // Video is 9:16, so width = height * 9/16
    const maxW = availableHeight * (9 / 16);
    const screenW = window.innerWidth - 16;
    setContainerMaxWidth(`${Math.min(maxW, screenW)}px`);
  }, []);

  useEffect(() => {
    // Wait a frame for elements to render before measuring
    requestAnimationFrame(() => calculateSize());
    window.addEventListener("resize", calculateSize);
    return () => window.removeEventListener("resize", calculateSize);
  }, [calculateSize]);

  useEffect(() => {
    let target = 693;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      setViewerCount(prev => {
        if (!reachedMax.current) {
          // Advance target toward 2607
          const targetStep = Math.floor(Math.random() * 5) + 2;
          target = Math.min(2938, target + targetStep);

          // Occasionally dip to simulate people leaving (10% chance, small dips)
          if (Math.random() < 0.10 && prev > 700) {
            const dip = Math.floor(Math.random() * 3) + 1;
            return Math.max(693, prev - dip);
          }

          // Move toward target
          if (prev < target) {
            return prev + 1;
          }

          if (target >= 2938) {
            reachedMax.current = true;
          }
          return prev;
        }

        // Stable phase: vary between 2607-2841
        const change = Math.random() < 0.5 ? 1 : -1;
        return Math.max(2938, Math.min(3422, prev + change));
      });

      const roll = Math.random();
      let delay: number;
      if (roll < 0.08) {
        delay = 800 + Math.random() * 1700;
      } else if (roll < 0.3) {
        delay = 30 + Math.random() * 60;
      } else {
        delay = 80 + Math.random() * 150;
      }
      timeout = setTimeout(tick, delay);
    };

    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);



  useEffect(() => {
    // Add the esconder style
    const style = document.createElement("style");
    style.textContent = `.esconder { display: none; }`;
    document.head.appendChild(style);

    // Setup MutationObserver to detect when .esconder becomes visible
    const setupObserver = () => {
      const esconderSection = document.querySelector(".esconder");
      if (!esconderSection) return;

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === "attributes" && mutation.attributeName === "style") {
            const element = mutation.target as HTMLElement;
            const computedStyle = window.getComputedStyle(element);
            
            if (computedStyle.display !== "none") {
              console.log("Esconder section is now visible - triggering scroll");
              
              // Dispatch custom event to start the pricing timer
              window.dispatchEvent(new CustomEvent("startPricingTimer"));
              
              // Scroll to pricing section after a brief delay for layout
              setTimeout(() => {
                const pricingSection = document.getElementById("pricing-section");
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }, 300);
              
              // Disconnect observer after triggering
              observer.disconnect();
            }
          }
        });
      });

      observer.observe(esconderSection, { attributes: true, attributeFilter: ["style"] });
    };

    // Load the vturb player script
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/d0d64cb2-dca3-4be6-983c-3bc700b6a1d8/players/697e5754dc35879192707434/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    // Add the reveal script after player loads
    script.onload = () => {
      const revealScript = document.createElement("script");
      revealScript.textContent = `
        var delaySeconds = 1896;
        var player = document.querySelector("vturb-smartplayer");
        
        if (player) {
          player.addEventListener("player:ready", function() {
            player.displayHiddenElements(delaySeconds, [".esconder"], {
              persist: true
            });
          });
        }
      `;
      document.body.appendChild(revealScript);
      
      // Setup observer after script loads
      setTimeout(setupObserver, 500);
    };

    return () => {
      style.remove();
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div className="mx-auto px-2 md:px-0 mt-2 md:mt-0 md:max-w-4xl" style={{ maxWidth: containerMaxWidth }}>
        <div className="video-container-wrapper w-full mx-auto">
          {/* Top bar */}
          <div ref={topBarRef} className="flex items-center justify-between px-2 py-1.5 md:px-4 md:py-2.5 bg-primary">
            <div className="flex items-center gap-1 md:gap-2 text-primary-foreground">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-wide">Exklusiv</span>
            </div>
            <span className="px-2 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold rounded bg-cnn-dark text-foreground uppercase tracking-wider">
              Jetzt Ansehen
            </span>
          </div>

          {/* Video Player */}
          <div 
            dangerouslySetInnerHTML={{
              __html: `<vturb-smartplayer id="vid-697e5754dc35879192707434" style="display: block; margin: 0 auto; width: 100%; max-width: 100%;"></vturb-smartplayer>`
            }}
          />

          {/* Bottom bar */}
          <div ref={bottomBarRef} className="flex items-center justify-center px-2 py-2 md:px-4 md:py-3 bg-cnn-dark-secondary border-t border-border">
            <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold tracking-wider text-primary">
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" />
              <span className="text-green-500">{viewerCount}</span>
              <span className="text-muted-foreground font-medium text-[10px] md:text-xs">Personen sehen gerade zu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hashtags section - full width */}
      <div ref={hashtagsRef} id="hashtags-section" className="mt-2 md:mt-8 text-center px-2">
        <div className="flex items-center justify-center gap-1.5 text-muted-foreground mb-2 md:mb-5">
          <Bell className="w-3 h-3 md:w-4 md:h-4" />
          <p className="text-[10px] md:text-sm">Bleiben Sie informiert mit BBC's investigativer Berichterstattung</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3">
          <span className="hashtag-pill text-[10px] md:text-sm px-2 py-0.5 md:px-4 md:py-2">#Erektionsstörung</span>
          <span className="hashtag-pill text-[10px] md:text-sm px-2 py-0.5 md:px-4 md:py-2">#NatürlicheHeilmittel</span>
          <span className="hashtag-pill text-[10px] md:text-sm px-2 py-0.5 md:px-4 md:py-2">#BBCExklusiv</span>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
