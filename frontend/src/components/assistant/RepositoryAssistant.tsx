import {
  useState,
} from "react";

import AssistantHeader from "./AssistantHeader";
import AssistantInput from "./AssistantInput";
import AssistantMessages from "./AssistantMessages";
import AssistantSuggestions from "./AssistantSuggestions";

import type {
  ChatMessage,
} from "./AssistantMessage";

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
  ] = useState<ChatMessage[]>(
    [],
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(false);

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

    const userMessage: ChatMessage =
      {
        id: crypto.randomUUID(),
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
    setIsLoading(true);

    /*
    |--------------------------------------------------------------------------
    | Temporary Frontend Response
    |--------------------------------------------------------------------------
    |
    | We will replace this with the real
    | CodeSage repository chat API next.
    |
    */

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          800,
        ),
    );

    const assistantMessage: ChatMessage =
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          `I received your question about ${repositoryName}.\n\n` +
          `Repository ID: ${repositoryId}\n\n` +
          `The frontend assistant is working. The next step is connecting this conversation to the CodeSage backend AI chat API.`,
      };

    setMessages(
      (current) => [
        ...current,
        assistantMessage,
      ],
    );

    setIsLoading(false);
  };

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
          messages={messages}
          isLoading={
            isLoading
          }
        />
      )}

      <AssistantInput
        value={input}
        onChange={setInput}
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