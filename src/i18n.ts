declare const window: any;

const en = {
  ribbonIconTitle: "Clean empty lines",
  cmdCleanNote: "Clean empty lines in active note",
  cmdCleanSelection: "Clean empty lines in selection",
  noticeNoActiveNote: "No active Markdown note",
  noticeCleanSuccess: "Empty lines cleaned successfully",
  noticeNoCleanNeeded: "Formatting not required",
  noticeSelectTextFirst: "Please select text to format first",
  noticeSelectionSuccess: "Selection formatted successfully",
  noticeSelectionNoCleanNeeded: "Selection formatting not required",

  settingsTitle: "Clean Empty Lines Settings",
  settingDuplicateName: "Remove duplicate empty lines",
  settingDuplicateDesc: "Collapse two or more consecutive blank lines into a single blank line.",
  settingHeadingsSection: "Headings",
  settingHeadingBeforeName: "Empty line before headings",
  settingHeadingBeforeDesc: "Ensure a blank line before headings (except at the very top of the document).",
  settingHeadingAfterName: "Empty line after headings",
  settingHeadingAfterDesc: "Ensure a blank line after headings (before subsequent content).",
  settingHeadingConsecutiveName: "Empty line between consecutive headings",
  settingHeadingConsecutiveDesc: "Insert a blank line between adjacent headings (e.g. between # and ##).",
  settingListsSection: "Lists",
  settingListsName: "Remove empty lines between list items",
  settingListsDesc: "Make lists compact by removing blank lines between items.",
  settingSeparatorsSection: "Separators",
  settingHorizontalRulesName: "Remove horizontal lines (---)",
  settingHorizontalRulesDesc: "Remove thematic break lines (---) in the note body (YAML frontmatter is preserved).",
  settingAdditionalSection: "Additional",
  settingTrimLeadingName: "Trim leading empty lines",
  settingTrimLeadingDesc: "Remove blank lines at the very top of the document.",
  settingTrimTrailingName: "Trim trailing empty lines",
  settingTrimTrailingDesc: "Remove extra blank lines at the very end of the document.",
};

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
  ribbonIconTitle: "Очистить пустые строки",
  cmdCleanNote: "Очистить пустые строки в активной заметке",
  cmdCleanSelection: "Очистить пустые строки в выделенном фрагменте",
  noticeNoActiveNote: "Нет активной Markdown-заметки",
  noticeCleanSuccess: "Пустые строки успешно отформатированы",
  noticeNoCleanNeeded: "Форматирование не требуется",
  noticeSelectTextFirst: "Сначала выделите текст для форматирования",
  noticeSelectionSuccess: "Выделенный фрагмент отформатирован",
  noticeSelectionNoCleanNeeded: "В выделении форматирование не требуется",

  settingsTitle: "Настройки Clean Empty Lines",
  settingDuplicateName: "Удалять дублирующиеся пустые строки",
  settingDuplicateDesc: "Схлопывает несколько подряд идущих пустых строк в одну.",
  settingHeadingsSection: "Заголовки",
  settingHeadingBeforeName: "Пустая строка перед заголовками",
  settingHeadingBeforeDesc: "Гарантирует одну пустую строку перед заголовком (кроме самого начала файла).",
  settingHeadingAfterName: "Пустая строка после заголовков",
  settingHeadingAfterDesc: "Гарантирует одну пустую строку после заголовка (перед следующим текстом).",
  settingHeadingConsecutiveName: "Пустая строка между подряд идущими заголовками",
  settingHeadingConsecutiveDesc: "Вставлять ли пустую строку между смежными заголовками (например, между # и ##).",
  settingListsSection: "Списки",
  settingListsName: "Удалять пустые строки между элементами списка",
  settingListsDesc: "Делает списки компактными, удаляя пустые строки между пунктами списков.",
  settingSeparatorsSection: "Разделители",
  settingHorizontalRulesName: "Удалять горизонтальные линии (---)",
  settingHorizontalRulesDesc: "Удаляет разделительные линии (thematic breaks / horizontal rules), кроме YAML frontmatter.",
  settingAdditionalSection: "Дополнительно",
  settingTrimLeadingName: "Удалять пустые строки в начале документа",
  settingTrimLeadingDesc: "Удаляет пустые строки в самом верху файла перед первым содержимым.",
  settingTrimTrailingName: "Очищать лишние пустые строки в конце документа",
  settingTrimTrailingDesc: "Удаляет лишние пустые строки в самом конце файла.",
};

