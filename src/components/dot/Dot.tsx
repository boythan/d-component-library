import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import { ButtonProps } from "../button/Button";
import { IconProps } from '../icon/Icon';

export interface DotProps {
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    className?: string;
    style?: CSSProperties;
}

const Dot: React.FC<DotProps> = ({ size = "small", color = "green", className, style }) => {
    const dotClass = ClassNames("d-dot_container", `d-dot__${size}-${color}`, className);
    return <div className={dotClass} style={style} />;
};

export default Dot;
