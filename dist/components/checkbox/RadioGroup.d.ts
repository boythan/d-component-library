import React, { CSSProperties } from "react";
export interface RadioGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameItem?: string;
    style?: CSSProperties;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisabledItem?: (checkItem: any) => void;
    value?: any;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    disabled?: boolean;
}
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
