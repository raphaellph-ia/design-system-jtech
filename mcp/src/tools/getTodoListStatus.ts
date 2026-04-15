import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface TodoItem {
  name: string;
  status: "sealed" | "in_progress" | "pending" | "blocked";
  family: string;
}

interface TodoListResult {
  found: boolean;
  summary: {
    total: number;
    sealed: number;
    in_progress: number;
    pending: number;
    blocked: number;
    progress_pct: number;
  };
  next_available: TodoItem[];
  all_items: TodoItem[];
  raw_note: string;
}

/**
 * get_todo_list_status — Read-Only
 *
 * Parses DSS_FASE2_TODO.md and returns structured progress data.
 * Never writes or modifies any file.
 */
export async function getTodoListStatus(
  dssRoot: string
): Promise<TodoListResult> {
  const todoPath = resolve(dssRoot, "docs/reference/DSS_FASE2_TODO.md");

  if (!existsSync(todoPath)) {
    return {
      found: false,
      summary: { total: 0, sealed: 0, in_progress: 0, pending: 0, blocked: 0, progress_pct: 0 },
      next_available: [],
      all_items: [],
      raw_note: "DSS_FASE2_TODO.md not found.",
    };
  }

  const content = readFileSync(todoPath, "utf-8");
  const lines = content.split("\n");

  const allItems: TodoItem[] = [];
  let currentFamily = "Unknown";

  for (const line of lines) {
    // Detect family heading
    const familyMatch = line.match(/^###\s+Família:\s+(.+)$/);
    if (familyMatch) {
      currentFamily = familyMatch[1].trim();
      continue;
    }

    // Detect checklist items
    // [x] ~~`DssBtnGroup`~~ ✅ **SELADO**
    // [x] ~~`DssBtnDropdown`~~ ✅ **SELADO**
    // [ ] `DssBtnToggle` — ...
    // [ ] 🔒 `DssXxx` — ...
    const sealedMatch = line.match(/^\s*-\s+\[x\].*~~`(\w+)`~~.*✅.*SELADO/);
    const inProgressMatch = line.match(/^\s*-\s+\[x\](?!.*SELADO).*`(\w+)`/);
    const blockedMatch = line.match(/^\s*-\s+\[\s\].*🔒.*`(\w+)`/);
    const pendingMatch = line.match(/^\s*-\s+\[\s\](?!.*🔒).*`(\w+)`/);

    if (sealedMatch) {
      allItems.push({ name: sealedMatch[1], status: "sealed", family: currentFamily });
    } else if (blockedMatch) {
      allItems.push({ name: blockedMatch[1], status: "blocked", family: currentFamily });
    } else if (pendingMatch) {
      allItems.push({ name: pendingMatch[1], status: "pending", family: currentFamily });
    } else if (inProgressMatch) {
      allItems.push({ name: inProgressMatch[1], status: "in_progress", family: currentFamily });
    }
  }

  const sealed = allItems.filter((i) => i.status === "sealed").length;
  const in_progress = allItems.filter((i) => i.status === "in_progress").length;
  const pending = allItems.filter((i) => i.status === "pending").length;
  const blocked = allItems.filter((i) => i.status === "blocked").length;
  const total = allItems.length;
  const progress_pct = total > 0 ? Math.round((sealed / total) * 100) : 0;

  // Next available = pending (not blocked), up to 5
  const next_available = allItems
    .filter((i) => i.status === "pending")
    .slice(0, 5);

  // Extract last-updated note from header
  const lastUpdatedMatch = content.match(/\*\*Última Atualização:\*\*\s*(.+)/);
  const raw_note = lastUpdatedMatch
    ? `Last updated: ${lastUpdatedMatch[1].trim()}`
    : "No update date found.";

  return {
    found: true,
    summary: { total, sealed, in_progress, pending, blocked, progress_pct },
    next_available,
    all_items: allItems,
    raw_note,
  };
}
