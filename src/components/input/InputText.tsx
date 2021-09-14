// react
import React, { CSSProperties, InputHTMLAttributes } from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";
import ViewTextError from "../view/ViewTextError";

export interface InputTextProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameInput?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;

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
    required?: boolean;
    prefix?: any;
    suffix?: any;
}

const InputText = ({
    className,
    classNameInput,
    classNameInputContainer,
    style,
    styleInput,
    styleInputContainer,
    styleLabel,

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
    required,

    onChange,
    onBlur,
    ...inputProps
}: InputTextProps) => {
    const container = classname("d-input-text__container", className);
    const labelClass = classname("text-label", { "text-label-required": required });

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

    const textAreaClass = classname(
        "text-x-small",
        "d-input-area__input",
        {
            "d-input-text__error": !!error,
        },
        classNameInput
    );

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
                    style={styleInput}
                    {...inputProps}
                />
            );
        }
        return (
            <input
                value={value}
                className={inputClass}
                name={name}
                required
                key={key}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                defaultValue={defaultValue}
                style={styleInput}
                onChange={onChange}
                onBlur={onBlur}
                {...inputProps}
            />
        );
    };

    return (
        <div className={container} style={style}>
            {label && (
                <label htmlFor={name} className={labelClass} style={styleLabel}>
                    <span>{label}</span>
                </label>
            )}
            <div className={inputContainerClass} style={styleInputContainer}>
                <div className={inputPrefixClass}>{prefix}</div>
                {renderInput()}
                <div className={inputSuffixClass}>{suffix}</div>
            </div>
            <ViewTextError error={error} classNameText={errorTextClass} />
        </div>
    );
};

export default InputText;
