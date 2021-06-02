/* eslint-disable no-unused-expressions */
import React, { useEffect, useMemo, useState } from "react";
import ClassNames from "classnames";
import Checkbox from "./Checkbox";

export interface CheckboxGroupProps {
    dataSource: Array<any>;
    className?: string;
    classNameItem?: string;
    getLabel?: React.FC;
    getValue?: React.FC;
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
}) => {
    const containerClass = ClassNames("d-checkbox-group d-flex flex-wrap", className);

    return (
        <div className={containerClass}>
            {dataSource.map((item) => {
                const iLabel = getLabel(item);
                const iValue: any = getValue(item);
                const listId = value.map((i) => getValue(i));
                const isChecked = listId.includes(iValue);
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
                        value={item}
                        onChange={(event) => {
                            const isPush = event.target.checked;
                            let clone = [...value];
                            if (isPush) {
                                clone.push(item);
                            } else {
                                clone = value.filter((i: any) => {
                                    return getValue(i) !== getValue(item);
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
    );
};

export default CheckboxGroup;
