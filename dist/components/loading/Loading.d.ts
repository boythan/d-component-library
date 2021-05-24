import React from "react";
export interface LoadingProps {
    className?: string;
    size?: "large" | "medium" | "small";
}
declare const Loading: React.FC<LoadingProps>;
export default Loading;
