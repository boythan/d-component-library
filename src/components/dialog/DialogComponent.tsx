// react
import React, { useImperativeHandle, forwardRef } from "react";
// third-party
import { Modal } from "antd";
// application
// data stubs

const Dialog = (props: any, ref: any) => {
    const [modal, contextHolder] = Modal.useModal();
    useImperativeHandle(ref, () => ({
        showConfirm: (title: any, content: any, onOk: any, onCancel: any) => {
            modal.confirm({
                title,
                content: <div>{content}</div>,
                onOk,
                onCancel,
                // centered: true,
            });
        },
        showWarning: (title: any, content: any, onOk: any) => {
            modal.warning({
                title,
                content: <div>{content}</div>,
                onOk,
            });
        },
        showInfo: (title: any, content: any, onOk: any) => {
            modal.info({
                title,
                content: <div>{content}</div>,
                onOk,
            });
        },
        showError: (title: any, content: any, onOk: any) => {
            modal.error({
                title,
                content: <div>{content}</div>,
                onOk,
            });
        },
    }));
    return <React.Fragment>{contextHolder}</React.Fragment>;
};

const DialogComponent = forwardRef(Dialog);
export default DialogComponent;
