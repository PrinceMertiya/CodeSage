import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import Button from "../common/Button";

export default function HeroContent() {
  return (
    <div className="max-w-[560px] p-10">

      <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-3 text-xs text-violet-300">
        <Sparkles size={15} />
        AI Powered Repository Intelligence
      </div>

      <h1 className="text-[60px] font-extrabold leading-[0.98] tracking-[-2px] p-2">

        Turn Repositories

        <br />

        <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">

          Into Intelligence.

        </span>

      </h1>

      <p className="mt-10 text-lg leading-9 text-zinc-400 m-2 pb-5">

        CodeSage understands your codebase in seconds.
        Generate architecture diagrams, explore dependencies,
        search with AI and chat with your entire repository—
        all in one beautiful workspace.

      </p>

      <div className="mt-12 flex gap-5 pb-2">

        <Button>
          <span className="flex items-center gap-2">
            Start Building
            <ArrowRight size={18} />
          </span>
        </Button>

        <Button variant="secondary">
          <span className="flex items-center gap-2">
            <ArrowUpRight size={18} />
            View on GitHub
          </span>
        </Button>

      </div>

      <div className="mt-16 flex gap-16">

        <div>
          <h3 className="text-4xl font-bold">100+</h3>
          <p className="mt-2 text-zinc-500">
            Repositories Supported
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold">AI</h3>
          <p className="mt-2 text-zinc-500">
            Architecture Analysis
          </p>
        </div>

        <div>
          <h3 className="text-4xl font-bold">24/7</h3>
          <p className="mt-2 text-zinc-500">
            Instant Insights
          </p>
        </div>

      </div>

    </div>
  );
}