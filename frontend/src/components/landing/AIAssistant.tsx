import {
  ArrowUpRight,
  Bot,
  ChevronDown,
  MessageSquare,
  Plus,
  Send,
} from "lucide-react";

export default function AIAssistant() {
  return (
    <section className="relative py-36">

      <div className="mx-auto max-w-[1450px] px-10">

        <div className="mb-16 text-center">

          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-sm text-violet-300">
            AI Assistant
          </span>

          <h2 className="mt-8 text-6xl font-black">
            Chat With Your
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Entire Repository
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-xl text-zinc-400">
            Ask anything about your project. CodeSage understands your
            architecture, files, dependencies and business logic.
          </p>

        </div>

        <div className="grid grid-cols-[320px_1fr] gap-8">

          {/* LEFT */}

          <div className="rounded-3xl border border-white/10 bg-[#111827]/80 backdrop-blur-xl">

            <div className="border-b border-white/10 p-6">

              <button className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold">

                <Plus size={18} />

                New Chat

              </button>

            </div>

            <div className="space-y-2 p-5">

                {[
  "Repository Overview",
  "Authentication Flow",
  "Database Schema",
  "API Routes",
  "Architecture",
  "Dependencies",
].map((chat) => (
  <button
    key={chat}
    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-white/5"
  >
    <MessageSquare
      size={18}
      className="text-violet-400"
    />

    <span className="text-sm text-zinc-300">
      {chat}
    </span>
  </button>
))}

</div>

<div className="border-t border-white/10 p-5">

  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

    <div className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">

        <Bot size={20} />

      </div>

      <div>

        <h4 className="font-semibold">
          CodeSage AI
        </h4>

        <p className="text-sm text-zinc-500">
          GPT Repository Assistant
        </p>

      </div>

    </div>

  </div>

</div>

</div>

{/* ================= RIGHT ================= */}

<div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#111827]/80 backdrop-blur-xl">

  {/* Header */}

  <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

    <div>

      <p className="text-sm text-zinc-500">

        Current Repository

      </p>

      <button className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2">

        CodeSage

        <ChevronDown size={16} />

      </button>

    </div>

    <button type="button" aria-label="Open in new window" className="rounded-xl border border-white/10 p-3 hover:bg-white/5">

      <ArrowUpRight size={18} />

    </button>

  </div>

  {/* Chat */}

  <div className="space-y-8 p-8">

    {/* User */}

    <div className="flex justify-end">

      <div className="max-w-xl rounded-3xl rounded-br-md bg-violet-600 px-6 py-5">

        Explain the authentication
        architecture used in this
        repository.

      </div>

    </div>

    {/* AI */}

    <div className="flex gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">

        <Bot size={20} />

      </div>

      <div className="max-w-2xl rounded-3xl rounded-bl-md border border-white/10 bg-white/[0.03] px-6 py-5">

        <p className="leading-8 text-zinc-300">

          Authentication is implemented
          using JWT tokens with a middleware
          pipeline.

        </p>

        <div className="mt-6 rounded-2xl bg-[#0D1117] p-5 font-mono text-sm leading-7 text-green-400">

{`app.use(jwtMiddleware)

↓

verifyToken()

↓

UserController

↓

UserService

↓

Repository`}
        </div>

      </div>

    </div>

  </div>
            </div>
            {/* Suggested Prompts */}

<div className="px-8">

  <p className="mb-4 text-sm font-medium text-zinc-500">
    Suggested Questions
  </p>

  <div className="flex flex-wrap gap-3">

    {[
      "Explain project architecture",
      "Find authentication flow",
      "Show database schema",
      "List API endpoints",
    ].map((item) => (
      <button
        key={item}
        className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:border-violet-500/40 hover:bg-violet-500/10"
      >
        {item}
      </button>
    ))}

  </div>

</div>

{/* Input */}

<div className="mt-8 border-t border-white/10 p-8">

  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#0D1117] px-6 py-4">

    <input
      type="text"
      placeholder="Ask anything about your repository..."
      className="flex-1 bg-transparent text-white placeholder:text-zinc-500 outline-none"
    />

    <button type="button" aria-label="Add attachment" title="Add attachment" className="rounded-xl border border-white/10 p-3 transition hover:bg-white/5">

      <Plus size={18} />

    </button>

    <button type="button" aria-label="Send message" title="Send message" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-3 transition hover:scale-105">

      <Send size={18} />

    </button>

  </div>

  <p className="mt-4 text-center text-sm text-zinc-500">

    CodeSage AI can explain code, architecture, APIs and dependencies.

  </p>

</div>

</div>

</div>

</section>
);
}