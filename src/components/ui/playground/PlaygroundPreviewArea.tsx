/**
 * ==========================================================================
 * PlaygroundPreviewArea - Área de Preview Padronizada
 * ==========================================================================
 *
 * Componente que renderiza a área de preview do playground com:
 * - Background com grid pattern
 * - Suporte a tema light/dark
 * - Container responsivo
 * - Bordas e estilos consistentes
 */

import React from "react";

interface PlaygroundPreviewAreaProps {
  /** Modo escuro ativo */
  isDarkMode: boolean;
  /** Altura mínima da área */
  minHeight?: string;
  /** Centralizar conteúdo */
  centered?: boolean;
  /** Classes adicionais */
  className?: string;
  /** Conteúdo do preview */
  children: React.ReactNode;
}

export function PlaygroundPreviewArea({
  isDarkMode,
  minHeight = "300px",
  centered = true,
  className = "",
  children,
}: PlaygroundPreviewAreaProps) {
  return (
    <div
      className={`rounded-lg p-8 transition-all duration-300 ${
        centered ? "flex items-center justify-center" : ""
      } ${className}`}
      style={{
        minHeight,
        backgroundColor: isDarkMode ? "#1a1a2e" : "#f8f9fa",
        backgroundImage: isDarkMode
          ? "radial-gradient(circle, #2d2d44 1px, transparent 1px)"
          : "radial-gradient(circle, #e0e0e0 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        border: `1px solid ${isDarkMode ? "#2d2d44" : "#e5e5e5"}`,
      }}
    >
      {children}
    </div>
  );
}
