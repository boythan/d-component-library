import React, { ReactNode } from "react";
import { ModalProps as ModalAntProps } from "antd";
import { ButtonProps } from "../button/Button";
export interface ModalProps extends Omit<ModalAntProps, "cancelButtonProps"> {
    children: React.ReactNode;
    open: boolean;
    onClose: ModalAntProps["onCancel"];
    onSave?: ModalAntProps["onOk"];
    onSideClick?: (e: React.MouseEvent<HTMLElement>) => void;
    cancelAction?: (e: React.MouseEvent<HTMLElement>) => void;
    customHeader?: () => ReactNode;
    customFooter?: () => ReactNode;
    customSideButton?: () => ReactNode;
    headerSide?: () => ReactNode;
    hasCloseIcon?: boolean;
    hasCancelButton?: boolean;
    saveText?: string;
    sideText?: string;
    size?: "large" | "medium" | "small";
    classNameHeader?: string;
    classNameFooter?: string;
    classNameContent?: string;
    showFooter?: boolean;
    showHeader?: boolean;
    cancelButtonProps?: ButtonProps;
    saveButtonProps?: ButtonProps;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
