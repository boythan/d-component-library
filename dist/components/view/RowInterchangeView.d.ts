import React from "react";
export interface RowsKey {
    id: string | number;
    label: string | number;
}
export interface RowInterchangeViewProps {
    className?: string;
    dataSource: any;
    keyList: Array<RowsKey>;
    getLabel?: (label: RowsKey["label"], row: RowsKey, data: any) => any;
    getContent?: (id: RowsKey["id"], row: RowsKey, data: any) => any;
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
