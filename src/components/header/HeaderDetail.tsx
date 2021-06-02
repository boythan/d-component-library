import React, { useMemo } from "react";
import ClassNames from "classnames";
import Button from "../button/Button";
import AvatarName, { IUserBasic } from "../avatar/AvatarName";
import TimeUtils from "../../utils/TimeUtils";

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
    status?: string;
    created?: number;
    user?: IUserBasic;
    customRight?: () => React.ReactNode;
    onButtonClick?: (item: IButtonItem) => void;
    customCreated?: (props?: any) => any;
    Messages?: any;
}

const HeaderDetail: React.FC<HeaderDetailProps> = ({
    title,
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
    onButtonClick,
    Messages,
}) => {
    const foundStatus = useMemo(() => {
        let result = null;
        if (status && listStatus.length > 0) {
            result = listStatus.find((item) => item?.id === status);
        }
        return result;
    }, [status]);

    const leftView = () => {
        const titleStatus = () => {
            return (
                <div className="d-flex">
                    <h4>{title}</h4>
                    {foundStatus && (
                        <div
                            className="py-1 px-2 text-center ml-3 text-white"
                            style={{ backgroundColor: foundStatus.color }}
                        >
                            {Messages[foundStatus.label]}
                        </div>
                    )}
                </div>
            );
        };

        const buttons = () => {
            return (
                <div className="d-flex align-items-center">
                    {listButton.map((button, index) => {
                        const buttonClass = ClassNames("p-0 text-gray font-weight-normal", {
                            "mx-3": index !== 0,
                        });
                        return (
                            <Button
                                variant="trans"
                                content={Messages[button.label]}
                                iconName={button.icon}
                                className={buttonClass}
                                onClick={() => onButtonClick && onButtonClick(button)}
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
        <div className="text-x-small text-gray">
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
        <div className="card-container d-flex align-items-center justify-content-between p-4">
            {leftView()}
            {rightView()}
        </div>
    );
};

export default HeaderDetail;
