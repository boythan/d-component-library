/// <reference types="react" />
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
}
declare const HeaderTable: ({ className, label, placeholder, onChangeText, disabledSearch, onClickNew, onClickExport, onClickFilter, onClickImport, customView, isFiltered, }: HeaderTableProps) => JSX.Element;
export default HeaderTable;
