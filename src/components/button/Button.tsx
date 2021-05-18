/* eslint-disable react/button-has-type */
import React from "react";
import ClassNames from "classnames";
import Icon from "../icon/Icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    content: string;
    iconName?: string;
    className?: string;
    disabled?: boolean;
    size?: "large" | "medium" | "small" | "x-small";
}

const Button: React.FC<ButtonProps> = ({
    content,
    iconName,
    onClick,
    type = "button",
    className,
    disabled = false,
    size = "large",
}) => {
    const buttonClass = ClassNames(`text text-nowrap ${className} d-button d-button_${size}`, {
        "text-x-small": size === "x-small",
    });
    return (
        <button className={buttonClass} type={type} disabled={disabled}>
            {iconName && <Icon name={iconName} size="small" />}
            {content}
        </button>
    );
};

export default Button;
