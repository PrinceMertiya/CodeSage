import Background from "../landing/Background";

interface AuthLayoutProps {
  children: React.ReactNode;
  preview: React.ReactNode;
}

export default function AuthLayout({
  children,
  preview,
}: AuthLayoutProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05040D] text-white">
      {/* Background */}
      <Background />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <div className="grid w-full max-w-[1500px] grid-cols-1 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.45)] lg:grid-cols-[1fr_1fr]">

          {/* Left */}
          <div className="relative hidden min-h-[760px] overflow-hidden border-r border-white/10 lg:block">
            {preview}
          </div>

          {/* Right */}
          <div className="flex min-h-[820px] items-center justify-center p-10">
            {children}
          </div>

        </div>
      </div>
    </main>
  );
}