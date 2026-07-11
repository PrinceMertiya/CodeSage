import {
  Zap,
  BrainCircuit,
  Boxes,
  Search,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Analysis",
    desc: "Scan any repository in minutes instead of hours.",
  },
  {
    icon: BrainCircuit,
    title: "AI Insights",
    desc: "Understand architecture, complexity and code quality.",
  },
  {
    icon: Boxes,
    title: "Visual Architecture",
    desc: "Interactive dependency graphs and structure maps.",
  },
  {
    icon: Search,
    title: "Smart Search",
    desc: "Ask AI about any function, class or file instantly.",
  },
  {
    icon: ShieldCheck,
    title: "Private & Secure",
    desc: "Repositories stay encrypted and under your control.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-[1450px] px-10">

        <div className="grid grid-cols-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">

          {features.map((item) => (
            <div
              key={item.title}
              className="border-r border-white/10 p-8 last:border-r-0 transition hover:bg-white/[0.03]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10">
                <item.icon
                  className="text-violet-400"
                  size={26}
                />
              </div>

              <h3 className="text-xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}