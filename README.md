# Obsidian Clean Empty Lines

An [Obsidian](https://obsidian.md) plugin that tidies up blank lines and separators in your Markdown notes:

- **Collapse duplicate empty lines:** Replaces multiple consecutive blank lines with a single blank line.
- **Ensure blank lines around headings:** Guarantees clean spacing before and after headings (`# Header`).
- **Tighten list items:** Removes blank lines between list items (`-`, `*`, `+`, `1.`, `- [ ]`, sublists, etc.).
- **Remove horizontal lines (`---`):** Cleans up thematic break lines in note body while preserving YAML frontmatter.
- **Protected blocks:** Code blocks (```` ``` ````), math formulas (`$$`), and frontmatter are completely safe and untouched.
- **Multilingual support:** English (default), Russian, German, French, Spanish, Simplified Chinese, Japanese, Korean, Portuguese.

## Installation

### From Obsidian Community Plugins

1. In Obsidian, go to **Settings** -> **Community plugins**.
2. Turn off Restricted mode and click **Browse**.
3. Search for **Clean Empty Lines** and click **Install**, then **Enable**.

### Manual Installation

1. Download `main.js` and `manifest.json` from the [latest release](https://github.com/yamixst/obsidian-clean-empty-lines/releases).
2. Inside your Obsidian vault, navigate to `.obsidian/plugins/`.
3. Create a directory named `clean-empty-lines`.
4. Copy `manifest.json` and `main.js` into that directory.
5. In Obsidian, go to **Settings** -> **Community plugins**, reload, and enable **Clean Empty Lines**.

## Usage

1. **Command Palette (`Ctrl/Cmd + P`):**
   - `Clean empty lines in active note` — Formats the entire active document.
   - `Clean empty lines in selection` — Formats only the selected text.
2. **Ribbon Icon:**
   - Click the check-list icon on the left ribbon to clean the current note with a single click.

## Settings

Customize which formatting rules to run:
- **Remove duplicate empty lines** (default: On)
- **Empty line before headings** (default: On)
- **Empty line after headings** (default: On)
- **Empty line between consecutive headings** (default: On)
- **Remove empty lines between list items** (default: On)
- **Remove horizontal lines (`---`)** (default: On)
- **Trim leading empty lines** (default: On)
- **Trim trailing empty lines** (default: On)

## Supported Languages (i18n)

The plugin automatically adapts to Obsidian's active interface language:
- English (`en`) — Default
- Russian (`ru`)
- German (`de`)
- French (`fr`)
- Spanish (`es`)
- Simplified Chinese (`zh` / `zh-cn`)
- Japanese (`ja`)
- Korean (`ko`)
- Portuguese (`pt` / `pt-br`)

## Development & Testing

```bash
npm install     # Install dependencies
npm test        # Run unit tests (37 tests)
npm run build   # Production bundle (main.js)
```

## License

[MIT](LICENSE) © Mikhail Yatsenko
