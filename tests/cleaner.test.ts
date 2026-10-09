import { describe, it, expect } from "vitest";
import { cleanEmptyLines } from "../src/cleaner";

describe("cleanEmptyLines", () => {
  describe("Duplicate empty lines", () => {
    it("should collapse multiple blank lines into a single blank line", () => {
      const input = "Paragraph 1\n\n\n\nParagraph 2\n\n\nParagraph 3";
      const expected = "Paragraph 1\n\nParagraph 2\n\nParagraph 3";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should trim leading empty lines at start of document", () => {
      const input = "\n\n\n# Header\nContent";
      const expected = "# Header\n\nContent";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should trim trailing empty lines at end of document", () => {
      const input = "# Header\n\nContent\n\n\n";
      const expected = "# Header\n\nContent\n";
      expect(cleanEmptyLines(input)).toBe(expected);
    });
  });

  describe("Headings spacing", () => {
    it("should ensure empty line before and after heading", () => {
      const input = "Paragraph 1\n# Heading\nParagraph 2";
      const expected = "Paragraph 1\n\n# Heading\n\nParagraph 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should not add empty line before heading at top of document", () => {
      const input = "# Top Heading\nParagraph";
      const expected = "# Top Heading\n\nParagraph";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should handle consecutive headings with spacing by default", () => {
      const input = "# Heading 1\n## Heading 2\nContent";
      const expected = "# Heading 1\n\n## Heading 2\n\nContent";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should support keeping consecutive headings adjacent if option disabled", () => {
      const input = "# Heading 1\n## Heading 2\nContent";
      const expected = "# Heading 1\n## Heading 2\n\nContent";
      expect(
        cleanEmptyLines(input, { emptyLineBetweenConsecutiveHeadings: false })
      ).toBe(expected);
    });

    it("should ensure empty line between frontmatter and heading", () => {
      const input = "---\ntitle: Note\n---\n# Heading\nContent";
      const expected = "---\ntitle: Note\n---\n\n# Heading\n\nContent";
      expect(cleanEmptyLines(input)).toBe(expected);
    });
  });

  describe("List items spacing", () => {
    it("should remove empty lines between bullet list items", () => {
      const input = "- Item 1\n\n- Item 2\n\n- Item 3";
      const expected = "- Item 1\n- Item 2\n- Item 3";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove multiple empty lines between list items", () => {
      const input = "- Item 1\n\n\n\n- Item 2";
      const expected = "- Item 1\n- Item 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove empty lines between ordered list items", () => {
      const input = "1. First\n\n2. Second\n\n3. Third";
      const expected = "1. First\n2. Second\n3. Third";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove empty lines between task items", () => {
      const input = "- [ ] Task 1\n\n- [x] Task 2\n\n- [ ] Task 3";
      const expected = "- [ ] Task 1\n- [x] Task 2\n- [ ] Task 3";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove empty lines between nested list items", () => {
      const input = "- Parent 1\n  - Child 1\n\n  - Child 2\n\n- Parent 2";
      const expected = "- Parent 1\n  - Child 1\n  - Child 2\n- Parent 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove empty lines when list item has continuation lines", () => {
      const input = "- Item 1\n  details for item 1\n\n- Item 2";
      const expected = "- Item 1\n  details for item 1\n- Item 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should NOT remove empty line between list and following paragraph", () => {
      const input = "- Item 1\n- Item 2\n\nParagraph text";
      const expected = "- Item 1\n- Item 2\n\nParagraph text";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should NOT remove empty line between preceding paragraph and list", () => {
      const input = "Paragraph text\n\n- Item 1\n- Item 2";
      const expected = "Paragraph text\n\n- Item 1\n- Item 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should NOT remove empty line between two distinct list kinds (unordered vs ordered)", () => {
      const input = "- Bullet 1\n- Bullet 2\n\n1. Numbered 1\n2. Numbered 2";
      const expected = "- Bullet 1\n- Bullet 2\n\n1. Numbered 1\n2. Numbered 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });
  });

  describe("Protected blocks (Code & Math & Frontmatter)", () => {
    it("should not touch empty lines or hash comments inside code fences", () => {
      const input =
        "# Code Example\n\n```python\n# This is a comment\ndef foo():\n\n\n    return 1\n```\n\nDone";
      const expected =
        "# Code Example\n\n```python\n# This is a comment\ndef foo():\n\n\n    return 1\n```\n\nDone";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should not touch empty lines inside math blocks", () => {
      const input = "$$\na = 1\n\n\nb = 2\n$$";
      const expected = "$$\na = 1\n\n\nb = 2\n$$";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should preserve frontmatter exactly", () => {
      const input = "---\ntitle: Note\n\ntags:\n  - a\n---";
      const expected = "---\ntitle: Note\n\ntags:\n  - a\n---";
      expect(cleanEmptyLines(input)).toBe(expected);
    });
  });

  describe("Combined real-world markdown note", () => {
    it("should format a full messy note correctly", () => {
      const input = `


# My Note
Some introduction paragraph.



## Tasks
- [ ] Task 1

- [ ] Task 2
  - Subtask 2.1

  - Subtask 2.2

- [x] Task 3

## Code Section
Here is some code:

\`\`\`ts
// comment

const a = 1;
\`\`\`

Final remark.


`;

      const expected = `# My Note

Some introduction paragraph.

## Tasks

- [ ] Task 1
- [ ] Task 2
  - Subtask 2.1
  - Subtask 2.2
- [x] Task 3

## Code Section

Here is some code:

\`\`\`ts
// comment

const a = 1;
\`\`\`

Final remark.
`;

      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should handle CRLF line endings properly", () => {
      const input = "# Title\r\n\r\n\r\nParagraph 1\r\n\r\n- Item 1\r\n\r\n- Item 2";
      const expected = "# Title\r\n\r\nParagraph 1\r\n\r\n- Item 1\r\n- Item 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });
  });

  describe("Horizontal rules removal (---)", () => {
    it("should remove standalone --- between paragraphs", () => {
      const input = "Paragraph 1\n\n---\n\nParagraph 2";
      const expected = "Paragraph 1\n\nParagraph 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should remove --- between headings and content", () => {
      const input = "# Section 1\n---\nSome content\n---\n# Section 2";
      const expected = "# Section 1\n\nSome content\n\n# Section 2";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should preserve YAML frontmatter delimiters while removing body ---", () => {
      const input = "---\ntitle: Note\nstatus: active\n---\n\n# Title\n---\nContent";
      const expected = "---\ntitle: Note\nstatus: active\n---\n\n# Title\n\nContent";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should preserve --- inside code blocks", () => {
      const input = "# Code\n\n```yaml\n---\nfoo: bar\n---\n```";
      const expected = "# Code\n\n```yaml\n---\nfoo: bar\n---\n```";
      expect(cleanEmptyLines(input)).toBe(expected);
    });

    it("should keep --- when removeHorizontalRules is false", () => {
      const input = "Paragraph 1\n\n---\n\nParagraph 2";
      const expected = "Paragraph 1\n\n---\n\nParagraph 2";
      expect(cleanEmptyLines(input, { removeHorizontalRules: false })).toBe(expected);
    });
  });
});