const de: Record<TranslationKey, string> = {
  ribbonIconTitle: "Leerzeilen bereinigen",
  cmdCleanNote: "Leerzeilen in aktiver Notiz bereinigen",
  cmdCleanSelection: "Leerzeilen in Auswahl bereinigen",
  noticeNoActiveNote: "Keine aktive Markdown-Notiz",
  noticeCleanSuccess: "Leerzeilen erfolgreich bereinigt",
  noticeNoCleanNeeded: "Keine Formatierung erforderlich",
  noticeSelectTextFirst: "Bitte zuerst Text zum Formatieren auswählen",
  noticeSelectionSuccess: "Auswahl erfolgreich formatiert",
  noticeSelectionNoCleanNeeded: "Formatierung der Auswahl nicht erforderlich",

  settingsTitle: "Clean Empty Lines Einstellungen",
  settingDuplicateName: "Doppelte Leerzeilen entfernen",
  settingDuplicateDesc: "Fasst zwei oder mehr aufeinanderfolgende Leerzeilen zu einer zusammen.",
  settingHeadingsSection: "Überschriften",
  settingHeadingBeforeName: "Leerzeile vor Überschriften",
  settingHeadingBeforeDesc: "Stellt eine Leerzeile vor Überschriften sicher (außer am Dokumentanfang).",
  settingHeadingAfterName: "Leerzeile nach Überschriften",
  settingHeadingAfterDesc: "Stellt eine Leerzeile nach Überschriften sicher.",
  settingHeadingConsecutiveName: "Leerzeile zwischen aufeinanderfolgenden Überschriften",
  settingHeadingConsecutiveDesc: "Leerzeile zwischen benachbarten Überschriften einfügen (z. B. zwischen # und ##).",
  settingListsSection: "Listen",
  settingListsName: "Leerzeilen zwischen Listenelementen entfernen",
  settingListsDesc: "Macht Listen kompakt, indem Leerzeilen zwischen Listeneinträgen entfernt werden.",
  settingSeparatorsSection: "Trennlinien",
  settingHorizontalRulesName: "Horizontale Linien (---) entfernen",
  settingHorizontalRulesDesc: "Entfernt Trennlinien (---) im Notiztext (YAML Frontmatter bleibt erhalten).",
  settingAdditionalSection: "Zusätzliche Optionen",
  settingTrimLeadingName: "Führende Leerzeilen entfernen",
  settingTrimLeadingDesc: "Entfernt Leerzeilen ganz oben im Dokument.",
  settingTrimTrailingName: "Nachfolgende Leerzeilen entfernen",
  settingTrimTrailingDesc: "Entfernt überflüssige Leerzeilen ganz am Ende des Dokuments.",
};

const fr: Record<TranslationKey, string> = {
  ribbonIconTitle: "Nettoyer les lignes vides",
  cmdCleanNote: "Nettoyer les lignes vides dans la note active",
  cmdCleanSelection: "Nettoyer les lignes vides dans la sélection",
  noticeNoActiveNote: "Aucune note Markdown active",
  noticeCleanSuccess: "Lignes vides nettoyées avec succès",
  noticeNoCleanNeeded: "Formatage non nécessaire",
  noticeSelectTextFirst: "Veuillez d'abord sélectionner du texte à formater",
  noticeSelectionSuccess: "Sélection formatée avec succès",
  noticeSelectionNoCleanNeeded: "Formatage de la sélection non nécessaire",

  settingsTitle: "Paramètres de Clean Empty Lines",
  settingDuplicateName: "Supprimer les lignes vides en double",
  settingDuplicateDesc: "Réduit deux ou plusieurs lignes vides consécutives en une seule.",
  settingHeadingsSection: "Titres",
  settingHeadingBeforeName: "Ligne vide avant les titres",
  settingHeadingBeforeDesc: "Assure une ligne vide avant les titres (sauf en tout début de document).",
  settingHeadingAfterName: "Ligne vide après les titres",
  settingHeadingAfterDesc: "Assure une ligne vide après les titres.",
  settingHeadingConsecutiveName: "Ligne vide entre titres consécutifs",
  settingHeadingConsecutiveDesc: "Insérer une ligne vide entre titres consécutifs (par ex. entre # et ##).",
  settingListsSection: "Listes",
  settingListsName: "Supprimer les lignes vides entre éléments de liste",
  settingListsDesc: "Rend les listes compactes en supprimant les lignes vides entre les puces.",
  settingSeparatorsSection: "Séparateurs",
  settingHorizontalRulesName: "Supprimer les lignes horizontales (---)",
  settingHorizontalRulesDesc: "Supprime les lignes de séparation (---) dans le corps du texte (le frontmatter YAML est préservé).",
  settingAdditionalSection: "Options supplémentaires",
  settingTrimLeadingName: "Supprimer les lignes vides au début",
  settingTrimLeadingDesc: "Supprime les lignes vides en tout début de document.",
  settingTrimTrailingName: "Supprimer les lignes vides à la fin",
  settingTrimTrailingDesc: "Supprime les lignes vides en fin de document.",
};

