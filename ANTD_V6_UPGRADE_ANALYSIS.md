# Ant Design v4 to v6 Upgrade Analysis

## Current State
- **Current Version**: antd 4.23.1
- **Target Version**: antd 6.x
- **Library Type**: React component library wrapper around Ant Design

## Executive Summary

**Upgrade Feasibility**: ✅ **POSSIBLE** but requires moderate effort

The upgrade from Ant Design v4 to v6 is feasible for this library. The main challenges involve:
1. Breaking API changes in Ant Design components
2. Moment.js to Day.js migration
3. Deprecated props and methods
4. TypeScript type updates

**Estimated Effort**: Medium (2-3 days of development + testing)

---

## Breaking Changes Analysis

### 1. **CRITICAL: Deprecated Props**

#### Modal Component (`visible` → `open`)
**Files Affected**: 
- `src/components/modal/Modal.tsx`
- `src/components/drawer/Drawer.tsx`
- `src/components/dialog/DialogComponent.tsx`

**Current Code**:
```tsx
<ModalAnt visible={open} />
<DrawerAnt visible={open} />
```

**Required Change**:
```tsx
<ModalAnt open={open} />
<DrawerAnt open={open} />
```

**Impact**: HIGH - Used in 3 wrapper components

---

#### Button Icon Prop (String → ReactNode)
**Files Affected**: 
- `src/components/table/AwesomeTableComponent.tsx` (line 225)

**Current Code**:
```tsx
<Button icon="search" />
```

**Required Change**:
```tsx
import { SearchOutlined } from '@ant-design/icons';
<Button icon={<SearchOutlined />} />
```

**Impact**: MEDIUM - Only 1 instance found

---

### 2. **CRITICAL: Moment.js → Day.js Migration**

Ant Design v6 no longer supports Moment.js and uses Day.js instead.

**Files Affected**:
- `src/components/dateInput/DateInput.tsx`
- `src/components/form/Form.tsx`
- `src/utils/TimeUtils.ts`
- `src/__test__/components/test_util/TestUtils.tsx`

**Current Dependencies**:
```json
"moment": "^2.29.1"
```

**Required Changes**:
1. Replace `moment` with `dayjs`
2. Update all date manipulation code
3. Update DatePicker value handling

**Example Migration**:
```tsx
// Before (v4)
import moment from 'moment';
const date = moment(value);

// After (v6)
import dayjs from 'dayjs';
const date = dayjs(value);
```

**Impact**: HIGH - Moment.js is used extensively in:
- Date formatting utilities
- Form date handling
- Time calculations
- Date range operations

---

### 3. **Import Path Changes**

#### Type Imports
**Files Affected**: Multiple files importing types from `antd/lib/*`

**Current Code**:
```tsx
import { SorterResult } from "antd/lib/table/interface";
import { ArgsProps } from "antd/lib/notification";
import { SelectProps, OptionProps } from "antd/es/select";
```

**Required Change**:
```tsx
import type { SorterResult } from "antd";
import type { NotificationArgsProps } from "antd";
import type { SelectProps, OptionProps } from "antd";
```

**Impact**: MEDIUM - Affects type imports across the codebase

---

### 4. **Component API Changes**

#### Table Component
**File**: `src/components/table/AwesomeTableComponent.tsx`

**Potential Issues**:
- `pagination.current` vs `pagination.pageIndex` handling
- Column resizing with `onHeaderCell`
- Filter and sorter interfaces may have changed

**Impact**: MEDIUM - Core table functionality

---

#### Select Component
**File**: `src/components/select/Select.tsx`, `src/components/select/SelectInfinity.tsx`

**Changes**:
- `mode="multiple"` API remains the same ✅
- `filterOption` API remains compatible ✅
- Custom `dropdownRender` may need adjustment

**Impact**: LOW - Mostly compatible

---

### 5. **CSS/SCSS Changes**

Ant Design v6 has updated CSS variable names and class structures.

**Files Affected**:
- `src/scss/*` (all SCSS files)
- Custom component styles

