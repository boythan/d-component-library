import React, { CSSProperties } from "react";
export interface IRowsKey<T> {
    id: keyof T;
    label: string | number;
    renderLabel?: (props: {
        id: IRowsKey<T>["id"];
        data: any;
        row?: IRowsKey<T>;
    }) => any;
    renderContent?: (props: {
        id: IRowsKey<T>["id"];
        data: any;
        row?: IRowsKey<T>;
    }) => any;
}
export interface RowInterchangeViewProps {
    className?: string;
    classNameRow?: string;
    classNameLabel?: string;
    classNameContent?: string;
    dataSource: any;
    keyList: Array<IRowsKey<any>>;
    variant?: "background" | "border" | "dashed" | "none";
    boldLabel?: boolean;
    Messages?: any;
    style?: CSSProperties;
    styleContent?: CSSProperties;
    styleLabel?: CSSProperties;
}
declare const RowInterchangeView: React.FC<RowInterchangeViewProps>;
export default RowInterchangeView;
