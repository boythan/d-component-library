/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import _ from "lodash";
import { Modal } from "antd";
import Loading from "../loading/Loading";

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
    promiseFunction?: Array<IProgressFunctionProps>;
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

    loadData = () => {
        const { promiseFunction, onSuccess } = this.state;
        const { Messages } = this.props;
        const promiseAll = promiseFunction.map((pro: any) => {
            let taskItem;
            if (!_.isArray(pro.params)) taskItem = pro.method(pro.params);
            else taskItem = pro.method(...pro.params);

            return taskItem;
        });
        const task = Promise.all(promiseAll);
        task.then((result: any) => {
            if (result) {
                if (result.request && result.data && result.data.responseData && result.data.responseData.error) {
                    this.setError(result.data.responseData.error);
                    return;
                }

                const resStatus = result?.data?.status;

                if (resStatus === 400) {
                    this.setError({ message: result?.data?.message });
                    return;
                }
                // Success
                this.dismiss();
                onSuccess && onSuccess(result);
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
        const { Messages } = this.props;
        return (
            <div className="progress__error-container">
                <h4>{Messages ? Messages.error : "Error"}</h4>
                <h5 className="mt-3">{error.message}</h5>
                <div className="progress__error-footer">
                    <button onClick={this.dismiss} className="btn btn-light mr-3" type="button">
                        {Messages ? Messages.cancel : "Cancel"}
                    </button>
                    <button className="btn btn-primary" onClick={this.onClickRetry} type="button">
                        {Messages ? Messages.retry : "Retry"}
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
