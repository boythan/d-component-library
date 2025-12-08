// react
import { DatePicker, DatePickerProps, TimePicker as TimePickerAntd } from "antd";
// third-party
import ClassNames from "classnames";
import React from "react";
import Button from "../button/Button";
import ViewTextError from "../view/ViewTextError";

// data stubs

const { RangePicker, TimePicker } = DatePicker;

export type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY" | "HH:mm" | "HH:mm:";

export interface DateInputNewProps {
    type?: "time" | "date" | "week" | "month" | "quarter" | "year";
    label?: string;
    showTime?: boolean;
    format?: TDateFormat;
    isRangePicker?: boolean;
    variant?: "standard" | "outline";
    error?: string;
    useButton?: boolean;
    required?: boolean;
    hidden?: boolean;
    iconButton?: string;
    classNameButton?: string;
    classNameLabel?: string;
    classNameInput?: string;
}

export type DateInputProp = Omit<DatePickerProps, "variant"> & DateInputNewProps;

const DateInput: React.FC<DateInputProp> = ({
    onChange,
    onBlur,
    value,
    disabled,
    defaultValue,
    label,
    placeholder,
    error,
    type = "date",
    format = "DD/MM/YYYY",
    variant = "outline",
    iconButton = "event",
    showTime = false,
    useButton = false,
    isRangePicker = false,
    required,
    hidden,
    className,
    classNameInput,
    classNameButton,
    classNameLabel,
    ...props
}) => {
    const wrapperClass = ClassNames("flex flex-col w-full", { relative: useButton }, className);

    const labelClass = ClassNames(
        "text-sm font-medium mb-1 text-text-main block",
        { "after:content-['*'] after:ml-0.5 after:text-red-500": required },
        classNameLabel
    );

    // Common DatePicker/RangePicker classes
    const datePickerBaseClass = ClassNames(
        "w-full !rounded-none !h-10", // h-10 is 40px
        {
            // Standard variant: only bottom border
            "!border-0 !border-b !border-neutral-200": variant === "standard",
            "bg-neutral-100 !border-none": disabled,
            "!border-red-500": !!error,

            // Hide input mode (useButton)
            "!w-10 !border-none !bg-transparent opacity-0 absolute top-0 left-0 z-10 cursor-pointer": useButton,
        },
        classNameInput
    );

    const buttonClass = ClassNames("absolute top-0 left-0 pointer-events-none z-0", classNameButton);

    // Map our custom variant to Ant Design's variant
    const antdVariant = variant === "outline" ? "outlined" : "borderless";
    // Note: 'filled' in AntD might be different, using 'borderless' + border-b for standard looks closer to legacy.
    // For outline, we stick to default but apply our border radius override.

    let content = null;

    // Helper to render picker with common props
    const renderPicker = (Component: any, extraProps: any = {}) => (
        <Component
            {...props}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={datePickerBaseClass}
            disabled={disabled}
            defaultValue={defaultValue}
            placeholder={placeholder}
            format={format}
            variant={antdVariant}
            {...extraProps}
        />
    );

    if (type !== "time") {
        content = renderPicker(DatePicker, { picker: type, showTime });
    }

    if (type === "time") {
        content = renderPicker(TimePicker, { format: "HH:mm" });
    }

    if (isRangePicker) {
        if (type === "time") {
            content = renderPicker(TimePickerAntd.RangePicker, { format: "HH:mm" });
        } else {
            content = renderPicker(RangePicker, { picker: type, showTime });
        }
    }

    return (
        <div className={wrapperClass} hidden={hidden}>
            {label && <label className={labelClass}>{label}</label>}
            {useButton && <Button className={buttonClass} iconName={iconButton} />}
            {content}
            <ViewTextError error={error} />
        </div>
    );
};

export default DateInput;
