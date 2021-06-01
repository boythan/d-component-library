// react
import { DatePicker, DatePickerProps } from "antd";
// third-party
import ClassNames from "classnames";
import React from "react";
import Button from "../button/Button";
// application
import Icon from "../icon/Icon";

// data stubs

const { RangePicker } = DatePicker;

export type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY";

export interface DateInputNewProps {
    type?: "date" | "week" | "month" | "quarter" | "year";
    label?: string;
    showTime?: boolean;
    format?: TDateFormat;
    isRangePicker?: boolean;
    variant?: "standard" | "outline";
    error?: string;
    useButton?: boolean;
    iconButton?: string;
    iconError?: string;
    classNameButton?: string;
    classNameLabel?: string;
    classNameInput?: string;
    classNameError?: string;
}

export type DateInputProp = DatePickerProps & DateInputNewProps;

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
    format = "DD/MM/YYYY HH:mm",
    variant = "outline",
    iconError = "error_outline",
    iconButton = "event",
    showTime = false,
    useButton = false,
    isRangePicker = false,
    className,
    classNameInput,
    classNameButton,
    classNameLabel,
    classNameError,
    ...props
}) => {
    const wrapperClass = ClassNames("d-date-input", { "d-date-input__hide-input": useButton }, className);
    const labelClass = ClassNames("text-label d-block", classNameLabel);
    const datePickerClass = ClassNames(
        "d-date-input__input",
        {
            "d-date-input__no-out-line": variant === "standard",
        },
        classNameInput
    );
    const buttonClass = ClassNames("d-date-input__button", classNameButton);
    const errorClass = ClassNames("flex-center-y mt-1", classNameError);
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
            {label && <label className={labelClass}>{label}</label>}
            <Button className={buttonClass} iconName={iconButton} />
            {content}
            {error && (
                <div className={errorClass}>
                    <Icon name={iconError} className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
        </div>
    );
};

export default DateInput;
