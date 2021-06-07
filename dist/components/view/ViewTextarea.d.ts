import React, { CSSProperties } from "react";
export interface ViewTextareaProps {
    [key: string]: any;
    children: string;
    className?: string;
    style?: CSSProperties;
    Messages?: any;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
}
declare const ViewTextarea: React.FC<ViewTextareaProps>;
export default ViewTextarea;
