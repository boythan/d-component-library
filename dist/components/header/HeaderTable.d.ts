/// <reference types="react" />
import { BadgeProps } from "../badge/Badge";
export interface HeaderTableProps {
    className?: string;
    label: string;
    onChangeText: any;
    placeholder?: string;
    disabledSearch?: boolean;
    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    onClickImport?: any;
    customView?: any;
    isFiltered?: boolean;
    badgeColor?: BadgeProps["color"];
}
declare const HeaderTable: ({ className, label, placeholder, onChangeText, disabledSearch, onClickNew, onClickExport, onClickFilter, onClickImport, customView, isFiltered, badgeColor, }: HeaderTableProps) => JSX.Element;
export default HeaderTable;
