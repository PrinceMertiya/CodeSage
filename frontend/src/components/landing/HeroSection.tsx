export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">

      <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[180px]" />

      <div className="mx-auto grid min-h-[720px] max-w-7xl grid-cols-2 items-center gap-20 px-8 margin left relative">

        <div>

          <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            AI Powered Codebase Intelligence
          </span>

          <h1 className="mt-10 text-7xl font-black leading-tight">

            Turn Any

            <br />

            <span className="bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">

              Codebase

            </span>

            <br />

            Into Clarity.

          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

            CodeSage scans, understands and maps your repositories using AI to help your team ship software faster.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="rounded-xl bg-violet-600 px-8 py-4 font-semibold hover:bg-violet-500">
              Start For Free
            </button>

            <button className="rounded-xl border border-zinc-700 px-8 py-4 hover:border-zinc-500">
              View Demo
            </button>

          </div>

        </div>

        <div className="relative flex justify-center">

          <div className="absolute h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]" />

          <img
            src="/landing-hero.png"
            alt="Hero"
            className="relative w-[900px]"
          />

          

        </div>

      </div>

    </section>
  );
}