import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { CleanEmptyLinesSettings, DEFAULT_SETTINGS } from "./types";
import { cleanEmptyLines } from "./cleaner";
import { CleanEmptyLinesSettingTab } from "./settings";
import { t } from "./i18n";

export default class CleanEmptyLinesPlugin extends Plugin {
  settings: CleanEmptyLinesSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    // 1. Ribbon icon to format active note
    this.addRibbonIcon("list-checks", t("ribbonIconTitle"), () => {
      const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (activeView) {
        this.formatEditor(activeView.editor);
      } else {
        new Notice(t("noticeNoActiveNote"));
      }
    });

    // 2. Command: Format active note
    this.addCommand({
      id: "clean-empty-lines-note",
      name: t("cmdCleanNote"),
      editorCallback: (editor: Editor) => {
        this.formatEditor(editor);
      },
    });

    // 3. Command: Format selected text
    this.addCommand({
      id: "clean-empty-lines-selection",
      name: t("cmdCleanSelection"),
      editorCallback: (editor: Editor) => {
        this.formatSelection(editor);
      },
    });

    // 4. Settings tab
    this.addSettingTab(new CleanEmptyLinesSettingTab(this.app, this));
  }

  formatEditor(editor: Editor) {
    const originalContent = editor.getValue();
    const cleanedContent = cleanEmptyLines(originalContent, this.settings, false);

    if (originalContent !== cleanedContent) {
      const cursor = editor.getCursor();
      editor.setValue(cleanedContent);
      // Restore cursor position approximately
      const totalLines = editor.lineCount();
      editor.setCursor({
        line: Math.min(cursor.line, totalLines - 1),
        ch: cursor.ch,
      });
      new Notice(t("noticeCleanSuccess"));
    } else {
      new Notice(t("noticeNoCleanNeeded"));
    }
  }

  formatSelection(editor: Editor) {
    if (!editor.somethingSelected()) {
      new Notice(t("noticeSelectTextFirst"));
      return;
    }

    const selection = editor.getSelection();
    const cleanedSelection = cleanEmptyLines(selection, this.settings, true);

    if (selection !== cleanedSelection) {
      editor.replaceSelection(cleanedSelection);
      new Notice(t("noticeSelectionSuccess"));
    } else {
      new Notice(t("noticeSelectionNoCleanNeeded"));
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
