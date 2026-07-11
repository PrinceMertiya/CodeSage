import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section id = "hero" className="relative min-h-[980px] overflow-hidden bg-[#070611] pt-36">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-40 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[180px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
          linear-gradient(#ffffff 1px, transparent 1px),
          linear-gradient(90deg,#ffffff 1px,transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

<div className="relative mx-auto flex max-w-[1450px] gap-20 px-10">
        {/* ========================= */}
        {/* LEFT */}
        {/* ========================= */}

        <div className="w-[42%]">

          {/* Badge */}

          <div className="mb-3 inline-flex items-center gap-3 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-xs text-violet-300">

            <Sparkles size={14} />

            AI Powered Repository Intelligence

          </div>

          {/* Heading */}

          <h1 className="font-black leading-[0.95] tracking-[-4px]">

            <span className="block text-[65px] text-white">

              Transform Code

            </span>

            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-500 bg-clip-text text-[70px] text-transparent">

              Into Understanding

            </span>

          </h1>

          {/* Paragraph */}

          <p className="mt-5 max-w-[700px] text-[22px] leading-8.5 text-zinc-400">

            CodeSage scans, analyzes and maps your
            repository using AI to deliver instant
            clarity, architecture insights and faster
            development.

          </p>

          {/* Buttons */}

          <div className="mt-14 flex gap-5">

            <button className="flex h-16 items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-9 text-lg font-semibold text-white shadow-[0_20px_60px_rgba(124,58,237,.45)] transition hover:scale-105">

              Start for Free

              <ArrowRight size={20} />

            </button>

            <button className="flex h-16 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-9 text-lg font-medium text-white backdrop-blur-xl transition hover:border-violet-500">

              View Live Demo

              <ArrowUpRight size={20} />

            </button>

          </div>

          {/* Trusted */}

          <div className="mt-14 flex items-center gap-5">

            <div className="flex -space-x-3">

              <div className="h-12 w-12 rounded-full border-2 border-[#070611] bg-red-400" />

              <div className="h-12 w-12 rounded-full border-2 border-[#070611] bg-blue-400" />

              <div className="h-12 w-12 rounded-full border-2 border-[#070611] bg-green-400" />

              <div className="h-12 w-12 rounded-full border-2 border-[#070611] bg-yellow-400" />

            </div>

            <div>

              <h3 className="text-xl font-semibold">

                Trusted by 10,000+

              </h3>

              <p className="text-zinc-500">

                developers worldwide

              </p>

            </div>

          </div>

        </div>

        {/* ========================= */}
        {/* RIGHT */}
        {/* ========================= */}

        <div className="absolute right-24 top-16 h-[430px] w-[600px] overflow-hidden rounded-[28px] border border-violet-500/30 bg-[#0D1117] shadow-[0_30px_80px_rgba(76,29,149,.35)]">


          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b border-white/10 bg-[#161B22] px-5">

            <div className="flex items-center gap-2">

              <div className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F]" />

            </div>

            <span className="text-sm font-medium text-zinc-400">
              user.service.ts
            </span>

            <Code2 size={18} className="text-violet-400" />

          </div>

          {/* Code */}
          <div className="px-7 py-6 pz-2 font-mono text-[13px] leading-8">

            <p><span className="text-violet-400">import</span> <span className="text-sky-400">{"{ Injectable }"}</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">"@nestjs/common"</span>;</p>

            <br />

            <p className="text-orange-400">@Injectable()</p>

            <br />

            <p>
              <span className="text-violet-400">export class</span>{" "}
              <span className="text-yellow-300">UserService</span>{" "}
              {"{"}
            </p>

            <br />

            <p className="ml-6">
              <span className="text-sky-400">async</span>{" "}
              <span className="text-green-400">getUser</span>
              (id:number) {"{"}
            </p>

            <br />

            <p className="ml-12">
              <span className="text-violet-400">return</span>{" "}
              repository.find(id);
            </p>

            <br />

            <p className="ml-6">{"}"}</p>

            <br />

            <p>{"}"}</p>

          </div>


        </div>        {/* Architecture */}

        <div className="absolute right-0 top-0 h-[190px] w-[260px] rounded-[28px] border border-white/10 bg-[#111827]/90 p-5 backdrop-blur-xl">

          <p className="text-sm font-semibold text-zinc-400">
            Architecture
          </p>

          <div className="mt-6 flex flex-col gap-4">

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-violet-500" />
              <div className="h-1 w-24 rounded bg-violet-500/50" />
            </div>

            <div className="ml-8 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-cyan-400" />
              <div className="h-1 w-20 rounded bg-cyan-400/50" />
            </div>

            <div className="ml-14 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <div className="h-1 w-16 rounded bg-green-400/50" />
            </div>

            <div className="ml-8 flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-1 w-20 rounded bg-yellow-400/50" />
            </div>

          </div>

        </div>
        {/* Health */}

        <div className="absolute right-0 top-[230px] h-[220px] w-[300px] rounded-[28px] border border-white/10 bg-[#111827]/90 p-6 backdrop-blur-xl">

          <h3 className="text-sm font-semibold text-zinc-400">
            Code Health
          </h3>

          <div className="mt-6 text-center">

            <h2 className="text-6xl font-black text-green-400">
              92
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Excellent
            </p>

          </div>

          <div className="mt-6 h-2 rounded-full bg-zinc-700">
            <div className="h-2 w-[92%] rounded-full bg-green-400" />
          </div>

        </div>
        {/* Languages */}

{/* ================= Languages ================= */}

        <div className="absolute right-100 top-110 h-[190px] w-[280px] rounded-[28px] border border-white/10 bg-[#111827]/90 p-5 backdrop-blur-xl">

  <h3 className="text-sm font-semibold text-zinc-400">
    Languages
  </h3>

  <div className="mt-5 flex items-center justify-between">

    {/* Donut */}

    <div className="relative flex h-28 w-28 items-center justify-center">

      <div
        className="h-28 w-28 rounded-full"
        style={{
          background:
            "conic-gradient(#7C3AED 0deg 155deg,#3B82F6 155deg 245deg,#FACC15 245deg 300deg,#374151 300deg 360deg)",
        }}
      />

      <div className="absolute h-16 w-16 rounded-full bg-[#111827]" />

    </div>

    {/* Legend */}

    <div className="space-y-3 text-sm">

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-violet-500" />
        <span className="text-zinc-300">TypeScript</span>
        <span className="ml-auto text-zinc-500">45%</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-blue-500" />
        <span className="text-zinc-300">JavaScript</span>
        <span className="ml-auto text-zinc-500">25%</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="text-zinc-300">Python</span>
        <span className="ml-auto text-zinc-500">15%</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-3 w-3 rounded-full bg-zinc-500" />
        <span className="text-zinc-300">Other</span>
        <span className="ml-auto text-zinc-500">15%</span>
      </div>

    </div>

  </div>

</div>
        {/* Activity */}

{/* ================= Activity ================= */}

        <div className="absolute right-4 top-7 h-[190px] w-[280px] rounded-[28px] border border-white/10 bg-[#111827]/90 p-5 backdrop-blur-xl">

  <div className="flex items-center justify-between">

    <h3 className="text-sm font-semibold text-zinc-300">
      Recent Activity
    </h3>

    <span className="text-xs text-violet-400">
      View all
    </span>

  </div>

  <div className="mt-5 space-y-4">

    {[
      "Repository scanned",
      "Architecture updated",
      "Issues detected",
      "AI insights generated",
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">

          <div className="h-2.5 w-2.5 rounded-full bg-violet-500" />

          <span className="text-sm text-zinc-300">
            {item}
          </span>

        </div>

        <span className="text-xs text-zinc-500">
          {index * 3 + 2} min ago
        </span>

      </div>
    ))}

  </div>

</div>
      </div>



    </section>
  );
}