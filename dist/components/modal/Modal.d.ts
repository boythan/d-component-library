import React, { ReactNode } from "react";
import { ModalProps as ModalAntProps } from "antd";
export interface ModalProps extends ModalAntProps {
    children: React.ReactNode;
    open: boolean;
    onClose: ModalAntProps["onCancel"];
    onSave?: ModalAntProps["onOk"];
    onSideClick?: (e: React.MouseEvent<HTMLElement>) => void;
    cancelAction?: (e: React.MouseEvent<HTMLElement>) => void;
    customHeader?: () => ReactNode;
    customFooter?: () => ReactNode;
    customSideButton?: () => ReactNode;
    hasCloseIcon?: boolean;
    hasCancelButton?: boolean;
    saveText?: string;
    sideText?: string;
}
declare const Modal: React.FC<ModalProps>;
export default Modal;
