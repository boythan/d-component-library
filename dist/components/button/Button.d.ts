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
    color?: "primary" | "secondary" | "green" | "red" | "yellow" | "blue" | "gray" | "dark" | "light";
    suffixIcon?: string;
}
declare const Button: React.FC<ButtonProps>;
export default Button;
