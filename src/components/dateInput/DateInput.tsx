// react
import { DatePicker, DatePickerProps } from "antd";
// third-party
import ClassNames from "classnames";
import React from "react";
import Button from "../button/Button";
import ViewTextError from "../view/ViewTextError";

// data stubs

const { RangePicker, TimePicker } = DatePicker;

export type TDateFormat = "DD/MM/YYYY HH:mm" | "DD/MM/YYYY" | "MM/YYYY" | "YYYY" | "HH:mm" | "HH:mm:";

export interface DateInputNewProps {
    type?: "date" | "week" | "month" | "quarter" | "year" | "time";
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
    const wrapperClass = ClassNames("d-date-input", { "d-date-input__hide-input": useButton }, className);
    const labelClass = ClassNames("text-label d-block", { "text-label-required": required }, classNameLabel);
    const datePickerClass = ClassNames(
        "d-date-input__input",
        {
            "d-date-input__no-out-line": variant === "standard",
        },
        classNameInput
    );
    const buttonClass = ClassNames("d-date-input__button", classNameButton);

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
    if (type === "time") {
        content = (
            <TimePicker
                value={value as any}
                onChange={onChange as any}
                onBlur={onBlur}
                className={datePickerClass}
                disabled={disabled}
                defaultValue={defaultValue as any}
                placeholder={placeholder as any}
                format="HH:mm"
            />
        );
    }
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
        <div className={wrapperClass} hidden={hidden}>
            {label && <label className={labelClass}>{label}</label>}
            <Button className={buttonClass} iconName={iconButton} />
            {content}
            <ViewTextError error={error} />
        </div>
    );
};

export default DateInput;
