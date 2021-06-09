/* eslint-disable no-nested-ternary */
import React, { ReactElement } from "react";
import ClassNames from "classnames";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small" | "xx-small";
    variant?: "rounded" | "square";
    text?: string;
    color?: string;
    classNameImage?: string;
    classNameLetter?: string;
}

export default function Avatar({
    size = "medium",
    src,
    alt,
    variant = "rounded",
    className,
    classNameImage,
    classNameLetter,
    text,
    color = "#D8D8D8",
    ...props
}: AvatarProps): ReactElement {
    const wrapperClass = ClassNames(
        `d-image__container d-image__${variant}-${size} bg-${color}`,
        { "d-flex justify-content-center align-items-center": !!text },
        className
    );
    const imageClass = ClassNames("d-image__image", classNameImage);
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
    let content;
    if (text) {
        const firstLetter = text.charAt(0);
        content = (
            <div
                className={letterClass}
                style={{ fontSize: size === "large" ? "56px" : size === "x-large" ? "80px" : undefined }}
            >
                {firstLetter}
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
