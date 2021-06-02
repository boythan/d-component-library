import React, { CSSProperties } from "react";
export interface ViewRowProps {
    children: any;
    width?: "100%" | "50%" | "25%";
    style?: CSSProperties;
    styleContent?: CSSProperties;
    styleLabel?: CSSProperties;
    className?: string;
    classNameLabel?: string;
    classNameContent?: string;
    label?: string;
    center?: boolean;
}
declare const ViewRow: React.FC<ViewRowProps>;
export default ViewRow;
