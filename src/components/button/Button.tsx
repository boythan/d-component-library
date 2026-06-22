import React, { useContext, useState } from "react";
import ClassNames from "classnames";
import Icon from "../elements/icon/Icon";
import { DThemeContext } from "../theme/DThemeProvider";

// --- color utilities ---

const hexToRgb = (hex: string): [number, number, number] => {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};

const rgbToHex = (r: number, g: number, b: number): string =>
    "#" + [r, g, b].map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");

const getLuminance = (hex: string): number => {
    const [r, g, b] = hexToRgb(hex).map(v => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Returns white for dark backgrounds, near-black for light backgrounds (WCAG-based threshold). */
const contrastText = (hex: string): string => (getLuminance(hex) < 0.35 ? "#ffffff" : "#1f2937");

/** Lighten (positive) or darken (negative) a hex color by shifting RGB channels. */
const shiftBrightness = (hex: string, amount: number): string => {
    const [r, g, b] = hexToRgb(hex);
    return rgbToHex(r + amount, g + amount, b + amount);
};

// --- palette: default hex values matching @theme in tailwind.css ---
const COLOR_BG: Record<string, string> = {
    green:   "#33963d",
    red:     "#f44336",
    yellow:  "#fac256",
    blue:    "#17a2b8",
    gray:    "#6b7280",
    dark:    "#3d464d",
    light:   "#ffffff",
    error:   "#f44336",
    success: "#33963d",
    warning: "#fac256",
    muted:   "#f5f5f5",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string;
    iconName?: string;
    className?: string;
    classNameIcon?: string;
    classNameIconSuffix?: string;
    disabled?: boolean;
    size?: "large" | "medium" | "small" | "x-small" | "auto" | "fit-content";
    variant?: "standard" | "outline" | "trans";
    color?:
        | "primary"
        | "secondary"
        | "green"
        | "red"
        | "yellow"
        | "blue"
        | "gray"
        | "dark"
        | "light"
        | "error"
        | "success"
        | "warning"
        | "muted";
    suffixIcon?: string;
    suffixElement?: () => React.ReactNode;
    prefixElement?: () => React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    content,
    iconName,
    className,
    classNameIcon,
    classNameIconSuffix,
    onClick,
    type = "button",
    size = "medium",
    variant = "standard",
    color = "primary",
    disabled = false,
    suffixIcon,
    suffixElement,
    prefixElement,
    children,
    style: styleProp,
    ...props
}) => {
    // primary/secondary read from context so the correct color is available on the first render,
    // preventing any flash caused by the CSS transition animating from the default to the real color.
    const { colorPrimary } = useContext(DThemeContext);
    const [hovered, setHovered] = useState(false);

    const bgHex = (color === "primary" || color === "secondary")
        ? colorPrimary
        : COLOR_BG[color] ?? colorPrimary;

    const dark = getLuminance(bgHex) < 0.35;
    const isActive = hovered && !disabled;
    const hoverBg = shiftBrightness(bgHex, dark ? 30 : -20);

    const getColorStyle = (): React.CSSProperties => {
        if (variant === "standard") {
            return {
                backgroundColor: isActive ? hoverBg : bgHex,
                color: contrastText(bgHex),
                borderColor: bgHex,
            };
        }
        if (variant === "outline") {
            return {
                backgroundColor: isActive ? `${bgHex}26` : "transparent",
                color: bgHex,
                borderColor: bgHex,
            };
        }
        // trans
        return {
            backgroundColor: isActive ? `${bgHex}1a` : "transparent",
            color: bgHex,
            borderColor: "transparent",
        };
    };

    const sizeClasses = {
        large: "px-6 py-3 text-lg h-12",
        medium: "px-4 py-2 text-sm h-10",
        small: "px-3 py-1.5 text-xs h-8",
        "x-small": "px-2 py-1 text-xs h-6",
        auto: "h-auto",
        "fit-content": "w-fit h-auto",
    };

    const buttonClass = ClassNames(
        "flex items-center justify-center whitespace-nowrap rounded border transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium",
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium,
        {
            "font-bold": variant === "trans",
            "p-2": iconName && !content && !children,
        },
        className,
    );
    const iconClass = ClassNames("block", { "mx-2": (content || children) && iconName }, classNameIcon);
    const suffixIconClass = ClassNames("block", { "mx-2": (content || children) && iconName }, classNameIconSuffix);

    return (
        <button
            className={buttonClass}
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{ ...getColorStyle(), ...styleProp }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            {...props}
        >
            {prefixElement && prefixElement()}
            {iconName && <Icon name={iconName} size="large" className={iconClass} />}
            {children}
            {content}
            {suffixIcon && <Icon name={suffixIcon} size="large" className={suffixIconClass} />}
            {suffixElement && suffixElement()}
        </button>
    );
};

export default Button;
