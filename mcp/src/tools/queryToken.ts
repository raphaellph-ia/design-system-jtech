import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

interface TokenQueryResult {
  query: { tokenName?: string; category?: string };
  found: boolean;
  sections: string[];
  summary: string;
}

/**
 * query_token — Read-Only
 *
 * Parses DSS_TOKEN_REFERENCE.md and returns only the section(s) relevant
 * to the requested token name or category.
 * Never writes or modifies any file.
 */
export async function queryToken(
  dssRoot: string,
  tokenName?: string,
  category?: string
): Promise<TokenQueryResult> {
  const tokenRefPath = resolve(
    dssRoot,
    "docs/reference/DSS_TOKEN_REFERENCE.md"
  );

  if (!existsSync(tokenRefPath)) {
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary: "DSS_TOKEN_REFERENCE.md not found in the repository.",
    };
  }

  const content = readFileSync(tokenRefPath, "utf-8");
  const allSections = splitIntoSections(content);

  if (!tokenName && !category) {
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary:
        "Please provide either `tokenName` (e.g. `--dss-spacing-4`) or `category` (e.g. `color`, `spacing`, `radius`).",
    };
  }

  const matchedSections: string[] = [];

  for (const section of allSections) {
    if (tokenName && sectionMatchesToken(section, tokenName)) {
      matchedSections.push(section);
      continue;
    }
    if (category && sectionMatchesCategory(section, category)) {
      matchedSections.push(section);
    }
  }

  if (matchedSections.length === 0) {
    const searchTerm = tokenName ?? category;
    return {
      query: { tokenName, category },
      found: false,
      sections: [],
      summary: `No sections found in DSS_TOKEN_REFERENCE.md matching "${searchTerm}". Try a broader category (e.g. "color", "spacing", "typography", "radius", "shadow", "motion", "border").`,
    };
  }

  return {
    query: { tokenName, category },
    found: true,
    sections: matchedSections,
    summary: `Found ${matchedSections.length} section(s) matching your query. See "sections" for the full content.`,
  };
}

/**
 * Split markdown into top-level (##) sections.
 */
function splitIntoSections(content: string): string[] {
  const lines = content.split("\n");
  const sections: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ") && current.length > 0) {
      sections.push(current.join("\n").trim());
      current = [line];
    } else {
      current.push(line);
    }
  }

  if (current.length > 0) {
    sections.push(current.join("\n").trim());
  }

  return sections.filter((s) => s.length > 0);
}

/**
 * Strip Markdown formatting (backticks, pipes, bold, italic) for plain-text matching.
 * Tokens in the DSS_TOKEN_REFERENCE.md are wrapped in backticks inside table cells,
 * e.g. `--dss-spacing-4`. Stripping backticks allows substring matching to work.
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/`/g, "")
    .replace(/\|/g, " ")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/_/g, " ");
}

function sectionMatchesToken(section: string, tokenName: string): boolean {
  // Match against both raw and stripped content (case-insensitive)
  const stripped = stripMarkdown(section).toLowerCase();
  const raw = section.toLowerCase();
  const query = tokenName.toLowerCase();
  return raw.includes(query) || stripped.includes(query);
}

function sectionMatchesCategory(section: string, category: string): boolean {
  const lower = category.toLowerCase();
  const stripped = stripMarkdown(section).toLowerCase();
  const sectionLower = section.toLowerCase();

  // Match category in headings
  const headingMatch = /^#{1,3} .+$/m;
  const headings = section
    .split("\n")
    .filter((l) => headingMatch.test(l))
    .join(" ")
    .toLowerCase();

  // Match --dss-{category} pattern in stripped content (removes backticks from table cells)
  const tokenPattern = `--dss-${lower}`;

  return (
    headings.includes(lower) ||
    sectionLower.includes(tokenPattern) ||
    stripped.includes(tokenPattern)
  );
}
