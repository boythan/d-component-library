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
        "relative text-sm text-left transition-all duration-300 ease-in-out",
        {
            "max-h-[1000px]": expanding,
            "max-h-24 overflow-hidden": !expanding,
        },
        className
    );
    const contentClass = ClassNames(
        "m-0 break-words",
        {
            // "d-view-textarea__content-expading": expanding,
            // "d-view-textarea__content-closing": !expanding,
        },
        classNameContent
    );
    const showClass = "text-secondary hover:underline cursor-pointer text-xs ml-1";
    const showMoreClass = ClassNames(showClass, classNameShowMore);
    const showLessClass = ClassNames(showClass, classNameShowLess);

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
                            // Scroll back if needed?
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
                    }}
                >
                    {showMoreText}
                </span>
            )}
        </div>
    );
};

export default ViewTextarea;
