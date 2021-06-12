/// <reference types="react" />
interface ViewCollapseProps {
    label: string;
    children: any;
    className?: any;
    customLeftView?: any;
    defaultOpen?: any;
    extra?: boolean;
}
declare const ViewCollapse: ({ label, children, className, defaultOpen, extra, customLeftView, }: ViewCollapseProps) => JSX.Element;
export default ViewCollapse;
