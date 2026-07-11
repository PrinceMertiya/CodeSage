import {
  BrainCircuit,
  Database,
  FolderTree,
  Server,
  Code2,
} from "lucide-react";

export default function ArchitectureSection() {
  return (
    <section className="relative py-36">

      <div className="mx-auto max-w-[1450px] px-10">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            Architecture Mapping
          </span>

          <h2 className="mt-8 text-6xl font-black">

            Understand Every

            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

              Connection

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-zinc-400">

            CodeSage automatically generates an interactive dependency graph
            so you can understand large repositories in seconds.

          </p>

        </div>

        {/* Graph */}

        <div className="relative mt-28 flex h-[650px] items-center justify-center rounded-[40px] border border-white/10 bg-[#111827]/70 backdrop-blur-xl">

          {/* Glow */}

          <div className="absolute h-[450px] w-[450px] rounded-full bg-violet-600/20 blur-[140px]" />

          {/* Root */}

          <div className="absolute top-12 flex flex-col items-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-[0_20px_60px_rgba(124,58,237,.35)]">

              <FolderTree size={34} />

            </div>

            <p className="mt-4 font-semibold">

              Repository

            </p>

          </div>

          {/* Left */}

          <div className="absolute left-28 top-64 flex flex-col items-center">

            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-cyan-500/10 p-5">

              <Server className="text-cyan-400" />

            </div>

            <p className="mt-4">

              Backend

            </p>

          </div>

          {/* Center */}

          <div className="absolute top-64 flex flex-col items-center">

            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-green-500/10 p-5">

              <BrainCircuit className="text-green-400" />

            </div>

            <p className="mt-4">

              AI Engine

            </p>

          </div>

          {/* Right */}

          <div className="absolute right-28 top-64 flex flex-col items-center">

            <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-pink-500/10 p-5">

              <Database className="text-pink-400" />

            </div>

            <p className="mt-4">

              Database

            </p>

          </div>

          {/* Bottom Left */}

          <div className="absolute bottom-16 left-48 flex flex-col items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10">

              <Code2 className="text-blue-400" />

            </div>

            <p className="mt-3 text-sm">

              API Layer

            </p>

          </div>

          {/* Bottom Right */}

          <div className="absolute bottom-16 right-48 flex flex-col items-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-yellow-500/10">

              <Code2 className="text-yellow-400" />

            </div>

            <p className="mt-3 text-sm">

              Services

            </p>

          </div>

          {/* Connection Lines */}

          <div className="absolute top-[110px] h-[150px] w-[2px] bg-violet-500/60" />

          <div className="absolute top-[260px] h-[2px] w-[420px] bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500" />

          <div className="absolute left-[330px] top-[340px] h-[120px] w-[2px] bg-blue-500/50" />

          <div className="absolute right-[330px] top-[340px] h-[120px] w-[2px] bg-yellow-500/50" />

        </div>

      </div>

    </section>
  );
}