const es: Record<TranslationKey, string> = {
  ribbonIconTitle: "Limpiar líneas vacías",
  cmdCleanNote: "Limpiar líneas vacías en la nota activa",
  cmdCleanSelection: "Limpiar líneas vacías en la selección",
  noticeNoActiveNote: "No hay ninguna nota Markdown activa",
  noticeCleanSuccess: "Líneas vacías limpiadas con éxito",
  noticeNoCleanNeeded: "No se requiere formato",
  noticeSelectTextFirst: "Por favor, seleccione primero el texto a formatear",
  noticeSelectionSuccess: "Selección formateada con éxito",
  noticeSelectionNoCleanNeeded: "No se requiere formato en la selección",

  settingsTitle: "Ajustes de Clean Empty Lines",
  settingDuplicateName: "Eliminar líneas vacías duplicadas",
  settingDuplicateDesc: "Reduce dos o más líneas en blanco consecutivas a una sola.",
  settingHeadingsSection: "Encabezados",
  settingHeadingBeforeName: "Línea vacía antes de encabezados",
  settingHeadingBeforeDesc: "Garantiza una línea vacía antes de los encabezados (excepto al inicio del documento).",
  settingHeadingAfterName: "Línea vacía después de encabezados",
  settingHeadingAfterDesc: "Garantiza una línea vacía después de los encabezados.",
  settingHeadingConsecutiveName: "Línea vacía entre encabezados consecutivos",
  settingHeadingConsecutiveDesc: "Insertar una línea en blanco entre encabezados consecutivos (ej. entre # y ##).",
  settingListsSection: "Listas",
  settingListsName: "Eliminar líneas vacías entre elementos de lista",
  settingListsDesc: "Hace las listas compactas eliminando líneas en blanco entre elementos.",
  settingSeparatorsSection: "Separadores",
  settingHorizontalRulesName: "Eliminar líneas horizontales (---)",
  settingHorizontalRulesDesc: "Elimina líneas divisorias (---) en el texto (el frontmatter YAML se preserva).",
  settingAdditionalSection: "Opciones adicionales",
  settingTrimLeadingName: "Eliminar líneas vacías iniciales",
  settingTrimLeadingDesc: "Elimina líneas en blanco al principio del documento.",
  settingTrimTrailingName: "Eliminar líneas vacías finales",
  settingTrimTrailingDesc: "Elimina líneas en blanco sobrantes al final del documento.",
};

const zh: Record<TranslationKey, string> = {
  ribbonIconTitle: "清理空行",
  cmdCleanNote: "清理当前笔记中的空行",
  cmdCleanSelection: "清理所选内容中的空行",
  noticeNoActiveNote: "没有打开的 Markdown 笔记",
  noticeCleanSuccess: "空行清理完成",
  noticeNoCleanNeeded: "无需格式化",
  noticeSelectTextFirst: "请先选择需要格式化的文本",
  noticeSelectionSuccess: "所选内容格式化完成",
  noticeSelectionNoCleanNeeded: "所选内容无需格式化",

  settingsTitle: "Clean Empty Lines 设置",
  settingDuplicateName: "删除重复空行",
  settingDuplicateDesc: "将连续两行或更多空行合并为一行空行。",
  settingHeadingsSection: "标题",
  settingHeadingBeforeName: "标题前保留空行",
  settingHeadingBeforeDesc: "确保标题前有且仅有一行空行（文档开头除外）。",
  settingHeadingAfterName: "标题后保留空行",
  settingHeadingAfterDesc: "确保标题后有且仅有一行空行。",
  settingHeadingConsecutiveName: "连续标题之间保留空行",
  settingHeadingConsecutiveDesc: "在相邻的标题之间插入空行（例如 # 和 ## 之间）。",
  settingListsSection: "列表",
  settingListsName: "删除列表项之间的空行",
  settingListsDesc: "通过删除列表项之间的空行使列表更紧凑。",
  settingSeparatorsSection: "分隔线",
  settingHorizontalRulesName: "删除水平分割线 (---)",
  settingHorizontalRulesDesc: "删除正文中的水平分割线（保留 YAML frontmatter）。",
  settingAdditionalSection: "其他选项",
  settingTrimLeadingName: "清理文档开头的空行",
  settingTrimLeadingDesc: "删除文档最开头的空白行。",
  settingTrimTrailingName: "清理文档末尾的空行",
  settingTrimTrailingDesc: "删除文档末尾多余的空白行。",
};

