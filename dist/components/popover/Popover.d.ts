import React from "react";
export interface PopoverProps {
    isClickOpen?: boolean;
    className?: string;
    classNameContent?: string;
    children?: React.ReactNode | React.ReactNode;
    content?: React.ReactNode | React.ReactNode;
    setRef?: (ref: any) => void;
}
declare const Popover: React.FC<PopoverProps>;
export default Popover;
