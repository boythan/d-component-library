// react
import React, { CSSProperties, InputHTMLAttributes } from "react";

// third-party
import classname from "classnames";

// application

// data stubs
import Icon from "../icon/Icon";
import ViewTextError from "../view/ViewTextError";

export interface InputColorProps extends InputHTMLAttributes<any> {
    className?: string;
    classNameInput?: string;
    classNameInputContainer?: string;
    styleInput?: CSSProperties;
    styleInputContainer?: CSSProperties;
    styleLabel?: CSSProperties;

    variant?: "standard" | "outline";

    defaultValue?: string;
    error?: string;
    name?: string;
    label?: any;
    key?: string;
    placeholder?: string;

    disabled?: boolean;
    prefix?: any;
    suffix?: any;
}

const InputColor = ({
    className,
    classNameInput,
    classNameInputContainer,
    style,
    styleInput,
    styleInputContainer,
    styleLabel,

    variant = "outline", // standard || outline
    value,
    defaultValue,
    error,
    name,
    label,
    key,
    placeholder,

    disabled,

    onChange,
    onBlur,
}: InputColorProps) => {
    const container = classname("d-input-color__container", className);
    const labelClass = classname("text-label");

    const inputClass = classname("d-input-color__input", classNameInput);

    const inputContainerClass = classname(
        "d-input-color__input-container",
        `d-input-text__input-container-${variant}`,
        {
            "d-input-text__input-container-disabled": disabled,
            "d-input-text__error": !!error,
        },
        classNameInputContainer
    );

    const inputValueClass = classname("text-x-small", "ml-1");

    const renderInput = () => {
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
                disabled={disabled}
                defaultValue={defaultValue}
                style={styleInput}
                type="color"
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
                {renderInput()}
                <div className={inputValueClass}>{value}</div>
            </div>
            <ViewTextError error={error} />
        </div>
    );
};

export default InputColor;
