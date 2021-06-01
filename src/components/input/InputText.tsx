// react
import React, { InputHTMLAttributes } from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";

export interface InputTextProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameInput?: string;
    classNameInputContainer?: string;

    variant?: "standard" | "outline";
    multiple?: boolean;
    defaultValue?: string;
    error?: string;
    name?: string;
    label?: any;
    key?: string;
    placeholder?: string;
    type?: string;
    rows?: number;
    cols?: number;
    disabled?: boolean;
    prefix?: any;
    suffix?: any;
}

const InputText = ({
    className,
    classNameInput,
    classNameInputContainer,

    variant = "outline", // standard || outline
    multiple,
    value,
    defaultValue,
    error,
    name,
    label,
    key,
    placeholder,
    type,
    rows = 5,
    cols,
    disabled,
    prefix,
    suffix,

    onChange,
    onBlur,
}: InputTextProps) => {
    const container = classname("d-input-text__container", className);
    const labelClass = classname("text-label");

    const inputClass = classname("text-x-small", "d-input-text__input", classNameInput);

    const inputContainerClass = classname(
        "d-input-text__input-container",
        `d-input-text__input-container-${variant}`,
        {
            "d-input-text__input-container-disabled": disabled,
            "d-input-text__error": !!error,
        },
        classNameInputContainer
    );

    const inputPrefixClass = classname("text-x-small", "d-input-text__prefix-container", {
        "d-none": !prefix,
        "border-0": disabled,
    });
    const inputSuffixClass = classname("text-x-small", "d-input-text__suffix-container", {
        "d-none": !suffix,
        "border-0": disabled,
    });

    const textAreaClass = classname("text-x-small", "d-input-area__input", {
        "d-input-text__error": !!error,
    });

    const errorTextClass = classname("text-x-small", "text-error", "ml-1");

    const renderInput = () => {
        if (multiple) {
            return (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={rows}
                    name={name}
                    className={textAreaClass}
                    cols={cols}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                />
            );
        }
        return (
            <input
                value={value}
                onChange={onChange}
                className={inputClass}
                name={name}
                required
                key={key}
                placeholder={placeholder}
                onBlur={onBlur}
                type={type}
                disabled={disabled}
                defaultValue={defaultValue}
            />
        );
    };

    return (
        <div className={container}>
            {label && (
                <label htmlFor={name} className={labelClass}>
                    <span>{label}</span>
                </label>
            )}
            <div className={inputContainerClass}>
                <div className={inputPrefixClass}>{prefix}</div>
                {renderInput()}
                <div className={inputSuffixClass}>{suffix}</div>
            </div>
            {error && (
                <div className="flex-center-y mt-1">
                    <Icon name="error_outline" className="text-error" size="small" />
                    <text className={errorTextClass}>{error}</text>
                </div>
            )}
        </div>
    );
};

export default InputText;
