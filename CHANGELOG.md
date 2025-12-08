# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
