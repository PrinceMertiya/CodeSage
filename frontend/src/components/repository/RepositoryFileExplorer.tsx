import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  FolderTree,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import type { TreeNode } from "../../constants/fileExplorer";
import { RepositoryService } from "../../services/repository.service";

import RepositoryTreeNode from "./RepositoryTreeNode";
import ExplorerSearch from "./ExplorerSearch";

interface Props {
  repositoryId: string;
  selectedFile?: string;
  onSelect: (node: TreeNode) => void;
}

function filterTree(
  nodes: TreeNode[],
  searchTerm: string,
): TreeNode[] {
  const query = searchTerm.trim().toLowerCase();

  if (!query) {
    return nodes;
  }

  return nodes.reduce<TreeNode[]>((result, node) => {
    const filteredChildren = node.children
      ? filterTree(node.children, query)
      : [];

    const matchesSearch = node.name
      .toLowerCase()
      .includes(query);

    if (matchesSearch || filteredChildren.length > 0) {
      result.push({
        ...node,
        children:
          node.type === "folder"
            ? filteredChildren
            : node.children,
      });
    }

    return result;
  }, []);
}

export default function RepositoryFileExplorer({
  repositoryId,
  selectedFile,
  onSelect,
}: Props) {
  const [search, setSearch] = useState("");
  const [tree, setTree] = useState<TreeNode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchRepositoryTree = async () => {
      try {
        const response =
          await RepositoryService.getTree(repositoryId);

        if (cancelled) {
          return;
        }

        const repositoryTree: TreeNode[] =
          response.data.tree ?? response.data;

        setTree(repositoryTree);
        setError(null);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load repository tree:",
          error,
        );

        setTree([]);
        setError(
          "Unable to load the repository files.",
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchRepositoryTree();

    return () => {
      cancelled = true;
    };
  }, [repositoryId, retryCount]);

  const filteredTree = useMemo(
    () => filterTree(tree, search),
    [tree, search],
  );

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setRetryCount((count) => count + 1);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02]">
      <div className="flex items-center gap-3 border-b border-white/10 p-5">
        <FolderTree
          size={20}
          className="shrink-0 text-indigo-400"
        />

        <div className="min-w-0">
          <h2 className="font-semibold">
            Explorer
          </h2>

          <p className="text-xs text-zinc-500">
            Repository Files
          </p>
        </div>
      </div>

      <ExplorerSearch
        value={search}
        onChange={setSearch}
      />

      <div className="min-h-[560px] p-3">
        {isLoading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <LoaderCircle
              size={28}
              className="animate-spin text-indigo-400"
            />

            <p className="mt-4 text-sm text-zinc-400">
              Loading repository files...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
            <AlertCircle
              size={30}
              className="text-red-400"
            />

            <p className="mt-4 text-sm text-zinc-400">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRetry}
              className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/5"
            >
              <RefreshCw size={15} />
              Try Again
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          filteredTree.length === 0 && (
            <div className="flex min-h-[300px] items-center justify-center px-6 text-center">
              <p className="text-sm text-zinc-500">
                {search
                  ? `No files found for "${search}".`
                  : "This repository does not contain any files."}
              </p>
            </div>
          )}

        {!isLoading &&
          !error &&
          filteredTree.map((node) => (
            <RepositoryTreeNode
              key={node.path}
              node={node}
              selectedFile={selectedFile}
              onSelect={onSelect}
            />
          ))}
      </div>
    </div>
  );
}