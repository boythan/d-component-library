import React from "react";
import ClassNames from "classnames";
import Icon, { IconProps } from "../icon/Icon";

export interface IRatingProps {
    value: number;
    range?: number;
    className?: string;
    size?: IconProps["size"];
    color?: IconProps["color"];
}

const Rating: React.FC<IRatingProps> = ({ value, range = 5, className, size = "medium", color = "#DE0D0C" }) => {
    const containerClass = ClassNames("d-rating__container d-flex", className);
    const rangeArr = Array.from({ length: range }, (x, i) => i + 1);
    const stars = rangeArr.map((rating) => {
        const isFilled = value >= rating;
        const iconName = isFilled ? "star_rate" : "star_outline";
        const starClass = ClassNames("d-rating__star", {
            "d-rating__star-active": isFilled,
        });

        return <Icon name={iconName} key={rating} className={starClass} color={color} size={size} />;
    });

    return <div className={containerClass}>{stars}</div>;
};

export default Rating;