const ja: Record<TranslationKey, string> = {
  ribbonIconTitle: "空行をクリーンアップ",
  cmdCleanNote: "現在のノートの空行をクリーンアップ",
  cmdCleanSelection: "選択範囲の空行をクリーンアップ",
  noticeNoActiveNote: "アクティブなMarkdownノートがありません",
  noticeCleanSuccess: "空行のクリーンアップが完了しました",
  noticeNoCleanNeeded: "フォーマットの必要はありません",
  noticeSelectTextFirst: "フォーマットするテキストを先に選択してください",
  noticeSelectionSuccess: "選択範囲のフォーマットが完了しました",
  noticeSelectionNoCleanNeeded: "選択範囲のフォーマットは不要です",

  settingsTitle: "Clean Empty Lines 設定",
  settingDuplicateName: "重複する空行を削除",
  settingDuplicateDesc: "連続する2行以上の空行を1行にまとめます。",
  settingHeadingsSection: "見出し",
  settingHeadingBeforeName: "見出しの前に空行を挿入",
  settingHeadingBeforeDesc: "見出しの前に1行の空行を確保します（ドキュメント冒頭を除く）。",
  settingHeadingAfterName: "見出しの後に空行を挿入",
  settingHeadingAfterDesc: "見出しの後に1行の空行を確保します。",
  settingHeadingConsecutiveName: "連続する見出しの間に空行を挿入",
  settingHeadingConsecutiveDesc: "隣接する見出しの間（例: # と ## の間）に空行を挿入します。",
  settingListsSection: "リスト",
  settingListsName: "リスト項目間の空行を削除",
  settingListsDesc: "項目間の空行を削除してリストをコンパクトにします。",
  settingSeparatorsSection: "区切り線",
  settingHorizontalRulesName: "水平線（---）を削除",
  settingHorizontalRulesDesc: "本文内の区切り線（---）を削除します（YAML frontmatterは保持されます）。",
  settingAdditionalSection: "追加オプション",
  settingTrimLeadingName: "ドキュメント冒頭の空行を削除",
  settingTrimLeadingDesc: "ドキュメント先頭にある空行を削除します。",
  settingTrimTrailingName: "ドキュメント末尾の空行を削除",
  settingTrimTrailingDesc: "ドキュメント末尾の余分な空行を削除します。",
};

const ko: Record<TranslationKey, string> = {
  ribbonIconTitle: "빈 줄 정리",
  cmdCleanNote: "현재 노트의 빈 줄 정리",
  cmdCleanSelection: "선택 영역의 빈 줄 정리",
  noticeNoActiveNote: "활성화된 Markdown 노트가 없습니다",
  noticeCleanSuccess: "빈 줄이 성공적으로 정리되었습니다",
  noticeNoCleanNeeded: "서식 지정이 필요하지 않습니다",
  noticeSelectTextFirst: "서식을 지정할 텍스트를 먼저 선택하세요",
  noticeSelectionSuccess: "선택 영역 서식 지정 완료",
  noticeSelectionNoCleanNeeded: "선택 영역에 서식 지정이 필요하지 않습니다",

  settingsTitle: "Clean Empty Lines 설정",
  settingDuplicateName: "중복 빈 줄 제거",
  settingDuplicateDesc: "연속된 2개 이상의 빈 줄을 하나로 줄입니다.",
  settingHeadingsSection: "제목",
  settingHeadingBeforeName: "제목 앞 빈 줄 삽입",
  settingHeadingBeforeDesc: "제목 앞에 빈 줄 1개를 보장합니다 (문서 맨 처음 제외).",
  settingHeadingAfterName: "제목 뒤 빈 줄 삽입",
  settingHeadingAfterDesc: "제목 뒤에 빈 줄 1개를 보장합니다.",
  settingHeadingConsecutiveName: "연속된 제목 사이 빈 줄 삽입",
  settingHeadingConsecutiveDesc: "인접한 제목 사이에 빈 줄을 삽입합니다 (예: # 와 ## 사이).",
  settingListsSection: "목록",
  settingListsName: "목록 항목 사이 빈 줄 제거",
  settingListsDesc: "항목 사이 빈 줄을 제거하여 목록을 간결하게 만듭니다.",
  settingSeparatorsSection: "구분선",
  settingHorizontalRulesName: "가로줄(---) 제거",
  settingHorizontalRulesDesc: "본문의 가로줄(---)을 제거합니다 (YAML frontmatter는 보존됨).",
  settingAdditionalSection: "추가 옵션",
  settingTrimLeadingName: "문서 시작 부분 빈 줄 제거",
  settingTrimLeadingDesc: "문서 맨 위의 빈 줄을 제거합니다.",
  settingTrimTrailingName: "문서 끝 빈 줄 제거",
  settingTrimTrailingDesc: "문서 맨 끝의 불필요한 빈 줄을 제거합니다.",
};

