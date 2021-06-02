import React from "react";
import { ButtonProps } from "../button/Button";
export interface IDropdownMenuItemProps {
    id: string | number;
    label: string;
    iconName?: string;
    image?: string;
    path?: string;
    title?: string;
    selected?: boolean;
    subMenu?: Array<IDropdownMenuItemProps>;
    [key: string]: any;
}
export interface DropDownMenuProps {
    [key: string]: any;
    dataSource: IDropdownMenuItemProps[];
    onClick?: (item: IDropdownMenuItemProps) => void;
    Messages?: any;
    className?: string;
}
export interface DropdownProps extends DropDownMenuProps {
    [key: string]: any;
    buttonProps?: ButtonProps;
    variant?: "button" | "view";
    value?: IDropdownMenuItemProps;
    placeholder?: string;
    className?: string;
    classNameMenu?: string;
}
export declare const DropdownMenu: React.FC<DropDownMenuProps>;
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
