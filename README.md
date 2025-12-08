# D React Components

A comprehensive React component library built on top of Ant Design v5, providing ready-to-use components with customizable styling.

## Version 1.0.0 - Major Update! 🎉

This is the first stable 1.0 release with significant improvements:

- ✅ **Ant Design v5** - Upgraded from v4 to latest stable v5
- ✅ **Day.js** - Replaced Moment.js with lightweight Day.js (~40% smaller)
- ✅ **No Bootstrap** - Removed Bootstrap dependency (~30% smaller bundle)
- ✅ **Same API** - All component interfaces unchanged

**Upgrading from v0.3.x?** See [MIGRATION_GUIDE_V1.md](./MIGRATION_GUIDE_V1.md)

---

## Installation

```bash
npm install d-react-components
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
import { Button, Modal, DateInput, Select } from 'd-react-components';
import 'd-react-components/dist/index.css';
import dayjs from 'dayjs';

function App() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(dayjs());

  return (
    <div>
      <Button 
        content="Open Modal" 
        onClick={() => setOpen(true)} 
        variant="standard"
      />
      
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Example Modal"
        hasCancelButton
      >
        <DateInput
          value={date}
          onChange={setDate}
          label="Select Date"
          format="DD/MM/YYYY"
        />
      </Modal>
    </div>
  );
}
```

---

## Components

### Form Components

#### Button
```tsx
<Button 
  content="Click Me"
  iconName="home"
  variant="standard" // or "outline", "trans"
  color="primary"
  size="medium"
  onClick={() => {}}
/>
```

#### Input
```tsx
<InputText
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  variant="outline" // or "standard"
  error={error}
/>
```

#### Select
```tsx
<Select
  label="Choose Option"
  dataSource={[
    { id: 1, label: 'Option 1' },
    { id: 2, label: 'Option 2' }
  ]}
  value={selected}
  onChange={setSelected}
  getLabel={(item) => item.label}
  getValue={(item) => item.id}
  multiple={false}
/>
```

#### DateInput
```tsx
<DateInput
  label="Select Date"
  value={dayjs()}
  onChange={setDate}
  format="DD/MM/YYYY"
  type="date" // or "time", "date-time"
  showTime={false}
/>
```

### Display Components

#### Modal
```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  onSave={handleSave}
  title="Modal Title"
  size="medium" // or "small", "large"
  hasCancelButton
  saveText="Save"
  cancelText="Cancel"
>
  {/* Modal content */}
</Modal>
```

#### Drawer
```tsx
<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  size="medium" // or "small", "large", "x-large"
  placement="right"
>
  {/* Drawer content */}
</Drawer>
```

#### Table
```tsx
<AwesomeTableComponent
  columns={[
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' }
  ]}
  source={(pagination, sorter) => fetchData(pagination, sorter)}
  transformer={(response) => response.data}
  isPagination
  isScroll
/>
```

---

## Component Props Reference

### Common Props

All components support these common props:

- `className` - Container class name
- `classNameLabel` - Label class name
- `disabled` - Disable the component
- `error` - Error message to display

### Button Props

- `content` - Button text
- `iconName` - Material icon name
- `suffixIcon` - Icon after text
- `variant` - "standard" | "outline" | "trans"
- `color` - "primary" | "secondary" | "success" | "error"
- `size` - "small" | "medium" | "large" | "fit-content"
- `onClick` - Click handler

### Select Props

- `label` - Label text
- `value` - Selected value(s)
- `defaultValue` - Default value
- `placeholder` - Placeholder text
- `onChange` - Change handler
- `dataSource` - Array of options
- `multiple` - Enable multi-select
- `variant` - "outline" | "standard"
- `getLabel` - Function to get label from item
- `getKey` - Function to get key from item
- `getValue` - Function to get value from item

### Input Props

- `label` - Label text
- `value` - Input value
- `placeholder` - Placeholder text
- `onChange` - Change handler
- `variant` - "outline" | "standard"
- `type` - Input type
- `multiple` - Textarea mode
- `rows` - Textarea rows

### DateInput Props

- `label` - Label text
- `value` - Date value (Day.js object)
- `onChange` - Change handler
- `format` - Date format string
- `type` - "date" | "time" | "date-time" | "week" | "month" | "year"
- `showTime` - Show time picker
- `isRangePicker` - Enable range selection

---

## Styling

### CSS Classes

The library provides Bootstrap-style utility classes:

#### Flexbox
```tsx
<div className="d-flex justify-content-between align-items-center">
<div className="flex-center-y">
<div className="flex-column">
```

#### Spacing
```tsx
<div className="py-3 px-4"> {/* padding */}
<div className="my-2 mx-3"> {/* margin */}
<div className="mr-3 ml-2"> {/* margin-right, margin-left */}
```

#### Sizing
```tsx
<div className="w-100"> {/* width: 100% */}
<div className="h-100"> {/* height: 100% */}
```

#### Text
```tsx
<div className="text-center text-primary">
<div className="text-small text-nowrap">
```

#### Background
```tsx
<div className="bg-primary text-white">
<div className="bg-light-gray">
```

### Custom Styling

Override component styles using className props:

```tsx
<Button 
  className="my-custom-button"
  classNameLabel="my-custom-label"
/>
```

---

## Utilities

### TimeUtils

```tsx
import { TimeUtils } from 'd-react-components';
import dayjs from 'dayjs';

// Format dates
TimeUtils.convertMiliToDateTime(Date.now());
TimeUtils.convertMiliToDate(Date.now());
TimeUtils.format(Date.now(), 'DD/MM/YYYY');

// Calculate differences
TimeUtils.calculateTimeDifferent(date1, date2, 'day');
TimeUtils.calculateDayDifferent(date1, date2);

// Get date ranges
TimeUtils.getFirstDayOf(new Date(), 'month');
TimeUtils.getLastDayOf(new Date(), 'month');

// Check date ranges
TimeUtils.checkTimeIsBetweenRangeDate(date, start, end);
```

---

## TypeScript Support

All components are written in TypeScript and include type definitions.

```tsx
import { ButtonProps, SelectProps, ModalProps } from 'd-react-components';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Documentation

- [Migration Guide v1.0.0](./MIGRATION_GUIDE_V1.md) - Upgrade from v0.3.x
- [Changelog](./CHANGELOG.md) - Version history
- [Upgrade Summary](./UPGRADE_SUMMARY_V1.md) - Technical details

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
- Smaller bundle size (~30% reduction)
- Faster load times

### Same Component API
- No breaking changes to component props
- All existing code works with minimal changes
- Only date library imports need updating

---

## Roadmap

### v2.0.0 (Planned)
- Tailwind CSS integration
- Remove Bootstrap utilities
- Further bundle size reduction
- Enhanced TypeScript support
- React 18 support

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## License

UNLICENSED

---

## Support

For issues and questions:
- [GitHub Issues](https://github.com/boythan/d-component-library/issues)
- [Migration Guide](./MIGRATION_GUIDE_V1.md)

---

## Credits

Built with:
- [React](https://reactjs.org/)
- [Ant Design](https://ant.design/)
- [Day.js](https://day.js.org/)
- [Lodash](https://lodash.com/)
