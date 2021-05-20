import React, { ReactNode } from "react";
import { Modal as ModalAnt, ModalProps as ModalAntProps } from "antd";
import ClassNames from "classnames";
import Button from "../button/Button";

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

const Modal: React.FC<ModalProps> = ({
    children,
    open,
    centered = true,
    closable = false,
    onClose,
    onSave,
    onSideClick,
    cancelAction,
    width,
    className,
    title,
    customHeader,
    customFooter,
    customSideButton,
    hasCloseIcon = true,
    hasCancelButton = false,
    saveText = "Save",
    cancelText = "Cancel",
    sideText = "Clear",
    ...props
}) => {
    const modalClass = ClassNames("d-modal", className);
    const childrenClass = ClassNames("d-modal__children");
    const headerClass = ClassNames("border-bottom py-3", { "d-flex align-items-center": !!title });
    const header = () => {
        let content;
        content = () => {
            return (
                <React.Fragment>
                    {hasCloseIcon && <Button iconName="close" variant="trans" onClick={onClose} />}
                    {title && <h4 className="w-100 text-center">{title}</h4>}
                </React.Fragment>
            );
        };
        if (customHeader) {
            content = customHeader;
        }
        return <div className={headerClass}>{content()}</div>;
    };

    const footer = () => {
        let content;
        let sideButton: any;

        sideButton = () => <Button variant="trans" content={sideText} onClick={onSideClick} />;

        if (customSideButton) {
            sideButton = customSideButton;
        }

        content = () => {
            return (
                <React.Fragment>
                    {(onSideClick || !!customSideButton) && sideButton()}
                    <div className="w-100 d-flex align-items-center justify-content-end">
                        {hasCancelButton && (
                            <Button
                                variant="outline"
                                content={cancelText as any}
                                className="mr-3"
                                onClick={(e) => {
                                    if (cancelAction) {
                                        return cancelAction(e);
                                    }
                                    return onClose && onClose(e);
                                }}
                            />
                        )}
                        <Button variant="standard" content={saveText} />
                    </div>
                </React.Fragment>
            );
        };

        if (customFooter) {
            content = customFooter;
        }

        return <div className="d-flex align-items-center border-top py-3 px-3">{content()}</div>;
    };
    return (
        <ModalAnt
            visible={open}
            onCancel={onClose}
            centered={centered}
            className={modalClass}
            closable={closable}
            onOk={onSave}
            width={width}
            footer={null}
            {...props}
        >
            {header()}
            <div className={childrenClass}>{children}</div>
            {footer()}
        </ModalAnt>
    );
};

export default Modal;