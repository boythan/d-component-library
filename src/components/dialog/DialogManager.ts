export default {
    currentDialog: {
        showConfirm: (title: any, messages: any, handleOnOK: any) => {},
        showWarning: (title: any, messages: any, handleOnOK: any) => {},
        showInfo: (title: any, messages: any, handleOnOK: any) => {},
        showError: (title: any, messages: any, handleOnOK: any) => {},
    },

    initialDialog(refDialog: any) {
        this.currentDialog = refDialog;
    },

    showConfirm(title?: any, message?: any, handleOnOk?: any) {
        this.currentDialog.showConfirm(title, message, handleOnOk);
    },
    showWarning(title?: any, message?: any, handleOnOk?: any) {
        this.currentDialog.showWarning(title, message, handleOnOk);
    },
    showInfo(title?: any, message?: any, handleOnOk?: any) {
        this.currentDialog.showInfo(title, message, handleOnOk);
    },
    showError(title?: any, message?: any, handleOnOk?: any) {
        this.currentDialog.showError(title, message, handleOnOk);
    },
};
