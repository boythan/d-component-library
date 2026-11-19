# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-11-19

### Fixed
- **AwesomeTableComponent:** columns no longer return `{ children, props }` from `render` (deprecated in antd for
  performance; it logged "`columns.render` return cell props is deprecated"). The cell's `data-title` (mobile label)
  is now set through `onCell`, merged with the column's own `onCell`, and only when the title is plain text: a
  React-element title produced "Invalid value for prop `data-title`".
- **Select:** passes the dropdown arrow as `suffix` (antd 6) instead of the deprecated `suffixIcon`.
- **Modal:** `maskClosable` is converted to antd 6's `mask={{ closable }}` (no more deprecation warning); `mask`
  is still accepted and merged.

## [1.0.2] - 2026-11-19

### Changed
- **Fonts are no longer loaded by the library.** `index.css` no longer `@import`s Poppins from Google Fonts
  (a render-blocking request for all nine weights, made from every app's users). The `--app-font` / `--appFont`
  variables still name Poppins (Prompt for `:lang(th)`); **apps must load the font themselves** — see
  `MIGRATION_GUIDE_V1.md` → Font. Without it, text falls back to the browser's sans-serif font.
- `--app-font` / `--appFont` now default to Poppins on every page, not only `:lang(en)`.
- **TabBar:** the 0.3.x class names (`d-tab-bar`, `d-tab-bar__<variant>`, `d-tab-bar__item`,
  `d-tab-bar__item-active` / `-inactive`, `d-tab-bar__item-active-indicator-<side>`) are back as styling hooks.
  Items are square (`shape="flat"`), have no fixed height, and no longer get `Button`'s inline primary colour,
  so the tab's own text / background / border classes apply. Inactive text uses `text-text-main` (the previous
  `text-main` class did not exist).

### Removed
- Unlayered global `html { font-size: 16px }` and `body { font-family }` rules, which overrode apps' layered CSS.
  Tailwind's preflight already applies `--app-font` to `<html>` inside `@layer base`.
- Global `:root { --ant-modal-content-padding: 0 }` (leftover of the app-wide Modal override removed in 1.0.1).

## [1.0.1] - 2026-11-19

### Fixed
- **AwesomeTableComponent:** table cells wrap text again. 1.0.0 added `whitespace-nowrap` to every row, so with
  the default `tableLayout="fixed"` and column widths, long text overflowed into neighbouring columns.
  Rows now get `d-table-awesome-component__row align-middle` (the 0.3.x class is back as a styling hook).
  Pass `rowClassName` to opt back into single-line rows.
- **DThemeProvider / Modal:** `DThemeProvider` no longer sets antd's `Modal.contentPadding` to `0` for the whole
  app, which removed the padding from every plain antd `Modal`. The library's own `Modal` now removes antd's
  container and body padding on its own instances (`styles.container` / `styles.body`) instead.

### Documentation
- `MIGRATION_GUIDE_V1.md`: corrected the CSS import path, the component-API and Bootstrap→Tailwind sections,
  and added theming, removed global styles, CSS-layer conflicts, and tooling requirements.
- `MIGRATION_GUIDE_V1.md` and `CHANGELOG.md` are now included in the published package (the README links to them).

## [1.0.0] - 2024-12-08

### 🎉 Major Release

This is the first stable 1.0 release of d-react-components!

### ⚠️ Breaking Changes

#### Ant Design Upgrade
- **BREAKING:** Upgraded from Ant Design v4.23.1 to v5.21.6
  - Modal/Drawer: Internal prop changes (handled internally, no API changes)
  - Button: Icon prop changes (handled internally, no API changes)
  - CSS: Updated to use `antd/dist/reset.css` instead of `antd/dist/antd.css`
  - Type imports: Updated to use direct imports from `antd` instead of `antd/lib/*`

#### Date Library Migration
- **BREAKING:** Replaced Moment.js with Day.js
  - All date utilities now use Day.js
  - If you use `TimeUtils`, update your code to use Day.js
  - DateInput component now expects Day.js objects instead of Moment objects
  - ~40% smaller date library bundle size

#### Bootstrap Removal
- **REMOVED:** Bootstrap CSS dependency
  - Bootstrap utility classes are still available through custom SCSS
  - No breaking changes to existing utility class usage
  - ~30% smaller bundle size

### ✨ Added

- Day.js plugins support (isBetween, isSameOrBefore, isSameOrAfter)
- Better TypeScript types for Ant Design components
- Improved tree-shaking support

### 🔧 Changed

- Updated all internal date handling to use Day.js
- Updated Modal component to use `open` prop (Ant Design v5)
- Updated Drawer component to use `open` prop (Ant Design v5)
- Updated Button icon handling for Ant Design v5
- Updated notification types to use `NotificationArgsProps`
- Updated Select types to use `DefaultOptionType`
- Updated Table types to use direct imports

### 📦 Dependencies

#### Updated
- `antd`: 4.23.1 → 5.21.6

#### Added
- `dayjs`: ^1.11.13

#### Removed
- `moment`: ^2.29.1
- `bootstrap`: 4.5.3

### 🐛 Fixed

- Fixed date range calculations in TimeUtils
- Fixed type imports for Ant Design v5 compatibility
- Fixed Button icon prop for Ant Design v5

### 📝 Documentation

- Added MIGRATION_GUIDE_V1.md
- Updated README with new dependencies
- Added Day.js usage examples

### 🔄 Migration Path

See [MIGRATION_GUIDE_V1.md](./MIGRATION_GUIDE_V1.md) for detailed migration instructions.

**Quick Summary:**
1. Update to v1.0.0: `npm install d-react-components@1.0.0`
2. Install Day.js: `npm install dayjs@^1.11.13`
3. Replace Moment.js with Day.js in your code
4. Update Ant Design if used directly: `npm install antd@^5.21.6`

---

## [0.3.91] - Previous Release

### Changed
- Various bug fixes and improvements
- Component enhancements

---

## Future Releases

### [2.0.0] - Planned

#### Planned Changes
- Replace Bootstrap utilities with Tailwind CSS
- Further bundle size reduction
- Modern utility-first styling approach
- Improved developer experience

Stay tuned for updates!

---

## Version History

- **1.0.0** - First stable release (Ant Design v5, Day.js, Bootstrap removed)
- **0.3.91** - Previous version (Ant Design v4, Moment.js, Bootstrap)

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Report an issue](https://github.com/boythan/d-component-library/issues)
- Migration Help: See [MIGRATION_GUIDE_V1.md](./MIGRATION_GUIDE_V1.md)
