export default function AuthDivider() {
  return (
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-white/10" />
      </div>

      <div className="relative flex justify-center">
        <span className="bg-[#11121A] px-4 text-sm text-zinc-500">
          OR
        </span>
      </div>
    </div>
  );
}