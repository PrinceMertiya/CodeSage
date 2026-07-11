import { ChevronRight } from "lucide-react";

interface Props {
  items: string[];
}

export default function Breadcrumb({
  items,
}: Props) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
      {items.map((item, index) => (
        <div
          key={item}
          className="flex items-center gap-2"
        >
          <span>{item}</span>

          {index !== items.length - 1 && (
            <ChevronRight size={14} />
          )}
        </div>
      ))}
    </div>
  );
}