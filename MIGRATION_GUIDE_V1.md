# Migration Guide: v0.3.x → v1.0.0

## Overview

Version 1.0.0 is a major release:

- **React 18 or 19** — React 17 is no longer supported (required by Ant Design v6)
- **Ant Design v6** — upgraded from v4.23.1
- **Day.js** — replaces Moment.js
- **Tailwind CSS v4 styles** — the library no longer ships Bootstrap, its SCSS sources, or global/utility styles
- **Theming through `DThemeProvider`** — brand colour and font are configured in JavaScript

Most component props are unchanged, but several things around them changed: how styles are imported,
which global styles exist, and how the theme is set. Read [Styles](#styles) and [Theming](#theming)
even if your code compiles after upgrading.

---

## Requirements

| | v0.3.x | v1.0.0 |
|---|---|---|
| React / React DOM | 16.9+ / 17 | **18 or 19** |
| Ant Design | 4.23.1 (bundled dependency) | **≥ 6** (peer dependency) |
| Dates | Moment.js | **Day.js** (peer dependency) |
| lodash | bundled | **≥ 4** (peer dependency) |
| react-resizable | bundled | **≥ 4** (peer dependency) |
| Node.js (build) | any | **≥ 18** (`query-string` 9) |
| Sass (only if you import the CSS from Sass) | — | **≥ 1.64** (see [Styles](#importing-the-css)) |

```bash
npm install d-react-components@^1.0.0
npm install react@^19 react-dom@^19 antd@^6 dayjs@^1.11 lodash@^4 react-resizable@^4
npm uninstall moment
```

v0.3.x also listed `node-sass` as a dependency, which forced a native build (Python + C++ toolchain) on
`npm install`. v1.0.0 has no native dependencies.

---

## Breaking changes

### 1. React 18+

```tsx
// Before (React 17)
import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root"));

// After (React 18 / 19)
import { createRoot } from "react-dom/client";
createRoot(document.getElementById("root")!).render(<App />);
```

If you go to React 19, also check your own code for APIs it removed:

- `defaultProps` on **function** components is ignored — use default parameters instead
  (`function Rating({ value = 0 })`). Class components still support `defaultProps`.
- `ReactDOM.findDOMNode` is gone. Libraries that call it break at runtime, e.g. `react-sortable-hoc`
  (replace with `@dnd-kit`), `react-images` (replace with `yet-another-react-lightbox`), `react-quill`
  (replace with `react-quill-new`).
- `componentWillMount` / `componentWillReceiveProps` / `componentWillUpdate` → use the `UNSAFE_` names or refactor.

### 2. Ant Design v6

Components from this library use antd v6 internally. If your app also uses antd directly,
apply the antd v6 changes, most commonly:

| antd v4 | antd v6 |
|---|---|
| `<Modal visible>` / `<Drawer visible>` | `open` |
| `<Dropdown overlay={<Menu>…</Menu>}>` | `menu={{ items }}`, or `popupRender={() => node}` for custom content |
| `destroyOnClose` | `destroyOnHidden` (old name still works, with a warning) |
| `placement="bottomCenter"` | `placement="bottom"` |
| `import X from "antd/lib/x/X"` | `import { X } from "antd"` |
| `moment` values in `DatePicker` / `TimePicker` | `dayjs` values |
| CSS `.ant-modal-content` | `.ant-modal-container` (same position: direct child of `.ant-modal`) |
| Modal padding on header / body (24px) / footer, none on the container | padding on `.ant-modal-container`, none on the body (`--ant-modal-body-padding: 0`). To keep the antd 4 layout (and existing `.ant-modal-body` CSS), set Modal tokens: `contentPadding: 0, headerPadding: "16px 24px", headerMarginBottom: 0, bodyPadding: 24, footerPadding: "8px 16px", footerMarginTop: 0` (optionally `headerBorderBottom` / `footerBorderTop`) in `theme.components.Modal` |
| CSS `.ant-select-selector` (inner box with border/padding/height) | removed: style the root `.ant-select`; height via `--ant-select-height` |
| CSS `.ant-select-selection-placeholder` | `.ant-select-placeholder` |

**Do not import `antd/dist/antd.css`.** antd v6 injects its styles at runtime. The static `antd.css` is
only for antd's zero-runtime mode; it defines default (blue) theme variables on the same
`.css-var-*` class names the runtime uses, and because it is not in a CSS layer it overrides your theme.
`antd/dist/reset.css` is optional (a small global reset).

### 3. Day.js instead of Moment.js

`DateInput`, `TimeUtils` and every date prop now take and return Day.js objects.
Passing a Moment object to a date picker throws at runtime.

```tsx
// Before
import moment from "moment";
<DateInput value={moment(order.created)} />

// After
import dayjs from "dayjs";
<DateInput value={dayjs(order.created)} />
```

Differences to watch for when converting:

| Moment | Day.js |
|---|---|
| `.format("yyyy-MM-DD")` (lower-case `yyyy` accepted) | `.format("YYYY-MM-DD")` — `yyyy` is printed literally |
| `.format("x")` (Unix ms) | needs `dayjs.extend(advancedFormat)` |
| `.add("years", 543)` (legacy argument order) | `.add(543, "year")` only |
| custom parse formats | need `dayjs.extend(customParseFormat)` |

Register plugins once, in a module every file imports:

```ts
// src/utils/dayjs.js
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
export default dayjs;
```

### 4. Component API changes

Props are the same as v0.3.x except:

| Component | Change |
|---|---|
| `Dropdown` | `value` prop removed |
| `InputText` | `key` removed from the props type (React's own `key` still works) |
| `Button` | colour comes from `DThemeProvider` (default `#2196f3`), not from your CSS — see [Theming](#theming) |
| `DateInput`, `TimeUtils` | Day.js instead of Moment.js |
| `AwesomeTableComponent` | 1.0.0 rendered every row with `whitespace-nowrap`, so long cell text overflowed into neighbouring columns. Fixed in the next release (rows wrap again; pass `rowClassName` to override). |

---

## Styles

### Importing the CSS

The stylesheet moved and the SCSS sources are no longer published:

| v0.3.x | v1.0.0 |
|---|---|
| `d-react-components/dist/index.css` | `d-react-components/dist/es/index.css` (or `dist/cjs/index.css`) |
| `d-react-components/dist/dcomponent.es.scss` | removed |
| `d-react-components/dist/_variables.scss` | removed |

Import it from JavaScript, before your own styles:

```tsx
import "d-react-components/dist/es/index.css";
import "./styles/app.scss";
```

If you import it from Sass instead:

- use **Sass ≥ 1.64**; older versions fail on `calc(infinity * 1px)` in the Tailwind output;
- leave off the `.css` extension (`@import "d-react-components/dist/es/index";`) so Sass inlines the file.
  With the extension, Sass emits a plain CSS `@import` in the middle of your stylesheet, which bundlers
  either drop or warn about.

If your Sass used variables from `dist/_variables.scss` (`$primary-color`, `$font-family`, spacing,
typography…), copy that file from v0.3.x into your project and import it from there.

### Global styles are no longer included

v0.3.x's stylesheet styled the **whole page**, not only its own components. It included:

- Bootstrap 4;
- antd 4's full CSS and reset;
- global typography — `body` font (`var(--appFont)`, Poppins/Prompt), text colour `#3d464d`, heading sizes,
  link colour, `p` and `label` styles;
- utility classes such as `text-x-small`, `text-xx-small`, `text-label`, `flex-center`, `flex-center-y`,
  `hover-pointer`, `image-square-small`, `w-fit-content`, `divider`, `md-modal`, `border-selected`;
- base layout styles for app-shell markup (`app-layout__*`, `page-header__*`).

v1.0.0 ships none of these. After upgrading, an app that relied on them will lose its fonts, link colours,
spacing and layout even though it compiles. To keep them, either:

- install and import Bootstrap yourself (`npm install bootstrap@4`, then import `bootstrap/dist/css/bootstrap.min.css`), and
- copy the rules you use from v0.3.x's `dist/index.css` into your own stylesheet. Copy only the
  rules whose classes your code actually uses, and leave out the `ant-*` rules: antd v6 styles its own components.

### CSS layers and class-name conflicts

The v1 stylesheet is Tailwind CSS v4 output, inside `@layer theme, base, components, utilities`.
**Any CSS outside a layer beats layered CSS, whatever its specificity or order.** Consequences:

- Your own styles override the library's without `!important`.
- **A class in your CSS with the same name as a Tailwind utility the library uses also overrides it**, inside
  the library's components. Example: a storefront `.block { margin-bottom: 46px }` rule gave every `Button`
  icon (which uses Tailwind's `block`) a 46px bottom margin, so icons were drawn above their buttons.
  Look for global rules on generic names like `.block`, `.flex`, `.hidden`, `.border`, `.rounded`, `.truncate`.
- Bootstrap 4 shares many utility names with Tailwind but uses a **different spacing scale**. Where both are
  loaded, Bootstrap's values apply inside library components (slightly larger paddings and margins):

| Suffix | Bootstrap 4 | Tailwind |
|---|---|---|
| `-1` | 0.25rem | 0.25rem |
| `-2` | 0.5rem | 0.5rem |
| `-3` | **1rem** | 0.75rem |
| `-4` | **1.5rem** | 1rem |
| `-5` | **3rem** | 1.25rem |

### Moving off Bootstrap (optional)

If you do drop Bootstrap, the class names map like this. Note the spacing suffixes change from `-3` up:

| Bootstrap 4 | Tailwind |
|---|---|
| `d-flex` | `flex` |
| `flex-column` | `flex-col` |
| `justify-content-between` / `-center` | `justify-between` / `justify-center` |
| `align-items-center` | `items-center` |
| `p-1`, `m-1` (0.25rem) | `p-1`, `m-1` |
| `p-2`, `m-2` (0.5rem) | `p-2`, `m-2` |
| `p-3`, `m-3` (1rem) | `p-4`, `m-4` |
| `p-4`, `m-4` (1.5rem) | `p-6`, `m-6` |
| `p-5`, `m-5` (3rem) | `p-12`, `m-12` |
| `w-100` / `h-100` | `w-full` / `h-full` |
| `w-50` | `w-1/2` |
| `text-start` / `text-end` | `text-left` / `text-right` |
| `border-top` / `border-bottom` | `border-t` / `border-b` |
| `font-weight-bold` | `font-bold` |

The same applies to every side/axis variant (`pt-3` → `pt-4`, `mx-4` → `mx-6`, …).

---

## Theming

### Brand colour

In v0.3.x the primary colour came from SCSS (`$primary-color`, compiled into the CSS). In v1.0.0 it is
set in JavaScript with `DThemeProvider`. **Without it, `Button` and every antd component use the default
blue `#2196f3`.**

```tsx
import { DThemeProvider } from "d-react-components";

<DThemeProvider theme={{ token: { colorPrimary: "#de0d0c" } }}>
  <App />
</DThemeProvider>
```

`DThemeProvider`:

- wraps antd's `ConfigProvider`, so `theme` accepts any antd theme config (`token`, `components`, …);
- sets `--color-primary` for the library's Tailwind classes;
- gives `Button` its colour through React context (CSS alone cannot change it);
- renders a wrapping `<div>` that carries the CSS variables. If your layout depends on the structure under
  `#root` (e.g. `height: 100%` chains), make that div layout-neutral:

```css
#root > div:first-child { display: contents; }
```

Content rendered in portals (modals, dropdowns) is outside that `<div>`. To colour Tailwind classes there
too, also set the variable globally:

```css
:root { --color-primary: #de0d0c; }
```

**Keeping one source of truth with SCSS themes:** expose the theme as CSS variables and read them once at startup:

```scss
:root {
  --app-primary-color: #{$primary-color};
  --color-primary: #{$primary-color};
}
```

```tsx
const colorPrimary = getComputedStyle(document.documentElement)
  .getPropertyValue("--app-primary-color").trim() || "#de0d0c";

<DThemeProvider theme={{ token: { colorPrimary } }}>…</DThemeProvider>
```

### Font

antd defaults to its own system-font stack. Pass your font as a theme token. If it changes with the
language (e.g. Poppins for `en`, Prompt for `th` via `:root:lang(...)`), pass a CSS variable so it keeps
following `<html lang>`:

```tsx
<DThemeProvider theme={{ token: { colorPrimary, fontFamily: "var(--app-font-family)" } }}>
```

The library's Tailwind styles read `--app-font`. It defines both `--app-font` and the v0.3.x `--appFont`
as Poppins for `:lang(en)` and Prompt for `:lang(th)`. To use another font, override both, outside a layer:

```css
:root:lang(en) { --app-font: "Inter", sans-serif; --appFont: "Inter", sans-serif; }
```

---

## Migration checklist

1. Update dependencies ([Requirements](#requirements)); remove `moment` and `node-sass`.
2. Switch to `createRoot`; on React 19, fix function-component `defaultProps` and replace libraries that use `findDOMNode`.
3. Replace Moment.js with Day.js everywhere a date reaches a library or antd component.
4. Apply antd v6 changes to direct antd usage (`visible` → `open`, `overlay` → `menu`, …); remove any `antd/dist/antd.css` import.
5. Change the CSS import to `d-react-components/dist/es/index.css`.
6. Restore the global styles you relied on: Bootstrap, typography, utility classes, `_variables.scss`.
7. Wrap the app in `DThemeProvider` with your `colorPrimary` (and `fontFamily`).
8. Search your CSS for global rules on Tailwind utility names (`.block`, `.flex`, `.hidden`, …).
9. Check visually: buttons with icons, tables with long text, modals, date pickers, forms, and every brand theme if you have more than one.

---

## Common issues

| Symptom | Cause | Fix |
|---|---|---|
| `npm install` fails with `gyp ERR! find Python` | `node-sass` from v0.3.x (or your app) | Upgrade to v1.0.0; remove `node-sass` and use `sass` |
| `Can't resolve 'd-react-components/dist/index.css'` | stylesheet moved | `d-react-components/dist/es/index.css` |
| `Can't resolve '…/dist/dcomponent.es.scss'` or `'…/dist/variables'` | SCSS no longer published | remove the import / copy `_variables.scss` from v0.3.x |
| Sass: `Expected "(" or "."` at `calc(infinity * 1px)` | Sass < 1.64 | upgrade `sass` |
| Buttons and antd components are blue | no `DThemeProvider`, or `antd/dist/antd.css` imported | add `DThemeProvider`; remove `antd.css` |
| Fonts, link colours, text sizes look like browser defaults | v0.3.x global styles gone | see [Global styles](#global-styles-are-no-longer-included) |
| Button icons drawn above the button | a global `.block { margin… }` rule overrides Tailwind's `block` | remove/rename the global rule |
| Table cell text overlaps the next column | `whitespace-nowrap` on rows in 1.0.0 | upgrade to the fixed release, or pass `rowClassName={() => "align-middle"}` |
| Date pickers throw a `… is not a function` TypeError or show an invalid date | Moment object passed to a Day.js API | convert to `dayjs(...)` |
| antd component font differs from the app | antd default font token | `token.fontFamily` in `DThemeProvider` |

---

## Need help?

- [Ant Design v6 migration guide](https://ant.design/docs/react/migration-v6)
- [React 19 upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Day.js documentation](https://day.js.org/)
- [Tailwind CSS: cascade layers](https://tailwindcss.com/docs/adding-custom-styles#using-css-and-layer)
- [GitHub issues](https://github.com/boythan/d-component-library/issues)
