/* eslint-disable no-param-reassign */
// react
// third-party
import React from "react";
import Messages from "../../language/Messages";
// application
import Button from "../button/Button";
import Icon from "../icon/Icon";
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
    breadcrumb?: any;
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
    breadcrumb = [],
}) => {
    if (breadcrumb.length > 0) {
        const lastIndex = breadcrumb.length - 1;

        breadcrumb = breadcrumb.map((item: any, index: number) => {
            let link;

            if (lastIndex === index) {
                link = <div className="small">{item.title}</div>;
            } else {
                link = (
                    <div key={index} className="flex-center">
                        <a href={item.url} className="small">
                            {item.title}
                        </a>
                        <Icon className="breadcrumb-arrow mx-2" name="chevron_right" />
                    </div>
                );
            }

            return link;
        });

        breadcrumb = <div className="page-header__breadcrumb">{breadcrumb}</div>;
    }
    const renderLeftView = () => {
        if (customLeft) {
            return customLeft();
        }
        return (
            <div className="page-header__container ">
                {breadcrumb}
                <h4 className="text-primary">{title}</h4>
            </div>
        );
    };
    return (
        <div className={`card-container d-common-header ${className}`}>
            {renderLeftView()}
            <div className="d-common-header__button-group">
                {customRight && customRight()}
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
