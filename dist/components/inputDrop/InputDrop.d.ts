import React from "react";
import { DropdownProps } from "../dropdown/Dropdown";
export interface InputDropProps {
    className?: string;
    classNameDropdown?: string;
    label?: string;
    iconName?: string;
    position?: DropdownProps["position"];
    displayValue?: string;
    selectAllText?: string;
    clearText?: string;
    error?: any;
    hideLabel?: boolean;
    hideSelectAll?: boolean;
    hideClearAll?: boolean;
}
interface InputDropSourceProps extends InputDropProps {
    valueLength: number;
    onClickSelectAll: () => any;
    onClickClearAll: () => any;
    onClickApply: () => any;
    content: () => any;
    onChangeText?: (value: any) => any;
}
declare const InputDrop: React.FC<InputDropSourceProps>;
export default InputDrop;
