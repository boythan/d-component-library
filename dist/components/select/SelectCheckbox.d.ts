import React from "react";
import { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import { DropdownProps } from "../dropdown/Dropdown";
export interface IDataItem {
    id?: string;
    label?: string;
    [key: string]: any;
}
export interface SelectCheckboxProps extends CheckboxGroupProps {
    [key: string]: any;
    placeholder?: string;
    label?: string;
    className?: string;
    classNameDropdown?: string;
    position?: DropdownProps["position"];
    showLabel?: boolean;
    iconName?: string;
    showHeader?: boolean;
    selectAllText?: string;
    clearText?: string;
    displayValue?: string;
    error?: any;
    customValueView?: (value?: any) => any;
}
declare const SelectCheckbox: React.FC<SelectCheckboxProps>;
export default SelectCheckbox;
