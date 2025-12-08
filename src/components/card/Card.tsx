import React, { CSSProperties } from "react";
import ClassNames from "classnames";
import Button, { ButtonProps } from "../button/Button";
import Badge from "../elements/badge/Badge";

export interface CardProps {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    sideText?: string;
    index?: any;
    subTitle?: string;
    classNameButton?: string;
    classNameIndex?: string;
    classNameHeader?: string;
    customHeader?: (() => React.ReactNode) | React.ReactNode;
    customLeft?: (() => React.ReactNode) | React.ReactNode;
    customRight?: (() => React.ReactNode) | React.ReactNode;
    onClick?: () => void;
    buttonProps?: ButtonProps;
    style?: CSSProperties;
}

const Card: React.FC<CardProps> = ({
    children,
    className,
    title,
    sideText,
    onClick,
    index,
    subTitle,
    classNameButton,
    classNameIndex,
    classNameHeader,
    customHeader,
    customLeft,
    customRight,
    buttonProps,
    style,
}) => {
    const wrapClass = ClassNames("card-container p-4", className);
    const headerClass = ClassNames("d-flex w-100 justify-content-between mb-3", classNameHeader);
    const titleWrapper = ClassNames("flex-center-y");
    const indexClass = ClassNames("text-xx-small bg-secondary text-white ml-1 text-center", classNameIndex);
    const buttonClass = ClassNames("text-secondary p-0", classNameButton);

    const header = (): React.ReactNode => {
        if (customHeader && typeof customHeader === "function") {
            return customHeader();
        }
        if (customHeader) {
            return customHeader as React.ReactNode;
        }
        const leftSide = (): React.ReactNode => {
            if (customLeft && typeof customLeft === "function") {
                return customLeft();
            }
            if (customLeft) {
                return customLeft as React.ReactNode;
            }
            return (
                <div>
                    <div className={titleWrapper}>
                        <div className="text-medium-bold">{title}</div>
                        {index && <Badge variant="index" index={index} size="xx-large" className="ml-2" />}
                    </div>
                    {subTitle && <div className="text-x-small">{subTitle}</div>}
                </div>
            );
        };
        const rightSide = (): React.ReactNode => {
            if (customRight && typeof customRight === "function") {
                return customRight();
            }
            if (customRight) {
                return customRight as React.ReactNode;
            }
            if (sideText) {
                return (
                    <Button
                        content={sideText}
                        variant="trans"
                        className={buttonClass}
                        onClick={onClick}
                        size="x-small"
                        {...buttonProps}
                    />
                );
            }
            return null;
        };
        return (
            <div className={headerClass}>
                <React.Fragment>
                    {leftSide()}
                    {rightSide()}
                </React.Fragment>
            </div>
        );
    };
    return (
        <div className={wrapClass} style={style}>
            <React.Fragment>
                {header()}
                {children}
            </React.Fragment>
        </div>
    );
};

export default Card;
