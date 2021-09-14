import React from "react";
import Icon from "../icon/Icon";

export interface ViewTextErrorProps {
    classNameText?: string;
    error: any;
}

const ViewTextError = ({ classNameText = "", error }: ViewTextErrorProps) => (
    <div className="flex-center-y mt-1" hidden={!error}>
        <Icon name="error_outline" className="text-error" size="small" />
        <text className={classNameText}>{error}</text>
    </div>
);

export default ViewTextError;
