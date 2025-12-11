/* eslint-disable no-param-reassign */
import React from "react";
import ClassNames from "classnames";
import Messages from "../../language/Messages";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Button, { ButtonProps } from "../button/Button";

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
            <div className={ClassNames("flex flex-col", classNameLeft)}>
                <Breadcrumb breadcrumb={breadcrumb} />
                <h4 className="text-primary text-xl font-medium mt-1">{title}</h4>
            </div>
        );
    };
    return (
        <div className={ClassNames("bg-white rounded-lg shadow-sm p-4 flex justify-between items-center", className)}>
            {renderLeftView()}
            <div className={ClassNames("flex items-center", classNameRight)}>
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
