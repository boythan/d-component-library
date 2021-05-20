import React, { ReactElement } from "react";
import ClassNames from "classnames";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small";
    variant?: "rounded" | "square";
    text?: string;
    color?: string;
}

export default function Avatar({
    size = "medium",
    src,
    alt,
    variant = "rounded",
    className,
    text,
    color = "gray",
    ...props
}: AvatarProps): ReactElement {
    const wrapperClass = ClassNames(
        `d-image__container d-image__${variant}-${size} bg-${color}`,
        { "d-flex justify-content-center align-items-center": !!text },
        className
    );
    const imageClass = ClassNames("d-image__image");
    let content;
    if (text) {
        const firstLetter = text.charAt(0);
        content = (
            <h2 className="text-white text-center" style={{ fontWeight: "normal" }}>
                {firstLetter}
            </h2>
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
