import ClassNames from "classnames";
import React, { useEffect } from "react";

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
    const wrapperClass = ClassNames("d-arrow-item col", className);
    const contentClass = ClassNames(
        "d-arrow-item__content text-white",
        {
            "d-arrow-item__content-active": isActive,
            "d-arrow-item__content-first": isFirst,
            "d-arrow-item__content-last": isLast,
            "d-arrow-item__content-middle": !isLast && !isLast,
        },
        classNameContent
    );

    const addStyle = () => {
        const style = document.createElement("style");
        const arrowItemContent = document.querySelectorAll(".d-arrow-item__content-middle");
        style.textContent = `
        .d-arrow-item__content-middle::before {
            border-color: transparent transparent transparent ${color};
        }

        `;
        // arrowItemContent.forEach((i) => i.appendChild(style));
        // eslint-disable-next-line no-unused-expressions
        arrowItemContent[0] && arrowItemContent[0].appendChild(style);
    };

    useEffect(() => {
        // addStyle();
    }, [color]);

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
