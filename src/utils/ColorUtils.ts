function hexToRGB(hex: string, alpha: number = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Maps bare color names to Tailwind scale suffixes.
// Theme colors (primary, success, etc.) pass through unchanged — they map to CSS vars in tailwind.css.
const SCALE_SUFFIX: Record<string, string> = {
    red:    "red-500",
    green:  "green-500",
    blue:   "blue-500",
    yellow: "yellow-400",
    gray:   "gray-500",
};

// Tailwind safelist — these literals ensure the classes are included in the build:
// bg-red-500 text-red-500 border-red-500
// bg-green-500 text-green-500 border-green-500
// bg-blue-500 text-blue-500 border-blue-500
// bg-yellow-400 text-yellow-400 border-yellow-400
// bg-gray-500 text-gray-500 border-gray-500

/** Returns the Tailwind suffix for a color name, e.g. "red" → "red-500", "primary" → "primary". */
function colorToTailwindSuffix(color: string): string {
    return SCALE_SUFFIX[color] ?? color;
}

/** Returns `bg-*` Tailwind class for a color name, e.g. "red" → "bg-red-500". */
function colorToBgClass(color: string): string {
    return `bg-${colorToTailwindSuffix(color)}`;
}

/** Returns `text-*` Tailwind class for a color name, e.g. "red" → "text-red-500". */
function colorToTextClass(color: string): string {
    return `text-${colorToTailwindSuffix(color)}`;
}

/** Returns `border-*` Tailwind class for a color name, e.g. "red" → "border-red-500". */
function colorToBorderClass(color: string): string {
    return `border-${colorToTailwindSuffix(color)}`;
}

// Colors that are light and should use dark text when used as a background.
const LIGHT_COLORS = new Set(["light", "muted", "yellow", "warning"]);

/** True when `color` is a light background that needs dark text. */
function isLightColor(color: string): boolean {
    return LIGHT_COLORS.has(color);
}

export default { hexToRGB, colorToTailwindSuffix, colorToBgClass, colorToTextClass, colorToBorderClass, isLightColor };
