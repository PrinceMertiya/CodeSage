import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import AssistantHeader from "./AssistantHeader";
import AssistantInput from "./AssistantInput";
import AssistantMessages from "./AssistantMessages";
import AssistantSuggestions from "./AssistantSuggestions";

import type {
  ChatMessage,
} from "./AssistantMessage";

import {
  RepositoryService,
} from "../../services/repository.service";

interface Props {
  repositoryId: string;
  repositoryName: string;
}

export default function RepositoryAssistant({
  repositoryId,
  repositoryName,
}: Props) {
  const [
    input,
    setInput,
  ] = useState("");

  const [
    messages,
    setMessages,
  ] = useState<ChatMessage[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

  const [
    isHistoryLoading,
    setIsHistoryLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | Load Saved Chat History
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let cancelled = false;

    const loadChatHistory =
      async () => {
        try {
          const response =
            await RepositoryService
              .getChatHistory(
                repositoryId,
              );

          if (cancelled) {
            return;
          }

          /*
          |--------------------------------------------------------------------------
          | Backend returns newest first.
          | Reverse so the conversation displays oldest → newest.
          |--------------------------------------------------------------------------
          */

          const history =
            [...response.data.history]
              .reverse();

          const historyMessages:
            ChatMessage[] =
            history.flatMap(
              (chat) => [
                {
                  id:
                    `${chat.id}-question`,
                  role:
                    "user" as const,
                  content:
                    chat.question,
                },
                {
  id:
    `${chat.id}-answer`,
  role:
    "assistant" as const,
  content:
    chat.answer,
  sources:
    Array.isArray(
      chat.sources,
    )
      ? chat.sources
      : [],
},
              ],
            );

          setMessages(
            historyMessages,
          );

          setError(null);
        } catch (error) {
          if (cancelled) {
            return;
          }

          console.error(
            "Failed to load chat history:",
            error,
          );

          setError(
            "Unable to load previous chat history.",
          );
        } finally {
          if (!cancelled) {
            setIsHistoryLoading(
              false,
            );
          }
        }
      };

    void loadChatHistory();

    return () => {
      cancelled = true;
    };
  }, [repositoryId]);

  /*
  |--------------------------------------------------------------------------
  | Send Message
  |--------------------------------------------------------------------------
  */

  const sendMessage = async (
    customMessage?: string,
  ) => {
    const content =
      customMessage?.trim() ||
      input.trim();

    if (
      !content ||
      isLoading
    ) {
      return;
    }

    const userMessage:
      ChatMessage = {
        id:
          crypto.randomUUID(),
        role: "user",
        content,
      };

    setMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    );

    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response =
        await RepositoryService
          .chat(
            repositoryId,
            content,
          );

      const {
        answer,
        sources
      } = response.data;

      if (!answer) {
        throw new Error(
          "The AI API returned no answer.",
        );
      }

      const assistantMessage:
  ChatMessage = {
    id:
      crypto.randomUUID(),
    role:
      "assistant",
    content:
      answer,
    sources:
      Array.isArray(sources)
        ? sources
        : [],
  };

      setMessages(
        (current) => [
          ...current,
          assistantMessage,
        ],
      );
    } catch (error) {
      console.error(
        "Repository AI chat failed:",
        error,
      );

      let message =
        "Unable to get a response from CodeSage AI.";

      if (
        axios.isAxiosError(
          error,
        )
      ) {
        const apiMessage =
          error.response
            ?.data
            ?.message;

        if (
          typeof apiMessage ===
          "string"
        ) {
          message =
            apiMessage;
        }
      } else if (
        error instanceof Error
      ) {
        message =
          error.message;
      }

      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading Chat History
  |--------------------------------------------------------------------------
  */

  if (isHistoryLoading) {
    return (
      <div className="flex min-h-[700px] items-center justify-center rounded-3xl border border-white/10 bg-[#0D1117]">
        <p className="text-sm text-zinc-400">
          Loading conversation...
        </p>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="flex min-h-[700px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0D1117]">
      <AssistantHeader
        repositoryName={
          repositoryName
        }
      />

      {messages.length === 0 ? (
        <AssistantSuggestions
          onSelect={(
            suggestion,
          ) => {
            void sendMessage(
              suggestion,
            );
          }}
        />
      ) : (
        <AssistantMessages
          messages={
            messages
          }
          isLoading={
            isLoading
          }
        />
      )}

      {error && (
        <div className="mx-5 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <AssistantInput
        value={input}
        onChange={
          setInput
        }
        onSubmit={() => {
          void sendMessage();
        }}
        isLoading={
          isLoading
        }
      />
    </div>
  );
}