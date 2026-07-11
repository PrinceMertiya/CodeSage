import { useState } from "react";
import { FileCode2 } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { fileContents } from "../../constants/fileContents";

import CodeToolbar from "./CodeToolbar";
import AIAssistantPanel from "../chat/AIAssistantPanel";

interface Props {
  selectedFile?: string;
}

const getLanguage = (file?: string) => {
  if (!file) return "text";

  if (file.endsWith(".tsx")) return "tsx";
  if (file.endsWith(".ts")) return "typescript";
  if (file.endsWith(".jsx")) return "jsx";
  if (file.endsWith(".js")) return "javascript";
  if (file.endsWith(".json")) return "json";
  if (file.endsWith(".css")) return "css";
  if (file.endsWith(".html")) return "html";

  return "text";
};

export default function RepositoryCodeViewer({
  selectedFile,
}: Props) {
  const [openAI, setOpenAI] = useState(false);

  if (!selectedFile) {
    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl border border-white/10 bg-[#0D1117]">
        <div className="text-center">
          <FileCode2
            size={64}
            className="mx-auto mb-6 text-zinc-600"
          />

          <h2 className="text-2xl font-semibold text-white">
            Select a file
          </h2>

          <p className="mt-3 text-zinc-500">
            Choose a file from the explorer to preview its
            contents.
          </p>
        </div>
      </div>
    );
  }

  const code =
    fileContents[selectedFile] ??
    "// File content unavailable";

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1117]">
        <CodeToolbar
          fileName={selectedFile}
          onCopy={copyCode}
          onExplain={() => setOpenAI(true)}
        />

        <div className="border-b border-white/10 px-6 py-3 text-sm text-zinc-400">
          src / components / {selectedFile}
        </div>

        <SyntaxHighlighter
          language={getLanguage(selectedFile)}
          style={oneDark}
          showLineNumbers
          wrapLongLines
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: "24px",
            minHeight: "650px",
            fontSize: "14px",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <AIAssistantPanel
        open={openAI}
        onClose={() => setOpenAI(false)}
      />
    </>
  );
}