import React from "react";
import ClassNames from "classnames";

export interface IArrowItemProps {
    isFirst?: boolean;
    isLast?: boolean;
}

const ArrowItem: React.FC<IArrowItemProps> = ({ isFirst, isLast }) => {
    const wrapperClass = ClassNames("d-arrow-item col");
    const contentClass = ClassNames("d-arrow-item__content", {
        "d-arrow-item__content-first": isFirst,
        "d-arrow-item__content-last": isLast,
        "d-arrow-item__content-middle": !isLast && !isLast,
    });
    return (
        <div className={wrapperClass}>
            <div className={contentClass}>ArrowItem</div>
        </div>
    );
};

export default ArrowItem;
