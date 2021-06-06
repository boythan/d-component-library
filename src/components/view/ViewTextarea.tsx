/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { CSSProperties, LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import ClassNames from "classnames";

export interface ViewTextareaProps {
    [key: string]: any;
    children: string;
    className?: string;
    style?: CSSProperties;
    Messages?: any;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
}

const ViewTextarea: React.FC<ViewTextareaProps> = ({
    children,
    className,
    style,
    showLessText = "showLess",
    showMoreText = "showMore",
    limitedLength = 200,
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

    const wrapperClass = ClassNames("d-view-textarea text-small", className);
    const contentClass = ClassNames(
        "d-view-textarea__content",
        {
            "text-nowrap": isOverFollow && !expanding,
            // "d-inline-block": !expanding,
        },
        className
    );

    useEffect(() => {
        setTimeout(() => {
            console.log("Content Height", contentRef.current?.offsetHeight);
        }, 200);
    }, [children]);

    return (
        <div className={wrapperClass} style={style}>
            <div className={contentClass} ref={(ref) => (contentRef.current = ref)}>
                {children}
                {isShowLess && (
                    <span
                        className="d-view-textarea__show-more text-primary hover-pointer"
                        onClick={() => setExpanding(false)}
                    >
                        {showLessText}
                    </span>
                )}
            </div>
            {isShowMore && (
                <span
                    className="d-view-textarea__show-more text-primary hover-pointer"
                    onClick={() => setExpanding(true)}
                >
                    {showMoreText}
                </span>
            )}
        </div>
    );
};

export default ViewTextarea;
