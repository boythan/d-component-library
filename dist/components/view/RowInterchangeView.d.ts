import React from "react";
export interface IRowsKey {
    id: string | number;
    label: string | number;
}
export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey>;
    getLabel?: (label: IRowsKey["label"], row: IRowsKey, data: any) => any;
    getContent?: (id: IRowsKey["id"], row: IRowsKey, data: any) => any;
    variant?: "background" | "border";
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
