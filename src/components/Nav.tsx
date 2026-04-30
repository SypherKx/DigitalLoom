import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container">
        <nav
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "neu-surface backdrop-blur-xl bg-card/80" : ""
          }`}
        >
          <a href="#" className="flex items-center gap-2 md:gap-3 group">
            <LoomMark />
            <span className="font-display font-bold tracking-tight text-sm md:text-base hidden sm:block">
              The Digital Loom
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest text-muted-foreground">
            <a href="#protocol" className="hover:text-foreground transition-colors">PROTOCOL</a>
            <a href="#materials" className="hover:text-foreground transition-colors">MATERIALS</a>
            <a href="#docs" className="hover:text-foreground transition-colors">DOCS</a>
          </div>

          <button className="hero-btn-secondary rounded-lg md:rounded-xl px-3 py-2 md:px-4 md:py-2 font-mono text-[10px] md:text-xs tracking-widest text-foreground">
            REQUEST_ACCESS
          </button>
        </nav>
      </div>
    </header>
  );
}

function LoomMark() {
  return (
    <div className="relative w-9 h-9 rounded-xl neu-surface flex items-center justify-center overflow-hidden group-hover:shadow-kinetic transition-shadow duration-500">
      <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
        {/* Vertical stem — Physical block */}
        <rect x="8" y="6" width="5" height="20" fill="hsl(var(--aluminum))" />
        {/* Curve — fluid generative mesh */}
        <path
          d="M13 6 Q 24 6 24 12 Q 24 17 13 17 L 18 17 L 24 26"
          stroke="hsl(var(--primary))"
          strokeWidth="2.5"
          strokeLinecap="square"
          fill="none"
        />
        {/* Mesh dots */}
        <circle cx="20" cy="9" r="0.8" fill="hsl(var(--primary))" />
        <circle cx="22" cy="13" r="0.8" fill="hsl(var(--primary))" />
        <circle cx="18" cy="11" r="0.8" fill="hsl(var(--primary-glow))" />
      </svg>
    </div>
  );
}
