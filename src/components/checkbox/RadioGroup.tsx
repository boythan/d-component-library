/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import ClassNames from "classnames";
import Checkbox from "./Checkbox";

export interface RadioGroupProps {
    dataSource: Array<any>;
    className?: string;
    classNameItem?: string;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisabledItem?: (checkItem: any) => void;
    value?: any;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
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
}) => {
    const containerClass = ClassNames("d-checkbox-group d-flex flex-wrap", className);
    return (
        <div className={containerClass}>
            {dataSource.map((item) => {
                const iLabel = getLabel(item);
                const iValue: any = getValue(item);
                const isChecked = getValue(item) === getValue(value);
                const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                const itemClass = ClassNames(
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
                        value={iValue}
                        onChange={(event) => {
                            onChange && onChange(item);
                        }}
                        checked={isChecked}
                        variant="radio"
                        disabled={isDisabled}
                        className={itemClass}
                    />
                );
            })}
        </div>
    );
};

export default RadioGroup;
