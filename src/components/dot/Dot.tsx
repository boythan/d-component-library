import React from "react";
import ClassNames from "classnames";
import { ButtonProps } from "../button/Button";

export interface DotProps {
    color?: ButtonProps["color"];
    size?: ButtonProps["size"];
    className?: string;
}

const Dot: React.FC<DotProps> = ({ size = "small", color = "green", className }) => {
    const dotClass = ClassNames("d-dot_container", `d-dot__${size}-${color}`, className);
    return <div className={dotClass} />;
};

export default Dot;