**Required Actions**:
1. Review custom SCSS overrides
2. Update CSS variable references
3. Test visual appearance

**Impact**: MEDIUM - Requires visual regression testing

---

## Detailed Migration Checklist

### Phase 1: Dependencies (1-2 hours)
- [ ] Update `antd` from `4.23.1` to `^6.0.0`
- [ ] Add `dayjs` dependency
- [ ] Remove or keep `moment` (if used elsewhere)
- [ ] Update `@ant-design/icons` to latest
- [ ] Update TypeScript types: `@types/react` compatibility

### Phase 2: Code Changes (1 day)

#### High Priority
- [ ] Replace all `visible` props with `open` in Modal/Drawer/Dialog
- [ ] Migrate all Moment.js code to Day.js
  - [ ] `src/utils/TimeUtils.ts`
  - [ ] `src/components/form/Form.tsx`
  - [ ] `src/components/dateInput/DateInput.tsx`
- [ ] Fix Button `icon` prop (string → ReactNode)
- [ ] Update import paths for types

#### Medium Priority
- [ ] Review Table component pagination handling
- [ ] Test Select/SelectInfinity dropdown rendering
- [ ] Update notification API usage
- [ ] Review Collapse expandIcon API

#### Low Priority
- [ ] Update SCSS overrides
- [ ] Review custom theme variables
- [ ] Update demo-site if needed

### Phase 3: Testing (1 day)
- [ ] Unit tests for date utilities
- [ ] Component rendering tests
- [ ] Visual regression testing
- [ ] Integration tests for Table/Select
- [ ] Demo site functionality

---

## Risk Assessment

### High Risk Areas
1. **Date Handling**: Moment → Day.js migration could introduce bugs in date calculations
2. **Table Component**: Complex component with many features (pagination, sorting, filtering, resizing)
3. **Custom Styling**: SCSS overrides may break with v6's CSS changes

### Medium Risk Areas
1. **Modal/Drawer**: Simple prop rename, low risk
2. **Select Components**: API mostly compatible
3. **TypeScript Types**: May need type adjustments

### Low Risk Areas
1. **Button/Icon**: Minimal usage of deprecated API
2. **Collapse/Timeline**: Simple wrappers
3. **Notifications**: Straightforward API

---

## Recommended Approach

### Option 1: Direct Upgrade (Recommended)
**Timeline**: 2-3 days
**Pros**: 
- Clean break, no technical debt
- Access to v6 features immediately
- Better long-term maintainability

**Cons**:
- Requires immediate testing
- Potential breaking changes for library consumers

### Option 2: Gradual Migration
**Timeline**: 1-2 weeks
**Pros**:
- Lower risk
- Can test incrementally

**Cons**:
- More complex
- Longer timeline
- May not be feasible with Ant Design's architecture

---

## Breaking Changes for Library Consumers

If you upgrade to v6, consumers of your library will need to:

1. **Update their antd version** to v6 (if they use antd directly)
2. **No API changes** in your library's public API (good news!)
3. **Potential visual differences** due to Ant Design's updated styles

---

## Additional Considerations

### 1. React Version
- Current: React 17
- Ant Design v6 supports React 18
- Consider upgrading React for better compatibility

### 2. TypeScript
- Current: TypeScript 4.1.2
- Consider upgrading to 4.9+ for better type support

### 3. Build Tools
- Rollup configuration may need updates
- SCSS compilation should remain compatible

---

## Conclusion

**Recommendation**: ✅ **Proceed with upgrade**

The upgrade from Ant Design v4 to v6 is feasible and recommended. The main work involves:
1. Moment.js → Day.js migration (most time-consuming)
2. Simple prop renames (visible → open)
3. Import path updates
4. Testing and validation

The library's architecture as a wrapper around Ant Design components makes this upgrade relatively straightforward, as most breaking changes are isolated to specific files.

**Next Steps**:
1. Create a feature branch for the upgrade
2. Update dependencies
3. Follow the migration checklist
4. Run comprehensive tests
5. Update documentation
6. Release as a major version (v1.0.0 or v0.4.0)
