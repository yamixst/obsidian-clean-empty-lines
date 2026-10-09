import { App, PluginSettingTab, Setting } from "obsidian";
import type CleanEmptyLinesPlugin from "./main";
import { t } from "./i18n";

export class CleanEmptyLinesSettingTab extends PluginSettingTab {
  plugin: CleanEmptyLinesPlugin;

  constructor(app: App, plugin: CleanEmptyLinesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl).setName(t("settingsTitle")).setHeading();

    new Setting(containerEl)
      .setName(t("settingDuplicateName"))
      .setDesc(t("settingDuplicateDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeDuplicateEmptyLines)
          .onChange(async (value) => {
            this.plugin.settings.removeDuplicateEmptyLines = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl).setName(t("settingHeadingsSection")).setHeading();

    new Setting(containerEl)
      .setName(t("settingHeadingBeforeName"))
      .setDesc(t("settingHeadingBeforeDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.ensureEmptyLineBeforeHeading)
          .onChange(async (value) => {
            this.plugin.settings.ensureEmptyLineBeforeHeading = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("settingHeadingAfterName"))
      .setDesc(t("settingHeadingAfterDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.ensureEmptyLineAfterHeading)
          .onChange(async (value) => {
            this.plugin.settings.ensureEmptyLineAfterHeading = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("settingHeadingConsecutiveName"))
      .setDesc(t("settingHeadingConsecutiveDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.emptyLineBetweenConsecutiveHeadings)
          .onChange(async (value) => {
            this.plugin.settings.emptyLineBetweenConsecutiveHeadings = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl).setName(t("settingListsSection")).setHeading();

    new Setting(containerEl)
      .setName(t("settingListsName"))
      .setDesc(t("settingListsDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeEmptyLinesInLists)
          .onChange(async (value) => {
            this.plugin.settings.removeEmptyLinesInLists = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl).setName(t("settingSeparatorsSection")).setHeading();

    new Setting(containerEl)
      .setName(t("settingHorizontalRulesName"))
      .setDesc(t("settingHorizontalRulesDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.removeHorizontalRules)
          .onChange(async (value) => {
            this.plugin.settings.removeHorizontalRules = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl).setName(t("settingAdditionalSection")).setHeading();

    new Setting(containerEl)
      .setName(t("settingTrimLeadingName"))
      .setDesc(t("settingTrimLeadingDesc"))
      .addToggle((toggle) =>
        toggle
          .setValue(this.plugin.settings.trimLeadingEmptyLines)
          .onChange(async (value) => {
            this.plugin.settings.trimLeadingEmptyLines = value;
            await this.plugin.saveSettings();
          })
      );

    new Setting(containerEl)
      .setName(t("settingTrimTrailingName"))
      .setDesc(t("settingTrimTrailingDesc"))
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
