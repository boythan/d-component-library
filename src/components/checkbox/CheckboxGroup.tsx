/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import ClassNames from "classnames";
import Checkbox from "./Checkbox";

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

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    dataSource,
    className,
    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    value = [],
    onChange,
    getDisabledItem,
}) => {
    const containerClass = ClassNames("d-checkbox-group", className);

    const [listValues, setListValues] = useState<any>([]);

    useEffect(() => {
        setListValues(value);
    }, [value]);

    return (
        <div className={containerClass}>
            {dataSource.map((item) => {
                const iLabel = getLabel(item);
                const iValue: any = getValue(item);
                const isChecked = listValues.includes(iValue);
                const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                return (
                    <Checkbox
                        label={iLabel}
                        value={iValue}
                        onChange={(event) => {
                            const isPush = event.target.checked;
                            const changeValue = event.target.value;
                            let clone = [...listValues];
                            if (isPush) {
                                clone.push(iValue);
                            } else {
                                clone = listValues.filter((i: any) => i !== changeValue);
                            }
                            setListValues(clone);
                            onChange && onChange(clone);
                        }}
                        checked={isChecked}
                        disabled={isDisabled}
                    />
                );
            })}
        </div>
    );
};

export default CheckboxGroup;
