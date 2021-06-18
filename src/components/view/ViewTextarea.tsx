/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { CSSProperties, LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import ClassNames from "classnames";
import Messages from "../../language/Messages";

export interface ViewTextareaProps {
    [key: string]: any;
    children: string;
    style?: CSSProperties;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
    className?: string;
    classNameContent?: string;
    classNameShowMore?: string;
    classNameShowLess?: string;
    width?: number;
}

const ViewTextarea: React.FC<ViewTextareaProps> = ({
    children,
    className,
    classNameContent,
    classNameShowMore,
    classNameShowLess,
    style,
    showLessText = Messages.showLess,
    showMoreText = Messages.showMore,
    limitedLength = 200,
    width,
}) => {
    const [expanding, setExpanding] = useState(false);
    const contentLength = useMemo(() => {
        return children.length;
    }, [children]);
    const isOverFollow = useMemo(() => {
        return contentLength > limitedLength;
    }, [contentLength, limitedLength]);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const isShowMore = isOverFollow && !expanding;
    const isShowLess = isOverFollow && expanding;

    // classNames

    const wrapperClass = ClassNames("d-view-textarea text-small text-start", className);
    const contentClass = ClassNames(
        "d-view-textarea__content",
        {
            "text-nowrap": isOverFollow && !expanding,
            // "d-inline-block": !expanding,
        },
        classNameContent
    );
    const showClass = "d-view-textarea__show-more text-secondary hover-pointer text-x-small";
    const showMoreClass = ClassNames(showClass, classNameShowMore);
    const showLessClass = ClassNames(showClass, classNameShowLess);

    useEffect(() => {
        setTimeout(() => {
            console.log("Content Height", contentRef.current?.offsetHeight);
        }, 200);
    }, [children]);

    return (
        <div className={wrapperClass} style={style} ref={wrapperRef}>
            <div className={contentClass} ref={(ref) => (contentRef.current = ref)}>
                {children}
                {isShowLess && (
                    <span
                        className={showLessClass}
                        onClick={() => {
                            setExpanding(false);
                            wrapperRef.current && wrapperRef.current.setAttribute("style", `width:${width}px`);
                        }}
                    >
                        {` ${showLessText}`}
                    </span>
                )}
            </div>
            {isShowMore && (
                <span
                    className={showMoreClass}
                    onClick={() => {
                        setExpanding(true);
                        wrapperRef.current && wrapperRef.current.setAttribute("style", "width:100%");
                    }}
                >
                    {showMoreText}
                </span>
            )}
        </div>
    );
};

export default ViewTextarea;
