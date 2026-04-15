import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { queryComponent } from "./queryComponent.js";
import { queryToken } from "./queryToken.js";
import { checkCompliance } from "./checkCompliance.js";
import { getTodoListStatus } from "./getTodoListStatus.js";
import { validatePrePrompt } from "./validatePrePrompt.js";
import { validateComponentCode } from "./validateComponentCode.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
// After tsup bundle: __dirname = mcp/build/ → go up 2 levels to reach DSS root
const DSS_ROOT = resolve(__dirname, "../..");

// ─── Input Schemas (Zod) ──────────────────────────────────────────────────────

const QueryComponentSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
    ),
});

const QueryTokenSchema = z.object({
  tokenName: z
    .string()
    .optional()
    .describe(
      'Exact token name (e.g. "--dss-color-brand-primary", "--dss-spacing-md"). Takes precedence over category.'
    ),
  category: z
    .string()
    .optional()
    .describe(
      'Token category to search (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").'
    ),
});

const CheckComplianceSchema = z.object({
  context: z
    .string()
    .describe(
      'Description of the usage to evaluate (e.g. "Using DssCard with border-radius of 8px hardcoded").'
    ),
  ruleType: z
    .enum(["composition", "token", "accessibility"])
    .describe(
      '"composition" — layer structure, pseudo-elements, SCSS patterns. "token" — token usage, hardcoded values. "accessibility" — WCAG rules, touch target, ARIA.'
    ),
});

const GetTodoListStatusSchema = z.object({
  filter: z
    .enum(["all", "pending", "sealed", "blocked"])
    .optional()
    .default("all")
    .describe(
      'Filter results: "all" returns everything, "pending" returns only actionable items, "sealed" returns completed items, "blocked" returns blocked items.'
    ),
});

const ValidatePrePromptSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component whose pre-prompt should be validated (e.g. "DssBtnGroup", "DssTab"). Case-sensitive, Dss prefix required.'
    ),
});

const ValidateComponentCodeSchema = z.object({
  componentName: z
    .string()
    .describe(
      'Name of the DSS component to validate (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.'
    ),
});

// ─── Tool Definitions ─────────────────────────────────────────────────────────

const TOOL_DEFINITIONS = [
  // ── Phase 1 Tools ──────────────────────────────────────────────────────────
  {
    name: "query_component",
    description:
      "Returns detailed information about a specific DSS component: compliance status, phase, golden references, props, pre-prompt and documentation. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component (e.g. "DssCard", "DssButton", "card"). Case-insensitive, Dss prefix optional.',
        },
      },
      required: ["componentName"],
    },
  },
  {
    name: "query_token",
    description:
      "Searches DSS_TOKEN_REFERENCE.md for a specific token or token category. Returns the matching section(s) with full documentation. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        tokenName: {
          type: "string",
          description:
            'Exact token name (e.g. "--dss-color-brand-primary"). Optional if category is provided.',
        },
        category: {
          type: "string",
          description:
            'Token category (e.g. "color", "spacing", "radius", "typography", "shadow", "motion", "border").',
        },
      },
    },
  },
  {
    name: "check_compliance",
    description:
      "Evaluates whether a described usage is compliant with DSS governance rules. Strictly descriptive — never corrective. Per MCP_READ_ONLY_CONTRACT.md, the MCP observes and explains but never decides or changes.",
    inputSchema: {
      type: "object" as const,
      properties: {
        context: {
          type: "string",
          description:
            'Description of the usage to evaluate (e.g. "Using brightness(0.93) for hover state in DssButton").',
        },
        ruleType: {
          type: "string",
          enum: ["composition", "token", "accessibility"],
          description:
            '"composition" — layers, pseudo-elements, SCSS. "token" — token usage, hardcoded values. "accessibility" — WCAG, touch target, ARIA.',
        },
      },
      required: ["context", "ruleType"],
    },
  },
  // ── Phase 2 Tools ──────────────────────────────────────────────────────────
  {
    name: "get_todo_list_status",
    description:
      "Returns the current progress of the DSS Phase 2 implementation by parsing DSS_FASE2_TODO.md. Shows sealed, pending, in-progress and blocked components. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        filter: {
          type: "string",
          enum: ["all", "pending", "sealed", "blocked"],
          description:
            'Filter results: "all" (default), "pending" (actionable), "sealed" (completed), "blocked".',
        },
      },
    },
  },
  {
    name: "validate_pre_prompt",
    description:
      "Verifies whether a DSS component pre-prompt covers all 5 mandatory axes required by Phase 2 criteria: (1) Classification, (2) Main Architectural Risk, (3) Mapped API, (4) Tokens, (5) Accessibility & States. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component (e.g. "DssBtnGroup", "DssTab"). Dss prefix required.',
        },
      },
      required: ["componentName"],
    },
  },
  {
    name: "validate_component_code",
    description:
      "Analyzes the source code of a DSS component (Vue + SCSS) and checks for architectural violations: missing 4-layer structure, hardcoded colors (Token First), :deep() usage (Gate de Composição v2.4), and component-specific tokens. Read-Only — no files are modified.",
    inputSchema: {
      type: "object" as const,
      properties: {
        componentName: {
          type: "string",
          description:
            'Name of the DSS component to validate (e.g. "DssCard", "card"). Case-insensitive.',
        },
      },
      required: ["componentName"],
    },
  },
];

// ─── Handler Registration ─────────────────────────────────────────────────────

export function registerTools(server: Server): void {
  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return { tools: TOOL_DEFINITIONS };
  });

  // Execute a tool call
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      // ── Phase 1 ────────────────────────────────────────────────────────────
      case "query_component": {
        const input = QueryComponentSchema.parse(args);
        const result = await queryComponent(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "query_token": {
        const input = QueryTokenSchema.parse(args);
        const result = await queryToken(DSS_ROOT, input.tokenName, input.category);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "check_compliance": {
        const input = CheckComplianceSchema.parse(args);
        const result = await checkCompliance(
          input.context,
          input.ruleType as "composition" | "token" | "accessibility",
          DSS_ROOT
        );
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      // ── Phase 2 ────────────────────────────────────────────────────────────
      case "get_todo_list_status": {
        const input = GetTodoListStatusSchema.parse(args ?? {});
        const result = await getTodoListStatus(DSS_ROOT);

        // Apply filter if requested
        if (input.filter && input.filter !== "all") {
          result.all_items = result.all_items.filter(
            (i) => i.status === input.filter
          );
        }

        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_pre_prompt": {
        const input = ValidatePrePromptSchema.parse(args);
        const result = await validatePrePrompt(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      case "validate_component_code": {
        const input = ValidateComponentCodeSchema.parse(args);
        const result = await validateComponentCode(input.componentName, DSS_ROOT);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }

      default:
        throw new Error(
          `Unknown tool: "${name}". Available tools: ${TOOL_DEFINITIONS.map((t) => t.name).join(", ")}`
        );
    }
  });
}
