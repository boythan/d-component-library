import React from "react";
export interface IRowsKey {
    id: string | number;
    label: string | number;
    renderLabel?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
    renderContent?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
}
export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    variant?: "background" | "border";
    boldLabel?: boolean;
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
