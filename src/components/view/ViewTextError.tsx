import React from "react";
import Icon from "../elements/icon/Icon";
import classNames from "classnames";

export interface ViewTextErrorProps {
    error: any;
    className?: string;
}

const ViewTextError = ({ error, className }: ViewTextErrorProps) => {
    if (!error) return <div />;
    return (
        <div className={classNames("flex items-center mt-1", className)} hidden={!error}>
            <Icon name="error_outline" className="text-red-500" size="small" />
            <span className="text-xs text-red-500 ml-1">{error}</span>
        </div>
    );
};

export default ViewTextError;
