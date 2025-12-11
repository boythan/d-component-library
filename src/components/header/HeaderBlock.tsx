import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import Button, { ButtonProps } from "../button/Button";

export interface HeaderBlockProps {
    title?: string;
    className?: string;
    classNameTitle?: string;
    style?: CSSProperties;
    styleTitle?: CSSProperties;
    showLine?: boolean;
    showArrow?: boolean;
    customRight?: React.ReactNode;
    onPrevious?: () => any;
    onNext?: () => any;
    arrowProps?: ButtonProps;
    lineColor?: ButtonProps["color"];
    arrowColor?: ButtonProps["color"];
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({
    title,
    className,
    style,
    classNameTitle,
    styleTitle,
    showLine = true,
    showArrow,
    customRight,
    arrowProps = {},
    lineColor = "gray",
    arrowColor = "gray",
    onPrevious,
    onNext,
}) => {
    const wrapperClass = ClassNames("w-full flex items-center py-3 whitespace-nowrap", className);
    const titleClass = ClassNames("font-semibold text-base", classNameTitle);
    // Assuming simple border color mapping or use tailwind colors. "gray" -> "border-gray-200"
    const lineClass = ClassNames(`border-t border-gray-200 w-full ml-4`, { "mr-4": showArrow || customRight });

    const rightSide = () => {
        let content;
        if (showArrow) {
            content = (
                <div className="flex items-center">
                    <Button
                        iconName="chevron_left"
                        variant="outline"
                        onClick={onPrevious}
                        className="mr-3 px-1"
                        size="x-small"
                        color={arrowColor}
                        {...arrowProps}
                    />
                    <Button
                        iconName="chevron_right"
                        variant="outline"
                        onClick={onNext}
                        className="px-1"
                        size="x-small"
                        color={arrowColor}
                        {...arrowProps}
                    />
                </div>
            );
        }
        if (customRight) {
            content = customRight;
        }
        return content;
    };
    return (
        <div className={wrapperClass} style={style}>
            <div className={titleClass} style={styleTitle}>
                {title}
            </div>
            {showLine && <div className={lineClass} />}
            {rightSide()}
        </div>
    );
};

export default HeaderBlock;
