// react
// third-party
import React from "react";
import Messages from "../../language/Messages";
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
    className?: string;
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
    showCancel = true,
    className,
}) => {
    const renderLeftView = () => {
        if (customLeft) {
            return customLeft();
        }
        return <h4 className="text-primary">{title}</h4>;
    };
    return (
        <div className={`card-container d-common-header ${className}`}>
            {renderLeftView()}
            <div className="d-common-header__button-group">
                {showCancel && (
                    <Button
                        variant="outline"
                        content={cancelText}
                        onClick={() => (onCancel ? onCancel() : window.history.go("back" as any))}
                        className="mr-3"
                    />
                )}
                {onDelete && <Button content={deleteText} onClick={onDelete} iconName="delete" className="mr-3" />}
                {onPrint && <Button content={printText} onClick={onPrint} iconName="print" className="mr-3" />}
                {onEdit && <Button content={editText} onClick={onEdit} className="mr-3" iconName="edit" />}
                {onSave && <Button content={saveText} onClick={onSave} disabled={disabledSave} />}
            </div>
        </div>
    );
};

export default Header;
