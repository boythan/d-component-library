declare const _default: {
    currentDialog: {
        showConfirm: (title: any, messages: any, handleOnOK: any) => void;
        showWarning: (title: any, messages: any, handleOnOK: any) => void;
        showInfo: (title: any, messages: any, handleOnOK: any) => void;
        showError: (title: any, messages: any, handleOnOK: any) => void;
    };
    initialDialog(refDialog: any): void;
    showConfirm(title?: any, message?: any, handleOnOk?: any): void;
    showWarning(title?: any, message?: any, handleOnOk?: any): void;
    showInfo(title?: any, message?: any, handleOnOk?: any): void;
    showError(title?: any, message?: any, handleOnOk?: any): void;
};
export default _default;
