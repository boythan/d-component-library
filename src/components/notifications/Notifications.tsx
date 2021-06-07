/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { notification } from "antd";
import Icon from "../icon/Icon";
import Messages from "../../language/Messages";

const showError = (content: any, action?: any) => {
    notification.open({
        message: Messages.error,
        description: content,
        icon: <Icon name="report" className="text-danger" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showWarning = (content: any, action?: any) => {
    notification.open({
        message: Messages.warning,
        description: content,
        icon: <Icon name="warning" className="text-warning" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showSuccess = (content: any, action?: any) => {
    notification.open({
        message: Messages.success,
        description: content,
        icon: <Icon name="check_circle" className="text-success" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showInfo = (content: any, action?: any) => {
    notification.open({
        message: Messages.info,
        description: content,
        icon: <Icon name="info" className="text-primary" size="large" />,
        closeIcon: <Icon name="close" />,
        onClick: () => {
            action && action();
        },
        duration: 10,
        placement: "bottomRight",
    });
};

export default { showError, showInfo, showSuccess, showWarning };
