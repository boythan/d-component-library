/* eslint-disable no-unused-expressions */
import ClassNames from "classnames";
import React from "react";
import Checkbox from "./Checkbox";

export interface CheckboxGroupProps {
    dataSource: Array<any>;
    label?: any;
    className?: string;
    classNameItem?: string;
    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    value?: Array<any>;
    defaultValue?: Array<any>;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    dataSource,
    className,
    classNameItem,
    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    value = [],
    onChange,
    getDisabledItem,
    numberOfColumns = "3",
    label,
}) => {
    const containerClass = ClassNames(className);
    const groupContainerClass = ClassNames("d-checkbox-group d-flex flex-wrap", className);

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
                            onChange={(event) => {
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
                            }}
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
