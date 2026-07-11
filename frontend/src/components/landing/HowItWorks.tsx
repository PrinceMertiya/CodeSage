import { FaGithub } from "react-icons/fa";
import {

  ScanSearch,
  BrainCircuit,
  LayoutDashboard,
} from "lucide-react";

const steps = [
  {
    icon: FaGithub,
    title: "Connect Repository",
    desc: "Paste any GitHub repository URL. We clone and prepare it for analysis.",
  },
  {
    icon: ScanSearch,
    title: "Scan Codebase",
    desc: "Every file, folder and dependency is indexed automatically.",
  },
  {
    icon: BrainCircuit,
    title: "AI Processing",
    desc: "Embeddings, architecture mapping and AI insights are generated.",
  },
  {
    icon: LayoutDashboard,
    title: "Explore Dashboard",
    desc: "Search your repository, chat with AI and visualize everything.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-36">

      <div className="mx-auto max-w-[1450px] px-10">

        {/* Heading */}

        <div className="text-center">

          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-violet-400">
            Workflow
          </p>

          <h2 className="text-6xl font-bold">

            From Repository
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              To Intelligence
            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-zinc-400">

            Four simple steps transform thousands of source files into
            searchable AI knowledge and interactive architecture.

          </p>

        </div>

        {/* Timeline */}

        <div className="relative mt-24">

          {/* Line */}

          <div className="absolute left-0 right-0 top-10 h-[2px] bg-gradient-to-r from-violet-600 via-blue-500 to-cyan-500" />

          <div className="grid grid-cols-4 gap-8">

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-violet-500/40"
              >
                {/* Number */}

                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 font-bold">

                  {index + 1}

                </div>

                {/* Icon */}

                <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/10">

                  <step.icon
                    size={30}
                    className="text-violet-400"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-semibold">

                  {step.title}

                </h3>

                <p className="mt-5 leading-8 text-zinc-400">

                  {step.desc}

                </p>

              </div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}