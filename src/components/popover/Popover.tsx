/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import React, { useEffect, useRef } from "react";

export interface PopoverProps {
    open: boolean;
    onOpen: () => any;
    onClose: () => any;

    className?: string;
    classNameContent?: string;

    children?: React.ReactNode | React.ReactNode;
    content?: React.ReactNode | React.ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ open, onOpen, onClose, content, children, className, classNameContent }) => {
    const outSideRef = useRef<any>();

    const wrapperClass = classNames("d-popover", className);
    const contentClass = classNames("d-popover__content", classNameContent);

    const handleClick = (e: any) => {
        if (outSideRef?.current?.contains(e.target)) {
            return;
        }
        // outside click
        onClose();
    };

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    return (
        <div className={wrapperClass} ref={outSideRef}>
            <div onClick={() => (open ? onClose() : onOpen())}>{children}</div>
            {open && <div className={contentClass}>{content}</div>}
        </div>
    );
};

export default Popover;
