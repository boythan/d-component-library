import React from "react";
import Icon from "../elements/icon/Icon";

export interface ViewTextErrorProps {
    error: any;
    className?: string;
}

const ViewTextError = ({ error, className }: ViewTextErrorProps) => {
    if (!error) return <div />;
    return (
        <div className={`flex-center-y mt-1 ${className}`} hidden={!error}>
            <Icon name="error_outline" className="text-error" size="small" />
            <text className="text-x-small text-error ml-1">{error}</text>
        </div>
    );
};

export default ViewTextError;
