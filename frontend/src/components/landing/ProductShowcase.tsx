import { FaGithub } from "react-icons/fa";


import {
  FolderTree,
  BrainCircuit,
  MessageSquare,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export default function ProductShowcase() {
  return (
    <section id = "workflow" className="relative py-36">

      <div className="mx-auto max-w-[1450px] px-10">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <p className="mb-5 font-semibold text-violet-400">
            PRODUCT
          </p>

          <h2 className="text-6xl font-bold leading-tight">
            Everything you need to
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              understand any repository.
            </span>
          </h2>

          <p className="mt-8 text-xl leading-9 text-zinc-400">
            Upload a repository once.
            CodeSage scans every file,
            generates architecture,
            creates embeddings and lets AI answer
            every question instantly.
          </p>

        </div>

        {/* Mock Dashboard */}

        <div className="mt-24 rounded-[36px] border border-white/10 bg-[#0E1220]/80 p-8 backdrop-blur-xl">

          {/* Top */}

          <div className="flex items-center justify-between">

            <div>

              <h3 className="text-3xl font-bold">
                ai-resume-analyzer
              </h3>

              <p className="mt-2 text-zinc-400">
                github.com/prime/ai-resume-analyzer
              </p>

            </div>

            <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-medium">

              Re-analyze

              <ArrowRight size={18} />

            </button>

          </div>

          {/* Grid */}

          <div className="mt-12 grid grid-cols-3 gap-8">

            {/* Summary */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <FaGithub className="text-violet-400" />

              <h4 className="mt-6 text-2xl font-semibold">

                Repository Summary

              </h4>

              <div className="mt-8 space-y-4">

                <div className="flex justify-between">
                  <span>Files</span>
                  <span>1,248</span>
                </div>

                <div className="flex justify-between">
                  <span>Languages</span>
                  <span>Python</span>
                </div>

                <div className="flex justify-between">
                  <span>Dependencies</span>
                  <span>184</span>
                </div>

                <div className="flex justify-between">
                  <span>Embeddings</span>
                  <span>6,520</span>
                </div>

              </div>

            </div>

            {/* Architecture */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <FolderTree
                className="text-cyan-400"
              />

              <h4 className="mt-6 text-2xl font-semibold">

                Architecture

              </h4>

              <div className="mt-8 flex flex-col gap-5">

                <div className="h-3 rounded-full bg-violet-500/50" />

                <div className="ml-10 h-3 w-3/4 rounded-full bg-blue-500/40" />

                <div className="ml-20 h-3 w-1/2 rounded-full bg-cyan-500/40" />

                <div className="ml-10 h-3 w-2/3 rounded-full bg-violet-500/40" />

              </div>

            </div>

            {/* AI */}

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <BrainCircuit
                className="text-green-400"
              />

              <h4 className="mt-6 text-2xl font-semibold">

                AI Insights

              </h4>

              <p className="mt-6 leading-8 text-zinc-400">

                ✓ High complexity detected

                <br />

                ✓ Circular dependency found

                <br />

                ✓ Missing tests

                <br />

                ✓ Large service class

                <br />

                ✓ Refactoring suggestions

              </p>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-8 grid grid-cols-2 gap-8">

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <MessageSquare
                className="text-yellow-400"
              />

              <h4 className="mt-5 text-2xl font-semibold">

                Ask AI

              </h4>

              <div className="mt-8 rounded-xl border border-white/10 bg-[#111827] p-4">

                How does authentication work?

              </div>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

              <BarChart3
                className="text-pink-400"
              />

              <h4 className="mt-5 text-2xl font-semibold">

                Repository Health

              </h4>

              <div className="mt-8 h-4 rounded-full bg-zinc-700">

                <div className="h-4 w-[84%] rounded-full bg-green-400" />

              </div>

              <p className="mt-4 text-zinc-400">

                Overall score 84/100

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}