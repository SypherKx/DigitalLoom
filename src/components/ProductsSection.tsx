import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    name: "Bridge to Reality",
    spec: "Physical World Tasks",
    desc: "While generative AI creates digital content, RendReal enables agents to perform tasks in the physical world, navigating logistics and secure payments.",
    bg: "linear-gradient(135deg, hsl(0 0% 8%), hsl(0 0% 14%)), repeating-linear-gradient(45deg, hsl(0 0% 4%) 0 6px, hsl(0 0% 10%) 6px 12px)",
  },
  {
    name: "Intent-Driven Discovery",
    spec: "Data Accuracy",
    desc: "Success is no longer measured by clicks or sessions, but by data accuracy that allows AI agents to trust and execute a purchase.",
    bg: "linear-gradient(135deg, hsl(30 4% 28%), hsl(30 4% 65%), hsl(30 4% 38%))",
  },
  {
    name: "Secure Delegated Payments",
    spec: "Tokenized Credentials",
    desc: "Integration with tokenized credentials to ensure transactions are secure even when executed autonomously by an agent.",
    bg: "linear-gradient(135deg, hsl(200 20% 18%), hsl(200 30% 45%), hsl(180 15% 22%))",
  },
];

export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const y1 = useTransform(smoothScrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(smoothScrollYProgress, [0, 1], [-40, 40]);
  const y3 = useTransform(smoothScrollYProgress, [0, 1], [60, -60]);
  const ys = [y1, y2, y3];

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <div className="font-mono text-xs tracking-widest text-primary mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ticker" />
              SECTION_03 / CORE_FEATURES
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Core Features & <br />
              <span className="text-glitch">Use Cases.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm font-mono text-sm">
            Empowering AI agents to navigate logistics, secure payments, and execute physical manufacturing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((m, i) => (
            <motion.div
              key={m.name}
              style={{ y: ys[i] }}
              className="group"
            >
              <div className="neu-surface rounded-3xl p-3 hover:shadow-kinetic transition-shadow duration-700 h-full flex flex-col">
                <div
                  className="aspect-[4/3] rounded-2xl relative overflow-hidden mb-5 shrink-0"
                  style={{ background: m.bg }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 scanlines" />

                  {/* Scan line */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/60" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/60" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/60" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/60" />

                  <div className="absolute bottom-4 left-4 right-4 font-mono text-[10px] tracking-widest text-aluminum flex justify-between">
                    <span>FEATURE_{String(i + 1).padStart(3, "0")}</span>
                    <span className="text-primary">●REC</span>
                  </div>
                </div>

                <div className="px-4 pb-4 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl font-semibold tracking-tight mb-2">{m.name}</h3>
                  <div className="font-mono text-xs text-primary mb-4">{m.spec}</div>
                  <p className="text-muted-foreground text-sm leading-relaxed mt-auto">{m.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
