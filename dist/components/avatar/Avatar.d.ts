import React, { ReactElement } from "react";
export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small" | "xx-small";
    variant?: "rounded" | "square";
    text?: string;
    color?: string;
    classNameImage?: string;
    classNameLetter?: string;
}
export default function Avatar({ size, src, alt, variant, className, classNameImage, classNameLetter, text, color, ...props }: AvatarProps): ReactElement;
