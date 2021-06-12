import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
import { IconProps } from "../icon/Icon";
export interface DotProps {
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    className?: string;
    style?: CSSProperties;
    children?: string | number;
}
declare const Dot: React.FC<DotProps>;
export default Dot;
