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

    // Map column count to Tailwind grid classes
    const gridColsClass =
        {
            "1": "grid-cols-1",
            "2": "grid-cols-2",
            "3": "grid-cols-3",
            "4": "grid-cols-4",
            "5": "grid-cols-5",
            "6": "grid-cols-6",
        }[numberOfColumns] || "grid-cols-3";

    const groupContainerClass = classNames("grid gap-4", gridColsClass, classNameContent);
    const labelClass = classNames("text-sm font-semibold mb-2 block", { "text-red-500": required }); // "text-label"

    return (
        <div className={containerClass} style={style} hidden={hidden}>
            {label && <label className={labelClass}>{label}</label>}
            <div className={groupContainerClass}>
                {dataSource.map((item) => {
                    const iLabel = getLabel(item);
                    const iValue = getValue(item);
                    const isChecked = iValue === value;
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;

                    return (
                        <Checkbox
                            key={iValue}
                            label={iLabel}
                            value={value} // The group value? No, Checkbox variant radio expects its own value?
                            // Ant Radio Group manages value, but we are using individual Radios manually controlled?
                            // Yes, existing logic: onChange={() => onChange(getValue(item))}
                            // implies customized control.
                            // If we use Ant Radio, we might need to verify props.
                            // Our Checkbox refactor accepts `checked`.

                            onChange={() => {
                                onChange && onChange(iValue);
                            }}
                            checked={isChecked}
                            variant="radio"
                            disabled={isDisabled || disabled}
                            className={classNameItem}
                        />
                    );
                })}
            </div>
            <ViewTextError error={error} />
        </div>
    );
};

export default RadioGroup;
