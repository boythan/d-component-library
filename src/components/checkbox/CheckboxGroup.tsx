/* eslint-disable no-unused-expressions */
import ClassNames from "classnames";
import React from "react";
import Checkbox from "./Checkbox";

export interface CheckboxGroupProps {
    className?: string;
    classNameItem?: string;

    dataSource: Array<any>;
    label?: any;
    value?: Array<any>;
    defaultValue?: Array<any>;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    multiple?: boolean;

    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    className,
    classNameItem,

    dataSource,
    value = [],
    multiple = true,
    numberOfColumns = "3",
    label,

    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    onChange,
    getDisabledItem,
}) => {
    const containerClass = ClassNames(className);
    const groupContainerClass = ClassNames("d-checkbox-group d-flex flex-wrap", className);

    const onChangeChecked = (item: any, event: any) => {
        if (!multiple) {
            onChange && onChange([getValue(item)]);
            return;
        }

        // multiple check
        const isPush = event.target.checked;
        let clone = [...value];
        if (isPush) {
            clone.push(getValue(item));
        } else {
            clone = value.filter((i: any) => {
                return i !== getValue(item);
            });
        }
        onChange && onChange(clone);
    };

    return (
        <div className={containerClass}>
            <label>{label}</label>
            <div className={groupContainerClass}>
                {dataSource.map((item) => {
                    const iLabel = getLabel(item);
                    const iValue: any = getValue(item);
                    const isChecked = value.includes(iValue);
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                    const itemClass = ClassNames(
                        "my-3 p-0",
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
                            value={getValue(item)}
                            onChange={(event) => onChangeChecked(item, event)}
                            checked={isChecked}
                            disabled={isDisabled}
                            key={iValue}
                            className={itemClass}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default CheckboxGroup;
