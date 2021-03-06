import ClassNames from "classnames";
import React, { CSSProperties } from "react";
import Messages from "../../language/Messages";
import TimeUtils from "../../utils/TimeUtils";
import AvatarName, { IUserBasic, AvatarNameProps } from "../avatar/AvatarName";
import Button, { ButtonProps } from "../button/Button";
import ViewLabelStatus, { ViewLabelStatusProps } from "../view/ViewLabelStatus";

export interface IStatusItem {
    id: string;
    label: string;
    color?: string;
    [key: string]: any;
}

export interface IButtonItem {
    id: string;
    label?: string;
    icon?: string;
    buttonProps?: ButtonProps;
    classNameButton?: string;
    render?: (props: { className: string; icon?: string; label?: string; id: string }) => any;
    onClick?: (props: IButtonItem) => any;
}

export interface HeaderDetailProps {
    title?: string;
    subTitle?: string;
    listStatus?: Array<IStatusItem>;
    listButton?: Array<IButtonItem>;
    status?: string;
    created?: any;
    user?: IUserBasic;
    customRight?: () => React.ReactNode;
    onButtonClick?: (item: IButtonItem) => void;
    customCreated?: (props?: any) => any;
    customButtons?: (props?: any) => any;
    customStatus?: (status?: any) => any;
    customUserView?: (props?: any) => any;
    viewStatusProps?: ViewLabelStatusProps;
    style?: CSSProperties;
    className?: string;
    classNameSubTitle?: string;
    classNameStatus?: string;
    avatarNameProps?: Partial<AvatarNameProps>;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({
    style,
    className,
    classNameStatus,
    classNameSubTitle,
    title,
    subTitle,
    status,
    listStatus = [],
    listButton = [
        { id: "print", icon: "print", label: "print" },
        { id: "cancel", icon: "cancel", label: "cancel" },
    ],
    created,
    user,
    customRight,
    customCreated,
    customButtons,
    customStatus,
    customUserView,
    onButtonClick,
    viewStatusProps,
    avatarNameProps = {},
}) => {
    const leftView = () => {
        const titleStatus = () => {
            return (
                <div className="d-flex ml-3">
                    <h4>{title}</h4>
                    {(status || customStatus) &&
                        (customStatus ? (
                            customStatus()
                        ) : (
                            <ViewLabelStatus
                                listStatus={listStatus}
                                status={status}
                                className={`ml-3 ${classNameStatus}`}
                                {...viewStatusProps}
                            />
                        ))}
                </div>
            );
        };

        const renderSubTitle = () => {
            return <div className={`text-small ml-3 mt-3 ${classNameSubTitle}`}>{subTitle}</div>;
        };

        const buttons = () => {
            if (customButtons) {
                return customButtons();
            }
            return (
                <div className="d-flex align-items-center mt-3 ml-1">
                    {listButton.map((button, index) => {
                        const { render, icon, label, id, onClick, buttonProps, classNameButton } = button;
                        const buttonClass = ClassNames("text-primary font-weight-normal py-0", {
                            "mr-3": index === 0,
                            "mx-3": index !== 0,
                            "pl-0 pr-4": index === 0,
                            classNameButton,
                        });
                        if (render) {
                            return render({ className: buttonClass, icon, id, label });
                        }
                        return (
                            <Button
                                variant="trans"
                                content={label}
                                iconName={icon}
                                className={buttonClass}
                                onClick={() => {
                                    if (onClick) {
                                        return onClick(button);
                                    }
                                    return onButtonClick && onButtonClick(button);
                                }}
                                {...buttonProps}
                            />
                        );
                    })}
                </div>
            );
        };
        return (
            <div className="d-flex flex-column">
                {titleStatus()}
                {subTitle && renderSubTitle()}
                {listButton.length > 0 && buttons()}
            </div>
        );
    };

    let createdView = (
        <div className="text-x-small text-gray mt-3">
            {`${Messages.createdOn} ${TimeUtils.convertMiliToDate(created as any)} ${
                Messages.at
            } ${TimeUtils.convertMiliToTime(created as any)}`}
        </div>
    );

    if (customCreated) {
        createdView = customCreated(created);
    }

    const rightView = () => {
        if (customRight) {
            return customRight();
        }
        const renderUser = () => {
            if (customUserView) {
                return customUserView(user);
            }
            return user && <AvatarName user={user} className="mb-1" {...avatarNameProps} />;
        };
        return (
            <div className="d-flex flex-column align-items-end mr-3">
                {renderUser()}
                {(created || customCreated) && createdView}
            </div>
        );
    };

    return (
        <div
            className={`card-container d-flex align-items-center justify-content-between p-4 ${className}`}
            style={style}
        >
            {leftView()}
            {rightView()}
        </div>
    );
};

export default HeaderDetail;
