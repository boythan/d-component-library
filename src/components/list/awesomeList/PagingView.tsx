import React from "react";
import Loading from "../../elements/loading/Loading";
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
            <div className="flex justify-center items-center w-full p-8" onClick={onClickRetry}>
                <div className="h5">Error..... Click to retry!</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center w-full p-8">
            <Loading size="small" />
        </div>
    );
};
export default PagingView;
