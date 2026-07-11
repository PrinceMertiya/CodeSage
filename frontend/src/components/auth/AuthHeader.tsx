import logo from "../../assets/logo.png";

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export default function AuthHeader({
  title,
  subtitle,
}: AuthHeaderProps) {
  return (
    <div className="mb-8 text-center">

      {/* Logo */}
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/30">

        <img
          src={logo}
          alt="CodeSage Logo"
          className="h-10 w-10 object-contain"
        />

      </div>

      {/* Title */}
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
        {title}
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-sm leading-6 text-zinc-400">
        {subtitle}
      </p>

    </div>
  );
}