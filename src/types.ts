export interface CleanEmptyLinesSettings {
  /** Remove duplicate consecutive empty lines (collapse 2+ blank lines into 1) */
  removeDuplicateEmptyLines: boolean;

  /** Ensure empty line before headings (except start of document or right after frontmatter) */
  ensureEmptyLineBeforeHeading: boolean;

  /** Ensure empty line after headings (except end of document) */
  ensureEmptyLineAfterHeading: boolean;

  /** Keep empty line between consecutive headings (e.g. # Title \n\n ## Subtitle) */
  emptyLineBetweenConsecutiveHeadings: boolean;

  /** Remove empty lines between list items */
  removeEmptyLinesInLists: boolean;

  /** Trim trailing blank lines at end of document down to a single blank line or newline */
  trimTrailingEmptyLines: boolean;

  /** Trim leading blank lines at the very top of document */
  trimLeadingEmptyLines: boolean;

  /** Remove horizontal separator lines (---) */
  removeHorizontalRules: boolean;
}

export const DEFAULT_SETTINGS: CleanEmptyLinesSettings = {
  removeDuplicateEmptyLines: true,
  ensureEmptyLineBeforeHeading: true,
  ensureEmptyLineAfterHeading: true,
  emptyLineBetweenConsecutiveHeadings: true,
  removeEmptyLinesInLists: true,
  trimTrailingEmptyLines: true,
  trimLeadingEmptyLines: true,
  removeHorizontalRules: true,
};
