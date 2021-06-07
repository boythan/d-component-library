import React, { CSSProperties } from "react";
export interface IRowsKey {
    id: string;
    label: string | number;
    renderLabel?: (id: IRowsKey["id"], data: any, row?: IRowsKey) => any;
    renderContent?: (id: IRowsKey["id"], data: any, row?: IRowsKey) => any;
}
export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    variant?: "background" | "border" | "dashed" | "none";
    boldLabel?: boolean;
    Messages?: any;
    style?: CSSProperties;
    styleContent?: CSSProperties;
    styleLabel?: CSSProperties;
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
