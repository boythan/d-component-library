// react
import { DatePicker, DatePickerProps } from "antd";
// third-party
import ClassNames from "classnames";
import React from "react";
// application
import Icon from "../icon/Icon";

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
    error?: string;
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
    error,
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

    const errorTextClass = ClassNames("text-x-small", "text-error", "ml-1");

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
            {label && <label className="text-label d-block">{label}</label>}
            {content}
            {error && (
                <div className="flex-center-y mt-1">
                    <Icon name="error_outline" className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
        </div>
    );
};

export default DateInput;
