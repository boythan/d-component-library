/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import _ from "lodash";
import React, { CSSProperties } from "react";
import { ButtonProps } from "../button/Button";
import Dot, { DotProps } from "../dot/Dot";
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

const Badge: React.FC<BadgeProps> = ({
    children,
    variant = "dot",
    shape = "round",
    index,
    dotProps = {},
    className,
    classNameBadge,
    color = "secondary",
    size = "medium",
    style,
    badgeStyle,
    onClick,
}) => {
    const wrapperClass = ClassNames(`d-badge__container d-badge__container-${variant}`, className);
    const badgeWrapperClass = ClassNames(
        "d-badge__badge-wrapper",
        { "rounded-circle": shape === "round" },
        classNameBadge
    );
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
    const badgeView = <div className={badgeWrapperClass}>{badge}</div>;
    if (_.isEmpty(content)) {
        return badgeView;
    }
    return (
        <div className={wrapperClass} style={style} onClick={onClick}>
            {badgeView}
            {content}
        </div>
    );
};

export default Badge;
