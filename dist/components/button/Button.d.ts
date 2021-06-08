import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string;
    iconName?: string;
    className?: string;
    classNameIcon?: string;
    classNameIconSuffix?: string;
    disabled?: boolean;
    size?: "large" | "medium" | "small" | "x-small";
    variant?: "standard" | "outline" | "trans";
    color?: "primary" | "secondary" | "green" | "red" | "yellow" | "blue" | "gray" | "dark" | "light" | "error" | "success" | "warning" | "muted";
    suffixIcon?: string;
    suffixElement?: () => React.ReactNode;
    prefixElement?: () => React.ReactNode;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
