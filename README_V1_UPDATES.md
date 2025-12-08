# README Updates for v1.0.0

Add these sections to your README.md:

---

## Version 1.0.0 - Major Update! 🎉

This is the first stable 1.0 release with significant improvements:

- ✅ **Ant Design v5** - Upgraded from v4 to latest stable v5
- ✅ **Day.js** - Replaced Moment.js with lightweight Day.js (~40% smaller)
- ✅ **No Bootstrap** - Removed Bootstrap dependency (~30% smaller bundle)
- ✅ **Same API** - All component interfaces unchanged

### Migration Required

If upgrading from v0.3.x, please see [MIGRATION_GUIDE_V1.md](./MIGRATION_GUIDE_V1.md)

---

## Installation

```bash
npm install d-react-components@1.0.0
```

### Peer Dependencies

```bash
# Required
npm install react@^17.0.0 react-dom@^17.0.0

# If using Ant Design directly
npm install antd@^5.21.6

# If using date utilities
npm install dayjs@^1.11.13
```

---

## Quick Start

```tsx
import React from 'react';
import { Button, Modal, DateInput } from 'd-react-components';
import 'd-react-components/dist/index.css';
import dayjs from 'dayjs';

function App() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());

  return (
    <div>
      <Button content="Open Modal" onClick={() => setOpen(true)} />
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
      >
        <DateInput
          value={date}
          onChange={setDate}
          label="Select Date"
        />
      </Modal>
    </div>
  );
}
```

---

## What's New in v1.0.0

### Ant Design v5
- Modern component designs
- Better performance
- Improved accessibility
- Updated CSS system

### Day.js
- Lightweight date library (2KB vs 67KB)
- Moment.js compatible API
- Better tree-shaking
- Smaller bundle size

### No Bootstrap
- Removed Bootstrap CSS dependency
- Bootstrap utility classes still available
- Smaller bundle size
- Faster load times

### Same Component API
- No breaking changes to component props
- All existing code works with minimal changes
- Only date library imports need updating

---

## Dependencies

### Required
- `react` >= 16.9.0
- `react-dom` >= 16.9.0

### Included
- `antd` ^5.21.6
- `dayjs` ^1.11.13
- `classnames` ^2.3.1
- `lodash` ^4.17.21
- `react-highlight-words` ^0.17.0
- `react-resizable` ^3.0.1

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Documentation

- [Migration Guide v1.0.0](./MIGRATION_GUIDE_V1.md)
- [Changelog](./CHANGELOG.md)
- [Component Documentation](./docs) (if you have one)

---

## Contributing

Contributions are welcome! Please read our contributing guidelines first.

---

## License

UNLICENSED

---

## Support

For issues and questions:
- [GitHub Issues](https://github.com/boythan/d-component-library/issues)
- [Migration Guide](./MIGRATION_GUIDE_V1.md)

---

## Roadmap

### v2.0.0 (Planned)
- Tailwind CSS integration
- Remove Bootstrap utilities
- Further bundle size reduction
- Enhanced TypeScript support

Stay tuned!
