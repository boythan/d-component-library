import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
export interface HeaderBlockProps {
    title?: string;
    className?: string;
    classNameTitle?: string;
    style?: CSSProperties;
    styleTitle?: CSSProperties;
    showLine?: boolean;
    showArrow?: boolean;
    customRight?: React.ReactNode | React.ComponentType;
    onPrevious?: () => any;
    onNext?: () => any;
    arrowProps?: ButtonProps;
    lineColor?: ButtonProps["color"];
    arrowColor?: ButtonProps["color"];
}
declare const HeaderBlock: React.FC<HeaderBlockProps>;
export default HeaderBlock;
