import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
import { IconProps } from "../../../dist/components/icon/Icon.d";
export interface DotProps {
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    className?: string;
    style?: CSSProperties;
}
declare const Dot: React.FC<DotProps>;
export default Dot;
