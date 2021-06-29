/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import ClassNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import Messages from "../../language/Messages";
import Badge from "../badge/Badge";
import Button from "../button/Button";
import CheckboxGroup, { CheckboxGroupProps } from "../checkbox/CheckboxGroup";
import { DropdownProps } from "../dropdown/Dropdown";
import Icon from "../icon/Icon";

export interface IDataItem {
    id?: string;
    label?: string;
    [key: string]: any;
}

export interface SelectCheckboxProps extends CheckboxGroupProps {
    [key: string]: any;
    placeholder?: string;
    label?: string;
    className?: string;
    classNameDropdown?: string;
    position?: DropdownProps["position"];
    showLabel?: boolean;
    iconName?: string;
    showHeader?: boolean;
    selectAllText?: string;
    clearText?: string;
    displayValue?: string;
    error?: any;
    customValueView?: (value?: any) => any;
}

const SelectCheckbox: React.FC<SelectCheckboxProps> = ({
    label,
    className,
    classNameDropdown,
    dataSource,
    numberOfColumns = "2",
    placeholder = "Select",
    position = "left-edge",
    iconName = "expand_more",
    showHeader = false,
    showLabel = false,
    displayValue,
    selectAllText = Messages.selectAll,
    clearText = Messages.clear,
    value,
    error,
    onChange,
    getValue = (item) => item?.id,
    getLabel,
    customValueView,
}) => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLDivElement>(null);

    const containerClass = ClassNames(
        `d-select-checkbox__container d-select-checkbox__container-${position}`,
        {
            "d-select-checkbox__container-active": openDropdown,
            "d-select-checkbox__container-error": error,
        },
        className
    );
    const inputClass = ClassNames("d-select-checkbox__input hover-pointer");
    const dropdownWrapperClass = ClassNames("d-select-checkbox__dropdown", classNameDropdown);
    const errorTextClass = ClassNames("text-x-small", "text-error", "ml-1");

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const isClickOutside = dropdownRef.current && !dropdownRef.current.contains(event?.target as HTMLElement);
            const isClickInput = inputRef.current && inputRef.current.contains(event.target as HTMLElement);
            if (isClickOutside && !isClickInput) {
                setOpenDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
    }, [dropdownRef, setOpenDropdown]);

    const inputValue = () => {
        if (!(value && value?.length > 0)) {
            return <div className="w-100">{placeholder}</div>;
        }
        if (customValueView) {
            return customValueView();
        }
        let name = label;
        if (displayValue) {
            name = displayValue;
        }
        return (
            <div className="flex-center-y w-100">
                <div className="">{name}</div>
                <Badge variant="index" index={value?.length} size="x-large" className="ml-2" />
            </div>
        );
    };

    const checkboxHeader = () => {
        return (
            <div className="flex-center-y justify-content-between border-bottom p-3 w-100">
                <label className="font-weight-bold">{label}</label>
                <div className="flex-center-y">
                    <Button
                        content={selectAllText}
                        size="x-small"
                        variant="trans"
                        onClick={() => {
                            let clone: any = [];
                            if (dataSource?.length > 0) {
                                clone = dataSource.map((i) => {
                                    return getValue(i);
                                });
                            }
                            return onChange && onChange(clone);
                        }}
                        color="blue"
                        className="mr-2"
                    />
                    <Button
                        content={clearText}
                        size="x-small"
                        variant="trans"
                        onClick={() => onChange && onChange([])}
                        color="red"
                    />
                </div>
            </div>
        );
    };

    return (
        <div className={containerClass}>
            {showLabel && label && <label>{label}</label>}
            <div
                className={inputClass}
                style={{ height: "40px" }}
                onClick={() => setOpenDropdown(!openDropdown)}
                ref={inputRef}
            >
                <div className="flex-center-y text-x-small w-100">
                    {inputValue()}
                    <Icon name={iconName} className="d-select-checkbox__arrow-icon ml-2" />
                </div>
            </div>
            {error && (
                <div className="flex-center-y mt-1">
                    <Icon name="error_outline" className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
            <div className={dropdownWrapperClass} ref={dropdownRef}>
                {showHeader && checkboxHeader()}
                <CheckboxGroup
                    dataSource={dataSource}
                    numberOfColumns={numberOfColumns}
                    onChange={onChange}
                    value={value}
                    getLabel={getLabel}
                    getValue={getValue}
                />
            </div>
        </div>
    );
};

export default SelectCheckbox;
