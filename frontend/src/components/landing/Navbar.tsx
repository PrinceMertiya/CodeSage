import { Menu, ArrowRight } from "lucide-react";
import logo from "../../assets/logo.png"

export default function Navbar() {
  return (
    // Outer positioning: matches your container's padding bounds and keeps it from touching layout edges
    <header className="fixed top-5 left-0 right-0 z-50 px-6 sm:px-8 lg:px-10 flex justify-center w-full pointer-events-none">

      {/* Centering wrapper synchronized to max-w-7xl (1280px) to align perfectly with your Hero content */}
      <div className="w-full max-w-7xl pointer-events-auto">

        {/* The Glassmorphism Inner Navbar Container */}
        <div className="grid h-18 grid-cols-3 items-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-4 shrink-0">
          
            <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/30">
              {/* <Code2 className="h-5 w-5 text-white" /> */}
             <img
  src={logo}
  alt="CodeSage Logo"
  className="h-20 w-20 object-cover"
/> 
              
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Code<span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">Sage</span>
            </h1>
          </a>

          {/* Desktop Navigation */}
          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center justify-center gap-8">

            <a
              href="#features"
              className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              Features
            </a>

            <a
              href="#product"
              className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              Product
            </a>

            <a
              href="#workflow"
              className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              Workflow
            </a>

            <a
              href="#pricing"
              className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              Pricing
            </a>

            <a
              href="#faq"
              className="text-sm font-medium text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              FAQ
            </a>

          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center justify-self-end gap-5">
            <button className="font-medium text-zinc-300 transition hover:text-white text-sm">
              Login
            </button>
            <button className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.45)]">
              Start Building
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu */}
          <button className="lg:hidden ml-auto rounded-lg border border-white/10 p-2 text-white" aria-label="Open Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}