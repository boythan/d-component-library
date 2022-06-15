/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import classNames from "classnames";
import React, { CSSProperties } from "react";
import ViewTextError from "../view/ViewTextError";
import Checkbox from "./Checkbox";

export interface RadioGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameContent?: string;
    classNameItem?: string;
    style?: CSSProperties;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisabledItem?: (checkItem: any) => void;
    value?: any;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    error?: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
    dataSource,
    className,
    classNameContent,
    classNameItem,
    style,
    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    getDisabledItem,
    value,
    defaultValue,
    onChange,
    numberOfColumns = "3",
    label,
    disabled,
    hidden,
    required,
    error,
}) => {
    const containerClass = classNames(className);
    const groupContainerClass = classNames("d-flex flex-wrap", classNameContent);
    const labelClass = classNames("text-label", { "text-label-required": required });
    return (
        <div className={containerClass} style={style} hidden={hidden}>
            {label && <label className={labelClass}>{label}</label>}
            <div className={groupContainerClass}>
                {dataSource.map((item) => {
                    const iLabel = getLabel(item);
                    const isChecked = getValue(item) === value;
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                    const itemClass = classNames(
                        "my-3",
                        {
                            "col-12": numberOfColumns == "1",
                        },
                        {
                            "col-6": numberOfColumns == "2",
                        },
                        {
                            "col-4": numberOfColumns == "3",
                        },
                        {
                            "col-3": numberOfColumns == "4",
                        },
                        {
                            col: numberOfColumns == "5",
                        },
                        {
                            "col-2": numberOfColumns == "6",
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
            <ViewTextError error={error} />
        </div>
    );
};

export default RadioGroup;
