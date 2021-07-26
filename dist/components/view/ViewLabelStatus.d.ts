import { CSSProperties } from "react";
export interface ViewLabelStatusProps {
    color?: string;
    content?: string;
    className?: string;
    style?: CSSProperties;
    listStatus?: any[];
    status?: any;
    getValue?: (item: any) => any;
    getLabel?: (item: any) => any;
}
declare const ViewLabelStatus: ({ color, content, className, style, listStatus, status, getValue, getLabel, }: ViewLabelStatusProps) => JSX.Element;
export default ViewLabelStatus;
