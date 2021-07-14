import React from "react";
export interface PopoverProps {
    open: boolean;
    onOpen: () => any;
    onClose: () => any;
    className?: string;
    classNameContent?: string;
    children?: React.ReactNode | React.ReactNode;
    content?: React.ReactNode | React.ReactNode;
}
declare const Popover: React.FC<PopoverProps>;
export default Popover;