const pt: Record<TranslationKey, string> = {
  ribbonIconTitle: "Limpar linhas vazias",
  cmdCleanNote: "Limpar linhas vazias na nota ativa",
  cmdCleanSelection: "Limpar linhas vazias na seleção",
  noticeNoActiveNote: "Nenhuma nota Markdown ativa",
  noticeCleanSuccess: "Linhas vazias limpas com sucesso",
  noticeNoCleanNeeded: "Formatação não necessária",
  noticeSelectTextFirst: "Por favor, selecione o texto a ser formatado primeiro",
  noticeSelectionSuccess: "Seleção formatada com sucesso",
  noticeSelectionNoCleanNeeded: "Formatação da seleção não necessária",

  settingsTitle: "Configurações do Clean Empty Lines",
  settingDuplicateName: "Remover linhas vazias duplicadas",
  settingDuplicateDesc: "Reduz duas ou mais linhas vazias consecutivas a uma única.",
  settingHeadingsSection: "Cabeçalhos",
  settingHeadingBeforeName: "Linha vazia antes dos cabeçalhos",
  settingHeadingBeforeDesc: "Garante uma linha vazia antes dos cabeçalhos (exceto no início do documento).",
  settingHeadingAfterName: "Linha vazia após os cabeçalhos",
  settingHeadingAfterDesc: "Garante uma linha vazia após os cabeçalhos.",
  settingHeadingConsecutiveName: "Linha vazia entre cabeçalhos consecutivos",
  settingHeadingConsecutiveDesc: "Insere uma linha vazia entre cabeçalhos adjacentes (ex. entre # e ##).",
  settingListsSection: "Listas",
  settingListsName: "Remover linhas vazias entre itens de lista",
  settingListsDesc: "Torna as listas compactas removendo linhas vazias entre os itens.",
  settingSeparatorsSection: "Separadores",
  settingHorizontalRulesName: "Remover linhas horizontais (---)",
  settingHorizontalRulesDesc: "Remove linhas divisórias (---) no corpo do texto (o frontmatter YAML é mantido).",
  settingAdditionalSection: "Opções adicionais",
  settingTrimLeadingName: "Remover linhas vazias no início",
  settingTrimLeadingDesc: "Remove linhas vazias no início do documento.",
  settingTrimTrailingName: "Remover linhas vazias no final",
  settingTrimTrailingDesc: "Remove linhas vazias sobressalentes no final do documento.",
};

const localeMap: Record<string, Record<TranslationKey, string>> = {
  en,
  ru,
  de,
  fr,
  es,
  zh,
  "zh-cn": zh,
  "zh-tw": zh,
  ja,
  ko,
  pt,
  "pt-br": pt,
};

export function getLocale(): string {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = window.localStorage.getItem("language");
      if (stored) return stored.toLowerCase();
    }
  } catch (e) {}

  try {
    if (typeof window !== "undefined" && window.moment && typeof window.moment.locale === "function") {
      return window.moment.locale().toLowerCase();
    }
  } catch (e) {}

  return "en";
}

/**
 * Returns the localized string for the current active Obsidian locale,
 * with fallback to English.
 */
export function t(key: TranslationKey, customLocale?: string): string {
  const current = (customLocale || getLocale()).toLowerCase();
  
  // Exact match
  if (localeMap[current] && localeMap[current][key]) {
    return localeMap[current][key];
  }

  // Prefix match (e.g. 'de-de' -> 'de', 'es-es' -> 'es')
  const prefix = current.split("-")[0];
  if (localeMap[prefix] && localeMap[prefix][key]) {
    return localeMap[prefix][key];
  }

  // Default fallback to English
  return en[key] || key;
}

export { en, ru, de, fr, es, zh, ja, ko, pt };
