/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
import { Modal } from "antd";
import classNames from "classnames";
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
    onSuccess?: (res?: Array<IResponseAPI> | IResponseAPI) => any;
    transformError?: (error: any) => string | string[] | any;
    promiseFunction?: Array<IProgressFunctionProps> | IProgressFunctionProps;
    loadingView?: any;
}

export interface ProgressComponentState {}

class ProgressComponent extends Component<ProgressComponentProps, any> {
    unmounted: any;

    // eslint-disable-next-line react/static-property-placement
    static defaultProps = {
        loadingView: (
            <div className="p-4 flex-center">
                <Loading size="large" />
            </div>
        ),
        transformError: (error: any) => (typeof error === "string" ? error : error?.response?.data?.message),
    };

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
                    message: Messages.error,
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
        const { transformError } = this.props;

        if (handleError && handleError(error)) {
            this.dismiss();
            return;
        }

        const errorMessage = (transformError as any)(error);
        this.setState({ error: errorMessage });
    };

    dismiss = () => {
        this.setState({ open: false });
    };

    onClickRetry = () => {
        this.setState({ error: false }, () => this.loadData());
    };

    renderErrorView = () => {
        const { error } = this.state;
        return (
            <div className="d-progress__error-container">
                <h4>{Messages.error}</h4>
                <h5 className="mt-3 d-notifications__content" dangerouslySetInnerHTML={{ __html: error ?? "" }} />
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
        const classNameModal = classNames("d-progress__container", { "d-progress__loading-container": !error });
        return (
            <div className="d-progress__root">
                <Modal
                    visible={open}
                    onCancel={this.dismiss}
                    destroyOnClose
                    className={classNameModal}
                    closable={false}
                    footer={null}
                    getContainer={false}
                >
                    {!error && (this.props.loadingView as any)}
                    {error && this.renderErrorView()}
                </Modal>
            </div>
        );
    }
}

export default ProgressComponent;
