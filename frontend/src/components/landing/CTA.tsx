import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-36 overflow-hidden">

      {/* Background Glow */}

      <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[180px]" />

      <div className="relative mx-auto max-w-[1450px] px-10">

        <div className="overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#111827] via-[#161B2E] to-[#111827] p-20 text-center shadow-[0_30px_100px_rgba(124,58,237,.20)]">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-600/15">

            <Sparkles className="text-violet-400" size={36} />

          </div>

          <h2 className="mx-auto mt-10 max-w-4xl text-6xl font-black leading-tight">

            Ready To Understand

            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Every Repository?

            </span>

          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-zinc-400">

            Join developers using CodeSage to analyze repositories,
            visualize architecture and chat with their entire codebase.

          </p>

          <div className="mt-14 flex justify-center gap-6">

            <button className="flex h-16 items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-10 text-lg font-semibold transition hover:scale-105">

              Start Free

              <ArrowRight size={20} />

            </button>

            <button className="h-16 rounded-2xl border border-white/10 bg-white/5 px-10 text-lg font-medium transition hover:border-violet-500">

              Book Demo

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}