# Migration Guide: v0.3.x → v1.0.0

## Overview

Version 1.0.0 is a major release that includes:
- ✅ **Ant Design v6** - Upgraded from v4.23.1 to v6.0.1
- ✅ **React 18** - Upgraded from React 17 to React 18
- ✅ **Day.js** - Replaced Moment.js with Day.js
- ✅ **Bootstrap Removed** - All Bootstrap CSS and utility classes removed
- ⚠️ **Breaking Changes** - Bootstrap utilities no longer available

## Breaking Changes

### 1. React 18 Required

React 18 is now required (Ant Design v6 dependency).

**Action Required:**
```bash
npm install react@^18.3.1 react-dom@^18.3.1
```

**Code Changes:**
```tsx
// Before (React 17)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// After (React 18)
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root')!);
root.render(<App />);
```

### 2. Ant Design v6

Upgraded to Ant Design v6 with modern features and improvements.

**Action Required:**
```bash
npm install antd@^6.0.0
```

**CSS Import:**
```tsx
// Update your CSS import
import 'antd/dist/reset.css';
```

### 3. Day.js Instead of Moment.js

All date handling now uses Day.js.

**Action Required:**
```bash
npm install dayjs@^1.11.13
npm uninstall moment
```

**Code Changes:**
```tsx
// Before (v0.3.x)
import moment from 'moment';
const date = moment(value);

// After (v1.0.0)
import dayjs from 'dayjs';
const date = dayjs(value);
```

### 4. Bootstrap Completely Removed

**ALL Bootstrap CSS and utility classes have been removed.**

**Action Required:**
You must replace all Bootstrap utility classes in your code:

```tsx
// Before - These NO LONGER WORK
<div className="d-flex justify-content-between py-3">
<div className="w-100 text-center">
<div className="bg-primary text-white">

// After - Use inline styles, CSS modules, or Tailwind
<div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
<div style={{ width: '100%', textAlign: 'center' }}>
<div style={{ backgroundColor: '#DE0D0C', color: 'white' }}>
```

**Recommended:** Install Tailwind CSS for utility classes:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then use Tailwind classes:
```tsx
<div className="flex justify-between py-3">
<div className="w-full text-center">
<div className="bg-primary text-white">
```

---

## Installation

### Update Package

```bash
npm install d-react-components@1.0.0
```

### Update Dependencies

```bash
# Required
npm install react@^18.3.1 react-dom@^18.3.1
npm install antd@^6.0.0
npm install dayjs@^1.11.13

# Remove old dependencies
npm uninstall moment bootstrap
```

---

## Component Changes

### No Breaking Changes to Component APIs

All component props and APIs remain the same:

- ✅ Modal, Drawer, Dialog - same props
- ✅ Table, Select, Input - same props
- ✅ DateInput - same props (but uses Day.js internally)
- ✅ All other components - same props

---

## Migration Steps

### Step 1: Update Dependencies

```bash
# Update to v1.0.0
npm install d-react-components@1.0.0

# Update peer dependencies
npm install react@^18.3.1 react-dom@^18.3.1 antd@^6.0.0 dayjs@^1.11.13

# Remove old dependencies
npm uninstall moment bootstrap
```

### Step 2: Update React 18 Entry Point

```tsx
// src/index.tsx or src/main.tsx

// Before (React 17)
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// After (React 18)
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 3: Replace Moment.js with Day.js

Find and replace in your codebase:

```bash
# Find all moment imports
grep -r "import.*moment" src/

# Replace with dayjs
# import moment from 'moment' → import dayjs from 'dayjs'
# moment(date) → dayjs(date)
```

### Step 4: Remove Bootstrap Utility Classes

**Option A: Use Inline Styles**
```tsx
// Before
<div className="d-flex justify-content-between py-3 px-4">

// After
<div style={{ 
  display: 'flex', 
  justifyContent: 'space-between', 
  padding: '12px 16px' 
}}>
```

**Option B: Install Tailwind CSS** (Recommended)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```tsx
// Before
<div className="d-flex justify-content-between py-3 px-4">

