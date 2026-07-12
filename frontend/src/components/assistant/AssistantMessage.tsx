import {
  Bot,
  User,
} from "lucide-react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: ChatMessage;
}

export default function AssistantMessage({
  message,
}: Props) {
  const isUser =
    message.role === "user";

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
        className={`max-w-[75%] rounded-2xl px-5 py-4 ${
          isUser
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
            : "border border-white/10 bg-white/[0.03] text-zinc-300"
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-7">
          {message.content}
        </p>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
          <User size={20} />
        </div>
      )}
    </div>
  );
}