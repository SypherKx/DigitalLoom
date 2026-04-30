import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    id: "01",
    label: "NEGOTIATE",
    title: "Autonomous Negotiation",
    desc: "AI agents act as intermediaries to research and negotiate custom manufacturing terms on behalf of the consumer.",
    code: "agent.negotiate({ terms: 'optimal', maxPrice: 450 })",
  },
  {
    id: "02",
    label: "CHECKOUT",
    title: "Agentic Checkout",
    desc: "Bypassing traditional checkout funnels through a standardized API—allowing agents to secure purchases directly via the Agentic Commerce Protocol (ACP).",
    code: "acp.securePurchase(agent.wallet, checkout_id)",
  },
  {
    id: "03",
    label: "EXECUTE",
    title: "Real-World Execution",
    desc: "Transforming digital prompts into tangible, custom physical products through integrated manufacturing logic.",
    code: "rendreal.execute(manufacturing_logic) → tracking#A7F-2294",
  },
];

export default function ProtocolSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const lineHeight = useTransform(smoothScrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 grid-blueprint opacity-30 pointer-events-none" />

      <div className="container relative">
        <div className="max-w-2xl mb-24">
          <div className="font-mono text-xs tracking-widest text-primary mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ticker" />
            SECTION_02 / THE_PROTOCOL
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
            The Protocol <br />
            <span className="text-glitch">Layer.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-lg">
            Visually representing the Protocol Layer turning data into a physical object.
          </p>
        </div>

        <div className="relative grid md:grid-cols-[80px_1fr] gap-8">
          {/* Vertical scroll line */}
          <div className="hidden md:block relative">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="relative w-px h-[60vh] mx-auto bg-border">
                <motion.div
                  style={{ height: lineHeight }}
                  className="absolute top-0 left-0 w-px bg-gradient-kinetic shadow-kinetic"
                />
              </div>
            </div>
          </div>

          <div className="space-y-24 md:space-y-32">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                <div className="neu-surface rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />

                  <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                    <div className="flex items-center gap-4 md:flex-col md:items-start">
                      <div className="font-mono text-7xl md:text-8xl font-bold text-glitch leading-none">
                        {step.id}
                      </div>
                      <div className="font-mono text-[10px] tracking-[0.2em] text-aluminum px-3 py-1 rounded-full neu-inset">
                        {step.label}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                        {step.desc}
                      </p>
                      <div className="font-mono text-xs md:text-sm neu-inset rounded-xl px-4 py-3 text-primary/90 overflow-x-auto whitespace-nowrap">
                        <span className="text-aluminum mr-2">{">"}</span>
                        {step.code}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
