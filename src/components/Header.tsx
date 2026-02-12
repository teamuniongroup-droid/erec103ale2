import { Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full bg-cnn-dark border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-3 py-2 md:px-4 md:py-3 flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="text-foreground hover:text-primary transition-colors md:hidden">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-base md:text-xl font-bold text-primary">
            BBC Gesundheit
          </h1>
        </div>

        {/* Center navigation - hidden on mobile */}
        <nav className="hidden lg:flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Wohlbefinden
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Ernährung
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Fitness
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Medizin
          </a>
        </nav>

        {/* Right section */}
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]"></span>
            </span>
            <span className="text-xs md:text-sm text-primary font-medium">
              Live TV
            </span>
          </div>
          <button className="px-2 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium rounded-full border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors">
            Anmelden
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
