/// <reference types="react" />
export interface HeaderTableProps {
    className?: string;
    label: string;
    onChangeText: any;
    placeholder?: string;
    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    customView?: any;
}
declare const HeaderTable: ({ className, label, placeholder, onChangeText, onClickNew, onClickExport, onClickFilter, customView, }: HeaderTableProps) => JSX.Element;
export default HeaderTable;
