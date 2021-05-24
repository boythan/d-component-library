/// <reference types="react" />
export interface IconProps {
    name: string;
    size?: "medium" | "large" | "small" | "x-small" | "x-large" | "xx-large" | "xxx-large";
    className?: string;
}
declare const Icon: ({ name, size, className }: IconProps) => JSX.Element;
export default Icon;
