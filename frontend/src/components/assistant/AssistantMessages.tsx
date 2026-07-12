import {
  LoaderCircle,
} from "lucide-react";

import AssistantMessage from "./AssistantMessage";

import type {
  ChatMessage,
} from "./AssistantMessage";

interface Props {
  messages: ChatMessage[];
  isLoading?: boolean;
}

export default function AssistantMessages({
  messages,
  isLoading = false,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        {messages.map(
          (message) => (
            <AssistantMessage
              key={message.id}
              message={message}
            />
          ),
        )}

        {isLoading && (
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <LoaderCircle
                size={20}
                className="animate-spin"
              />
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
              <p className="text-sm text-zinc-400">
                CodeSage is analyzing
                the repository...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}