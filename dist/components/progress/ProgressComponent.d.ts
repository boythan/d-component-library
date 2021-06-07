import { Component } from "react";
export interface IProgressFunctionProps {
    method: Promise<any>;
    params: any;
}
export interface IResponseAPI {
    [key: string]: any;
    data?: {
        data?: any;
        pagination?: any;
        [key: string]: any;
    };
    error?: any;
    message?: any;
    status?: any;
}
export interface ProgressComponentProps {
    Messages?: any;
    onSuccess?: (res: IResponseAPI) => any;
    promiseFunction?: Array<IProgressFunctionProps>;
}
export interface ProgressComponentState {
}
declare class ProgressComponent extends Component<ProgressComponentProps, any> {
    unmounted: any;
    constructor(props: any);
    show: (promiseFunction: ProgressComponentProps["promiseFunction"], onSuccess: ProgressComponentProps["onSuccess"], handleError: any) => void;
    loadData: () => void;
    setError: (error: any) => void;
    dismiss: () => void;
    onClickRetry: () => void;
    renderLoadingView: () => JSX.Element;
    renderErrorView: () => JSX.Element;
    render(): JSX.Element;
}
export default ProgressComponent;
