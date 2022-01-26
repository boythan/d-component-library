import React from "react";
import ClassNames from "classnames";
import Button, { ButtonProps } from "../button/Button";
import Badge from "../elements/badge/Badge";

export interface CardProps {
    children?: any;
    className?: string;
    title?: string;
    sideText?: string;
    index?: any;
    subTitle?: string;
    classNameButton?: string;
    classNameIndex?: string;
    classNameHeader?: string;
    customHeader?: React.ComponentType | React.ReactNode;
    customLeft?: React.ComponentType | React.ReactNode;
    customRight?: React.ComponentType | React.ReactNode;
    onClick?: () => void;
    buttonProps?: ButtonProps;
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
}) => {
    const wrapClass = ClassNames("card-container p-4", className);
    const headerClass = ClassNames("d-flex w-100 justify-content-between mb-3", classNameHeader);
    const titleWrapper = ClassNames("flex-center-y");
    const indexClass = ClassNames("text-xx-small bg-secondary text-white ml-1 text-center", classNameIndex);
    const buttonClass = ClassNames("text-secondary p-0", classNameButton);

    const header = () => {
        if (customHeader) {
            return customHeader;
        }
        const leftSide = () => {
            if (customLeft) {
                return customLeft;
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
        const rightSide = () => {
            if (customRight) {
                return customRight;
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
            return <div />;
        };
        return (
            <div className={headerClass}>
                {leftSide()}
                {rightSide()}
            </div>
        );
    };
    return (
        <div className={wrapClass}>
            {header()}
            {children}
        </div>
    );
};

export default Card;
