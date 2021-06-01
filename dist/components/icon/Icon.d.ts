import React from "react";
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "xx-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
    classNameContainer?: string;
    variant?: "single" | "badge";
    badge?: string;
}
declare const Icon: ({ name, size, className, variant, badge, classNameContainer, ...props }: IconProps) => JSX.Element;
export default Icon;
