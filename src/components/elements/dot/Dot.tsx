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

const THEME_COLORS = ["primary", "secondary", "success", "info", "warning", "danger", "light", "dark", "muted"];

const Dot: React.FC<DotProps> = ({ size = "small", color = "green", className, style = {}, children, index }) => {
    const isThemeColor = THEME_COLORS.includes(color || "");

    const sizeMap: Record<string, string> = {
        "xx-small": "w-1.5 h-1.5 text-[0.4rem]",
        "x-small": "w-2 h-2 text-[0.5rem]",
        small: "w-2.5 h-2.5 text-[0.6rem]",
        medium: "w-3 h-3 text-[0.7rem]",
        large: "w-4 h-4 text-xs",
        "x-large": "w-5 h-5 text-sm",
        "xx-large": "w-6 h-6 text-base",
        "xxx-large": "w-8 h-8 text-lg",
    };

    const dotClass = ClassNames(
        "rounded-full inline-flex items-center justify-center leading-none relative top-[2px] border-white border",
        sizeMap[size as string] || "w-2.5 h-2.5",
        {
            [`bg-${color}`]: isThemeColor,
            "text-white": isThemeColor && color !== "light",
            "text-gray-700": color === "light",
        },
        className
    );

    const styleProp = isThemeColor ? style : { backgroundColor: color, ...style };

    return (
        <div className={dotClass} style={styleProp}>
            {children}
            {index}
        </div>
    );
};

export default Dot;
