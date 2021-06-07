/* eslint-disable operator-linebreak */
import { ProgressComponentProps } from "./ProgressComponent";

/* eslint-disable no-unused-expressions */
export default {
    currentProgress: null as any,

    initialProgress(refProgress: any) {
        this.currentProgress = refProgress;
    },

    show(
        promiseFunction: ProgressComponentProps["promiseFunction"],
        onSuccess: ProgressComponentProps["onSuccess"],
        onError?: any,
        handleError?: any
    ) {
        this.currentProgress &&
            this.currentProgress.show &&
            this.currentProgress.show(promiseFunction, onSuccess, onError, handleError);
    },
};
