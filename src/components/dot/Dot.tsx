import React from "react";
import ClassNames from "classnames";
import { ButtonProps } from "../button/Button";

export interface DotProps {
    color?: ButtonProps["color"];
    size?: ButtonProps["size"];
}

const Dot: React.FC<DotProps> = ({ size = "small", color = "green" }) => {
    const dotClass = ClassNames("d-dot_container", `d-dot__${size}-${color}`);
    return <div className={dotClass} />;
};

export default Dot;
