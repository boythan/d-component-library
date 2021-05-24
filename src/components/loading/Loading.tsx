import React from "react";
import classNames from "classnames";

export interface LoadingProps {
    className?: string;
    size?: "large" | "medium" | "small";
}

const Loading: React.FC<LoadingProps> = ({ className, size = "medium" }) => {
    const wrapperClass = classNames("spinner-border text-primary", `d-loading__${size}`, className);
    return (
        <div className={wrapperClass} role="status">
            <span className="sr-only text-small">Loading...</span>
        </div>
    );
};

export default Loading;
