import React from "react";
import ClassNames from "classnames";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "xx-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
    color?: string;
}

const sizeClasses = {
    "xx-small": "text-[10px]", // 10px
    "x-small": "text-xs", // 12px
    small: "text-sm", // 14px
    medium: "text-base", // 16px
    large: "text-lg", // 18px
    "x-large": "text-[26px]", // 26px
    "xx-large": "text-4xl", // 36px
    "xxx-large": "text-[46px]", // 46px
};

const Icon = ({ name, size = "medium", className, color, style = {}, ...props }: IconProps) => {
    const iconClass = ClassNames("material-icons", sizeClasses[size], className);
    return (
        <i className={iconClass} {...props} style={{ color, ...style }}>
            {name}
        </i>
    );
};

export default Icon;
