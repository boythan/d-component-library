import React from "react";
import classNames from "classnames";

export interface LoadingProps {
    className?: string;
    size?: "large" | "medium" | "small";
}

const Loading: React.FC<LoadingProps> = ({ className, size = "medium" }) => {
    const sizeClass =
        {
            small: "w-4 h-4 border-2",
            medium: "w-6 h-6 border-2",
            large: "w-8 h-8 border-4",
        }[size] || "w-6 h-6 border-2";

    const wrapperClass = classNames(
        "inline-block animate-spin rounded-full border-current border-t-transparent text-primary",
        sizeClass,
        className
    );
    return (
        <div className={wrapperClass} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loading;
