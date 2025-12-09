/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import classNames from "classnames";
import includes from "lodash/includes";
import slice from "lodash/slice";
import React, { useState } from "react";
import Messages from "../../language/Messages";
import Button from "../button/Button";
import Icon from "../elements/icon/Icon";
import Checkbox from "./Checkbox";

export interface CheckboxGroupProps {
    className?: string;
    classNameItem?: string;
    selectAllText?: string;
    deSelectAllText?: string;

    dataSource: Array<any>;
    label?: any;
    value?: Array<any>;
    defaultValue?: Array<any>;
    numberOfColumns?: "1" | "2" | "3" | "4" | "5" | "6";
    numberOfDefaultShow?: number;
    multiple?: boolean;
    disabled?: boolean;
    hidden?: boolean;
    showSelectAll?: boolean;

    getLabel?: (item: any) => any;
    getValue?: (item: any) => any;
    onChange?: (values: Array<any>) => void;
    getDisabledItem?: (checkItem: any) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
    className,
    classNameItem,

    dataSource = [],
    value,
    defaultValue,
    multiple = true,
    numberOfColumns = "3",
    numberOfDefaultShow = 10,
    label,
    disabled,
    hidden,
    showSelectAll = false,
    selectAllText = Messages.selectAll,
    deSelectAllText = Messages.deSelectAll,

    getLabel = (item: any) => item?.label,
    getValue = (item: any) => item?.id,
    onChange,
    getDisabledItem,
}) => {
    const [expended, setExpended] = useState<boolean>(false);
    const dataSourceBrief = slice(dataSource, 0, numberOfDefaultShow);
    const dataSourceDisplay = expended ? dataSource : dataSourceBrief;

    const showExpandButtons = dataSource.length > numberOfDefaultShow;

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

    const groupContainerClass = classNames("grid gap-4", gridColsClass, className);

    const onChangeChecked = (item: any, event: any) => {
        if (!multiple) {
            // Should behave like radio? Or just select one?
            // If multiple is false, often behaves like radio or max 1 selection.
            // Original logic: onChange([id]) - effectively radio behavior but array value.
            onChange && onChange([getValue(item)]);
            return;
        }

        // multiple check
        // event.target.checked comes from Ant Checkbox onChange
        const isPush = event.target.checked;
        let clone = value ? [...(value || [])] : [...(defaultValue || [])];
        const itemValue = getValue(item);

        if (isPush) {
            clone.push(itemValue);
        } else {
            // using filter
            clone = (value || defaultValue || []).filter((i: any) => {
                return i !== itemValue;
            });
        }
        onChange && onChange(clone);
    };

    const renderExpandedButtons = () => {
        if (!showExpandButtons) return <div />;
        if (expended) {
            return (
                <Button variant="trans" size="x-small" className="p-0 mr-4 mt-2" onClick={() => setExpended(false)}>
                    <div className="flex items-center text-xs underline mr-2">{Messages.closeAll}</div>
                    <Icon name="expand_less" size="x-small" />
                </Button>
            );
        }
        return (
            <Button variant="trans" size="x-small" className="p-0 mr-4 mt-2" onClick={() => setExpended(true)}>
                <div className="flex items-center text-xs underline mr-2">{Messages.showAll}</div>
                <Icon name="expand_more" size="x-small" />
            </Button>
        );
    };

    const renderSelectAll = () => {
        return (
            <div className="flex">
                <Button
                    onClick={() => onChange && onChange(dataSource?.map((item) => getValue(item)))}
                    variant="trans"
                    size="x-small"
                    className="my-2"
                >
                    {selectAllText}
                </Button>
                <Button onClick={() => onChange && onChange([])} variant="trans" size="x-small" className="my-2">
                    {deSelectAllText}
                </Button>
            </div>
        );
    };

    return (
        <div className={containerClass} hidden={hidden}>
            <div className="flex justify-between items-center mb-2">
                {label && <label className="text-sm font-semibold mb-2 block">{label}</label>}
                {showSelectAll && renderSelectAll()}
            </div>
            <div className={groupContainerClass}>
                {dataSourceDisplay.map((item) => {
                    const iLabel = getLabel(item);
                    const iValue: any = getValue(item);
                    const isChecked = value ? includes(value, iValue) : includes(defaultValue, iValue);
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;

                    return (
                        <Checkbox
                            label={iLabel}
                            value={iValue}
                            // Ant Checkbox onChange passes EventTarget with checked property
                            onChange={(event) => onChangeChecked(item, event)}
                            checked={isChecked}
                            disabled={isDisabled || disabled}
                            key={iValue}
                            className={classNameItem}
                        />
                    );
                })}
            </div>
            {renderExpandedButtons()}
        </div>
    );
};

export default CheckboxGroup;
