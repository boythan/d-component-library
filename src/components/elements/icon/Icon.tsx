import React from "react";
import ClassNames from "classnames";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "xx-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
}

const Icon = ({ name, size = "medium", className, ...props }: IconProps) => {
    const iconClass = ClassNames("material-icons", `d-icon__${size}`, className);
    return (
        <i className={iconClass} {...props}>
            {name}
        </i>
    );
};

export default Icon;
