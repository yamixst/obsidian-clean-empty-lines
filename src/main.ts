import { Editor, MarkdownView, Notice, Plugin } from "obsidian";
import { CleanEmptyLinesSettings, DEFAULT_SETTINGS } from "./types";
import { cleanEmptyLines } from "./cleaner";
import { CleanEmptyLinesSettingTab } from "./settings";

export default class CleanEmptyLinesPlugin extends Plugin {
  settings: CleanEmptyLinesSettings = DEFAULT_SETTINGS;

  async onload() {
    await this.loadSettings();

    // 1. Ribbon icon to format active note
    this.addRibbonIcon("list-checks", "Очистить пустые строки", () => {
      const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (activeView) {
        this.formatEditor(activeView.editor);
      } else {
        new Notice("Нет активной Markdown-заметки");
      }
    });

    // 2. Command: Format active note
    this.addCommand({
      id: "clean-empty-lines-note",
      name: "Очистить пустые строки в активной заметке",
      editorCallback: (editor: Editor) => {
        this.formatEditor(editor);
      },
    });

    // 3. Command: Format selected text
    this.addCommand({
      id: "clean-empty-lines-selection",
      name: "Очистить пустые строки в выделенном фрагменте",
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
      new Notice("Пустые строки успешно отформатированы");
    } else {
      new Notice("Форматирование не требуется");
    }
  }

  formatSelection(editor: Editor) {
    if (!editor.somethingSelected()) {
      new Notice("Сначала выделите текст для форматирования");
      return;
    }

    const selection = editor.getSelection();
    const cleanedSelection = cleanEmptyLines(selection, this.settings, true);

    if (selection !== cleanedSelection) {
      editor.replaceSelection(cleanedSelection);
      new Notice("Выделенный фрагмент отформатирован");
    } else {
      new Notice("В выделении форматирование не требуется");
    }
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}
