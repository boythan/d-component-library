import React from "react";
export interface CheckboxGroupProps {
    dataSource: Array<any>;
    className?: string;
    getLabel?: React.FC;
    getValue?: React.FC;
    value?: Array<any>;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
}
declare const CheckboxGroup: React.FC<CheckboxGroupProps>;
export default CheckboxGroup;
