import React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    content: string;
    iconName?: string;
    className?: string;
    disabled?: boolean;
    size?: "large" | "medium" | "small" | "x-small";
}
declare const Button: React.FC<ButtonProps>;
export default Button;
