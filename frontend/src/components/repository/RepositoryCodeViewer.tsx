import {
  useEffect,
  useState,
} from "react";

import {
  AlertCircle,
  FileCode2,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import {
  oneDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import {
  RepositoryService,
} from "../../services/repository.service";

import type {
  RepositoryFile,
} from "../../services/repository.service";

import CodeToolbar from "./CodeToolbar";
import AIAssistantPanel from "../chat/AIAssistantPanel";


interface Props {
  repositoryId: string;
  selectedFile?: string;
}


const getLanguage = (
  file?: RepositoryFile,
) => {

  if (!file) {
    return "text";
  }


  /*
   * Prefer the file extension because
   * SyntaxHighlighter expects Prism
   * language identifiers.
   */

  const extension =
    file.extension?.toLowerCase();


  if (extension === ".tsx") {
    return "tsx";
  }

  if (extension === ".ts") {
    return "typescript";
  }

  if (extension === ".jsx") {
    return "jsx";
  }

  if (extension === ".js") {
    return "javascript";
  }

  if (extension === ".json") {
    return "json";
  }

  if (extension === ".css") {
    return "css";
  }

  if (extension === ".scss") {
    return "scss";
  }

  if (extension === ".html") {
    return "html";
  }

  if (extension === ".py") {
    return "python";
  }

  if (extension === ".java") {
    return "java";
  }

  if (extension === ".cpp") {
    return "cpp";
  }

  if (extension === ".c") {
    return "c";
  }

  if (extension === ".cs") {
    return "csharp";
  }

  if (extension === ".go") {
    return "go";
  }

  if (extension === ".sql") {
    return "sql";
  }

  if (extension === ".md") {
    return "markdown";
  }

  if (extension === ".yml") {
    return "yaml";
  }

  if (extension === ".yaml") {
    return "yaml";
  }


  return "text";
};


export default function RepositoryCodeViewer({
  repositoryId,
  selectedFile,
}: Props) {

  const [file, setFile] =
    useState<RepositoryFile | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [retryCount, setRetryCount] =
    useState(0);

  const [openAI, setOpenAI] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | Load Selected File
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (
      !repositoryId ||
      !selectedFile
    ) {
      return;
    }

    let cancelled = false;


    const fetchFile = async () => {

      try {

        setIsLoading(true);

        setError(null);


        const response =
          await RepositoryService.getFile(
            repositoryId,
            selectedFile,
          );


        if (cancelled) {
          return;
        }


        setFile(
          response.data.file,
        );

      } catch (error) {

        if (cancelled) {
          return;
        }


        console.error(
          "Failed to load repository file:",
          error,
        );


        setFile(null);

        setError(
          "Unable to load this file.",
        );

      } finally {

        if (!cancelled) {

          setIsLoading(false);

        }

      }

    };


    void fetchFile();


    return () => {

      cancelled = true;

    };

  }, [
    repositoryId,
    selectedFile,
    retryCount,
  ]);


  /*
  |--------------------------------------------------------------------------
  | Copy Code
  |--------------------------------------------------------------------------
  */

  const copyCode = async () => {

    if (!file?.content) {
      return;
    }


    await navigator.clipboard.writeText(
      file.content,
    );

  };


  /*
  |--------------------------------------------------------------------------
  | Retry
  |--------------------------------------------------------------------------
  */

  const handleRetry = () => {

    setError(null);

    setRetryCount(
      (count) => count + 1,
    );

  };


  /*
  |--------------------------------------------------------------------------
  | No File Selected
  |--------------------------------------------------------------------------
  */

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
            Choose a file from the explorer
            to preview its contents.
          </p>

        </div>

      </div>
    );

  }


  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (isLoading) {

    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl border border-white/10 bg-[#0D1117]">

        <div className="text-center">

          <LoaderCircle
            size={40}
            className="mx-auto animate-spin text-indigo-400"
          />

          <p className="mt-4 text-sm text-zinc-400">
            Loading file...
          </p>

          <p className="mt-2 max-w-md truncate text-xs text-zinc-600">
            {selectedFile}
          </p>

        </div>

      </div>
    );

  }


  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {

    return (
      <div className="flex h-[700px] items-center justify-center rounded-3xl border border-white/10 bg-[#0D1117]">

        <div className="text-center">

          <AlertCircle
            size={40}
            className="mx-auto text-red-400"
          />

          <h2 className="mt-5 text-xl font-semibold">
            Unable to load file
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="mx-auto mt-6 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm font-medium transition hover:bg-white/5"
          >
            <RefreshCw size={15} />

            Try Again
          </button>

        </div>

      </div>
    );

  }


  if (!file) {

    return null;

  }


  return (
    <>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0D1117]">

        <CodeToolbar
          fileName={file.name}
          onCopy={copyCode}
          onExplain={() =>
            setOpenAI(true)
          }
        />


        <div className="border-b border-white/10 px-6 py-3 text-sm text-zinc-400">

          {file.relativePath}

        </div>


        <SyntaxHighlighter
          language={getLanguage(file)}
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

          {file.content}

        </SyntaxHighlighter>

      </div>


      <AIAssistantPanel
        open={openAI}
        onClose={() =>
          setOpenAI(false)
        }
      />

    </>
  );

}