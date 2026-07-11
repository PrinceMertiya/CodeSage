import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileCode2,
} from "lucide-react";

import type { TreeNode } from "../../constants/fileExplorer";

interface Props {
  node: TreeNode;
  level?: number;
  selectedFile?: string;
  onSelect: (node: TreeNode) => void;
}

export default function RepositoryTreeNode({
  node,
  level = 0,
  selectedFile,
  onSelect,
}: Props) {
  const [open, setOpen] = useState(level === 0);

  if (node.type === "file") {
    return (
      <button
        onClick={() => onSelect(node)}
        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${selectedFile === node.path
            ? "bg-indigo-500/15 text-indigo-400"
            : "text-zinc-300 hover:bg-white/5"
          }`} style={{ paddingLeft: `${level * 18 + 12}px` }}
      >
        <FileCode2 size={16} />
        {node.name}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-white/5"
        style={{ paddingLeft: `${level * 18 + 12}px` }}
      >
        {open ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronRight size={16} />
        )}

        {open ? (
          <FolderOpen size={16} />
        ) : (
          <Folder size={16} />
        )}

        {node.name}
      </button>

      {open &&
        node.children?.map((child) => (
          <RepositoryTreeNode
    key={child.id || child.path}
    node={child}
    level={level + 1}
    selectedFile={selectedFile}
    onSelect={onSelect}
/>
        ))}
    </>
  );
}