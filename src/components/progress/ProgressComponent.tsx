/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-prop-types */
import { Modal } from "antd";
import classNames from "classnames";
import isArray from "lodash/isArray";
import React, { forwardRef, useImperativeHandle, useState, ReactNode } from "react";
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
    loadingView?: ReactNode;
}

export interface ProgressComponentRef {
    show: (
        promiseFunction: ProgressComponentProps["promiseFunction"],
        onSuccess?: ProgressComponentProps["onSuccess"],
        handleError?: (error: any) => boolean
    ) => void;
}

const ProgressComponent = forwardRef<ProgressComponentRef, ProgressComponentProps>(
    (
        {
            transformError = (error: any) => (typeof error === "string" ? error : error?.response?.data?.message),
            loadingView = (
                <div className="p-4 flex justify-center items-center">
                    <Loading size="large" />
                </div>
            ),
        },
        ref
    ) => {
        const [open, setOpen] = useState(false);
        const [error, setError] = useState<string | boolean>(false);
        // We use a ref to store the current operation configuration to avoid stale closures in async operations
        // and to prevent unnecessary re-renders if we were to store complex objects in state just for logic execution.
        const currentOperation = React.useRef<{
            promiseFunction?: ProgressComponentProps["promiseFunction"];
            onSuccess?: ProgressComponentProps["onSuccess"];
            handleError?: (error: any) => boolean;
        }>({});

        const dismiss = () => {
            setOpen(false);
        };

        const setErrorState = (err: any) => {
            const { handleError } = currentOperation.current;

            if (handleError && handleError(err)) {
                dismiss();
                return;
            }

            const errorMessage = transformError ? transformError(err) : err;
            setError(errorMessage);
        };

        const generatePromiseFunction = (promiseFunc: IProgressFunctionProps) => {
            let taskItem;
            if (!isArray(promiseFunc.params)) taskItem = promiseFunc.method(promiseFunc.params);
            else taskItem = promiseFunc.method(...promiseFunc.params);
            return taskItem;
        };

        const loadData = () => {
            const { promiseFunction, onSuccess } = currentOperation.current;
            let promiseAll;
            const isArrayFunction = isArray(promiseFunction);

            try {
                if (isArrayFunction) {
                    promiseAll = (promiseFunction as IProgressFunctionProps[]).map((pro: any) =>
                        generatePromiseFunction(pro)
                    );
                } else if (promiseFunction) {
                    promiseAll = [generatePromiseFunction(promiseFunction as IProgressFunctionProps)];
                } else {
                    // Should require promiseFunction
                    setErrorState("No promise function provided");
                    return;
                }

                const task = Promise.all(promiseAll);
                task.then((result: any) => {
                    if (result) {
                        dismiss();
                        onSuccess && onSuccess(isArrayFunction ? result : result?.[0]);
                    } else {
                        setErrorState({
                            message: Messages.error,
                        });
                    }
                }).catch((err) => {
                    setErrorState(err);
                });
            } catch (err) {
                setErrorState(err);
            }
        };

        useImperativeHandle(ref, () => ({
            show: (promiseFunc, onSucc, onErr) => {
                currentOperation.current = {
                    promiseFunction: promiseFunc,
                    onSuccess: onSucc,
                    handleError: onErr,
                };
                setOpen(true);
                setError(false);
                // Execute loadData immediately after setting state.
                // In generic React, we might wait for effect, but here we just trigger it.
                // However, we want 'open' to ideally be true.
                // To match class behavior (callback after setState), we can just call it here or in useEffect.
                // Calling it here works because currentOperation ref is updated.
                // Note: The original setState callback usage implies we wait for render,
                // but since logic depends on ref/props not DOM, we can run it.
                // Actually, if we want to ensure Loading view is visible first, a useEffect on 'open' might be better,
                // but simpler to just call it.
                setTimeout(loadData, 0); // Push to next tick to allow 'open' state to render loading view first
            },
        }));

        const onClickRetry = () => {
            setError(false);
            setTimeout(loadData, 0);
        };

        const renderErrorView = () => {
            return (
                <div className="p-6 text-center bg-white rounded-lg">
                    <h4 className="text-lg font-semibold text-gray-900">{Messages.error}</h4>
                    <h5
                        className="mt-3 text-sm text-gray-600 break-words"
                        dangerouslySetInnerHTML={{ __html: (error as string) ?? "" }}
                    />
                    <div className="mt-6 flex justify-center">
                        <Button onClick={dismiss} className="mr-3" variant="trans">
                            {Messages.cancel}
                        </Button>
                        <Button onClick={onClickRetry}>{Messages.retry}</Button>
                    </div>
                </div>
            );
        };

        const classNameModal = classNames(
            "[&_.ant-modal-container]:!rounded-lg [&_.ant-modal-container]:!overflow-hidden",
            {
                "[&_.ant-modal-container]:!bg-transparent [&_.ant-modal-container]:!shadow-none": !error,
            }
        );

        return (
            <div className="relative z-50">
                <Modal
                    open={open}
                    onCancel={dismiss}
                    destroyOnHidden
                    className={classNameModal}
                    closable={false}
                    footer={null}
                    getContainer={false}
                    centered
                    styles={{
                        mask: {
                            backgroundColor: "rgba(0, 0, 0, 0.45)",
                        },
                    }}
                >
                    {!error && (loadingView as any)}
                    {!!error && renderErrorView()}
                </Modal>
            </div>
        );
    }
);

export default ProgressComponent;
