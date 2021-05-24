import React from "react";
import classname from "classnames";

export interface IconProps {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
}

const Icon = ({ name, size = "medium", className }: IconProps) => {
    const iconClass = classname("material-icons", `customized-icon__${size}`, className);
    return <i className={iconClass}>{name}</i>;
};

export default Icon;
