/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { CSSProperties, LegacyRef, useEffect, useMemo, useRef, useState } from "react";
import ClassNames from "classnames";
import Messages from "../../language/Messages";

export interface ViewTextareaProps {
    children: string;
    style?: CSSProperties;
    styleContent?: CSSProperties;
    showMoreText?: string;
    showLessText?: string;
    limitedLength?: number;
    className?: string;
    classNameContent?: string;
    classNameShowMore?: string;
    classNameShowLess?: string;
}

const ViewTextarea: React.FC<ViewTextareaProps> = ({
    children,
    className,
    classNameContent,
    classNameShowMore,
    classNameShowLess,
    style = {},
    styleContent = {},
    showLessText = Messages.showLess,
    showMoreText = Messages.showMore,
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

    const displayText = useMemo(() => {
        let content = children;
        if (isOverFollow && isShowMore) {
            content = children.substring(0, limitedLength);
        }
        return content;
    }, [isOverFollow, contentLength, isShowLess, isShowMore, expanding]);

    // classNames

    const wrapperClass = ClassNames(
        "d-view-textarea text-small text-start",
        {
            "d-view-textarea__expading": expanding,
            "d-view-textarea__closing": !expanding,
        },
        className
    );
    const contentClass = ClassNames(
        "d-view-textarea__content",
        {
            "d-view-textarea__content-expading": expanding,
            "d-view-textarea__content-closing": !expanding,
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
        <div className={wrapperClass} style={{ ...style }} ref={wrapperRef}>
            <p className={contentClass} style={styleContent} ref={(ref) => (contentRef.current = ref)}>
                {displayText}
                {isShowMore && isOverFollow && <span>...</span>}
                {isShowLess && (
                    <span
                        className={showLessClass}
                        onClick={() => {
                            setExpanding(false);
                        }}
                    >
                        {` ${showLessText}`}
                    </span>
                )}
            </p>
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
