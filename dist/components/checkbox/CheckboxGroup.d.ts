import React from "react";
export interface CheckboxGroupProps {
    className?: string;
    classNameItem?: string;
    dataSource: Array<any>;
    label?: any;
    value?: Array<any>;
    defaultValue?: Array<any>;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    multiple?: boolean;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
}
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
