/// <reference types="react" />
export interface SelectProps {
    [key: string]: any;
}
declare const Select: ({ className, classNameSelect, value, label, defaultValue, placeholder, onChange, disabled, dataSource, error, multiple, getLabel, getKey, getValue, allowClear, variant, hasFilter, ...props }: SelectProps) => JSX.Element;
export default Select;
