/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";
import React from "react";
import Messages from "../../language/Messages";
import Icon from "../elements/icon/Icon";

const getContentNotification = (content: string) => {
    return <div className="d-notifications__content" dangerouslySetInnerHTML={{ __html: content }} />;
};

const showError = (content: any, action?: any, options?: Partial<ArgsProps>) => {
    notification.open({
        message: Messages.error,
        description: getContentNotification(content),
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "d-notification__error",
        ...(options || {}),
    });
};

const showWarning = (content: any, action?: any, options?: Partial<ArgsProps>) => {
    notification.open({
        message: Messages.warning,
        description: getContentNotification(content),
        // icon: <Icon name="warning" className="text-warning" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "d-notification__warning",
        ...(options || {}),
    });
};

const showSuccess = (content: any, action?: any, options?: Partial<ArgsProps>) => {
    notification.open({
        message: Messages.success,
        description: getContentNotification(content),
        // icon: <Icon name="check_circle" className="text-success" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "d-notification__success",
        ...(options || {}),
    });
};

const showInfo = (content: any, action?: any, options?: Partial<ArgsProps>) => {
    notification.open({
        message: Messages.info,
        description: getContentNotification(content),
        // icon: <Icon name="info" className="text-primary" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        duration: 10,
        className: "d-notification__info",
        ...(options || {}),
    });
};

export default { showError, showInfo, showSuccess, showWarning, notification };
