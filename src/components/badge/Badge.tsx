import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import Dot, { DotProps } from "../dot/Dot";
import { ButtonProps } from "../button/Button";
import { AvatarProps } from "../avatar/Avatar";
import { IconProps } from "../../../dist/components/icon/Icon.d";

export interface BadgeProps {
    [key: string]: any;
    children: any;
    variant?: "dot" | "index";
    shape?: "round" | "square";
    index?: string | number;
    dotProps?: DotProps;
    className?: string;
    color?: ButtonProps["color"];
    size?: IconProps["size"];
    style?: CSSProperties;
    badgeStyle?: CSSProperties;
}

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "dot",
    shape = "round",
    index,
    dotProps = {},
    className,
    color = "secondary",
    size = "medium",
    style,
    badgeStyle,
}) => {
    const wrapperClass = ClassNames(`d-badge__container d-badge__container-${variant}`, className);
    const badgeWrapperClass = ClassNames("d-badge__badge-wrapper", { "rounded-circle": shape === "round" });
    const badgeIndexClass = ClassNames(`d-badge__badge-index-${size}-${color}`);
    let content = children;
    let badge = <Dot {...dotProps} color={color} size={size} style={badgeStyle} />;
    if (variant === "index") {
        let display = index;
        badge = <div />;
        if (typeof index === "number") {
            display = index.toString();
        }
        if (display) {
            badge = (
                <div className={badgeIndexClass} style={badgeStyle}>
                    {display}
                </div>
            );
        }
    }
    if (typeof children === "function") {
        content = children();
    }
    return (
        <div className={wrapperClass} style={style}>
            <div className={badgeWrapperClass}>{badge}</div>
            {content}
        </div>
    );
};

export default Badge;
