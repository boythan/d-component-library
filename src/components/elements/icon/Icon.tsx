import React from "react";
import ClassNames from "classnames";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "xx-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
    color?: string;
}

const Icon = ({ name, size = "medium", className, color, ...props }: IconProps) => {
    const iconClass = ClassNames("material-icons", `d-icon__${size}`, className);
    return (
        <i className={iconClass} {...props} style={{ color }}>
            {name}
        </i>
    );
};

export default Icon;
