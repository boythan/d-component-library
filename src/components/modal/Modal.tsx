import React, { CSSProperties, ReactNode } from "react";
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

    disabledSaveButton?: boolean;
    disabledCancelButton?: boolean;

    styleContent?: CSSProperties;
}

const SIZE_WIDTH: Record<string, string> = {
    small: "40%",
    medium: "50%",
    large: "85%",
};

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
    disabledCancelButton,
    disabledSaveButton,
    titleAlign = "center",
    styleContent,
    ...props
}) => {
    const computedWidth = (size && SIZE_WIDTH[size]) ?? width;

    const headerClass = ClassNames(
        "border-b py-2",
        { "flex items-center": !!title, "py-3": !hasCloseIcon },
        classNameHeader,
    );
    const footerClass = ClassNames("flex items-center border-t py-3 px-3", classNameFooter);
    const titleClass = ClassNames(
        "w-full",
        {
            "text-center": titleAlign === "center",
            "text-start ml-3": titleAlign === "start",
            "text-end mr-3": titleAlign === "end",
        },
        classNameTitle,
    );

    const header = () => {
        let content;
        content = () => {
            return (
                <React.Fragment>
                    {hasCloseIcon && <Button iconName="close" variant="trans" onClick={onClose} className="!p-6" />}
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
                    <div className="w-full flex items-center justify-end">
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
                                disabled={disabledCancelButton}
                                {...cancelButtonProps}
                            />
                        )}
                        <Button
                            variant="standard"
                            content={saveText}
                            onClick={onSave}
                            disabled={disabledSaveButton}
                            {...saveButtonProps}
                        />
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
            open={open}
            onCancel={onClose}
            centered={centered}
            className={className}
            closable={closable}
            width={computedWidth}
            footer={null}
            styles={{ body: { padding: 0 } }}
            {...props}
        >
            {showHeader && header()}
            <div className={ClassNames("p-6 max-h-[800px] overflow-y-scroll", classNameContent)} style={styleContent}>
                {children}
            </div>
            {showFooter && footer()}
        </ModalAnt>
    );
};

export default Modal;
