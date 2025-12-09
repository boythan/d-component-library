/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from "classnames";
import React, { useEffect, useMemo, useRef, useState } from "react";
import StringUtils from "../../utils/StringUtils";

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
    const [contentPositionClass, setContentPositionClass] = useState("left-0");
    const idContainer = useRef<string>(StringUtils.getUniqueID()).current;

    const wrapperClass = classNames("relative inline-block", className);
    const contentClass = classNames(
        "absolute z-50 bg-white shadow-lg rounded-sm border border-neutral-200 p-2 min-w-[200px]",
        contentPositionClass,
        classNameContent
    );

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (open) {
            const popoverContainer = document.getElementById(idContainer);
            const rect = popoverContainer?.getBoundingClientRect();
            const windowWidth = window.innerWidth;

            // If element is in the right half of the screen, align content to the right (grow left)
            const isRightSide = (rect?.left ?? 0) > windowWidth / 2;

            setContentPositionClass(isRightSide ? "right-0" : "left-0");
        }
    }, [open, idContainer]);

    return (
        <div className={wrapperClass} ref={outSideRef} id={idContainer}>
            <div onClick={() => (open ? onClose() : onOpen())}>{children}</div>
            {open && <div className={contentClass}>{content}</div>}
        </div>
    );
};

export default Popover;
