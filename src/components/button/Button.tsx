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
    variant?: "standard" | "outlined";
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
}) => {
    const buttonClass = ClassNames(`text text-nowrap ${className} d-button d-button_${size} d-button_${variant}`, {
        "text-x-small": size === "x-small",
        "d-button_disabled": disabled,
        "d-button_icon": iconName && !content,
    });
    const iconClass = ClassNames("d-block", { "mx-2": content && iconName });
    return (
        <button className={buttonClass} type={type} disabled={disabled}>
            {iconName && <Icon name={iconName} size={content && iconName ? "small" : "large"} className={iconClass} />}
            {content}
        </button>
    );
};

export default Button;
