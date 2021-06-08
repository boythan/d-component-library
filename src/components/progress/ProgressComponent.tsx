/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";
import Loading from "../loading/Loading";
import Messages from "../../language/Messages";

export interface IProgressFunctionProps {
    method: (props?: any) => Promise<any>;
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
    onSuccess?: (res?: Array<IResponseAPI>) => any;
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
        return <Loading />;
    };

    renderErrorView = () => {
        const { error } = this.state;
        return (
            <div className="progress__error-container">
                <h4>{Messages.error}</h4>
                <h5 className="mt-3">{error.message}</h5>
                <div className="progress__error-footer">
                    <button onClick={this.dismiss} className="btn btn-light mr-3" type="button">
                        {Messages.cancel}
                    </button>
                    <button className="btn btn-primary" onClick={this.onClickRetry} type="button">
                        {Messages.retry}
                    </button>
                </div>
            </div>
        );
    };

    render() {
        const { open, error } = this.state;
        return (
            <Modal
                visible={open}
                onCancel={this.dismiss}
                destroyOnClose
                className="progress__container"
                closable={false}
                footer={null}
                // centered
            >
                {!error && this.renderLoadingView()}
                {error && this.renderErrorView()}
            </Modal>
        );
    }
}

export default ProgressComponent;