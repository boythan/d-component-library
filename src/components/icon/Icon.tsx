import React from "react";
import classname from "classnames";

export interface IconProps {
    name: string;
    size?: "medium" | "large" | "small";
    className?: string;
}

const Icon = ({ name, size = "medium", className }: IconProps) => {
    const iconClass = classname("material-icons", `customized-icon-${size}`, className);
    return <i className={iconClass}>{name}</i>;
};

export default Icon;
