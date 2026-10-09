import { describe, it, expect } from "vitest";
import { t, en, ru, de, fr, es, zh, ja, ko, pt, TranslationKey } from "../src/i18n";

describe("i18n", () => {
  const languages = { en, ru, de, fr, es, zh, ja, ko, pt };
  const expectedKeys = Object.keys(en) as TranslationKey[];

  it("should have all translation keys in every language dictionary", () => {
    for (const [langName, dict] of Object.entries(languages)) {
      for (const key of expectedKeys) {
        expect(
          dict[key],
          `Missing or empty translation for key "${key}" in language "${langName}"`
        ).toBeDefined();
        expect(dict[key].length).toBeGreaterThan(0);
      }
    }
  });

  it("should default to English when no locale is provided or unknown", () => {
    expect(t("cmdCleanNote", "unknown_lang")).toBe(en.cmdCleanNote);
    expect(t("settingsTitle", "xyz")).toBe("Clean Empty Lines Settings");
  });

  it("should translate into Russian when locale is ru", () => {
    expect(t("cmdCleanNote", "ru")).toBe("Очистить пустые строки в активной заметке");
    expect(t("ribbonIconTitle", "ru-RU")).toBe("Очистить пустые строки");
  });

  it("should translate into German when locale is de", () => {
    expect(t("cmdCleanNote", "de")).toBe("Leerzeilen in aktiver Notiz bereinigen");
    expect(t("cmdCleanNote", "de-DE")).toBe("Leerzeilen in aktiver Notiz bereinigen");
  });

  it("should translate into French when locale is fr", () => {
    expect(t("cmdCleanNote", "fr")).toBe("Nettoyer les lignes vides dans la note active");
  });

  it("should translate into Spanish when locale is es", () => {
    expect(t("cmdCleanNote", "es")).toBe("Limpiar líneas vacías en la nota activa");
  });

  it("should translate into Chinese when locale is zh / zh-cn", () => {
    expect(t("cmdCleanNote", "zh")).toBe("清理当前笔记中的空行");
    expect(t("cmdCleanNote", "zh-cn")).toBe("清理当前笔记中的空行");
  });

  it("should translate into Japanese when locale is ja", () => {
    expect(t("cmdCleanNote", "ja")).toBe("現在のノートの空行をクリーンアップ");
  });

  it("should translate into Korean when locale is ko", () => {
    expect(t("cmdCleanNote", "ko")).toBe("현재 노트의 빈 줄 정리");
  });

  it("should translate into Portuguese when locale is pt / pt-br", () => {
    expect(t("cmdCleanNote", "pt")).toBe("Limpar linhas vazias na nota ativa");
    expect(t("cmdCleanNote", "pt-br")).toBe("Limpar linhas vazias na nota ativa");
  });
});
