import React, { useState } from "react";
import ClassNames from "classnames";
import _ from "lodash";
import Icon, { IconProps } from "../icon/Icon";

export interface IRatingProps {
    value: number;
    range?: number;
    className?: string;
    size?: IconProps["size"];
    color?: IconProps["color"];
    onChange?: (value: number) => void;
}

const Rating: React.FC<IRatingProps> = ({
    value,
    range = 5,
    className,
    size = "medium",
    color = "#DE0D0C",
    onChange,
}) => {
    const ratingChangable = !_.isUndefined(onChange);
    const [hoverRating, setHoverRating] = useState(value);
    const containerClass = ClassNames("flex", { "cursor-pointer": ratingChangable }, className);
    const rangeArr = Array.from({ length: range }, (_, i) => i + 1);
    const stars = rangeArr.map((rating) => {
        const isFilled = (ratingChangable ? hoverRating : value) >= rating;
        const iconName = isFilled ? "star_rate" : "star_outline";
        const starClass = ClassNames({ "opacity-100": isFilled, "opacity-50": !isFilled });

        return (
            <Icon
                name={iconName}
                key={rating}
                className={starClass}
                color={color}
                size={size}
                onMouseEnter={() => {
                    if (ratingChangable) {
                        setHoverRating(rating);
                    }
                }}
                onMouseLeave={() => {
                    if (ratingChangable) {
                        setHoverRating(value);
                    }
                }}
                onClick={() => {
                    if (ratingChangable) {
                        return onChange && onChange(rating);
                    }
                    return null;
                }}
            />
        );
    });

    return <div className={containerClass}>{stars}</div>;
};

export default Rating;
