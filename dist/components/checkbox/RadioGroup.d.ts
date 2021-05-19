import React from "react";
export interface RadioGroupProps {
    dataSource: Array<any>;
    className?: string;
    getLabel?: React.FC;
    getValue?: React.FC;
    getDisabledItem?: (checkItem: any) => void;
    value?: Array<any>;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
}
declare const RadioGroup: React.FC<RadioGroupProps>;
export default RadioGroup;
