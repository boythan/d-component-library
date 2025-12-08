# Release Checklist for v1.0.0

## Pre-Release Checklist

### ✅ Code Changes (COMPLETED)
- [x] Updated package.json to v1.0.0
- [x] Upgraded Ant Design 4.23.1 → 5.21.6
- [x] Removed Bootstrap dependency
- [x] Migrated Moment.js → Day.js
- [x] Fixed Modal/Drawer visible → open props
- [x] Fixed Button icon prop
- [x] Updated all type imports
- [x] Updated TimeUtils to use Day.js
- [x] Updated Form component
- [x] Updated test files
- [x] Build successful

### ✅ Documentation (COMPLETED)
- [x] Created MIGRATION_GUIDE_V1.md
- [x] Created CHANGELOG.md
- [x] Created UPGRADE_SUMMARY_V1.md
- [x] Updated README.md
- [x] Created README_V1_UPDATES.md
- [x] Created RELEASE_CHECKLIST.md

### 📋 Testing (TODO - MANUAL)

#### Build & Install
- [ ] Run `npm run build` - verify no errors
- [ ] Check dist/ folder - verify files generated
- [ ] Test in demo-site: `cd demo-site && npm install && npm start`
- [ ] Verify bundle size is smaller

#### Component Testing
- [ ] Test Modal component (open/close)
- [ ] Test Drawer component (open/close)
- [ ] Test Button component (with icons)
- [ ] Test Table component (sorting, filtering, pagination)
- [ ] Test Select component (single, multiple)
- [ ] Test DateInput component (date, time, range)
- [ ] Test Form component (all field types)
- [ ] Test Notifications (success, error, warning, info)

#### Date Functionality
- [ ] Test TimeUtils functions
- [ ] Test date formatting
- [ ] Test date calculations
- [ ] Test date ranges
- [ ] Test Thai language dates (if applicable)

#### Styling
- [ ] Verify Bootstrap utility classes work (d-flex, py-3, etc.)
- [ ] Verify Ant Design styles load correctly
- [ ] Check responsive behavior
- [ ] Test custom component styles
- [ ] Verify no CSS conflicts

#### TypeScript
- [ ] Run `npm run build` - no TypeScript errors
- [ ] Check type definitions in dist/
- [ ] Verify imports work in TypeScript projects

### 📋 Git & Version Control (TODO)

- [ ] Commit all changes
  ```bash
  git add .
  git commit -m "chore: release v1.0.0 - Ant Design v5, Day.js, Bootstrap removal"
  ```

- [ ] Create git tag
  ```bash
  git tag -a v1.0.0 -m "Release v1.0.0"
  ```

- [ ] Push to repository
  ```bash
  git push origin main
  git push origin v1.0.0
  ```

### 📋 NPM Publishing (TODO)

- [ ] Verify package.json version is 1.0.0
- [ ] Verify package.json files field includes dist/
- [ ] Test package locally
  ```bash
  npm pack
  # Install the .tgz file in a test project
  ```

- [ ] Publish to NPM
  ```bash
  npm run publishD
  # or
  npm publish
  ```

- [ ] Verify package on NPM
  - Check https://www.npmjs.com/package/d-react-components
  - Verify version 1.0.0 is published
  - Check package contents

### 📋 GitHub Release (TODO)

- [ ] Create GitHub release
  - Go to: https://github.com/boythan/d-component-library/releases/new
  - Tag: v1.0.0
  - Title: "v1.0.0 - Major Update: Ant Design v5, Day.js, Bootstrap Removal"
  - Description: Copy from CHANGELOG.md

- [ ] Attach release notes
  - Link to MIGRATION_GUIDE_V1.md
  - Highlight breaking changes
  - List new features

### 📋 Communication (TODO)

- [ ] Update project README on GitHub
- [ ] Notify users about the update
- [ ] Post in relevant channels/forums
- [ ] Update documentation site (if any)

### 📋 Post-Release Monitoring (TODO)

- [ ] Monitor GitHub issues for bug reports
- [ ] Monitor NPM download stats
- [ ] Check for user feedback
- [ ] Prepare hotfix if needed

---

## Quick Commands

### Build & Test
```bash
# Build the library
npm run build

# Start demo site
cd demo-site
npm install
npm start

# Check for TypeScript errors
npm run build
```

### Git & Publish
```bash
# Commit and tag
git add .
git commit -m "chore: release v1.0.0"
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin main --tags

# Publish to NPM
npm run publishD
```

### Verify
```bash
# Check package contents
npm pack
tar -tzf d-react-components-1.0.0.tgz

# Test in another project
npm install ./d-react-components-1.0.0.tgz
```

---

## Rollback Plan (If Needed)

If critical issues are found after release:

1. **Unpublish from NPM** (within 72 hours)
   ```bash
   npm unpublish d-react-components@1.0.0
   ```

2. **Revert Git Tag**
   ```bash
   git tag -d v1.0.0
   git push origin :refs/tags/v1.0.0
   ```

3. **Fix Issues**
   - Create hotfix branch
   - Fix critical bugs
   - Release v1.0.1

4. **Communicate**
   - Post issue on GitHub
   - Notify users
   - Provide workaround

---

## Success Criteria

Release is successful when:

- ✅ Build completes without errors
- ✅ All components render correctly
- ✅ Date functionality works with Day.js
- ✅ Styling is correct (no Bootstrap issues)
- ✅ Package published to NPM
- ✅ GitHub release created
- ✅ Documentation is clear
- ✅ No critical bugs reported in first 24 hours

---

## Notes

### Breaking Changes
- Ant Design v4 → v5 (internal)
- Moment.js → Day.js (user code)
- Bootstrap removed (CSS only)

### Non-Breaking
- All component APIs unchanged
- Bootstrap utility classes still work
- No prop changes

### Bundle Size
- Expected: ~30-40% smaller
- Verify with: `ls -lh dist/`

### Support
- Monitor GitHub issues
- Respond to questions quickly
- Prepare FAQ if needed

---

## Contact

For release issues:
- GitHub: https://github.com/boythan/d-component-library
- Issues: https://github.com/boythan/d-component-library/issues

---

**Status**: Ready for manual testing and release! 🚀
