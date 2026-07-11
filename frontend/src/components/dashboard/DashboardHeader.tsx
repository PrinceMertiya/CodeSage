export default function DashboardHeader() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-white">
        Dashboard
      </h1>

      <p className="mt-2 text-zinc-300">
        Welcome back, Prince! 👋
      </p>

      <p className="mt-1 text-sm text-zinc-500">
        Here's what's happening with your repositories.
      </p>
    </div>
  );
}