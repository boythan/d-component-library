/* eslint-disable react/button-has-type */
import React from "react";
import ClassNames from "classnames";
import Icon from "../elements/icon/Icon";

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
    ...props
}) => {
    const sizeClasses = {
        large: "px-6 py-3 text-lg h-12",
        medium: "px-4 py-2 text-sm h-10",
        small: "px-3 py-1.5 text-xs h-8",
        "x-small": "px-2 py-1 text-xs h-6",
        auto: "h-auto",
        "fit-content": "w-fit h-auto",
    };

    const getVariantClasses = (variant: string, color: string) => {
        const baseColors: Record<string, string> = {
            primary: "border-primary text-light bg-primary hover:bg-red-700",
            secondary: "border-secondary text-light bg-secondary hover:bg-red-700",
            green: "border-success text-light bg-success hover:bg-green-700",
            red: "border-danger text-light bg-danger hover:bg-red-700",
            yellow: "border-warning text-dark bg-warning hover:bg-yellow-500",
            blue: "border-info text-light bg-info hover:bg-blue-600",
            gray: "border-gray-500 text-light bg-gray-500 hover:bg-gray-600",
            dark: "border-dark text-light bg-dark hover:bg-black",
            light: "border-light text-dark bg-light hover:bg-gray-100",
            error: "border-danger text-light bg-danger hover:bg-red-700",
            success: "border-success text-light bg-success hover:bg-green-700",
            warning: "border-warning text-dark bg-warning hover:bg-yellow-500",
            muted: "border-muted text-dark bg-muted hover:bg-gray-200",
        };

        const outlineColors: Record<string, string> = {
            primary: "border-primary text-primary bg-transparent hover:bg-red-50",
            secondary: "border-secondary text-secondary bg-transparent hover:bg-red-50",
            green: "border-success text-success bg-transparent hover:bg-green-50",
            red: "border-danger text-danger bg-transparent hover:bg-red-50",
            yellow: "border-warning text-warning bg-transparent hover:bg-yellow-50",
            blue: "border-info text-info bg-transparent hover:bg-blue-50",
            gray: "border-gray-500 text-gray-500 bg-transparent hover:bg-gray-50",
            dark: "border-dark text-dark bg-transparent hover:bg-gray-100",
            light: "border-light text-light bg-transparent hover:bg-gray-800",
            error: "border-danger text-danger bg-transparent hover:bg-red-50",
            success: "border-success text-success bg-transparent hover:bg-green-50",
            warning: "border-warning text-warning bg-transparent hover:bg-yellow-50",
            muted: "border-muted text-muted bg-transparent hover:bg-gray-100",
        };

        const transColors: Record<string, string> = {
            primary: "text-primary bg-transparent hover:bg-red-50 border-transparent",
            // Add others as needed, simplified for brevity
            default: `text-${color} bg-transparent hover:bg-gray-100 border-transparent`,
        };

        if (variant === "outline") return `border ${outlineColors[color] || outlineColors.primary}`;
        if (variant === "trans") return transColors[color] || transColors.default;

        // Standard
        return `border ${baseColors[color] || baseColors.primary}`;
    };

    const buttonClass = ClassNames(
        "flex items-center justify-center whitespace-nowrap rounded transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed font-medium",
        sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.medium,
        getVariantClasses(variant, color),
        {
            "font-bold": variant === "trans",
            "p-2": iconName && !content && !children, // Icon only
        },
        className,
    );
    const iconClass = ClassNames("block", { "mx-2": (content || children) && iconName }, classNameIcon);
    const suffixIconClass = ClassNames("block", { "mx-2": (content || children) && iconName }, classNameIconSuffix);
    return (
        <button className={buttonClass} type={type} disabled={disabled} onClick={onClick} {...props}>
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
