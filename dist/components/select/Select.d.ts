import { SelectProps as SelectAntProps } from "antd/es/select";
import React from "react";
export interface SelectProps extends SelectAntProps<any> {
    classNameSelect?: string;
    label?: string;
    dataSource?: Array<any>;
    error?: any;
    variant?: "outline" | "standard";
    name?: string;
    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;
    hasFilter?: boolean;
    multiple?: boolean;
}
export interface SelectMethod {
    onBlur: () => void;
    onFocus: () => void;
}
declare const _default: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<SelectMethod>>;
export default _default;
