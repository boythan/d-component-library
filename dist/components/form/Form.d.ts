import React from "react";
export declare type IFormItemType = "checkbox" | "inputText" | "select" | "multi-select" | "date" | "date-range" | "textarea" | "radio";
export interface IFormItemDataRender<T> {
    value?: any;
    onChange?: IFormItemProps["onChange"];
    className?: string;
    key?: keyof T;
}
export interface IFormItemData<T> {
    rowsId?: string;
    label?: string;
    type?: IFormItemType;
    key: keyof T;
    render?: React.ReactElement | ((props: IFormItemDataRender<T>) => React.ReactElement);
    onChangeValidate?: (props: {
        key: any;
        value: any;
    }) => boolean;
    rows?: any;
    inputType?: "number";
    dataSource?: Array<any>;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    className?: string;
    classNameRow?: string;
    getItemClass?: (props: {
        key?: keyof T;
        index?: any;
        value?: any;
        error?: any;
        rows?: Array<any>;
    }) => string;
    getElementClass?: (props: {
        key?: keyof T;
        index?: any;
        value?: any;
        error?: any;
        rows?: Array<any>;
    }) => string;
    elementClass?: string;
}
export interface IFormItemProps {
    onChange: (key: any, value: any) => void;
    data: IFormItemData<any>;
    value: any;
    error?: any;
    Messages: any;
    className?: string;
}
export interface IFormProps {
    Messages: any;
    dataSource?: Array<IFormItemData<any>>;
    formik?: any;
    value?: any;
    error?: any;
    onChange?: (key: any, value: any) => any;
    getRowClass?: (index?: any) => string;
    className?: string;
    classNameRow?: string;
}
export declare const getDefaultValue: (type?: IFormItemType | undefined) => never[] | "" | null;
export declare function FormItem({ onChange, data, value, Messages, className, error }: IFormItemProps): JSX.Element;
declare const Form: React.FC<IFormProps>;
export default Form;
