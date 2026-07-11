interface AuthCardProps {
  children: React.ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      className="
        w-full
        max-w-md
        rounded-[28px]
        border
        border-white/10
        bg-white/[0.04]
        p-8
        shadow-[0_25px_80px_rgba(0,0,0,.45)]
        backdrop-blur-3xl
      "
    >
      {children}
    </div>
  );
}