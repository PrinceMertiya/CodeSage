import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#08090F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
            <span className="font-bold">C</span>
          </div>

          <h1 className="text-2xl font-bold">
            Code<span className="text-violet-500">Sage</span>
          </h1>
        </Link>

        <nav className="hidden gap-10 text-sm text-zinc-300 lg:flex">
          <a href="#">Features</a>
          <a href="#">How it Works</a>
          <a href="#">Pricing</a>
          <a href="#">Docs</a>
          <a href="#">Blog</a>
        </nav>

        <div className="flex items-center gap-4">

          <button className="text-zinc-300">
            Sign In
          </button>

          <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold transition hover:bg-violet-500">
            Get Started
          </button>

        </div>

      </div>
    </header>
  );
}