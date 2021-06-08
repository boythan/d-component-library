import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
import { DotProps } from "../dot/Dot";
import { IconProps } from "../icon/Icon";
export interface BadgeProps {
    [key: string]: any;
    children?: any;
    variant?: "dot" | "index";
    shape?: "round" | "square";
    index?: any;
    dotProps?: DotProps;
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    style?: CSSProperties;
    badgeStyle?: CSSProperties;
    onClick?: () => any;
    className?: string;
    classNameBadge?: string;
}
declare const Badge: React.FC<BadgeProps>;
export default Badge;
