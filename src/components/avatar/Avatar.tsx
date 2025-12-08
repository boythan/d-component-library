/* eslint-disable no-nested-ternary */
import React, { ReactElement } from "react";
import ClassNames from "classnames";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small" | "xx-small";
    variant?: "rounded" | "square" | "circle";
    text?: string;
    secondText?: string;
    color?: string;
    classNameImage?: string;
    classNameLetter?: string;
}

// Map sizes to Tailwind classes
const sizeClasses = {
    "x-large": "w-40 h-40", // 160px
    large: "w-24 h-24", // 96px
    medium: "w-18 h-18", // 72px
    small: "w-12 h-12", // 48px
    "x-small": "w-8 h-8", // 32px
    "xx-small": "w-6 h-6", // 24px
};

const textSizeClasses = {
    "x-large": "text-5xl", // ~48px/56px font size logic approximated or kept as inline style
    large: "text-4xl",
    medium: "text-2xl",
    small: "text-lg",
    "x-small": "text-sm",
    "xx-small": "text-xs",
};

export default function Avatar({
    size = "medium",
    src,
    alt,
    variant = "circle",
    className,
    classNameImage,
    classNameLetter,
    text,
    secondText,
    color = "#D8D8D8",
    ...props
}: AvatarProps): ReactElement {
    const getRadiusClass = () => {
        if (variant === "circle") return "rounded-full";
        if (variant === "square") return "rounded-none";
        // rounded (legacy used rounded-1 for small, rounded-3 for large)
        if (["small", "x-small", "xx-small"].includes(size)) return "rounded"; // ~4px
        return "rounded-lg"; // ~8px (rounded-3 approx)
    };

    const radiusClass = getRadiusClass();

    const wrapperClass = ClassNames(
        "relative inline-flex justify-center items-center overflow-hidden shrink-0", // Container basics
        sizeClasses[size],
        radiusClass,
        // bg-color handled by style prop
        className
    );

    const imageClass = ClassNames(
        "w-full h-full object-cover",
        radiusClass, // Ensure image clips or matches radius
        classNameImage
    );

    const letterClass = ClassNames(
        "text-white text-center font-normal leading-none",
        // H-tag equivalents removed, used strict sizing or inline style fallback
        textSizeClasses[size],
        classNameLetter
    );

    let content = <img src="images/placeholder.png" alt={alt} className={imageClass} />;

    const firstLetter = text && typeof text === "string" ? text.charAt(0) : null;
    const secondLetter = secondText && typeof secondText === "string" ? secondText.charAt(0) : null;

    if (firstLetter || secondLetter) {
        const textDisplay = firstLetter && secondLetter ? `${firstLetter}${secondLetter}` : firstLetter || secondLetter;
        // Legacy inline style for font size overrode classes for large sizes
        const fontSizeStyle = size === "large" ? "56px" : size === "x-large" ? "90px" : undefined;

        content = (
            <div
                className={letterClass}
                style={{ fontSize: fontSizeStyle }} // Keep legacy override for specific map
            >
                {textDisplay}
            </div>
        );
    }

    if (src) {
        content = <img src={src} {...props} alt={alt} className={imageClass} />;
    }

    return (
        <div className={wrapperClass} style={{ backgroundColor: color }}>
            {content}
        </div>
    );
}
