import {
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";

interface Props {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export default function ArchitectureToolbar({
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onZoomOut}
        title="Zoom out"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white"
      >
        <Minus size={17} />
      </button>

      <div className="min-w-[70px] rounded-xl border border-white/10 px-3 py-2 text-center text-sm text-zinc-400">
        {Math.round(zoom * 100)}%
      </div>

      <button
        type="button"
        onClick={onZoomIn}
        title="Zoom in"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white"
      >
        <Plus size={17} />
      </button>

      <button
        type="button"
        onClick={onReset}
        title="Reset zoom"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white"
      >
        <RotateCcw size={17} />
      </button>

      <button
        type="button"
        title="Fit diagram"
        onClick={onReset}
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-zinc-400 transition hover:bg-white/5 hover:text-white"
      >
        <Maximize2 size={17} />
      </button>
    </div>
  );
}