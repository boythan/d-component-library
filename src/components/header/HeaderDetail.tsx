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

interface IButtonItem {
    id: string;
    label: string;
    icon: string;
    render?: (props: { className: string; icon: string; label: string; id: string }) => any;
    onClick?: (props: IButtonItem) => any;
}

export interface HeaderDetailProps {
    title?: string;
    listStatus?: Array<IStatusItem>;
    listButton?: Array<IButtonItem>;
    buttonProps?: ButtonProps;
    status?: string;
    created?: any;
    user?: IUserBasic;
    customRight?: () => React.ReactNode;
    onButtonClick?: (item: IButtonItem) => void;
    customCreated?: (props?: any) => any;
    customStatus?: (status?: any) => any;
    customUserView?: (props?: any) => any;
    viewStatusProps?: ViewLabelStatusProps;
    style?: CSSProperties;
    className?: string;
    classNameButton?: string;
    classNameStatus?: string;
    avatarNameProps?: Partial<AvatarNameProps>;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({
    style,
    className,
    classNameButton,
    classNameStatus,
    title,
    status,
    listStatus = [],
    listButton = [
        { id: "print", icon: "print", label: "print" },
        { id: "cancel", icon: "cancel", label: "cancel" },
    ],
    buttonProps,
    created,
    user,
    customRight,
    customCreated,
    customStatus,
    customUserView,
    onButtonClick,
    viewStatusProps,
    avatarNameProps = {},
}) => {
    const leftView = () => {
        const titleStatus = () => {
            return (
                <div className="d-flex">
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

        const buttons = () => {
            return (
                <div className="d-flex align-items-center mt-3">
                    {listButton.map((button, index) => {
                        const { render, icon, label, id, onClick } = button;
                        const buttonClass = ClassNames("text-gray font-weight-normal", {
                            "mx-4": index !== 0,
                            "pl-0": index === 0,
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
            <div className="d-flex flex-column align-items-end">
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
