import React from "react";
import { ButtonProps } from "../button/Button";
export interface DotProps {
    color?: ButtonProps["color"];
    size?: ButtonProps["size"];
    className?: string;
}
declare const Dot: React.FC<DotProps>;
export default Dot;
