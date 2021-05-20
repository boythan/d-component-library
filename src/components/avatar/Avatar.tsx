import React, { ReactElement } from "react";
import ClassNames from "classnames";

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small";
    variant?: "rounded" | "square";
}

export default function Avatar({
    size = "medium",
    src,
    alt,
    variant = "rounded",
    className,
    ...props
}: AvatarProps): ReactElement {
    const wrapperClass = ClassNames(`d-image__container d-image__${size} d-image__${variant}-${size}`, className);
    const imageClass = ClassNames("d-image__image");
    return (
        <div className={wrapperClass}>
            <img src={src} {...props} alt={alt} className={imageClass} />
        </div>
    );
}
