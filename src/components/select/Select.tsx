/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Select as SelectAnt } from "antd";
import { SelectProps as SelectAntProps } from "antd/es/select";
import classname from "classnames";
import React, { useMemo } from "react";
import Icon from "../icon/Icon";

export interface SelectProps extends SelectAntProps<any> {
    [key: string]: any;
    label?: string;
    dataSource: Array<any>;
    error?: any;
    variant?: "outline" | "standard";

    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;

    hasFilter?: boolean;
    multiple?: boolean;
}
const { Option } = SelectAnt;
const Select = ({
    className,
    classNameSelect,

    value = [],
    label,
    defaultValue = [],
    placeholder = "Please select",
    onChange,
    disabled,
    dataSource = [],
    error,
    multiple = false,

    getLabel = (item: any) => item.label,
    getKey = (item: any) => item.id,
    getValue = (item: any) => item?.id ?? null,

    allowClear = true,
    variant = "outline",
    hasFilter = true,
    ...props
}: SelectProps) => {
    const children = useMemo(
        () =>
            dataSource.map((dataItem: any) => {
                const label = getLabel(dataItem);
                const key = getKey(dataItem);
                return (
                    <Option key={key} value={getValue(dataItem)}>
                        {label}
                    </Option>
                );
            }),
        [dataSource]
    );

    const container = classname("d-select__container", `d-select__container-${variant}`, className);
    const labelClass = classname("text-label");

    const selectClass = classname(
        "d-select__select",
        `d-select__select-${variant}`,
        {
            "d-select__select-disabled": disabled,
            "d-select__error": !!error,
        },
        classNameSelect
    );

    const errorTextClass = classname("text-x-small", "text-error", "ml-1");
    return (
        <div className={container}>
            {label && <label className={labelClass}>{label}</label>}
            <SelectAnt
                {...props}
                value={value}
                mode={multiple ? "multiple" : undefined}
                allowClear={allowClear}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                className={selectClass}
                showArrow
                suffixIcon={<Icon name="expand_more" />}
                disabled={disabled}
                optionFilterProp="children"
                filterOption={(input: any, option: any) => {
                    if (!hasFilter) {
                        return false;
                    }
                    return (
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                        (option.props.value && `${option.props.value}`.toLowerCase().indexOf(input.toLowerCase()) >= 0)
                    );
                }}
            >
                {children}
            </SelectAnt>
            {error && (
                <div className="flex-center-y mt-1">
                    <Icon name="error_outline" className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
        </div>
    );
};

export default Select;
