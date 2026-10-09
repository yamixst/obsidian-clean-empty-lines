import { App, PluginSettingTab, Setting } from "obsidian";
import type CleanEmptyLinesPlugin from "./main";

export class CleanEmptyLinesSettingTab extends PluginSettingTab {
  plugin: CleanEmptyLinesPlugin;

  constructor(app: App, plugin: CleanEmptyLinesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    containerEl.createEl("h2", { text: "Настройки Clean Empty Lines" });

    new Setting(containerEl)
      .setName("Удалять дублирующиеся пустые строки")
      .setDesc("Схлопывает несколько подряд идущих пустых строк в одну.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeDuplicateEmptyLines)
          .onChange(async (value) => {
            this.plugin.settings.removeDuplicateEmptyLines = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "Заголовки" });

    new Setting(containerEl)
      .setName("Пустая строка перед заголовками")
      .setDesc("Гарантирует одну пустую строку перед заголовком (кроме самого начала файла).")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.ensureEmptyLineBeforeHeading)
          .onChange(async (value) => {
            this.plugin.settings.ensureEmptyLineBeforeHeading = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Пустая строка после заголовков")
      .setDesc("Гарантирует одну пустую строку после заголовка (перед следующим текстом).")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.ensureEmptyLineAfterHeading)
          .onChange(async (value) => {
            this.plugin.settings.ensureEmptyLineAfterHeading = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Пустая строка между подряд идущими заголовками")
      .setDesc("Вставлять ли пустую строку между смежными заголовками (например, между # и ##).")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.emptyLineBetweenConsecutiveHeadings)
          .onChange(async (value) => {
            this.plugin.settings.emptyLineBetweenConsecutiveHeadings = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "Списки" });

    new Setting(containerEl)
      .setName("Удалять пустые строки между элементами списка")
      .setDesc("Делает списки компактными, удаляя пустые строки между пунктами списков.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeEmptyLinesInLists)
          .onChange(async (value) => {
            this.plugin.settings.removeEmptyLinesInLists = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "Разделители" });

    new Setting(containerEl)
      .setName("Удалять горизонтальные линии (---)")
      .setDesc("Удаляет разделительные линии (thematic breaks / horizontal rules), кроме YAML frontmatter.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeHorizontalRules)
          .onChange(async (value) => {
            this.plugin.settings.removeHorizontalRules = value;
            await this.plugin.saveSettings();
          })
      );

    containerEl.createEl("h3", { text: "Дополнительно" });

    new Setting(containerEl)
      .setName("Удалять пустые строки в начале документа")
      .setDesc("Удаляет пустые строки в самом верху файла перед первым содержимым.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.trimLeadingEmptyLines)
          .onChange(async (value) => {
            this.plugin.settings.trimLeadingEmptyLines = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName("Очищать лишние пустые строки в конце документа")
      .setDesc("Удаляет лишние пустые строки в самом конце файла.")
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.trimTrailingEmptyLines)
          .onChange(async (value) => {
            this.plugin.settings.trimTrailingEmptyLines = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
