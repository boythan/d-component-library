/// <reference types="react" />
export interface TreeSelectProps {
    className?: string;
    classNameSelect?: string;
    value: any[];
    label?: string;
    placeholder?: string;
    onChange?: any;
    disabled?: boolean;
    dataSource?: any[];
    error?: string;
    multiple?: boolean;
    allowClear?: boolean;
    variant?: "outline" | "standard";
}
declare const TreeSelect: ({ className, classNameSelect, value, label, placeholder, onChange, disabled, dataSource, error, multiple, allowClear, variant, }: TreeSelectProps) => JSX.Element;
export default TreeSelect;
