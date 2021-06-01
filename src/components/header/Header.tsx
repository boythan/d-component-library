// react
// third-party
import React from "react";
// application
import Button from "../button/Button";
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
    showCancel?: boolean;
    Messages?: any;
}

const Header: React.FC<HeaderProps> = ({
    Messages,
    title,
    saveText = "save",
    cancelText = "back",
    deleteText = "delete",
    printText = "print",
    editText = "edit",
    onCancel,
    onSave,
    onDelete,
    onPrint,
    onEdit,
    disabledSave,
    customLeft,
    showCancel = true,
}) => {
    const renderLeftView = () => {
        if (customLeft) {
            return customLeft();
        }
        return <h4 className="text-primary">{title}</h4>;
    };
    return (
        <div className="card-container d-common-header">
            {renderLeftView()}
            <div className="d-common-header__button-group">
                {showCancel && (
                    <Button
                        variant="outline"
                        content={Messages ? Messages[cancelText] : cancelText}
                        onClick={() => (onCancel ? onCancel() : window.history.go("back" as any))}
                        className="mr-3"
                    />
                )}
                {onDelete && (
                    <Button
                        content={Messages ? Messages[deleteText] : deleteText}
                        onClick={onDelete}
                        iconName="delete"
                        className="mr-3"
                    />
                )}
                {onPrint && (
                    <Button
                        content={Messages ? Messages[printText] : printText}
                        onClick={onPrint}
                        iconName="print"
                        className="mr-3"
                    />
                )}
                {onEdit && (
                    <Button
                        content={Messages ? Messages[editText] : editText}
                        onClick={onEdit}
                        className="mr-3"
                        iconName="edit"
                    />
                )}
                {onSave && (
                    <Button
                        content={Messages ? Messages[saveText] : saveText}
                        onClick={onSave}
                        disabled={disabledSave}
                    />
                )}
            </div>
        </div>
    );
};

export default Header;
