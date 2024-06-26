/* eslint-disable eqeqeq */
/* eslint-disable no-unused-expressions */
import ClassNames from "classnames";
import _ from "lodash";
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
    const dataSourceBrief = _.slice(dataSource, 0, numberOfDefaultShow);
    const dataSourceDisplay = expended ? dataSource : dataSourceBrief;

    const showExpandButtons = dataSource.length > numberOfDefaultShow;

    const containerClass = ClassNames(className);
    const groupContainerClass = ClassNames("d-checkbox-group d-flex flex-wrap", className);

    const onChangeChecked = (item: any, event: any) => {
        if (!multiple) {
            onChange && onChange([getValue(item)]);
            return;
        }

        // multiple check
        const isPush = event.target.checked;
        let clone = value ? [...(value || [])] : [...(defaultValue || [])];
        if (isPush) {
            clone.push(getValue(item));
        } else {
            clone = (value || defaultValue || []).filter((i: any) => {
                return i !== getValue(item);
            });
        }
        onChange && onChange(clone);
    };

    const renderExpandedButtons = () => {
        if (!showExpandButtons) return <div />;
        if (expended) {
            return (
                <Button variant="trans" size="x-small" className="p-0 mr-4" onClick={() => setExpended(false)}>
                    <div className="flex-center-y text-x-small text-underline mr-2">{Messages.closeAll}</div>
                    <Icon name="expand_less" size="x-small" />
                </Button>
            );
        }
        return (
            <Button variant="trans" size="x-small" className="p-0 mr-4" onClick={() => setExpended(true)}>
                <div className="flex-center-y text-x-small text-underline mr-2">{Messages.showAll}</div>
                <Icon name="expand_more" size="x-small" />
            </Button>
        );
    };

    const renderSelectAll = () => {
        return (
            <div className="d-flex">
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
            <div className="d-flex justify-content-between align-items-center">
                {label && <label>{label}</label>}
                {showSelectAll && renderSelectAll()}
            </div>
            <div className={groupContainerClass}>
                {dataSourceDisplay.map((item) => {
                    const iLabel = getLabel(item);
                    const iValue: any = getValue(item);
                    const isChecked = value ? _.includes(value, iValue) : _.includes(defaultValue, iValue);
                    const isDisabled = ((getDisabledItem && getDisabledItem(item)) as any) || false;
                    const itemClass = ClassNames(
                        "my-3 p-0",
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
                            value={getValue(item)}
                            onChange={(event) => onChangeChecked(item, event)}
                            checked={isChecked}
                            disabled={isDisabled || disabled}
                            key={iValue}
                            className={itemClass}
                        />
                    );
                })}
            </div>
            {renderExpandedButtons()}
        </div>
    );
};

export default CheckboxGroup;
