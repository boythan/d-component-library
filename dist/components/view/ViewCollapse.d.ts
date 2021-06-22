/// <reference types="react" />
export interface ViewCollapseProps {
    label: any;
    children: any;
    className?: any;
    defaultOpen?: any;
    extra?: boolean;
}
declare const ViewCollapse: ({ label, children, className, defaultOpen, extra }: ViewCollapseProps) => JSX.Element;
export default ViewCollapse;
