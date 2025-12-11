import React, { CSSProperties } from "react";
import ClassName from "classnames";

export interface ViewRowProps {
    children: any;
    width?: "100%" | "75%" | "50%" | "25%";
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
    className = "gap-4",
    classNameLabel = "text-sm",
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
        "flex",
        {
            "w-3/4": width === "75%",
            "w-1/2": width === "50%",
            "w-1/4": width === "25%",
            "items-center": center,
        },
        className
    );
    const labelClass = ClassName(
        "block whitespace-nowrap font-semibold p-0 truncate",
        {
            "w-1/6": width === "100%", // col-2 approx 16.66%
            "w-1/4": width === "75%", // col-3 25%
            "w-1/3": width === "50%", // col-4 33.33%
            "w-2/3": width === "25%", // col-8 66.66%
            "items-center": center,
        },
        classNameLabel
    );
    const contentClass = ClassName("flex-1 p-0", classNameContent); // col -> flex-1

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
