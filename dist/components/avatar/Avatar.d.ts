import React, { ReactElement } from "react";
export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: "x-large" | "large" | "medium" | "small" | "x-small";
    variant?: "rounded" | "square";
    text?: string;
    color?: string;
}
export default function Avatar({ size, src, alt, variant, className, text, color, ...props }: AvatarProps): ReactElement;
