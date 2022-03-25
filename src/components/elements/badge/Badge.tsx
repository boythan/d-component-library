/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import _ from "lodash";
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
    let badge = <Dot {...dotProps} color={color} size={size} style={styleBadge} />;

    // className
    const wrapperClass = ClassNames(`d-badge__container d-badge__container-${variant}`, className);
    const badgeWrapperClass = ClassNames(
        "d-badge__badge-wrapper",
        {
            "rounded-circle": shape === "rounded",
            "position-absolute": !_.isEmpty(content),
        },
        classNameBadge
    );
    const badgeIndexClass = ClassNames(`d-badge__badge-index-${size}-${color}`);

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
