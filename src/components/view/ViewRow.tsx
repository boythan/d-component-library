import React, { CSSProperties } from "react";
import ClassName from "classnames";

export interface ViewRowProps {
    children: any;
    width?: "100%" | "50%" | "25%";
    style?: CSSProperties;
    styleContent?: CSSProperties;
    styleLabel?: CSSProperties;
    className?: string;
    classNameLabel?: string;
    classNameContent?: string;
    label?: string;
    center?: boolean;
}

const ViewRow: React.FC<ViewRowProps> = ({
    className,
    classNameLabel,
    classNameContent,
    style,
    styleContent,
    styleLabel = {},
    width = "100%",
    label,
    center = true,
    children,
}) => {
    const wrapperClass = ClassName(
        "d-flex",
        {
            "w-50": width === "50%",
            "w-25": width === "25%",
            "align-items-center": center,
        },
        className
    );
    const labelClass = ClassName(
        "d-block text-nowrap text-bold p-0",
        {
            "col-2": width === "100%",
            "col-4": width === "50%",
            "col-8": width === "25%",
            "align-items-center": center,
        },
        classNameLabel
    );
    const contentClass = ClassName("col-10 p-0", classNameContent);

    let content = children;
    if (typeof children === "function") {
        content = children();
    }

    return (
        <div className={wrapperClass} style={style}>
            {label && (
                <label className={labelClass} style={styleLabel}>
                    {label}
                </label>
            )}
            <div className={contentClass} style={styleContent}>
                {content}
            </div>
        </div>
    );
};

export default ViewRow;
