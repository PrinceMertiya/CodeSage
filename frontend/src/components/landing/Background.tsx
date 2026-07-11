export default function Background() {
  return (
    <>
      {/* Aurora */}
      <div className="absolute left-1/2 top-[-220px] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[180px]" />

      <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[180px]" />

      {/* Subtle Grid */}
      <div
        className="
        absolute inset-0
        opacity-[0.025]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:70px_70px]
      "
      />
    </>
  );
}