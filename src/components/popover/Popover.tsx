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
    const [classNameContentEdge, setClassNameContentEdge] = useState("");
    const idContainer = useRef<string>(StringUtils.getUniqueID()).current;

    const wrapperClass = classNames("d-popover", className);
    const contentClass = classNames("d-popover__content", classNameContent, classNameContentEdge);

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

    useEffect(() => {
        const popoverContainer = document.getElementById(idContainer);
        const windowWidth = window.innerWidth;
        const marginLeft = popoverContainer?.getBoundingClientRect()?.left ?? 0;
        const isLeftSide = marginLeft / windowWidth < 0.5;
        const className = classNames({
            "d-popover__content-left-edge": isLeftSide,
            "d-popover__content-right-edge": !isLeftSide,
        });
        setClassNameContentEdge(className);
    }, [window.innerWidth]);

    return (
        <div className={wrapperClass} ref={outSideRef} id={idContainer}>
            <div onClick={() => (open ? onClose() : onOpen())}>{children}</div>
            {open && <div className={contentClass}>{content}</div>}
        </div>
    );
};

export default Popover;
