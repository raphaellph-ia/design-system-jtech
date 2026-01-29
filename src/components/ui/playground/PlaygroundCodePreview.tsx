/**
 * ==========================================================================
 * PlaygroundCodePreview - Preview de Código Gerado
 * ==========================================================================
 *
 * Componente para exibir o código gerado com:
 * - Syntax highlighting visual
 * - Botão de copiar
 * - Indicação de token utilizado
 */

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface PlaygroundCodePreviewProps {
  /** Código a ser exibido */
  code: string;
  /** Token DSS principal em uso (opcional) */
  activeToken?: string;
  /** Valor do token (opcional) */
  tokenValue?: string;
  /** Label do header */
  label?: string;
  /** Altura máxima do container */
  maxHeight?: string;
}

export function PlaygroundCodePreview({
  code,
  activeToken,
  tokenValue,
  label = "Código",
  maxHeight = "200px",
}: PlaygroundCodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="space-y-2">
      {/* Header com label e botão de copiar */}
      <div className="flex items-center justify-between">
        <label
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: "var(--jtech-text-muted)" }}
        >
          {label}
        </label>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-all hover:bg-white/10"
          style={{ color: "var(--dss-jtech-accent)" }}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar</span>
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          backgroundColor: "#1e1e2e",
          border: "1px solid #313244",
        }}
      >
        <pre
          className="p-4 text-xs font-mono overflow-auto"
          style={{
            color: "#cdd6f4",
            maxHeight,
            margin: 0,
          }}
        >
          <code>{code}</code>
        </pre>
      </div>

      {/* Token indicator (opcional) */}
      {activeToken && (
        <div
          className="flex items-center gap-2 text-[10px] font-mono px-3 py-1.5 rounded"
          style={{
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            border: "1px solid rgba(139, 92, 246, 0.2)",
            color: "var(--dss-jtech-accent)",
          }}
        >
          <span className="opacity-60">Token:</span>
          <span className="font-semibold">{activeToken}</span>
          {tokenValue && (
            <>
              <span className="opacity-40">→</span>
              <span
                className="px-1.5 py-0.5 rounded"
                style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
              >
                {tokenValue}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
