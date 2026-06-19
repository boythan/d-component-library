/* eslint-disable no-unused-expressions */
import { notification } from "antd";
import type { NotificationConfig } from "antd/es/notification/interface";
import React from "react";
import Icon from "../elements/icon/Icon";

const getContentNotification = (content: string) => {
    return <div className="notifications-content" dangerouslySetInnerHTML={{ __html: content }} />;
};

const showError = (content: any, action?: any, options?: Partial<NotificationConfig>) => {
    notification.open({
        message: null,
        description: getContentNotification(content),
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "notification-error",
        ...(options || {}),
    } as any);
};

const showWarning = (content: any, action?: any, options?: Partial<NotificationConfig>) => {
    notification.open({
        message: null,
        description: getContentNotification(content),
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "notification-warning",
        ...(options || {}),
    } as any);
};

const showSuccess = (content: any, action?: any, options?: Partial<NotificationConfig>) => {
    notification.open({
        message: null,
        description: getContentNotification(content),
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "notification-success",
        ...(options || {}),
    } as any);
};

const showInfo = (content: any, action?: any, options?: Partial<NotificationConfig>) => {
    notification.open({
        message: null,
        description: getContentNotification(content),
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        className: "notification-info",
        ...(options || {}),
    } as any);
};

const Notifications = { showError, showInfo, showSuccess, showWarning };

export default Notifications;
