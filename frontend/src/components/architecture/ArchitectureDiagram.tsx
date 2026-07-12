import {
  useEffect,
  useId,
  useState,
} from "react";

import mermaid from "mermaid";

import {
  AlertCircle,
  LoaderCircle,
} from "lucide-react";

interface Props {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter, sans-serif",
});

export default function ArchitectureDiagram({
  chart,
}: Props) {
  const reactId = useId();

  const diagramId = `mermaid-${reactId.replace(
    /:/g,
    "",
  )}`;

  const [svg, setSvg] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [isRendering, setIsRendering] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    const renderDiagram = async () => {
      try {
        const result =
          await mermaid.render(
            diagramId,
            chart,
          );

        if (cancelled) {
          return;
        }

        setSvg(result.svg);
        setError(null);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to render Mermaid diagram:",
          error,
        );

        setError(
          "Unable to render this architecture diagram.",
        );
      } finally {
        if (!cancelled) {
          setIsRendering(false);
        }
      }
    };

    void renderDiagram();

    return () => {
      cancelled = true;
    };
  }, [chart, diagramId]);

  if (isRendering) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-indigo-400"
          />

          <p className="mt-4 text-sm text-zinc-400">
            Rendering architecture...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[600px] items-center justify-center">
        <div className="max-w-md text-center">
          <AlertCircle
            size={40}
            className="mx-auto text-red-400"
          />

          <h3 className="mt-4 text-lg font-semibold">
            Diagram rendering failed
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        flex
        min-h-[600px]
        min-w-max
        items-center
        justify-center
        p-10
        [&_svg]:h-auto
        [&_svg]:max-w-none
      "
      dangerouslySetInnerHTML={{
        __html: svg,
      }}
    />
  );
}