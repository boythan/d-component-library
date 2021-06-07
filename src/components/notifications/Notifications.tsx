/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { notification } from "antd";

const showError = (content: any, action: any, title = "Error") => {
    notification.open({
        message: title,
        description: content,
        icon: <i className="material-icons text-danger">report</i>,
        style: { border: "1px solid red" },
        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showWarning = (content: any, action: any, title = "Warning") => {
    notification.open({
        message: title,
        description: content,
        icon: <i className="material-icons text-warning">warning</i>,

        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showSuccess = (content: any, action: any, title = "Success") => {
    notification.open({
        message: title,
        description: content,
        icon: <i className="material-icons text-success">check_circle</i>,
        onClick: () => {
            action && action();
        },
        placement: "bottomRight",
    });
};

const showInfo = (content: any, action: any, title = "Info") => {
    notification.open({
        message: title,
        description: content,
        icon: <i className="material-icons text-primary">info</i>,
        onClick: () => {
            action && action();
        },
        duration: 10,
        placement: "bottomRight",
    });
};

export default { showError, showInfo, showSuccess, showWarning };
