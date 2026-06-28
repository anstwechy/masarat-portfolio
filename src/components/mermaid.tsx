"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders a Mermaid diagram. Loads the mermaid library from the npm package
 * on mount (client-only), so it works in static export.
 */
export function Mermaid({
  chart,
  id,
}: {
  chart: string;
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#0f1a2e",
            primaryTextColor: "#e8ecf4",
            primaryBorderColor: "#2dd4bf",
            lineColor: "#5eead4",
            secondaryColor: "#111827",
            tertiaryColor: "#0a0f1a",
            background: "#0a0f1a",
            mainBkg: "#0f1a2e",
            nodeBorder: "#2dd4bf",
            fontSize: "14px",
          },
        });
        const result = await mermaid.render(`mmd-${id}`, chart);
        if (!cancelled) setSvg(result.svg);
      } catch {
        if (!cancelled) setError(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id]);

  if (error) {
    return (
      <pre className="overflow-x-auto rounded-lg border border-white/8 bg-white/[0.02] p-4 text-xs text-slate-400">
        {chart}
      </pre>
    );
  }

  return (
    <div
      ref={ref}
      className="flex items-center justify-center overflow-x-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {!svg && (
        <div className="h-48 animate-pulse rounded-lg bg-white/[0.02]" />
      )}
    </div>
  );
}
