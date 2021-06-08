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
    size?: "large" | "medium" | "small" | "x-small";
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
    ...props
}) => {
    const buttonClass = ClassNames(
        `text text-nowrap d-button d-button__${size} 
         d-button__${variant}-${color}`,
        {
            "text-x-small": size === "x-small",
            "text-small font-weight-bold": variant === "trans",
            "d-button__icon": iconName && !content,
        },
        className
    );
    const iconClass = ClassNames("d-block", { "mx-2": content && iconName }, classNameIcon);
    const suffixIconClass = ClassNames("d-block", { "mx-2": content && iconName }, classNameIconSuffix);
    return (
        <button className={buttonClass} type={type} disabled={disabled} onClick={onClick} {...props}>
            {prefixElement && prefixElement()}
            {iconName && <Icon name={iconName} size="large" className={iconClass} />}
            {content}
            {suffixIcon && <Icon name={suffixIcon} size="large" className={suffixIconClass} />}
            {suffixElement && suffixElement()}
        </button>
    );
};

export default Button;
