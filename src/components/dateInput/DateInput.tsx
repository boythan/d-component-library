// react
import React from "react";

// third-party
import ClassNames from "classnames";
import { DatePickerProps, DatePicker, TimeRangePickerProps } from "antd";
// application

// data stubs

const { RangePicker } = DatePicker;

export type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY";

export interface DateInputNewProps {
    type?: "date" | "week" | "month" | "quarter" | "year";
    outline?: boolean;
    label?: string;
    showTime?: boolean;
    format?: TDateFormat;
    isRangePicker?: boolean;
    variant?: "standard" | "outline";
}

export type DateInputProp = DatePickerProps & DateInputNewProps;

const DateInput: React.FC<DateInputProp> = ({
    value,
    onChange,
    onBlur,
    outline = true,
    disabled,
    defaultValue,
    type = "date",
    label,
    placeholder,
    format = "DD/MM/YYYY HH:mm",
    className,
    showTime = false,
    variant = "outline",
    isRangePicker = false,
    ...props
}) => {
    const datePickerClass = ClassNames(
        "d-date-input__input",
        {
            "d-date-input__no-out-line": variant === "standard",
        },
        "w-100"
    );
    const wrapperClass = ClassNames("d-date-input", className);

    let content = (
        <DatePicker
            {...props}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={datePickerClass}
            disabled={disabled}
            defaultValue={defaultValue}
            picker={type}
            placeholder={placeholder}
            format={format}
            showTime={showTime as any}
        />
    );
    if (isRangePicker) {
        content = (
            <RangePicker
                value={value as any}
                onChange={onChange as any}
                onBlur={onBlur}
                className={datePickerClass}
                disabled={disabled}
                defaultValue={defaultValue as any}
                picker={type}
                placeholder={placeholder as any}
                format={format as any}
                showTime={showTime as any}
            />
        );
    }
    return (
        <div className={wrapperClass}>
            {label && <label className="text-label">{label}</label>}
            {content}
        </div>
    );
};

export default DateInput;
