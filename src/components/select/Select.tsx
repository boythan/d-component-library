/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
import { Select as SelectAnt } from "antd";
import type { SelectProps as SelectAntProps } from "antd";
import type { DefaultOptionType as OptionProps } from "antd/es/select";
import classname from "classnames";
import React, { CSSProperties, useImperativeHandle, useMemo, useRef } from "react";
import Icon from "../elements/icon/Icon";
import ViewTextError from "../view/ViewTextError";
import WrapperComponent from "../wrapper/WrapperComponent";

export interface SelectProps extends Omit<SelectAntProps<any>, "variant" | "styles"> {
    classNameSelect?: string;
    classNameOption?: string;
    classNameLabel?: string;

    label?: string;
    dataSource?: Array<any>;
    error?: any;
    variant?: "outline" | "standard";
    name?: string;

    // Style props
    styles?: {
        container?: CSSProperties;
        label?: CSSProperties;
    };

    // Size
    size?: "large" | "middle" | "small";

    getLabel?: (item: any) => any;
    getKey?: (item: any) => any;
    getValue?: (item: any) => any;
    getDisableOption?: (item: any) => any;
    getOptionProps?: (item: any) => OptionProps;
    getLabelDropdownItem?: (item: any) => any;

    hasFilter?: boolean;
    multiple?: boolean;
    required?: boolean;
    hidden?: boolean;

    selectAll?: boolean;
    selectAllLabel?: string;
    deselectAllLabel?: string;

    wrapperElement?: React.ReactElement;
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
        classNameOption,
        classNameLabel,

        value,
        label,
        defaultValue,
        placeholder = "Please select",
        onChange,
        disabled,
        dataSource = [],
        error,
        multiple = false,

        getLabel = (item: any) => item.label,
        getKey = (item: any) => item.id,
        getValue = (item: any) => item?.id ?? null,
        getDisableOption = (item: any) => false,
        getOptionProps = (item: any) => ({} as any),
        getLabelDropdownItem,

        selectAll = false,
        selectAllLabel = "Select All",
        deselectAllLabel = "Deselect All",

        allowClear = true,
        variant = "outline",
        hasFilter = true,
        required,
        hidden,

        styles,
        size = "middle",

        wrapperElement,
        ...props
    }: SelectProps,
    ref
) => {
    const hasAnOptionSelected = useMemo(() => {
        return value && value.length > 0;
    }, [value]);

    const handelOnChange: SelectProps["onChange"] = (val, option) => {
        if (selectAll && val && val.length && val.includes("all")) {
            if (onChange) {
                if (hasAnOptionSelected) {
                    onChange([], []);
                } else {
                    const allValue = dataSource.map((item) => getValue(item));
                    onChange(allValue, dataSource);
                }
            }
        } else if (onChange) {
            onChange(val, option);
        }
    };

    const selectAllOption = useMemo(() => {
        return (
            <Option key="all" value="all" className={classNameOption}>
                {hasAnOptionSelected ? deselectAllLabel : selectAllLabel}
            </Option>
        );
    }, [hasAnOptionSelected]);

    const children = useMemo(
        () =>
            dataSource.map((dataItem: any) => {
                const label = getLabelDropdownItem ? getLabelDropdownItem(dataItem) : getLabel(dataItem);
                const key = getKey(dataItem);
                const disabled = getDisableOption(dataItem);
                const optionProps = getOptionProps(dataItem);
                return (
                    <Option
                        key={key}
                        value={getValue(dataItem)}
                        disabled={disabled}
                        className={classNameOption}
                        {...optionProps}
                    >
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

    // Start of Refactoring Logic

    // Tailwind classes for the main Select component
    // We target the internal ant-select-selector using global styling or specificity if needed.

    // Merge styles
    // @ts-ignore
    const mergedStyle = { ...props.style, ...styles?.container };

    // Restore labelClass
    const labelClass = classname(
        "text-sm font-medium mb-1 text-text-main block",
        { "after:content-['*'] after:ml-0.5 after:text-red-500": required },
        classNameLabel
    );

    const selectClass = classname(
        "w-full", // Ensure full width
        {
            // Common overrides
            "!rounded-none": !styles?.container?.borderRadius, // Override radius unless custom one provided

            // Standard variant
            "!border-0 !border-b !border-neutral-200 !shadow-none": variant === "standard",
            "!px-0": variant === "standard", // Remove padding for standard

            // Error state
            "!border-red-500": !!error,

            // Disabled
            "!bg-neutral-100": disabled,

            // Size: middle (default)
            // Ant Design Select 'middle' has specific height/padding.
            // Match InputText's !px-4 !py-2.
            // Select's py affects the height, and height is usually handled by Ant.
            // We'll target the selection item for padding to mimic text input.
            // For single select, fixed height/leading is fine.
            // For multiple/tags, we should let it grow and just control min-height/padding.
            "!min-h-[40px]": size === "middle",
            "!leading-[38px]": size === "middle" && !multiple && props.mode !== "tags",

            "!px-4": size === "middle" && variant !== "standard",

            // Add vertical padding for multiple mode to ensure tags don't touch edges
            "!py-2": size === "middle" && (multiple || props.mode === "tags"),
        },
        classNameSelect
    );

    // Map custom variant to Ant Design's variant
    const antdVariant = variant === "outline" ? "outlined" : "borderless";

    return (
        <WrapperComponent
            element={wrapperElement || <div className={classname("flex flex-col w-full", className)} hidden={hidden} />}
        >
            {label && <label className={labelClass}>{label}</label>}
            <SelectAnt
                mode={multiple ? "multiple" : undefined}
                showSearch={{
                    optionFilterProp: "children",
                    filterOption: (input: any, option: any) => {
                        const { children, value } = option.props;
                        if (!hasFilter) {
                            return true;
                        }
                        return (
                            (children && children?.toLowerCase?.()?.indexOf?.(input?.toLowerCase()) >= 0) ||
                            (value && `${value}`?.toLowerCase?.()?.indexOf?.(input?.toLowerCase()) >= 0)
                        );
                    },
                }}
                suffixIcon={<Icon name="expand_more" />}
                variant={antdVariant}
                {...props}
                ref={selectRef}
                value={value}
                allowClear={allowClear}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChange={handelOnChange}
                className={selectClass}
                disabled={disabled}
                style={mergedStyle}
                size={size}
            >
                {selectAll && selectAllOption}
                {children}
            </SelectAnt>
            <ViewTextError error={error} />
        </WrapperComponent>
    );
};

export default React.forwardRef(Select);
