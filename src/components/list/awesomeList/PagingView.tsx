/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import Loading from "../../loading/Loading";
import AwesomeListMode from "../shared/Mode";

export interface PagingViewProps {
    mode?: any;
    onClickRetry?: any;
}

const PagingView: React.FC<PagingViewProps> = ({ mode, onClickRetry }) => {
    if (mode === AwesomeListMode.HIDDEN) {
        return <div />;
    }

    if (mode === AwesomeListMode.ERROR) {
        return (
            <div className="d-page-view__container" onClick={onClickRetry}>
                <div className="h5">Error..... Click to retry!</div>
            </div>
        );
    }

    return (
        <div className="d-page-view__container">
            <Loading size="small" />
        </div>
    );
};
export default PagingView;
