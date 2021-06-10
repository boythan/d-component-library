/* eslint-disable react/button-has-type */
import React from "react";
import ClassNames from "classnames";
import Icon from "../icon/Icon";

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
    size = "large",
    variant = "standard",
    color = "primary",
    disabled = false,
    suffixIcon,
    suffixElement,
    prefixElement,
    children,
    ...props
}) => {
    const buttonClass = ClassNames(
        `text text-nowrap d-button d-button__${size} 
         d-button__${variant}-${color}`,
        {
            "text-x-small": size === "x-small",
            "text-small font-weight-bold": variant === "trans",
            [`d-button__icon-${size}`]: iconName && !content && !children,
        },
        className
    );
    const iconClass = ClassNames("d-block", { "mx-2": (content || children) && iconName }, classNameIcon);
    const suffixIconClass = ClassNames("d-block", { "mx-2": (content || children) && iconName }, classNameIconSuffix);
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
