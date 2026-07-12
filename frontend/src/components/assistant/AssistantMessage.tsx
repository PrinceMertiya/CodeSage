import {
  Bot,
  ExternalLink,
  FileCode2,
  User,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

export interface ChatSource {
  file: string;
  title?: string;
  type?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: ChatSource[];
}

interface Props {
  message: ChatMessage;
}

export default function AssistantMessage({
  message,
}: Props) {
  const navigate = useNavigate();

  const { id: repositoryId } =
    useParams<{
      id: string;
    }>();

  const isUser =
    message.role === "user";

  /*
  |--------------------------------------------------------------------------
  | Remove Duplicate Sources
  |--------------------------------------------------------------------------
  */

  const uniqueSources =
    message.sources?.filter(
      (
        source,
        index,
        sources,
      ) =>
        index ===
        sources.findIndex(
          (item) =>
            item.file ===
            source.file,
        ),
    ) ?? [];

  /*
  |--------------------------------------------------------------------------
  | Open Source File
  |--------------------------------------------------------------------------
  */

  const handleSourceClick = (
    filePath: string,
  ) => {
    if (!repositoryId) {
      return;
    }

    const searchParams =
      new URLSearchParams();

    searchParams.set(
      "path",
      filePath,
    );

    navigate(
      `/repositories/${repositoryId}/files?${searchParams.toString()}`,
    );
  };

  return (
    <div
      className={`flex gap-4 ${
        isUser
          ? "justify-end"
          : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-400">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-[75%] ${
          isUser
            ? ""
            : "w-full"
        }`}
      >
        <div
          className={`rounded-2xl px-5 py-4 ${
            isUser
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
              : "border border-white/10 bg-white/[0.03] text-zinc-300"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm leading-7">
            {message.content}
          </p>
        </div>

        {!isUser &&
          uniqueSources.length >
            0 && (
            <div className="mt-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">
                Sources used
              </p>

              <div className="flex flex-wrap gap-2">
                {uniqueSources.map(
                  (
                    source,
                    index,
                  ) => (
                    <button
                      key={`${source.file}-${index}`}
                      type="button"
                      onClick={() =>
                        handleSourceClick(
                          source.file,
                        )
                      }
                      title={`Open ${source.file}`}
                      className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
                    >
                      <FileCode2
                        size={14}
                        className="shrink-0 text-indigo-400"
                      />

                      <span className="max-w-[260px] truncate">
                        {source.file}
                      </span>

                      <ExternalLink
                        size={12}
                        className="shrink-0 text-zinc-600 transition group-hover:text-indigo-400"
                      />
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
          <User size={20} />
        </div>
      )}
    </div>
  );
}