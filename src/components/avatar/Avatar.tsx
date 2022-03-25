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
    const wrapperClass = ClassNames(
        `d-image__container d-image__${variant}-${size} bg-${color}`,
        {
            "d-flex justify-content-center align-items-center": !!text,
            "rounded-1": variant === "rounded" && (size === "small" || size === "xx-small" || size === "x-small"),
            "rounded-3": variant === "rounded" && (size === "medium" || size === "large" || size === "x-large"),
        },
        className
    );
    const imageClass = ClassNames(
        "d-image__image",
        {
            "rounded-1": variant === "rounded" && (size === "small" || size === "xx-small" || size === "x-small"),
            "rounded-3": variant === "rounded" && (size === "medium" || size === "large" || size === "x-large"),
        },
        classNameImage
    );
    const letterClass = ClassNames(
        "text-white text-center font-weight-normal",
        {
            h1: size === "medium",
            h3: size === "small",
            h4: size === "x-small",
            h5: size === "xx-small",
        },
        classNameLetter
    );
    let content = <img src="images/placeholder.png" alt={alt} className={imageClass} />;
    const firstLetter = text && typeof text === "string" ? text.charAt(0) : null;
    const secondLetter = secondText && typeof secondText === "string" ? secondText.charAt(0) : null;
    if (firstLetter || secondLetter) {
        const textDisplay = firstLetter && secondLetter ? `${firstLetter}${secondLetter}` : firstLetter || secondLetter;
        content = (
            <div
                className={letterClass}
                style={{ fontSize: size === "large" ? "56px" : size === "x-large" ? "90px" : undefined }}
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
