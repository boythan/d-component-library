/* eslint-disable no-unused-expressions */
import classNames from "classnames";
import React from "react";
import Checkbox from "./Checkbox";

export interface RadioGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameItem?: string;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisabledItem?: (checkItem: any) => void;
    value?: any;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    dataSource,
    className,
    classNameItem,
    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    getDisabledItem,
    value,
    onChange,
    numberOfColumns = "3",
    label,
    disabled,
}) => {
    const containerClass = classNames(className);
    const groupContainerClass = classNames("d-flex flex-wrap", className);
    return (
        <div className={containerClass}>
            <label>{label}</label>
            <div className={groupContainerClass}>
                {dataSource.map((item) => {
                    const iLabel = getLabel(item);
                    const isChecked = getValue(item) === value;
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                    const itemClass = classNames(
                        "my-3",
                        {
                            "col-12": numberOfColumns === "1",
                        },
                        {
                            "col-6": numberOfColumns === "2",
                        },
                        {
                            "col-4": numberOfColumns === "3",
                        },
                        {
                            "col-3": numberOfColumns === "4",
                        },
                        {
                            col: numberOfColumns === "5",
                        },
                        {
                            "col-2": numberOfColumns === "6",
                        },
                        classNameItem
                    );
                    return (
                        <Checkbox
                            label={iLabel}
                            value={value}
                            onChange={(event) => {
                                onChange && onChange(getValue(item));
                            }}
                            checked={isChecked}
                            variant="radio"
                            disabled={isDisabled || disabled}
                            className={itemClass}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RadioGroup;
