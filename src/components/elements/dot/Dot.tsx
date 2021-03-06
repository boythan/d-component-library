import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import { ButtonProps } from "../../button/Button";
import { IconProps } from "../icon/Icon";

export interface DotProps {
    color?: ButtonProps["color"] | string;
    size?: IconProps["size"];
    className?: string;
    style?: CSSProperties;
    children?: any;
    index?: any;
}

const Dot: React.FC<DotProps> = ({ size = "small", color = "green", className, style = {}, children, index }) => {
    const dotClass = ClassNames("d-dot_container", `d-dot__${size} d-dot__${color}`, className);
    return (
        <div className={dotClass} style={{ backgroundColor: color, ...style }}>
            {children}
            {index}
        </div>
    );
};

export default Dot;
