import React from "react";
import { ButtonProps } from "../button/Button";
export interface CardProps {
    children: React.ReactChild;
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
declare const Card: React.FC<CardProps>;
export default Card;
