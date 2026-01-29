/**
 * ==========================================================================
 * PlaygroundControls - Controles Padronizados do Playground
 * ==========================================================================
 *
 * Componentes para controles do playground:
 * - ControlSection: Seção com label e controles
 * - ButtonGroupControl: Grupo de botões para seleção
 * - ColorPickerControl: Seletor de cores com preview
 * - BrandPickerControl: Seletor de brands
 * - ToggleControl: Switch on/off
 */

import React from "react";
import { PlaygroundButton } from "../PlaygroundButton";
import { Sun, Moon } from "lucide-react";
import type { Variant, BrandColor, SemanticColor, FeedbackColor } from "./types";

// ==========================================================================
// CONTROL SECTION
// ==========================================================================

interface ControlSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function ControlSection({ label, children, className = "" }: ControlSectionProps) {
  return (
    <div className={className}>
      <label
        className="text-xs font-medium mb-2 block uppercase tracking-wider"
        style={{ color: "var(--jtech-text-muted)" }}
      >
        {label}
      </label>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

// ==========================================================================
// THEME TOGGLE
// ==========================================================================

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function ThemeToggle({ isDarkMode, onToggle }: ThemeToggleProps) {
  return (
    <div className="flex justify-end">
      <PlaygroundButton
        onClick={onToggle}
        isSelected={isDarkMode}
        selectedBg="var(--dss-jtech-accent)"
        selectedColor="#ffffff"
      >
        <div className="flex items-center gap-2">
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span>{isDarkMode ? "Light" : "Dark"}</span>
        </div>
      </PlaygroundButton>
    </div>
  );
}

// ==========================================================================
// VARIANT SELECTOR
// ==========================================================================

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: string;
  onSelect: (variant: string) => void;
}

export function VariantSelector({ variants, selectedVariant, onSelect }: VariantSelectorProps) {
  return (
    <ControlSection label="Variante">
      {variants.map((v) => (
        <PlaygroundButton
          key={v.name}
          onClick={() => onSelect(v.name)}
          isSelected={selectedVariant === v.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          {v.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// COLOR PICKER (SEMANTIC + FEEDBACK)
// ==========================================================================

interface ColorPickerProps {
  label?: string;
  colors: Array<SemanticColor | (FeedbackColor & { icon?: React.ComponentType<{ className?: string }> })>;
  selectedColor: string | null;
  onSelect: (color: string) => void;
  showColorDot?: boolean;
}

export function ColorPicker({
  label = "Cor Semântica",
  colors,
  selectedColor,
  onSelect,
  showColorDot = true,
}: ColorPickerProps) {
  return (
    <ControlSection label={label}>
      {colors.map((c) => (
        <PlaygroundButton
          key={c.name}
          onClick={() => onSelect(c.name)}
          isSelected={selectedColor === c.name}
          selectedBg={c.bg}
          selectedColor="#ffffff"
          selectedBorder={c.bg}
        >
          <div className="flex items-center gap-1.5">
            {showColorDot && (
              <div
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ backgroundColor: c.bg }}
              />
            )}
            <span>{c.label}</span>
          </div>
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// BRAND PICKER
// ==========================================================================

interface BrandPickerProps {
  brands: Record<string, BrandColor>;
  selectedBrand: string | null;
  onSelect: (brand: string) => void;
}

export function BrandPicker({ brands, selectedBrand, onSelect }: BrandPickerProps) {
  return (
    <ControlSection label="Brand">
      {Object.values(brands).map((b) => (
        <PlaygroundButton
          key={b.name}
          onClick={() => onSelect(b.name)}
          isSelected={selectedBrand === b.name}
          selectedBg={b.principal}
          selectedColor="#ffffff"
          selectedBorder={b.principal}
        >
          <div className="flex items-center gap-1.5">
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </div>
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// SIZE SELECTOR
// ==========================================================================

interface SizeSelectorProps {
  sizes: Array<{ name: string; label: string; isDefault?: boolean }>;
  selectedSize: string;
  onSelect: (size: string) => void;
}

export function SizeSelector({ sizes, selectedSize, onSelect }: SizeSelectorProps) {
  return (
    <ControlSection label="Tamanho">
      {sizes.map((s) => (
        <PlaygroundButton
          key={s.name}
          onClick={() => onSelect(s.name)}
          isSelected={selectedSize === s.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          {s.label}
          {s.isDefault && (
            <span className="text-[10px] opacity-60 ml-1">(default)</span>
          )}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// TOGGLE GROUP (Boolean States)
// ==========================================================================

interface ToggleOption {
  name: string;
  label: string;
  icon?: React.ReactNode;
}

interface ToggleGroupProps {
  label?: string;
  options: ToggleOption[];
  values: Record<string, boolean>;
  onToggle: (name: string) => void;
}

export function ToggleGroup({ label = "Estados", options, values, onToggle }: ToggleGroupProps) {
  return (
    <ControlSection label={label}>
      {options.map((opt) => (
        <PlaygroundButton
          key={opt.name}
          onClick={() => onToggle(opt.name)}
          isSelected={values[opt.name] || false}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          {opt.icon && <span className="mr-1">{opt.icon}</span>}
          {opt.label}
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}

// ==========================================================================
// ICON SELECTOR
// ==========================================================================

interface IconOption {
  name: string;
  label: string;
  icon: React.ReactNode;
}

interface IconSelectorProps {
  label?: string;
  icons: IconOption[];
  selectedIcon: string | null;
  onSelect: (icon: string | null) => void;
  allowNone?: boolean;
}

export function IconSelector({
  label = "Ícone",
  icons,
  selectedIcon,
  onSelect,
  allowNone = true,
}: IconSelectorProps) {
  return (
    <ControlSection label={label}>
      {allowNone && (
        <PlaygroundButton
          onClick={() => onSelect(null)}
          isSelected={selectedIcon === null}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          Nenhum
        </PlaygroundButton>
      )}
      {icons.map((i) => (
        <PlaygroundButton
          key={i.name}
          onClick={() => onSelect(i.name)}
          isSelected={selectedIcon === i.name}
          selectedBg="var(--dss-jtech-accent)"
          selectedColor="#ffffff"
        >
          <div className="flex items-center gap-1.5">
            {i.icon}
            <span>{i.label}</span>
          </div>
        </PlaygroundButton>
      ))}
    </ControlSection>
  );
}
