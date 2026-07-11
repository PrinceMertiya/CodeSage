import { NavLink, useParams } from "react-router-dom";
const tabs = [
  {
    name: "Overview",
    path: "",
  },
  {
    name: "Files",
    path: "/files",
  },
  {
    name: "Architecture",
    path: "/architecture",
  },
  {
    name: "AI Assistant",
    path: "/assistant",
  },
  {
    name: "Insights",
    path: "/insights",
  },
];

export default function RepositoryTabs() {
  const { id } = useParams();

  return (
    <div className="mt-8 border-b border-white/10">
      <div className="flex gap-8 overflow-x-auto">
        {tabs.map((tab) => (
          <NavLink
    key={tab.name}
    to={`/repositories/${id}${tab.path}`}
    className={({ isActive }) =>
        `border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap transition ${
            isActive
                ? "border-indigo-500 text-white"
                : "border-transparent text-zinc-400 hover:text-white"
        }`
    }
>
    {tab.name}
</NavLink>
        ))}
      </div>
    </div>
  );
}