import React from "react";
export interface CheckboxGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameItem?: string;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    value?: Array<any>;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
}
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
