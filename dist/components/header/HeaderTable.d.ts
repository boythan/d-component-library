/// <reference types="react" />
export interface HeaderTableProps {
    label: string;
    onChangeText: any;
    placeholder?: string;
    onClickNew?: any;
    onClickExport?: any;
    onClickFilter?: any;
    customView?: any;
}
declare const HeaderTable: ({ label, placeholder, onChangeText, onClickNew, onClickExport, onClickFilter, customView, }: HeaderTableProps) => JSX.Element;
export default HeaderTable;
