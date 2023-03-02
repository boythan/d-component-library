/* eslint-disable no-param-reassign */
// react
// third-party
import React from "react";
import Messages from "../../language/Messages";
import Breadcrumb from "../breadcrumb/Breadcrumb";
// application
import Button, { ButtonProps } from "../button/Button";
// data stubs

export interface HeaderProps {
    title?: string;
    cancelText?: string;
    saveText?: string;
    onCancel?: () => any;
    onSave?: () => any;
    onDelete?: () => any;
    onPrint?: () => any;
    onEdit?: () => any;
    deleteText?: string;
    printText?: string;
    editText?: string;
    disabledSave?: boolean;
    customLeft?: () => React.ReactNode;
    customRight?: () => React.ReactNode;
    showCancel?: boolean;
    className?: string;
    classNameLeft?: string;
    classNameRight?: string;
    breadcrumb?: any;
    cancelButtonProps?: ButtonProps;
    deleteButtonProps?: ButtonProps;
    printButtonProps?: ButtonProps;
    editButtonProps?: ButtonProps;
    saveButtonProps?: ButtonProps;
}

const Header: React.FC<HeaderProps> = ({
    title,
    saveText = Messages.save,
    cancelText = Messages.back,
    deleteText = Messages.delete,
    printText = Messages.print,
    editText = Messages.edit,
    onCancel,
    onSave,
    onDelete,
    onPrint,
    onEdit,
    disabledSave,
    customLeft,
    customRight,
    showCancel = true,
    className,
    classNameLeft,
    classNameRight,
    breadcrumb = [],
    cancelButtonProps = {},
    deleteButtonProps = {},
    printButtonProps = {},
    editButtonProps = {},
    saveButtonProps = {},
}) => {
    const renderLeftView = () => {
        if (customLeft) {
            return customLeft();
        }
        return (
            <div className={`page-header__container ${classNameLeft}`}>
                <Breadcrumb breadcrumb={breadcrumb} />
                <h4 className="text-primary">{title}</h4>
            </div>
        );
    };
    return (
        <div className={`card-container d-common-header ${className}`}>
            {renderLeftView()}
            <div className={`d-common-header__right-side flex-center-y ${classNameRight}`}>
                {customRight && customRight()}
                {showCancel && (
                    <Button
                        variant="outline"
                        content={cancelText}
                        onClick={() => (onCancel ? onCancel() : window.history.go("back" as any))}
                        className="mr-3"
                        {...cancelButtonProps}
                    />
                )}
                {onDelete && (
                    <Button
                        content={deleteText}
                        onClick={onDelete}
                        iconName="delete"
                        className="mr-3"
                        {...deleteButtonProps}
                    />
                )}
                {onPrint && (
                    <Button
                        content={printText}
                        onClick={onPrint}
                        iconName="print"
                        className="mr-3"
                        {...printButtonProps}
                    />
                )}
                {onEdit && (
                    <Button content={editText} onClick={onEdit} className="mr-3" iconName="edit" {...editButtonProps} />
                )}
                {onSave && <Button content={saveText} onClick={onSave} disabled={disabledSave} {...saveButtonProps} />}
            </div>
        </div>
    );
};

export default Header;
