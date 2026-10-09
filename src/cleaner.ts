import { CleanEmptyLinesSettings, DEFAULT_SETTINGS } from "./types";

interface LineInfo {
  raw: string;
  isProtected: boolean;
  type:
    | "FRONTMATTER"
    | "CODE_BLOCK"
    | "MATH_BLOCK"
    | "HEADING"
    | "LIST_ITEM"
    | "LIST_CONTINUATION"
    | "THEMATIC_BREAK"
    | "BLANK"
    | "TEXT";
  listIndent?: number;
  listKind?: "ordered" | "unordered";
  headingLevel?: number;
}

const THEMATIC_BREAK_REGEX = /^[ \t]{0,3}(?:(?:-[ \t]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})$/;
const LIST_ITEM_REGEX = /^([ \t]*)(?:([-*+]|\d+[.)]))(?:[ \t]+(.*)|[ \t]*)$/;
const ATX_HEADING_REGEX = /^(#{1,6})(?:[ \t]+.*|[ \t]*)$/;

function getIndentSpaces(whitespace: string): number {
  let count = 0;
  for (const ch of whitespace) {
    if (ch === "\t") {
      count += 4;
    } else {
      count += 1;
    }
  }
  return count;
}

/**
 * Parses lines and marks protected blocks (Frontmatter, Fenced Code, Math).
 */
function tokenizeLines(lines: string[]): LineInfo[] {
  const result: LineInfo[] = [];
  let inCodeBlock = false;
  let codeFenceChar = "";
  let codeFenceLen = 0;
  let inMathBlock = false;

  let lastListIndent = -1;
  let inList = false;

  // Check if document has valid frontmatter block at the top
  let hasValidFrontmatter = false;
  let frontmatterEndLine = -1;
  if (lines.length > 1 && /^---\s*$/.test(lines[0])) {
    for (let j = 1; j < lines.length; j++) {
      if (/^(?:---|\.\.\.)\s*$/.test(lines[j])) {
        hasValidFrontmatter = true;
        frontmatterEndLine = j;
        break;
      }
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const isBlank = /^\s*$/.test(raw);

    // 1. YAML Frontmatter check (only at start of document with matching end)
    if (hasValidFrontmatter && i <= frontmatterEndLine) {
      result.push({ raw, isProtected: true, type: "FRONTMATTER" });
      continue;
    }

    // 2. Fenced Code Block check
    if (inCodeBlock) {
      result.push({ raw, isProtected: true, type: "CODE_BLOCK" });
      const closeFenceRegex = new RegExp(
        `^[ ]{0,3}\\${codeFenceChar}{${codeFenceLen},}[ \\t]*$`
      );
      if (closeFenceRegex.test(raw)) {
        inCodeBlock = false;
        codeFenceChar = "";
        codeFenceLen = 0;
      }
      continue;
    } else {
      const openFenceMatch = raw.match(/^[ ]{0,3}(`{3,}|~{3,})/);
      if (openFenceMatch) {
        inCodeBlock = true;
        codeFenceChar = openFenceMatch[1][0];
        codeFenceLen = openFenceMatch[1].length;
        result.push({ raw, isProtected: true, type: "CODE_BLOCK" });
        inList = false;
        lastListIndent = -1;
        continue;
      }
    }

    // 3. Display Math Block check ($$)
    if (inMathBlock) {
      result.push({ raw, isProtected: true, type: "MATH_BLOCK" });
      if (/^[ ]{0,3}\$\$\s*$/.test(raw)) {
        inMathBlock = false;
      }
      continue;
    } else {
      if (/^[ ]{0,3}\$\$\s*$/.test(raw)) {
        inMathBlock = true;
        result.push({ raw, isProtected: true, type: "MATH_BLOCK" });
        inList = false;
        lastListIndent = -1;
        continue;
      }
    }

    // 4. Blank lines
    if (isBlank) {
      result.push({ raw: "", isProtected: false, type: "BLANK" });
      continue;
    }

    // 5. Thematic Break (horizontal rule, e.g. ---, ***)
    if (THEMATIC_BREAK_REGEX.test(raw)) {
      result.push({ raw, isProtected: false, type: "THEMATIC_BREAK" });
      inList = false;
      lastListIndent = -1;
      continue;
    }

    // 6. ATX Heading
    const headingMatch = raw.match(ATX_HEADING_REGEX);
    if (headingMatch) {
      const headingLevel = headingMatch[1].length;
      result.push({
        raw,
        isProtected: false,
        type: "HEADING",
        headingLevel,
      });
      inList = false;
      lastListIndent = -1;
      continue;
    }

    // 7. List Item
    const listMatch = raw.match(LIST_ITEM_REGEX);
    if (listMatch) {
      const leadingWhitespace = listMatch[1];
      const marker = listMatch[2];
      const indent = getIndentSpaces(leadingWhitespace);
      const isOrdered = /^\d+[.)]$/.test(marker);
      const listKind: "ordered" | "unordered" = isOrdered ? "ordered" : "unordered";

      result.push({
        raw,
        isProtected: false,
        type: "LIST_ITEM",
        listIndent: indent,
        listKind,
      });
      inList = true;
      lastListIndent = indent;
      continue;
    }

    // 8. List Continuation
    // If previously in a list, and this line is indented
    const lineIndent = getIndentSpaces(raw.match(/^(\s*)/)?.[1] || "");
    if (inList && lineIndent >= 2 && lastListIndent >= 0) {
      result.push({
        raw,
        isProtected: false,
        type: "LIST_CONTINUATION",
        listIndent: lineIndent,
      });
      continue;
    }

    // 9. Regular text
    result.push({ raw, isProtected: false, type: "TEXT" });
    inList = false;
    lastListIndent = -1;
  }

  return result;
}

/**
 * Checks if two list items can belong to the same list hierarchy.
 */
function areCompatibleListItems(
  prev: LineInfo,
  next: LineInfo
): boolean {
  if (next.type !== "LIST_ITEM") return false;
  if (prev.type !== "LIST_ITEM" && prev.type !== "LIST_CONTINUATION") return false;

  const nextIndent = next.listIndent ?? 0;
  const prevIndent = prev.listIndent ?? 0;

  // Next is deeper nested: child item
  if (nextIndent > prevIndent) return true;

  // Next is shallower: popping back to parent list
  if (nextIndent < prevIndent) return true;

  // Same indentation: must be same list kind (both ordered or both unordered)
  if (prev.type === "LIST_ITEM") {
    return prev.listKind === next.listKind;
  }

  // If prev was continuation, it belongs to list
  return true;
}

/**
 * Main cleaning function
 */
export function cleanEmptyLines(
  content: string,
  customSettings: Partial<CleanEmptyLinesSettings> = {},
  isSelection = false
): string {
  if (!content) return "";

  const settings: CleanEmptyLinesSettings = {
    ...DEFAULT_SETTINGS,
    ...customSettings,
  };

  // Detect line ending (\r\n vs \n)
  const isCrlf = content.includes("\r\n");
  const newline = isCrlf ? "\r\n" : "\n";
  const rawLines = content.split(/\r?\n/);

  let tokens = tokenizeLines(rawLines);

  // PASS 0: Remove horizontal rules (---)
  if (settings.removeHorizontalRules) {
    tokens = tokens.map((token) => {
      if (!token.isProtected && token.type === "THEMATIC_BREAK") {
        return {
          raw: "",
          isProtected: false,
          type: "BLANK" as const,
        };
      }
      return token;
    });
  }

  // PASS 1: Remove empty lines between list items
  if (settings.removeEmptyLinesInLists) {
    const filtered: LineInfo[] = [];
    let i = 0;
    while (i < tokens.length) {
      if (tokens[i].type === "BLANK") {
        // Collect consecutive blank lines
        let blankStart = i;
        let blankEnd = i;
        while (blankEnd < tokens.length && tokens[blankEnd].type === "BLANK") {
          blankEnd++;
        }

        // Look at preceding non-blank token
        let prevToken: LineInfo | null = null;
        for (let p = blankStart - 1; p >= 0; p--) {
          if (tokens[p].type !== "BLANK") {
            prevToken = tokens[p];
            break;
          }
        }

        // Look at next non-blank token
        let nextToken: LineInfo | null = null;
        for (let n = blankEnd; n < tokens.length; n++) {
          if (tokens[n].type !== "BLANK") {
            nextToken = tokens[n];
            break;
          }
        }

        // Check if blank lines are between list items of the same hierarchy
        if (
          prevToken &&
          nextToken &&
          areCompatibleListItems(prevToken, nextToken)
        ) {
          // Skip these blank lines (remove them)
          i = blankEnd;
          continue;
        } else {
          // Keep blank lines for subsequent passes
          for (let b = blankStart; b < blankEnd; b++) {
            filtered.push(tokens[b]);
          }
          i = blankEnd;
          continue;
        }
      } else {
        filtered.push(tokens[i]);
        i++;
      }
    }
    tokens = filtered;
  }

  // PASS 2: Ensure empty lines around headings
  if (
    settings.ensureEmptyLineBeforeHeading ||
    settings.ensureEmptyLineAfterHeading
  ) {
    const withHeadingSpacing: LineInfo[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const current = tokens[i];

      if (current.type === "HEADING") {
        // --- BEFORE HEADING ---
        if (settings.ensureEmptyLineBeforeHeading) {
          // Check preceding token in withHeadingSpacing
          let prevIndex = withHeadingSpacing.length - 1;
          const prev = prevIndex >= 0 ? withHeadingSpacing[prevIndex] : null;

          if (prev !== null) {
            if (prev.type === "BLANK") {
              // Already has empty line before it
            } else if (prev.type === "HEADING") {
              if (settings.emptyLineBetweenConsecutiveHeadings) {
                withHeadingSpacing.push({
                  raw: "",
                  isProtected: false,
                  type: "BLANK",
                });
              }
            } else {
              // Preceded by text, list, code block, frontmatter, etc.
              withHeadingSpacing.push({
                raw: "",
                isProtected: false,
                type: "BLANK",
              });
            }
          }
        }

        // Add the heading itself
        withHeadingSpacing.push(current);

        // --- AFTER HEADING ---
        if (settings.ensureEmptyLineAfterHeading) {
          // Check next token
          const next = i + 1 < tokens.length ? tokens[i + 1] : null;
          if (next !== null) {
            if (next.type === "BLANK") {
              // Next token is already blank, nothing to insert
            } else if (next.type === "HEADING") {
              // Handled when processing the next heading
            } else {
              // Next token is content: insert blank line
              withHeadingSpacing.push({
                raw: "",
                isProtected: false,
                type: "BLANK",
              });
            }
          }
        }
      } else {
        withHeadingSpacing.push(current);
      }
    }

    tokens = withHeadingSpacing;
  }

  // PASS 3: Remove duplicate empty lines (collapse 2+ into 1)
  if (settings.removeDuplicateEmptyLines) {
    const collapsed: LineInfo[] = [];
    let lastWasBlank = false;

    for (const token of tokens) {
      if (token.isProtected) {
        collapsed.push(token);
        lastWasBlank = false;
      } else if (token.type === "BLANK") {
        if (!lastWasBlank) {
          collapsed.push(token);
          lastWasBlank = true;
        }
      } else {
        collapsed.push(token);
        lastWasBlank = false;
      }
    }
    tokens = collapsed;
  }

  // Extract raw lines
  let resultLines = tokens.map((t) => t.raw);

  // PASS 4: Leading and Trailing empty lines
  if (!isSelection) {
    if (settings.trimLeadingEmptyLines) {
      while (resultLines.length > 0 && /^\s*$/.test(resultLines[0])) {
        resultLines.shift();
      }
    }
    if (settings.trimTrailingEmptyLines) {
      while (
        resultLines.length > 0 &&
        /^\s*$/.test(resultLines[resultLines.length - 1])
      ) {
        resultLines.pop();
      }
    }
  }

  // Join lines back
  let result = resultLines.join(newline);

  // If original had trailing newline, preserve single trailing newline
  if (
    !isSelection &&
    settings.trimTrailingEmptyLines &&
    content.endsWith("\n") &&
    result.length > 0
  ) {
    result += newline;
  }

  return result;
}
