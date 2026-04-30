import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Nav from "@/components/Nav";
import ProtocolSection from "@/components/ProtocolSection";
import ProductsSection from "@/components/ProductsSection";

const HeroScene = lazy(() => import("@/components/HeroScene"));

const Index = () => {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });



  // Each text layer has a distinct speed for true parallax depth
  // The larger the negative value, the faster it moves UP when scrolling down.
  const badgeY   = useTransform(smoothScrollY, [0, 1000], [0, -120]);
  const titleY   = useTransform(smoothScrollY, [0, 1000], [0, -250]);
  const subtitleY = useTransform(smoothScrollY, [0, 1000], [0, -180]);
  const buttonsY  = useTransform(smoothScrollY, [0, 1000], [0, -100]);
  const telemetryY = useTransform(smoothScrollY, [0, 1000], [0, -60]);

  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "UTC",
        }) + " UTC"
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Marquee Parallax
  const marqueeRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: marqueeScroll } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"],
  });
  const smoothMarqueeScroll = useSpring(marqueeScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const marqueeY = useTransform(smoothMarqueeScroll, [0, 1], [30, -30]);
  const marqueeRotate = useTransform(smoothMarqueeScroll, [0, 1], [-2, 2]);

  // CTA Section Parallax
  const ctaRef = useRef<HTMLElement>(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const smoothCtaScroll = useSpring(ctaScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const ctaBgY = useTransform(smoothCtaScroll, [0, 1], ["0%", "30%"]);
  const ctaContentY = useTransform(smoothCtaScroll, [0, 1], [100, -50]);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* FIXED 3D BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-radial-glow" />}>
          <HeroScene />
        </Suspense>
      </div>

      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20">
        <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />

        {/* Top status bar */}
        <div className="absolute top-24 inset-x-0 z-10 pointer-events-none">
          <div className="container flex justify-between font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ticker" />
              LOOM_v0.1 / MAINNET
            </span>
            <span>{time}</span>
          </div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl">
            {/* Badge — slowest layer */}
            <motion.div
              style={{ y: badgeY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 neu-surface rounded-full px-4 py-2 mb-8 font-mono text-[11px] tracking-widest text-muted-foreground will-change-transform"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              NOW_WEAVING / Q2_2026
            </motion.div>

            {/* Heading — fastest text layer */}
            <motion.h1
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[3rem] sm:text-6xl md:text-7xl lg:text-[8rem] font-bold leading-[0.88] tracking-[-0.04em] mb-8 will-change-transform"
            >
              From Agentic Intent <br />
              to <span className="text-glitch">Physical</span> <br />
              Reality.
            </motion.h1>

            {/* Subtitle — medium speed */}
            <motion.p
              style={{ y: subtitleY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed will-change-transform"
            >
              The first protocol layer designed for autonomous AI agents to negotiate, customize, and manufacture physical goods.
            </motion.p>

            {/* Buttons — slowest text layer */}
            <motion.div
              style={{ y: buttonsY }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 will-change-transform"
            >
              {/* Primary CTA */}
              <button className="hero-btn-primary group relative rounded-2xl px-7 py-4 font-mono text-sm tracking-widest font-medium text-primary-foreground">
                <span className="relative z-10">Explore the Protocol →</span>
              </button>

              {/* Secondary CTA */}
              <button className="hero-btn-secondary rounded-2xl px-7 py-4 font-mono text-sm tracking-widest font-medium text-foreground">
                READ_WHITEPAPER
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom telemetry */}
        <motion.div
          style={{ y: telemetryY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-0 right-0 px-6 z-10 will-change-transform"
        >
          <div className="container flex flex-wrap items-end justify-between gap-6 font-mono text-[10px] tracking-[0.2em] text-muted-foreground border-t border-border pt-4">
            <Telemetry label="AGENTS_ONLINE" value="2,847" />
            <Telemetry label="UNITS_FORGED" value="184,302" />
            <Telemetry label="MATERIALS" value="42" />
            <Telemetry label="LATENCY" value="12ms" highlight />
          </div>
        </motion.div>
      </section>

      {/* MARQUEE divider */}
      <motion.div 
        ref={marqueeRef}
        style={{ y: marqueeY, rotate: marqueeRotate }}
        className="relative py-8 border-y border-border bg-muted/20 overflow-hidden will-change-transform z-10"
      >
        <div className="flex animate-marquee whitespace-nowrap font-display font-bold text-3xl md:text-5xl tracking-tight">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-8 pr-8 shrink-0">
              {["INTENT", "PROTOCOL", "MATERIAL", "MANUFACTURE", "DELIVERY"].map((w, i) => (
                <span key={i} className="flex items-center gap-8 text-aluminum-dark">
                  {w}
                  <span className="text-primary">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <div id="protocol">
        <ProtocolSection />
      </div>

      <div id="materials">
        <ProductsSection />
      </div>

      {/* CTA / Footer */}
      <section ref={ctaRef} id="docs" className="relative py-16 lg:py-24 overflow-hidden">
        <motion.div 
          style={{ y: ctaBgY }}
          className="absolute inset-0 grid-blueprint opacity-10 pointer-events-none will-change-transform" 
        />
        
        <div className="container relative z-10">
          <motion.div 
            style={{ y: ctaContentY }}
            className="neu-surface rounded-[2rem] p-10 md:p-20 relative overflow-hidden will-change-transform"
          >
            <div className="absolute inset-0 grid-blueprint opacity-30" />
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <div className="font-mono text-xs tracking-widest text-primary mb-4">
                /// READY_TO_WEAVE
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
                Give your agents <br />
                <span className="text-glitch">hands.</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mb-10">
                Plug into RendReal and let your AI manifest objects in the physical world. Three lines of SDK. One global manufacturing fabric.
              </p>

              <div className="font-mono text-sm neu-inset rounded-2xl p-6 mb-10 overflow-x-auto">
                <div className="text-aluminum-dark mb-2">// install</div>
                <div className="text-foreground/90"><span className="text-primary">$</span> npm i @rendreal/sdk</div>
                <div className="text-aluminum-dark mt-4 mb-2">// weave</div>
                <div className="text-foreground/90">
                  <span className="text-primary">await</span> rendreal.<span className="text-primary-glow">manifest</span>(intent)
                </div>
              </div>

              <button className="hero-btn-primary group relative rounded-2xl px-8 py-4 font-mono text-sm tracking-widest font-medium text-primary-foreground">
                <span className="relative z-10">GET_API_KEY →</span>
              </button>
            </div>
          </motion.div>

          <footer className="mt-20 flex flex-col md:flex-row items-start justify-between gap-10 font-mono text-xs tracking-widest text-muted-foreground border-t border-border pt-10">
            <div className="flex flex-col gap-4 max-w-md">
              <div><strong className="text-foreground">HQ:</strong> United States.</div>
              <div><strong className="text-foreground">Technology Stack:</strong> Built for the future of A2A (Agent-to-Agent) commerce.</div>
              <div className="leading-relaxed"><strong className="text-foreground">Mission:</strong> Empowering a new retail revolution where the user manages the agent, and the agent manages the store.</div>
            </div>
            
            <div className="flex flex-col gap-6 w-full md:w-auto">
              <div className="flex justify-between md:justify-end gap-6">
                <a href="#" className="hover:text-foreground transition-colors">GITHUB</a>
                <a href="#" className="hover:text-foreground transition-colors">DOCS</a>
                <a href="#" className="hover:text-foreground transition-colors">DISCORD</a>
              </div>
              <div className="text-right text-[10px] text-aluminum-dark">
                © 2026 / RENDREAL / ALL_PATTERNS_RESERVED
              </div>
            </div>
          </footer>
        </div>
      </section>
    </main>
  );
};

function Telemetry({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-aluminum-dark">{label}</span>
      <span
        className={`font-display text-xl tracking-tight ${
          highlight ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export default Index;
