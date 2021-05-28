import React from "react";
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
}
declare const Icon: ({ name, size, className, ...props }: IconProps) => JSX.Element;
export default Icon;
