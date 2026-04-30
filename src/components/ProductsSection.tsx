import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Package, Network, Settings } from "lucide-react";

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

const detailedUseCases = [
  {
    icon: <Package className="w-5 h-5 text-primary" />,
    title: "On-Demand Manufacturing",
    desc: "On-Demand Manufacturing is researched and approved. Agents can automate innovation of on-demand logistics without human oversight.",
  },
  {
    icon: <Network className="w-5 h-5 text-primary" />,
    title: "Supply Chain Automation",
    desc: "Success is easily measured by supply chain automation. AI agents can seamlessly connect to endpoints for procurement procedures.",
  },
  {
    icon: <Settings className="w-5 h-5 text-primary" />,
    title: "Custom Prototyping",
    desc: "Custom Prototyping systems connect remote API nodes to physical extruders, maximizing speed for custom prototyping runs.",
  },
];

export default function ProductsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const y1 = useTransform(smoothScrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(smoothScrollYProgress, [0, 1], [-20, 20]);
  const y3 = useTransform(smoothScrollYProgress, [0, 1], [30, -30]);
  const ys = [y1, y2, y3];

  return (
    <section ref={ref} className="relative py-16 lg:py-24 overflow-hidden">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-48">
            <div className="font-mono text-xs tracking-widest text-primary mb-4 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ticker" />
              SECTION_03 / CORE_FEATURES
            </div>
            <h2 className="font-display text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6">
              Core Features & <br />
              <span className="text-glitch">Use Cases.</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm mb-16">
              Empowering AI agents to navigate logistics, secure payments, and execute this physical manufacturing.
            </p>

            <h3 className="font-display text-2xl font-bold text-primary mb-4">
              **Detailed Use Cases**
            </h3>
            <p className="text-muted-foreground font-mono text-sm">
              Empowering AI agents in completely autonomous scenarios, and executing high-fidelity physical manufacturing endpoints.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Top Row: 3 Feature Cards */}
            <div className="grid md:grid-cols-3 gap-6">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute inset-0 scanlines" />

                      {/* Scan line */}
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-scan opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Corner brackets */}
                      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/60" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/60" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/60" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/60" />

                      <div className="absolute bottom-4 left-4 right-4 font-mono text-[8px] tracking-widest text-aluminum flex justify-between">
                        <span>FEATURE_{String(i + 1).padStart(3, "0")}</span>
                        <span className="text-primary">+450</span>
                      </div>
                    </div>

                    <div className="px-4 pb-4 flex-1 flex flex-col">
                      <h3 className="font-display text-lg font-semibold tracking-tight mb-1">{m.name}</h3>
                      <div className="font-mono text-[10px] text-primary mb-3">{m.spec}</div>
                      <p className="text-muted-foreground text-xs leading-relaxed mt-auto">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row: Detailed Use Cases Container */}
            <div className="neu-surface rounded-3xl p-6 md:p-8">
              <div className="grid md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-border/50">
                {detailedUseCases.map((uc, i) => (
                  <div key={i} className="pt-6 md:pt-0 md:px-6 first:pt-0 first:md:px-0 first:md:pr-6 last:md:px-0 last:md:pl-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-xl neu-inset flex items-center justify-center shrink-0">
                        {uc.icon}
                      </div>
                      <h4 className="font-display font-semibold text-sm leading-tight">{uc.title}</h4>
                    </div>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {uc.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
