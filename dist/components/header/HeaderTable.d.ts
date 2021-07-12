import { CSSProperties } from "react";
import { BadgeProps } from "../badge/Badge";
export interface HeaderTableProps {
    className?: string;
    classNameTop?: string;
    style?: CSSProperties;
    label?: string;
    onChangeText: any;
    onSubmitSearch?: any;
    placeholder?: string;
    disabledSearch?: boolean;
    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    onClickImport?: any;
    customView?: any;
    customButtons?: any;
    isFiltered?: boolean;
    badgeColor?: BadgeProps["color"];
}
declare const HeaderTable: ({ className, classNameTop, style, label, placeholder, onChangeText, disabledSearch, onSubmitSearch, onClickNew, onClickExport, onClickFilter, onClickImport, customView, customButtons, isFiltered, badgeColor, }: HeaderTableProps) => JSX.Element;
export default HeaderTable;
