/// <reference types="react" />
interface LayoutManagerColumnButtonProps {
    dataSource: any[];
    values: any[];
    tableKey: string;
    onChange: (values: any[]) => any;
    onClickReset: () => any;
    onChangeLayout: (layout: any) => any;
}
declare const LayoutManagerColumnButton: (props: LayoutManagerColumnButtonProps) => JSX.Element;
export default LayoutManagerColumnButton;
