// react
import React from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";

export interface InputTextProps {
    [key: string]: any;
}

const InputText = ({
    className,
    classNameInput,

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

    onChange,
    onBlur,
}: InputTextProps) => {
    const container = classname("d-input-text__container", className);
    const labelClass = classname("text-label");

    const inputClass = classname(
        "text-x-small",
        "d-input-text__input",
        `d-input-text__input-${variant}`,
        {
            "d-input-text__input-disabled": disabled,
            "d-input-text__error": !!error,
        },
        classNameInput
    );

    const textAreaClass = classname("d-input-area__input", `d-input-area__input-${variant}`, {
        "d-input-area__input-disabled": disabled,
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
            {renderInput()}
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
