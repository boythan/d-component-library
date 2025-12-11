/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import isEmpty from "lodash/isEmpty";
import React, { CSSProperties } from "react";
import { ButtonProps } from "../../button/Button";
import Dot, { DotProps } from "../dot/Dot";
import { IconProps } from "../icon/Icon";

export interface BadgeProps {
    [key: string]: any;
    children?: any;
    variant?: "dot" | "index";
    shape?: "rounded" | "square";
    index?: any;
    dotProps?: DotProps;
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    style?: CSSProperties;
    styleBadge?: CSSProperties;
    styleBadgeWrapper?: CSSProperties;
    onClick?: () => any;
    className?: string;
    classNameBadge?: string;
    classNameBadgeWrapper?: string;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "dot",
    shape = "rounded",
    index,
    dotProps = {},
    className,
    classNameBadge,
    color = "secondary",
    size = "medium",
    style = {},
    styleBadge,
    styleBadgeWrapper,
    onClick,
}) => {
    let content = children;
    if (typeof children === "function") {
        content = children();
    }

    console.log("content", content);
    let badge = <Dot {...dotProps} color={color} size={size} style={styleBadge} />;

    // className
    // d-badge__container -> relative inline-flex fit-content behavior
    const wrapperClass = ClassNames("relative inline-flex align-middle", className);

    // d-badge__badge-wrapper -> absolute positioning
    const badgeWrapperClass = ClassNames(
        "z-10 flex items-center justify-center",
        {
            "rounded-full": shape === "rounded",
            hidden: isEmpty(content) && content !== 0 && variant !== "index",
            "absolute top-[3px] right-[3px] transform translate-x-1/2 -translate-y-1/2": !isEmpty(content),
        },
        classNameBadge
    );

    // Size mapping for index variant
    const sizeMap: Record<string, string> = {
        "xx-small": "w-3 h-3 text-[0.3rem]",
        "x-small": "w-3 h-3 text-[0.3rem]",
        small: "w-4 h-4 text-[0.4rem]",
        medium: "w-[1.125rem] h-[1.125rem] text-[0.5rem]",
        large: "w-[1.25rem] h-[1.25rem] text-[0.6rem]",
        "x-large": "w-[1.375rem] h-[1.375rem] text-[0.75rem]",
        "xx-large": "w-[1.5rem] h-[1.5rem] text-[0.75rem]",
        "xxx-large": "w-[1.75rem] h-[1.75rem] text-[0.875rem]",
    };
    const sizeMapNoContent: Record<string, string> = {
        "xx-small": "w-3 h-3 text-[0.4rem]",
        "x-small": "w-4 h-4 text-[0.5rem]",
        small: "w-5 h-5 text-[0.5rem]",
        medium: "w-6 h-6 text-[0.75rem]",
        large: "w-8 h-8 text-base",
        "x-large": "w-10 h-10 text-lg",
        "xx-large": "w-12 h-12 text-xl",
        "xxx-large": "w-14 h-14 text-2xl",
    };
    const currentSizeClass =
        (isEmpty(content) ? sizeMapNoContent[size as string] : sizeMap[size as string]) || "w-6 h-6 text-sm";

    // Color mapping (assuming tailwind config matches)
    // - using inline style for color mostly works if dynamic, but 'bg-secondary' is safe.
    // However, d-badge__badge-index-${size}-${color} suggests strict class generation.
    // We will use bg-${color} text-white pattern.
    const colorClass = `bg-${color} text-white`;

    const badgeIndexClass = ClassNames(
        "flex items-center justify-center rounded-full leading-none font-normal border-white border",
        currentSizeClass,
        colorClass
    );

    if (variant === "index") {
        let display = index;
        badge = <div />;
        if (typeof index === "number") {
            display = index.toString();
        }
        if (display) {
            badge = (
                <div className={badgeIndexClass} style={styleBadge}>
                    {display}
                </div>
            );
        }
    }

    const badgeView = (
        <div className={badgeWrapperClass} style={styleBadgeWrapper}>
            {badge}
        </div>
    );

    return (
        <div className={wrapperClass} style={style} onClick={onClick}>
            {badgeView}
            {content}
        </div>
    );
};

export default Badge;
