/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Select as SelectAnt } from "antd";
import { SelectProps as SelectAntProps } from "antd/es/select";
import ClassName from "classnames";
import React, { useImperativeHandle, useMemo, useRef } from "react";
import Icon from "../icon/Icon";
import ViewTextError from "../view/ViewTextError";

export interface SelectProps extends SelectAntProps<any> {
    classNameSelect?: string;
    label?: string;
    dataSource?: Array<any>;
    error?: any;
    variant?: "outline" | "standard";
    name?: string;

    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;

    hasFilter?: boolean;
    multiple?: boolean;
    required?: boolean;
}
export interface SelectMethod {
    onBlur: () => void;
    onFocus: () => void;
}

const { Option } = SelectAnt;
const Select: React.ForwardRefRenderFunction<SelectMethod, SelectProps> = (
    {
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
        required,
        ...props
    }: SelectProps,
    ref
) => {
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
    const selectRef = useRef<React.ElementRef<typeof SelectAnt>>(null);

    useImperativeHandle(ref, () => ({
        onBlur: () => selectRef.current && selectRef.current.blur(),
        onFocus: () => selectRef.current && selectRef.current.focus(),
    }));

    const container = ClassName("d-select__container", `d-select__container-${variant}`, className);
    const labelClass = ClassName("text-label", { "text-label-required": required });

    const selectClass = ClassName(
        "d-select__select",
        `d-select__select-${variant}`,
        {
            "d-select__select-disabled": disabled,
            "d-select__error": !!error,
        },
        classNameSelect
    );

    return (
        <div className={container}>
            {label && <label className={labelClass}>{label}</label>}
            <SelectAnt
                mode={multiple ? "multiple" : undefined}
                filterOption={(input: any, option: any) => {
                    const { children, value } = option.props;
                    if (!hasFilter) {
                        return true;
                    }
                    return (
                        (children && children.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
                        (value && `${value}`.toLowerCase().indexOf(input.toLowerCase()) >= 0)
                    );
                }}
                {...props}
                ref={selectRef}
                value={value}
                allowClear={allowClear}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={onChange}
                className={selectClass}
                showArrow
                suffixIcon={<Icon name="expand_more" />}
                disabled={disabled}
                optionFilterProp="children"
            >
                {children}
            </SelectAnt>
            <ViewTextError error={error} />
        </div>
    );
};

export default React.forwardRef(Select);
