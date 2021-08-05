import ClassNames from "classnames";
import React, { CSSProperties } from "react";
import TimeUtils from "../../utils/TimeUtils";
import AvatarName, { IUserBasic } from "../avatar/AvatarName";
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
}

export interface HeaderDetailProps {
    [key: string]: any;
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
    viewStatusProps?: ViewLabelStatusProps;
    style?: CSSProperties;
    className?: string;
    classNameButton?: string;
    classNameStatus?: string;
    Messages: any;
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
    onButtonClick,
    Messages,
    viewStatusProps,
}) => {
    const leftView = () => {
        const titleStatus = () => {
            return (
                <div className="d-flex">
                    <h4>{title}</h4>
                    {status &&
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
                        const buttonClass = ClassNames("text-gray font-weight-normal", {
                            "mx-4": index !== 0,
                            "pl-0": index === 0,
                            classNameButton,
                        });
                        return (
                            <Button
                                variant="trans"
                                content={Messages[button.label]}
                                iconName={button.icon}
                                className={buttonClass}
                                onClick={() => onButtonClick && onButtonClick(button)}
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
        return (
            <div className="d-flex flex-column align-items-end">
                {user && <AvatarName user={user} className="mb-1" />}
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
