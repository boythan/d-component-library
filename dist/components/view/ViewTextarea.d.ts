import React, { CSSProperties } from "react";
export interface ViewTextareaProps {
    [key: string]: any;
    children: string;
    style?: CSSProperties;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
    className?: string;
    classNameContent?: string;
    classNameShowMore?: string;
    classNameShowLess?: string;
    width?: number;
}
declare const ViewTextarea: React.FC<ViewTextareaProps>;
export default ViewTextarea;
