/// <reference types="react" />
import { SelectProps as SelectAntProps } from "antd/es/select";
export interface SelectProps extends SelectAntProps<any> {
    classNameSelect?: string;
    label?: string;
    dataSource: Array<any>;
    error?: any;
    variant?: "outline" | "standard";
    name?: string;
    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;
    hasFilter?: boolean;
    multiple?: boolean;
}
declare const Select: ({ className, classNameSelect, value, label, defaultValue, placeholder, onChange, disabled, dataSource, error, multiple, getLabel, getKey, getValue, allowClear, variant, hasFilter, ...props }: SelectProps) => JSX.Element;
export default Select;
