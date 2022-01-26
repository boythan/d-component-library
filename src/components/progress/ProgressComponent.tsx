/* eslint-disable no-unused-expressions */
import { Modal } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import Messages from "../../language/Messages";
import Button from "../button/Button";
import Loading from "../elements/loading/Loading";

export interface IProgressFunctionProps {
    method: (props?: any, paging?: any, index?: any) => Promise<any>;
    params: any;
}

export interface IResponseAPI {
    [key: string]: any;
    data?: { data?: any; pagination?: any; [key: string]: any };
    error?: any;
    message?: any;
    status?: any;
}

export interface ProgressComponentProps {
    Messages?: any;
    onSuccess?: (res?: Array<IResponseAPI> | IResponseAPI) => any;
    promiseFunction?: Array<IProgressFunctionProps> | IProgressFunctionProps;
}

export interface ProgressComponentState {}

class ProgressComponent extends Component<ProgressComponentProps, any> {
    unmounted: any;

    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
            error: false,
        };
    }

    show = (
        promiseFunction: ProgressComponentProps["promiseFunction"],
        onSuccess: ProgressComponentProps["onSuccess"],
        handleError: any
    ) => {
        this.setState(
            {
                open: true,
                promiseFunction,
                onSuccess,
                handleError,
                error: false,
            },
            () => this.loadData()
        );
    };

    generatePromiseFunction = (promiseFunc: IProgressFunctionProps) => {
        let taskItem;
        if (!_.isArray(promiseFunc.params)) taskItem = promiseFunc.method(promiseFunc.params);
        else taskItem = promiseFunc.method(...promiseFunc.params);
        return taskItem;
    };

    loadData = () => {
        const { promiseFunction, onSuccess } = this.state;
        const { Messages } = this.props;
        let promiseAll;
        const isArrayFunction = _.isArray(promiseFunction);
        if (isArrayFunction) {
            promiseAll = promiseFunction.map((pro: any) => this.generatePromiseFunction(pro));
        } else {
            promiseAll = [this.generatePromiseFunction(promiseFunction)];
        }

        const task = Promise.all(promiseAll);
        task.then((result: any) => {
            if (result) {
                this.dismiss();
                onSuccess && onSuccess(isArrayFunction ? result : result?.[0]);
            } else {
                this.setError({
                    message: Messages ? Messages.error : "Error",
                });
            }
        }).catch((error) => {
            if (this.unmounted) {
                throw error;
            }
            this.setError(error);
        });
    };

    setError = (error: any) => {
        const { handleError } = this.state;
        if (handleError && handleError(error)) {
            this.dismiss();
            return;
        }
        if (error && error.response && error.response.data) {
            this.setState({ error: error.response.data });
            return;
        }
        this.setState({ error });
    };

    dismiss = () => {
        this.setState({ open: false });
    };

    onClickRetry = () => {
        this.setState({ error: false }, () => this.loadData());
    };

    renderLoadingView = () => {
        return (
            <div className="p-4 flex-center">
                <Loading />
            </div>
        );
    };

    renderErrorView = () => {
        const { error } = this.state;
        return (
            <div className="d-progress__error-container">
                <h4>{Messages.error}</h4>
                <h5
                    className="mt-3 d-notifications__content"
                    dangerouslySetInnerHTML={{ __html: error?.message ?? "" }}
                />
                <div className="d-progress__error-footer">
                    <Button onClick={this.dismiss} className="mr-3" variant="trans">
                        {Messages.cancel}
                    </Button>
                    <Button onClick={this.onClickRetry}>{Messages.retry}</Button>
                </div>
            </div>
        );
    };

    render() {
        const { open, error } = this.state;
        return (
            <div className="d-progress__root">
                <Modal
                    visible={open}
                    onCancel={this.dismiss}
                    destroyOnClose
                    className="d-progress__container"
                    closable={false}
                    footer={null}
                    getContainer={false}
                >
                    {!error && this.renderLoadingView()}
                    {error && this.renderErrorView()}
                </Modal>
            </div>
        );
    }
}

export default ProgressComponent;
