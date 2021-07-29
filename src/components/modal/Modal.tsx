import React, { ReactNode } from "react";
import { Modal as ModalAnt, ModalProps as ModalAntProps } from "antd";
import ClassNames from "classnames";
import Button, { ButtonProps } from "../button/Button";

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
    classNameTitle?: string;
    showFooter?: boolean;
    showHeader?: boolean;
    cancelButtonProps?: ButtonProps;
    saveButtonProps?: ButtonProps;
    titleAlign?: "center" | "start" | "end";
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
    title,
    customHeader,
    customFooter,
    customSideButton,
    headerSide,
    hasCloseIcon = true,
    hasCancelButton = false,
    saveText = "Save",
    cancelText = "Cancel",
    sideText = "Clear",
    size,
    className,
    classNameContent,
    classNameFooter,
    classNameHeader,
    classNameTitle,
    showFooter = true,
    showHeader = true,
    cancelButtonProps,
    saveButtonProps,
    titleAlign = "center",
    ...props
}) => {
    const modalClass = ClassNames("d-modal", `d-modal__${size}`, className);
    const childrenClass = ClassNames("d-modal__children", classNameContent);
    const headerClass = ClassNames(
        "d-modal__header border-bottom py-2",
        { "d-flex align-items-center": !!title, "py-3": !hasCloseIcon },
        classNameHeader
    );
    const footerClass = ClassNames("d-modal__footer d-flex align-items-center border-top py-3 px-3", classNameFooter);
    const titleClass = ClassNames(
        "w-100",
        {
            "text-center": titleAlign === "center",
            "text-start ml-3": titleAlign === "start",
            "text-end mr-3": titleAlign === "end",
        },
        classNameTitle
    );

    const header = () => {
        let content;
        content = () => {
            return (
                <React.Fragment>
                    {hasCloseIcon && (
                        <Button
                            iconName="close"
                            variant="trans"
                            onClick={onClose}
                            className="d-modal__header-close-icon"
                        />
                    )}
                    {title && <h4 className={titleClass}>{title}</h4>}
                    {headerSide && headerSide()}
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
                                {...cancelButtonProps}
                            />
                        )}
                        <Button variant="standard" content={saveText} onClick={onSave} {...saveButtonProps} />
                    </div>
                </React.Fragment>
            );
        };

        if (customFooter) {
            content = customFooter;
        }

        return <div className={footerClass}>{content()}</div>;
    };

    return (
        <ModalAnt
            visible={open}
            onCancel={onClose}
            centered={centered}
            className={modalClass}
            closable={closable}
            width={width}
            footer={null}
            {...props}
        >
            {showHeader && header()}
            <div className={childrenClass}>{children}</div>
            {showFooter && footer()}
        </ModalAnt>
    );
};

export default Modal;
