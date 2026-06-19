import ClassNames from "classnames";
import React from "react";

export interface IArrowItemProps {
    isFirst?: boolean;
    isLast?: boolean;
    color?: string;
    label?: string;
    customLabel?: ((props?: any) => React.ReactElement) | React.ReactElement;
    className?: string;
    classNameContent?: string;
    isActive?: boolean;
}

const ArrowItem: React.FC<IArrowItemProps> = ({
    isFirst,
    isLast,
    color = "#6FCF97",
    label,
    customLabel,
    className,
    classNameContent,
    isActive,
}) => {
    const wrapperClass = ClassNames(
        "table-cell relative p-0 m-0 h-[50px] text-center border border-white flex-1",
        className
    );
    const contentClass = ClassNames(
        "relative leading-[50px] h-full w-full text-white",
        {
            "arrow-content-active !bg-[#219653]": isActive,
            "arrow-content-first": isFirst,
            "arrow-content-middle": !isFirst && !isLast,
        },
        classNameContent
    );

    const renderLabel = () => {
        if (customLabel) {
            return typeof customLabel === "function" ? customLabel() : customLabel;
        }
        return label;
    };

    return (
        <div className={wrapperClass} style={{ backgroundColor: color }}>
            <div className={contentClass}>{renderLabel()}</div>
        </div>
    );
};

export default ArrowItem;
