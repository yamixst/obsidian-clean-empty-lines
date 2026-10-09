import { App, PluginSettingTab, Setting } from "obsidian";
import type { SettingDefinitionItem } from "obsidian";
import type CleanEmptyLinesPlugin from "./main";
import { t } from "./i18n";

export class CleanEmptyLinesSettingTab extends PluginSettingTab {
  plugin: CleanEmptyLinesPlugin;

  constructor(app: App, plugin: CleanEmptyLinesPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  override getControlValue(key: string): unknown {
    return (this.plugin.settings as Record<string, unknown>)[key];
  }

  override async setControlValue(key: string, value: unknown): Promise<void> {
    (this.plugin.settings as Record<string, unknown>)[key] = value;
    await this.plugin.saveSettings();
  }

  override getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        type: "group",
        heading: t("settingsTitle"),
        items: [
          {
            name: t("settingDuplicateName"),
            desc: t("settingDuplicateDesc"),
            control: {
              type: "toggle",
              key: "removeDuplicateEmptyLines",
            },
          },
        ],
      },
      {
        type: "group",
        heading: t("settingHeadingsSection"),
        items: [
          {
            name: t("settingHeadingBeforeName"),
            desc: t("settingHeadingBeforeDesc"),
            control: {
              type: "toggle",
              key: "ensureEmptyLineBeforeHeading",
            },
          },
          {
            name: t("settingHeadingAfterName"),
            desc: t("settingHeadingAfterDesc"),
            control: {
              type: "toggle",
              key: "ensureEmptyLineAfterHeading",
            },
          },
          {
            name: t("settingHeadingConsecutiveName"),
            desc: t("settingHeadingConsecutiveDesc"),
            control: {
              type: "toggle",
              key: "emptyLineBetweenConsecutiveHeadings",
            },
          },
        ],
      },
      {
        type: "group",
        heading: t("settingListsSection"),
        items: [
          {
            name: t("settingListsName"),
            desc: t("settingListsDesc"),
            control: {
              type: "toggle",
              key: "removeEmptyLinesInLists",
            },
          },
        ],
      },
      {
        type: "group",
        heading: t("settingSeparatorsSection"),
        items: [
          {
            name: t("settingHorizontalRulesName"),
            desc: t("settingHorizontalRulesDesc"),
            control: {
              type: "toggle",
              key: "removeHorizontalRules",
            },
          },
        ],
      },
      {
        type: "group",
        heading: t("settingAdditionalSection"),
        items: [
          {
            name: t("settingTrimLeadingName"),
            desc: t("settingTrimLeadingDesc"),
            control: {
              type: "toggle",
              key: "trimLeadingEmptyLines",
            },
          },
          {
            name: t("settingTrimTrailingName"),
            desc: t("settingTrimTrailingDesc"),
            control: {
              type: "toggle",
              key: "trimTrailingEmptyLines",
            },
          },
        ],
      },
    ];
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
