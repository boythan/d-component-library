import React from "react";
export interface RadioGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameItem?: string;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisabledItem?: (checkItem: any) => void;
    value?: any;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
}
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