// After
<div className="flex justify-between py-3 px-4">
```

### Step 5: Update CSS Imports

```tsx
// Remove Bootstrap import (if you had it)
// import 'bootstrap/dist/css/bootstrap.min.css'; // REMOVE

// Update Ant Design import
import 'antd/dist/reset.css';

// Import your library
import 'd-react-components/dist/index.css';
```

### Step 6: Test Your Application

1. Run your application
2. Test all components
3. Verify styling (Bootstrap classes removed)
4. Test date functionality
5. Test React 18 features

---

## Common Issues

### Issue: "Cannot find module 'react-dom/client'"

**Solution:** Update to React 18:
```bash
npm install react@^18.3.1 react-dom@^18.3.1
```

### Issue: "Bootstrap classes not working"

**Solution:** Bootstrap has been completely removed. Use Tailwind CSS or inline styles:
```bash
npm install -D tailwindcss
```

### Issue: "Cannot find module 'moment'"

**Solution:** Replace moment with dayjs:
```bash
npm install dayjs
# Update all imports: moment → dayjs
```

### Issue: "Ant Design styles look different"

**Solution:** Ant Design v6 has updated styles. This is expected. Review the [Ant Design v6 migration guide](https://ant.design/docs/react/migration-v6) for details.

---

## Bootstrap to Tailwind Mapping

Common Bootstrap classes and their Tailwind equivalents:

| Bootstrap | Tailwind | Description |
|-----------|----------|-------------|
| `d-flex` | `flex` | Flexbox |
| `justify-content-between` | `justify-between` | Justify content |
| `justify-content-center` | `justify-center` | Center justify |
| `align-items-center` | `items-center` | Align items |
| `flex-column` | `flex-col` | Flex direction |
| `py-1` | `py-1` | Padding Y (4px) |
| `py-2` | `py-2` | Padding Y (8px) |
| `py-3` | `py-3` | Padding Y (12px) |
| `px-1` | `px-1` | Padding X (4px) |
| `px-2` | `px-2` | Padding X (8px) |
| `px-3` | `px-3` | Padding X (12px) |
| `my-1` | `my-1` | Margin Y (4px) |
| `my-2` | `my-2` | Margin Y (8px) |
| `my-3` | `my-3` | Margin Y (12px) |
| `mx-1` | `mx-1` | Margin X (4px) |
| `mx-2` | `mx-2` | Margin X (8px) |
| `mx-3` | `mx-3` | Margin X (12px) |
| `mr-3` | `mr-3` | Margin right (12px) |
| `ml-3` | `ml-3` | Margin left (12px) |
| `mt-3` | `mt-3` | Margin top (12px) |
| `mb-3` | `mb-3` | Margin bottom (12px) |
| `w-100` | `w-full` | Width 100% |
| `w-50` | `w-1/2` | Width 50% |
| `h-100` | `h-full` | Height 100% |
| `text-center` | `text-center` | Text align center |
| `text-start` | `text-left` | Text align left |
| `text-end` | `text-right` | Text align right |
| `bg-primary` | `bg-primary` | Background (custom) |
| `text-white` | `text-white` | Text color white |
| `border` | `border` | Border |
| `border-top` | `border-t` | Border top |
| `border-bottom` | `border-b` | Border bottom |

---

## Day.js Plugins

If you need advanced date functionality:

```bash
npm install dayjs
```

```tsx
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
```

---

## Summary

**What Changed:**
- React 17 → React 18
- Ant Design v4 → v6
- Moment.js → Day.js
- Bootstrap completely removed

**What Stayed the Same:**
- All component APIs
- All component props
- Component behavior

**Action Required:**
1. Update to React 18
2. Update dependencies
3. Replace moment with dayjs
4. Replace Bootstrap classes with Tailwind or inline styles
5. Test your application

**Bundle Size Impact:**
- ~40% smaller (Bootstrap + Moment.js removed)
- ~60% smaller date library (Day.js vs Moment.js)

---

## Need Help?

- [Ant Design v6 Migration Guide](https://ant.design/docs/react/migration-v6)
- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [Day.js Documentation](https://day.js.org/)
- [Tailwind CSS Installation](https://tailwindcss.com/docs/installation)
- [GitHub Issues](https://github.com/boythan/d-component-library/issues)
