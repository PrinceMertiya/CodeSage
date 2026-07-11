import {
  BrainCircuit,
  FolderTree,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FolderTree,
    title: "Instant Overview",
    desc: "Get a bird's-eye view of any codebase.",
  },
  {
    icon: BrainCircuit,
    title: "Deep Insights",
    desc: "Understand architecture, dependencies and flow.",
  },
  {
    icon: Sparkles,
    title: "AI Assistant",
    desc: "Ask anything about your repository.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Your code stays encrypted and private.",
  },
];

export default function FeatureSection() {
  return (
    <section className="mx-auto mt-6 grid max-w-7xl grid-cols-4 gap-8 px-8">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="flex gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-xl transition hover:border-violet-500/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10">
              <Icon
                className="text-violet-400"
                size={22}
              />
            </div>

            <div>
              <h3 className="font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {feature.desc}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}