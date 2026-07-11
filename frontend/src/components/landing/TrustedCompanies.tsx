import {
 
  Box,
} from "lucide-react";

export default function TrustedCompanies() {
  return (
    <section className="mx-auto mt-14 max-w-7xl rounded-3xl border border-white/5 bg-white/[0.02] px-10 py-8 backdrop-blur-xl">

      <p className="mb-8 text-center text-zinc-400">
        Trusted by developers and teams building the future
      </p>

      <div className="grid grid-cols-5 items-center text-zinc-500">

        

        <div className="text-center text-xl font-semibold">
          Vercel
        </div>

        <div className="text-center text-xl font-semibold">
          Linear
        </div>

        <div className="text-center text-xl font-semibold">
          Replit
        </div>

        <div className="flex items-center justify-center gap-3">
          <Box />
          Docker
        </div>

      </div>

    </section>
  );
}