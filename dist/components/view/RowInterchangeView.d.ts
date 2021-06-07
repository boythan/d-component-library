import React from "react";
export interface IRowsKey {
    id: string | number;
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
    variant?: "background" | "border" | "dashed";
    boldLabel?: boolean;
    Messages?: any;
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
