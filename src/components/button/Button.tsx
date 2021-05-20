/* eslint-disable react/button-has-type */
import React from "react";
import ClassNames from "classnames";
import Icon from "../icon/Icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    content?: string;
    iconName?: string;
    className?: string;
    disabled?: boolean;
    size?: "large" | "medium" | "small" | "x-small";
    variant?: "standard" | "outline" | "trans";
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "dark" | "light";
}

const Button: React.FC<ButtonProps> = ({
    content,
    iconName,
    onClick,
    type = "button",
    className,
    disabled = false,
    size = "large",
    variant = "standard",
    color = "primary",
    ...props
}) => {
    const buttonClass = ClassNames(
        `text text-nowrap d-button d-button__${size} d-button__${variant}`,
        {
            "text-x-small": size === "x-small",
            "text-small font-weight-bold": variant === "trans",
            "text-underline": !iconName && variant === "trans",
            "d-button__icon": iconName && !content,
        },
        className
    );
    const iconClass = ClassNames("d-block", { "mx-2": content && iconName });
    return (
        <button className={buttonClass} type={type} disabled={disabled} onClick={onClick} {...props}>
            {iconName && <Icon name={iconName} size="large" className={iconClass} />}
            {content}
        </button>
    );
};

export default Button;
