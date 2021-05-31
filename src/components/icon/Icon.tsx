import React from "react";
import ClassNames from "classnames";

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "xx-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
    classNameContainer?: string;
    variant?: "single" | "badge";
    badge?: string;
}

const Icon = ({
    name,
    size = "medium",
    className,
    variant = "single",
    badge,
    classNameContainer,
    ...props
}: IconProps) => {
    const iconClass = ClassNames("material-icons", `d-icon__${size}`, className);
    const wrapperClass = ClassNames(
        "position-relative d-icon__container",
        {
            "d-icon__container-badge-long": badge && badge?.length > 2,
        },
        classNameContainer
    );
    const badgeClass = ClassNames(`position-absolute d-icon__badge d-icon__badge-${size}`);
    if (variant === "badge") {
        return (
            <div className={wrapperClass}>
                <i className={iconClass} {...props}>
                    {name}
                </i>
                {badge && <div className={badgeClass}>{badge}</div>}
            </div>
        );
    }
    return (
        <i className={iconClass} {...props}>
            {name}
        </i>
    );
};

export default Icon;
